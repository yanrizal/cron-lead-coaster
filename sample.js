var custom = require('casper/utils');

(function(){
    // Convert array to object
    var convArrToObj = function(array){
        var thisEleObj = new Object();
        if(typeof array == "object"){
            for(var i in array){
                var thisEle = convArrToObj(array[i]);
                thisEleObj[i] = thisEle;
            }
        } else {
            thisEleObj = array;
        }
        return thisEleObj;
    };
    var oldJSONStringify = JSON.stringify;
    JSON.stringify = function(input){
        if(oldJSONStringify(input) == '[]')
            return oldJSONStringify(convArrToObj(input));
        else
            return oldJSONStringify(input);
    };
})();

var casper = require('casper').create({   
    verbose: true,
    pageSettings: {
      loadImages:  false,   
      loadPlugins: false, 
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

//LOAD DATA
var jsonData,dataProfile,page,urlSearch;

// GLOBAL VARIABLE
var links;
var i = -1;

var url = 'https://www.linkedin.com';
casper.start();

//PROFILE DATA
var lkdUsername = casper.cli.get('username');
var totalSearch = 0;
var leadArr = [];
var searchName = '';
console.log(lkdUsername);

casper.thenOpen("https://lead-coaster.herokuapp.com/api/v1/getdata", {
      method: 'post',
      data:{
          "lkdUsername": lkdUsername
      }
});

casper.then(function() {
    var searchId = casper.cli.get('searchId');
    require('utils').dump(JSON.parse(this.getPageContent()));
    jsonData = JSON.parse(this.getPageContent());
    if (jsonData === null){
      dataProfile = [];
    } else {
      if (jsonData.data[parseInt(searchId)].profileVisit.length === 0){
        console.log('zero data')
        dataProfile = [];
      }else{
        console.log('ada data')
        dataProfile = JSON.parse(jsonData.data[parseInt(searchId)].profileVisit);
      }
      console.log(dataProfile.length)
    }
    console.log('retreive data');
    page = Math.floor(dataProfile.length/10)+1;
    searchName =  jsonData.data[parseInt(searchId)].searchName;
    console.log('page', page);
    console.log('searchName', searchName);
    urlSearch = jsonData.data[parseInt(searchId)].urlSearch+'&page_num='+page;
});

function checkAndAdd(name) {
  var found = dataProfile.some(function (el) {
    return el.fullName === name;
  });
  console.log(found);
  if (found) { leadArr.push({ fullName: name }); }
}


casper.thenOpen(url, function(){
  this.waitForSelector('form.login-form', function(){
     console.log('form loaded')
     this.fillSelectors('form.login-form', {
          'input#login-email' : casper.cli.get('email'),
          'input#login-password' : casper.cli.get('password')
      }, true);
  });
});

casper.waitWhileSelector('form.login-form', function(){
    console.log('logged in');
});

casper.then(function(){
    // ----- WELCOME PAGE -------
    console.log(this.getTitle());

    // MESSAGE PROFILE
    this.thenOpen(url+'/messaging/?trk=nav_utilities_inbox', function() {
      console.log(this.getTitle());
      var nameMsg = this.evaluate(function(){
        var allMsg = document.querySelectorAll('.thread-link');
        return Array.prototype.map.call(allMsg, function (e) {
            var name = e.querySelectorAll('.name')[0].innerHTML
            var id = e.getAttribute('data-id')
            return name;
        });
      });
      console.log(nameMsg);
      checkAndAdd(nameMsg);
      //this.capture('screenshots/ss.png');
    });


    // VIEWED PROFILE COUNT
    // var viewedProfile = this.evaluate(function(){
    //     var notificationDiv = document.querySelectorAll('#notifications')[0];
    //     var li = notificationDiv.querySelectorAll(':scope > .activity-drop-body')[0].innerHTML;
    //     var linkNotif = document.querySelectorAll('#notifications ol li.single')[0];
    //     return li
    //     // Array.prototype.map.call(linkNotif, function (e) {
    //     //     return e
    //     // });
    // });

    //console.log(viewedProfile);
    
    this.thenOpen(urlSearch, function() {
      // ------- SEARCH PAGE ---------

      console.log(this.getTitle());
      links = this.evaluate(custom.getLinks);
      //console.log(links);
      totalSearch = this.evaluate(function(){
          var tot = document.querySelectorAll('#results_count strong')[0].innerHTML;
          return tot
      });
      console.log('totalSearch', totalSearch); 


      this.each(links, function() { 
          i++; 
          console.log(links[i]);
          this.thenOpen((links[i]), function() {

              // --------- VISITING PROFILE SEARCH USER PAGE ----------

              var data = this.evaluate(function(){
                var fullName = document.querySelector('.full-name').innerHTML;
                var idUrl = document.querySelector('.view-public-profile').getAttribute('href');
                return {
                  'fullName': fullName,
                  'idUrl': idUrl
                };
              });
              console.log(data.idUrl, data.fullName);
              var flag = true;
              for(var i=0;i<dataProfile.length;i++){
                  if(dataProfile[i].idUrl === data.idUrl){
                    flag = false;
                    break;
                  }else{
                    flag = true;
                  }
              }
              if(flag){
                dataProfile.push(data); 
                //console.log(JSON.stringify(dataProfile));
              }
          }).wait(custom.getRandomArbitrary(5000,30000));
      });
    });
});



casper.then(function(){
  // ------ SAVE DATA TO DATABASE --------
  this.thenOpen("https://lead-coaster.herokuapp.com/api/v1/savedata", {
        method: 'post',
        data:{
            "lkdUsername": lkdUsername,
            "totalSearch": totalSearch,
            "leadCount": leadArr.length,
            "dataProfile": JSON.stringify(dataProfile),
            "page": page,
            "dataIndex": casper.cli.get('searchId')
        }
  });
});

casper.then(function(){
  console.log('saved');
});


casper.run();
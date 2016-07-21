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
    //logLevel: 'debug',
    pageSettings: {
      //proxy: '61.191.27.117:123',
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
casper.on('resource.received', function(resource) {
    var status = resource.status;
    if(status >= 400) {
        casper.log('Resource ' + resource.url + ' failed to load (' + status + ')', 'error');

        resourceErrors.push({
            url: resource.url,
            status: resource.status
        });
    }
});
casper.on("page.error", function(msg, trace) {
     this.echo("Error: " + msg, "ERROR");
});
casper.start();

//PROFILE DATA
var username = casper.cli.get('username');
var totalSearch = 0;
var leadArr = [];
var searchName = '';
var token = '';
var linked = '';
console.log(username);
casper.options.waitTimeout = 5000;

casper.then(function(){
  // login
  this.thenOpen("https://lead-coaster.herokuapp.com/login", {
        method: 'post',
        data:{
            email: username,
            password: 'coaster'
        }
  });
});

casper.then(function(){
  var tokenData = JSON.parse(this.getPageContent());
  token = tokenData.token;
  console.log(token)
});

casper.then(function(){
  var urlData = "https://lead-coaster.herokuapp.com/api/v1/getdata?token="+token;
  console.log(urlData)
  this.thenOpen(urlData, {
      method: 'post',
      data:{
          "lkdUsername": username
      }
  });
});


casper.then(function() {
    var searchId = casper.cli.get('searchId');
    require('utils').dump(JSON.parse(this.getPageContent()));
    jsonData = JSON.parse(this.getPageContent());
    if (jsonData === null){
      dataProfile = [];
    } else {
      if (jsonData.data[parseInt(searchId)].profileVisit.length === 0){
        dataProfile = [];
      }else{
        dataProfile = JSON.parse(jsonData.data[parseInt(searchId)].profileVisit);
      }
      console.log(dataProfile.length)
    }
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
          linked = links[i];
          this.thenOpen((links[i]), function() {
              //this.capture('screenshots/ss.png');
              // --------- VISITING PROFILE SEARCH USER PAGE ----------
              var data = this.evaluate(function(){
                var fullName = document.querySelector('.full-name').innerHTML;
                var idUrl = '';
                var link = window.location.href;
                if ( link.indexOf('OUT_OF_NETWORK') > -1 ) {
                  idUrl = fullName
                } else {
                  idUrl = document.querySelector('.view-public-profile').getAttribute('href');
                }
                
                console.log(idUrl);
                if(!idUrl){
                  idUrl = fullName
                }
                return {
                  'fullName': fullName,
                  'idUrl': idUrl
                };
              });
              console.log(data.fullName);
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
            "lkdUsername": username,
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
var getLinks = function() {
    var allLinks = document.querySelectorAll('.main-headline');
    return Array.prototype.map.call(allLinks, function (e) {
        return e.getAttribute('href')
    });
}

var getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
}

exports.getLinks = getLinks;
exports.getRandomArbitrary = getRandomArbitrary;
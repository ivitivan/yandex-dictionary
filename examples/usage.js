var key = 'your api key';
var path = require('path');
var modulePath = path.resolve(__dirname, '..', 'lib', 'yandex-dictionary.js');
var yandexDictionary = require(modulePath)(key);


yandexDictionary.getLangs(function(err, res) {
    err ? console.log(err) : console.log(res);
});

yandexDictionary.lookup('dick', 'en-ru', {ui: 'ru', flags: 1 }, function(err, res) {
    var util = require('util');
    err ? console.log(err) : console.log(util.inspect(res, {depth: null}));
});

var request = require('request');
var baseAddress = 'https://dictionary.yandex.net/api/v1/dicservice.json/'
var url = require('url');

module.exports = function(APIkey) {
    this.APIkey = APIkey;
    var dis = this;

    var getLangs = function(callback) {
        makeRequest(baseAddress + 'getLangs?key=' + dis.APIkey, callback);
    }

    /**
      * The first two parameters are text and lang, next pararameter, options, is optional; the last parameter is callback function
      */
    var lookup = function(text, lang, callback) {

        if (arguments.length == 4) {
            var options = callback;
            callback = arguments[arguments.length - 1];
        }

        var uri = url.format({
            pathname: url.resolve(baseAddress, 'lookup'),
            query: {
                key: dis.APIkey,
                lang: lang,
                text: text,
                ui: options ? options.ui : null,
                flags: options ? options.flags : null,
            }
        });

        makeRequest(uri, callback);
    }

    function makeRequest(options, callback) {
        request.get(options, function(err, res, body) {
            if (err) {
                return callback(err);
            } else {
                try {
                    var data = JSON.parse(body);
                } catch(err) {
                    return callback(err);
                }
                callback(null, data);
            }
        });
    }

    return {
        getLangs: getLangs,
        lookup: lookup
    };
}

var toGeoJSON = require('togeojson');
var base = 'http://api.openstreetmap.org/api/0.6/trackpoints?bbox=';

function osmGpx(bbox, pages, callback) {

    if (!callback) {
        callback = pages;
        pages = 1;
    }

    function xml(url, callback) {
        var xhr = new XMLHttpRequest(),
            twoHundred = /^20\d$/;
        xhr.onreadystatechange = function() {
            if (4 == xhr.readyState && 0 !== xhr.status) {
                if (twoHundred.test(xhr.status)) callback(null, xhr);
                else callback(xhr, null);
            }
        };
        xhr.crossOrigin = true;
        xhr.onerror = function(e) { return callback(e, null); };
        xhr.open('GET', url, true);
        xhr.send();
    }

    var gj = null;

    function run(page) {
        xml(base + bbox + '&page=' + page, function(err, res) {
            if (err) return callback(err, null);

            var newGj = toGeoJSON.gpx(res.responseXML);
            if (--pages && newGj.features.length) {
                if (!gj) {
                    gj = newGj;
                } else {
                    gj.features = gj.features.concat(newGj.features);
                }
                run(++page);
            } else {
                if (!gj) gj = newGj;
                callback(null, res.responseXML, gj);
            }
        });
    }

    return run(0);
}

osmGpx.base = function(x) {
    if (!x) return base;
    else base = x;
    return osmGpx;
};

if (typeof module !== 'undefined') module.exports = osmGpx;

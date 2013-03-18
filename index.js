var toGeoJSON = require('togeojson'),
    xml = require('basicrequest');
var base = 'http://api.openstreetmap.org/api/0.6/trackpoints?bbox=';

function osmGpx(bbox, pages, callback) {
    if (!callback) {
        callback = pages;
        pages = 1;
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

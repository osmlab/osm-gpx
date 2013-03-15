Retrieve [GPX](http://www.gpx.com/) data from the [OpenStreetMap GPX API](http://wiki.openstreetmap.org/wiki/API_v0.6).

### usage

With browserify:

    npm install --save osm-gpx

```js
var osmGpx = require('osm-gpx');
```

Without:

Copy `gpx.js`, include it. `osmGpx` will be attached to `window`.

### api

`osmGpx(bbox, [pages], callback)`

* `bbox` is a `[w, s, e, n]` order bounding box of WGS84 coordinates
* `pages` is an optional parameter for a limit to how many 5,000 point pages
  are requested. by default, it's one.
* `callback` is called with `err, gpx, geojson` after all pages are requested.

```js
osmGpx(bbox, function(err, gpx, geojson) {
    // GPX is the GPX XML Document
    // GeoJSON is a GeoJSON version of it.
});
```

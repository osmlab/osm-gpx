all: index.js
	browserify index.js -s osmGpx > gpx.js

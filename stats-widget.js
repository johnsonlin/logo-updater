var _ = require('lodash');
var grunt = require('grunt');
var path = require('path');

var root = path.resolve('.');

var options = require('./components/options');
var helpers = require('./components/helpers');

options.getOptions();

var statsWidgetsPaths = options.paths.statsWidgets;
var sep = options.pathSep;
var source = root + sep + options.source;
var output = root + sep + options.output.statsWidgets;

var imageSizes = options.sizes.statsWidgets;
var defaultDir = '/default';
var retinaDir = '/retina';

var pngFolders = grunt.file.expand({
    filter: 'isDirectory'
}, source + '/**/?(_)PNG');


var logoPaths = helpers.mapSportAndSeries(pngFolders, source);

function updateImages(sourcePathSuffix, targetPathPrefix, type) {
    Object.keys(logoPaths).forEach(function (sport) {
        Object.keys(logoPaths[sport]).forEach(function (series) {
            var seriesFolder = _.get(statsWidgetsPaths, series, helpers.firstThreeOrAbbreviation(series));
            var sourcePath = path.normalize(logoPaths[sport][series] + sep + sourcePathSuffix);
            var targetPath = path.normalize(
                targetPathPrefix + sep + seriesFolder + (type ? retinaDir : defaultDir)
            );

            helpers.updateTeamLogos(sport, series, type, sourcePath, targetPath);
        });
    });
}

function updateDefaultImages() {
    updateImages(imageSizes.default, output);
}

function updateRetinaImages() {
    updateImages(imageSizes.default, output, 'retina');
}

updateDefaultImages();
updateRetinaImages();

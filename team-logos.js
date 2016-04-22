var _ = require('lodash');
var grunt = require('grunt');
var path = require('path');

var root = path.resolve('.');

var options = require('./components/options');
var helpers = require('./components/helpers');

options.getOptions();

var teamLogosPaths = options.paths.teamLogos;
var sep = options.pathSep;
var source = root + sep + options.source;
var output = root + sep + options.output.teamLogos;

var imageSizes = options.sizes.teamLogos;
var imagesDir = output + 'images/';
var imagesLargeDir = output + 'images-large/';

var pngFolders = grunt.file.expand({
    filter: 'isDirectory'
}, source + '/**/?(_)PNG');

var logoPaths = helpers.mapSportAndSeries(pngFolders, source);

function updateImages(sourcePathSuffix, targetPathPrefix, type) {
    Object.keys(logoPaths).forEach(function (sport) {
        var sportFolder = _.get(teamLogosPaths, sport, helpers.toOneWord(sport).toLowerCase());

        Object.keys(logoPaths[sport]).forEach(function (series) {
            var sourcePath = path.normalize(logoPaths[sport][series] + sep + sourcePathSuffix);
            var targetPath = path.normalize(targetPathPrefix + sportFolder);

            helpers.updateTeamLogos(sport, series, type, sourcePath, targetPath);
        });
    });
}

function updateLogos() {
    updateImages(imageSizes.images, imagesDir);
}

function updateLargeLogos() {
    updateImages(imageSizes.imagesLarge, imagesLargeDir, 'Large');
}

updateLogos();
updateLargeLogos();

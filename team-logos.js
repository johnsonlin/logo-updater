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

var logoPaths = {};

var pngFolders = grunt.file.expand({
    filter: 'isDirectory'
}, source + '/**/?(_)PNG');

pngFolders.forEach(function (folder) {
    var pathList = path.relative(source, folder).split(sep);
    var sport = pathList[0];
    var folderLevel = pathList.length - 1;
    var series = folderLevel === 1 ? sport : pathList[1];

    if (!logoPaths[sport]) {
        logoPaths[sport] = {};
    }

    logoPaths[sport][series] = folder;

    var hasLogosFolder = pathList.indexOf('Logos') !== -1 && _.get(logoPaths[sport], series, false);

    if (hasLogosFolder) {
        logoPaths[sport][series] = folder;
    }
});

function updateImages(sourcePathSuffix, targetPathPrefix, type) {
    Object.keys(logoPaths).forEach(function (sport) {
        var sportFolder = _.get(teamLogosPaths, sport, helpers.toOneWord(sport).toLowerCase());

        Object.keys(logoPaths[sport]).forEach(function (series) {
            var sourcePath = path.normalize(logoPaths[sport][series] + sep + sourcePathSuffix);
            var targetPath = path.normalize(targetPathPrefix + sportFolder);
            var sourcePathExists = helpers.folderExists(sourcePath) || helpers.folderExists(sourcePath + '_PNG');

            grunt.log.writeln('For ' + sport + ' - ' + series);
            if (sourcePathExists && helpers.folderExists(targetPath)) {
                grunt.log.writeln(targetPath + ' folder exists.');
                var sourceLogos = grunt.file.expand(sourcePath + '?(_PNG)/+([0-9]).png');

                sourceLogos.forEach(function (sourcePng) {
                    var png = path.parse(sourcePng);

                    helpers.copyImage(sourcePng, targetPath, png.base, {
                        type: type,
                        sport: sport,
                        series: series
                    });
                });
            } else {
                if (!sourcePathExists) {
                    grunt.log.writeln(sourcePath + '(_PNG) folder does NOT exist.');
                }

                if (!helpers.folderExists(targetPath)) {
                    grunt.log.writeln(targetPath + ' folder does NOT exist.');
                }
            }
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

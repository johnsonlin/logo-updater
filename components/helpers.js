module.exports = {
    isUpperCase: function (string) {
        return string === string.toUpperCase();
    },

    firstThreeOrAbbreviation: function (string) {
        var wordsList = string.split(' ');
        var firstWord = wordsList[0];

        if (this.isUpperCase(firstWord)) {
            return this.firstThree(firstWord);
        }

        return this.abbreviation(wordsList);
    },

    firstThree: function (string) {
        return string.toLowerCase();
    },

    abbreviation: function (wordList) {
        return wordList.reduce(function (string, word) {
            string += word.charAt(0).toLowerCase();
            return string;
        }, '');
    },

    toOneWord: function (string) {
        return string.replace(/\s+/g, '');
    },

    mapSportAndSeries: function (pngFolders, sourceRoot) {
        var path = require('path');
        var logoPaths = {};
        var _ = require('lodash');

        pngFolders.forEach(function (folder) {
            var pathList = path.relative(sourceRoot, folder).split(path.sep);
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

        return logoPaths;
    },

    folderExists: function (folderPath) {
        var fs = require('fs');

        return fs.existsSync(folderPath);
    },

    fileExists: function (filePath) {
        var fs = require('fs');

        return fs.existsSync(filePath);
    },

    updateTeamLogos: function (sport, series, type, sourcePath, targetPath) {
        var self = this;
        var grunt = require('grunt');
        var path = require('path');
        var sourcePathExists = self.folderExists(sourcePath) || self.folderExists(sourcePath + '_PNG');

        grunt.log.writeln('For ' + sport + ' - ' + series);
        if (sourcePathExists && self.folderExists(targetPath)) {
            grunt.log.writeln(targetPath + ' folder exists.');
            var sourceLogos = grunt.file.expand(sourcePath + '?(_PNG)/+([0-9]).png');

            sourceLogos.forEach(function (sourcePng) {
                var png = path.parse(sourcePng);
                var pngName = 'logo-' + png.base;

                self.copyImage(sourcePng, targetPath, pngName, {
                    type  : type,
                    sport : sport,
                    series: series
                });
            });
        } else {
            if (!sourcePathExists) {
                grunt.log.writeln(sourcePath + '(_PNG) folder does NOT exist.');
            }

            if (!self.folderExists(targetPath)) {
                grunt.log.writeln(targetPath + ' folder does NOT exist.');
            }
        }
    },

    copyImage: function(sourcePng, targetPngPath, targetPngName, data) {
        var grunt = require('grunt');
        var path = require('path');
        var targetPng = targetPngPath + path.sep + targetPngName;
        var targetExists = this.fileExists(targetPng);

        //console.log(sourcePng, targetPng);
        grunt.file.copy(sourcePng, targetPng);

        if (targetExists) {
            grunt.log.writeln(
                'Successfully updated current ' +
                (data.type ? data.type + ' ' : '') +
                'Logo for \'' + data.sport + '\' - ' + targetPngName +
                ' with \'' + data.series + '\' ' + targetPngName
            );
        } else {
            grunt.log.writeln(
                'Successfully added new ' +
                (data.type ? data.type + ' ' : '') +
                'Logo for \'' + data.sport + '\' - ' + targetPngName +
                ' with \'' + data.series + '\' ' + targetPngName
            );
        }
    }
};

var fs = require('fs');

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

    folderExists: function (folderPath) {
        return fs.existsSync(folderPath);
    },

    fileExists: function (filePath) {
        return fs.existsSync(filePath);
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

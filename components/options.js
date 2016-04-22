var path = require('path');
var _ = require('lodash');

var root = path.resolve('.');
var paths = require('./paths');

var availableArgs = ['-source'];
var args = process.argv;
var options = {
    source : 'logos',
    output : {
        teamLogos: './',
        statsWidgets : './src/sass/images/sprites/logos/'
    },
    sizes: {
        teamLogos: {
            images: '80x60',
            imagesLarge: '250x200'
        },
        statsWidgets: {
            default: '40x30',
            retina: '80x60'
        }
    }
};

var getOptions = function() {
    availableArgs.forEach(function (arg) {
        if (args.indexOf(arg) !== -1) {
            options[arg.substr(1)] = args[args.indexOf(arg) + 1] || '';
        }
    });
};

module.exports = _.assign(
    {},
    options,
    {
        root: root,
        paths: paths,
        pathSep: path.sep,

        getOptions: getOptions
    }
);



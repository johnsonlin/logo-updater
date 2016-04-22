# logo-updater

### batch updates team logos

install
```
$ npm install logo-updater
```

update team-logos
```
$ node node_modules/logo-updater/team-logos
```

update stats-widget
```
$ node node_modules/logo-updater/stats-widget
```


### Options
* `-source` - source directory (_default: 'logos'_) | usage: `node node_modules/switch-import/main -source /home/source/folder/to/team/logos`

### usage
#### If you copy source logo files to `logos` folder under project root
`$ node node_modules/switch-import/team-logos`

#### If you want to use remote path for source logos
`$ node node_modules/switch-import/team-logos -source /home/source/folder/to/team/logos`

`$ node node_modules/switch-import/stats-widget -source X:\source\folder\to\team\logos`

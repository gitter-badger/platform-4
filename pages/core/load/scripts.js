const fs = require('fs-extra');
const Promise = require('bluebird');
const path = require('path');
const klaw = require('klaw');

module.exports = function(locals) {

    var project = locals.project;

    return function() {

        ////////////////////////////////////////////////////////
        // LOAD THEME SCRIPTS
        ////////////////////////////////////////////////////////

        var scriptDirs = [
            project.paths.scripts,
            project.paths.scriptsFramework,
            project.paths.scriptsTheme
        ];

        return Promise.map(scriptDirs, function(scriptDir) {

            fs.ensureDirSync(scriptDir);

            var walker = klaw(scriptDir, {
                followLinks: false
            });

            walker.on('data', function(item) {

                if (item.stats.isDirectory()) {
                    return;
                }

                var path_parsed = path.parse(item.path);

                if (path_parsed.ext != '.js') {
                    return;
                }

                require(item.path)(locals);
            });

            ////////////////////////////////////////////////////////
            // LOAD PROCESS PROJECT DATA - SETUP
            ////////////////////////////////////////////////////////


            return new Promise(function(resolve, reject) {

                walker.on('end', function() {
                    resolve();
                });

                walker.on('error', reject);

            });
        });

    };
};

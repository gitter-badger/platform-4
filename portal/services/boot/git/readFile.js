/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: portal/services/boot/git/readFile.js
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const Promise = require('bluebird');
const nodegit = require('nodegit');
const path = require('path');
const _ = require('lodash');
const yaml = require('js-yaml');

module.exports = function(app) {

    app.git.readFile = function(options) {

        var file = app.git.getPath(options.file);
        var command = `${options.commit}:${file}`;

        return app.git.native.show([command]);
    };

};

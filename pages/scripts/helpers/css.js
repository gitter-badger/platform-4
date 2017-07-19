/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: pages/scripts/helpers/css.js
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
module.exports = function(locals) {

    var project = locals.project;

    function cssHelper() {
        /* jshint validthis: true */
        var result = '';
        var path = '';

        for (var i = 0, len = arguments.length; i < len; i++) {
            path = arguments[i];

            if (i) result += '\n';

            if (Array.isArray(path)) {
                result += cssHelper.apply(this, path);
            } else {
                if (path.substring(path.length - 4, path.length) !== '.css') path += '.css';
                result += '<link rel="stylesheet" href="' + this.get_asset(path) + '" type="text/css">';
            }
        }

        return result;
    }

    project.extend.helper.register('css', cssHelper);

};

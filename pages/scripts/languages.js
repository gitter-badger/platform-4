/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: pages/scripts/languages.js
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
var _ = require('lodash');

module.exports = function(locals) {

  var project = locals.project;

  project.on('ready', function() {

    if (!project.site.lang) {
      throw new Error('Uknown Language!');
    }

    project.site.sitemap = {
      path: 'sitemap_' + project.site.lang + '.xml'
    };

    project.site.languages = {};

    for (var language of project.config.languages) {
      project.site.languages[language.key] = language.value;
    }

    project.site.lang_full = project.site.languages[project.site.lang];
    project.site.lang_others = _.omit(project.site.languages, [project.site.lang]);

  });

};

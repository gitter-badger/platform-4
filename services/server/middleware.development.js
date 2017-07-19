/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: services/server/middleware.development.js
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
module.exports = function(app) {
  return {
    initial: {
      './middleware/limits/clear': {
        params: [app],
        paths: ['/limits/:name/clear']
      },
      './middleware/limits/list': {
        params: [app],
        paths: ['/limits']
      },
    },
    'session': {
      './middleware/session': {
        params: [app, {
          secure: false
        }]
      }
    },
    'final:after': {
      'strong-error-handler': {
        'params': {
          'debug': true
        }
      }
    }
  };
};

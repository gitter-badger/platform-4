/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: theme/source/status/compatibility.js
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

/*global UAParser*/

(function(){

  var parser = new UAParser();
  var browser = parser.getBrowser();

  document.getElementById('browser-value').innerHTML = browser.name;
  document.getElementById('version-value').innerHTML = browser.version;
  //console.log(browser);

  if (window.isCompatible()) {
    document.getElementById('message-compatible').className = 'message';
  }else{
    document.getElementById('message-incompatible').className = 'message';
  }
})();

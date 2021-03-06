/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: portal/website/source/manager/history/errors.js
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

/*global beautifyJSON*/
/*global UAParser*/

(function() {

  var moment = window.moment;
  var angular = window.angular;
  var app = angular.module('MainApp');

  app.directive('visError', function() {

    return {
      link: function($scope, $element) {
        $scope.createTimeline({
          $element: $element,
          getTitle: getTitle,
          dialogController: 'LogErrorCtrl',
          template: 'log-error'
        });
      }
    };
  });

  app.controller('LogErrorCtrl', function($scope, $controller, $mdDialog, result) {

    angular.extend(this, $controller('DialogCtrl', {
      $scope: $scope
    }));

    $scope.fromNow = moment.utc(result.time).local().fromNow();

    var data = result.meta || result.data;
    var error = data.error;
    $scope.error = error;

    var request = data.request;
    var agent = request.agent;

    $scope.title = getTitle(error);

    $scope.raw = {
      error: beautifyJSON(error),
      request: beautifyJSON(request)
    };

    if(typeof agent == 'string'){
      var parser = new UAParser();
      parser.setUA(agent);
      agent = parser.getResult();
    }

    $scope.request = {
      path: request.path,
      browser: agent.browser.name + ' ' + agent.browser.major,
      device: agent.device.name,
      os: agent.os.name,
      ip: request.ip,
      protocol: request.protocol,
      method: request.method
    };

    $scope.params = request.query || request.body;

  });


  function getTitle(error) {

    var title = '';
    if (error.name) {
      title = error.name + ': ';
    }
    if (error.message) {
      title += error.message;
    }
    if (error.Fault) {
      title += error.Fault.faultstring;
    }

    return title;

  }

})();

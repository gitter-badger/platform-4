/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: theme/source/main/socket.js
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
(function() {

  var app = angular.module('MainApp');

  app.factory('SocketIO', function($mdDialog) {

    var socket = socketCluster.connect({
      host: agneta.services.host,
      path: '/socket'
    });

    socket.on('connect', function() {
      console.log('CONNECTED');
    });

    socket.on('unauthorized', function() {
      console.error({
        title: 'Unauthorized',
        content: 'You are not able to connect with the socket server because you have unauthorized access privileges.'
      });
    });

    socket.on('error', function(err) {
      console.error(err);
      /*
              error({
                  title: 'Socket Error',
                  content: err
              });*/
    });

    function connect(namespace) {

      return {
        on: function(name, cb) {
          var channel = socket.subscribe(getName(name));
          channel.watch(cb);
        },
        emit: function(name, data) {
          socket.publish(getName(name), data);
        },
        removeAllListeners: function(name) {
          socket.unsubscribe(getName(name));
        }
      };

      function getName(name) {
        return namespace + '.' + name;
      }

    }



    function error(options) {

      $mdDialog.show({
        clickOutsideToClose: true,
        templateUrl: agneta.partial('error'),
        locals: {
          data: options
        },
        controller: 'DialogController'
      });
    }

    return {
      connect: connect
    };

  });

})();

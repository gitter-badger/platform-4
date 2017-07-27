/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: services/server/remotes/media/helpers/initOperation.js
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
const _ = require('lodash');

module.exports = function(Model, app) {

  Model.__initOperation = function(options) {

    return Promise.resolve()
      .then(function() {

        var socketProps = {
          index: options.index,
          id: options.id
        };

        return app.storage.upload({
          Bucket: Model.__bucket.name,
          Key: options.location,
          ContentType: options.mimetype,
          Body: options.file,
          onProgress: function(progress){
            options.onProgress(_.extend({
              uploadedSize: progress.loaded,
              fileSize: options.size,
              percentage: progress.loaded / options.size
            }, socketProps));
          }
        });

      })
      .then(function() {

        var fileProps = {
          location: options.location,
          isSize: options.isSize,
          size: options.size,
          type: options.type,
          contentType: options.mimetype
        };
        return Model.findOne({
          where: {
            location: options.location
          }
        })
          .then(function(fileInstance) {
            if (fileInstance) {
              //console.log('file update', fileProps);
              return fileInstance.updateAttributes(fileProps);
            } else {
              //console.log('file create', fileProps);
              return Model.create(fileProps);
            }
          });

      })
      .then(function(dbObject) {
        options.objectId = dbObject.id;
        return dbObject;
      });

  };
};

/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: services/server/remotes/account/roleAdd.js
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

module.exports = function(Model, app) {

  Model.roleOptions = app.get('roles');
  Model.roleKeys = _.keys(Model.roleOptions);

  Model.rolesInclude = _.map(Model.roleKeys, function(name) {
    return {
      relation: name,
      scope: {
        fields: ['id']
      }
    };
  });

  Model._roleAdd = function(id, name, _fields) {

    return Model.findById(id)
      .then(function(account) {

        if (!account) {
          throw new Error('Account not found');
        }

        var role = Model.roleOptions[name];

        if (!role) {
          throw new Error('No role found: ' + name);
        }

        var RoleModel = app.models[role.model];

        var fields = {
          accountId: account.id
        };

        if (_fields) {
          _.extend(fields, _fields);
        }

        return RoleModel.findOrCreate({
          where: {
            accountId: account.id
          }
        }, fields);

      })
      .then(function(result) {
        if (result[1]) {
          return result[1];
        }

        return {
          alreadyExists: true,
          message: 'Role already exists'
        };
      });

  };
};

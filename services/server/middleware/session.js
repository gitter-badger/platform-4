/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: services/server/middleware/session.js
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
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = function(app, _options) {

  var secret = app.get('cookie_secret');
  var db = app.get('db');

  var sessionStore = app.sessionStore = new MongoStore({
    url: db.url,
    collection: 'Session',
    ttl: 8 * 60 * 60,
    autoRemove: 'native'
  });

  var options = {
    name: 'agneta_session',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: true
    }
  };

  if (_options) {
    options.cookie.secure = _options.secure;
  }

  return session(options);

};

var config = {
  "org": {
    "domain": "dcl-test.auth0.com",
    "client_id": "lTUEMnFpYb0aiUKeIRPbh7pBxKM6sccx",
    "audience": "decentraland.org"
  },
  "today": {
    "domain": "dcl-test.auth0.com",
    "client_id": "lTUEMnFpYb0aiUKeIRPbh7pBxKM6sccx",
    "audience": "decentraland.org"
  },
  "zone": {
    "domain": "dcl-test.auth0.com",
    "client_id": "lTUEMnFpYb0aiUKeIRPbh7pBxKM6sccx",
    "audience": "decentraland.org"
  }
};

var TLD = window.location.hostname.match(/(\w+)$/)[0];
var credentials = config[TLD] || config['zone'];

var APP_DOMAIN = location.origin;
var DOMAIN = credentials.domain;
var CLIENT_ID = credentials.client_id;
var AUDIENCE = credentials.audience;
var LOGIN_REDIRECT = APP_DOMAIN + '/auth/login_callback.html';
var LOGOUT_REDIRECT = APP_DOMAIN + '/auth/logout_callback.html';
var REDIRECT_BASE_URL = APP_DOMAIN;

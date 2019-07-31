
window.addEventListener('load', function () {

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    responseType: 'token id_token',
    scope: 'openid',
    leeway: 60
  });

  webAuth.logout({
    returnTo: AUTH0_REDIRECT
  });
})

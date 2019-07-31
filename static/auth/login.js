
window.addEventListener('load', function() {
  var webAuth = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: EXTERNAL_ID,
    redirectUri: CALLBACK_URL,
    responseType: 'token id_token',
    scope: 'openid',
    leeway: 60
  });

  webAuth.authorize();
})

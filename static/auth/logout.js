
window.addEventListener('load', function () {
  var webAuth = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    responseType: 'token id_token',
    scope: 'openid',
    leeway: 60,
    audience: 'decentraland.org'
  })

  webAuth.logout({
    returnTo: LOGOUT_REDIRECT
  })
})

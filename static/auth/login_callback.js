window.addEventListener('load', function () {
  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_REDIRECT,
    responseType: 'token id_token',
    scope: 'openid email',
    leeway: 60
  })

  webAuth.parseHash(function (err, authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      send(authResult.accessToken)
    } else if (err) {
      console.log(err)
    }
  })
})

function send(token) {
  const origin = APP_DOMAIN
  if (window.self !== window.top) {
    // Is within an Iframe
    window.parent.postMessage(
      {
        type: 'DECENTRALAND_USER_TOKEN',
        token: token,
        from: 'IFRAME',
      },
      origin
    )
  } else if (window.opener && window.opener !== window) {
    // Is within a Popup
    window.opener.postMessage(
      {
        type: 'DECENTRALAND_USER_TOKEN',
        token: token,
        from: 'POPUP'
      },
      origin
    )
  } else {
    // Not an iframe nor a popup, then redirect to callback url
    document.location.href = REDIRECT_BASE_URL + '?user_token=' + token
  }
}

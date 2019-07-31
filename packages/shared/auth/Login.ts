import { future, IFuture } from 'fp-future'

import { Event, Message, UserTokenMessage, LoginType, ErrorMessage } from './Types'

export const IFRAME_STYLE_ID = 'decentraland-auth-iframe-style'
export const LOGIN_IFRAME_ID = 'decentraland-auth-login-iframe'
export const LOGOUT_IFRAME_ID = 'decentraland-auth-logout-iframe'

const LOGIN_URL = 'http://localhost:808/auth/login.html'
const LOGOUT_URL = 'http://localhost:808/auth/logout.html'

export const IFRAME_CSS = `#${LOGIN_IFRAME_ID} {
  width: 100%;
  height: 100%;
  border: none;
}
#${LOGOUT_IFRAME_ID} {
  width: 1px;
  height: 1px;
  border: none;
}
`

export class Login {
  loginFuture: IFuture<string> = future()
  logoutFuture: IFuture<void> = future()

  constructor() {
    window.addEventListener('message', this.handleMessage)
  }

  async fromIFrame(target: HTMLElement) {
    this.injectStyles()
    const iframe = document.createElement('iframe')
    iframe.id = LOGIN_IFRAME_ID
    iframe.src = LOGIN_URL
    // remove everything inside the target
    while (target.firstChild) {
      target.removeChild(target.firstChild)
    }
    target.appendChild(iframe)
    iframe.addEventListener('load', () => {
      if (iframe.contentWindow) {
        this.rejectOnClose(iframe.contentWindow)
      }
    })

    return this.loginFuture
  }

  async logout() {
    if (!document.getElementById(LOGOUT_IFRAME_ID)) {
      this.injectStyles()
      const iframe = document.createElement('iframe')
      iframe.id = LOGOUT_IFRAME_ID
      iframe.src = LOGOUT_URL
      document.body.appendChild(iframe)
    }
    return this.logoutFuture
  }

  dispose() {
    window.removeEventListener('message', this.handleMessage)
  }

  private injectStyles() {
    // inject css for iframe (only once)
    if (!document.getElementById(IFRAME_STYLE_ID)) {
      const style: HTMLStyleElement = document.createElement('style')
      style.id = IFRAME_STYLE_ID
      style.type = 'text/css'
      style.appendChild(document.createTextNode(IFRAME_CSS))
      document.head.appendChild(style)
    }
  }

  private handleMessage = async (event: MessageEvent) => {
    const data = event.data as Message
    if (!data) return
    switch (data.type) {
      case Event.LOGOUT: {
        const logoutIFrame = document.getElementById(LOGOUT_IFRAME_ID)
        if (logoutIFrame) {
          logoutIFrame.remove()
        }
        this.logoutFuture.resolve()
        this.logoutFuture = future()
        break
      }
      case Event.USER_TOKEN: {
        const data = event.data as UserTokenMessage
        // resolve user token
        this.loginFuture.resolve(data.token)
        this.loginFuture = future()

        if (data.from === LoginType.POPUP) {
          // close popup
          const source = event.source as Window
          source.close()
        } else if (data.from === LoginType.IFRAME) {
          // remove iframe
          const loginIFrame = document.getElementById(LOGIN_IFRAME_ID)
          if (loginIFrame) {
            loginIFrame.remove()
          }
        }

        break
      }
      case Event.ERROR: {
        await this.logout()

        const data = event.data as ErrorMessage
        if (data.from === LoginType.POPUP) {
          // close popup
          const source = event.source as Window
          source.close()
        } else if (data.from === LoginType.IFRAME) {
          // refresh iframe
          const loginIFrame = document.getElementById(LOGIN_IFRAME_ID) as HTMLIFrameElement
          if (loginIFrame) {
            const waitForPage = new Promise(resolve => (loginIFrame.onload = resolve))
            loginIFrame.src = LOGIN_URL
            await waitForPage
          }
        }
        let error = 'Error'
        if (data.error && data.error.errorDescription) {
          error = data.error.errorDescription
        }
        this.loginFuture.reject(Object.assign(new Error(error), { data }))
        this.loginFuture = future()

        break
      }
    }
  }

  private rejectOnClose(win: Window) {
    let interval: number | null = window.setInterval(() => {
      if (win.closed) {
        this.loginFuture.reject(new Error('Login window closed'))
        this.loginFuture = future()
      }
    }, 250)

    function clear() {
      if (interval) {
        clearInterval(interval)
      }
      interval = null
    }

    this.loginFuture.then(clear).catch(clear)
  }
}

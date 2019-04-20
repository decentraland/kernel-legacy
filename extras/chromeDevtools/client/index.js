function setupDevTools() {
    if (!window.__DCL_DEV_TOOLS__) {

        if (window.isDCLInitialized) {
            window.dclDevToolSend = function (name, data) {
                window.postMessage(
                {
                    source: 'dcl-inspect-agent',
                    name: name,
                    data: data || {}
                }, '*'
                )
            }
            window.addEventListener('message', function(event) {
                if (event.source !== window) {
                    return
                }
                var message = event.data
                if (typeof message !== 'object'
                    || message === null
                    || message.source !== 'dcl-inspect-devtools')
                {
                    return
                }
                switch (message.name) {
                    case 'connect':
                        dclDevToolSend('connected')
                        return
                    default:
                        console.log('didnt get it', message.name, message.data)
                }
            })
            window.postMessage(
                {
                    source: 'dcl-inspect-agent',
                    name: 'connected',
                    data: {}
                },
                '*'
            )
            window.__DCL_DEV_TOOLS__ = true
        } else {
            return setTimeout(setupDevTools, 1000)
        }
    }
}

setupDevTools()
// TODO: Code me in TS

const element = React.createElement("h1", null, "Connecting to DCL engine...");
const container = document.getElementById('root');
ReactDOM.render(element, container);

var port = chrome.runtime.connect({
  name: 'panel'
});
  
port.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

function sendMessage(name, data) {
  port.postMessage({
    name: name,
    tabId: chrome.devtools.inspectedWindow.tabId,
    data: data || {}
  })
}

function injectDebugger() {
  /* jshint evil: true */

  var injectedGlobal = 'window.__DCL_DEV_TOOLS__';

  chrome.devtools.inspectedWindow.eval(injectedGlobal, function(result) {
    if (!result) {
      // script hasn't been injected yet

      fetch(chrome.extension.getURL('/client/index.js'))
        .then(res => res.text())
        .then(script => {
            chrome.devtools.inspectedWindow.eval(script, function(result, err) {
                if (err) {
                    console.error(err);
                }
                sendMessage('connect');
            })
        })
        
    } else {
      // we're already injected, so just connect
      sendMessage('connect');
    }
  });
};

injectDebugger()

chrome.tabs.onUpdated.addListener(injectDebugger)

const finalLog = []

port.onMessage.addListener((msg, data) => {
    switch(msg) {
        case 'connected':
            window.document.writeln('<p>Connected</p>')
            break;
        case 'reloaded':
            injectDebugger()
            break;
        case 'dcl not found':
            setTimeout(injectDebugger, 2000)
            break;
        default:
            finalLog.push({msg, data})
            window.document.writeln(`<div><p>${msg.name}</p> <tt>${JSON.stringify(msg.data)}</tt> <br/> <tt>${typeof data === 'string' ? data : JSON.stringify(data)}</tt></div>`)
    }
})

/**
 * 
 * NEXT: a Poor Man's Redux
 * 
 */

function createStore(initialState, reducer) {
    let state = initialState
    const observers = []
    function getState() {
        return state
    }
    function dispatch(action) {
        let newState = reducer(action, state)
        if (newState !== state) {
            state = newState
            observers.map(observer => observer(newState, action))
        }
        return
    }
    function subscribe(listener) {
        if (observers.includes(listener)) {
            throw new Error('Bad request: observer already registered')
        }
        function unsubscribe() {
            observers = observers.filter(e => e !== listener)
        }
        observers.push(listener)
        return unsubscribe
    }
    function kill() {
        observers = []
        state = initialState
    }
    return {
        getState,
        dispatch,
        subscribe,
        kill
    }
}

/**
 * 
 * LATER: Reducer for the status of Decentraland based on received messages
 * 
 */

function dclReducer(state, action) {
    if (action) {
        return { ...state, thing: (state.thing || 0) + 1 }
    }
    return state
}
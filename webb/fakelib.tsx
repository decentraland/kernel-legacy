import React from 'react'
import ReactDOM from 'react-dom'

import { default as Config } from 'dcl/config'

export function show() {
  ReactDOM.render(
    <div>
      <h1>Hello dough</h1>
      <pre> {JSON.stringify(Config, null, 2)}</pre>
    </div>,
    document.querySelector('body')
  )
}

show()

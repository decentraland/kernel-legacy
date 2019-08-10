import React from 'react'
import Terminal from 'react-console-emulator'

const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: function () {
      return `${Array.from(arguments).join(' ')}`
    }
  }
}

export default class MyTerminal extends React.Component {
  render () {
    return (
      <Terminal
        style={{ background: '#ffffff'}}
        inputStyle={{ color: '#2f2f2c', height: '25px' }}
        commands={commands}
        promptLabel={'$'}
      />
    )
  }
}

import React from 'react'
const Terminal = require('react-console-emulator').default

const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: function() {
      return `${Array.from(arguments).join(' ')}`
    }
  }
}

export class MyTerminal extends React.Component {
  render() {
    return (
      <Terminal
        style={{ background: '#ffffff' }}
        inputStyle={{ color: '#2f2f2c', height: '25px' }}
        commands={commands}
        promptLabel={'$'}
      />
    )
  }
}

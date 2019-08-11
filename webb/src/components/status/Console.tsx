import React from 'react'
const Terminal = require('react-console-emulator').default

const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: function() {
      return `${Array.from(arguments).join(' ')}`
    }
  },
  getProfile: {
    description: 'Get a profile using a userId',
    usage: 'getProfile <userId>',
    fn: function(userId: string) {}
  },
  goto: {
    description: 'Teleport to another position',
    usage: 'goto <x> <y>',
    fn: function(x: string, y: string) {}
  },
  list: {
    description: 'List userIds around your position',
    usage: 'list',
    fn: function() {}
  },
  listTopics: {
    description: 'List topics to which you are connected',
    usage: 'listTopics',
    fn: function() {}
  },
  scenes: {
    description: 'List the scenes that should be loaded around you',
    usage: 'scenes',
    fn: function() {}
  },
  scripts: {
    description: 'List the current running scene scripts',
    usage: 'scripts',
    fn: function() {}
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

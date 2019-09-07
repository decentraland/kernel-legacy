import { Segment } from 'decentraland-ui'
import React from 'react'
const Terminal = require('react-console-emulator').default

var term = null
var commands = {}
function makeCommands(that) {
  if (!term) {
    term = that
    Object.assign(commands, {
      getProfile: {
        description: 'Get a profile using a userId',
        usage: 'getProfile <userId>',
        fn: function(userId: string) {
          return 'Fetching profile for user ' + userId + '...'
        }
      },
      status: {
        description: 'Print your position and the current scene',
        usage: 'status',
        fn: function() {
          return 'Not implemented'
        }
      },
      goto: {
        description: 'Teleport to another position',
        usage: 'goto <x> <y>',
        fn: function() {
          return 'Not implemented'
        }
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
    })
  }
  return commands
}

export class MyTerminal extends React.Component {
  terminal = React.createRef()
  render() {
    return (
      <Segment>
        <h3>Console</h3>
        <Terminal
          style={{ background: '#ffffff', maxHeight: '200px' }}
          inputStyle={{ color: '#2f2f2c', height: '25px' }}
          commands={makeCommands(this)}
          ref={this.terminal}
          promptLabel={'$'}
        />
      </Segment>
    )
  }
}

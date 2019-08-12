import React from 'react'
import { client } from '~/modules/systems'
const Terminal = require('react-console-emulator').default

var term = null
var commands = {}
function makeCommands(that) {
  if (!term) {
    term = that
    Object.assign(commands, {
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
        fn: function(userId: string) {
          setTimeout(async function() {
            try {
              const profile = await client.Passports.passports.getStoredProfile(client.Auth.auth, userId)
              for (let line of JSON.stringify(profile, null, 2).split('\n')) {
                term.terminal.current.pushToStdout(<pre style={{ margin: 0 }}>{line}</pre>)
              }
            } catch (err) {
              return term.terminal.current.pushToStdout(`Error fetching profile: ${err.message}\n${err.stack}`)
            }
          }, 0)
          return 'Fetching profile for user ' + userId + '...'
        }
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
    })
  }
  return commands
}

export class MyTerminal extends React.Component {
  terminal = React.createRef()
  render() {
    return (
      <Terminal
        style={{ background: '#ffffff', maxHeight: '200px' }}
        inputStyle={{ color: '#2f2f2c', height: '25px' }}
        commands={makeCommands(this)}
        ref={this.terminal}
        promptLabel={'$'}
      />
    )
  }
}

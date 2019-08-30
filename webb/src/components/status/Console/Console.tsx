import React from 'react'
import { worldToGrid } from '@dcl/utils'
import { Validations, MyPresence, SceneLoader } from '@dcl/kernel'
import { client } from '~/modules/systems'
import { Segment } from 'decentraland-ui'
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
      status: {
        description: 'Print your position and the current scene',
        usage: 'status',
        fn: function() {
          ;(async () => {
            const { x, z } = (client.MyPresence.myPresenceTracker as MyPresence).lastPlayerPosition
            const [a, b] = worldToGrid({ x, z })
            const { sceneId } = await (client.MyPresence.myPresenceTracker
              .loader as SceneLoader).getSceneForCoordinates(a, b)
            return term.terminal.current.pushToStdout(`You are at ${a},${b}: ${sceneId}`)
          })()
        }
      },
      goto: {
        description: 'Teleport to another position',
        usage: 'goto <x> <y>',
        fn: function(w: string, z: string) {
          if (w.includes(',') && !z) {
            ;[w, z] = w.split(',')
          }
          const [x, y] = [w, z].map(_ => parseInt(_.replace(',', ''), 10))
          if (!Validations.isValidCoordinateDefinition(`${x},${y}`)) {
            return 'Invalid coordinates, sample usage: "goto 4, -100"'
          }
          client.MyPresence.myPresenceTracker.teleport(x, y)
          return `Teleporting to ${x}, ${y}`
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
        fn: function() {
          ;(async () => {
            const { x, z } = (client.MyPresence.myPresenceTracker as MyPresence).lastPlayerPosition
            const [a, b] = worldToGrid({ x, z })
            const { sceneId } = await (client.MyPresence.myPresenceTracker
              .loader as SceneLoader).getSceneForCoordinates(a, b)
            return term.terminal.current.pushToStdout(`You are at ${a},${b}: ${sceneId}`)
          })()
        }
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

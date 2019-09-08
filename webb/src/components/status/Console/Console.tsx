import React from 'react'
import { Segment } from '~/components/liteui/dcl'
import { Auth } from '~/kernel/auth'
import { commsStarted } from '~/kernel/comms/actions'
import { passportRequest } from '~/kernel/passports/actions'
import { SceneLifeCycleHelper } from '~/kernel/scene-runner/SceneLifeCycleHelper'
import { SceneWorkersManager } from '~/kernel/scene-scripts/SceneWorkersManager'
import { store } from '~/kernel/store'
import { teleport } from '~/kernel/userLocation/PositionSettlement/actions'
import { initializeUnity } from '~/unity/incoming'
const Terminal = require('react-console-emulator').default

const auth = new Auth()
var term = null
var commands = {}
function makeCommands(that) {
  auth.store = store
  const sceneManager = new SceneWorkersManager()
  const Loader = new SceneLifeCycleHelper()
  Loader.store = store

  if (!term) {
    term = that
    Object.assign(commands, {
      start: {
        description: 'Start the unity renderer',
        usage: 'start',
        fn: function() {
          initializeUnity(document.getElementById('renderer'))
          document.getElementById('root').remove()
        }
      },
      getProfile: {
        description: 'Get a profile using a userId',
        usage: 'getProfile <userId>',
        fn: function(userId: string) {
          store.dispatch(passportRequest(userId))
          return 'Fetching profile for user ' + userId + '...'
        }
      },
      connect: {
        description: 'Connect to the comms server',
        usage: 'status',
        fn: function() {
          store.dispatch(commsStarted())
          return 'Getting comms access token'
        }
      },
      status: {
        description: 'Print your position and the current scene',
        usage: 'status',
        fn: function() {
          const c = store.getState().parcelSight.currentPosition
          const sceneId = store.getState().positionToSceneId.resolvedPositionToScene[`${c.x},${c.y}`]
          return `${c.x},${c.y}: ${sceneId}`
        }
      },
      goto: {
        description: 'Teleport to another position',
        usage: 'goto <x> <y>',
        fn: function(x, y) {
          try {
            store.dispatch(teleport(x + ',' + y))
            return `Teleporting to ${x}, ${y}`
          } catch (e) {
            return `Error on teleport: ${e.stack}`
          }
        }
      },
      run: {
        description: 'Run scene at coordinates',
        usage: 'run <x> <y>',
        fn: function(x, y) {
          try {
            Loader.getSceneForCoordinates(x, y).then(scene => {
              try {
                sceneManager.loadScene(scene)
              } catch (e) {
                console.log(e)
              }
            })
            return `Loading scene at ${x}, ${y}...`
          } catch (e) {
            return `Error on teleport: ${e.stack}`
          }
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

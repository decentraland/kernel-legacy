import React from 'react'
import { Auth } from '~/kernel/auth'
import { commsStarted } from '~/kernel/comms/actions'
import { teleport } from '~/kernel/userLocation/PositionSettlement/actions'
import { SceneLoader } from '~/kernel/loader/SceneLoader'
import { passportRequest } from '~/kernel/passports/actions'
import { SceneWorkersManager } from '~/kernel/scene-runner/SceneWorkersManager'
import { store } from '~/kernel/store'
import { migrateFromILand } from '~/kernel/worldMap/sceneTransforms/migrateFromILand'
import { Segment } from '~/components/liteui/dcl'
const Terminal = require('react-console-emulator').default

const auth = new Auth()
var term = null
var commands = {}
function makeCommands(that) {
  auth.store = store
  const sceneManager = new SceneWorkersManager()
  const Loader = new SceneLoader()
  Loader.store = store

  if (!term) {
    term = that
    Object.assign(commands, {
      dispatch: {
        description: 'Dispatch an action to the store',
        usage: 'dispatch',
        fn: function(...args: any[]) {
          const type = args[0]
          if (type) {
            try {
              store.dispatch({ type: args[0], payload: args.slice(1) })
            } catch (e) {
              return 'Error!' + e.stack
            }
            return 'dispatching ' + JSON.stringify(args)
          } else {
            return 'no type provided'
          }
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
                sceneManager.loadScene(migrateFromILand(scene))
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

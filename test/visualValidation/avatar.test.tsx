import { saveScreenshot, enableVisualTests, wait, waitToBeLoaded, awaitHud } from '../testHelpers'
import { avatarMessageObservable } from 'shared/comms/peers'
import { AvatarMessageType, Pose } from 'shared/comms/types'
import { gridToWorld } from 'atomicHelpers/parcelScenePositions'
import { Quaternion } from 'babylonjs'
enableVisualTests('Avatar visual validation', function(root) {
  // const playerProfile = {
  //   displayName: 'Test Avatar',
  //   publicKey: '0x55ed2910cc807e4596024266ebdf7b1753405a11',
  //   username: 'tester',
  //   status: 'Testing!!! 🎉🔥🚀'
  // }

  const hud = awaitHud()

  it('creates a test scene with avatars', async () => {
    const tmpPosition = { x: 0, y: 0, z: 0 }
    const rotation = Quaternion.RotationYawPitchRoll(0, 0, 0)

    function getPose(worldX: number, worldZ: number): Pose {
      gridToWorld(worldX, worldZ, tmpPosition)
      return [tmpPosition.x, tmpPosition.y, tmpPosition.z, rotation.x, rotation.y, rotation.z, rotation.w]
    }

    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_DATA,
      uuid: 'avatar1',
      data: {
        avatarType: 'avatar/main.gltf',
        pose: getPose(50, 0.3),
        publicKey: '0x55ed2910cc807e4596024266ebdf7b1753405a11',
        displayName: 'Test Avatar',
        status: 'Testing!!! 🎉🔥🚀'
      }
    })

    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_DATA,
      uuid: 'avatar2',
      data: { avatarType: 'avatar/main.gltf', pose: getPose(51, 0.3), publicKey: '2', displayName: 'Dani' }
    })

    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_DATA,
      uuid: 'avatar3',
      data: { avatarType: 'avatar/main.gltf', pose: getPose(52, 0.3), publicKey: '3', displayName: 'Juancat' }
    })

    wait(2000)
    await waitToBeLoaded((await hud).context.rootEntity)
  })

  it('open profile ui for avatar1', async () => {
    // Because I DON'T KNOW when it did load.
    wait(1000)
    await waitToBeLoaded((await hud).context.rootEntity)
    wait(1000)
    await waitToBeLoaded((await hud).context.rootEntity)
    wait(1000)
    await waitToBeLoaded((await hud).context.rootEntity)
    wait(1000)
    await waitToBeLoaded((await hud).context.rootEntity)
  })

  saveScreenshot(`avatar-round-robot.png`, { from: [51.0, 1.8, 0.6], lookAt: [51.0, 1.3, 0.3] })

  saveScreenshot(`avatar-square-robot.png`, {
    from: [50.0, 1.8, 0.6],
    lookAt: [50.0, 1.3, 0.3]
  })

  saveScreenshot(`avatar-fox.png`, { from: [52.0, 1.8, 0.6], lookAt: [52.0, 1.3, 0.3] })

  it('open profile ui for avatar1', async () => {
    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.SHOW_WINDOW,
      uuid: 'avatar3'
    })
  })

  wait(200)

  saveScreenshot(`avatar-profile-ui.png`, { from: [50.0, 1.8, 0.7], lookAt: [49.9, 1.3, 0.3] })

  it('disposes all avatars', async () => {
    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_REMOVED,
      uuid: 'avatar1'
    })
    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_REMOVED,
      uuid: 'avatar2'
    })
    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_REMOVED,
      uuid: 'avatar3'
    })
  })

  wait(2000)
})

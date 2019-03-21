import {
  Entity,
  GLTFShape,
  Transform,
  engine,
  Vector3,
  OnPointerDown,
  AnimationClip,
  Animator,
  log
} from 'decentraland-ecs/src'

// First way to
const shark = new Entity()
const shape = new GLTFShape('shark_anim.gltf')
const animator = shark.getComponentOrCreate(Animator)
const clip = animator.getClip('shark_skeleton_swim')
clip.setParams({ weight: 0.7, speed: 3.0 })
animator.addClip(clip)
clip.play()

shark.addComponentOrReplace(shape)
shark.addComponentOrReplace(
  new Transform({
    position: new Vector3(2, 1, 6)
  })
)

shark.addComponentOrReplace(
  new OnPointerDown(() => {
    // just to test getting a clip
    const clip = animator.getClip('shark_skeleton_swim')
    if (clip) {
      clip.playing = !clip.playing
    }
  })
)

// Second shark
const shark2 = new Entity()
const clip2 = new AnimationClip('shark_skeleton_bite', { weight: 0.7, speed: 5 })
const clip3 = new AnimationClip('shark_skeleton_swim', { weight: 0.7, speed: 0.5 })
const animator2 = shark2.getComponentOrCreate(Animator)
animator2.addClip(clip2)
animator2.addClip(clip3)
clip2.play()
clip3.play()

shark2.addComponentOrReplace(shape)
shark2.addComponentOrReplace(
  new Transform({
    position: new Vector3(6, 1, 6)
  })
)

shark2.addComponentOrReplace(
  new OnPointerDown(() => {
    const clip1 = animator2.getClip('shark_skeleton_swim')
    clip1.restart()

    const clip2 = animator2.getClip('shark_skeleton_bite')
    clip2.stop()
  })
)

// Third shark
const shark3 = new Entity()
const clip4 = new AnimationClip('shark_skeleton_bite', { weight: 0.7, speed: 0.2 })
const clip5 = new AnimationClip('shark_skeleton_swim', { weight: 0.7, speed: 0.6 })
const animator3 = shark3.getComponentOrCreate(Animator)
animator3.addClip(clip4)
animator3.addClip(clip5)

shark3.addComponentOrReplace(shape)
shark3.addComponentOrReplace(
  new Transform({
    position: new Vector3(10, 1, 6)
  })
)

shark3.addComponentOrReplace(
  new OnPointerDown(() => {
    const clip1 = animator3.getClip('shark_skeleton_swim')
    // Swimming should continue playing after it restarts
    clip1.restart()

    // Biting should stop and start from half-closed mouth (initial state)
    const clip2 = animator3.getClip('shark_skeleton_bite')
    if (clip2.playing) {
      clip2.stop()
    } else {
      clip2.play()
    }
  })
)

engine.addEntity(shark)
engine.addEntity(shark2)
engine.addEntity(shark3)

declare var dcl: any

dcl.onEvent(function(event: any) {
  log('event', event)
})

import {
  Entity,
  GLTFShape,
  Transform,
  engine,
  Vector3,
  OnPointerDown,
  AnimationClip,
  Animator,
  log,
  BoxShape,
  TextShape
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
    position: new Vector3(2.5, 1, 6)
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

// set shark 3 bite looping on/off
let button1 = new Entity()
button1.addComponent(new BoxShape())
button1.addComponent(
  new Transform({
    position: new Vector3(9, 1, 2),
    scale: new Vector3(0.5, 0.5, 0.5)
  })
)
button1.addComponent(
  new OnPointerDown(e => {
    const clip = animator3.getClip('shark_skeleton_bite')
    clip.looping != clip.looping
    log('looping: ', clip.looping)
  })
)
engine.addEntity(button1)

let label1 = new Entity()
label1.addComponent(new TextShape('toggle loop'))
label1.setParent(button1)
label1.addComponent(
  new Transform({
    position: new Vector3(0, 2, 0)
  })
)
engine.addEntity(label1)

// set shark 3 bite playing
let button2 = new Entity()
button2.addComponent(new BoxShape())
button2.addComponent(
  new Transform({
    position: new Vector3(10, 1, 2),
    scale: new Vector3(0.5, 0.5, 0.5)
  })
)
button2.addComponent(
  new OnPointerDown(e => {
    const clip = animator3.getClip('shark_skeleton_bite')
    clip.play()
    log('clip playing')
  })
)
engine.addEntity(button2)

let label2 = new Entity()
label2.addComponent(new TextShape('Play'))
label2.setParent(button2)
label2.addComponent(
  new Transform({
    position: new Vector3(0, 2, 0)
  })
)
engine.addEntity(label2)

// set shark 3 bite restart
let button3 = new Entity()
button3.addComponent(new BoxShape())
button3.addComponent(
  new Transform({
    position: new Vector3(11, 1, 2),
    scale: new Vector3(0.5, 0.5, 0.5)
  })
)
button3.addComponent(
  new OnPointerDown(e => {
    const clip = animator3.getClip('shark_skeleton_bite')
    clip.restart()
    log('clip restart')
  })
)
engine.addEntity(button3)

let label3 = new Entity()
label3.addComponent(new TextShape('Restart'))
label3.setParent(button3)
label3.addComponent(
  new Transform({
    position: new Vector3(0, 2, 0)
  })
)
engine.addEntity(label3)

// set shark 3 bite pause
let button4 = new Entity()
button4.addComponent(new BoxShape())
button4.addComponent(
  new Transform({
    position: new Vector3(12, 1, 2),
    scale: new Vector3(0.5, 0.5, 0.5)
  })
)
button4.addComponent(
  new OnPointerDown(e => {
    const clip = animator3.getClip('shark_skeleton_bite')
    clip.pause()
    log('clip pause')
  })
)
engine.addEntity(button4)

let label4 = new Entity()
label4.addComponent(new TextShape('Pause'))
label4.setParent(button4)
label4.addComponent(
  new Transform({
    position: new Vector3(0, 2, 0)
  })
)
engine.addEntity(label4)

// set shark 3 bite stop
let button5 = new Entity()
button5.addComponent(new BoxShape())
button5.addComponent(
  new Transform({
    position: new Vector3(13, 1, 2),
    scale: new Vector3(0.5, 0.5, 0.5)
  })
)
button5.addComponent(
  new OnPointerDown(e => {
    const clip = animator3.getClip('shark_skeleton_bite')
    clip.stop()
    log('clip stop')
  })
)
engine.addEntity(button5)

let label5 = new Entity()
label5.addComponent(new TextShape('Stop'))
label5.setParent(button5)
label5.addComponent(
  new Transform({
    position: new Vector3(0, 2, 0)
  })
)
engine.addEntity(label5)

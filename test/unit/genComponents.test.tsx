import { expect } from 'chai'
import * as ts from 'typescript'
import { genComponents } from '../../packages/shared/proto/genComponents'

describe('generate component proto', () => {
  it('creates PB_AudioClip', () => {
    const source = `
/**
 * @public
 */
export declare class AudioClip extends ObservableComponent {
  readonly url: string
  /**
   * Is this clip looping by default?
   */
  loop: boolean
  /**
   * Clip's master volume. This volume affects all the AudioSources.
   * Valid ranges from 0 to 1
   */
  volume: number
  constructor(url: string)
}`
    const result = `message PB_AudioClip {
  string url = 1;
  boolean loop = 2;
  float volume = 3;
}`
    const sourceFile = ts.createSourceFile('source', source, ts.ScriptTarget.ES2015, /*setParentNodes */ true)
    expect(genComponents(sourceFile).trim()).to.equal(result.trim())
  })

  it('works with multiple definitions', () => {
    const source = `
export declare class AudioClip extends ObservableComponent {
  readonly url: string
  loop: boolean
}
 
/**
 * @public
 */
export declare class AudioSource extends ObservableComponent {
  readonly audioClip: AudioClip
  readonly audioClipId: string
  /**
   * Is this clip looping by default?
   */
  loop: boolean
  /**
   * Clip's master volume. This volume affects all the AudioSources.
   * Valid ranges from 0 to 1
   */
  volume: number
  /**
   * Is this AudioSource playing?
   */
  playing: boolean
  /**
   * Pitch, default: 1.0, range from 0.0 to MaxFloat
   */
  pitch: number
  constructor(audioClip: AudioClip)
  /**
   * Disables the looping and plays the current source once.
   * If the sound was playing, it stops and starts over.
   */
  playOnce(): this
}
`
    const result = `message PB_AudioClip {
  string url = 1;
  boolean loop = 2;
}

message PB_AudioSource {
  PB_AudioClip audioClip = 1;
  string audioClipId = 2;
  boolean loop = 3;
  float volume = 4;
  boolean playing = 5;
  float pitch = 6;
}`
    const sourceFile = ts.createSourceFile('source', source, ts.ScriptTarget.ES2015, /*setParentNodes */ true)
    expect(genComponents(sourceFile).trim()).to.equal(result.trim())
  })
})

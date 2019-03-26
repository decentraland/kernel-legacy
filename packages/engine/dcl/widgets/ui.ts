import { SceneWorker, hudWorkerUrl } from 'shared/world/SceneWorker'
import { ensureUiApis } from 'shared/world/uiSceneInitializer'

import { SharedSceneContext } from '../../entities/SharedSceneContext'
import { WebGLScene } from '../WebGLScene'

export class WebGLUIScene extends WebGLScene<any> {
  constructor(id: string, main: string, context: SharedSceneContext) {
    super(
      {
        baseUrl: context.baseUrl,
        main,
        data: {},
        id,
        mappings: []
      },
      context
    )

    this.context.rootEntity.name = this.context.rootEntity.id = id
    // tslint:disable-next-line:no-unused-expression
    new SceneWorker(this)
  }
}

export async function initHudSystem(): Promise<WebGLUIScene> {
  const context = new SharedSceneContext('/', 'ui-context-hud', false)

  context.useMappings = false
  context.baseUrl = document.location.origin
  const scene = new WebGLUIScene('hud', hudWorkerUrl, context)

  await ensureUiApis(scene.worker!)

  return scene
}

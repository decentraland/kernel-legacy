import { SceneWorker, hudWorkerUrl } from 'shared/world/SceneWorker'
import { ensureUiApis } from 'shared/world/uiSceneInitializer'

import { SharedSceneContext } from '../../entities/SharedSceneContext'
import { WebGLScene } from '../WebGLScene'
import { UIFullScreenTexture } from 'engine/components/disposableComponents/ui/UIFullscreenTexture'
import { UIInputText } from 'engine/components/disposableComponents/ui/UIInputText'

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

  moveFocusTo(uuidParent: string, uuidChild: string) {
    const fullscreen = this.context.getComponent(uuidParent) as UIFullScreenTexture
    const inputComponent = this.context.getComponent(uuidChild) as UIInputText
    if (fullscreen && inputComponent) {
      fullscreen.fullscreenTexture.moveFocusToControl(inputComponent.control)
    }
  }
}

export let hud: WebGLUIScene | null = null

export async function initHudSystem(): Promise<WebGLUIScene> {
  if (!hud) {
    const context = new SharedSceneContext('/', 'ui-context-hud', false)

    context.useMappings = false
    context.baseUrl = document.location.origin
    hud = new WebGLUIScene('hud', hudWorkerUrl, context)

    await ensureUiApis(hud.worker!)
  }
  return hud
}

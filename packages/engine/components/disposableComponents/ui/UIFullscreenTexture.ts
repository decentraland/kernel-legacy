import { DisposableComponent } from '../DisposableComponent'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { CLASS_ID, Observer } from 'decentraland-ecs/src'
import { UIFullScreenShape } from 'decentraland-ecs/src/decentraland/UIShapes'
import { UIInputText } from './UIInputText'
import { SharedSceneContext } from 'engine/entities/SharedSceneContext'
import { moveFocusObservable } from 'shared/world/uiSceneInitializer'

export class UIFullScreenTexture extends DisposableComponent {
  fullscreenTexture: BABYLON.GUI.AdvancedDynamicTexture
  listener: Observer<{}>

  constructor(context: SharedSceneContext, uuid: string) {
    super(context, uuid)
    this.fullscreenTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('fullscreen-texture')
    this.listener = moveFocusObservable.add((data: any) => {
      if (data.parentUUID === this.uuid) {
        const component = this.context.getComponent(data.childUUID)
        if (component) {
          this.fullscreenTexture.moveFocusToControl((component as UIInputText).control)
        }
      }
    })!
  }

  onAttach(_entity: BaseEntity): void {
    // noop
  }

  onDetach(_entity: BaseEntity): void {
    // noop
  }

  dispose() {
    if (this.fullscreenTexture) {
      this.fullscreenTexture.dispose()
      delete this.fullscreenTexture
    }
    moveFocusObservable.remove(this.listener)
    delete this.listener

    super.dispose()
  }

  async updateData(_: UIFullScreenShape): Promise<void> {
    // noop
  }
}

DisposableComponent.registerClassId(CLASS_ID.UI_FULLSCREEN_SHAPE, UIFullScreenTexture)

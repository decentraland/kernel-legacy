import { DeployedScene } from '../../scenes/types/DeployedScene'

export function getSceneIdFromSceneMappingResponse(scene: DeployedScene) {
  return scene.root_cid
}

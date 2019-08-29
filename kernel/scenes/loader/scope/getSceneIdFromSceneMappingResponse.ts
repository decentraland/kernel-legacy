import { DeployedScene } from '../../types/DeployedScene'

export function getSceneIdFromSceneMappingResponse(scene: DeployedScene) {
  return scene.root_cid
}

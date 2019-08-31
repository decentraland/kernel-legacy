import { DeployedScene } from '../../scene-runner/types/DeployedScene'

export function getSceneIdFromSceneMappingResponse(scene: DeployedScene) {
  return scene.root_cid
}

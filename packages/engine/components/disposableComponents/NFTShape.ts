import { DisposableComponent, BasicShape } from './DisposableComponent'
import { CLASS_ID } from 'decentraland-ecs/src'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { cleanupAssetContainer, processColliders } from 'engine/entities/utils/processModels'
import { scene, engine } from 'engine/renderer'
import { probe } from 'engine/renderer/ambientLights'
import { DEBUG } from 'config'
import { log } from 'util'
import { Animator } from '../ephemeralComponents/Animator'
import { deleteUnusedTextures, isSceneTexture } from 'engine/renderer/monkeyLoader'

BABYLON.SceneLoader.OnPluginActivatedObservable.add(function(plugin) {
  if (plugin instanceof BABYLON.GLTFFileLoader) {
    plugin.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.NONE
    plugin.compileMaterials = true
    plugin.validate = true
    plugin.animationStartMode = 0
  }
})

const loadingShapeMaterial = new BABYLON.StandardMaterial('loading-material', scene)
loadingShapeMaterial.diffuseColor = loadingShapeMaterial.emissiveColor = BABYLON.Color3.FromHexString('#1D82FF') // a '#ff2d55'

const loadingShape = BABYLON.MeshBuilder.CreateDisc(
  'loading-disk',
  {
    arc: Math.PI * 0.125,
    radius: 0.3
  },
  scene
)
loadingShape.material = loadingShapeMaterial

loadingShape.setEnabled(false)

function parseProtocolUrl(url: string): { protocol: string; registry: string; asset: string } {
  const parsedUrl = /([^:]+):\/\/([^/]+)(?:\/(.+))?/.exec(url)

  if (!parsedUrl) throw new Error('The provided URL is not valid: ' + url)

  const result = {
    asset: parsedUrl[3],
    registry: parsedUrl[2],
    protocol: parsedUrl[1]
  }

  if (result.protocol.endsWith(':')) {
    result.protocol = result.protocol.replace(/:$/, '')
  }

  if (result.protocol !== 'ethereum') {
    throw new Error('Invalid protocol: ' + result.protocol)
  }

  return result
}

async function fetchDARAsset(registry: string, assetId: string): Promise<{ image: string }> {
  const req = await fetch(`https://schema-api-staging.now.sh/dar/${registry}/asset/${assetId}`)
  return req.json()
}

async function fetchBase64Image(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {}, // 'X-KEY': 'asd'
    mode: 'cors',
    cache: 'default'
  })

  const buffer = await response.arrayBuffer()
  let base64Flag = `data:${response.headers.get('content-type')};base64,`
  let imageStr = arrayBufferToBase64(buffer)

  return base64Flag + imageStr
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = ''
  let bytes = [].slice.call(new Uint8Array(buffer))

  bytes.forEach((b: number) => (binary += String.fromCharCode(b)))

  return btoa(binary)
}

export class NFTShape extends DisposableComponent {
  src: string | null = null
  assetContainerEntity = new Map<string, BABYLON.AssetContainer>()
  entityIsLoading = new Set<string>()
  error = false
  tex: BABYLON.Texture | null = null

  loadingDone(entity: BaseEntity): boolean {
    if (this.error) {
      return true
    }
    if (this.entities.has(entity)) {
      if (this.entityIsLoading.has(entity.uuid)) {
        return false
      }
      return true
    }
    return false
  }

  onAttach(entity: BaseEntity): void {
    if (!this.entityIsLoading.has(entity.uuid)) {
      this.entityIsLoading.add(entity.uuid)

      const loadingEntity = new BABYLON.TransformNode('loading-padding')

      entity.setObject3D(BasicShape.nameInEntity, loadingEntity)

      {
        const loadingInstance = loadingShape.createInstance('a')
        loadingInstance.parent = loadingEntity
        loadingInstance.position.y = 0.8
        const animationDisposable = scene.onAfterRenderObservable.add(() => {
          loadingInstance.rotation.set(0, 0, loadingInstance.rotation.z - engine.getDeltaTime() * 0.01)
          loadingInstance.billboardMode = 7
        })

        loadingEntity.onDisposeObservable.add(() => {
          loadingEntity.parent = null
          loadingInstance.parent = null
          loadingInstance.dispose()
          scene.onAfterRenderObservable.remove(animationDisposable)
        })
      }

      BABYLON.SceneLoader.LoadAssetContainer(
        'models/frames/basic.glb',
        undefined,
        scene,
        assetContainer => {
          this.entityIsLoading.delete(entity.uuid)

          if (this.assetContainerEntity.has(entity.uuid)) {
            this.onDetach(entity)
          }

          assetContainer.meshes.forEach(mesh => {
            if (mesh instanceof BABYLON.Mesh) {
              if (mesh.geometry && !assetContainer.geometries.includes(mesh.geometry)) {
                assetContainer.geometries.push(mesh.geometry)
              }
            }
            mesh.subMeshes &&
              mesh.subMeshes.forEach(subMesh => {
                const mesh = subMesh.getMesh()
                if (mesh instanceof BABYLON.Mesh) {
                  if (mesh.geometry && !assetContainer.geometries.includes(mesh.geometry)) {
                    assetContainer.geometries.push(mesh.geometry)
                  }
                }
              })
          })

          processColliders(assetContainer)

          // Find all the materials from all the meshes and add to $.materials
          assetContainer.meshes.forEach(mesh => {
            mesh.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
            if (mesh.material) {
              if (!assetContainer.materials.includes(mesh.material)) {
                assetContainer.materials.push(mesh.material)
              }
            }
          })

          // Find the textures in the materials that share the same domain as the context
          // then add the textures to the $.textures
          assetContainer.materials.forEach((material: BABYLON.Material | BABYLON.PBRMaterial) => {
            for (let i in material) {
              const t = (material as any)[i]

              if (i.endsWith('Texture') && t instanceof BABYLON.Texture && t !== probe.cubeTexture) {
                if (!assetContainer.textures.includes(t)) {
                  if (isSceneTexture(t)) {
                    assetContainer.textures.push(t)
                  }
                }
              }
            }

            if ('reflectionTexture' in material) {
              material.reflectionTexture = probe.cubeTexture
            }

            if ('albedoTexture' in material) {
              if (material.alphaMode === 2) {
                if (material.albedoTexture) {
                  material.albedoTexture.hasAlpha = true
                  material.useAlphaFromAlbedoTexture = true
                }
              }
            }
          })

          loadingEntity.dispose(false, false)

          const mat1 = assetContainer.materials[0] as BABYLON.PBRMaterial

          if (this.tex) {
            mat1.useAlphaFromAlbedoTexture = true
            mat1.forceAlphaTest = true
            mat1.albedoTexture = this.tex
            mat1.emissiveIntensity = 0
            mat1.metallic = 0
            mat1.roughness = 1
            mat1.albedoColor = BABYLON.Color3.White()
            mat1.enableSpecularAntiAliasing = true
          }

          assetContainer.addAllToScene()

          if (this.isStillValid(entity)) {
            // Fin the main mesh and add it as the BasicShape.nameInEntity component.
            assetContainer.meshes
              .filter($ => $.name === '__root__')
              .forEach(mesh => {
                entity.setObject3D(BasicShape.nameInEntity, mesh)
              })

            this.assetContainerEntity.set(entity.uuid, assetContainer)

            entity.assetContainer = assetContainer

            for (let ag of assetContainer.animationGroups) {
              ag.stop()
              for (let animatable of ag.animatables) {
                animatable.weight = 0
              }
            }

            const animator: Animator = entity.getBehaviorByName('animator') as Animator

            if (animator) {
              animator.transformValue(animator.value!)
            }
          } else {
            cleanupAssetContainer(assetContainer)
            deleteUnusedTextures()
          }
        },
        null,
        (_scene, message, exception) => {
          this.entityIsLoading.delete(entity.uuid)

          this.context.logger.error('Error loading GLTF', message, exception)
          this.onDetach(entity)
          entity.assetContainer = void 0

          const animator: Animator = entity.getBehaviorByName('animator') as Animator

          if (animator) {
            animator.transformValue(animator.value!)
          }
        }
      )
    }
  }

  onDetach(entity: BaseEntity): void {
    this.entityIsLoading.delete(entity.uuid)

    const mesh = entity.getObject3D(BasicShape.nameInEntity)

    if (mesh) {
      entity.removeObject3D(BasicShape.nameInEntity)
    }

    entity.assetContainer = void 0

    const assetContainer = this.assetContainerEntity.get(entity.uuid)

    if (assetContainer) {
      cleanupAssetContainer(assetContainer)
      this.assetContainerEntity.delete(entity.uuid)
    }

    deleteUnusedTextures()
  }

  isStillValid(entity: BaseEntity) {
    return !entity.isDisposed() && this.entities.has(entity)
  }

  async updateData(data: any): Promise<void> {
    if ('src' in data) {
      if (this.src !== null && this.src !== data.src && DEBUG) {
        log('Cannot set GLTFShape.src twice')
      }
      if (this.src === null) {
        this.src = data.src
      }
      if (this.src) {
        const { registry, asset } = parseProtocolUrl(this.src)
        const { image } = await fetchDARAsset(registry, asset)
        const realImage = await fetchBase64Image(image)

        this.tex = new BABYLON.Texture(realImage, scene)
        this.tex.hasAlpha = true

        if ('visible' in data) {
          if (data.visible === false) {
            this.entities.forEach($ => this.onDetach($))
          } else {
            this.entities.forEach($ => this.onAttach($))
          }
        } else {
          this.entities.forEach($ => this.onAttach($))
        }
      }
    }
  }
}

DisposableComponent.registerClassId(CLASS_ID.NFT_SHAPE, NFTShape)

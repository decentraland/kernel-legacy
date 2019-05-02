import { parcelLimits } from '../../../config'
import { scene } from '../../renderer'
import { Vector3 } from 'babylonjs'

export function enableMiniMap() {
  const div = document.createElement('div')
  div.setAttribute('class', 'minimap')
  const map = document.createElement('img')
  const dot = document.createElement('div')

  const miniMapSize = 300
  const mapSize = 900
  const landSize = mapSize / 300
  const mapScale = 2

  div.appendChild(dot)
  div.appendChild(map)

  dot.style.width = '8px'
  dot.style.height = '8px'
  dot.style.backgroundColor = 'blue'
  dot.style.borderBottom = '4px solid blue'
  dot.style.position = 'absolute'
  dot.style.top = '50%'
  dot.style.left = '50%'
  dot.style.display = 'inline-block'
  dot.style.margin = '-3px -3px'
  dot.style.borderRadius = '50%'
  dot.style.zIndex = '1'
  dot.style.borderTop = '8px solid white'

  map.src = `https://api.decentraland.org/v1/map.png?size=${landSize}&width=${mapSize}&height=${mapSize}`
  map.style.width = map.style.height = `${mapScale * mapSize}px`
  map.style.transition = `transform linear 0.3s`
  map.style.zIndex = '0'

  div.style.position = 'absolute'
  div.style.borderRadius = '100%'
  div.style.height = div.style.width = `${miniMapSize}px`
  div.style.bottom = '12px'
  div.style.right = '12px'
  div.style.zIndex = '9999'
  div.style.filter = 'grayscale(80%)'
  div.style.overflow = 'hidden'

  const directionVector = new Vector3(1, 0, 1)

  setInterval(() => {
    const X = (mapScale * (-landSize * scene.activeCamera!.position.x)) / parcelLimits.parcelSize
    const Y = (mapScale * (-landSize * -scene.activeCamera!.position.z)) / parcelLimits.parcelSize

    const halfMap = (mapSize * mapScale) / 2

    const direction = scene.activeCamera!.getDirection(directionVector)
    const rotation = -Math.atan(direction.z / (direction.x || 1)) + (direction.x > 0 ? Math.PI : 0) + (1 * Math.PI) / 4

    map.style.transform = `translate(${-halfMap + miniMapSize / 2 + X}px, ${-halfMap + miniMapSize / 2 + Y}px)`
    dot.style.transform = `rotate(${rotation}rad)`
  }, 60)

  return div
}

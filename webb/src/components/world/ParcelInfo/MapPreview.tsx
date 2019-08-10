import React from 'react'
import { Loader, Atlas, Layer } from 'decentraland-ui'
export class MapPreview extends React.Component<any> {

  isHighlighted = (x: number, y: number) => this.props.x === x && this.props.y === y

  _sceneMap?: { [x: number]: { [y: number]: boolean } }
  _buildSceneMap() {
    const scene = this.props.coordinateToScene[`${this.props.x}.${this.props.y}`]
    const sceneData = this.props.sceneJson[scene]
    this._sceneMap = {}
    for (let parcel of sceneData.scene.parcels) {
      const [x, y] = parcel.split(',').map((_: string) => parseInt(_, 10))
      if (!this._sceneMap[x]) {
        this._sceneMap[x] = {}
      }
      this._sceneMap[x][y] = true
    }
  }
  isScene = (x: number, y: number) => {
    if (!this._sceneMap) {
      this._buildSceneMap()
    }
    return this._sceneMap![x] && !!this._sceneMap![x][y]
  }

  sceneFill: Layer = (x, y) => {
    if (this.isScene(x, y)) {
      return {
        color: '#00d3ff',
        scale: 1.2,
      };
    }
    return null;
  }

  sceneStroke: Layer = (x, y) => {
    if (this.isScene(x, y)) {
      return {
        color: '#005aff',
        scale: 1.5,
      };
    }
    return null;
  }

  hoverFillLayer: Layer = (x, y) => {
    if (this.isHighlighted(x, y)) {
      return {
        color: '#99ff90',
        scale: 1.2,
      };
    }
    return null;
  }

  hoverStrokeLayer: Layer = (x, y) => {
    if (this.isHighlighted(x, y)) {
      return {
        color: '#44ff00',
        scale: 1.5,
      };
    }
    return null;
  }

  render() {
    const { x, y } = this.props
    const coordinate = `${x}.${y}`;
    const loading = !this.props.parcelData[coordinate]
      || this.props.parcelData[coordinate].loading
      || !this.props.coordinateToScene[coordinate]
      || this.props.coordinateToScene[coordinate].loading
    if (loading) {
      return <Loader />
    }
    const empty = this.props.coordinateToScene[coordinate].empty
    if (empty || !this.props.coordinateToScene[coordinate]) {
      return <Atlas x={x} y={y} layers={[this.hoverStrokeLayer, this.hoverFillLayer]} isDraggable={false} />
    }
    const scene = this.props.coordinateToScene[coordinate]
    const loadingMapping = !this.props.mappings[scene]
      || this.props.mappings[scene].loading
      || !this.props.sceneJson[scene]
      || this.props.sceneJson[scene].loading
    if (loadingMapping) {
      return <Loader />
    }
    return <Atlas x={x} y={y} layers={[this.sceneStroke, this.sceneFill, this.hoverStrokeLayer, this.hoverFillLayer]} isDraggable={false} />
  }
}

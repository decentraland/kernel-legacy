import { getKeysMappingToTrue } from '@dcl/utils'
import { multipleNeedsResolution } from './selectors'

describe('position to sceneid selectors', () => {
  it('getKeyMappings test', () => {
    expect(getKeysMappingToTrue({ '1,1': true })).toEqual(['1,1'])
  })
  it('multipleNeedsResolution test', () => {
    expect(
      multipleNeedsResolution(
        {
          positionToSceneId: {
            downloadServer: 'download',
            sceneIdToPositions: {},
            positionToScene: {}
          }
        },
        ['1,1']
      )
    ).toEqual({ '1,1': true })
  })
})

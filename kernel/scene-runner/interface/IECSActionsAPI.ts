import { EntityAction } from '../userSpace/node_modules/@dcl/utils'

export interface IECSActionsReporting {
  /**
   * Called by the scene script once per update round, contains all the ECS actions generated on this loop
   * @param batch
   */
  sendBatch(actions: EntityAction[]): Promise<void>
}

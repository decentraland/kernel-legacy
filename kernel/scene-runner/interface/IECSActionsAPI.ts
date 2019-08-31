import { EntityAction } from '@dcl/utils'

export interface IECSActionsReporting {
  /**
   * Called by the scene script once per update round, contains all the ECS actions generated on this loop
   * @param batch
   */
  sendBatch(actions: EntityAction[]): Promise<void>
}

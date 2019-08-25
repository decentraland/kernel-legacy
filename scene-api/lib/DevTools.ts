import { registerAPI } from '@dcl/rpc/host'

// THIS INTERFACE MOCKS THE chromedevtools API
import { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping'
import Protocol from 'devtools-protocol'

import { ILogger, defaultLogger } from '@dcl/utils'
import { API, exposeMethod } from '@dcl/rpc/common/API'

/**
 * @public
 */
export interface DevToolsServer {
  event<T extends keyof ProtocolMapping.Events>(type: T, params: ProtocolMapping.Events[T]): Promise<void>
}

/**
 * @public
 */
@registerAPI('DevTools')
export class DevTools extends API implements DevToolsServer {
  exceptions = new Map<number, Protocol.Runtime.ExceptionDetails>()

  logger: ILogger = defaultLogger

  @exposeMethod
  async event<T extends keyof ProtocolMapping.Events>(type: T, params: ProtocolMapping.Events[T]): Promise<void> {
    switch (type) {
      case 'Runtime.consoleAPICalled': {
        let [event] = params as ProtocolMapping.Events['Runtime.consoleAPICalled']

        this.logger.log('', ...event.args.map($ => ('value' in $ ? $.value : $.unserializableValue)))

        break
      }

      case 'Runtime.exceptionThrown': {
        let [payload] = params as ProtocolMapping.Events['Runtime.exceptionThrown']
        this.exceptions.set(payload.exceptionDetails.exceptionId, payload.exceptionDetails)

        if (payload.exceptionDetails.exception) {
          this.logger.error(
            payload.exceptionDetails.text,
            payload.exceptionDetails.exception.value || payload.exceptionDetails.exception.unserializableValue
          )
        } else {
          this.logger.error(payload.exceptionDetails.text)
        }
        break
      }
    }
  }
}

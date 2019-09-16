import { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping'
import Protocol from 'devtools-protocol'

import { registerAPI } from '@dcl/rpc/host'
import { DEBUG } from '@dcl/config'
import { ILogger, defaultLogger } from '@dcl/utils'
import { exposeMethod, API } from '@dcl/rpc/common/API'

@registerAPI('DevTools')
export class DevTools extends API {
  exceptions = new Map<number, Protocol.Runtime.ExceptionDetails>()

  logger: ILogger = defaultLogger

  // ONLY AVAILABLE IN DEBUG MODE
  logs: Protocol.Runtime.ConsoleAPICalledEvent[] = []

  @exposeMethod
  async event<T extends keyof ProtocolMapping.Events>(type: T, params: ProtocolMapping.Events[T]): Promise<void> {
    switch (type) {
      case 'Runtime.consoleAPICalled': {
        let [event] = params as ProtocolMapping.Events['Runtime.consoleAPICalled']

        if (DEBUG) {
          this.logs.push(event)
        }

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
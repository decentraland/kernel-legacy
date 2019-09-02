import { decodeType } from '../sync/helpers/decodeType'
import { decodeMessage } from '../sync/helpers/decodeMessage'

export function busLoggingHook(_: string, data: any) {
  console.log(decodeType(_), decodeMessage(data))
}

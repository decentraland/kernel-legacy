import { lookupTable } from './lookupTable'
import { ECSFunctionName } from './ECSFunctionName'
export function getECSFunction(name: ECSFunctionName) {
  return lookupTable[name]
}

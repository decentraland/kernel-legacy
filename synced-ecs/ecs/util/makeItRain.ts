export function makeItRain<T>({
  state,
  operationMappings
}: {
  state: T
  operationMappings: {
    elements: any[]
    operator: (a: T, ...args: any[]) => T
  }[]
}): T {
  return operationMappings.reduce(
    (newState, operationMap) =>
      operationMap.elements.reduce(
        (miniState, operationItem) =>
          Array.isArray(operationItem)
            ? operationMap.operator(miniState, ...operationItem)
            : operationMap.operator(miniState, operationItem),
        newState
      ),
    state
  )
}

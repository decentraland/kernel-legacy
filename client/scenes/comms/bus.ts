export function setupSceneMessageHandled(connection: any) {
  connection.sceneMessageHandler = (alias: string /*, data: ChatData */) => {
    // processParcelSceneCommsMessage(context!, alias, data)
  }
}

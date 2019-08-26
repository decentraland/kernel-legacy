
  updateSubscriptions(rawTopics: string) {
    if (!this.connection.hasReliableChannel) {
      throw new Error('trying to send topic subscription message but reliable channel is not ready')
    }
    const subscriptionMessage = new SubscriptionMessage()
    subscriptionMessage.setType(MessageType.SUBSCRIPTION)
    subscriptionMessage.setFormat(Format.PLAIN)
    // TODO: use TextDecoder instead of Buffer, it is a native browser API, works faster
    subscriptionMessage.setTopics(Buffer.from(rawTopics, 'utf8'))
    const bytes = subscriptionMessage.serializeBinary()
    this.connection.sendReliable(bytes)
  }
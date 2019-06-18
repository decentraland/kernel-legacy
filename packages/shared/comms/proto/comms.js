/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf')
var goog = jspb
var global = Function('return this')()

goog.exportSymbol('proto.protocol.Category', null, global)
goog.exportSymbol('proto.protocol.ChatData', null, global)
goog.exportSymbol('proto.protocol.DataHeader', null, global)
goog.exportSymbol('proto.protocol.PositionData', null, global)
goog.exportSymbol('proto.protocol.ProfileData', null, global)

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.DataHeader = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null)
}
goog.inherits(proto.protocol.DataHeader, jspb.Message)
if (goog.DEBUG && !COMPILED) {
  proto.protocol.DataHeader.displayName = 'proto.protocol.DataHeader'
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.protocol.DataHeader.prototype.toObject = function(opt_includeInstance) {
    return proto.protocol.DataHeader.toObject(opt_includeInstance, this)
  }

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.protocol.DataHeader} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.protocol.DataHeader.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        category: jspb.Message.getFieldWithDefault(msg, 1, 0)
      }

    if (includeInstance) {
      obj.$jspbMessageInstance = msg
    }
    return obj
  }
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.DataHeader}
 */
proto.protocol.DataHeader.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes)
  var msg = new proto.protocol.DataHeader()
  return proto.protocol.DataHeader.deserializeBinaryFromReader(msg, reader)
}

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.DataHeader} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.DataHeader}
 */
proto.protocol.DataHeader.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break
    }
    var field = reader.getFieldNumber()
    switch (field) {
      case 1:
        var value = /** @type {!proto.protocol.Category} */ (reader.readEnum())
        msg.setCategory(value)
        break
      default:
        reader.skipField()
        break
    }
  }
  return msg
}

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.DataHeader.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter()
  proto.protocol.DataHeader.serializeBinaryToWriter(this, writer)
  return writer.getResultBuffer()
}

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.DataHeader} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DataHeader.serializeBinaryToWriter = function(message, writer) {
  var f = undefined
  f = message.getCategory()
  if (f !== 0.0) {
    writer.writeEnum(1, f)
  }
}

/**
 * optional Category category = 1;
 * @return {!proto.protocol.Category}
 */
proto.protocol.DataHeader.prototype.getCategory = function() {
  return /** @type {!proto.protocol.Category} */ (jspb.Message.getFieldWithDefault(this, 1, 0))
}

/** @param {!proto.protocol.Category} value */
proto.protocol.DataHeader.prototype.setCategory = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value)
}

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.PositionData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null)
}
goog.inherits(proto.protocol.PositionData, jspb.Message)
if (goog.DEBUG && !COMPILED) {
  proto.protocol.PositionData.displayName = 'proto.protocol.PositionData'
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.protocol.PositionData.prototype.toObject = function(opt_includeInstance) {
    return proto.protocol.PositionData.toObject(opt_includeInstance, this)
  }

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.protocol.PositionData} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.protocol.PositionData.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        category: jspb.Message.getFieldWithDefault(msg, 1, 0),
        time: +jspb.Message.getFieldWithDefault(msg, 2, 0.0),
        positionX: +jspb.Message.getFieldWithDefault(msg, 3, 0.0),
        positionY: +jspb.Message.getFieldWithDefault(msg, 4, 0.0),
        positionZ: +jspb.Message.getFieldWithDefault(msg, 5, 0.0),
        rotationX: +jspb.Message.getFieldWithDefault(msg, 6, 0.0),
        rotationY: +jspb.Message.getFieldWithDefault(msg, 7, 0.0),
        rotationZ: +jspb.Message.getFieldWithDefault(msg, 8, 0.0),
        rotationW: +jspb.Message.getFieldWithDefault(msg, 9, 0.0)
      }

    if (includeInstance) {
      obj.$jspbMessageInstance = msg
    }
    return obj
  }
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.PositionData}
 */
proto.protocol.PositionData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes)
  var msg = new proto.protocol.PositionData()
  return proto.protocol.PositionData.deserializeBinaryFromReader(msg, reader)
}

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.PositionData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.PositionData}
 */
proto.protocol.PositionData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break
    }
    var field = reader.getFieldNumber()
    switch (field) {
      case 1:
        var value = /** @type {!proto.protocol.Category} */ (reader.readEnum())
        msg.setCategory(value)
        break
      case 2:
        var value = /** @type {number} */ (reader.readDouble())
        msg.setTime(value)
        break
      case 3:
        var value = /** @type {number} */ (reader.readFloat())
        msg.setPositionX(value)
        break
      case 4:
        var value = /** @type {number} */ (reader.readFloat())
        msg.setPositionY(value)
        break
      case 5:
        var value = /** @type {number} */ (reader.readFloat())
        msg.setPositionZ(value)
        break
      case 6:
        var value = /** @type {number} */ (reader.readFloat())
        msg.setRotationX(value)
        break
      case 7:
        var value = /** @type {number} */ (reader.readFloat())
        msg.setRotationY(value)
        break
      case 8:
        var value = /** @type {number} */ (reader.readFloat())
        msg.setRotationZ(value)
        break
      case 9:
        var value = /** @type {number} */ (reader.readFloat())
        msg.setRotationW(value)
        break
      default:
        reader.skipField()
        break
    }
  }
  return msg
}

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.PositionData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter()
  proto.protocol.PositionData.serializeBinaryToWriter(this, writer)
  return writer.getResultBuffer()
}

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.PositionData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.PositionData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined
  f = message.getCategory()
  if (f !== 0.0) {
    writer.writeEnum(1, f)
  }
  f = message.getTime()
  if (f !== 0.0) {
    writer.writeDouble(2, f)
  }
  f = message.getPositionX()
  if (f !== 0.0) {
    writer.writeFloat(3, f)
  }
  f = message.getPositionY()
  if (f !== 0.0) {
    writer.writeFloat(4, f)
  }
  f = message.getPositionZ()
  if (f !== 0.0) {
    writer.writeFloat(5, f)
  }
  f = message.getRotationX()
  if (f !== 0.0) {
    writer.writeFloat(6, f)
  }
  f = message.getRotationY()
  if (f !== 0.0) {
    writer.writeFloat(7, f)
  }
  f = message.getRotationZ()
  if (f !== 0.0) {
    writer.writeFloat(8, f)
  }
  f = message.getRotationW()
  if (f !== 0.0) {
    writer.writeFloat(9, f)
  }
}

/**
 * optional Category category = 1;
 * @return {!proto.protocol.Category}
 */
proto.protocol.PositionData.prototype.getCategory = function() {
  return /** @type {!proto.protocol.Category} */ (jspb.Message.getFieldWithDefault(this, 1, 0))
}

/** @param {!proto.protocol.Category} value */
proto.protocol.PositionData.prototype.setCategory = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value)
}

/**
 * optional double time = 2;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getTime = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 2, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setTime = function(value) {
  jspb.Message.setProto3FloatField(this, 2, value)
}

/**
 * optional float position_x = 3;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getPositionX = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 3, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setPositionX = function(value) {
  jspb.Message.setProto3FloatField(this, 3, value)
}

/**
 * optional float position_y = 4;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getPositionY = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 4, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setPositionY = function(value) {
  jspb.Message.setProto3FloatField(this, 4, value)
}

/**
 * optional float position_z = 5;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getPositionZ = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 5, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setPositionZ = function(value) {
  jspb.Message.setProto3FloatField(this, 5, value)
}

/**
 * optional float rotation_x = 6;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getRotationX = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 6, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setRotationX = function(value) {
  jspb.Message.setProto3FloatField(this, 6, value)
}

/**
 * optional float rotation_y = 7;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getRotationY = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 7, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setRotationY = function(value) {
  jspb.Message.setProto3FloatField(this, 7, value)
}

/**
 * optional float rotation_z = 8;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getRotationZ = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 8, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setRotationZ = function(value) {
  jspb.Message.setProto3FloatField(this, 8, value)
}

/**
 * optional float rotation_w = 9;
 * @return {number}
 */
proto.protocol.PositionData.prototype.getRotationW = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 9, 0.0))
}

/** @param {number} value */
proto.protocol.PositionData.prototype.setRotationW = function(value) {
  jspb.Message.setProto3FloatField(this, 9, value)
}

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.ProfileData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null)
}
goog.inherits(proto.protocol.ProfileData, jspb.Message)
if (goog.DEBUG && !COMPILED) {
  proto.protocol.ProfileData.displayName = 'proto.protocol.ProfileData'
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.protocol.ProfileData.prototype.toObject = function(opt_includeInstance) {
    return proto.protocol.ProfileData.toObject(opt_includeInstance, this)
  }

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.protocol.ProfileData} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.protocol.ProfileData.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        category: jspb.Message.getFieldWithDefault(msg, 1, 0),
        time: +jspb.Message.getFieldWithDefault(msg, 2, 0.0),
        avatarType: jspb.Message.getFieldWithDefault(msg, 3, ''),
        displayName: jspb.Message.getFieldWithDefault(msg, 4, ''),
        publicKey: jspb.Message.getFieldWithDefault(msg, 5, '')
      }

    if (includeInstance) {
      obj.$jspbMessageInstance = msg
    }
    return obj
  }
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.ProfileData}
 */
proto.protocol.ProfileData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes)
  var msg = new proto.protocol.ProfileData()
  return proto.protocol.ProfileData.deserializeBinaryFromReader(msg, reader)
}

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.ProfileData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.ProfileData}
 */
proto.protocol.ProfileData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break
    }
    var field = reader.getFieldNumber()
    switch (field) {
      case 1:
        var value = /** @type {!proto.protocol.Category} */ (reader.readEnum())
        msg.setCategory(value)
        break
      case 2:
        var value = /** @type {number} */ (reader.readDouble())
        msg.setTime(value)
        break
      case 3:
        var value = /** @type {string} */ (reader.readString())
        msg.setAvatarType(value)
        break
      case 4:
        var value = /** @type {string} */ (reader.readString())
        msg.setDisplayName(value)
        break
      case 5:
        var value = /** @type {string} */ (reader.readString())
        msg.setPublicKey(value)
        break
      default:
        reader.skipField()
        break
    }
  }
  return msg
}

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.ProfileData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter()
  proto.protocol.ProfileData.serializeBinaryToWriter(this, writer)
  return writer.getResultBuffer()
}

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.ProfileData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ProfileData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined
  f = message.getCategory()
  if (f !== 0.0) {
    writer.writeEnum(1, f)
  }
  f = message.getTime()
  if (f !== 0.0) {
    writer.writeDouble(2, f)
  }
  f = message.getAvatarType()
  if (f.length > 0) {
    writer.writeString(3, f)
  }
  f = message.getDisplayName()
  if (f.length > 0) {
    writer.writeString(4, f)
  }
  f = message.getPublicKey()
  if (f.length > 0) {
    writer.writeString(5, f)
  }
}

/**
 * optional Category category = 1;
 * @return {!proto.protocol.Category}
 */
proto.protocol.ProfileData.prototype.getCategory = function() {
  return /** @type {!proto.protocol.Category} */ (jspb.Message.getFieldWithDefault(this, 1, 0))
}

/** @param {!proto.protocol.Category} value */
proto.protocol.ProfileData.prototype.setCategory = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value)
}

/**
 * optional double time = 2;
 * @return {number}
 */
proto.protocol.ProfileData.prototype.getTime = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 2, 0.0))
}

/** @param {number} value */
proto.protocol.ProfileData.prototype.setTime = function(value) {
  jspb.Message.setProto3FloatField(this, 2, value)
}

/**
 * optional string avatar_type = 3;
 * @return {string}
 */
proto.protocol.ProfileData.prototype.getAvatarType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ''))
}

/** @param {string} value */
proto.protocol.ProfileData.prototype.setAvatarType = function(value) {
  jspb.Message.setProto3StringField(this, 3, value)
}

/**
 * optional string display_name = 4;
 * @return {string}
 */
proto.protocol.ProfileData.prototype.getDisplayName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ''))
}

/** @param {string} value */
proto.protocol.ProfileData.prototype.setDisplayName = function(value) {
  jspb.Message.setProto3StringField(this, 4, value)
}

/**
 * optional string public_key = 5;
 * @return {string}
 */
proto.protocol.ProfileData.prototype.getPublicKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ''))
}

/** @param {string} value */
proto.protocol.ProfileData.prototype.setPublicKey = function(value) {
  jspb.Message.setProto3StringField(this, 5, value)
}

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.ChatData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null)
}
goog.inherits(proto.protocol.ChatData, jspb.Message)
if (goog.DEBUG && !COMPILED) {
  proto.protocol.ChatData.displayName = 'proto.protocol.ChatData'
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.protocol.ChatData.prototype.toObject = function(opt_includeInstance) {
    return proto.protocol.ChatData.toObject(opt_includeInstance, this)
  }

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.protocol.ChatData} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.protocol.ChatData.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        category: jspb.Message.getFieldWithDefault(msg, 1, 0),
        time: +jspb.Message.getFieldWithDefault(msg, 2, 0.0),
        messageId: jspb.Message.getFieldWithDefault(msg, 3, ''),
        text: jspb.Message.getFieldWithDefault(msg, 4, '')
      }

    if (includeInstance) {
      obj.$jspbMessageInstance = msg
    }
    return obj
  }
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.ChatData}
 */
proto.protocol.ChatData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes)
  var msg = new proto.protocol.ChatData()
  return proto.protocol.ChatData.deserializeBinaryFromReader(msg, reader)
}

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.ChatData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.ChatData}
 */
proto.protocol.ChatData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break
    }
    var field = reader.getFieldNumber()
    switch (field) {
      case 1:
        var value = /** @type {!proto.protocol.Category} */ (reader.readEnum())
        msg.setCategory(value)
        break
      case 2:
        var value = /** @type {number} */ (reader.readDouble())
        msg.setTime(value)
        break
      case 3:
        var value = /** @type {string} */ (reader.readString())
        msg.setMessageId(value)
        break
      case 4:
        var value = /** @type {string} */ (reader.readString())
        msg.setText(value)
        break
      default:
        reader.skipField()
        break
    }
  }
  return msg
}

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.ChatData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter()
  proto.protocol.ChatData.serializeBinaryToWriter(this, writer)
  return writer.getResultBuffer()
}

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.ChatData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChatData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined
  f = message.getCategory()
  if (f !== 0.0) {
    writer.writeEnum(1, f)
  }
  f = message.getTime()
  if (f !== 0.0) {
    writer.writeDouble(2, f)
  }
  f = message.getMessageId()
  if (f.length > 0) {
    writer.writeString(3, f)
  }
  f = message.getText()
  if (f.length > 0) {
    writer.writeString(4, f)
  }
}

/**
 * optional Category category = 1;
 * @return {!proto.protocol.Category}
 */
proto.protocol.ChatData.prototype.getCategory = function() {
  return /** @type {!proto.protocol.Category} */ (jspb.Message.getFieldWithDefault(this, 1, 0))
}

/** @param {!proto.protocol.Category} value */
proto.protocol.ChatData.prototype.setCategory = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value)
}

/**
 * optional double time = 2;
 * @return {number}
 */
proto.protocol.ChatData.prototype.getTime = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 2, 0.0))
}

/** @param {number} value */
proto.protocol.ChatData.prototype.setTime = function(value) {
  jspb.Message.setProto3FloatField(this, 2, value)
}

/**
 * optional string message_id = 3;
 * @return {string}
 */
proto.protocol.ChatData.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ''))
}

/** @param {string} value */
proto.protocol.ChatData.prototype.setMessageId = function(value) {
  jspb.Message.setProto3StringField(this, 3, value)
}

/**
 * optional string text = 4;
 * @return {string}
 */
proto.protocol.ChatData.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ''))
}

/** @param {string} value */
proto.protocol.ChatData.prototype.setText = function(value) {
  jspb.Message.setProto3StringField(this, 4, value)
}

/**
 * @enum {number}
 */
proto.protocol.Category = {
  UNKNOWN: 0,
  POSITION: 1,
  PROFILE: 2,
  CHAT: 3,
  SCENE_MESSAGE: 4
}

goog.object.extend(exports, proto.protocol)

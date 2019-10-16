// package: engineinterface
// file: engineinterface.proto

import * as jspb from 'google-protobuf'
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'

export class PB_CreateEntity extends jspb.Message {
  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_CreateEntity.AsObject
  static toObject(includeInstance: boolean, msg: PB_CreateEntity): PB_CreateEntity.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_CreateEntity, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_CreateEntity
  static deserializeBinaryFromReader(message: PB_CreateEntity, reader: jspb.BinaryReader): PB_CreateEntity
}

export namespace PB_CreateEntity {
  export type AsObject = {
    id: string
  }
}

export class PB_RemoveEntity extends jspb.Message {
  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_RemoveEntity.AsObject
  static toObject(includeInstance: boolean, msg: PB_RemoveEntity): PB_RemoveEntity.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_RemoveEntity, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_RemoveEntity
  static deserializeBinaryFromReader(message: PB_RemoveEntity, reader: jspb.BinaryReader): PB_RemoveEntity
}

export namespace PB_RemoveEntity {
  export type AsObject = {
    id: string
  }
}

export class PB_SetEntityParent extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getParentid(): string
  setParentid(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_SetEntityParent.AsObject
  static toObject(includeInstance: boolean, msg: PB_SetEntityParent): PB_SetEntityParent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_SetEntityParent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_SetEntityParent
  static deserializeBinaryFromReader(message: PB_SetEntityParent, reader: jspb.BinaryReader): PB_SetEntityParent
}

export namespace PB_SetEntityParent {
  export type AsObject = {
    entityid: string
    parentid: string
  }
}

export class PB_ComponentRemoved extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getName(): string
  setName(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_ComponentRemoved.AsObject
  static toObject(includeInstance: boolean, msg: PB_ComponentRemoved): PB_ComponentRemoved.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_ComponentRemoved, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_ComponentRemoved
  static deserializeBinaryFromReader(message: PB_ComponentRemoved, reader: jspb.BinaryReader): PB_ComponentRemoved
}

export namespace PB_ComponentRemoved {
  export type AsObject = {
    entityid: string
    name: string
  }
}

export class PB_Color extends jspb.Message {
  getR(): number
  setR(value: number): void

  getG(): number
  setG(value: number): void

  getB(): number
  setB(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_Color.AsObject
  static toObject(includeInstance: boolean, msg: PB_Color): PB_Color.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_Color, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_Color
  static deserializeBinaryFromReader(message: PB_Color, reader: jspb.BinaryReader): PB_Color
}

export namespace PB_Color {
  export type AsObject = {
    r: number
    g: number
    b: number
  }
}

export class PB_TextShapeModel extends jspb.Message {
  getBillboard(): boolean
  setBillboard(value: boolean): void

  getValue(): string
  setValue(value: string): void

  hasColor(): boolean
  clearColor(): void
  getColor(): PB_Color | undefined
  setColor(value?: PB_Color): void

  getOpacity(): number
  setOpacity(value: number): void

  getFontsize(): number
  setFontsize(value: number): void

  getFontautosize(): boolean
  setFontautosize(value: boolean): void

  getFontweight(): string
  setFontweight(value: string): void

  getHtextalign(): string
  setHtextalign(value: string): void

  getVtextalign(): string
  setVtextalign(value: string): void

  getWidth(): number
  setWidth(value: number): void

  getHeight(): number
  setHeight(value: number): void

  getAdaptwidth(): boolean
  setAdaptwidth(value: boolean): void

  getAdaptheight(): boolean
  setAdaptheight(value: boolean): void

  getPaddingtop(): number
  setPaddingtop(value: number): void

  getPaddingright(): number
  setPaddingright(value: number): void

  getPaddingbottom(): number
  setPaddingbottom(value: number): void

  getPaddingleft(): number
  setPaddingleft(value: number): void

  getLinespacing(): number
  setLinespacing(value: number): void

  getLinecount(): number
  setLinecount(value: number): void

  getTextwrapping(): boolean
  setTextwrapping(value: boolean): void

  getShadowblur(): number
  setShadowblur(value: number): void

  getShadowoffsetx(): number
  setShadowoffsetx(value: number): void

  getShadowoffsety(): number
  setShadowoffsety(value: number): void

  hasShadowcolor(): boolean
  clearShadowcolor(): void
  getShadowcolor(): PB_Color | undefined
  setShadowcolor(value?: PB_Color): void

  getOutlinewidth(): number
  setOutlinewidth(value: number): void

  hasOutlinecolor(): boolean
  clearOutlinecolor(): void
  getOutlinecolor(): PB_Color | undefined
  setOutlinecolor(value?: PB_Color): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_TextShapeModel.AsObject
  static toObject(includeInstance: boolean, msg: PB_TextShapeModel): PB_TextShapeModel.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_TextShapeModel, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_TextShapeModel
  static deserializeBinaryFromReader(message: PB_TextShapeModel, reader: jspb.BinaryReader): PB_TextShapeModel
}

export namespace PB_TextShapeModel {
  export type AsObject = {
    billboard: boolean
    value: string
    color?: PB_Color.AsObject
    opacity: number
    fontsize: number
    fontautosize: boolean
    fontweight: string
    htextalign: string
    vtextalign: string
    width: number
    height: number
    adaptwidth: boolean
    adaptheight: boolean
    paddingtop: number
    paddingright: number
    paddingbottom: number
    paddingleft: number
    linespacing: number
    linecount: number
    textwrapping: boolean
    shadowblur: number
    shadowoffsetx: number
    shadowoffsety: number
    shadowcolor?: PB_Color.AsObject
    outlinewidth: number
    outlinecolor?: PB_Color.AsObject
  }
}

export class PB_Vector3 extends jspb.Message {
  getX(): number
  setX(value: number): void

  getY(): number
  setY(value: number): void

  getZ(): number
  setZ(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_Vector3.AsObject
  static toObject(includeInstance: boolean, msg: PB_Vector3): PB_Vector3.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_Vector3, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_Vector3
  static deserializeBinaryFromReader(message: PB_Vector3, reader: jspb.BinaryReader): PB_Vector3
}

export namespace PB_Vector3 {
  export type AsObject = {
    x: number
    y: number
    z: number
  }
}

export class PB_Quaternion extends jspb.Message {
  getX(): number
  setX(value: number): void

  getY(): number
  setY(value: number): void

  getZ(): number
  setZ(value: number): void

  getW(): number
  setW(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_Quaternion.AsObject
  static toObject(includeInstance: boolean, msg: PB_Quaternion): PB_Quaternion.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_Quaternion, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_Quaternion
  static deserializeBinaryFromReader(message: PB_Quaternion, reader: jspb.BinaryReader): PB_Quaternion
}

export namespace PB_Quaternion {
  export type AsObject = {
    x: number
    y: number
    z: number
    w: number
  }
}

export class PB_Transform extends jspb.Message {
  hasPosition(): boolean
  clearPosition(): void
  getPosition(): PB_Vector3 | undefined
  setPosition(value?: PB_Vector3): void

  hasRotation(): boolean
  clearRotation(): void
  getRotation(): PB_Quaternion | undefined
  setRotation(value?: PB_Quaternion): void

  hasScale(): boolean
  clearScale(): void
  getScale(): PB_Vector3 | undefined
  setScale(value?: PB_Vector3): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_Transform.AsObject
  static toObject(includeInstance: boolean, msg: PB_Transform): PB_Transform.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_Transform, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_Transform
  static deserializeBinaryFromReader(message: PB_Transform, reader: jspb.BinaryReader): PB_Transform
}

export namespace PB_Transform {
  export type AsObject = {
    position?: PB_Vector3.AsObject
    rotation?: PB_Quaternion.AsObject
    scale?: PB_Vector3.AsObject
  }
}

export class PB_UpdateEntityComponent extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getClassid(): number
  setClassid(value: number): void

  getName(): string
  setName(value: string): void

  hasJson(): boolean
  clearJson(): void
  getJson(): string
  setJson(value: string): void

  getModelCase(): PB_UpdateEntityComponent.ModelCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_UpdateEntityComponent.AsObject
  static toObject(includeInstance: boolean, msg: PB_UpdateEntityComponent): PB_UpdateEntityComponent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_UpdateEntityComponent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_UpdateEntityComponent
  static deserializeBinaryFromReader(
    message: PB_UpdateEntityComponent,
    reader: jspb.BinaryReader
  ): PB_UpdateEntityComponent
}

export namespace PB_UpdateEntityComponent {
  export type AsObject = {
    entityid: string
    classid: number
    name: string
    json: string
  }

  export enum ModelCase {
    MODEL_NOT_SET = 0,
    JSON = 4
  }
}

export class PB_ComponentCreated extends jspb.Message {
  getId(): string
  setId(value: string): void

  getClassid(): number
  setClassid(value: number): void

  getName(): string
  setName(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_ComponentCreated.AsObject
  static toObject(includeInstance: boolean, msg: PB_ComponentCreated): PB_ComponentCreated.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_ComponentCreated, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_ComponentCreated
  static deserializeBinaryFromReader(message: PB_ComponentCreated, reader: jspb.BinaryReader): PB_ComponentCreated
}

export namespace PB_ComponentCreated {
  export type AsObject = {
    id: string
    classid: number
    name: string
  }
}

export class PB_AttachEntityComponent extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getName(): string
  setName(value: string): void

  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_AttachEntityComponent.AsObject
  static toObject(includeInstance: boolean, msg: PB_AttachEntityComponent): PB_AttachEntityComponent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_AttachEntityComponent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_AttachEntityComponent
  static deserializeBinaryFromReader(
    message: PB_AttachEntityComponent,
    reader: jspb.BinaryReader
  ): PB_AttachEntityComponent
}

export namespace PB_AttachEntityComponent {
  export type AsObject = {
    entityid: string
    name: string
    id: string
  }
}

export class PB_ComponentDisposed extends jspb.Message {
  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_ComponentDisposed.AsObject
  static toObject(includeInstance: boolean, msg: PB_ComponentDisposed): PB_ComponentDisposed.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_ComponentDisposed, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_ComponentDisposed
  static deserializeBinaryFromReader(message: PB_ComponentDisposed, reader: jspb.BinaryReader): PB_ComponentDisposed
}

export namespace PB_ComponentDisposed {
  export type AsObject = {
    id: string
  }
}

export class PB_ComponentUpdated extends jspb.Message {
  getId(): string
  setId(value: string): void

  getJson(): string
  setJson(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_ComponentUpdated.AsObject
  static toObject(includeInstance: boolean, msg: PB_ComponentUpdated): PB_ComponentUpdated.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_ComponentUpdated, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_ComponentUpdated
  static deserializeBinaryFromReader(message: PB_ComponentUpdated, reader: jspb.BinaryReader): PB_ComponentUpdated
}

export namespace PB_ComponentUpdated {
  export type AsObject = {
    id: string
    json: string
  }
}

export class PB_Ray extends jspb.Message {
  hasOrigin(): boolean
  clearOrigin(): void
  getOrigin(): PB_Vector3 | undefined
  setOrigin(value?: PB_Vector3): void

  hasDirection(): boolean
  clearDirection(): void
  getDirection(): PB_Vector3 | undefined
  setDirection(value?: PB_Vector3): void

  getDistance(): number
  setDistance(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_Ray.AsObject
  static toObject(includeInstance: boolean, msg: PB_Ray): PB_Ray.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_Ray, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_Ray
  static deserializeBinaryFromReader(message: PB_Ray, reader: jspb.BinaryReader): PB_Ray
}

export namespace PB_Ray {
  export type AsObject = {
    origin?: PB_Vector3.AsObject
    direction?: PB_Vector3.AsObject
    distance: number
  }
}

export class PB_RayQuery extends jspb.Message {
  getQueryid(): string
  setQueryid(value: string): void

  getQuerytype(): string
  setQuerytype(value: string): void

  hasRay(): boolean
  clearRay(): void
  getRay(): PB_Ray | undefined
  setRay(value?: PB_Ray): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_RayQuery.AsObject
  static toObject(includeInstance: boolean, msg: PB_RayQuery): PB_RayQuery.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_RayQuery, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_RayQuery
  static deserializeBinaryFromReader(message: PB_RayQuery, reader: jspb.BinaryReader): PB_RayQuery
}

export namespace PB_RayQuery {
  export type AsObject = {
    queryid: string
    querytype: string
    ray?: PB_Ray.AsObject
  }
}

export class PB_Query extends jspb.Message {
  getQueryid(): string
  setQueryid(value: string): void

  hasPayload(): boolean
  clearPayload(): void
  getPayload(): PB_RayQuery | undefined
  setPayload(value?: PB_RayQuery): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_Query.AsObject
  static toObject(includeInstance: boolean, msg: PB_Query): PB_Query.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_Query, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_Query
  static deserializeBinaryFromReader(message: PB_Query, reader: jspb.BinaryReader): PB_Query
}

export namespace PB_Query {
  export type AsObject = {
    queryid: string
    payload?: PB_RayQuery.AsObject
  }
}

export class PB_SendSceneMessage extends jspb.Message {
  getSceneid(): string
  setSceneid(value: string): void

  getTag(): string
  setTag(value: string): void

  hasCreateentity(): boolean
  clearCreateentity(): void
  getCreateentity(): PB_CreateEntity | undefined
  setCreateentity(value?: PB_CreateEntity): void

  hasRemoveentity(): boolean
  clearRemoveentity(): void
  getRemoveentity(): PB_RemoveEntity | undefined
  setRemoveentity(value?: PB_RemoveEntity): void

  hasSetentityparent(): boolean
  clearSetentityparent(): void
  getSetentityparent(): PB_SetEntityParent | undefined
  setSetentityparent(value?: PB_SetEntityParent): void

  hasUpdateentitycomponent(): boolean
  clearUpdateentitycomponent(): void
  getUpdateentitycomponent(): PB_UpdateEntityComponent | undefined
  setUpdateentitycomponent(value?: PB_UpdateEntityComponent): void

  hasAttachentitycomponent(): boolean
  clearAttachentitycomponent(): void
  getAttachentitycomponent(): PB_AttachEntityComponent | undefined
  setAttachentitycomponent(value?: PB_AttachEntityComponent): void

  hasComponentcreated(): boolean
  clearComponentcreated(): void
  getComponentcreated(): PB_ComponentCreated | undefined
  setComponentcreated(value?: PB_ComponentCreated): void

  hasComponentdisposed(): boolean
  clearComponentdisposed(): void
  getComponentdisposed(): PB_ComponentDisposed | undefined
  setComponentdisposed(value?: PB_ComponentDisposed): void

  hasComponentremoved(): boolean
  clearComponentremoved(): void
  getComponentremoved(): PB_ComponentRemoved | undefined
  setComponentremoved(value?: PB_ComponentRemoved): void

  hasComponentupdated(): boolean
  clearComponentupdated(): void
  getComponentupdated(): PB_ComponentUpdated | undefined
  setComponentupdated(value?: PB_ComponentUpdated): void

  hasQuery(): boolean
  clearQuery(): void
  getQuery(): PB_Query | undefined
  setQuery(value?: PB_Query): void

  hasScenestarted(): boolean
  clearScenestarted(): void
  getScenestarted(): google_protobuf_empty_pb.Empty | undefined
  setScenestarted(value?: google_protobuf_empty_pb.Empty): void

  getPayloadCase(): PB_SendSceneMessage.PayloadCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_SendSceneMessage.AsObject
  static toObject(includeInstance: boolean, msg: PB_SendSceneMessage): PB_SendSceneMessage.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_SendSceneMessage, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_SendSceneMessage
  static deserializeBinaryFromReader(message: PB_SendSceneMessage, reader: jspb.BinaryReader): PB_SendSceneMessage
}

export namespace PB_SendSceneMessage {
  export type AsObject = {
    sceneid: string
    tag: string
    createentity?: PB_CreateEntity.AsObject
    removeentity?: PB_RemoveEntity.AsObject
    setentityparent?: PB_SetEntityParent.AsObject
    updateentitycomponent?: PB_UpdateEntityComponent.AsObject
    attachentitycomponent?: PB_AttachEntityComponent.AsObject
    componentcreated?: PB_ComponentCreated.AsObject
    componentdisposed?: PB_ComponentDisposed.AsObject
    componentremoved?: PB_ComponentRemoved.AsObject
    componentupdated?: PB_ComponentUpdated.AsObject
    query?: PB_Query.AsObject
    scenestarted?: google_protobuf_empty_pb.Empty.AsObject
  }

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    CREATEENTITY = 3,
    REMOVEENTITY = 4,
    SETENTITYPARENT = 5,
    UPDATEENTITYCOMPONENT = 6,
    ATTACHENTITYCOMPONENT = 7,
    COMPONENTCREATED = 8,
    COMPONENTDISPOSED = 9,
    COMPONENTREMOVED = 10,
    COMPONENTUPDATED = 11,
    QUERY = 12,
    SCENESTARTED = 13
  }
}

export class PB_SetPosition extends jspb.Message {
  getX(): number
  setX(value: number): void

  getY(): number
  setY(value: number): void

  getZ(): number
  setZ(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_SetPosition.AsObject
  static toObject(includeInstance: boolean, msg: PB_SetPosition): PB_SetPosition.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_SetPosition, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_SetPosition
  static deserializeBinaryFromReader(message: PB_SetPosition, reader: jspb.BinaryReader): PB_SetPosition
}

export namespace PB_SetPosition {
  export type AsObject = {
    x: number
    y: number
    z: number
  }
}

export class PB_ContentMapping extends jspb.Message {
  getFile(): string
  setFile(value: string): void

  getHash(): string
  setHash(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_ContentMapping.AsObject
  static toObject(includeInstance: boolean, msg: PB_ContentMapping): PB_ContentMapping.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_ContentMapping, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_ContentMapping
  static deserializeBinaryFromReader(message: PB_ContentMapping, reader: jspb.BinaryReader): PB_ContentMapping
}

export namespace PB_ContentMapping {
  export type AsObject = {
    file: string
    hash: string
  }
}

export class PB_Position extends jspb.Message {
  getX(): number
  setX(value: number): void

  getY(): number
  setY(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_Position.AsObject
  static toObject(includeInstance: boolean, msg: PB_Position): PB_Position.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_Position, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_Position
  static deserializeBinaryFromReader(message: PB_Position, reader: jspb.BinaryReader): PB_Position
}

export namespace PB_Position {
  export type AsObject = {
    x: number
    y: number
  }
}

export class PB_LoadParcelScenes extends jspb.Message {
  getId(): string
  setId(value: string): void

  hasBaseposition(): boolean
  clearBaseposition(): void
  getBaseposition(): PB_Position | undefined
  setBaseposition(value?: PB_Position): void

  clearParcelsList(): void
  getParcelsList(): Array<PB_Position>
  setParcelsList(value: Array<PB_Position>): void
  addParcels(value?: PB_Position, index?: number): PB_Position

  clearContentsList(): void
  getContentsList(): Array<PB_ContentMapping>
  setContentsList(value: Array<PB_ContentMapping>): void
  addContents(value?: PB_ContentMapping, index?: number): PB_ContentMapping

  getBaseurl(): string
  setBaseurl(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_LoadParcelScenes.AsObject
  static toObject(includeInstance: boolean, msg: PB_LoadParcelScenes): PB_LoadParcelScenes.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_LoadParcelScenes, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_LoadParcelScenes
  static deserializeBinaryFromReader(message: PB_LoadParcelScenes, reader: jspb.BinaryReader): PB_LoadParcelScenes
}

export namespace PB_LoadParcelScenes {
  export type AsObject = {
    id: string
    baseposition?: PB_Position.AsObject
    parcelsList: Array<PB_Position.AsObject>
    contentsList: Array<PB_ContentMapping.AsObject>
    baseurl: string
  }
}

export class PB_CreateUIScene extends jspb.Message {
  getId(): string
  setId(value: string): void

  getBaseurl(): string
  setBaseurl(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_CreateUIScene.AsObject
  static toObject(includeInstance: boolean, msg: PB_CreateUIScene): PB_CreateUIScene.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_CreateUIScene, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_CreateUIScene
  static deserializeBinaryFromReader(message: PB_CreateUIScene, reader: jspb.BinaryReader): PB_CreateUIScene
}

export namespace PB_CreateUIScene {
  export type AsObject = {
    id: string
    baseurl: string
  }
}

export class PB_UnloadScene extends jspb.Message {
  getSceneid(): string
  setSceneid(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_UnloadScene.AsObject
  static toObject(includeInstance: boolean, msg: PB_UnloadScene): PB_UnloadScene.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_UnloadScene, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_UnloadScene
  static deserializeBinaryFromReader(message: PB_UnloadScene, reader: jspb.BinaryReader): PB_UnloadScene
}

export namespace PB_UnloadScene {
  export type AsObject = {
    sceneid: string
  }
}

export class PB_DclMessage extends jspb.Message {
  hasSetdebug(): boolean
  clearSetdebug(): void
  getSetdebug(): google_protobuf_empty_pb.Empty | undefined
  setSetdebug(value?: google_protobuf_empty_pb.Empty): void

  hasSetscenedebugpanel(): boolean
  clearSetscenedebugpanel(): void
  getSetscenedebugpanel(): google_protobuf_empty_pb.Empty | undefined
  setSetscenedebugpanel(value?: google_protobuf_empty_pb.Empty): void

  hasSetenginedebugpanel(): boolean
  clearSetenginedebugpanel(): void
  getSetenginedebugpanel(): google_protobuf_empty_pb.Empty | undefined
  setSetenginedebugpanel(value?: google_protobuf_empty_pb.Empty): void

  hasSendscenemessage(): boolean
  clearSendscenemessage(): void
  getSendscenemessage(): PB_SendSceneMessage | undefined
  setSendscenemessage(value?: PB_SendSceneMessage): void

  hasLoadparcelscenes(): boolean
  clearLoadparcelscenes(): void
  getLoadparcelscenes(): PB_LoadParcelScenes | undefined
  setLoadparcelscenes(value?: PB_LoadParcelScenes): void

  hasUnloadscene(): boolean
  clearUnloadscene(): void
  getUnloadscene(): PB_UnloadScene | undefined
  setUnloadscene(value?: PB_UnloadScene): void

  hasSetposition(): boolean
  clearSetposition(): void
  getSetposition(): PB_SetPosition | undefined
  setSetposition(value?: PB_SetPosition): void

  hasReset(): boolean
  clearReset(): void
  getReset(): google_protobuf_empty_pb.Empty | undefined
  setReset(value?: google_protobuf_empty_pb.Empty): void

  hasCreateuiscene(): boolean
  clearCreateuiscene(): void
  getCreateuiscene(): PB_CreateUIScene | undefined
  setCreateuiscene(value?: PB_CreateUIScene): void

  getMessageCase(): PB_DclMessage.MessageCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): PB_DclMessage.AsObject
  static toObject(includeInstance: boolean, msg: PB_DclMessage): PB_DclMessage.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: PB_DclMessage, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): PB_DclMessage
  static deserializeBinaryFromReader(message: PB_DclMessage, reader: jspb.BinaryReader): PB_DclMessage
}

export namespace PB_DclMessage {
  export type AsObject = {
    setdebug?: google_protobuf_empty_pb.Empty.AsObject
    setscenedebugpanel?: google_protobuf_empty_pb.Empty.AsObject
    setenginedebugpanel?: google_protobuf_empty_pb.Empty.AsObject
    sendscenemessage?: PB_SendSceneMessage.AsObject
    loadparcelscenes?: PB_LoadParcelScenes.AsObject
    unloadscene?: PB_UnloadScene.AsObject
    setposition?: PB_SetPosition.AsObject
    reset?: google_protobuf_empty_pb.Empty.AsObject
    createuiscene?: PB_CreateUIScene.AsObject
  }

  export enum MessageCase {
    MESSAGE_NOT_SET = 0,
    SETDEBUG = 1,
    SETSCENEDEBUGPANEL = 2,
    SETENGINEDEBUGPANEL = 3,
    SENDSCENEMESSAGE = 4,
    LOADPARCELSCENES = 5,
    UNLOADSCENE = 6,
    SETPOSITION = 7,
    RESET = 8,
    CREATEUISCENE = 9
  }
}

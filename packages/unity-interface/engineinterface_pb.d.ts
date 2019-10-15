// package: engineinterface
// file: engineinterface.proto

import * as jspb from 'google-protobuf'
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'

export class CreateEntity extends jspb.Message {
  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): CreateEntity.AsObject
  static toObject(includeInstance: boolean, msg: CreateEntity): CreateEntity.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: CreateEntity, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): CreateEntity
  static deserializeBinaryFromReader(message: CreateEntity, reader: jspb.BinaryReader): CreateEntity
}

export namespace CreateEntity {
  export type AsObject = {
    id: string
  }
}

export class RemoveEntity extends jspb.Message {
  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): RemoveEntity.AsObject
  static toObject(includeInstance: boolean, msg: RemoveEntity): RemoveEntity.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: RemoveEntity, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): RemoveEntity
  static deserializeBinaryFromReader(message: RemoveEntity, reader: jspb.BinaryReader): RemoveEntity
}

export namespace RemoveEntity {
  export type AsObject = {
    id: string
  }
}

export class SetEntityParent extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getParentid(): string
  setParentid(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SetEntityParent.AsObject
  static toObject(includeInstance: boolean, msg: SetEntityParent): SetEntityParent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SetEntityParent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SetEntityParent
  static deserializeBinaryFromReader(message: SetEntityParent, reader: jspb.BinaryReader): SetEntityParent
}

export namespace SetEntityParent {
  export type AsObject = {
    entityid: string
    parentid: string
  }
}

export class ComponentRemoved extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getName(): string
  setName(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ComponentRemoved.AsObject
  static toObject(includeInstance: boolean, msg: ComponentRemoved): ComponentRemoved.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ComponentRemoved, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ComponentRemoved
  static deserializeBinaryFromReader(message: ComponentRemoved, reader: jspb.BinaryReader): ComponentRemoved
}

export namespace ComponentRemoved {
  export type AsObject = {
    entityid: string
    name: string
  }
}

export class Color extends jspb.Message {
  getR(): number
  setR(value: number): void

  getG(): number
  setG(value: number): void

  getB(): number
  setB(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Color.AsObject
  static toObject(includeInstance: boolean, msg: Color): Color.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: Color, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Color
  static deserializeBinaryFromReader(message: Color, reader: jspb.BinaryReader): Color
}

export namespace Color {
  export type AsObject = {
    r: number
    g: number
    b: number
  }
}

export class TextShapeModel extends jspb.Message {
  getBillboard(): boolean
  setBillboard(value: boolean): void

  getValue(): string
  setValue(value: string): void

  hasColor(): boolean
  clearColor(): void
  getColor(): Color | undefined
  setColor(value?: Color): void

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
  getShadowcolor(): Color | undefined
  setShadowcolor(value?: Color): void

  getOutlinewidth(): number
  setOutlinewidth(value: number): void

  hasOutlinecolor(): boolean
  clearOutlinecolor(): void
  getOutlinecolor(): Color | undefined
  setOutlinecolor(value?: Color): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TextShapeModel.AsObject
  static toObject(includeInstance: boolean, msg: TextShapeModel): TextShapeModel.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TextShapeModel, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TextShapeModel
  static deserializeBinaryFromReader(message: TextShapeModel, reader: jspb.BinaryReader): TextShapeModel
}

export namespace TextShapeModel {
  export type AsObject = {
    billboard: boolean
    value: string
    color?: Color.AsObject
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
    shadowcolor?: Color.AsObject
    outlinewidth: number
    outlinecolor?: Color.AsObject
  }
}

export class UpdateEntityComponent extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getClassid(): number
  setClassid(value: number): void

  getName(): string
  setName(value: string): void

  hasTextshape(): boolean
  clearTextshape(): void
  getTextshape(): TextShapeModel | undefined
  setTextshape(value?: TextShapeModel): void

  getModelCase(): UpdateEntityComponent.ModelCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): UpdateEntityComponent.AsObject
  static toObject(includeInstance: boolean, msg: UpdateEntityComponent): UpdateEntityComponent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: UpdateEntityComponent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): UpdateEntityComponent
  static deserializeBinaryFromReader(message: UpdateEntityComponent, reader: jspb.BinaryReader): UpdateEntityComponent
}

export namespace UpdateEntityComponent {
  export type AsObject = {
    entityid: string
    classid: number
    name: string
    textshape?: TextShapeModel.AsObject
  }

  export enum ModelCase {
    MODEL_NOT_SET = 0,
    TEXTSHAPE = 4
  }
}

export class ComponentCreated extends jspb.Message {
  getId(): string
  setId(value: string): void

  getClassid(): number
  setClassid(value: number): void

  getName(): string
  setName(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ComponentCreated.AsObject
  static toObject(includeInstance: boolean, msg: ComponentCreated): ComponentCreated.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ComponentCreated, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ComponentCreated
  static deserializeBinaryFromReader(message: ComponentCreated, reader: jspb.BinaryReader): ComponentCreated
}

export namespace ComponentCreated {
  export type AsObject = {
    id: string
    classid: number
    name: string
  }
}

export class AttachEntityComponent extends jspb.Message {
  getEntityid(): string
  setEntityid(value: string): void

  getName(): string
  setName(value: string): void

  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AttachEntityComponent.AsObject
  static toObject(includeInstance: boolean, msg: AttachEntityComponent): AttachEntityComponent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AttachEntityComponent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AttachEntityComponent
  static deserializeBinaryFromReader(message: AttachEntityComponent, reader: jspb.BinaryReader): AttachEntityComponent
}

export namespace AttachEntityComponent {
  export type AsObject = {
    entityid: string
    name: string
    id: string
  }
}

export class ComponentDisposed extends jspb.Message {
  getId(): string
  setId(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ComponentDisposed.AsObject
  static toObject(includeInstance: boolean, msg: ComponentDisposed): ComponentDisposed.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ComponentDisposed, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ComponentDisposed
  static deserializeBinaryFromReader(message: ComponentDisposed, reader: jspb.BinaryReader): ComponentDisposed
}

export namespace ComponentDisposed {
  export type AsObject = {
    id: string
  }
}

export class ComponentUpdated extends jspb.Message {
  getId(): string
  setId(value: string): void

  getJson(): string
  setJson(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ComponentUpdated.AsObject
  static toObject(includeInstance: boolean, msg: ComponentUpdated): ComponentUpdated.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ComponentUpdated, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ComponentUpdated
  static deserializeBinaryFromReader(message: ComponentUpdated, reader: jspb.BinaryReader): ComponentUpdated
}

export namespace ComponentUpdated {
  export type AsObject = {
    id: string
    json: string
  }
}

export class SendSceneMessage extends jspb.Message {
  getSceneid(): string
  setSceneid(value: string): void

  getTag(): string
  setTag(value: string): void

  hasCreateentity(): boolean
  clearCreateentity(): void
  getCreateentity(): CreateEntity | undefined
  setCreateentity(value?: CreateEntity): void

  hasRemoveentity(): boolean
  clearRemoveentity(): void
  getRemoveentity(): RemoveEntity | undefined
  setRemoveentity(value?: RemoveEntity): void

  hasSetentityparent(): boolean
  clearSetentityparent(): void
  getSetentityparent(): SetEntityParent | undefined
  setSetentityparent(value?: SetEntityParent): void

  hasUpdateentitycomponent(): boolean
  clearUpdateentitycomponent(): void
  getUpdateentitycomponent(): UpdateEntityComponent | undefined
  setUpdateentitycomponent(value?: UpdateEntityComponent): void

  hasAttachentitycomponent(): boolean
  clearAttachentitycomponent(): void
  getAttachentitycomponent(): AttachEntityComponent | undefined
  setAttachentitycomponent(value?: AttachEntityComponent): void

  hasComponentcreated(): boolean
  clearComponentcreated(): void
  getComponentcreated(): ComponentCreated | undefined
  setComponentcreated(value?: ComponentCreated): void

  hasComponentdisposed(): boolean
  clearComponentdisposed(): void
  getComponentdisposed(): ComponentDisposed | undefined
  setComponentdisposed(value?: ComponentDisposed): void

  hasComponentremoved(): boolean
  clearComponentremoved(): void
  getComponentremoved(): ComponentRemoved | undefined
  setComponentremoved(value?: ComponentRemoved): void

  hasComponentupdated(): boolean
  clearComponentupdated(): void
  getComponentupdated(): ComponentUpdated | undefined
  setComponentupdated(value?: ComponentUpdated): void

  hasScenestarted(): boolean
  clearScenestarted(): void
  getScenestarted(): google_protobuf_empty_pb.Empty | undefined
  setScenestarted(value?: google_protobuf_empty_pb.Empty): void

  getPayloadCase(): SendSceneMessage.PayloadCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SendSceneMessage.AsObject
  static toObject(includeInstance: boolean, msg: SendSceneMessage): SendSceneMessage.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SendSceneMessage, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SendSceneMessage
  static deserializeBinaryFromReader(message: SendSceneMessage, reader: jspb.BinaryReader): SendSceneMessage
}

export namespace SendSceneMessage {
  export type AsObject = {
    sceneid: string
    tag: string
    createentity?: CreateEntity.AsObject
    removeentity?: RemoveEntity.AsObject
    setentityparent?: SetEntityParent.AsObject
    updateentitycomponent?: UpdateEntityComponent.AsObject
    attachentitycomponent?: AttachEntityComponent.AsObject
    componentcreated?: ComponentCreated.AsObject
    componentdisposed?: ComponentDisposed.AsObject
    componentremoved?: ComponentRemoved.AsObject
    componentupdated?: ComponentUpdated.AsObject
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
    SCENESTARTED = 12
  }
}

export class SetPosition extends jspb.Message {
  getX(): number
  setX(value: number): void

  getY(): number
  setY(value: number): void

  getZ(): number
  setZ(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SetPosition.AsObject
  static toObject(includeInstance: boolean, msg: SetPosition): SetPosition.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SetPosition, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SetPosition
  static deserializeBinaryFromReader(message: SetPosition, reader: jspb.BinaryReader): SetPosition
}

export namespace SetPosition {
  export type AsObject = {
    x: number
    y: number
    z: number
  }
}

export class ContentMapping extends jspb.Message {
  getFile(): string
  setFile(value: string): void

  getHash(): string
  setHash(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ContentMapping.AsObject
  static toObject(includeInstance: boolean, msg: ContentMapping): ContentMapping.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ContentMapping, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ContentMapping
  static deserializeBinaryFromReader(message: ContentMapping, reader: jspb.BinaryReader): ContentMapping
}

export namespace ContentMapping {
  export type AsObject = {
    file: string
    hash: string
  }
}

export class Position extends jspb.Message {
  getX(): number
  setX(value: number): void

  getY(): number
  setY(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Position.AsObject
  static toObject(includeInstance: boolean, msg: Position): Position.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Position
  static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position
}

export namespace Position {
  export type AsObject = {
    x: number
    y: number
  }
}

export class LoadParcelScenes extends jspb.Message {
  getId(): string
  setId(value: string): void

  hasBaseposition(): boolean
  clearBaseposition(): void
  getBaseposition(): Position | undefined
  setBaseposition(value?: Position): void

  clearParcelsList(): void
  getParcelsList(): Array<Position>
  setParcelsList(value: Array<Position>): void
  addParcels(value?: Position, index?: number): Position

  clearContentsList(): void
  getContentsList(): Array<ContentMapping>
  setContentsList(value: Array<ContentMapping>): void
  addContents(value?: ContentMapping, index?: number): ContentMapping

  getBaseurl(): string
  setBaseurl(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): LoadParcelScenes.AsObject
  static toObject(includeInstance: boolean, msg: LoadParcelScenes): LoadParcelScenes.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: LoadParcelScenes, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): LoadParcelScenes
  static deserializeBinaryFromReader(message: LoadParcelScenes, reader: jspb.BinaryReader): LoadParcelScenes
}

export namespace LoadParcelScenes {
  export type AsObject = {
    id: string
    baseposition?: Position.AsObject
    parcelsList: Array<Position.AsObject>
    contentsList: Array<ContentMapping.AsObject>
    baseurl: string
  }
}

export class CreateUIScene extends jspb.Message {
  getId(): string
  setId(value: string): void

  getBaseurl(): string
  setBaseurl(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): CreateUIScene.AsObject
  static toObject(includeInstance: boolean, msg: CreateUIScene): CreateUIScene.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: CreateUIScene, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): CreateUIScene
  static deserializeBinaryFromReader(message: CreateUIScene, reader: jspb.BinaryReader): CreateUIScene
}

export namespace CreateUIScene {
  export type AsObject = {
    id: string
    baseurl: string
  }
}

export class UnloadScene extends jspb.Message {
  getSceneid(): string
  setSceneid(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): UnloadScene.AsObject
  static toObject(includeInstance: boolean, msg: UnloadScene): UnloadScene.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: UnloadScene, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): UnloadScene
  static deserializeBinaryFromReader(message: UnloadScene, reader: jspb.BinaryReader): UnloadScene
}

export namespace UnloadScene {
  export type AsObject = {
    sceneid: string
  }
}

export class DclMessage extends jspb.Message {
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
  getSendscenemessage(): SendSceneMessage | undefined
  setSendscenemessage(value?: SendSceneMessage): void

  hasLoadparcelscenes(): boolean
  clearLoadparcelscenes(): void
  getLoadparcelscenes(): LoadParcelScenes | undefined
  setLoadparcelscenes(value?: LoadParcelScenes): void

  hasUnloadscene(): boolean
  clearUnloadscene(): void
  getUnloadscene(): UnloadScene | undefined
  setUnloadscene(value?: UnloadScene): void

  hasSetposition(): boolean
  clearSetposition(): void
  getSetposition(): SetPosition | undefined
  setSetposition(value?: SetPosition): void

  hasReset(): boolean
  clearReset(): void
  getReset(): google_protobuf_empty_pb.Empty | undefined
  setReset(value?: google_protobuf_empty_pb.Empty): void

  hasCreateuiscene(): boolean
  clearCreateuiscene(): void
  getCreateuiscene(): CreateUIScene | undefined
  setCreateuiscene(value?: CreateUIScene): void

  getMessageCase(): DclMessage.MessageCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): DclMessage.AsObject
  static toObject(includeInstance: boolean, msg: DclMessage): DclMessage.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: DclMessage, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): DclMessage
  static deserializeBinaryFromReader(message: DclMessage, reader: jspb.BinaryReader): DclMessage
}

export namespace DclMessage {
  export type AsObject = {
    setdebug?: google_protobuf_empty_pb.Empty.AsObject
    setscenedebugpanel?: google_protobuf_empty_pb.Empty.AsObject
    setenginedebugpanel?: google_protobuf_empty_pb.Empty.AsObject
    sendscenemessage?: SendSceneMessage.AsObject
    loadparcelscenes?: LoadParcelScenes.AsObject
    unloadscene?: UnloadScene.AsObject
    setposition?: SetPosition.AsObject
    reset?: google_protobuf_empty_pb.Empty.AsObject
    createuiscene?: CreateUIScene.AsObject
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

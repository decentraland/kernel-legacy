import { action } from 'typesafe-actions'
import { ChatData, PingMessage, ProfileData } from '@dcl/protos'
import { PositionReport } from '../presence/types/PositionReport'

export const COMMS_STARTED = '[Comms] Starting connection'
export const COMMS_TIMEOUT = '[Comms] Connection timed out'
export const COMMS_RETRY = '[Comms] Connection retry trigger'
export const COMMS_CLOSED = '[Comms] Connection closed'
export const COMMS_WELCOME = '[Comms] Received Welcome Message'
export const COMMS_WEBRTC_ICE_CANDIDATE = '[Comms] Received ICE Candidate'
export const COMMS_WEBRTC_ICE_OFFER = '[Comms] Received ICE Offer'
export const COMMS_WEBRTC_ICE_ANSWER = '[Comms] Received ICE Candidate'
export const COMMS_WEBRTC_SIGNALING_STATE = '[Comms] Signaling State Change'
export const COMMS_WEBRTC_ICE_STATE = '[Comms] ICE State Change'
export const COMMS_WEBRTC_ERROR = '[Comms] WebRTC Error'
export const COMMS_DATACHANNEL_RELIABLE = '[Comms] Reliable Channel Acquired'
export const COMMS_DATACHANNEL_UNRELIABLE = '[Comms] Unreliable Channel Acquired'
export const COMMS_DATACHANNEL_RELIABLE_LOST = '[Comms] Reliable Channel Lost'
export const COMMS_DATACHANNEL_UNRELIABLE_LOST = '[Comms] Unreliable Channel Lost'
export const COMMS_CREDENTIALS_REQUEST = '[Comms] Getting Credentials'
export const COMMS_CREDENTIALS_ACQUIRED = '[Comms] Credentials Obtained'
export const COMMS_REQUEST_AUTHENTICATION = '[Comms] Sending Authentication'
export const COMMS_SUCCESS_AUTHENTICATION = '[Comms] Successfully Authenticated'
export const COMMS_FAILURE_AUTHENTICATION = '[Comms] Failure Authenticating'

export const commsStarted = () => action(COMMS_STARTED)
export type CommsStartedAction = ReturnType<typeof commsStarted>
export const commsTimeout = () => action(COMMS_TIMEOUT)
export type CommsTimeoutAction = ReturnType<typeof commsTimeout>
export const commsRetry = () => action(COMMS_RETRY)
export type CommsRetryAction = ReturnType<typeof commsRetry>
export const commsClosed = () => action(COMMS_CLOSED)
export type CommsClosedAction = ReturnType<typeof commsClosed>
export const commsWelcome = (payload: { alias: number; serverAlias: number; availableServers: any }) =>
  action(COMMS_WELCOME, payload)
export type CommsWelcomeAction = ReturnType<typeof commsWelcome>
export const commsWebrtcIceCandidate = (candidate: any) => action(COMMS_WEBRTC_ICE_CANDIDATE, { candidate })
export type CommsWebrtcIceCandidateAction = ReturnType<typeof commsWebrtcIceCandidate>
export const commsWebrtcIceOffer = (payload: { serverAlias: number; sessionData: string; localDescription: string }) =>
  action(COMMS_WEBRTC_ICE_OFFER, payload)
export type CommsWebrtcIceOfferAction = ReturnType<typeof commsWebrtcIceOffer>
export const commsWebrtcIceAnswer = (answer: any) => action(COMMS_WEBRTC_ICE_ANSWER, { answer })
export type CommsWebrtcIceAnswerAction = ReturnType<typeof commsWebrtcIceAnswer>
export const commsWebrtcSignalingState = (payload: any) => action(COMMS_WEBRTC_SIGNALING_STATE, payload)
export type CommsWebrtcSignalingStateAction = ReturnType<typeof commsWebrtcSignalingState>
export const commsWebrtcIceState = (payload: any) => action(COMMS_WEBRTC_ICE_STATE, payload)
export type CommsWebrtcIceStateAction = ReturnType<typeof commsWebrtcIceState>
export const commsWebrtcError = (payload: any) => action(COMMS_WEBRTC_ERROR, payload)
export type CommsWebrtcErrorAction = ReturnType<typeof commsWebrtcError>
export const commsDatachannelReliable = (payload: any) => action(COMMS_DATACHANNEL_RELIABLE, payload)
export type CommsDatachannelReliableAction = ReturnType<typeof commsDatachannelReliable>
export const commsDatachannelUnreliable = (payload: any) => action(COMMS_DATACHANNEL_UNRELIABLE, payload)
export type CommsDatachannelUnreliableAction = ReturnType<typeof commsDatachannelUnreliable>
export const commsDatachannelReliableLost = (payload: any) => action(COMMS_DATACHANNEL_RELIABLE_LOST, payload)
export type CommsDatachannelReliableLostAction = ReturnType<typeof commsDatachannelReliableLost>
export const commsDatachannelUnreliableLost = (payload: any) => action(COMMS_DATACHANNEL_UNRELIABLE_LOST, payload)
export type CommsDatachannelUnreliableLostAction = ReturnType<typeof commsDatachannelUnreliableLost>
export const commsCredentialsRequest = () => action(COMMS_CREDENTIALS_REQUEST)
export type CommsCredentialsRequestAction = ReturnType<typeof commsCredentialsRequest>
export const commsCredentialsAcquired = () => action(COMMS_CREDENTIALS_ACQUIRED)
export type CommsCredentialsAcquiredAction = ReturnType<typeof commsCredentialsAcquired>
export const commsRequestAuthentication = () => action(COMMS_REQUEST_AUTHENTICATION)
export type CommsRequestAuthenticationAction = ReturnType<typeof commsRequestAuthentication>
export const commsSuccessAuthentication = () => action(COMMS_SUCCESS_AUTHENTICATION)
export type CommsSuccessAuthenticationAction = ReturnType<typeof commsSuccessAuthentication>
export const commsFailureAuthentication = () => action(COMMS_FAILURE_AUTHENTICATION)
export type CommsFailureAuthenticationAction = ReturnType<typeof commsFailureAuthentication>

export type CommsConnectionAction =
  | CommsStartedAction
  | CommsTimeoutAction
  | CommsRetryAction
  | CommsClosedAction
  | CommsWelcomeAction
  | CommsWebrtcIceCandidateAction
  | CommsWebrtcIceOfferAction
  | CommsWebrtcIceAnswerAction
  | CommsWebrtcSignalingStateAction
  | CommsWebrtcIceStateAction
  | CommsWebrtcErrorAction
  | CommsDatachannelReliableAction
  | CommsDatachannelUnreliableAction
  | CommsDatachannelReliableLostAction
  | CommsDatachannelUnreliableLostAction
  | CommsCredentialsRequestAction
  | CommsCredentialsAcquiredAction
  | CommsRequestAuthenticationAction
  | CommsSuccessAuthenticationAction
  | CommsFailureAuthenticationAction

export const PROTOCOL_POSITION = '[Protocol:In] Position update'
export const PROTOCOL_PROFILE = '[Protocol:In] Profile update'
export const PROTOCOL_PING = '[Protocol:In] Ping'
export const PROTOCOL_CHAT = '[Protocol:In] Chat message'
export const PROTOCOL_SCENE = '[Protocol:In] Scene event'
export const PROTOCOL_UNKNOWN = '[Protocol:In] Unknown message'

export const protocolPosition = (positionData: PositionData) => action(PROTOCOL_POSITION, positionData)
export type ProtocolPositionAction = ReturnType<typeof protocolPosition>
export const protocolProfile = (alias: string, userId: string, profile: ProfileData) =>
  action(PROTOCOL_PROFILE, { alias, userId, profile })
export type ProtocolProfileAction = ReturnType<typeof protocolProfile>
export const protocolPing = (ping: PingMessage) => action(PROTOCOL_PING, { ping })
export type ProtocolPingAction = ReturnType<typeof protocolPing>
export const protocolChat = (chatData: ChatData) => action(PROTOCOL_CHAT, { chatData })
export type ProtocolChatAction = ReturnType<typeof protocolChat>
export const protocolScene = (chatData: ChatData) => action(PROTOCOL_SCENE, { message: chatData })
export type ProtocolSceneAction = ReturnType<typeof protocolScene>
export const protocolUnknown = (data: Buffer) => action(PROTOCOL_UNKNOWN, { data })
export type ProtocolUnknownAction = ReturnType<typeof protocolUnknown>

export type ProtocolInActionType =
  | ProtocolPositionAction
  | ProtocolProfileAction
  | ProtocolPingAction
  | ProtocolChatAction
  | ProtocolSceneAction
  | ProtocolUnknownAction

export const PROTOCOL_OUT_POSITION = '[Protocol:Out] Position update'
export const PROTOCOL_OUT_PROFILE = '[Protocol:Out] Profile update'
export const PROTOCOL_OUT_PING = '[Protocol:Out] Ping'
export const PROTOCOL_OUT_YELL = '[Protocol:Out] Public message in current position'
export const PROTOCOL_OUT_PRIVATE_MESSAGE = '[Protocol:Out] Private message to target user'
export const PROTOCOL_OUT_CHAT = '[Protocol:Out] Chat message'
export const PROTOCOL_OUT_SCENE = '[Protocol:Out] Scene event'

export const protocolOutPosition = (positionData: PositionReport) => action(PROTOCOL_OUT_POSITION, positionData)
export type ProtocolOutPositionAction = ReturnType<typeof protocolOutPosition>
export const protocolOutProfile = () => action(PROTOCOL_OUT_PROFILE)
export type ProtocolOutProfileAction = ReturnType<typeof protocolOutProfile>
export const protocolOutPing = () => action(PROTOCOL_OUT_PING)
export type ProtocolOutPingAction = ReturnType<typeof protocolOutPing>
export const protocolOutYell = (message: string) => action(PROTOCOL_OUT_YELL, { message })
export type ProtocolOutYellAction = ReturnType<typeof protocolOutYell>
export const protocolOutPrivateMessage = (to: string, message: string) =>
  action(PROTOCOL_OUT_PRIVATE_MESSAGE, { to, message })
export type ProtocolOutPrivateMessageAction = ReturnType<typeof protocolOutPrivateMessage>
export const protocolOutChat = (topic: string, message: string) => action(PROTOCOL_OUT_CHAT, { topic, message })
export type ProtocolOutChatAction = ReturnType<typeof protocolOutChat>
export const protocolOutScene = (sceneId: string, message: string) => action(PROTOCOL_OUT_SCENE, { sceneId, message })
export type ProtocolOutSceneAction = ReturnType<typeof protocolOutScene>
export type ProtocolOutActionType =
  | ProtocolOutPositionAction
  | ProtocolOutProfileAction
  | ProtocolOutPingAction
  | ProtocolOutChatAction
  | ProtocolOutYellAction
  | ProtocolOutPrivateMessageAction
  | ProtocolOutSceneAction

export const PROTOCOL_SUBSCRIPTION = '[Protocol] Requesting topic subscription'
export const PROTOCOL_UNSUBSCRIBE = '[Protocol] Removing subscription'

export const protocolSubscription = (topic: string) => action(PROTOCOL_SUBSCRIPTION, { topic })
export type ProtocolSubscriptionAction = ReturnType<typeof protocolSubscription>
export const protocolUnsubscribe = (topic: string) => action(PROTOCOL_UNSUBSCRIBE, { topic })
export type ProtocolUnsubscribeAction = ReturnType<typeof protocolUnsubscribe>

export type ProtocolSubscriptionActionType = ProtocolSubscriptionAction | ProtocolUnsubscribeAction

// All Actions

export type CommsAction =
  | ProtocolSubscriptionActionType
  | ProtocolInActionType
  | ProtocolOutActionType
  | CommsConnectionAction

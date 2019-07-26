import { DEBUG_MOBILE } from '@dcl/config/dist/Environment'

export function isMobile() {
  return /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) || DEBUG_MOBILE
}

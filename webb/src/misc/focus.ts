/**
 * Horrible, horrible hack
 */
export const FOCUS_CLASS_NAME = 'main-input-focus'
export function focusByClassName() {
  const element = document.querySelector(`.${FOCUS_CLASS_NAME} input`)
  if (element) {
    (element as HTMLInputElement).focus()
  }
}

// TODO make a pretty decentraland-ui like error
export function handleError(error) {
  document.body.classList.remove('dcl-loading')
  document.body.innerHTML = `<h3>${error.message}</h3>`
}

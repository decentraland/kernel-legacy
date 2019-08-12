import * as React from 'react'
import { Page, Modal } from 'decentraland-ui'
import { client } from '~/modules/systems'

export default class AuthConnect extends React.Component {
  modal = React.createRef()
  componentDidMount() {
    if (!client.Auth.auth) {
      client.Auth.statusObservable.add(event => {
        if (event === 'UserWaiting') {
          client.Auth.auth.login((this.modal.current as any).ref)
        }
      })
      if (client.Config._status === 'Waiting') {
        client.Config.tryStart()
      }
    } else {
      if (client.Auth.auth.isLoggedIn()) {
        client.Auth.auth.login((this.modal.current as any).ref).then(result => {
          client.Auth.callback.resolve(true)
        })
      } else {
        client.Auth.callback.resolve((this.modal.current as any).ref))
      }
    }
  }
  render() {
    return (
      <>
        <Page>
          <Modal
            size={'fullscreen'}
            className='embed'
            style={{ height: '100%', width: '100%' }}
            ref={this.modal as any}
            open={true}
          ></Modal>
        </Page>
      </>
    )
  }
}

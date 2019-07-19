import React from 'react'

import { Navbar as UINavbar, Menu, Button } from 'decentraland-ui'

export type NavbarProps = {
  currentPage: string
  isLoggedIn: boolean
  isLoggingIn: boolean
  profileLoaded: boolean
  login: (...args: any) => any
  userId?: string
  profile?: {
    name: string
    ethAddress: string
  }
}

export class Picture extends React.PureComponent<{ userId: string }> {
  render() {
    return <img src={`https://s3.amazonaws.com/nico.decentraland.zone/${this.props.userId}/face.png`} alt="Face" style={{ width: '48px', height: '48px', borderRadius: '40px' }} />
  }
}

export class Navbar extends React.PureComponent<NavbarProps> {

  render() {
    return <UINavbar isFullscreen leftMenu={
      <>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>World</Menu.Item>
        <Menu.Item>Communications</Menu.Item>
        <Menu.Item>Assets</Menu.Item>
      </>
    } rightMenu={
      <>
        { this.props.isLoggedIn
          ? <Picture userId={this.props.userId!} />
          : this.props.currentPage === '/login' ? ''
            : this.props.isLoggingIn ? <span>Loading...</span>
              : <Button size='small' primary onClick={this.props.login}>Log in</Button>
        }
      </>
    }/>
  }
}

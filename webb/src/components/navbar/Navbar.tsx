import React from 'react'

import { Navbar as UINavbar, Menu, Button } from 'decentraland-ui'

export type NavbarProps = {
  currentPage: string
  isLoggedIn: boolean
  isLoggingIn: boolean
  profileLoaded: boolean
  login: (...args: any) => any
  pushLocation: (link: string) => any
  userId?: string
  profile?: {
    name: string
    ethAddress: string
  }
}

export class Picture extends React.PureComponent<{ userId: string }> {
  render() {
    return (
      <img
        src={`https://s3.amazonaws.com/avatars-storage.decentraland.org/${this.props.userId}/face.png`}
        alt='Face'
        style={{ width: '48px', height: '48px', borderRadius: '40px' }}
      />
    )
  }
}

export class Navbar extends React.PureComponent<NavbarProps> {
  links: Record<string, any> = new Map<string, any>()

  goTo = (key: string) =>
    !this.links.has(key)
      ? this.links.set(key, (...args: any) => this.props.pushLocation(key)) && this.links.get(key)
      : this.links.get(key)

  render() {
    return (
      <UINavbar
        isFullscreen
        leftMenu={
          <>
            <Menu.Item link={true} onClick={this.goTo('/')} active={this.props.currentPage === '/'}>
              Status
            </Menu.Item>
            <Menu.Item
              link={true}
              onClick={this.goTo('/map')}
              active={this.props.currentPage === '/map' || this.props.currentPage.startsWith('/parcel')}
            >
              World
            </Menu.Item>
            <Menu.Item link={true} onClick={this.goTo('/assets')} active={this.props.currentPage === '/assets'}>
              Assets
            </Menu.Item>
          </>
        }
        rightMenu={
          <>
            {this.props.isLoggedIn ? (
              <Picture userId={this.props.userId!} />
            ) : this.props.currentPage === '/login' ? (
              ''
            ) : this.props.isLoggingIn ? (
              <span>Loading...</span>
            ) : (
              <Button size='small' primary onClick={this.props.login}>
                Log in
              </Button>
            )}
          </>
        }
      />
    )
  }
}

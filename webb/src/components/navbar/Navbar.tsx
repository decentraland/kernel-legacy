import React from 'react'

import { Navbar as UINavbar, Menu, Button, Segment } from '../liteui/dcl'

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
        alt="Face"
        style={{ width: '32px', height: '32px', borderRadius: '40px' }}
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
    return <></>
  }
}

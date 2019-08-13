import React from 'react'
import { Push } from 'connected-react-router'
export class LinkReactComponent<
  T extends {
    href?: string
    push: Push
  },
  X
> extends React.Component<T, X> {
  _link: {
    [key: string]: any
  } = {}
  link = (url: string) => {
    if (!this._link[url]) {
      this._link[url] = (ev: any) => {
        url.startsWith('http') ? ((window as any).location.href = url) : this.props.push(url)
        ev.preventDefault()
      }
    }
    return this._link[url]
  }
  render() {
    const aprops = { ...this.props }
    delete (aprops as any)['push']
    return (
      <a {...aprops} onClick={this.link(this.props.href)}>
        {this.props.children}
      </a>
    )
  }
}

import React from 'react'
import { Push } from 'connected-react-router'
export class LinkReactComponent<T extends {
  push: Push;
}, X> extends React.Component<T, X> {
  _link: {
    [key: string]: any;
  } = {};
  link = (url: string) => {
    if (!this._link[url]) {
      this._link[url] = () => url.startsWith('http') ? (window as any).location.href = url : this.props.push(url);
    }
    return this._link[url];
  };
}

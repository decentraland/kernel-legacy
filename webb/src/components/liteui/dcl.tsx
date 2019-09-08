import React from 'react'

export function Navbar(props: any) {
  return (
    <div className="dcl navbar fullscreen" role="navigation">
      <Menu>{props.leftMenu}</Menu>
    </div>
  )
}

export function Container(props: any) {
  return <div className="ui container">{props.children}</div>
}

export function Menu(props: any) {
  const { className, children, ...other } = props
  return (
    <div className={(className || '') + 'dcl navbar-menu'} {...other}>
      <div className="ui secondary stackable menu">
        <a className="dcl navbar-logo" href="/">
          <i className="dcl logo" />
        </a>
        {children}
      </div>
    </div>
  )
}

export function MenuItem(props: any) {
  const { children, className, ...otherProps } = props
  return (
    <a className={(className || '') + ' link item'} {...otherProps}>
      {children}
    </a>
  )
}

Menu.Item = MenuItem

export function MobileMenu(props: any) {
  const { children, className, ...otherProps } = props
  return (
    <a className={(className || '') + ' link item'} {...otherProps}>
      {children}
    </a>
  )
}

export function Page(props: any) {
  const { children, className, ...otherProps } = props
  return (
    <div className={'dcl page ' + (className || '')} {...otherProps}>
      {children}
    </div>
  )
}

export function Segment(props: any) {
  const { children, ...otherProps } = props
  return (
    <div className="ui segment" {...otherProps}>
      {children}
    </div>
  )
}

export function Grid(props: any) {
  const { children, ...propss } = props
  return (
    <div {...propss} className="ui grid">
      {children}
    </div>
  )
}

export function Row(props: any) {
  const { children, ...propss } = props
  return (
    <div {...propss} className="row">
      {children}
    </div>
  )
}

export function Button(props: any) {
  const { children, className, ...propss } = props
  return (
    <div {...propss} className={(className || '') + ' button'}>
      {children}
    </div>
  )
}
export function Column(props: any) {
  const { children, ...propss } = props
  return (
    <div {...propss} className="column">
      {children}
    </div>
  )
}

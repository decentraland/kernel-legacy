import { Component } from '../../Component'
import { deepCompare } from '../../util/deepCompare'

export function differentComponent(a: Component, b: Component) {
  // Pick strategy
  return deepCompare(a, b)
}

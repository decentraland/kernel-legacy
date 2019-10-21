const json = JSON
const isArray = Array.isArray
const objectKeys = Object.keys

export function stableJson({
  obj,
  options
}: {
  obj: any
  options?: {
    replacer?: Function
    cmp?: Function
    space?: string
    cycles?: boolean
  }
}) {
  let opts = options
  if (!opts) opts = {}
  let space = opts.space || ''
  let cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false
  let replacer =
    opts.replacer ||
    function(_: string, value: any) {
      return value
    }

  let cmp =
    opts.cmp &&
    (function(f) {
      return function(node: any) {
        return function(a: string, b: string) {
          let aobj = { key: a, value: node[a] }
          let bobj = { key: b, value: node[b] }
          return f(aobj, bobj)
        }
      }
    })(opts.cmp)

  let seen: any[] = []
  return (function stringify(parent: object, key: string | number, thenode, level): string {
    let node = thenode
    let indent = space ? '\n' + new Array(level + 1).join(space) : ''
    let colonSeparator = space ? ': ' : ':'

    if (node && node.toJSON && typeof node.toJSON === 'function') {
      node = node.toJSON()
    }

    node = replacer.call(parent, key, node)

    if (node === undefined) {
      return 'undefined'
    }
    if (typeof node !== 'object' || node === null) {
      return json.stringify(node)
    }
    if (isArray(node)) {
      let out: string[] = []
      for (let i = 0; i < node.length; i++) {
        let item = stringify(node, i, node[i], level + 1) || json.stringify(null)
        out.push(indent + space + item)
      }
      return '[' + out.join(',') + indent + ']'
    } else {
      if (seen.indexOf(node) !== -1) {
        if (cycles) return json.stringify('__cycle__')
        throw new TypeError('Converting circular structure to JSON')
      } else seen.push(node)

      let keys = objectKeys(node).sort(cmp && cmp(node))
      let out: string[] = []
      for (let i = 0; i < keys.length; i++) {
        let key: string | number = keys[i]
        let value = stringify(node, key, node[key], level + 1)

        if (!value) continue

        let keyValue = json.stringify(key) + colonSeparator + value
        out.push(indent + space + keyValue)
      }
      seen.splice(seen.indexOf(node), 1)
      return '{' + out.join(',') + indent + '}'
    }
  })({ '': obj }, '', obj, 0)
}

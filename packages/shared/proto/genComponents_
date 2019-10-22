import * as ts from 'typescript'

export function genComponents(sourceFile: ts.SourceFile) {
  const components: any[] = []

  rootEvaluate(sourceFile)

  function isComponentLike(text: string) {
    return text.includes('Component') || text.includes('Shape') || text.includes('UIShape') || text.includes('OnUU')
  }
  function isShape(text: string) {
    return text.includes(' Shape')
  }
  function isUIShape(text: string) {
    return text.includes(' UIShape')
  }
  function simplifyType(pbType: string) {
    if (pbType.includes(' | ')) {
      pbType = pbType.substr(0, pbType.indexOf(' '))
    }
    return pbType === 'number' ? 'float' : pbType === 'boolean' ? pbType : pbType === 'string' ? pbType : 'PB_' + pbType
  }
  function formatFields(fields: any[]) {
    return fields.map((_, index) => `  ${_[0]} ${_[1]} = ${index + 1};`).join('\n')
  }

  function evaluateClass(node: ts.ClassDeclaration) {
    const fields: any[] = []

    if (!node.heritageClauses) {
      return
    }
    if (!node.heritageClauses.map(_ => _.getFullText()).filter(isComponentLike).length) {
      return
    }
    const className = 'PB_' + node.name!.text
    const inherits = node.heritageClauses.map(_ => _.getFullText()).join(' ')
    if (isShape(inherits) && className !== 'PB_Shape') {
      fields.push(['boolean', 'withCollisions'])
      fields.push(['boolean', 'visible'])
    }
    if (className.startsWith('PB_On')) {
      return [className, formatFields([['string', 'type'], ['string', 'uuid']])]
    }
    if (isUIShape(inherits)) {
      fields.push(
        ['string', 'name'],
        ['boolean', 'visible'],
        ['float', 'opacity'],
        ['string', 'hAlign'],
        ['string', 'vAlign'],
        ['string', 'width'],
        ['string', 'height'],
        ['string', 'positionX'],
        ['string', 'positionY'],
        ['boolean', 'isPointerBlocker'],
        ['PB_UIShape', 'parent']
      )
    }

    function evaluateField(node: ts.Node) {
      if (node.kind === ts.SyntaxKind.PropertyDeclaration) {
        if (!(node as ts.PropertyDeclaration).type) {
          return
        }
        const type = (node as ts.PropertyDeclaration).type!.getText()
        const name = (node as ts.PropertyDeclaration).name.getText()
        let pbType = type
        if (pbType.endsWith('[]')) {
          pbType = 'repeated ' + simplifyType(pbType.substr(0, pbType.length - 2))
        } else {
          pbType = simplifyType(pbType)
        }
        fields.push([pbType, name])
      }
    }
    ts.forEachChild(node, evaluateField)

    components.push(['PB_' + node.name!.text, formatFields(fields)])
  }

  function rootEvaluate(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration:
        evaluateClass(node as ts.ClassDeclaration)
    }
    ts.forEachChild(node, rootEvaluate)
  }

  return components.map(_ => `message ${_[0]} {\n${_[1]}\n}\n`).join('\n')
}

/**
 * Usage: npx ts-node packages/shared/proto/genComponents.ts
 * And uncomment:
 */
{
  const fs = require('fs')
  const path = require('path')
  console.log(
    genComponents(
      ts.createSourceFile(
        'data.d.ts',
        fs.readFileSync(path.join(__dirname, './data.d.ts')).toString(),
        ts.ScriptTarget.ES2015,
        true
      )
    )
  )
}
//* */

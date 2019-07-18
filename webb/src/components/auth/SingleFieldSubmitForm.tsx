import React from 'react'
import { Segment, Field, Button } from 'decentraland-ui'
export class SingleFieldSubmitForm extends React.PureComponent<{
  title: string
  subtitle?: string
  message?: string
  error?: string
  warning?: string
  loading?: boolean
  action?: (value: string) => any
}> {
  submit = () => this.props.action && this.props.action((this.refs['field'] as any).value)
  render() {
    return (
      <>
        <Segment>
          <h1>{this.props.title}</h1>
          {this.props.subtitle && <h3>{this.props.subtitle}</h3>}
          <Field
            disabled={this.props.loading}
            message={this.props.error || this.props.message}
            warning={this.props.warning}
            error={!!this.props.error}
            ref="field"
          />
          <Button primary disabled={this.props.loading} onClick={this.submit}>
            {this.props.loading ? 'Loading...' : 'Continue'}
          </Button>
        </Segment>
      </>
    )
  }
}

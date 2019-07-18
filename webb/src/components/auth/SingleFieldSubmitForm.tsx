import React from 'react'
import { Segment, Field, Button, InputOnChangeData } from 'decentraland-ui'

export type SingleFieldSubmitFormProps = {
  title: string
  subtitle?: string
  message?: string
  error?: string
  warning?: string
  loading?: boolean
  action?: (value: string) => any
}
export class SingleFieldSubmitForm extends React.PureComponent<SingleFieldSubmitFormProps, { value: string }> {
  input: React.RefObject<any>

  constructor(props: SingleFieldSubmitFormProps) {
    super(props)
    this.input = React.createRef()
    this.state = {
      value: ''
    }
  }

  submit = () => {
    return this.props.action && this.props.action(this.state.value)
  }

  change = (_: any, ev: InputOnChangeData) => {
    return this.setState({ value: ev.value })
  }

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
            value={this.state.value}
            onAction={this.submit}
            onChange={this.change}
            ref={this.input}
          />
          <Button primary disabled={this.props.loading} onClick={this.submit}>
            {this.props.loading ? 'Loading...' : 'Continue'}
          </Button>
        </Segment>
      </>
    )
  }
}

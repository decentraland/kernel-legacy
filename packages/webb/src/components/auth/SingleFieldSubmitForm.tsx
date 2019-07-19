import React from 'react'

import { Segment, Field, Button, Page, InputOnChangeData, Form, Modal } from 'decentraland-ui'

import { FOCUS_CLASS_NAME, focusByClassName } from 'misc/focus'

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
  input?: HTMLInputElement

  constructor(props: SingleFieldSubmitFormProps) {
    super(props)
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

  componentDidMount() {
    focusByClassName()
  }

  render() {
    return (
      <>
        <Page>
        <Modal open={true}>
          <Segment>
            <h1>{this.props.title}</h1>
            {this.props.subtitle && <h3>{this.props.subtitle}</h3>}
            <Form onSubmit={this.submit}>
              <Field
                disabled={this.props.loading}
                message={this.props.error || this.props.message}
                warning={this.props.warning}
                error={!!this.props.error}
                focus={true}
                className={FOCUS_CLASS_NAME}
                value={this.state.value}
                onAction={this.submit}
                onChange={this.change}
                ref={(input: Field | null) => this.input = input as any}
              />
              <Button primary type='submit' disabled={this.props.loading} onClick={this.submit}>
                {this.props.loading ? 'Loading...' : 'Continue'}
              </Button>
            </Form>
          </Segment>
        </Modal>
        </Page>
      </>
    )
  }
}

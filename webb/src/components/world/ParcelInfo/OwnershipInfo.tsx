import React from 'react'

import { Push } from 'connected-react-router'
import {
  Address,
  Button,
  Header,
  HeaderMenu,
  Icon,
  Loader,
  Segment
} from 'decentraland-ui'
import { ParcelData } from '@dcl/webb/src/modules/world'
import { LinkReactComponent } from './LinkReactComponent'

function marketplaceEstateUrl(estateId: string) {
  return `https://market.decentraland.org/estates/${estateId}/detail`
}

function marketplaceParcelUrl(x: number | string, y: number | string) {
  return `https://market.decentraland.org/parcels/${x}/${y}/detail`
}

function marketplaceOwnerUrl(address: string) {
  return `https://market.decentraland.org/address/${address}/parcels`
}

export class AddressLink extends LinkReactComponent<
  { value: string; push: Push },
  any
> {
  render() {
    const link = marketplaceOwnerUrl(this.props.value)
    return (
      <a href={link} target='_blank' rel='noopener noreferrer'>
        <Address value={this.props.value} />
      </a>
    )
  }
}

export class OwnershipInfo extends LinkReactComponent<
  {
    x: number
    y: number
    parcelData: ParcelData
    push: Push
  },
  any
> {
  render() {
    return (
      <>
        <Segment>
          <HeaderMenu>
            <HeaderMenu.Left>
              <Header>Ownership</Header>
            </HeaderMenu.Left>
            <HeaderMenu.Right>
              <Header>
                <Button
                  onClick={this.link(
                    marketplaceParcelUrl(this.props.x, this.props.y)
                  )}
                  basic
                >
                  See on Marketplace
                  <Icon name='chevron right' />
                </Button>
              </Header>
            </HeaderMenu.Right>
          </HeaderMenu>
          {this.props.parcelData ? (
            <>
              {this.props.parcelData.district_id ? (
                <p>
                  Part of District{' '}
                  <a
                    href={marketplaceEstateUrl(
                      this.props.parcelData.estate_id!
                    )}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {this.props.parcelData.estate_id}
                  </a>
                </p>
              ) : (
                ''
              )}
              {!this.props.parcelData.district_id &&
              this.props.parcelData.estate_id ? (
                <p>
                  Part of Estate{' '}
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={marketplaceEstateUrl(this.props.parcelData.estate_id)}
                  >
                    {this.props.parcelData.estate_id}
                  </a>
                </p>
              ) : (
                ''
              )}
              {this.props.parcelData.owner ? (
                <p>
                  Owned by{' '}
                  <AddressLink
                    value={this.props.parcelData.owner}
                    push={this.props.push}
                  />
                </p>
              ) : (
                ''
              )}
              {this.props.parcelData.operator ? (
                <p>
                  Operator:{' '}
                  <AddressLink
                    push={this.props.push}
                    value={this.props.parcelData.operator}
                  />
                </p>
              ) : (
                ''
              )}
              {this.props.parcelData.update_operator ? (
                <p>
                  Update Operator:{' '}
                  <AddressLink
                    push={this.props.push}
                    value={this.props.parcelData.update_operator}
                  />
                </p>
              ) : (
                ''
              )}
            </>
          ) : (
            <Loader />
          )}
        </Segment>
      </>
    )
  }
}

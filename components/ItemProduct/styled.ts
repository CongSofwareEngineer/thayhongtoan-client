import { Rating } from '@mantine/core'
import styled from 'styled-components'
export const Discount = styled.div`
  position: absolute;
`

export const TextPriceBase = styled.span`
  font-size: 13px;
  color: rgb(22, 101, 52);
  text-decoration: line-through;
  display: flex;
  @media screen and (max-width: 568px) {
    font-size: 11px;
  }
`

export const TextPrice = styled.span`
  font-size: 26px;
  color: rgb(22, 101, 52);
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`

export const RateCustom = styled(Rating)`
  @media screen and (max-width: 768px) {
    .ant-rate-star {
      margin-inline-end: 0px !important;
    }
    .ant-rate {
      margin-inline-end: 0px !important;
    }
  }
`

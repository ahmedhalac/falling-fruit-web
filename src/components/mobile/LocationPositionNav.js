import { Check, X } from '@styled-icons/boxicons-regular'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { updatePosition } from '../../redux/locationSlice'
import { setView } from '../../redux/mapSlice'
import { useAppHistory } from '../../utils/useAppHistory'
import { theme } from '../ui/GlobalStyle'
import IconButton from '../ui/IconButton'
import TopBarNav from '../ui/TopBarNav'

const Instructions = styled.span`
  margin-left: 15px;
`

const LocationPositionNav = () => {
  const history = useAppHistory()
  const dispatch = useDispatch()
  const { locationId } = useParams()
  const center = useSelector((state) => state.map.view?.center)
  const storedPosition = useSelector((state) => state.location.position)

  const handleCancel = () => {
    if (storedPosition) {
      dispatch(setView({ center: storedPosition }))
    }
    history.push(`/locations/${locationId}/edit/details`)
  }

  const handleConfirm = () => {
    dispatch(updatePosition(center))
    history.push(`/locations/${locationId}/edit/details`)
  }

  return (
    <TopBarNav
      left={<Instructions>Edit location position.</Instructions>}
      rightIcons={
        <>
          <IconButton
            label="Cancel edit position"
            icon={<X />}
            raised
            size={54}
            onClick={handleCancel}
          />
          <IconButton
            label="Confirm edit position"
            icon={<Check />}
            raised
            size={54}
            color={theme.green}
            onClick={handleConfirm}
          />
        </>
      }
    />
  )
}

export default LocationPositionNav
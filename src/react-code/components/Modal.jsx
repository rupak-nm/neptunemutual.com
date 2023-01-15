import { Fragment } from 'react'

import styled from 'styled-components'

import {
  Dialog,
  Transition
} from '@headlessui/react'

import { colors } from '../styles/colors'

export const Modal = ({ isOpen = false, children, onClose }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as={StyledDialog} onClose={onClose}>
      <OverlayWrapper>
        <StyledOverlay />

        {/* This element is to trick the browser into centering the modal contents. */}
        <FixSpan aria-hidden='true'>
          &#8203;
        </FixSpan>

        {children}
      </OverlayWrapper>
    </Dialog>
  </Transition>
)

const StyledDialog = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  overflow-y: auto;
  background-color: ${colors.black}50;
  /* backdrop-filter: blur(4px); */
`

const OverlayWrapper = styled.div`
  min-height: 100vh;
  padding-left: 16px;
  padding-right: 16px;
  text-align: center;
`

const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
`

const FixSpan = styled.span`
  display: inline-block;
  height: 100vh;
  vertical-align: middle;
`

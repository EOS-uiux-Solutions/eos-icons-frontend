import React from 'react'
import { ModalProps } from '../interface'

const Modal: React.FC<ModalProps> = ({
  isActive,
  show,
  children,
  cancelText,
  okText,
  onCancel,
  onOk,
  showButtons
}) => {
  return isActive ? (
    <div className='modal'>
      <div className='modal-card'>
        <div className='close' onClick={show} />
        <div className='flex flex-row modal-content'>{children}</div>
        {showButtons && (
          <div className='flex flex-row'>
            <div
              className='flex-content modal-btn modal-btn-cancel'
              onClick={onCancel}
            >
              {cancelText || 'Cancel'}
            </div>
            <div
              className='flex-content modal-btn modal-btn-accept'
              onClick={onOk}
            >
              {okText || 'Accept'}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null
}

export default Modal

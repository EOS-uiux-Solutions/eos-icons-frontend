import React from 'react'
import { ButtonProps } from '../interface'

const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  type,
  onClick,
  customClass,
  disabled
}) => {
  const btnClass = primary ? 'btn-primary' : 'btn-default'
  return (
    <button
      className={`btn ${btnClass} ${customClass}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button

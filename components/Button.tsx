import React from 'react'
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  primary?: boolean
  type?: 'button' | 'submit' | 'reset'
  customClass?: string
  disabled?: boolean
}

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

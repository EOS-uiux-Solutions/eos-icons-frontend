import React from 'react'
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  primary?: boolean
  type?: 'button' | 'submit' | 'reset'
  customClass?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  type,
  onClick,
  customClass
}) => {
  const btnClass = primary ? 'btn-primary' : 'btn-default'
  return (
    <button
      className={`btn ${btnClass} ${customClass}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button

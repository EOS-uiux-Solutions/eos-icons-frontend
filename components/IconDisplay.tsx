import React from 'react'

interface sizes {
  [key: number]: string
}

interface iconProps {
  name: string
  size: number
  onClickAction: () => void
  onDoubleClickAction: () => void
  type: 'static' | 'animated'
  active: boolean
  iconsTheme?: 'outlined' | 'filled'
}

const Icon: React.FC<iconProps> = ({
  name,
  size,
  onClickAction,
  onDoubleClickAction,
  type,
  active,
  iconsTheme
}) => {
  /* Possible icon sizes */
  const sizes: sizes = {
    18: 'eos-18',
    24: 'eos-24',
    36: 'eos-36',
    48: 'eos-48'
  }

  const iconClass = () => {
    const initialClass = 'icon-container'
    const activeClass = active ? 'active' : ''
    const finalClass = `${initialClass} ${activeClass}`

    return finalClass
  }

  return type === 'static' ? (
    <div
      className={iconClass()}
      onClick={(event) => {
        if (event.detail === 1) onClickAction()
        if (event.detail === 2) onDoubleClickAction()
      }}
    >
      <i
        className={`eos-icons${iconsTheme === 'outlined' ? '-outlined' : ' '} ${
          sizes[size]
        }`}
      >
        {name}
      </i>
      {name}
    </div>
  ) : (
    <div
      className={iconClass()}
      onClick={(event) => {
        if (event.detail === 1) onClickAction()
        if (event.detail === 2) onDoubleClickAction()
      }}
    >
      <img src={require(`eos-icons/animated-svg/${name}.svg`)} alt={name} />
      {name}
    </div>
  )
}

export default Icon

import React from 'react'
import Image from 'next/image'
import { IconProps } from '../interface'
import { noOutLined } from '../utils/EosIcons.store'

const Icon: React.FC<IconProps> = ({
  name,
  size,
  onClickAction,
  onDoubleClickAction,
  type,
  active,
  iconsTheme
}) => {
  /* Possible icon sizes */
  const sizes: {
    [key: number]: string
  } = {
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
      {noOutLined.includes(name) ? (
        <i className={`eos-icons ${sizes[size]}`}>{name}</i>
      ) : (
        <i
          className={`eos-icons${
            iconsTheme === 'outlined' ? '-outlined' : ' '
          } ${sizes[size]}`}
        >
          {name}
        </i>
      )}
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
      <Image src={require(`eos-icons/animated-svg/${name}.svg`)} alt={name} />
      {name}
    </div>
  )
}

export default Icon

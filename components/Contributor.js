import React from 'react'
import Image from 'next/image'

const Contributor = (props) => {
  const { title, href, image, name } = props

  return (
    <a
      className='contributor'
      title={title}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Image
        className='contributors-img'
        src={require(`../assets/images/contributors/${image}`)}
        alt='Contributor'
      />
      <p>{name}</p>
    </a>
  )
}

export default Contributor

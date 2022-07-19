import React from 'react'
import Image from 'next/image'

export const AboutBlock = ({
  title,
  description,
  linkTo,
  linkTitle,
  image,
  reverse
}) => {
  return (
    <div className={`about-block ${reverse ? 'is-reversed' : ''}`}>
      <div className='about-block-description'>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={linkTo} target='_blank' rel='noopener noreferrer nofollow'>
          {linkTitle}
        </a>
      </div>

      <div className='about-block-image'>
        <Image src={image} alt={title} />
      </div>
    </div>
  )
}

export default AboutBlock

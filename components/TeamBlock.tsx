import React from 'react'
import Image from 'next/image'

interface socialMediaImgMap {
  [name: string]: string
}

const socialMediaImg: socialMediaImgMap = {
  twitter: require('../public/assets/images/social/twitter.svg'),
  linkedin: require('../public/assets/images/social/linkedin.svg'),
  git: require('../public/assets/images/social/git.svg'),
  dribbble: require('../public/assets/images/social/dribbble.svg'),
  behance: require('../public/assets/images/social/behance.svg'),
  medium: require('../public/assets/images/social/medium.svg')
}

interface TeamBlockProps {
  image: string
  role: string
  name: string
  description: string
  social: {
    title: string
    link: string
  }[]
}

interface ContributorsBlockProps {
  image: string
  role: string
  name: string
  social: {
    title: string
    link: string
  }[]
}

export const TeamBlock: React.FC<TeamBlockProps> = ({
  image,
  role,
  name,
  description,
  social
}) => {
  return (
    <div className='team-member'>
      <Image src={image} alt={name} layout='fill' objectFit='contain' />
      <div className='team-member-overlay'>
        <div className='team-member-overlay-content'>
          <h4>{name}</h4>
          <p>{description}</p>
          <div className='team-member-social'>
            <ul>
              {social?.map(
                (
                  ele: {
                    title: string
                    link: string
                  },
                  i: number
                ) => {
                  return (
                    <li key={i}>
                      <a
                        href={ele.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Image
                          src={socialMediaImg[ele.title]}
                          alt={ele.title}
                        />
                      </a>
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className='team-member-role'>{role}</div>
    </div>
  )
}

export const ContributorsBlock: React.FC<ContributorsBlockProps> = ({
  image,
  name,
  role,
  social
}) => {
  return (
    <div className='team-contributor'>
      <div className='team-contributor-description'>
        <span className='name'>{name}</span>
        <span className='role'>{role}</span>

        <ul>
          {social?.map((ele, i) => {
            return (
              <li key={i}>
                <a
                  href={ele.link}
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                >
                  <Image src={socialMediaImg[ele.title]} alt={ele.title} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='team-contributor-image'>
        <Image src={image} />
      </div>
    </div>
  )
}

export default TeamBlock

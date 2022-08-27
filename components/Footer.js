import React from 'react'
import links from '../utils/Links.store'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className='container flex flex-wrap'>
        <div className='container flex flex-wrap'>
          {links.map((ele, i) => {
            return <FooterBlock {...ele} key={i} />
          })}
        </div>
        <Link href={links[0].vercel.href}>
          <a className='banner' target={links[0].vercel.target}>
            <Image className='' src={links[0].vercel.img} alt='vercel-banner' />{' '}
          </a>
        </Link>
      </div>
    </footer>
  )
}

const FooterBlock = ({ img, title, links }) => {
  return (
    <div className='footer-block'>
      <span>{img ? <Image src={img} alt='EOS Logo footer' /> : title}</span>
      <div className='footer-block-list'>
        {links?.map((ele, index) => (
          <a
            key={index}
            href={ele.href}
            data-types-category={ele.category}
            data-types-label={ele.label}
            data-types-action={ele.action}
            rel='noopener noreferrer'
            target={ele.target}
          >
            {ele.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Footer

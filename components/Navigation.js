import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import eosIcon from '../public/assets/images/eos-icons-logo.svg'

const NavLink = ({ href, children, ...props }) => {
  const { asPath } = useRouter()
  const className = asPath === href || asPath === props.as ? 'active' : ''
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  )
}

const Navigation = (props) => {
  return (
    <header className='flex-wrap-sm navigation'>
      <div className='container navigation-content'>
        <Link href='/'>
          <div className='brand'>
            <Image
              className='logo'
              src={eosIcon}
              alt='eos-icons logo'
              onClick={() => {
                props.resetIconSetState()
              }}
            />
          </div>
        </Link>
        <nav className='padding-bottom-s'>
          <NavLink href='/'>
            <i className='eos-icons'>miscellaneous</i>
            Icons
          </NavLink>
          <NavLink href='/about'>
            <i className='eos-icons'>face</i>
            About Us
          </NavLink>
          <NavLink href='/docs'>
            <i className='eos-icons'>description</i>
            Docs{' '}
          </NavLink>
          <NavLink href='/team'>
            <i className='eos-icons'>group</i>
            Team{' '}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navigation

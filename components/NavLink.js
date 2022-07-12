// import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

const NavLink = ({ href, children, ...props }) => {
  // const { asPath } = useRouter();
  //  const className = asPath === props.href || asPath === props.as ? 'active' : ''
  return (
    <Link href={href}>
      <a className>{children}</a>
    </Link>
  )
}

export default NavLink

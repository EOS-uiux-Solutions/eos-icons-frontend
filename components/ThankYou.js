import React from 'react'
import bunny from '../assets/images/eos-bunny.png'
import Image from 'next/image'

const ThankYou = () => {
  return (
    <div className='container text-center'>
      <h2>Thank you for using EOS!</h2>
      <Image src={bunny} alt='EOS Bunny' style={{ width: 170 }} />
      <p>Click on the button below to start downloading.</p>
    </div>
  )
}

export default ThankYou

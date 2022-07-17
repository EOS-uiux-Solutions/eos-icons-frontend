import React from 'react'
import loading from '../public/assets/images/loading.svg'
import Image from 'next/image'

const GeneratingFont = (props) => {
  return (
    <div className='icons-picker-loading'>
      <div className='loading-icon'>
        <Image src={loading} alt='loading-icon' />
        <p>Generating font files...</p>
      </div>
    </div>
  )
}

export default GeneratingFont

import React from 'react'

const ScrollToTop = () => {
  window.scrollTo(0, 0)
}

if (typeof window !== 'undefined') {
  window.onscroll = () => {
    ;(
      document.getElementsByClassName('scroll-to-top-btn')[0] as HTMLElement
    ).style.display = window.scrollY > 800 ? 'block' : 'None'
  }
}

const ScrollToTopBtn = () => {
  return (
    <button className='scroll-to-top-btn' onClick={ScrollToTop}>
      <i className='eos-icons eos-24 '>keyboard_arrow_up</i>
    </button>
  )
}

export default ScrollToTopBtn

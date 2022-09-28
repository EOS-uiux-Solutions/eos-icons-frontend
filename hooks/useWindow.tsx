import { useState, useEffect } from 'react'

interface windowsSize {
  width: number
  height: number
  isScrolled: boolean
  isMobile: boolean | undefined
  isScrooledAndMobile?: boolean
}

export const useWindowsSize = () => {
  const [state, setState] = useState<windowsSize>({
    width: 0,
    height: 0,
    isScrolled: false,
    isMobile: undefined
  })

  function handleWindows() {
    return setState({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 770,
      isScrolled: window.scrollY !== 0,
      isScrooledAndMobile: window.innerWidth <= 770 && window.scrollY > 1
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('resize', handleWindows)
    window.addEventListener('scroll', handleWindows)

    return () => {
      window.removeEventListener('resize', handleWindows)
      window.removeEventListener('handleScroll', handleWindows)
    }
  }, [])

  return [state]
}

export default useWindowsSize

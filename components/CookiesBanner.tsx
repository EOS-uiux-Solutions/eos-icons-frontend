import React, { useState, useEffect } from 'react'
import { AppContext } from '../utils/AppContext'
import Link from 'next/link'
import Button from './Button'
import Cookies from 'js-cookie'

const CookiesBanner = () => {
  const [cookiesBanner, setCookiesBanner] = useState<boolean>(false)

  /* Toggle customizable functionality */
  const cookiesHandler = () => {
    setCookiesBanner(true)
  }

  useEffect(() => {
    const acceptanceStatus = Cookies.get('acceptance-remainder')
    if (acceptanceStatus) {
      setCookiesBanner(true)
    }
  }, [cookiesBanner])

  return (
    <AppContext.Consumer>
      {({ state, dispatch }) => (
        <>
          <div
            className={cookiesBanner ? 'cookies-alert hide' : 'cookies-alert'}
          >
            <div className='cookies-alert-body'>
              <p>
                EOS Icons uses cookies to help us learn more about how we can
                improve our product.
                <br />
                <Link href='/cookies-policy'>
                  Learn more about our cookie policy
                </Link>
              </p>
            </div>
            <div className='cookies-alert-buttons'>
              <Link
                className='btn btn-default btn-inverted'
                href='/cookies-policy'
              >
                Edit preferences
              </Link>
              <Button
                onClick={() => {
                  cookiesHandler()
                  dispatch({
                    type: 'TOGGLE_CUSTOMIZE_COOKIES'
                  })
                }}
                primary
                customClass='js-cookies-accept'
              >
                Accept
              </Button>
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  )
}

export default CookiesBanner

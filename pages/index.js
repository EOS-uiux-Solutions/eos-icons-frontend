import React, { useState } from 'react'
import IconsSet from '../modules/IconsSet'

const Home = (props) => {
  const [header, setHeader] = useState(true)
  const manageHeader = () => {
    setHeader(!header)
  }

  return (
    <div>
      <IconsSet action={manageHeader} container={props.container} />
    </div>
  )
}

export default Home

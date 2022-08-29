import React from 'react'
import HowTo from './HowToPanel'

const ShowHowToUse = ({
  tab,
  showPanel,
  iconSelected,
  closeHowTo,
  setSearchValue,
  theme
}) => {
  return tab === 'Static Icons' ? (
    <div>
      <HowTo
        show={showPanel}
        iconName={iconSelected?.name}
        iconTags={iconSelected?.tags}
        type='static'
        theme={theme}
        close={closeHowTo}
        setSearchValue={setSearchValue}
      />
    </div>
  ) : (
    <HowTo
      show={showPanel}
      iconName={iconSelected?.name}
      iconTags=''
      type='animated'
      close={closeHowTo}
      setSearchValue={setSearchValue}
    />
  )
}

export default ShowHowToUse

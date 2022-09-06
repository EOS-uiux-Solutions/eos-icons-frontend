import React from 'react'
import HowTo from './HowToPanel'
import { ShowHowToUseProps } from '../interface'

const ShowHowToUse: React.FC<ShowHowToUseProps> = ({
  tab,
  showPanel,
  iconSelected,
  closeHowTo
}) => {
  return tab === 'Static Icons' ? (
    <div>
      <HowTo
        show={showPanel}
        iconName={iconSelected?.name}
        iconTags={iconSelected?.tags}
        type='static'
        close={closeHowTo}
      />
    </div>
  ) : (
    <HowTo
      show={showPanel}
      iconName={iconSelected?.name}
      iconTags={[]}
      type='animated'
      close={closeHowTo}
    />
  )
}

export default ShowHowToUse

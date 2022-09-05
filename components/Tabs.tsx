import React, { useState, useEffect, useContext, useCallback } from 'react'
import useWindow from '../hooks/useWindow'
import Toggle from './Toggle'
import { AppContext } from '../utils/AppContext'
import IconVersionToggle from './IconVersionToggle'
import SHOW_THEME_SWITCH from '../config.json'

interface TabsProps {
  children: JSX.Element[]
  setTab?: (tab: string) => void
  customize?: boolean
  showPanel?: (tab: string) => void
  toggleCustomize?: (callback: Function) => void
  showMultipleSwitch: boolean
  currentTab: string
  tabChangeHandler?: () => void
}

const Tabs: React.FC<TabsProps> = ({
  children,
  setTab,
  customize,
  showPanel,
  toggleCustomize,
  showMultipleSwitch,
  currentTab,
  tabChangeHandler
}) => {
  const [activeTab, setActiveTab] = useState(currentTab)
  const [checked, setChecked] = useState(false)
  const [staticCheck, setStaticCheck] = useState(false)
  const [position, setPosition] = useState(0)
  const [windowsSize] = useWindow()
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    setActiveTab(currentTab)
  }, [currentTab])

  useEffect(() => {
    setPosition(document.querySelector('.page-header')!.clientHeight + 54)
  }, [customize, showPanel, windowsSize])

  useEffect(() => {
    if (tabChangeHandler) tabChangeHandler()
    if (activeTab === 'Static Icons') {
      setChecked(staticCheck)
    } else {
      setChecked(false)
    }
  }, [activeTab, staticCheck, tabChangeHandler])

  const changeCheckedStatus = useCallback(() => {
    if (activeTab === currentTab) {
      setStaticCheck(!checked)
    }
    setChecked(!checked)
  }, [activeTab, checked, currentTab])

  return (
    <div className='tabs'>
      <ul className='tab-list' style={{ top: position }}>
        {children!.map((child) => {
          const { htmlFor } = child.props
          return (
            <li
              className={
                activeTab === htmlFor
                  ? 'tab-list-item tab-list-active'
                  : 'tab-list-item'
              }
              key={htmlFor}
              onClick={() => {
                setActiveTab(htmlFor)
                setTab && setTab(htmlFor)
              }}
            >
              {htmlFor}
            </li>
          )
        })}

        {!windowsSize.isMobile && showMultipleSwitch ? (
          <div className='icons-control-toggle'>
            {activeTab === 'Static Icons' && SHOW_THEME_SWITCH ? (
              <IconVersionToggle />
            ) : (
              <div style={{ visibility: 'hidden' }}>
                <IconVersionToggle />
              </div>
            )}

            <Toggle
              disabledStatus={activeTab === 'Animated Icons'}
              name='Select multiple'
              id='js-icon-picker'
              checkedStatus={checked}
              onChange={() => {
                changeCheckedStatus()
              }}
              onClick={() => {
                toggleCustomize?.(dispatch({ type: 'TOGGLE_CUSTOMIZE' }))
              }}
            />
          </div>
        ) : (
          ' '
        )}
      </ul>

      <div className='tab-content'>
        {children!.map((child) => {
          if (child.props.htmlFor !== activeTab) return undefined
          return child.props.children
        })}
      </div>
    </div>
  )
}

export default Tabs

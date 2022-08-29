import React, { useEffect, useContext, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import { useRouter } from 'next/router'
import { AppContext } from '../utils/AppContext'
import { IconSetContext } from '../utils/IconSetContext'
import { iconSetState } from '../utils/IconSet.store'

/* Components */
import Icon from '../components/IconDisplay'
import Tabs from '../components/Tabs'
import CustomizeIconsPanel from '../components/CustomizeIconsPanel'
import ShowHowToUse from '../components/ShowHowToUse'
import PageHeader from '../components/PageHeader'
import { CategorySelector } from '../components/CategorySelector'
import { useWindowsSize } from '../hooks/useWindow'
import IconEditor from '../components/IconEditor'

const IconsSet = (props) => {
  const router = useRouter()
  const [size] = useWindowsSize()
  const { state, dispatch } = useContext(AppContext)
  const { iconState, iconDispatch } = useContext(IconSetContext)
  const searchRef = useRef(null)

  useEffect(() => {
    if (!router.isReady) return
    iconDispatch({ type: 'POPULATE_STATE_WITH_URL_PARAMS', router })
  }, [router.isReady])

  useEffect(() => {
    iconDispatch({ type: 'SET_SUGGESTED_STRING' })
  }, [iconState.emptySearchResult, iconState.tab, iconState.searchValue])

  useEffect(() => {
    if (!router.isReady) return
    iconDispatch({
      type: 'RESET_STATE_ON_EMPTY_SEARCH_VALUE',
      dispatch,
      router
    })
  }, [router.isReady, iconState.searchValue])

  return (
    <>
      <PageHeader showHeaderIcon={true}>
        <div className='icons-control'>
          <label htmlFor='search-input-id' className='search-input-label'>
            Search:
          </label>
          <div className='icons-control-search'>
            <i
              className={`eos-icons ${
                iconState.searchValue.length ? 'cursor-pointer' : ''
              }`}
              onClick={() => {
                if (iconState.searchValue.length > 0) {
                  searchRef.current.value = ''
                  iconDispatch({ type: 'SET_TAG_SELECTED', payload: '' })
                  iconDispatch({ type: 'CLOSE_HOWTO', router })
                }
              }}
            >
              {iconState.searchValue === '' ? 'search' : 'close'}
            </i>
            <input
              id='search-input-id'
              value={iconState.searchValue}
              placeholder='Search'
              ref={searchRef}
              className='search-input'
              type='text'
              name='search'
              onKeyDown={(event) =>
                iconDispatch({ type: 'HANDLE_KEYPRESS', event })
              }
              onChange={(event) => {
                if (event) {
                  iconDispatch({
                    type: 'SET_SEARCH_VALUE',
                    payload: event.target.value
                  })
                }

                if (event.target.value === '') {
                  iconDispatch({ type: 'CLOSE_HOWTO', router })
                }

                const count = iconSetState.getSearchResults(
                  event.target.value,
                  iconState.tab
                )

                iconDispatch({
                  type: 'SET_EMPTY_SEARCH_RESULT',
                  payload: count === 0
                })

                dispatch({
                  type:
                    iconState.tab === 'Static Icons'
                      ? 'TOGGLE_SEARCH_REGULAR_ICONS'
                      : 'TOGGLE_SEARCH_ANIMATED_ICONS',
                  search: event.target.value
                })
              }}
            />
            {!size?.isMobile ? (
              <CategorySelector disabled={iconState.tab === 'Animated Icons'} />
            ) : (
              ' '
            )}
          </div>

          <div className='icons-control-dynamic'>
            {size?.isMobile ? (
              <CategorySelector disabled={iconState.tab === 'Animated Icons'} />
            ) : (
              ' '
            )}
          </div>
        </div>
        <div className='icon-information'>
          {iconState.tab === 'Static Icons' ? (
            !state.customize ? (
              <div>
                <ShowHowToUse
                  tab={iconState.tab}
                  showPanel={iconState.showPanel}
                  iconSelected={iconState.iconSelected}
                  closeHowTo={() =>
                    iconDispatch({ type: 'CLOSE_HOWTO', router })
                  }
                  theme={state.iconsTheme}
                />
              </div>
            ) : (
              <div className='how-to-use-block'>
                <CustomizeIconsPanel
                  selectAll={() =>
                    dispatch({
                      type: 'ADD_ALL_ICONS',
                      search: iconState.searchValue
                    })
                  }
                  deselectAll={() => {
                    dispatch({ type: 'REMOVE_ALL_ICONS' })
                    iconDispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
                    window.history.replaceState(
                      '',
                      'EOS Icons',
                      `${window.location.pathname}`
                    )
                  }}
                />
              </div>
            )
          ) : (
            <div>
              <ShowHowToUse
                tab={iconState.tab}
                showPanel={iconState.showPanel}
                iconSelected={iconState.iconSelected}
                closeHowTo={() => iconDispatch({ type: 'CLOSE_HOWTO', router })}
                setSearchValue={() =>
                  iconDispatch({
                    type: 'SET_SEARCH_VALUE',
                    payload: ''
                  })
                }
                theme={state.iconsTheme}
              />
            </div>
          )}
        </div>
      </PageHeader>
      <div className='container no-padding'>
        <Tabs
          setTab={(e) => iconDispatch({ type: 'TAB_SWITCH', e, router })}
          customize={state.customize}
          showPanel={iconState.showPanel}
          currentTab={iconState.tab}
          toggleCustomize={(callback) => {
            iconDispatch({ type: 'TOGGLE_CUSTOMIZE', router })
            return callback
          }}
          showMultipleSwitch={true}
        >
          <div label='Static Icons'>
            {iconState.emptySearchResult && (
              <div>
                <h3 className='suggested-search-line'>
                  Did you mean{' '}
                  <span
                    className='suggested-search'
                    onClick={() =>
                      iconDispatch({
                        type: 'SEARCH_SUGGESTION',
                        dispatch,
                        router
                      })
                    }
                  >
                    {iconState.suggestedString}
                  </span>{' '}
                  ?
                </h3>
                <Image
                  className='icons-search'
                  src={require('../public/assets/images/no.jpg')}
                  height='400px'
                  alt='Sorry, no icons were found'
                />
              </div>
            )}
            {state.iconsCategory.map((categoryObject, index) => {
              return categoryObject.icons.length > 0 ? (
                <div key={index}>
                  <h4 className='category'>{categoryObject.category}</h4>
                  <div className='icons-list'>
                    {categoryObject.icons.map((icon, i) => (
                      <Icon
                        size={36}
                        active={iconSetState.isActive(
                          icon.name,
                          state,
                          iconState.iconSelected
                        )}
                        key={icon.name}
                        name={icon.name}
                        iconsTheme={state.iconsTheme}
                        type={'static'}
                        onClickAction={() => {
                          iconDispatch({
                            type: 'SELECT_ICON',
                            icon,
                            router
                          })
                          return dispatch({
                            type: state.customize ? 'ADD_MULTIPLE_ICONS' : '',
                            selection: icon.name
                          })
                        }}
                        onDoubleClickAction={() => {
                          iconDispatch({ type: 'TOGGLE_ICONEDITOR' })
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                ''
              )
            })}
          </div>
          <div label='Animated Icons'>
            {iconState.searchValue !== '' && iconState.emptySearchResult && (
              <div>
                <h3 className='suggested-search-line'>
                  Did you mean{' '}
                  <span
                    className='suggested-search'
                    onClick={() =>
                      iconDispatch({
                        type: 'SEARCH_SUGGESTION',
                        dispatch,
                        router
                      })
                    }
                  >
                    {iconState.suggestedString}
                  </span>{' '}
                  ?
                </h3>
                <Image
                  className='icons-search'
                  src={require('../public/assets/images/no.jpg')}
                  height='400px'
                  alt='Sorry, no icons were found'
                />
              </div>
            )}
            <div className='icons-list'>
              {state.animatedIcons.map((icon, index) => (
                <Icon
                  key={index}
                  name={icon}
                  type={'animated'}
                  active={icon === iconState.iconSelected?.name}
                  onClickAction={() => {
                    iconDispatch({ type: 'SELECT_ANIMATED_ICON', icon, router })
                  }}
                  onDoubleClickAction={() =>
                    iconDispatch({
                      type: 'TOGGLE_ICONEDITOR'
                    })
                  }
                />
              ))}
            </div>
          </div>
        </Tabs>
        {iconState.iconEditor && (
          <IconEditor
            isActive={iconState.iconEditor}
            show={() =>
              iconDispatch({
                type: 'TOGGLE_ICONEDITOR'
              })
            }
            iconNames={[iconState.iconSelected?.name]}
            iconType={iconState.tab === 'Static Icons' ? 'static' : 'animated'}
            theme={state.iconsTheme}
          />
        )}
      </div>
    </>
  )
}

export default IconsSet

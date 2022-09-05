import React, { useState, useEffect, useContext, useRef } from 'react'
import { AppContext } from '../utils/AppContext'
import { IconSetContext } from '../utils/IconSetContext'
import Button from './Button'
import IconEditor from './IconEditor'
import toast, { Toaster } from 'react-hot-toast'

interface HowToPanelProps {
  show: boolean
  close: () => void
  iconName: string
  type: 'static' | 'animated'
  iconTags: string[]
}

const HowToPanel: React.FC<HowToPanelProps> = ({
  show,
  close,
  iconName,
  type,
  iconTags
}) => {
  const { iconDispatch } = useContext(IconSetContext)
  const ref = useRef<HTMLDivElement>(null)
  const [iconEditor, setIconEditor] = useState(false)
  const [iconType, setIconType] = useState('static')

  const iconEditorToggle = (type: 'animated' | 'static') => {
    setIconType(type)
    setIconEditor(!iconEditor)
  }

  const { state, dispatch } = useContext(AppContext)
  function useOnClickOrEsc(
    ref: React.RefObject<HTMLDivElement>,
    handler: (e: KeyboardEvent) => void
  ) {
    useEffect(() => {
      const listenerKeydown = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
          handler(event)
        }
      }

      document.addEventListener('keydown', listenerKeydown)

      return () => {
        document.removeEventListener('keydown', listenerKeydown)
      }
    }, [ref, handler])
  }

  useOnClickOrEsc(ref, () => close())
  let queryString
  if (typeof window !== 'undefined') {
    queryString = window.location.search
  }
  const urlParams: URLSearchParams = new URLSearchParams(queryString)
  const urlIconName: string | null = urlParams.get('iconName')
  const urlTagName: string | null = urlParams.get('tagName')

  let setSearchWithUrlParam: string | null =
    urlIconName && !iconName ? urlIconName : ''

  if (setSearchWithUrlParam === '') {
    setSearchWithUrlParam = urlTagName
  }

  const selectTag = (urlTagName: string, callback: () => void) => {
    if (typeof window !== 'undefined') {
      window.history.replaceState(
        '',
        'EOS Icons',
        `${window.location.pathname}?tagName=${urlTagName}`
      )
    }
    return callback
  }
  const setTagInSearch = () => {
    return dispatch({
      type: 'TOGGLE_SEARCH_REGULAR_ICONS',
      search: urlTagName
    })
  }

  useEffect(() => {
    if (urlTagName != null) {
      setTagInSearch()
    }
  }, [urlTagName])

  return show ? (
    <div ref={ref} className='how-to-use-block'>
      <div className='container'>
        <span>How to use it:</span>

        <i className='close-button eos-icons eos-18' onClick={() => close()}>
          close
        </i>

        {type === 'animated' ? (
          <div className='how-to-use-block-left'>
            <div className='input-group'>
              <div className='input-group-information'>
                <input
                  id='copy-code'
                  className='input-group-element'
                  readOnly={true}
                  value={`<Image src='${iconName}.svg'/>`}
                />
                <Button
                  type='button'
                  onClick={() => {
                    const element = document.getElementById(
                      'copy-code'
                    ) as HTMLInputElement
                    element.select()
                    document.execCommand('copy')
                  }}
                >
                  <i className='eos-icons eos-18'>content_copy</i>
                </Button>
              </div>
              <Button
                primary
                type='button'
                onClick={() => iconEditorToggle('animated')}
              >
                <i className='eos-icons eos-18'>edit</i> Edit & Download Icon
              </Button>
            </div>
          </div>
        ) : (
          <div className='how-to-use-block-left'>
            <div className='input-group'>
              <div className='input-group-information'>
                <input
                  id='copy-code'
                  className='input-group-element'
                  readOnly={true}
                  value={
                    state.iconsTheme === 'filled'
                      ? `<i class='eos-icons'>${iconName}</i>`
                      : `<i class='eos-icons-outlined'>${iconName}</i>`
                  }
                />
                <Button
                  type='button'
                  onClick={() => {
                    const element = document.getElementById(
                      'copy-code'
                    ) as HTMLInputElement
                    element.select()
                    document.execCommand('copy')
                    toast('HTML Tag Copied')
                  }}
                >
                  <i className='eos-icons eos-18'>content_copy</i>
                </Button>
                <Toaster />
              </div>
              <Button
                primary
                type='button'
                onClick={() => iconEditorToggle('static')}
              >
                <i className='eos-icons eos-18'>edit</i> Edit & Download Icon
              </Button>
            </div>
            <div>
              <strong>Tags:</strong>
              {iconTags?.map((tag, key) => (
                <span
                  key={key}
                  className='badge'
                  onClick={() => {
                    iconDispatch({ type: 'SET_SEARCH_VALUE', payload: tag })
                    selectTag(
                      tag,
                      dispatch({
                        type: 'TOGGLE_ICON_TAGS',
                        selection: tag
                      })
                    )
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <small>{tag}</small>
                </span>
              ))}
            </div>
          </div>
        )}
        {iconEditor ? (
          <IconEditor
            isActive={iconEditor}
            show={iconEditorToggle as () => void}
            iconNames={[iconName]}
            iconType={iconType}
            theme={state.iconsTheme}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default HowToPanel

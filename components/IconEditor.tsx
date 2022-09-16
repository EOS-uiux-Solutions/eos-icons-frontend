import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  MouseEventHandler
} from 'react'
import { SketchPicker } from 'react-color'
import Button from './Button'
import axios, { AxiosResponse } from 'axios'
import loading from '../public/assets/images/loading-white.svg'
import { AppContext } from '../utils/AppContext'
/* https://www.npmjs.com/package/react-svg the package to work with SVG's */
import { ReactSVG } from 'react-svg'
import ICON_PICKER_API_URL from '../config.json'
import Image from 'next/image'
import { IconEditorProps } from '../interface'

const IconEditor: React.FC<IconEditorProps> = ({
  isActive,
  show,
  iconNames,
  iconType
}) => {
  const apiBaseUrl = ICON_PICKER_API_URL

  const [currentPosition, setCurrentPosition] = useState(0)
  const [exportAs, setExportAs] = useState('svg')
  const [exportSize, setExportSize] = useState('512')
  const [color, setColor] = useState('#000000')
  const [rotateAngle, setRotateAngle] = useState(0)
  const [horizontalFlip, setHorizontalFlip] = useState(false)
  const [verticalFlip, setVerticalFlip] = useState(false)
  const [generating, setGenerate] = useState(false)
  const [svgCode, setSvgCode] = useState([])
  const [svgError, setSvgError] = useState(true)
  const { state } = useContext(AppContext)

  const iconEditorRef = useRef<HTMLDivElement>()

  const exportSizes = [
    '18',
    '24',
    '32',
    '48',
    '64',
    '128',
    '256',
    '512',
    '1024'
  ]
  const exportTypes = ['svg']
  if (iconType !== 'animated') exportTypes.push('png')
  const changeColor = (color: { hex: string }) => {
    setColor(color.hex)
  }

  const rotateIcon = (angle: number) => {
    angle += rotateAngle
    setRotateAngle(angle)
  }

  // const changeExportType = () => {
  //   setExportAs(document.getElementsByClassName('export-type')[0].value)
  // }
  const changeExportSize = () => {
    setExportSize(
      (document.getElementsByClassName('export-size')[0] as HTMLInputElement)
        .value
    )
  }
  const flipIconHorizontal = (e: React.MouseEvent) => {
    e.preventDefault()
    setHorizontalFlip(!horizontalFlip)
  }

  const flipIconVertical = (e: React.MouseEvent) => {
    e.preventDefault()
    setVerticalFlip(!verticalFlip)
  }

  const changePosition = (action: number) => {
    if (currentPosition === iconNames.length - 1 && action === 1)
      setCurrentPosition(0)
    else if (currentPosition === 0 && action === -1)
      setCurrentPosition(iconNames.length - 1)
    else setCurrentPosition(currentPosition + action)
  }
  useEffect(() => {
    ;(
      document.getElementsByClassName('icon-preview')[0] as HTMLInputElement
    ).style.color = color
    try {
      document
        .getElementsByClassName('icon-preview')[0]
        .getElementsByTagName('i')[0].style.transform = `scaleX(${
        horizontalFlip ? -1 : 1
      }) scaleY(${verticalFlip ? -1 : 1}) rotate(${rotateAngle}deg)`
    } catch (error) {
      // animated icons
      document
        .getElementsByClassName('icon-preview')[0]
        .getElementsByTagName('div')[0].style.transform = `scaleX(${
        horizontalFlip ? -1 : 1
      }) scaleY(${verticalFlip ? -1 : 1}) rotate(${rotateAngle}deg)`
    }
  }, [
    rotateAngle,
    color,
    horizontalFlip,
    verticalFlip,
    iconNames,
    apiBaseUrl,
    currentPosition
  ])

  useEffect(() => {
    const svgUrl = `${apiBaseUrl}/icon/svg/svgcode${
      state.iconsTheme === 'outlined' ? '?theme=outlined' : ''
    }`

    const fetchSvg = async (Url: string, iconArray: string[]) => {
      const payload = {
        iconArray,
        customizationConfig: {
          colorCode: color,
          rotateAngle,
          flip: { horizontal: horizontalFlip, vertical: verticalFlip }
        }
      }
      await axios
        .post(Url, payload)
        .then((req) => {
          setSvgError(false)
          setSvgCode(req.data.responseObject)
        })
        .catch(() => {
          setSvgError(true)
        })
    }
    fetchSvg(svgUrl, iconNames)
  }, [
    apiBaseUrl,
    color,
    horizontalFlip,
    iconNames,
    rotateAngle,
    state.iconsTheme,
    verticalFlip
  ])

  const postDataToApi = async (params: { url: string; payload: {} }) => {
    const { url, payload } = params

    const response = await axios.post(url, payload)
    return response.data
  }
  const downloadCustomizedIcon = (props: { timestamp: AxiosResponse }) => {
    const { timestamp } = props
    const downloadEndPoints = `${apiBaseUrl}/download?ts=${timestamp}`
    if (iconNames.length === 1) {
      return window.open(
        `${apiBaseUrl}/icon-download?ts=${timestamp}&type=${exportAs}&iconName=${iconNames[0]}`,
        '_blank'
      )
    }
    return window.open(downloadEndPoints, '_blank')
  }
  const generateCustomizedIcon = (e: React.MouseEvent) => {
    if (!generating) {
      e.preventDefault()
      setGenerate(true)
      postDataToApi({
        url: `${apiBaseUrl}/icon-customization${
          state.iconsTheme === 'outlined' ? '?theme=outlined' : ''
        }`,
        payload: {
          icons: iconNames,
          exportAs,
          exportSize,
          customizationConfig: {
            colorCode: color,
            rotateAngle,
            flip: { horizontal: horizontalFlip, vertical: verticalFlip }
          }
        }
      }).then((res) => {
        setGenerate(false)
        downloadCustomizedIcon({ timestamp: res })
      })
    }
  }

  return isActive ? (
    <div className='icon-editor'>
      <div
        className='icon-editor-card'
        ref={iconEditorRef as React.RefObject<HTMLDivElement>}
      >
        <div
          className='close'
          onClick={show as MouseEventHandler<HTMLDivElement>}
        />
        <h2>Customize Icon</h2>
        <div className='flex flex-row icon-editor-content'>
          <div>
            <p>Color Picker</p>
            <SketchPicker
              className='color-picker'
              color={color}
              disableAlpha={true}
              onChange={changeColor}
            />
            <br />
            {!svgError && (
              <div>
                <p>SVG Code:</p>
                <div className='input-group'>
                  <div className='input-group-information'>
                    <input
                      id='copy-svg'
                      className='input-group-element'
                      readOnly={true}
                      value={`${svgCode[currentPosition]}`}
                      disabled={!svgCode.length}
                    />
                    <Button
                      type='button'
                      disabled={!svgCode.length}
                      onClick={() => {
                        ;(
                          document.getElementById(
                            'copy-svg'
                          ) as HTMLInputElement
                        ).select()
                        document.execCommand('copy')
                      }}
                    >
                      <i className='eos-icons eos-18'>content_copy</i>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='icon-div'>
            <p>
              Icon Preview{' '}
              {iconNames.length > 1
                ? `: ${currentPosition + 1} of ${iconNames.length}`
                : ''}
            </p>
            <div className='icon-preview-box'>
              {iconNames.length > 1 ? (
                <div onClick={() => changePosition(-1)}>
                  <i className='eos-icons nxt-icon-btn'>keyboard_arrow_left</i>
                </div>
              ) : (
                ''
              )}
              <div className='icon-preview'>
                {iconType === 'animated' ? (
                  <>
                    <ReactSVG
                      src={require(`eos-icons/animated-svg/${iconNames[currentPosition]}.svg`)}
                      beforeInjection={(svg) => {
                        svg.setAttribute('fill', color)
                      }}
                    />
                  </>
                ) : (
                  <i
                    className={`eos-icons${
                      state.iconsTheme === 'outlined' ? '-outlined' : ''
                    }`}
                  >
                    {iconNames[currentPosition]}
                  </i>
                )}
              </div>
              {iconNames.length > 1 ? (
                <div onClick={() => changePosition(1)}>
                  <i className='eos-icons nxt-icon-btn'>keyboard_arrow_right</i>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='transform-div'>
              <div>
                <p>Rotate</p>
                <div>
                  <button onClick={() => rotateIcon(-90)}>
                    <i className='eos-icons'>rotate_left</i>
                  </button>
                  <button onClick={() => rotateIcon(90)}>
                    <i className='eos-icons'>rotate_right</i>
                  </button>
                </div>
              </div>
              <div>
                <p>Flip</p>
                <div>
                  <button onClick={flipIconHorizontal}>
                    <i className='eos-icons'>flip</i>
                  </button>
                  <button onClick={flipIconVertical}>
                    <i className='eos-icons rotate-flip-icon'>flip</i>
                  </button>
                </div>
              </div>
            </div>
            <div className='type-selector'>
              {exportTypes.map((type, key) => (
                <div key={key} className='type-selector-option'>
                  <input
                    type='radio'
                    name={type}
                    value={type}
                    checked={type === exportAs}
                    onChange={() => {
                      setExportAs(type)
                    }}
                  />

                  <label htmlFor={type}>{type.toUpperCase()}</label>
                </div>
              ))}
            </div>
            {exportAs === 'png' ? (
              <div className='size-selector'>
                <label htmlFor='size-select'>Select Size</label>
                <div className='dropdown'>
                  <select
                    name='size-select'
                    defaultValue={exportSize}
                    className='export-size'
                    onChange={changeExportSize}
                  >
                    {exportSizes.map((size, key) => (
                      <option key={key} value={`${size}`}>
                        {`${size}`} x {`${size}`} px
                      </option>
                    ))}
                  </select>
                  <i className='eos-icons'>keyboard_arrow_down</i>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className='export-btn'>
              <Button type='button' onClick={generateCustomizedIcon}>
                {!generating ? (
                  <span>Export as {exportAs.toUpperCase()}</span>
                ) : (
                  <span>
                    Exporting Icon{' '}
                    <Image
                      className='btn-loading-icon'
                      src={loading}
                      alt='loading-icon'
                    />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default IconEditor

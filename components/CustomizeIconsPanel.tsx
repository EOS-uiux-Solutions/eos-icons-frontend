import React, { useState, useContext } from 'react'
import Button from './Button'
import GeneratingFont from './GeneratingFont'
import Modal from './Modal'
import ThankYou from './ThankYou'
import IconEditor from './IconEditor'
import axios, { AxiosResponse } from 'axios'
import { AppContext } from '../utils/AppContext'
import ICON_PICKER_API_URL from '../config.json'
import { CustomizeIconsPanelProps } from '../interface'

const sendData = async (params: { url: string; payload: string }) => {
  const { url, payload } = params

  const response = await axios.post(url, {
    exportAs: 'font',
    icons: payload
  })

  return response.data
}

const downloadFont = (props: { timestamp: AxiosResponse | undefined }) => {
  const { timestamp } = props
  const downloadEndPoints = `${ICON_PICKER_API_URL}/download?ts=${timestamp}`
  return window.open(downloadEndPoints, '_blank')
}

const CustomizeIconsPanel: React.FC<CustomizeIconsPanelProps> = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const [iconEditor, setIconEditor] = useState(false)

  const iconEditorToggle = (e: MouseEvent) => {
    e.preventDefault()
    if (state.multipleIcons.length > 0) setIconEditor(!iconEditor)
    else window.alert('Please select atleast one icon')
  }

  const { selectAll, deselectAll } = props

  const [modal, setModal] = useState(false)
  const [serverResponse, setServerResponse] = useState()

  const modalToggle = () => {
    setModal(!modal)
  }

  const generateFont = (e: MouseEvent) => {
    if (state.multipleIcons.length > 0) {
      e.preventDefault()
      modalToggle()
      sendData({
        url: `${ICON_PICKER_API_URL}/iconsapi${
          state.iconsTheme === 'outlined' ? '?theme=outlined' : ''
        }`,
        payload: state.multipleIcons
      }).then(setServerResponse)
    } else {
      window.alert('Please select atleast one icon')
    }
  }

  return (
    <>
      <div className='icons-picker-footer'>
        <div>
          <div className='select-all-icons' onClick={selectAll}>
            Select all <i className='eos-icons'>select_all</i>
          </div>
          <div className='deselect-all-icons' onClick={deselectAll}>
            Deselect all <i className='eos-icons'>clear_all</i>
          </div>
        </div>
        <div className='generate-div'>
          <span>{state.multipleIcons.length} icons selected</span>
          <span>Export as: </span>
          <Button type='submit' onClick={generateFont as () => void}>
            Font
          </Button>
          <Button type='button' onClick={iconEditorToggle as () => void}>
            Images
          </Button>
        </div>

        <div>
          <div className='icons-picker-footer-upload'>
            <p>Continue building your font </p>
            <label className='btn btn-default' htmlFor='upload-file'>
              Upload JSON
            </label>
            <input
              type='file'
              id='upload-file'
              accept='application/JSON'
              hidden
              name='file'
              onChange={(event) => search(event.target.files![0], dispatch)}
            />
          </div>
        </div>
      </div>
      {iconEditor ? (
        <IconEditor
          isActive={iconEditor}
          show={iconEditorToggle as () => void}
          iconNames={state.multipleIcons}
        />
      ) : (
        ''
      )}
      {modal ? (
        <Modal
          showButtons={serverResponse !== null}
          okText='Download'
          onOk={() => downloadFont({ timestamp: serverResponse })}
          onCancel={modalToggle}
          isActive={modal}
          show={modalToggle}
        >
          {serverResponse === null ? <GeneratingFont /> : <ThankYou />}
        </Modal>
      ) : (
        ''
      )}
    </>
  )
}

const search = (file: File, dispatch: React.Dispatch<any>) => {
  const fileReader = new window.FileReader()

  fileReader.onload = function (fileData) {
    const iconsArray = JSON.parse(fileData.target!.result as string)
    let data = []
    try {
      // works for both versions for now
      if (Object.prototype.hasOwnProperty.call(iconsArray, 'icons'))
        data = iconsArray.icons
      if (Object.prototype.hasOwnProperty.call(iconsArray, 'extended_icons'))
        data = iconsArray.extended_icons
      return dispatch({
        type: 'UPLOAD_PREVIOUS_SELECTION',
        data
      })
    } catch (error) {
      alert('JSON file seems to be incorrect')
    }
  }
  return fileReader.readAsText(file)
}

export default CustomizeIconsPanel

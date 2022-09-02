import eosIcons from 'eos-icons/dist/js/eos-icons.json'
import animatedIcons from './AnimatedIcons.store'
import Cookies from 'js-cookie'

const staticIcons = eosIcons.filter((ele) => ele.type === 'static')

const categories = Array.from(
  new Set(
    staticIcons.map((ele) => {
      if (typeof ele.category === 'string') return ele.category
      if (typeof ele.category === 'object') return ele.category[0]

      return true
    })
  )
).sort()

const iconsCategory = categories.map((category) => {
  return {
    category,
    icons: staticIcons
      .map((ele) =>
        ele.category === category || ele.category[0] === category ? ele : null
      )
      .filter((ele) => ele !== null)
  }
})

function searchMutliple(element, searchArray) {
  for (let i = 0; i < searchArray.length; i++) {
    if (element.includes(searchArray[i])) return true
  }
  return false
}

/* EOS Icons state */
export const eosIconsState = {
  animatedIcons,
  icons: staticIcons,
  iconsCategory,
  iconsCategoryList: iconsCategory.map((ele) => ele.category),
  multipleIcons: [],
  customize: false,
  iconsTheme: 'filled',
  cookiesToggle: false,
  setMultipleIcons: (iconName, multipleIcons) => {
    const iconArray = multipleIcons.includes(iconName)
      ? multipleIcons.filter((i) => i !== iconName)
      : [...multipleIcons, iconName]
    return iconArray
  },
  toggleCustomize: (customize, multipleIcons) => {
    /* Clear arrays when switching between customize */
    multipleIcons.splice(0, multipleIcons.length)
    return !customize
  },
  selectAllTagsIcons: (tagName, iconsCategory) => {
    if (tagName === 'all') return iconsCategory

    tagName = tagName.toLowerCase()
    return iconsCategory.map((ele) => {
      return {
        category: ele.category,
        icons: ele.icons.filter((ele) => ele.tags.includes(tagName))
      }
    })
  },
  toggleCookies: (cookiesToggle) => {
    Cookies.set('acceptance-remainder', 'true')

    const acceptanceStatus = Cookies.get('acceptance')
    if (acceptanceStatus) {
      Cookies.remove('cookies-preference')
      Cookies.remove('acceptance')
    } else {
      Cookies.set('acceptance', 'true', { expires: 60 })
      Cookies.set('cookies-preference', 'true')
    }
    return !cookiesToggle
  },
  selectAllIcons: (search, icons, multipleIcons) => {
    multipleIcons.splice(0, multipleIcons.length)
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].name.includes(search) || icons[i].tags.includes(search))
        multipleIcons.push(icons[i].name)
    }
    return multipleIcons
  },
  deselectAllIcons: (multipleIcons) => {
    multipleIcons.splice(0, multipleIcons.length)
    return multipleIcons
  },
  setSearchRegularList: (value) => {
    if (value === '' || value === undefined) {
      return iconsCategory.map((ele) => {
        return {
          category: ele.category,
          icons: ele.icons
        }
      })
    }

    let keywordsArray

    if (value.includes(';')) {
      keywordsArray = value.split(';')
      value = keywordsArray.join(',')
    }
    if (value.includes('-')) {
      keywordsArray = value.split('-')
      value = keywordsArray.join(',')
    }
    if (value.includes(' ')) {
      keywordsArray = value.split(' ')
      value = keywordsArray.join(',')
    }
    keywordsArray = value.split(',')

    const searchArray = []

    for (let i = 0; i < keywordsArray.length; i++) {
      keywordsArray[i] = keywordsArray[i].trim()
      if (keywordsArray[i] !== '')
        searchArray.push(keywordsArray[i].toLowerCase())
    }

    return iconsCategory.map((ele) => {
      return {
        category: ele.category,
        icons: ele.icons.filter(
          (ele) =>
            searchMutliple(ele.name, searchArray) ||
            searchMutliple(ele.tags, searchArray)
        )
      }
    })
  },
  setSearchAnimatedList: (value, animatedIcons) => {
    return animatedIcons.filter(
      (animatedIcon) =>
        animatedIcon.includes(value.toLowerCase()) && animatedIcon
    )
  },
  uploadPreviousSelection: (value, multipleIcons) => {
    try {
      value.forEach((value) => {
        return !multipleIcons.includes(value) ? multipleIcons.push(value) : ''
      })
    } catch (error) {
      alert("JSON file doesn't seem to be right")
    }
    return multipleIcons
  },
  setCategoryFilter: (value) => {
    return value === 'all'
      ? iconsCategory
      : iconsCategory.filter((ele) => ele.category === value)
  }
}

export const iconsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MULTIPLE_ICONS':
      return {
        ...state,
        multipleIcons: eosIconsState.setMultipleIcons(
          action.selection,
          state.multipleIcons
        )
      }
    case 'TOGGLE_ICON_TAGS':
      return {
        ...state,
        iconsCategory: eosIconsState.selectAllTagsIcons(
          action.selection,
          state.iconsCategory
        )
      }
    case 'TOGGLE_CUSTOMIZE':
      return {
        ...state,
        customize: eosIconsState.toggleCustomize(
          state.customize,
          state.multipleIcons
        )
      }
    case 'RESET_CUSTOMIZE':
      return {
        ...state,
        customize: false
      }
    case 'ADD_ALL_ICONS':
      return {
        ...state,
        multipleIcons: eosIconsState.selectAllIcons(
          action.search,
          state.icons,
          state.multipleIcons
        )
      }
    case 'REMOVE_ALL_ICONS':
      return {
        ...state,
        multipleIcons: eosIconsState.deselectAllIcons(state.multipleIcons)
      }
    case 'TOGGLE_SEARCH_REGULAR_ICONS':
      return {
        ...state,
        iconsCategory: eosIconsState.setSearchRegularList(action.search)
      }
    case 'TOGGLE_SEARCH_ANIMATED_ICONS':
      return {
        ...state,
        animatedIcons: eosIconsState.setSearchAnimatedList(
          action.search,
          state.animatedIcons
        )
      }
    case 'UPLOAD_PREVIOUS_SELECTION':
      return {
        ...state,
        multipleIcons: eosIconsState.uploadPreviousSelection(
          action.data,
          state.multipleIcons
        )
      }
    case 'TOGGLE_CUSTOMIZE_COOKIES':
      return {
        ...state,
        cookiesToggle: eosIconsState.toggleCookies(state.cookiesToggle)
      }
    case 'SET_CATEGORY_SELECTOR':
      return {
        ...state,
        iconsCategory: eosIconsState.setCategoryFilter(action.category)
      }
    case 'SET_ICONS_THEME':
      return {
        ...state,
        iconsTheme: (eosIconsState.iconsTheme = action.action)
      }
    default:
      return { ...state }
  }
}

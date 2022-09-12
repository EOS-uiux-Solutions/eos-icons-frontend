import eosIcons from 'eos-icons/dist/js/eos-icons.json'
import animatedIcons from './AnimatedIcons.store'
import Cookies from 'js-cookie'
import {
  IconType,
  Category,
  eosIconsStateType,
  eosIconsActionType
} from '../interface'

const staticIcons: IconType[] = eosIcons.filter((ele) => ele.type === 'static')

const categories: (string | true)[] = Array.from(
  new Set(
    staticIcons.map((ele) => {
      if (typeof ele.category === 'string') return ele.category
      if (typeof ele.category === 'object') return ele.category[0]

      return true
    })
  )
).sort()

const iconsCategory: Category[] = categories.map((category) => {
  return {
    category,
    icons: staticIcons
      .map((ele) =>
        ele.category === category || ele.category[0] === category ? ele : null
      )
      .filter((ele) => ele !== null)
  }
})

function searchMutliple(element: string[], searchArray: string[]) {
  for (let i = 0; i < searchArray.length; i++) {
    if (element.includes(searchArray[i])) return true
  }
  return false
}

/* EOS Icons state */
export const eosIconsState: eosIconsStateType = {
  animatedIcons,
  icons: staticIcons,
  iconsCategory,
  iconsCategoryList: iconsCategory.map((ele) => ele.category),
  multipleIcons: [],
  customize: false,
  iconsTheme: 'filled',
  cookiesToggle: false
}

const eosIconsHelper = {
  setMultipleIcons: (iconName: string, multipleIcons: string[]) => {
    const iconArray = multipleIcons.includes(iconName)
      ? multipleIcons.filter((i) => i !== iconName)
      : [...multipleIcons, iconName]
    return iconArray
  },
  toggleCustomize: (customize: boolean, multipleIcons: string[]) => {
    /* Clear arrays when switching between customize */
    multipleIcons.splice(0, multipleIcons.length)
    return !customize
  },
  selectAllTagsIcons: (tagName: string, iconsCategory: Category[]) => {
    if (tagName === 'all') return iconsCategory
    tagName = tagName.toLowerCase()
    return iconsCategory.map((ele) => {
      return {
        category: ele.category,
        icons: ele.icons.filter((ele) => ele!.tags.includes(tagName))
      }
    })
  },
  toggleCookies: (cookiesToggle: boolean) => {
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
  selectAllIcons: (
    search: string,
    icons: IconType[],
    multipleIcons: string[]
  ) => {
    multipleIcons.splice(0, multipleIcons.length)
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].name.includes(search) || icons[i].tags.includes(search))
        multipleIcons.push(icons[i].name)
    }
    return multipleIcons
  },
  deselectAllIcons: (multipleIcons: string[]) => {
    multipleIcons.splice(0, multipleIcons.length)
    return multipleIcons
  },
  setSearchRegularList: (value: string) => {
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

    const searchArray: string[] = []

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
            searchMutliple([ele!.name], searchArray) ||
            searchMutliple(ele!.tags, searchArray)
        )
      }
    })
  },
  setSearchAnimatedList: (value: string, animatedIcons: string[]) => {
    return animatedIcons.filter(
      (animatedIcon) =>
        animatedIcon.includes(value.toLowerCase()) && animatedIcon
    )
  },
  uploadPreviousSelection: (value: string[], multipleIcons: string[]) => {
    try {
      value.forEach((value) => {
        return !multipleIcons.includes(value) ? multipleIcons.push(value) : ''
      })
    } catch (error) {
      alert("JSON file doesn't seem to be right")
    }
    return multipleIcons
  },
  setCategoryFilter: (value: string) => {
    return value === 'all'
      ? iconsCategory
      : iconsCategory.filter((ele) => ele.category === value)
  }
}

export const iconsReducer = (
  state: eosIconsStateType,
  action: eosIconsActionType
) => {
  switch (action.type) {
    case 'ADD_MULTIPLE_ICONS':
      return {
        ...state,
        multipleIcons: eosIconsHelper.setMultipleIcons(
          action.selection,
          state.multipleIcons
        )
      }
    case 'TOGGLE_ICON_TAGS':
      return {
        ...state,
        iconsCategory: eosIconsHelper.selectAllTagsIcons(
          action.selection,
          state.iconsCategory
        )
      }
    case 'TOGGLE_CUSTOMIZE':
      return {
        ...state,
        customize: eosIconsHelper.toggleCustomize(
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
        multipleIcons: eosIconsHelper.selectAllIcons(
          action.search,
          state.icons,
          state.multipleIcons
        )
      }
    case 'REMOVE_ALL_ICONS':
      return {
        ...state,
        multipleIcons: eosIconsHelper.deselectAllIcons(state.multipleIcons)
      }
    case 'TOGGLE_SEARCH_REGULAR_ICONS':
      return {
        ...state,
        iconsCategory: eosIconsHelper.setSearchRegularList(action.search)
      }
    case 'TOGGLE_SEARCH_ANIMATED_ICONS':
      return {
        ...state,
        animatedIcons: eosIconsHelper.setSearchAnimatedList(
          action.search,
          state.animatedIcons
        )
      }
    case 'UPLOAD_PREVIOUS_SELECTION':
      return {
        ...state,
        multipleIcons: eosIconsHelper.uploadPreviousSelection(
          action.data,
          state.multipleIcons
        )
      }
    case 'TOGGLE_CUSTOMIZE_COOKIES':
      return {
        ...state,
        cookiesToggle: eosIconsHelper.toggleCookies(state.cookiesToggle)
      }
    case 'SET_CATEGORY_SELECTOR':
      return {
        ...state,
        iconsCategory: eosIconsHelper.setCategoryFilter(action.category)
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

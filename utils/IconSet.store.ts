import { eosIconsState } from './EosIcons.store'
import type { Router } from 'next/router'
import {
  eosIconsStateType,
  IconType,
  SelectedIconType,
  iconSetStateType,
  iconSetActionType
} from '../interface'
import React from 'react'

export const iconSetState: iconSetStateType = {
  iconSelected: { name: '', tags: [] },
  showPanel: false,
  searchValue: '',
  tab: 'Static Icons',
  staticHistory: '',
  animatedHistory: '',
  selectMultiple: true,
  emptySearchResult: false,
  suggestedString: '',
  iconEditor: false,
  userSearchInput: false,
  tagSelected: ''
}

export const iconSetHelper = {
  iconEditorToggle: (iconEditor: boolean) => {
    return !iconEditor
  },

  handleKeyPress: (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      return true
    }
  },

  resetIconSetState: () => {
    return {
      iconSelected: { name: '', tags: [] },
      showPanel: false,
      searchValue: '',
      tab: 'Static Icons',
      staticHistory: '',
      animatedHistory: '',
      selectMultiple: true,
      emptySearchResult: false,
      suggestedString: '',
      iconEditor: false,
      userSearchInput: false,
      tagSelected: ''
    }
  },

  setSuggestedString: (
    emptySearchResult: boolean,
    tab: string,
    searchValue: string
  ) => {
    if (emptySearchResult && searchValue) {
      let minimum = 100
      let suggestedString
      if (tab === 'Static Icons') {
        for (let i = 0; i < eosIconsState.iconsCategory.length; i++) {
          for (
            let j = 0;
            j < eosIconsState.iconsCategory[i].icons.length;
            j++
          ) {
            const currentDistance = iconSetHelper.editDistance(
              searchValue,
              eosIconsState.iconsCategory[i].icons[j]?.name || ''
            )
            if (currentDistance < minimum) {
              minimum = currentDistance
              suggestedString =
                eosIconsState.iconsCategory[i].icons[j]?.name || ''
            }
          }
        }
        return suggestedString
      } else {
        let minimum = 100
        let suggestedString
        for (let i = 0; i < eosIconsState.animatedIcons.length; i++) {
          const currentDistance = iconSetHelper.editDistance(
            searchValue,
            eosIconsState.animatedIcons[i]
          )
          if (currentDistance < minimum) {
            minimum = currentDistance
            suggestedString = eosIconsState.animatedIcons[i]
          }
        }
        return suggestedString
      }
    }
  },

  resetOnEmptySearchValue: (
    searchValue: string,
    dispatch: React.Dispatch<any>,
    tab: string,
    router: Router
  ) => {
    if (searchValue === '' || searchValue === null) {
      dispatch({
        type:
          tab === 'Static Icons'
            ? 'TOGGLE_SEARCH_REGULAR_ICONS'
            : 'TOGGLE_SEARCH_ANIMATED_ICONS',
        search: ''
      })
      iconSetHelper.closeHowTo(router)
      return { userSearchInput: false, emptySearchResult: false }
    }
  },

  editDistance: (string1: string, string2: string) => {
    if (string2.length > string1.length) {
      string2 = string2.slice(0, string1.length)
    }
    const m = string1.length
    const n = string2.length
    const dp = new Array(m + 1)

    for (let i = 0; i <= m; i++) {
      dp[i] = new Array(n + 1)
    }

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) dp[i][j] = j
        else if (j === 0) dp[i][j] = i
        else if (string1[i - 1] === string2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
        else
          dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])
      }
    }
    return dp[m][n]
  },

  setTagInSearch: (router: Router, dispatch: React.Dispatch<any>) => {
    const urlTagName = router.query.tagName
    return dispatch({
      type: 'TOGGLE_SEARCH_REGULAR_ICONS',
      search: urlTagName
    })
  },

  closeHowTo: (router: Router) => {
    router.push('/', undefined, { scroll: false })
    return {
      searchValue: '',
      showPanel: false,
      iconSelected: { name: '', tags: [] }
    }
  },

  suggestionSearch: (
    suggestedString: string,
    tab: string,
    dispatch: React.Dispatch<any>,
    router: Router
  ) => {
    dispatch({
      type:
        tab === 'Static Icons'
          ? 'TOGGLE_SEARCH_REGULAR_ICONS'
          : 'TOGGLE_SEARCH_ANIMATED_ICONS',
      search: suggestedString
    })
    return {
      emptySearchResult: false,
      ...iconSetHelper.closeHowTo(router),
      searchValue: suggestedString
    }
  },

  isActive: (
    current: string,
    appState: eosIconsStateType,
    iconSelected: SelectedIconType
  ) => {
    if (appState.customize) {
      return appState.multipleIcons.indexOf(current) >= 0
    } else {
      return current === iconSelected.name
    }
  },

  populateStateWithURLParams: (router: Router, searchValue: string) => {
    const tagName = router.query.tagName
    const iconName = router.query.iconName
    const tabType = router.query.type

    if (tagName) {
      return {
        searchValue: tagName || searchValue
      }
    }
    if (iconName && tabType) {
      const iconDetails =
        tabType === 'static'
          ? eosIconsState.icons.filter((icon) => icon.name === iconName)
          : eosIconsState.animatedIcons
              .filter((icon) => icon === iconName)
              .map((icon) => {
                return {
                  icon: iconName,
                  tags: []
                }
              })

      if (iconDetails.length) {
        const iconObj = { name: iconName, tags: iconDetails[0].tags }
        return {
          showPanel: true,
          iconSelected: iconObj,
          searchValue: iconObj.name,
          tab: tabType === 'static' ? 'Static Icons' : 'Animated Icons'
        }
      }
    }
    router.push('/')
  },

  selectIcon: (
    icon: IconType,
    iconSelected: SelectedIconType,
    selectMultiple: boolean,
    router: Router
  ) => {
    if (selectMultiple) {
      const iconObj = { name: icon.name, tags: icon.tags }
      const setIconSelected =
        JSON.stringify(iconObj) === JSON.stringify(iconSelected)
      setIconSelected
        ? router.push('/', undefined, { scroll: false })
        : router.push(
            {
              query: { iconName: icon.name, type: 'static' }
            },
            undefined,
            { scroll: false }
          )
      return {
        showPanel: !setIconSelected,
        iconSelected: setIconSelected ? '' : iconObj,
        searchValue: setIconSelected ? '' : iconObj.name
      }
    }
  },

  selectAnimatedIcon: (
    icon: string,
    iconSelected: SelectedIconType,
    searchValue: string,
    selectMultiple: boolean,
    router: Router
  ) => {
    if (selectMultiple) {
      router.push({
        query: { iconName: icon, type: 'animated' }
      })
    }
    return {
      iconSelected:
        JSON.stringify({ name: icon, tags: [] }) ===
        JSON.stringify(iconSelected)
          ? { name: '', tags: [] }
          : { name: icon, tags: [] },
      showPanel:
        JSON.stringify({ name: icon, tags: [] }) !==
        JSON.stringify(iconSelected),
      searchValue: icon === searchValue ? '' : icon
    }
  },

  toggleCustomize: (selectMultiple: boolean, router: Router) => {
    router.push('/')
    return {
      showPanel: false,
      searchValue: '',
      selectMultiple: !selectMultiple,
      iconSelected: { name: '', tags: [] }
    }
  },

  tabSwitch: (
    e: string,
    tab: string,
    iconSelected: SelectedIconType,
    staticHistory: string,
    animatedHistory: string,
    searchValue: string,
    router: Router
  ) => {
    if (e !== tab) {
      if (e === 'Static Icons') {
        if (staticHistory === '') {
          const storeSearchValue = searchValue
          return {
            tab: e,
            animatedHistory: iconSelected,
            ...iconSetHelper.closeHowTo(router),
            searchValue: storeSearchValue
          }
        } else {
          return {
            tab: e,
            animatedHistory: iconSelected,
            iconsSelected: staticHistory,
            showPanel: true
          }
        }
      } else {
        if (animatedHistory === '') {
          const storeSearchValue = searchValue
          return {
            tab: e,
            staticHistory: iconSelected,
            ...iconSetHelper.closeHowTo(router),
            searchValue: storeSearchValue
          }
        } else {
          return {
            tab: e,
            staticHistory: iconSelected,
            iconsSelected: animatedHistory,
            showPanel: true
          }
        }
      }
    }
    return { iconsSelected: iconSelected }
  },

  getWords: (values: string) => {
    if (values === undefined) return
    let keywordsArray = []
    if (values.includes(';')) {
      keywordsArray = values.split(';')
      values = keywordsArray.join(',')
    }
    if (values.includes('-')) {
      keywordsArray = values.split('-')
      values = keywordsArray.join(',')
    }
    if (values.includes(' ')) {
      keywordsArray = values.split(' ')
      values = keywordsArray.join(',')
    }
    keywordsArray = values.split(',')
    return keywordsArray
  },

  getSearchResults: (value: string, tab: string) => {
    const words = iconSetHelper.getWords(value)
    if (tab === 'Static Icons') {
      let count = 0
      for (let k = 0; k < (words?.length || 0); k++) {
        if (words![k].length === 0) {
          continue
        }
        for (let i = 0; i < eosIconsState.iconsCategory.length; i++) {
          for (
            let j = 0;
            j < eosIconsState.iconsCategory[i].icons.length;
            j++
          ) {
            const icon = eosIconsState.iconsCategory[i].icons[j]
            if (
              icon?.name.includes(words![k].toLowerCase()) ||
              icon?.tags.includes(words![k].toLowerCase())
            ) {
              count += 1
            }
          }
        }
      }
      return count
    } else {
      let count = 0
      for (let i = 0; i < eosIconsState.animatedIcons.length; i++) {
        if (eosIconsState.animatedIcons[i].includes(value)) {
          count += 1
        }
      }
      return count
    }
  }
}

export const iconSetReducer = (
  state: iconSetStateType,
  action: iconSetActionType
) => {
  switch (action.type) {
    case 'TOGGLE_ICONEDITOR':
      return {
        ...state,
        iconEditor: iconSetHelper.iconEditorToggle(state.iconEditor)
      } as iconSetStateType
    case 'HANDLE_KEYPRESS':
      return {
        ...state,
        uerSearchInput: iconSetHelper.handleKeyPress(action.event)
      } as iconSetStateType
    case 'CLOSE_HOWTO':
      return {
        ...state,
        ...iconSetHelper.closeHowTo(action.router)
      } as iconSetStateType
    case 'SEARCH_SUGGESTION':
      return {
        ...state,
        ...iconSetHelper.suggestionSearch(
          state.suggestedString,
          state.tab,
          action.dispatch,
          action.router
        )
      } as iconSetStateType
    case 'SELECT_ICON':
      return {
        ...state,
        ...iconSetHelper.selectIcon(
          action.icon,
          state.iconSelected,
          state.selectMultiple,
          action.router
        )
      } as iconSetStateType
    case 'TAB_SWITCH':
      return {
        ...state,
        ...iconSetHelper.tabSwitch(
          action.e,
          state.tab,
          state.iconSelected,
          state.staticHistory,
          state.animatedHistory,
          state.searchValue,
          action.router
        )
      } as iconSetStateType
    case 'TOGGLE_CUSTOMIZE':
      return {
        ...state,
        ...iconSetHelper.toggleCustomize(state.selectMultiple, action.router)
      } as iconSetStateType
    case 'SELECT_ANIMATED_ICON':
      return {
        ...state,
        ...iconSetHelper.selectAnimatedIcon(
          action.iconAnimated,
          state.iconSelected,
          state.searchValue,
          state.selectMultiple,
          action.router
        )
      } as iconSetStateType
    case 'RESET_TO_DEFAULT':
      return {
        ...state,
        ...iconSetHelper.resetIconSetState()
      } as iconSetStateType
    case 'SET_SUGGESTED_STRING':
      return {
        ...state,
        suggestedString: iconSetHelper.setSuggestedString(
          state.emptySearchResult,
          state.tab,
          state.searchValue
        )
      } as iconSetStateType
    case 'RESET_STATE_ON_EMPTY_SEARCH_VALUE':
      return {
        ...state,
        ...iconSetHelper.resetOnEmptySearchValue(
          state.searchValue,
          action.dispatch,
          state.tab,
          action.router
        )
      } as iconSetStateType
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload ? action.payload : state.searchValue
      } as iconSetStateType
    case 'SET_TAG_SELECTED':
      return {
        ...state,
        tagSelected: action.payload ? action.payload : state.tagSelected
      } as iconSetStateType
    case 'SET_EMPTY_SEARCH_RESULT':
      return {
        ...state,
        emptySearchResult: action.payload
          ? action.payload
          : state.emptySearchResult
      } as iconSetStateType
    case 'POPULATE_STATE_WITH_URL_PARAMS':
      return {
        ...state,
        ...iconSetHelper.populateStateWithURLParams(
          action.router,
          state.searchValue
        )
      } as iconSetStateType

    default:
      return { ...state }
  }
}

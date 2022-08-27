import { eosIconsState } from '../utils/EosIcons.store'

export const iconSetState = {
  iconSelected: '',
  showPanel: '',
  searchValue: '',
  tab: 'Static Icons',
  staticHistory: '',
  animatedHistory: '',
  selectMultiple: true,
  emptySearchResult: false,
  suggestedString: '',
  iconEditor: false,
  userSearchInput: false,
  tagSelected: '',

  iconEditorToggle: (iconEditor) => {
    return !iconEditor
  },

  handleKeyPress: (event) => {
    if (event.key === 'Enter') {
      return true
    }
  },

  resetIconSetState: () => {
    return {
      iconSelected: '',
      showPanel: '',
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

  setSuggestedString: (emptySearchResult, tab, searchValue) => {
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
            const currentDistance = iconSetState.editDistance(
              searchValue,
              eosIconsState.iconsCategory[i].icons[j].name
            )
            if (currentDistance < minimum) {
              minimum = currentDistance
              suggestedString = eosIconsState.iconsCategory[i].icons[j].name
            }
          }
        }
        return suggestedString
      } else {
        let minimum = 100
        let suggestedString
        for (let i = 0; i < eosIconsState.animatedIcons.length; i++) {
          const currentDistance = iconSetState.editDistance(
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

  resetOnEmptySearchValue: (searchValue, dispatch, tab, router) => {
    if (searchValue === '' || searchValue === null) {
      dispatch({
        type:
          tab === 'Static Icons'
            ? 'TOGGLE_SEARCH_REGULAR_ICONS'
            : 'TOGGLE_SEARCH_ANIMATED_ICONS',
        search: ''
      })
      iconSetState.closeHowTo(router)
      return { userSearchInput: false, emptySearchResult: false }
    }
  },

  editDistance: (string1, string2) => {
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

  setTagInSearch: (router, dispatch) => {
    const urlTagName = router.query.tagName
    return dispatch({
      type: 'TOGGLE_SEARCH_REGULAR_ICONS',
      search: urlTagName
    })
  },

  closeHowTo: (router) => {
    router.push('/', undefined, { scroll: false })
    return {
      searchValue: '',
      showPanel: false,
      iconSelected: ''
    }
  },

  suggestionSearch: (suggestedString, tab, dispatch, router) => {
    dispatch({
      type:
        tab === 'Static Icons'
          ? 'TOGGLE_SEARCH_REGULAR_ICONS'
          : 'TOGGLE_SEARCH_ANIMATED_ICONS',
      search: suggestedString
    })
    return {
      emptySearchResult: false,
      searchValue: suggestedString,
      ...iconSetState.closeHowTo(router)
    }
  },

  isActive: (current, appState, iconSelected) => {
    if (appState.customize) {
      return appState.multipleIcons.indexOf(current) >= 0
    } else {
      return current === iconSelected.name
    }
  },

  populateStateWithURLParams: (router, searchValue) => {
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
          : eosIconsState.animatedIcons.filter((icon) => icon === iconName)

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

  selectIcon: (icon, iconSelected, selectMultiple, router) => {
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
    icon,
    iconSelected,
    searchValue,
    selectMultiple,
    router
  ) => {
    if (selectMultiple) {
      router.push({
        query: { iconName: icon, type: 'animated' }
      })
    }
    return {
      iconSelected: { name: icon } === iconSelected ? '' : { name: icon },
      showPanel: { name: icon } !== iconSelected,
      searchValue: icon === searchValue ? '' : icon
    }
  },

  toggleCustomize: (selectMultiple, router) => {
    router.push('/')
    return {
      showPanel: false,
      searchValue: '',
      sconSelected: '',
      selectMultiple: !selectMultiple,
      iconSelected: ''
    }
  },

  tabSwitch: (
    e,
    tab,
    iconSelected,
    staticHistory,
    animatedHistory,
    searchValue,
    router
  ) => {
    if (e !== tab) {
      if (e === 'Static Icons') {
        if (staticHistory === '') {
          const storeSearchValue = searchValue
          return {
            tab: e,
            animatedHistory: iconSelected,
            searchValue: storeSearchValue,
            ...iconSetState.closeHowTo(router)
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
            searchValue: storeSearchValue,
            ...iconSetState.closeHowTo(router)
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

  getWords: (values) => {
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

  getSearchResults: (value, tab) => {
    const words = iconSetState.getWords(value)
    if (tab === 'Static Icons') {
      let count = 0
      for (let k = 0; k < words.length; k++) {
        if (words[k].length === 0) {
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
              icon.name.includes(words[k].toLowerCase()) ||
              icon.tags.includes(words[k].toLowerCase())
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

export const iconSetReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ICONEDITOR':
      return {
        ...state,
        iconEditor: iconSetState.iconEditorToggle(state.iconEditor)
      }
    case 'HANDLE_KEYPRESS':
      return {
        ...state,
        uerSearchInput: iconSetState.handleKeyPress(action.event)
      }
    case 'CLOSE_HOWTO':
      return {
        ...state,

        ...iconSetState.closeHowTo(action.router)
      }
    case 'SEARCH_SUGGESTION':
      return {
        ...state,
        ...iconSetState.suggestionSearch(
          state.suggestedString,
          state.tab,
          action.dispatch,
          action.router
        )
      }
    case 'SELECT_ICON':
      return {
        ...state,
        ...iconSetState.selectIcon(
          action.icon,
          state.iconSelected,
          state.selectMultiple,
          action.router
        )
      }
    case 'TAB_SWITCH':
      return {
        ...state,
        ...iconSetState.tabSwitch(
          action.e,
          state.tab,
          state.iconSelected,
          state.staticHistory,
          state.animatedHistory,
          state.searchValue,
          action.router
        )
      }
    case 'TOGGLE_CUSTOMIZE':
      return {
        ...state,
        ...iconSetState.toggleCustomize(state.selectMultiple, action.router)
      }
    case 'SELECT_ANIMATED_ICON':
      return {
        ...state,
        ...iconSetState.selectAnimatedIcon(
          action.icon,
          state.iconSelected,
          state.searchValue,
          state.selectMultiple,
          action.router
        )
      }
    case 'RESET_TO_DEFAULT':
      return {
        ...state,
        ...iconSetState.resetIconSetState()
      }
    case 'SET_SUGGESTED_STRING':
      return {
        ...state,
        suggestedString: iconSetState.setSuggestedString(
          state.emptySearchResult,
          state.tab,
          state.searchValue
        )
      }
    case 'RESET_STATE_ON_EMPTY_SEARCH_VALUE':
      return {
        ...state,
        ...iconSetState.resetOnEmptySearchValue(
          state.searchValue,
          action.dispatch,
          state.tab,
          action.router,
          state.emptySearchResult,
          state.userSearchInput
        )
      }
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload ? action.payload : state.searchValue
      }
    case 'SET_TAG_SELECTED':
      return {
        ...state,
        tagSelected: action.payload ? action.payload : state.tagSelected
      }
    case 'SET_EMPTY_SEARCH_RESULT':
      return {
        ...state,
        emptySearchResult: action.payload
          ? action.payload
          : state.emptySearchResult
      }
    case 'POPULATE_STATE_WITH_URL_PARAMS':
      return {
        ...state,
        ...iconSetState.populateStateWithURLParams(
          action.router,
          state.searchValue
        )
      }

    default:
      return { ...state }
  }
}

import type { Router } from 'next/router'
import React from 'react'
export interface AboutBlockProps {
  title: string
  description: string
  linkTo: string
  linkTitle: string
  image: string
  reverse?: boolean
}

export interface ButtonProps {
  children: React.ReactNode
  onClick: ((e: React.MouseEvent) => void) | (() => void)
  primary?: boolean
  type?: 'button' | 'submit' | 'reset'
  customClass?: string
  disabled?: boolean
}

export interface CategorySelectorProps {
  disabled: boolean
}

export interface CustomizeIconsPanelProps {
  selectAll: () => void
  deselectAll: () => void
}

interface link {
  name: string
  href: string
  category: string
  action: string
  label: string
  target?: string
}

export interface FooterBlockProps {
  img?: any
  title: string
  links: link[]
}

export interface HowToPanelProps {
  show: boolean
  close: () => void
  iconName: string
  type: 'static' | 'animated'
  iconTags: string[]
}

export interface IconProps {
  name: string
  size: number
  onClickAction: () => void
  onDoubleClickAction: () => void
  type: 'static' | 'animated'
  active: boolean
  iconsTheme?: string
}

export interface IconEditorProps {
  isActive: boolean
  show:
    | ((type: 'animated' | 'static') => void)
    | ((e: React.MouseEvent) => void)
    | (() => void)
  iconNames: string[]
  iconType?: string
  theme?: string
}

export interface IconType {
  category: string | string[]
  date: string
  do: string
  dont: string
  name: string
  tags: string[]
  type: string
  dateOutlined?: string
  hasOutlined?: boolean
  label?: string
  fileName?: string
}

export interface Category {
  category: string | true
  icons: (IconType | null)[]
}

export interface eosIconsStateType {
  animatedIcons: string[]
  icons: IconType[]
  iconsCategory: Category[]
  iconsCategoryList: (string | true)[]
  multipleIcons: string[]
  customize: boolean
  iconsTheme: string
  cookiesToggle: boolean
}

export interface ModalProps {
  isActive: boolean
  show: () => void
  children: React.ReactNode
  cancelText?: string
  okText?: string
  onCancel?: () => void
  onOk?: () => void
  showButtons?: boolean
}

export interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export interface PageHeaderProps {
  children?: React.ReactNode
  simple?: boolean
  showHeaderIcon?: boolean
}

export interface SelectedIconType {
  name: string
  tags: string[]
}

export interface iconSetStateType {
  iconSelected: SelectedIconType
  showPanel: boolean
  searchValue: string
  tab: string
  staticHistory: string
  animatedHistory: string
  selectMultiple: boolean
  emptySearchResult: boolean
  suggestedString: string
  iconEditor: boolean
  userSearchInput: boolean
  tagSelected: string
}

export interface ShowHowToUseProps {
  tab: string
  showPanel: boolean
  iconSelected: SelectedIconType
  closeHowTo: () => void
}

export interface iconSetActionType {
  type: string
  event: React.KeyboardEvent
  router: Router
  dispatch: React.Dispatch<any>
  icon: IconType
  iconAnimated: string
  e: string
  payload: string
}

export interface TabsProps {
  children: React.ReactElement[]
  setTab?: (tab: string) => void
  customize?: boolean
  showPanel?: boolean
  toggleCustomize?: Function
  showMultipleSwitch: boolean
  currentTab: string
  tabChangeHandler?: () => void
}

export interface TeamBlockProps {
  image: string
  role: string
  name: string
  description: string
  social: {
    title: string
    link: string
  }[]
}

export interface ContributorsBlockProps {
  image: string
  role: string
  name: string
  social: {
    title: string
    link: string
  }[]
}

export interface ToggleProps {
  onClick: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  id: string
  checkedStatus: boolean
  disabledStatus: boolean
}

export interface APIPostPayload {
  icons: string[]
  exportAs: string
  exportSize: string
  customizationConfig: {
    colorCode: string
    rotateAngle: number
    flip: { horizontal: boolean; vertical: boolean }
  }
}

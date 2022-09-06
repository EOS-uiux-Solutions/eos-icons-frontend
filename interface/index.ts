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
  onClick: () => void
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
  iconsTheme?: 'outlined' | 'filled'
}

export interface IconEditorProps {
  isActive: boolean
  show: () => void
  iconNames: string[]
  iconType?: string
  theme?: string
}

export interface IconType {
  category: string[]
  date: string
  dateOutlined?: string
  do: string
  dont: string
  hasOutlined?: boolean
  name: string
  tags: string[]
  type: string
}

export interface Category {
  category: string
  icons: IconType[]
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

export interface ShowHowToUseProps {
  tab: string
  showPanel: boolean
  iconSelected: { name: string; tags: string[] }
  closeHowTo: () => void
}

export interface TabsProps {
  children: JSX.Element[]
  setTab?: (tab: string) => void
  customize?: boolean
  showPanel?: (tab: string) => void
  toggleCustomize?: (callback: Function) => void
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
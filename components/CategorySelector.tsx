import React, { useContext } from 'react'
import { AppContext } from '../utils/AppContext'
import { CategorySelectorProps } from '../interface'

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  disabled
}) => {
  const { state, dispatch } = useContext(AppContext)

  return (
    <div className={`category-filter ${disabled ? 'disabled' : ''}`}>
      <label htmlFor='category'>Categories: </label>

      <select
        className={`custom-select ${disabled ? 'disabled' : ''}`}
        name='pets'
        id='category'
        onChange={(e) => {
          dispatch({ type: 'SET_CATEGORY_SELECTOR', category: e.target.value })
        }}
        disabled={disabled}
      >
        <option value='all'>All</option>

        {state.iconsCategoryList.map((ele: string | true, i: number) => {
          return (
            <option
              key={i}
              value={ele as string | number | readonly string[] | undefined}
            >
              {ele}
            </option>
          )
        })}
      </select>
    </div>
  )
}

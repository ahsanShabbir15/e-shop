import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toggleDarkMode } from '../redux/themeSlice'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state)=>state.theme.darkMode)
  return (
    <div className="p-4">
  <button
    onClick={() => dispatch(toggleDarkMode())}
    className="px-4 py-2 bg-black text-white dark:bg-blue-500 dark:text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
  >
    Switch to {darkMode ? 'light' : 'dark'} Mode
  </button>
</div>
  )
}

export default ThemeToggle

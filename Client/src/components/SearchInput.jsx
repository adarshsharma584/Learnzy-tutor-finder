import React from 'react'

function SearchInput() {
  return (
    <div className="w-[60vw] rounded-xl shadow-xl h-14 my-10 mx-auto border-1 border-zinc-200 ">
        <label className="input w-full h-16 flex items-center bg-white text-black/200 rounded-2xl shadow-xl">
    <svg className="h-[1em] text-black opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input type="search" className="grow w-full text-lg text-black" placeholder="Search" />
    <kbd className="kbd kbd-sm">⌘</kbd>
    <kbd className="kbd kbd-sm">K</kbd>
  </label></div>
  )
}

export default SearchInput
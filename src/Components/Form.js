import React from 'react'
import LogoImage from './LogoImage.png'

const form = () => {
  return (
    <div className="bg-white rounded-md shadow-xl justify-center w-50 h-70">
        <div className='justify-center w-40 h-40 shadow-sm'><img src={LogoImage} alt="Logo" /></div>
        <form>
            <label>First Name</label>
            <placeholder>Enter Your Name</placeholder>
            <label>Last Name</label>
            <placeholder>Enter Your Last Name</placeholder>
            <button className='bg-blue-700 hover:bg-slate-400 px-2 py-4 rounded md '>Filled ?</button>
        </form>
    </div>
  )
}

export default form
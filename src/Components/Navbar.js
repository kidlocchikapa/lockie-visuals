import React from 'react'
import LogoImage from './LogoImage.png';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
        <nav className='flex justify-between items-center max-container'>
            <ul>
                < a href="/">
                    <img src={LogoImage}  
                    alt="Logo"
                    width={130}
                    height={29}
                    />
                </a>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>

                </ul>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
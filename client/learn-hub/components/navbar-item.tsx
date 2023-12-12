"use client";

import React from 'react';

interface NavbarItemProp {
    label: string;
    active?: boolean; 
}

const NavbarItem : React.FC<NavbarItemProp> = ({label, active}) => {
    return (
        <div className={active ? 'text-black cursor-default' : 'text-gray-500 hover:text-gray-300 cursor-pointer transition'}>
        {label}
        </div>
    )
}

export default NavbarItem;
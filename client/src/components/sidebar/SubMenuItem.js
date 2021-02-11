import React from 'react';

const SubMenuItem = (props) => {
    return (
        <li className={`submenu-item ${props.active ? 'active' : ''}`}>
            <a href='#'>
                <i className={`${props.icon} menu-icon`} ></i>
                <span className='menu-text' >{props.text}</span>
            </a>
        </li>
    );
};

export default SubMenuItem;

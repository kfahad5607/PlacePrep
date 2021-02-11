import React from 'react';

const SubMenuList = (props) => {
    return (
        <div className='submenu-list'>
            <ul  >
                {props.subMenuElem.map((ele, index) =>
                    <li className={`submenu-item ${props.active ? 'active' : ''}`} onClick={props.subMenuItemClick} >
                        <a href='#'>
                            <i className={`${ele.icon} menu-icon`} ></i>
                            <span className='menu-text' >{ele.name}</span>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default SubMenuList;

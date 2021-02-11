import React from 'react';
import SubMenuList from './SubMenuList';

const MenuItem = (props) => {

    {
        return props.element.subMenuItems.length ?
            (<div>
                <li className={`menu-item ${props.selected ? 'active' : ''}`} onClick={props.menuItemClick} >
                    <a href='#'>
                        <i className={`${props.element.icon} menu-icon`} ></i>
                        <span className='menu-text' >{props.element.name}</span>
                    </a>
                </li>
                { props.selected && <SubMenuList subMenuElem={props.element.subMenuItems} subMenuItemClick={props.subMenuItemClick} />}
            </div>)
            :
            (<li className={`menu-item ${props.selected ? 'active' : ''}`} onClick={props.menuItemClick} >
                <a href='#'>
                    <i className={`${props.element.icon} menu-icon`} ></i>
                    <span className='menu-text' >{props.element.name}</span>
                </a>
            </li>);

    }
};

export default MenuItem;

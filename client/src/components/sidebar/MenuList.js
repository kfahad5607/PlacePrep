import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import menuItems from './MenuItemData';


const MenuList = () => {
    const [selected, setSelected] = useState(menuItems[0].name);
    const [subMenus, setSubMenus] = useState({});

    useLayoutEffect(() => {
        const path = window.location.pathname;
        const parts = path.split('/');

        if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
            const selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            setSelected(selectedItem);
        }
    }, []);

    useEffect(() => {
        const newSubMenus = {};

        menuItems.forEach((ele, index) => {
            const hasSubMenus = !!ele.subMenuItems.length;

            if (hasSubMenus) {
                newSubMenus[index] = {};
                newSubMenus[index]['isOpen'] = false;
                newSubMenus[index]['selectedSubMenu'] = null;
            }

            const path = window.location.pathname;
            const parts = path.split('/');

            if (parts.length === 3) {
                const selectedItem = parts[1].toLowerCase();
                const subSelectedItem = parts[2].toLowerCase();
                const selectedItemIndex = menuItems.findIndex(item => item.name.toLowerCase() === selectedItem);
                const selectedSubItemIndex = menuItems[selectedItemIndex] && menuItems[selectedItemIndex].subMenuItems.findIndex(subItem => subItem.name.toLowerCase() === subSelectedItem);

                if (selectedItemIndex !== -1) {
                    newSubMenus[selectedItemIndex] = {};
                    newSubMenus[selectedItemIndex]['isOpen'] = true;
                }
                if (selectedItemIndex !== -1 && selectedSubItemIndex !== -1) {
                    newSubMenus[selectedItemIndex]['selectedSubMenu'] = selectedSubItemIndex;
                }
            }


            setSubMenus(newSubMenus);
        });
    }, []);

    const handleMenuItemClick = (name, index) => {
        setSelected(name);

        console.log('sub', subMenus.hasOwnProperty(index), subMenus);
        if (subMenus.hasOwnProperty(index)) {
            const subMenusCopy = { ...subMenus };

            subMenusCopy[index]['isOpen'] = !subMenus[index]['isOpen'];
            subMenusCopy[index]['selectedSubMenu'] = null;
            setSubMenus(subMenusCopy);
        }
        else {
            const subMenusCopy = { ...subMenus };

            for (let item in subMenus) {
                subMenusCopy[item]['isOpen'] = false;
                subMenusCopy[item]['selectedSubMenu'] = null;
            }
            setSubMenus(subMenusCopy);
        }

    };

    const handleSubMenuItemClick = (menuItemIdx, subMenuIdx) => {
        const subMenusCopy = { ...subMenus };
        subMenusCopy[menuItemIdx]['selectedSubMenu'] = subMenuIdx;

        setSubMenus(subMenusCopy);
    };

    return (
        <ul className='menu-list'>
            {menuItems.map((ele, index) => {
                const isItemSelected = selected === ele.name;
                const hasSubMenus = !!ele.subMenuItems.length;
                const isOpen = subMenus[index] && subMenus[index].isOpen;

                const SubMenuListJSX = <div className='submenu-list'>
                    <ul>
                        {ele.subMenuItems.map((subMenuEle, subMenuIndex) => {
                            const isSubMenuSelected = (subMenus[index] && subMenus[index].selectedSubMenu) === subMenuIndex;

                            return (<Link key={subMenuIndex} to={`${ele.to}${subMenuEle.to}`} style={{ textDecoration: 'none' }} >
                                <li className={`submenu-item ${isSubMenuSelected ? 'active' : ''}`} onClick={() => handleSubMenuItemClick(index, subMenuIndex)} >
                                    <i className={`${subMenuEle.icon} menu-icon`} ></i>
                                    <span className='menu-text' >{subMenuEle.name}</span>
                                </li>
                            </Link>);
                        })}
                    </ul>
                </div>;


                return ele.subMenuItems.length ?
                    (<div key={index} >
                        <Link to={ele.to} style={{ textDecoration: 'none' }}>
                            <li className={`menu-item ${isItemSelected ? 'active' : ''}`} onClick={() => handleMenuItemClick(ele.name, index)} >
                                <i className={`${ele.icon} menu-icon`} ></i>
                                <span className='menu-text' >{ele.name}</span>
                                {isOpen ? <i className="fas fa-angle-up dropdown-icon" style={{ paddingTop: '4px' }}></i>
                                    : <i className="fas fa-angle-down dropdown-icon" style={{ paddingTop: '7px' }} ></i>}

                            </li>
                        </Link>
                        <AnimatePresence>
                            {(hasSubMenus && isOpen) &&
                                <motion.nav
                                    initial={{ opacity: 0, y: -15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                    exit={{ opacity: 0, x: -30 }}
                                >
                                    {SubMenuListJSX}
                                </motion.nav>
                            }
                        </AnimatePresence>
                    </div>)
                    :
                    (<Link key={index} to={ele.to} style={{ textDecoration: 'none' }}>
                        <li className={`menu-item ${isItemSelected ? 'active' : ''}`} onClick={() => handleMenuItemClick(ele.name, index)} >
                            <i className={`${ele.icon} menu-icon`} ></i>
                            <span className='menu-text' >{ele.name}</span>
                        </li>
                    </Link>);
            }

            )}
        </ul>
    );
};

export default MenuList;

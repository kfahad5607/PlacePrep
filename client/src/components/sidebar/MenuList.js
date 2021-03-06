import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, withRouter } from 'react-router-dom';
import * as menuItemArrays from './MenuItemData';
import { connect } from 'react-redux';

const MenuList = (props) => {
    const { auth: { user } } = props;

    useEffect(() => {
        if (user !== null) {
            if (user.role === 'faculty') {
                setMenuItems(menuItemArrays.faculty);
            }
            else if (user.role === 'admin') {
                setMenuItems(menuItemArrays.admin);
            }
            else {
                setMenuItems(menuItemArrays.student);
            }
        } else {
            setMenuItems(menuItemArrays.student);
        }

        // eslint-disable-next-line
    }, [user]);


    let [menuItems, setMenuItems] = useState(menuItemArrays.student);


    const [selected, setSelected] = useState(menuItems[0].name);
    const [subMenus, setSubMenus] = useState({});

    useLayoutEffect(() => {
        let path = window.location.pathname;
        if (path !== '/') {
            path = path.endsWith('/') ? path.replace(/\/$/, "") : path;
        }
        const parts = path.split('/');

        if (parts.length !== 3) {
            const selectedItem = menuItems.filter((ele) => {
                return ele.to === path;
            })[0];
            setSelected(selectedItem?.name);
        }

        // eslint-disable-next-line
    }, [window.location.pathname]);

    useEffect(() => {
        const newSubMenus = {};

        menuItems.forEach((ele, index) => {
            const hasSubMenus = !!ele.subMenuItems.length;

            if (hasSubMenus) {
                newSubMenus[index] = {};
                newSubMenus[index]['isOpen'] = false;
                newSubMenus[index]['selectedSubMenu'] = null;
            }

            let path = window.location.pathname;
            path = path.endsWith('/') ? path.replace(/\/$/, "") : path;
            const parts = path.split('/');

            let selectedItemIndex;
            let selectedSubItemIndex;
            if (parts.length === 3) {
                const selectedItem = menuItems.filter((ele, index) => {
                    if (ele.to === '/' + parts[1]) {
                        selectedItemIndex = index;
                    }
                    return ele.to === '/' + parts[1];
                })[0];

                // const selectedItem = parts[1].toLowerCase();

                selectedItem?.subMenuItems.filter((subEle, index) => {
                    if (subEle.to === '/' + parts[2]) {
                        selectedSubItemIndex = index;
                    }
                    return subEle.to === '/' + parts[2];
                });

                // const subSelectedItem = parts[2].toLowerCase();
                // const selectedItemIndex = menuItems.findIndex(item => item.name.toLowerCase() === selectedItem);
                // const selectedSubItemIndex = menuItems[selectedItemIndex] && menuItems[selectedItemIndex].subMenuItems.findIndex(subItem => subItem.name.toLowerCase() === subSelectedItem);

                setSelected(selectedItem?.name);
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

        // eslint-disable-next-line
    }, [window.location.pathname]);

    const handleMenuItemClick = (name, index) => {
        setSelected(name);

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
        user ? <ul className='menu-list'>
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
        </ul> : <h3>Loading...</h3>
    );
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, null)(MenuList));

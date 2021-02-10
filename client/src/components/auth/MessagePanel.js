import React from 'react'
import Logsvg from '../../log.svg'
import Regsvg from '../../register.svg'
import { Link } from 'react-router-dom';

const MessagePanel = ({content}) => {

    const {title, message, btnLink, btnName} = content

    return (
        <div className={"panel " + (btnName=== "Sign up" ? "left-panel" : "right-panel")}>
            <div className="content">
                <h3>{title}</h3>
                <p>{message}</p>
                <Link to={btnLink} className="btn-login transparent" id="sign-up-btn">
                    {btnName}
                </Link>
            </div>
            <img src={btnLink==='/login'? Regsvg : Logsvg} className="image mt-4" alt="" />
        </div>
    )
}

export default MessagePanel

import React from "react";
import {NavLink} from "react-router-dom";
import "./scss/header.scss";

const Header = () => {
    return (
        <header>
            <div className="iw_header">
                <div className="iw_header__left">
                    <i className="fas fa-bars"></i>
                </div>

                <nav>
                    <ul>
                        
                    </ul>
                </nav>

                <div className="iw_header__right">
                    <i className="fas fa-search"></i>
                </div>
            </div>
        </header>
    )
}

export default Header;
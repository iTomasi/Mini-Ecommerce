import React, {useState, useEffect, useRef} from "react";
import {NavLink} from "react-router-dom";
import "./scss/header.scss";

interface IHeaderProps {
    onKeyDown: any
}

const Header = ({onKeyDown}: IHeaderProps) => {

    const [checkingUserWidth, setCheckingUserWidth] = useState<boolean>(false);

    // Mobile State
    const [MS_displayNav, MS_setDisplayNav] = useState<boolean>(false);
    //

    const MS_focusInput: any = useRef(null)

    useEffect(() => {

        const MS_hiddeNav = (e: any) => {
            if (!e.target.classList.contains("i__bars") && !e.target.classList.contains("iw_header__nav-ul") && MS_displayNav) MS_setDisplayNav(false)
        }
        window.addEventListener("click", MS_hiddeNav);
        return () => window.removeEventListener("click", MS_hiddeNav);
    
    }, [MS_displayNav])

    useEffect(() => {
        const userWidth = () => {
            if (window.innerWidth >= 850) setCheckingUserWidth(true)
            else setCheckingUserWidth(false)
        }

        window.addEventListener("resize", userWidth);
    }, [checkingUserWidth])

    const MS_showNav = () => MS_setDisplayNav(true)
    const MS_search = () => MS_focusInput.current.focus()

    const MS_HEADER = () => {
        return (
            <header className="header-MS">
                <div className="iw_header">
                    <div className="iw_header__left">
                        <i className="i__bars-MS fas fa-bars" onClick={MS_showNav}></i>
                    </div>

                    <nav style={{display: MS_displayNav ? "block" : "none"}}>
                        <ul className="iw_header__nav-ul">
                            <NavLink to="/">
                                <i className="fas fa-home"></i>
                                Home
                            </NavLink>

                            <NavLink to="/my-cart">
                                <i className="fas fa-shopping-cart"></i>
                                My Cart
                            </NavLink>
                        </ul>
                    </nav>

                    <div className="iw_header__right">
                        <input type="text" placeholder="Search..." ref={MS_focusInput} onKeyDown={onKeyDown}/>
                        <i className="i__search fas fa-search" onClick={MS_search}></i>
                    </div>
                </div>
            </header>
        )
    }

    const DK_HEADER = () => {
        return (
            <header className="header-DK">
                <div className="iw_header__left">
                    <h2>Nike Shop</h2>
                </div>

                <nav>
                    <ul>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/my-cart">My Cart</NavLink>
                    </ul>
                </nav>

                <div className="iw_header__right">
                    <input type="text" placeholder="Search..." onKeyDown={onKeyDown}/>
                </div>
            </header>
        )
    }

    if (window.innerWidth >= 850) return <DK_HEADER/>
    else if (window.innerWidth < 850) return <MS_HEADER/>

    return checkingUserWidth ? <DK_HEADER/> : <MS_HEADER/>
}

export default Header;
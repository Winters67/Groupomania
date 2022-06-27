import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">

                    <NavLink to="/" className={({ isActive }) => (isActive ? "active-left-nav" : 'none')}>Home
                        <img src="./img/icons/home.svg" alt="home" />
                    </NavLink>
                    <br />
                    {/* <NavLink to="/trending" className={({ isActive }) => (isActive ? "active-left-nav" : 'none')}>trending
                        <img src="./img/icons/rocket.svg" alt="home" />
                    </NavLink> */}
                    <br />
                    <NavLink to="/profil" className={({ isActive }) => (isActive ? "active-left-nav" : 'none')}>Profil
                        <img src="./img/icons/user.svg" alt="home" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
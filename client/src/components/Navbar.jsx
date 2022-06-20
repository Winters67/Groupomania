import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContex';

const Navbar = () => {
    const uid = useContext(UidContext);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to='/'>
                        <div className="logo">
                            <img src="./img/icons/icon.png" alt="icon" />
                            <h3>Groupomania</h3>
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Bienvenue 'valeur' </h5>
                            </NavLink>
                        </li>
                        Logo Logout
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <li>
                                <NavLink exact to='/profil'>
                                    <img src='./img/icons/login.svg' alt='login ' />
                                </NavLink>
                            </li>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
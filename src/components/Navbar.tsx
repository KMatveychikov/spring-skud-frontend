import React from 'react';
import {Link} from "react-router-dom";
import classes from '../styles/Navbar.module.css'
import {store} from "../index";
import {observer} from "mobx-react-lite";



const Navbar = observer(() => {
    const isAuth = store.isAuth
        if (isAuth) {
            return (
                <div className={ classes.navbar }>
                    <div>
                        <Link to="/passes" className={ classes.navbar__links }>Контроль проходов</Link>
                        <Link to="/employee" className={ classes.navbar__links }>Персонал</Link>
                        <Link to="/workdays" className={ classes.navbar__links }>Рабочие смены</Link>
                        <Link to="/add_employee" className={ classes.navbar__links }>Добавить сотрудника</Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={ classes.navbar }>
                    <Link to="/" className={ classes.navbar__links }>Login</Link>
                </div>
            );
        }
    }
);

export default Navbar;
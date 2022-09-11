import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    return (
        <header className="header page__borders">
            <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
            <Switch>
                <Route exact path='/'>
                    <div className='header__container'>
                        <p className='header__link header__link-email'>{props.email}</p>
                        <Link to='/sign-in' className='header__link'>Выйти</Link>
                    </div>
                </Route>
                <Route path='/sign-in'>
                    <Link to='/sign-up' className='header__link'>Регистрация</Link>
                </Route>
                <Route path='/sign-up'>
                    <Link to='/sign-in' className='header__link'>Войти</Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;
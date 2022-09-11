import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    };
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <div className='access'>
            <h2 className='access__header'>Регистрация</h2>
            <form className='access__form' onSubmit={handleSubmit}>
                <input className='access__input'
                    name="email" type='email'
                    placeholder='Email' required
                    value={email} onChange={handleEmailChange} />
                <input className='access__input'
                    name='password' type='password'
                    placeholder='Пароль' required
                    value={password} onChange={handlePasswordChange} />
                <button className="access__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className='access__caption'>Уже зарегистрированы?
                <Link to='sign-in' className='access__link'> Войти</Link>
            </p>
        </div>
    )
}
export default withRouter(Register);
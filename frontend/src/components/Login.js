import { useState } from 'react';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    };
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    };

    function handleAuthorize(e) {
        e.preventDefault();
        props.onAuthorize(email, password);
    }

    return (
            <div className='access'>
                <h2 className='access__header'>Вход</h2>
                <form className="access__form" onSubmit={handleAuthorize}>
                    <input className='access__input'
                       type='email' placeholder='Email' autoComplete="on" required
                        onChange={handleEmailChange} />
                    <input className='access__input'
                        type='password' placeholder='Пароль' autoComplete="on" required
                        onChange={handlePasswordChange} />
                    <button className='access__button' type="submit">Войти</button>
                </form>
            </div>
    )
}
export default Login;
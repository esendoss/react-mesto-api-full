import React from 'react';
import Success from '../images/success.svg'
import Fail from '../images/fail.svg'
import close from '../images/close-icon.svg';

function InfoTooltip(props) {
    const status = props.tooltipStatus ? Success : Fail;

    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__exit" type="button" onClick={props.onClose}>
                    <img className="popup__exit-sign" src={close} alt="Кнопка выхода" />
                </button>
                <div className='popup__box'>
                    <img className='popup__sign' src={status} alt={props.tooltipStatus ? 'Успех' : 'Ошибка'} />
                    <p className='popup__message'>{props.tooltipMessage}</p>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;
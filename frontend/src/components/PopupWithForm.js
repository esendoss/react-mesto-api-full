import React from 'react';
import close from '../images/close-icon.svg';

function PopupWithForm(props) {

    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            props.onClose()
        };
    }

    return (
        <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}
            onClick={handleOverlayClick}
        >
            <div className="popup__container">
                <form className="form" name={props.name} type="submit" onSubmit={props.onSubmit} >
                    <button className="popup__exit popup__exit_edit" type="button" onClick={props.onClose}>
                        <img className="popup__exit-sign" src={close} alt="Кнопка выхода" />
                    </button>
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button className="popup__submit" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
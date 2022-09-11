import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            name='avatar'
            title='Обновить аватар'
            onClose={props.onClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_data_avatar"
                type="url"
                id="avatar"
                name="avatar"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
                defaultValue=""
                required />
            <span className="popup__input-error avatar-error" id="avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
import React from "react";
import like from '../images/like.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    //подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    //определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner === currentUser._id;
    
    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete_active' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some((i) => i === currentUser._id);
    
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }
    //console.log(props.card);

    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick () {
        props.onCardDelete(props.card);
    }

    return (
        <li className="card" key={props.card._id}>
            <img className="card__img" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="card__caption">
                <h2 className="card__place">{props.card.name}</h2>
                <div className="card__likes">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
                        <img src={like} alt="Лайк" />
                    </button>
                    <p className="card__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}
export default Card;
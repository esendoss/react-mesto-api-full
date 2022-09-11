import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    //подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile page__borders">
                <div className="profile__info">
                    <img className="profile__avatar" src={currentUser.avatar} alt='Аватарка' onClick={props.onEditAvatar} />
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать"></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить"></button>
            </section>
            <ul className="gallery page__borders">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </ul>
        </main>
    )
}

export default Main
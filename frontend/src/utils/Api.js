class Api {
  constructor({headers, url}) {
    this._headers = headers;
    this._url = url;
  }

  getToken(token) {
    if (!this._headers['Authorization']) this._headers['Authorization'] = 'Bearer ' + token;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkError)
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkError)
  }

  editProfileInfo(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkError)
  }
  addUserCard(name, link) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkError)
  }
  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkError)
  }
  updateСardLike(cardId, isLiked) {
    if (isLiked) {
      return this._like(cardId);
    } else {
      return this._dislike(cardId);
    }
  }
  _like(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkError)
  }

  _dislike(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkError)
  }

  editAvatar(data) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data
      })
    })
      .then(this._checkError)
  }
  updateEmail() {
    this._headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }
}

const api = new Api({
  url: 'http://anotherdomain.esendoss.students.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  },
});
export { api } 
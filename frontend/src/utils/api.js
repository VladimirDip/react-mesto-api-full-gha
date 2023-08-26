export class Api {
    constructor(options) {
        this._headers = options.headers;
        this._baseUrl = options.baseUrl
    }

    _checkResponseStatus(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Error ${response.status} ${response.statusText}`);
    }

    getUserData() {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                method: "GET",
                headers: this._headers,
                credentials: 'include',
            }
        ).then(this._checkResponseStatus);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
            credentials: 'include',
        }).then(this._checkResponseStatus);
    }

    setUserData(data) {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.description,
                }),
                credentials: 'include',
            }
        ).then(this._checkResponseStatus);
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
            credentials: 'include',
        }).then(this._checkResponseStatus);
    }

    setUserAvatar({avatar}) {
        // console.log(avatar);
        return fetch(
            `${this._baseUrl}/users/me/avatar`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({avatar}),
                credentials: 'include',
            }
        ).then(this._checkResponseStatus);
    }

    toggleLikeCard(id, like) {
        return fetch(
            `${this._baseUrl}/cards/${id}/likes`,
            {
                method: like ? "DELETE" : "PUT",
                headers: this._headers,
                credentials: 'include',
            }
        ).then(this._checkResponseStatus);
    }

    deleteCard(id) {
        return fetch(
            `${this._baseUrl}/cards/${id}`,
            {
                method: "DELETE",
                headers: this._headers,
                credentials: 'include',
            }
        ).then(this._checkResponseStatus);
    }
}

const api = new Api({
    baseUrl: 'https://api.dip.nomoredomains.ru',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

export default api;

export const BASE_URL = "https://api.dip.nomoredomains.sbs";

class AuthApi {
    getResponseData = (res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    };

    register = (email, password) => {
        return fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password, email}),
            // credentials: 'include',
        }).then((response) => {
            return this.getResponseData(response);
        });
    };

    authorize = (email, password) => {
        return fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({email, password}),
        })
            .then((response) => {
                //console.log(response)
                return this.getResponseData(response);
            })
        // .then((data) => {
        //     //console.log(data)
        //     // сохраняем токен в localStorage
        //
        //     return data;
        // });
    };

    /*    tokenCheck = (token) => {
            //console.log(token)
            return fetch(`${BASE_URL}/users/me`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: 'include',
            }).then((res) => this.getResponseData(res));
        };*/
}

export const auth = new AuthApi();

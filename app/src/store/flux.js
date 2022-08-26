import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            user: {},
            token: null
        },
        actions: {
            getUsers: async (url) => {
                try {
                    const response = await fetch(url + '/api/users');
                    if (!response.ok) throw Error("Error al consultar los usuarios")
                    const data = await response.json()

                    setStore({
                        token: data.access_token,
                        user: data
                    })
                    sessionStorage.setItem("token", data.access_token)

                } catch (error) {
                    console.log(error)
                }
            },
            register: async (username, email, password) => {
                const { apiURL} = getStore();
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
                        'username': username,
						'email': email,
						'password': password
					})
				};
				await fetch(apiURL + '/api/register', opts)
					.then(response => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			getToken: () => {
				const token = localStorage.getItem('token');
				if (token && token != '' && token != undefined)
					setStore({ token: token })
			},
			logout: () => {
				const token = localStorage.removeItem('token');
				setStore({ token: null })
			},

        }
    }
}

export default getState;
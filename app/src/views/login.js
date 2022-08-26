import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';


const Login = () => {

    const { store: {apiURL}, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function login(event) {
        event.preventDefault();
        const response = await fetch(apiURL+ '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) throw Error('Hay un problema en la respuesta del login');

        if (response.status === 401) {
            throw 'credenciales inválidas';
        } else if (response.status === 400) {
            throw 'email o contraseña incorrectos';
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        actions.getToken(data.token);

        navigate('/perfil');
    }


    return (
        <div className='container'>
            <h1 className=' text-center'>Login</h1>
            <form onSubmit={login} className='container mt-5'>
                <div className='form-group col mt-4'>
                    <input
                        value={email}
                        type='email'
                        className='form-control'
                        placeholder='email'
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col mt-4'>
                    <input
                        value={password}
                        type='password'
                        className='form-control'
                        placeholder='contraseña'
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='mt-3 btn btn-dark d-grid'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login
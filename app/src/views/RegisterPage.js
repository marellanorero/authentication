import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
const RegisterPage = () => {

    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const register = (event) => {
        event.preventDefault();
        actions.register(username, email, password);
        navigate('/login');
    };





    return (
        <div className="container">
            <form style={{ width: '500px', margin: '0 auto' }}>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input type="text" className="form-control" name="username" placeholder="Insert Username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" placeholder="email@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="xxxxxx" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-3 d-grid">
                    <button onClick={register} className="btn btn-dark gap-2">Registrar</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;
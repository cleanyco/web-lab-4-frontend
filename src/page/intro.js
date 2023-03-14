import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import {login, signup} from "../request/user-request";
import '../style/intro.css'
export default function Intro() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const refreshClock = () => {
        let date = new Date();

        let localTime = date.toLocaleTimeString();
        let localDate = date.toLocaleDateString();

        setTime(localTime);
        setDate(localDate);
    }

    const checkUsername = (username) => {
        if (!username.length > 4) {
            setMessage('Username must be longer than 4 characters!')
            return false;
        } else {
            return true;
        }
    }

    const checkPassword = (password) => {
        if (!password.length > 4) {
            setMessage('Password must be longer than 4 characters!')
            return false;
        } else {
            return true;
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage('');

        if (checkUsername(username) && checkPassword(password)) {
            login(username, password).then(resp => {
                if (resp.ok) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    navigate('/main');
                }
            })
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        setMessage('');
        if (localStorage.getItem('username') == null && localStorage.getItem('password') == null) {
            signup(username, password).then(resp => {
                if (resp.ok) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    navigate('/main');
                }
            })
        } else {
            setMessage('Multiple users are not allowed to login at the same time!');
        }
    }

    useEffect(() => {
        setInterval(() => {refreshClock()}, 6000);
        refreshClock();
    })

    window.onload = function() {
        if (localStorage.getItem('username') !== null && localStorage.getItem('password') !== null) {
            login(localStorage.getItem('username'), localStorage.getItem('password')).then(resp => {
                    if (resp.ok) {
                        navigate('/main')
                    } else {
                        navigate('/intro')
                        localStorage.clear();
                    }
                }
            )
        }
    }

    return (
        <div className="intro">
            <div>
                <div className="intro_header">Чесноков Аркадий Александрович P32111 14156</div>
                <div className="intro_container">
                    <div className="intro_time">{time}</div>
                </div>
            </div>

            <div className={"intro__form"}>
                <div className={"intro__input"}>
                    username
                    <input type="text"
                           onChange={e => setUsername(e.target.value)}/>
                    password
                    <input type="password"
                           onChange={e => setPassword(e.target.value)}/>
                    <button onClick={handleSignUp}>Зарегистрироваться</button>
                    <button onClick={handleLogin}>Войти</button>
                    {/*<div style="position: absolute">{message}</div>*/}
                </div>
                <img src={require("../style/ice-king.png")} className="ice-king-sticker" alt={"ice-king-sticker"}/>
                </div>
        </div>
    )
}
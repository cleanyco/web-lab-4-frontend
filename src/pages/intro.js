import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import {heliosHost, isLoggenIn, login, signup} from "../request/user-request";
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
    //fixme добавить простую валидацию
    const handleLogin = (e) => {
        e.preventDefault();

        setMessage('');

        login(username, password).then(resp => {
            if (resp.ok) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                navigate('/main');
            }
        })
    }
    //fixme добавить простую валидацию
    const handleSignUp = (e) => {
        e.preventDefault();

        setMessage('');
        if (localStorage.getItem('username') !== null && localStorage.getItem('password') !== null) {
            signup(username, password).then(resp => {
                if (resp.ok) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    navigate('/main');
                }
            })
        } else {
            //fixme изменить на вывод сообщнеия об ошибке в специальный div элемент
            alert('одновременно может быть щарегистрирован только один пользователь!')
        }
    }

    useEffect(() => {
        setInterval(() => {refreshClock()}, 6000);
        refreshClock();
    })

    const checkSession = () => {
        fetch('http://localhost:8080/checksession').then(resp => {
            if (!resp.ok) {
                localStorage.clear();
                navigate('/intro');
            }
        })
    }

    window.onload = function() {
        if (localStorage.getItem('username') !== null && localStorage.getItem('password') !== null) {
            login(localStorage.getItem('username'), localStorage.getItem('password')).then(resp => {
                    if (resp.ok) {
                        navigate('/main')
                    } else {
                        navigate('/intro')
                    }
                }
            )
        }
    }

    return (
        <div className="Intro">
            <div>
                <div className="intro_header">Чесноков Аркадий Александрович P32111 14156</div>
                <div className="intro_container">
                    <div className="intro_time">{time}</div>
                </div>
            </div>

            <div className="intro_form">
                <input type="text" placeholder="username"
                       value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="password"
                       value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="intro_reg">

                    <button onClick={handleSignUp}>Зарегистрироваться</button>
                        <button onClick={handleLogin}>Войти</button>
                </div>
            </div>
        </div>
    )
}
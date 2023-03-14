import {Link, useNavigate} from "react-router-dom";
import CoordinateForm from "../component/coordinate-form";
import {login} from "../request/user-request";
import {useEffect} from "react";
import '../style/main.css'
import PointTable from "../component/point-table";
import InteractiveElement from "../component/interactive-element";

export default function Main() {
    const navigate = useNavigate();

    //можно переписать через useEffect(() => {doStuff}, []) - это выполнится один раз при создании компонента

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

    const checkSession = () => {
        fetch('http://localhost:8080/checksession', {
            method: 'GET',
            credentials: 'include'
        }).then(resp => {
            if (resp.status === 400) {
                localStorage.clear();
                navigate('/intro')
            }
        })
    }

    useEffect(() => {
        setInterval(checkSession, 5000)
    })

    const handleLogout = () => {
        localStorage.clear();
        fetch('http://localhost:8080/logout', {
            method: 'GET',
            credentials: 'include'
        }).then(() => {
           navigate('/intro')
        })
    }

    return (
        <div className="main">
            <div className="main__header">
                Чесноков Аркадий Александрович P32111 14156
            </div>
            <div className="main__container">
                <div className="main__form">
                    <CoordinateForm/>
                    <Link to="/intro" className="main__logout" onClick={handleLogout}>Выйти</Link>
                </div>
                    <InteractiveElement/>
                <div className={"main__table"}>
                    <PointTable/>
                </div>
            </div>
        </div>
    )
}
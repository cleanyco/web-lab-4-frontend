import {Link, useNavigate} from "react-router-dom";
import CoordinateForm from "../components/coordinate-form";
import {login} from "../request/user-request";
import {useEffect} from "react";
import PointTable from "../components/point-table";

export default function Main() {
    const navigate = useNavigate();

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

    const checkLoggedIn = () => {
        if (localStorage.getItem('username') === null && localStorage.getItem('password') === null) {
            navigate('/intro')
        }
    }

    const checkUser = () => {
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('password'));
    }

    useEffect(() => {
        setInterval(checkLoggedIn, 5000)
        setInterval(checkUser, 10000)
    })
    //fixme в другом браузере не выходит!!!
    //fixme сделать так, чтобы нельзя было не только регать новый аккаунт при залогиненном старом, но и заходить в новый
    const handleLogout = () => {
        localStorage.clear();
        fetch('http://localhost:8080/logout').then(resp => {
            if (resp.ok) {
                localStorage.clear()
                navigate('/intro')
            } else {
                navigate('/intro')
            }
        })
    }

    return (
        <div className="main">
            <div className="main__header">
                Чесноков Аркадий Александрович P32111 14156
                <Link to="/intro" className="logout" onClick={handleLogout}>Выйти</Link>
            </div>
            <div className="main__container">
                <div className="coordinate__form">
                    <CoordinateForm/>
                </div>
                <div className="main__table">
                    <PointTable/>
                </div>
            </div>
        </div>
    )
}
import { useDispatch} from "react-redux"
import {clearPoints, sendPoint} from "../utils/point"
import {addPoint, setPoints} from "../redux/point-slice"
import { Input } from "react-toolbox/lib/input"
//todo добавить описание полей ввода! (Введите то-то-...)
//todo добавить вывод сообщений об ошибке
export default function CoordinateForm() {
    const dispatch = useDispatch();
    //fixme сделать нормальную декларацию
    let y = null;

    //todo задать дополнительные проверки
    //todo не забывает, что X = это массив
    const validateX = (x) => {
        return (x.length > 0);
    }
    //todo сделать обработку числа с большой точностью
    //todo задать дополнительные проверки
    const validateY = (y) => {
        return ((y != null) && (parseFloat(y) > -5) && (parseFloat(y) < 3));
    }
    //todo задать дополнительные проверки
    //todo не забывает, что R = это массив
    const validateR = (r) => {
        return (r.length > 0);
    }

    const validate = () => {
        return validateX(checkedX) && validateY() && validateR(checkedR);
    }

    const sendForm = (e) => {
        e.preventDefault();

        console.log(y);

        checkedX.forEach(x => {
            checkedR.forEach(r => {
                sendPoint(parseFloat(x), parseFloat(y), parseFloat(r)).then(resp => {
                    if (resp.ok) {
                        resp.json().then(point => {
                            alert('запрос был успешно отправлен')
                            dispatch(addPoint(point))
                        })
                    } else {
                        alert('не отправилось :(')
                    }
                })
            })
        })
    }

    const clearGraph = (e) => {
        e.preventDefault();

        clearPoints().then(resp => {
            if (resp.ok) {
                dispatch(setPoints([]));
            }
        })
    }

    let checkedX = [];
    const handleX = (e) => {
        let isChecked = e.target.checked;

        if (isChecked) {
            checkedX.push(e.target.value)
        } else {
            let idx = checkedX.indexOf(e.target.value);
            if (idx !== -1) {
                checkedX.splice(idx, 1);
            }
        }
        console.log(checkedX);
    }

    let checkedR = [];
    const handleR = (e) => {
        let isChecked = e.target.checked;

        if (isChecked) {
            checkedR.push(e.target.value)
        } else {
            let idx = checkedR.indexOf(e.target.value);
            if (idx !== -1) {
                checkedR.splice(idx, 1);
            }
        }
        console.log(checkedR);
    }
    //fixme добавить необходимые проверки
    return (
        <div className="coordinate__form">
            {/*//fixme сделать нормальные отступы с помощью css*/}
            <input type={"checkbox"} value={-5} onChange={handleX}/> -5
            <input type={"checkbox"} value={-4} onChange={handleX}/> -4
            <input type={"checkbox"} value={-3} onChange={handleX}/> -3
            <input type={"checkbox"} value={-2} onChange={handleX}/> -2
            <input type={"checkbox"} value={-1} onChange={handleX}/> -1
            <input type={"checkbox"} value={0} onChange={handleX}/> 0
            <input type={"checkbox"} value={1} onChange={handleX}/> -1
            <input type={"checkbox"} value={2} onChange={handleX}/> -2
            <input type={"checkbox"} value={3} onChange={handleX}/> -3
            <br/> <br/>
            {/*{*/}
            {/*    isY === false ?*/}
            {/*        <label>Y должен быть в диапазоне (-3; 5) </label> :*/}
            {/*        <label>Введите Y, пжлста</label>*/}
            {/*}*/}
            {/*fixme убрать ограничение по вводу текста*/}
            {/*fixme вернуть сюда функцию*/}
            <input type="text" maxLength={16} onChange={(e) => {
                y = e.target.value;
            }}/>
            <br/> <br/>
            {/*{*/}
            {/*    isR === false ?*/}
            {/*        <label>Да тут даже отрицательный радиус можно сделать, ЧТО МОЖНО БЫЛО СЛОМАТЬ</label> :*/}
            {/*        <label>Выберите значение R</label>*/}
            {/*}*/}
            <label>Выберите значние R</label>
            <input type={"checkbox"} value={-3} onChange={handleR}/> -3
            <input type={"checkbox"} value={-2} onChange={handleR}/> -2
            <input type={"checkbox"} value={-1} onChange={handleR}/> -1
            <input type={"checkbox"} value={0} onChange={handleR}/> 0
            <input type={"checkbox"} value={1} onChange={handleR}/> 1
            <input type={"checkbox"} value={2} onChange={handleR}/> 2
            <input type={"checkbox"} value={3} onChange={handleR}/> 3
            <input type={"checkbox"} value={4} onChange={handleR}/> 4
            <input type={"checkbox"} value={5} onChange={handleR}/> 5
            <br/> <br/>
            <Input type="button" className="btn_submit" value="FEUER FREI!" onClick={sendForm} />
            <Input type="button" className="btn_clear" value="Очистить :з" onClick={clearGraph} />
        </div>
    )
}
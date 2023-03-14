import {sendPoint} from "../utils/point"
import Input  from "react-toolbox/lib/input"
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import store, {saveRadius} from "../redux/store";


export default function CoordinateForm() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState();

    let messageRef = useRef();
    let y = null;

    const validateX = (x) => {
        return (x.length > 0);
    }

    const validateY = (y) => {
        return ((y != null) && (parseFloat(y.trim().replace(',', '.')) > -5) && (parseFloat(y.trim().replace(',', '.')) < 3));
    }
    //fixme запретить выбирать отрицательный радиус
    const validateR = (r) => {
        r.forEach((radius) => {
            if (radius < 0) {
                return false;
            }
        })
        return (r.length > 0);
    }

    const validate = () => {
        return validateX(checkedX) && validateY() && validateR(checkedR);
    }

    const sendForm = (e) => {
        e.preventDefault();

        console.log(y);

        if (validate) {
            setMessage('');
            checkedX.forEach(x => {
                checkedR.forEach(r => {
                    sendPoint(parseFloat(x), parseFloat(y.trim().replace(',', '.')), parseFloat(r)).then(resp => {
                        if (!resp.ok) {
                            //fixme это для дебага, убрать
                            alert('Не отправилось :(');
                        }
                    })
                })
            })
        } else {
            setMessage('Incorrect Coordinates!')
        }
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
    }

    let checkedR = [];
    const handleR = (e) => {
        let isChecked = e.target.checked;

        if (isChecked) {
            checkedR.push(e.target.value)
            store.dispatch(saveRadius(checkedR));
        } else {
            let idx = checkedR.indexOf(e.target.value);
            if (idx !== -1) {
                checkedR.splice(idx, 1);
                store.dispatch(saveRadius(checkedR));
            }
        }
    }

    return (
        <div className="coordinate__form">
            <fieldset>
            Check X!
            <br/>
            <input type={"checkbox"} value={-5} onChange={handleX}/> -5
            <input type={"checkbox"} value={-4} onChange={handleX}/> -4
            <input type={"checkbox"} value={-3} onChange={handleX}/> -3
            <input type={"checkbox"} value={-2} onChange={handleX}/> -2
            <input type={"checkbox"} value={-1} onChange={handleX}/> -1
            <input type={"checkbox"} value={0} onChange={handleX}/> 0
            <input type={"checkbox"} value={1} onChange={handleX}/> -1
            <input type={"checkbox"} value={2} onChange={handleX}/> -2
            <input type={"checkbox"} value={3} onChange={handleX}/> -3
            </fieldset>
            <br/>
            {/*fixme убрать ограничение по вводу текста*/}
            <fieldset>
            Type Y!
            <br/>
            <input type="text" maxLength={16} onChange={(e) => {
                y = e.target.value;
            }}/>
            </fieldset>
            <br/>
            <fieldset>
            Check R!
            <br/>
            <input type={"checkbox"} value={-3} onChange={handleR}/> -3
            <input type={"checkbox"} value={-2} onChange={handleR}/> -2
            <input type={"checkbox"} value={-1} onChange={handleR}/> -1
            <input type={"checkbox"} value={0} onChange={handleR}/> 0
            <input type={"checkbox"} value={1} onChange={handleR}/> 1
            <input type={"checkbox"} value={2} onChange={handleR}/> 2
            <input type={"checkbox"} value={3} onChange={handleR}/> 3
            <input type={"checkbox"} value={4} onChange={handleR}/> 4
            <input type={"checkbox"} value={5} onChange={handleR}/> 5
            </fieldset>
            <br/>
            {/*<div style="font-size: smaller">{message}</div>*/}
            <br/>
            //FIXME убрать компоненты из toolbox, заменить обычными компонентами
            <Input type="button" className="btn_submit" value="FEUER FREI!" onClick={sendForm} />
        </div>
    )
}
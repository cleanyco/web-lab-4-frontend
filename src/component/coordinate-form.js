import {sendPoint} from "../utils/point"
// import Input  from "react-toolbox/lib/input"
import {useRef} from "react";
import {useDispatch} from "react-redux";
import '../style/coordinate-form.css'


export default function CoordinateForm() {
    const dispatch = useDispatch();

    let y = undefined;

    let checkedX = [];
    let checkedR = [];

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();

    const sendForm = (e) => {
        e.preventDefault();
        checkedX.forEach(x => {
            checkedR.forEach(r => {
                sendPoint(parseFloat(x), parseFloat(y.trim().replace(',', '.')), parseFloat(r))
            })
        })
    }

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

    const handleR = (e) => {
        let isChecked = e.target.checked;
        if (isChecked) {
            if (e.target.value < 0) {
                alert('Запрещено!')
                e.target.checked = false;
            }

            checkedR.push(e.target.value)
            dispatch({type: 'SAVE_RADIUS', payload: checkedR});

            if (e.target.value == 1) {
                ref1.current.style.display = "block"
            } else if (e.target.value == 2) {
                ref2.current.style.display = "block"
            } else if (e.target.value == 3) {
                ref3.current.style.display = "block"
            }
        } else {
            let idx = checkedR.indexOf(e.target.value);
            if (idx !== -1) {
                checkedR.splice(idx, 1);
                dispatch({type: 'SAVE_RADIUS', payload: checkedR});

                if (e.target.value == 1) {
                    ref1.current.style.display = "none"
                } else if (e.target.value == 2) {
                    ref2.current.style.display = "none"
                } else if (e.target.value == 3) {
                    ref3.current.style.display = "none"
                }
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
                <input type={"checkbox"} value={1} onChange={handleX}/> 1
                <input type={"checkbox"} value={2} onChange={handleX}/> 2
                <input type={"checkbox"} value={3} onChange={handleX}/> 3
                </fieldset>
                <br/>
                {/*fixme убрать ограничение по вводу текста*/}
                <fieldset>
                Type Y!
                <br/>
                <input type="text" value={y} onChange={e => {
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

                <br/>
                <input type="button" value="FEUER FREI!" onClick={sendForm} />

            <img className={"figure1"} ref={ref1} src={require("../style/coordinate-figure1.png")} alt={"figure"}/>
            <img className={"figure2"} ref={ref2} src={require("../style/coordinate-figure2.png")} alt={"figure"}/>
            <img className={"figure3"} ref={ref3} src={require("../style/coordinate-figure3.png")} alt={"figure"}/>
        </div>
    )
}
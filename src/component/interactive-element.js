import {useSelector} from "react-redux";
import {createRef, useEffect, useRef} from "react";

export default function InteractiveElement() {
    //fixme не пробрасывает r
    let r = useSelector(state => state.r);
    const imageSizePx = 400;

    const ref = useRef();

    useEffect(() => {
        const canvas = ref.current;
        const chart = canvas.getContext('2d');
        canvas.addEventListener('mousedown', (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top; // y position within the element.

                console.log("X = ", getXTopLeft(x));
                console.log("Y = ", getYTopLeft(y));
                console.log(r)

        });
    }, [])


    const getXTopLeft = (px) => {
        return -5 * (1 - px / (imageSizePx / 2));
    }

    const getYTopLeft = (px) => {
        return 5 * (1 - px / (imageSizePx / 2));
    }

    return (
        <div className="main__coord">
            <canvas className={"interactive_element"} ref={ref} id={"chart"}/>
            <img src={require("../style/coordinate-form.jpg")} alt={"coordinate-place"}/>
        </div>
    )
}
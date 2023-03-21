import {useEffect, useRef} from "react";
import {getPoints, sendPoint} from "../utils/point";
import store from "../redux/store";
import '../style/interactive-element.css'

export default function InteractiveElement() {
    const imageSizePx = 400;

    const ref = useRef();

    useEffect(() => {
        let canvas = ref.current;
        let chart = canvas.getContext('2d');
        canvas.addEventListener('mousedown', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top; // y position within the element.

            const r = store.getState().r;

            console.log(getXTopLeft(x));
            console.log(getYTopLeft(y));

            if (r.length > 0) {
                r.forEach((radius) => {
                    sendPoint(parseFloat(getXTopLeft(x)), parseFloat(getYTopLeft(y)), parseFloat(radius));
                })
            }

            getPoints().then(resp =>
                resp.json()
            ).then(data => {
                data.forEach(point => {
                    r.forEach(radius => {
                        console.log(radius);
                        if (point.r == radius) {
                            drawPoints(point.x, point.y, point.hit, chart)
                        }
                    })
                })
            })
        });
    }, [])

    const getXTopLeft = (px) => {
        return -5 * (1 - px / (imageSizePx / 2));
    }

    const getYTopLeft = (px) => {
        return 5 * (1 - px / (imageSizePx / 2));
    }

    const drawPoints = (x, y, hit, chart) => {

        if (hit === "Hit") {
            chart.fillStyle = 'green';
        } else {
            chart.fillStyle = 'red';
        }

        chart.beginPath();
        chart.arc(150+(30*x),75-(15*y), 2, 0, 2*Math.PI);
        chart.fill();
        chart.closePath();
    }

    return (
        <div>
            <div className={"main__coord"}>
                <canvas className={"interactive_element"} ref={ref} id={"chart"}/>
            <   img src={require("../style/coordinate-form.jpg")} alt={"coordinate-place"}/>
            </div>
        </div>
    )
}
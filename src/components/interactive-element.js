// import {useDispatch, useSelector} from "react-redux";
// import {useRef} from "react";
// import {getPoints, sendPoint} from "../utils/point";
// import {addPoint} from "../redux/point-slice";
//
// export default function InteractiveElement() {
//     const dispatch = useDispatch();
//     //todo повесить на график ссылку ref={graph}
//     const graph = useRef();
//     //fixme передать сюда радиус(ы), чтобы отрисовать точки
//     const selectedRadius = useSelector(getR);
//
//     const handleClick = (e) => {
//         e.preventDefault();
//         //fixme вставить функцию из 3-й лабы
//         //fixme вставить сюда радиус
//         sendPoint(INSERT_X, INSERT_Y, INSERT_RADIUS).then(resp => {
//             if (resp.ok) {
//                 resp.json().then(point => {
//                     dispatch(addPoint(point));
//                 })
//             }
//         })
//         //fixme
//         const points = useSelector(getPoints);
//
//         return (
//             //todo сделать позиционирование, вписать сюда canvas, который будет это все дело рисовать (график + точки)
//         )
//     }
// }
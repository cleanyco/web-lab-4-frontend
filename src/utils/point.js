import {heliosHost} from "../request/user-request";

export function getPoints() {
    return fetch(heliosHost + '/getpoints', {
        method: 'GET',
        credentials: 'include'
    })
}

export function sendPoint(x, y, r) {
    return fetch(heliosHost + '/addpoint', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'x': x,
            'y': y,
            'r': r
        }),
        credentials: 'include'
    });
}

export function clearPoints() {
    return fetch(heliosHost + '/clearpoints', {
        method: 'DELETE'
    })
}


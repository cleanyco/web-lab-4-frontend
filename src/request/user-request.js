import {useState} from "react";

export const heliosHost = "http://localhost:8080"

export var isLoggenIn;

export function signup(username, password) {
    return fetch(heliosHost + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "username": username,
                "password": password
            }
        ),
        credentials: 'include'
    });
}

export function login(username, password) {
    return fetch(heliosHost + '/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            credentials: 'include'
        });
}
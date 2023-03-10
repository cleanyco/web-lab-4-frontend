const usernameRegex = "\"^[A-Za-z0-9_]{3,14}$";

export function isUsernameValid(username) {
    // return ((username !== '') && (usernameRegex.match(usernameRegex)));
    return true;
}

export function isPasswordValid(password) {
    return password.length >= 6;
}

export function isEqual(p1, p2) {
    return (p1 === p2) & ('' !== p2);
}
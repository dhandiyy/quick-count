import {jwtDecode} from "jwt-decode";

export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const checkTokenValidity = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};


import Axios from 'axios';
export default class Utils{
    static setExpiringLocalStorage(key: string, value: any, ttl: number): void {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        }

        localStorage.setItem(key, JSON.stringify(item));
    }

    static getExpiringLocalStorage(key: string) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        const finalItem = item.value;
        return finalItem;
    }

    static setDefaultHeader(value:string){
        Axios.defaults.headers.common['authorization'] = value;
    }

    static URLs = {
        auth: {
            register: 'http://localhost:8081/api/auth/register',
            login: 'http://localhost:8081/api/auth/login'
        },
        user: {
            generateUsers: (amount: number) => `http://localhost:8081/api/users/generateUsers/${amount}`,
            addReview: (carId: string) => `http://localhost:8081/api/users/addReview/${carId}`,
            deleteReview: (carId: string) => `http://localhost:8081/api/users/deleteReview/${carId}`,
            editReview: (carId: string) => `http://localhost:8081/api/users/editReview/${carId}`,
            getUser: (uid: string) => `http://localhost:8081/api/users/getCurrentUser/${uid}`,
            updateUser:(uid: string) => `http://localhost:8081/api/users/updateUser/${uid}`
        },
        car: {
            getAll: 'http://localhost:8081/api/cars/getAllCars',
            getCar: (carId: string) => `http://localhost:8081/api/cars/getCar/${carId}`,
            generateCars: (amount: number) => `http://localhost:8081/api/cars/generateCars/${amount}`,
            editCar: (carId: string) => `http://localhost:8081/api/cars/editCar/${carId}`,
            deleteCar: (carId: string) => `http://localhost:8081/api/cars/deleteCar/${carId}`
        },
        review: {
            generateReviews: (amount: number) => `http://localhost:8081/api/review/generateReviews/${amount}`,
            getAll: (carId: string) => `http://localhost:8081/api/review/getAllReviews/${carId}`
        }
    }
}
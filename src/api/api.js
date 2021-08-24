import { ServiceFormatter } from "../utils/utils";

const DATA_URL = 'http://wp.loc/wp-json/1bit/data';
const SCHEDULE_URL =  'http://wp.loc/wp-json/1bit/schedule' //'/api/schedule.json'; 
const APPOINTMENT_URL = 'http://wp.loc/wp-json/1bit/appointment';
let SMS_URL = '/api/sms';

const createCode = () => {
    let string = "";
    for (let i = 0; i < 3; i++) {
      string += String(Math.round(Math.random() * 100));
    }
    if (string.length < 5) {
        string = (string + createCode()).slice(0, 5);
    }
    if (string.length > 5) {
        string = string.slice(0, 5);
    }
    return string;
}

export const getData = async (stateRes) => {
    const [_, dispatch] = stateRes;
    const serviceFormatter = ServiceFormatter.getInstance();
    try {
        const response = await fetch(DATA_URL, {
            headers: {
                'Authorization': 'Basic ' + btoa('admin:123456')
            }
        });
        
        const data = await response.json();
        const services = serviceFormatter.getAllServices(data.services)
        data.services = services;
        dispatch({type: 'GET_DATA', data}); 
        return true;
    } catch(e) {
        dispatch({type: 'SET_ERROR', payload: true}); 
        return false;
        console.log(e)
    }
}

export const sendCode = async (stateRes) => {
    const [_, dispatch] = stateRes;
    const code = createCode();
    try {
        const response = await fetch(`${SMS_URL}?`, {
            method: 'GET',
        });
        const data = await response.json();
        dispatch({type: 'SET_CODE', code});
        return true;
    } catch (e) {
        dispatch({type: 'SET_CODE', code});
        dispatch({type: 'SET_ERROR', payload: true}); 
        // dispatch({type: 'SET_CODE', code: null});
        return true;
    }
}

// export const getSchedule = async (stateRes) => {
//     const [_, dispatch] = stateRes;
//     try {
//         const response = await fetch(SCHEDULE_URL, {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Basic ' + btoa('admin:123456')
//             }
//         });
//         const data = await response.json();
//         dispatch({type: 'SET_SCHEDULE', data: data.schedule});
//         return true;
//     } catch (e) {
//         dispatch({type: 'SET_ERROR', payload: true}); 
//         console.log(e)
//     }
// }

export const sendData = async (stateRes, body) => {
    const [_, dispatch] = stateRes;
    try {
        const response = await fetch(APPOINTMENT_URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('admin:123456')
            },
            body: JSON.stringify(body)
        });
        // if (response.status !== 200) {
        //     return false;
        // }
        const data = await response.json();
        return true;
    } catch (e) {
        dispatch({type: 'SET_ERROR', payload: true}); 
        console.log(e)
        return false;
    }
}
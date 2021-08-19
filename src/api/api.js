const DATA_URL = 'http://wp.loc/wp-json/1bit/data';
const SCHEDULE_URL = 'http://test.loc/data.php';
const APPOINTMENT_URL = '/api/appointment';
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
    const [state, dispatch] = stateRes;
    try {
        const response = await fetch(DATA_URL, {
            headers: {
                'Authorization': 'Basic ' + btoa('admin:123456')
            }
        });
        const data = await response.json();
        dispatch({type: 'GET_DATA', data}); 
    } catch(e) {
        console.log(e)
    }
}

export const sendCode = async (stateRes) => {
    const [_, dispatch] = stateRes;
    const code = createCode();
    try {
        const response = await fetch(SMS_URL, {
            method: 'POST',
        });
        const data = await response.json();
        dispatch({type: 'SET_CODE', code});
    } catch (e) {
        dispatch({type: 'SET_CODE', code});
        // dispatch({type: 'SET_CODE', code: null});
    }
}

export const getSchedule = async (stateRes) => {
    const [_, dispatch] = stateRes;
    try {
        const response = await fetch(SCHEDULE_URL, {
            method: 'POST',
            body: JSON.stringify({
                method: 'shcedule',
                data: []
            })
        });
        const data = await response.json();
        dispatch({type: 'SET_SCHEDULE', data});
    } catch (e) {
        console.log(e)
    }
}

export const sendData = async (stateRes, body) => {
    const [_, dispatch] = stateRes;
    try {
        const response = await fetch(APPOINTMENT_URL, {
            method: 'POST',
            body
        });
        const data = await response.json();
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
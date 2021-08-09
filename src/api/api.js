const DATA_URL = '/api/data.json';
const SCHEDULE_URL = '/api/data.json';

export const getData = async (stateRes) => {
    const [state, dispatch] = stateRes;
    const response = await fetch(DATA_URL, {
        headers: {
            'Authorization': btoa('sdasdsd:dasdasds')
        }
    })
    const data = await response.json();
    dispatch({type: 'GET_DATA', data});
}
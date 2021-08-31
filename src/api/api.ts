import React from 'react';
import { ServiceEntityType } from './../types/entities';
import { StateData, StateType, FormValues, ReducerAction } from './../types/state';
import { ServiceFormatter, DateFormatter } from "../utils/utils";

type LocalStateType = [StateType, (a: ReducerAction) => any ];

// const DATA_URL = 'https://emb-beauty.ru/wp-json/1bit/data';
// const APPOINTMENT_URL = 'https://emb-beauty.ru/wp-json/1bit/appointment';
const DATA_URL = 'http://wp.loc/wp-json/1bit/data';
const APPOINTMENT_URL = 'http://wp.loc/wp-json/1bit/appointment';
const SMS_URL = 'http://wp.loc/wp-json/1bit/sms';
const AUTH = 'Basic ' + btoa('admin:123456');

const createCode = () :string => {
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

export const getData = async (stateRes :LocalStateType) => {
    const [_, dispatch] = stateRes;
    const serviceFormatter = ServiceFormatter.getInstance();
    try {
        const response = await fetch(DATA_URL, {
            headers: {
                'Authorization': AUTH
            }
        });
        
        const data:StateData = await response.json();
        const services:ServiceEntityType[] = serviceFormatter.getAllServices(data.services)
        data.services = services;
        dispatch({type: 'GET_DATA', payload: data}); 
        return true;
    } catch(e) {
        dispatch({type: 'SET_ERROR', payload: true}); 
        return false;
    }
}

export const sendCode = async (stateRes:LocalStateType, number:string) => {
    const [_, dispatch] = stateRes;
    const code = createCode();
    try {
        const response = await fetch(SMS_URL, {
            method: 'POST',
            body: JSON.stringify({
                message: code,
                number: number
            }),
            headers: {
                'Authorization': AUTH
            }
        });
        const data = await response.json();
        if (!data.error) {
            dispatch({type: 'SET_CODE', payload: code});
            return {status: true};
        } else if (data.error && data.error_code === 3) {
            dispatch({type: 'SET_CODE', payload: code});
            return {status: false, error: data.error_code, code};
        } else {
            dispatch({type: 'SET_CODE', payload: null});
            dispatch({type: 'SET_ERROR', payload: true}); 
            return {status: false, error: data.error_code, code};
        }
    } catch (e) {
        dispatch({type: 'SET_ERROR', payload: true}); 
        dispatch({type: 'SET_CODE', payload: null});
        return {status: false, error: 0, code};
    }
}

const getInfoMessages = (state: StateType, body: FormValues) : string[] | null => {
    if (state.doctor && state.dateTime) {
        const stdDate = DateFormatter.getStandardDate(new Date(state.dateTime));
        const stdTime = DateFormatter.getStandardTime(new Date(state.dateTime));
        const userMessage = `Вы записались на прием к специалисту ${state.doctor.name} ${stdDate} в ${stdTime}`;
        const adminMessage = `${body.name} ${body.surname} записалcя на прием к специалисту ${state.doctor.name} ${stdDate} в ${stdTime}. Его номер +${body.number}. Это сообщение создано автоматически, пожалуйста, не отвечайте на него.`;
        return [userMessage, adminMessage];
    } 
    return null;
}

export const sendData = async (stateRes: LocalStateType, body: FormValues) => {
    const [state, dispatch] = stateRes;
    const infoMessages = getInfoMessages(state, body);
    let userMessage, adminMessage;
    if (infoMessages) {
        [userMessage, adminMessage] = infoMessages;
    } else {
        return false;
    }
    try {
        const response = await fetch(APPOINTMENT_URL, {
            method: 'POST',
            headers: {
                'Authorization': AUTH
            },
            body: JSON.stringify({...body, userMessage, adminMessage})
        });
        if (response.status !== 200) {
            return false;
        }
        
        const data: {success: boolean} = await response.json();
        return true;
    } catch (e) {
        dispatch({type: 'SET_ERROR', payload: true}); 
        return false;
    }
}
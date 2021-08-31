import { Switch, Link, Route } from 'react-router-dom';
import { useReducer } from 'react';
import Wrapper from './components/Main/Wrapper';
import "./css/style.css";
import { StateType, ReducerAction } from './types/state';

const App = () => {
    const reducer = (state: StateType, action: ReducerAction) :StateType => {
        switch (action.type) {
            case 'CHANGE_SEX':
                return {
                    ...state,
                    sex: action.payload
                }
            case 'CHANGE_SCRIPT':
                return {
                    ...state,
                    script: action.payload,
                    service: null,
                    doctor: null,
                    sex: null,
                    date: null,
                    dateTime: null
                }
            case 'GET_DATA':
                return {
                    ...state,
                    isDataLoaded: true,
                    services: action.payload.services,
                    doctors: action.payload.doctors,
                    schedule: action.payload.schedule
                }
            case 'SET_FINAL_STATE':
                return {
                    ...state,
                    resultState: {
                        doctor: state.doctor,
                        service: state.service,
                        dateTime: state.dateTime,
                        ...action.payload
                    },
                    doctor: null,
                    service: null,
                    dateTime: null,
                    date: null,
                    code: null
                }
            case 'SET_DOCTOR':
                return {
                    ...state,
                    doctor: action.payload
                }
            case 'SET_ERROR':
                return {
                    ...state,
                    error: action.payload
                }
            case 'SET_DATE':
                return {
                    ...state,
                    date: action.payload
                }
            case 'SET_DATETIME':
                return {
                    ...state,
                    dateTime: action.payload
                }
            case 'SET_CODE':
                return {
                    ...state,
                    code: action.payload
                }
            case 'SET_BREAD':
                return {
                    ...state,
                    bread: action.payload
                }
            case 'FILTER_BREAD':
                return {
                    ...state,
                    bread: state.bread.filter(item => item.name !== action.payload)
                }
            case 'SET_SERVICE':
                return {
                    ...state,
                    service: action.payload,
                    activeBlock: action.payload ? null : state.activeBlock,
                }
            case 'SET_BLOCK':
                return {
                    ...state,
                    activeBlock: action.payload
                }
            default:
                return state;
        }
    }

    const initialState :StateType  = {
        sex: null,
        script: 2,
        bread: [],
        date: null,
        service: null,
        services: null,
        formData: null,
        code: null,
        schedule: null,
        dateTime: null,
        doctors: null,
        doctor: null,
        resultState: null,
        error: null,
        activeBlock: null,
        isDataLoaded: false
    }

    const resReducer = useReducer(reducer, initialState);
    
    // window.store = resReducer[0] as StateType;

    return (
        <Switch>
            <Route path="/open">
                <Wrapper resReducer={resReducer} /> 
            </Route>
            <Route path="/" exact>
                <div className='bit_widget'>
                    <Link to="/open" className="bit_widget-toggler">Open</Link>
                </div>
            </Route>
        </Switch>
    );
}

export default App;

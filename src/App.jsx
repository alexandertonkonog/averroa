import { HashRouter, Link, Route } from 'react-router-dom';
import { useReducer } from 'preact/hooks';
import Wrapper from './components/Main/Wrapper';
import "./style.css";
import Success from './components/Result/Success';
import Result from './components/Main/Result';

const App = (props) => {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_SEX':
                return {
                    ...state,
                    sex: action.sex
                }
            case 'CHANGE_SCRIPT':
                return {
                    ...state,
                    script: action.script,
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
                    services: action.data.services,
                    doctors: action.data.doctors,
                    schedule: action.data.schedule
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
                }
            case 'SET_DOCTOR':
                return {
                    ...state,
                    doctor: action.id
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
                    code: action.code
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
            case 'SET_FORMATTER':
                return {
                    ...state,
                    serviceFormatter: action.serviceFormatter
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
    const initialState = {
        sex: null,
        script: 2,
        bread: [],
        data: null,
        service: null,
        services: null,
        notService: false,
        formData: null,
        code: null,
        schedule: null
    }
    const resReducer = useReducer(reducer, initialState);
    window.store = resReducer[0];

    return (
        <HashRouter hashType="noslash" basename="/">
            <Route path="/open">
                <Wrapper resReducer={resReducer} /> 
            </Route>
            <Route path="/" exact>
                <div className='bit_widget'>
                    <Link to="/open" className="bit_widget-toggler">Open</Link>
                </div>
            </Route>
        </HashRouter>
    );
}


export default App;


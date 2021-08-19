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
                    script: action.script
                }
            case 'GET_DATA':
                return {
                    ...state,
                    data: action.data
                }
            case 'SET_DOCTOR':
                return {
                    ...state,
                    doctor: action.id
                }
            case 'SET_SCHEDULE':
                return {
                    ...state,
                    schedule: action.data
                }
            case 'SET_CODE':
                return {
                    ...state,
                    code: action.code
                }
            case 'SET_FORMATTER':
                return {
                    ...state,
                    serviceFormatter: action.serviceFormatter
                }
            case 'SET_SERVICE':
                return {
                    ...state,
                    service: action.service
                }
            case 'SET_NOT_SERVICE':
                return {
                    ...state,
                    notService: action.data
                }
            case 'CLEAR_STORE':
                return {
                    ...state,
                    data: state.data,
                    formData: state.formData,
                    final: state.final
                }
            case 'SET_FORM_DATA':
                return {
                    ...state,
                    formData: action.data,
                    final: true
                }
            default:
                return state;
        }
    }
    const initialState = {
        sex: null,
        script: null,
        data: null,
        service: null,
        services: null,
        notService: false,
        formData: null,
        code: null,
        schedule: 1
    }
    const resReducer = useReducer(reducer, initialState);
    window.store = resReducer[0];

    return (
        <HashRouter hashType="noslash" basename="/">
            <Route path="/" exact>
                <div className='bit_widget'>
                    <Link to="/open" className="bit_widget-toggler">Open</Link>
                </div>
            </Route>
            <Route path="/result/:result?">
                <Result commonState={resReducer} />
            </Route>
            <Route path="/open/:id?">
                <Wrapper resReducer={resReducer} /> 
            </Route>
        </HashRouter>
    );
}


export default App;


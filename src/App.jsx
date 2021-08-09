import { HashRouter, Link, Route } from 'react-router-dom';
import { useReducer } from 'preact/hooks';
import Wrapper from './components/Main/Wrapper';
import "./style.css";

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
            default:
                return state;
        }
    }
    const initialState = {
        sex: null,
        script: null,
        data: null
    }
    const resReducer = useReducer(reducer, initialState);

    return (
        <HashRouter hashType="noslash" basename="/">
            <Route path="/" exact>
                <div className='bit_widget'>
                    <Link to="/open" className="bit_widget-toggler">Open</Link>
                </div>
            </Route>
            <Route path="/open/:id?">
                <Wrapper resReducer={resReducer} /> 
            </Route>
        </HashRouter>
    );
}


export default App


import { useEffect } from 'react';
import { getData, sendData } from '../../api/api';
import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import loader from '../../images/load.gif';
import Bread from '../Bread/Bread';
import Script from '../Script/Script';
import SpecialistScript from '../Script/SpecialistScript';
import { ServiceFormatter } from '../../utils/utils'
import ServiceScript from '../Script/ServiceScript';
import RedirectBlock from '../Search/RedirectBlock';
import Result from './Result';

const Wrapper = (props) => {

    const [state, dispatch] = props.resReducer;
    const history = useHistory();
    const location = useLocation();

    const onSubmit = async (values) => {
        const payload = {
            name: values.name.trim(),
            surname: values.surname.trim(),
            number: values.number,
            service_id: state.service.id,
            doctor_id: state.doctor.id,
            dateTime: state.dateTime
        }
        const result = await sendData(props.resReducer, payload);
        if (result) {
            dispatch({type: 'SET_FINAL_STATE', payload: values});
            history.push('/open/result/success');
        } else {
            history.push('/open/result/error');
        }
        const isDataLoaded = await getData(props.resReducer);
        if (!isDataLoaded) {
            history.push('/open/result/error');
        }
    }

    const serviceFormatter = ServiceFormatter.getInstance(state);
    
    useEffect(() => {
        dispatch({type: 'SET_BREAD', payload: serviceFormatter.getBread(location, state)});
        if (state.isDataLoaded) {
            history.listen((loc) => {
                dispatch({type: 'SET_BREAD', payload: serviceFormatter.getBread(loc, state)});
            })
        }
    }, [state.isDataLoaded]);

    const loadData = async () => {
        if (!state.isDataLoaded) {
            const result = await getData(props.resReducer);
            if (!result) {
                history.push('/open/result/error');
            }
        }
    }
 
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = "0";
        document.body.style.left = "0";
        return () => {
            document.body.style.overflowY = "auto";
            document.body.style.position = "static";
        }
    }, [])

    return (
        <div className='bit_widget bit_widget_open'>
            <div className="bit_container">
                <Header select={true} state={props.resReducer} /> 
                <Bread commonState={props.resReducer} />
                {state.isDataLoaded
                    ?   ( 
                            <Switch>
                                <Route path="/open" exact>
                                    <Script commonState={props.resReducer} />
                                </Route>
                                <Route path="/open/specialists">
                                    <SpecialistScript onSubmit={onSubmit} name="specialist" commonState={props.resReducer} />
                                </Route>
                                <Route path="/open/services">
                                    <ServiceScript onSubmit={onSubmit} commonState={props.resReducer} />
                                </Route>
                                <Route path="/open/result/:result">
                                    <Result commonState={props.resReducer} />
                                </Route>
                                <Route path="/open/:id">
                                    <RedirectBlock commonState={props.resReducer} />
                                </Route>
                            </Switch>
                        )
                    : <img src={loader} alt="Загрузка" className="bit_loader" />}                    
            </div>
        </div>
    );
}

export default Wrapper;
import { useEffect } from 'preact/hooks';
import { getData, getSchedule } from '../../api/api';
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

    const getBody = (values) => {
        return {
            service_id: values.service.id,
            doctor_id: values.doctor.id,
            dateTime: values.dateTime,
            number: values.number,
            name: values.name,
            surname: values.surname,
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

    useEffect(() => {
        if (!state.isDataLoaded) {
            getData(props.resReducer);
        }
        if (!state.schedule) {
            getSchedule(props.resReducer);
        }
    }, []);

    return (
        <div className='bit_widget bit_widget_open'>
            <div className="bit_container">
                <Header select={true} state={props.resReducer} />   
                <Bread commonState={props.resReducer} />
                {state.isDataLoaded && state.schedule
                    ?   ( 
                            <Switch>
                                <Route path="/open" exact>
                                    <Script commonState={props.resReducer} />
                                </Route>
                                <Route path="/open/specialists">
                                    <SpecialistScript name="specialist" commonState={props.resReducer} />
                                </Route>
                                <Route path="/open/services">
                                    <ServiceScript commonState={props.resReducer} />
                                </Route>
                                <Route path="/open/result/:result">
                                    <Result />
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
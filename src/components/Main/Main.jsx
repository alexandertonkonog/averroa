import { useState, useEffect } from 'preact/hooks';
import { useParams, useHistory, Switch, Route } from 'react-router-dom';
import Script from '../Script/Script';
import SpecialistScript from '../Script/SpecialistScript';
import Specialist from '../Specialist/Specialist';
import Wizard from './Wizard';
import { ServiceFormatter } from '../../utils/utils'
import Block from '../Block/Block';
import DateTime from '../DateTime/DateTime';
import Personal from '../Personal/Personal';
import Confirm from '../Confirm/Confirm';
import { sendData } from '../../api/api';

const Main = ({state}) => {
    const history = useHistory();
    const [commonState, dispatch] = state;
    const params = useParams();
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
    const onSubmit = async (values, form) => {
        console.log(values);
        const body = getBody(values);
        const result = await sendData(state, body);
        dispatch({type: 'CLEAR_STORE'});
        dispatch({type: 'SET_FORM_DATA', data: values});
        if (result) {
            history.push('/result/success');
            form.restart();
        } else {
            history.push('/result/error');
        }
    }
    
    const options = {
        doctor: commonState.doctor,
        sex: commonState.sex
    }   

    const serviceFormatter = ServiceFormatter.getInstance(commonState);

    let [page, setPage] = useState(0);
    let [serviceList, setServiceList] = useState([serviceFormatter.getTree(options)]);
    let [values, setValues] = useState({
        doctor: commonState.doctor,
        script: commonState.script
    });

    const searchCallback = (item) => {
        const [elements, pages] = serviceFormatter.getPagesById(item);
        setServiceList(pages);
        if (commonState.script === 1) {
            setPage(elements.length + 1);
        } else {
            setPage(elements.length);
        }
        return elements;
    }

    const callback = (item, level) => {
        if (!item.isDirectory) {
            dispatch({type: 'SET_SERVICE', id: item});
        } else {
            const dirtyServiceList = [...serviceList].filter((_, index) => index < (level + 1));
            const nextStage = item.children;
            dirtyServiceList[level + 1] = nextStage;
            setServiceList(dirtyServiceList);
        }
    }

    const filterCallback = () => {
        const list = [...serviceList];
        list[0] = serviceFormatter.getTree(options);
        setServiceList(list);
        if (commonState.script === 1) {
            if (page > 2) {
                setPage(2);
            }
        } else {
            if (page > 1) {
                setPage(1);
            }
        }
        // const formValues = window.firstbit.form.getState().values;
        // for (let key in formValues) {
        //     if (key.includes('block')) {
        //         window.firstbit.form.change(key, null)
        //     }
        // }
    }

    useEffect(() => {
        filterCallback();
    }, [commonState.sex]);

    useEffect(() => {
        if (commonState.script === 1) {
            filterCallback();
        }
    }, [commonState.doctor]);

    useEffect(() => {
        if (params.id) {
            const elem = commonState.data.services.find(item => item.id === params.id);
            if (elem) {
                dispatch({type: 'CHANGE_SCRIPT', script: 2})
                searchCallback(elem);
            }
        }
    }, [params.id]);

    return (
        <div className="bit_main">
            <Switch>
                <Route path="/open" exact>
                    <Script name="script" commonState={state} valuesCallback={setValues} />
                </Route>
                <Route path="/open/specialist">
                    <SpecialistScript name="specialist" commonState={state} valuesCallback={setValues} />
                </Route>
                <Route path="/open/service">
                    <Script name="script" commonState={state} valuesCallback={setValues} />
                </Route>
            </Switch>
            {/* <Wizard
                pageState={[page, setPage]}
                values={[values, setValues]} 
                onSubmit={onSubmit}
                commonState={state}
                serviceList={serviceList}
                setServiceList={setServiceList}>
                    
                    {commonState.script === 1 
                        ?   [
                            <Specialist name="doctor" commonState={state} />,
                            serviceList.map((item, index) => (
                                <Block
                                    name={"block" + index}
                                    key={index}
                                    commonState={commonState}
                                    data={item} 
                                    level={index}
                                    callback={callback}
                                    searchCallback={searchCallback}
                                    dispatch={dispatch} />
                            ))
                        ]   
                        :   [serviceList.map((item, index) => (
                                <Block
                                    name={"block" + index}
                                    commonState={commonState}
                                    key={index}
                                    data={item} 
                                    level={index}
                                    dispatch={dispatch}
                                    searchCallback={searchCallback}
                                    callback={callback} />
                            )),
                            <Specialist name="doctor" commonState={state} />]
                        }
                    <DateTime name={['date', 'time', 'dateTime']} commonState={state} />
                    <Personal name={['name', 'surname', 'number']} commonState={state} />
                    <Confirm name='code' commonState={state} />
            </Wizard> */}
        </div>
    )
}

export default Main;
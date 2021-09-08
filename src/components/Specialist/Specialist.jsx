import { useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import BlockBack from '../Block/BlockBack';
import { reachGoal } from '../../utils/utils';

const Specialist = (props) => {

    let [state, dispatch] = props.commonState;

    let doctors = state.doctors;
    
    const location = useLocation();
    const service = state.service;
    if (service) {
        doctors = doctors.filter(item => item.services.includes(service.id));
    }

    doctors = [{id: 0, name: 'Назад', back: true, link: props.link}, ...doctors];

    const user = <svg version="1.1" className="bit_list__item-img" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 349.667 349.667" style={{"enableBackground":"new 0 0 349.667 349.667;"}} >
    <g>
    <path d="M174.833,197.204c24.125,0,80.846-29.034,80.846-98.603C255.68,44.145,248.329,0,174.833,0
        c-73.495,0-80.846,44.145-80.846,98.602C93.987,168.17,150.708,197.204,174.833,197.204z M106.07,82.146
        c5.679-10.983,17.963-23.675,44.381-23.112c0,0,15.746,38.194,93.05,21.042c0.312,6.101,0.41,12.326,0.41,18.526
        c0,34.005-15.015,55.075-27.612,66.762c-15.872,14.727-33.494,20.072-41.466,20.072c-7.972,0-25.594-5.345-41.466-20.072
        c-12.597-11.687-27.612-32.757-27.612-66.762C105.756,93.101,105.836,87.581,106.07,82.146z"/>
    <path d="M324.926,298.327c-4.127-25.665-12.625-58.724-29.668-70.472c-11.638-8.024-52.243-29.718-69.582-38.982l-0.3-0.16
        c-1.982-1.059-4.402-0.847-6.17,0.541c-9.083,7.131-19.033,11.937-29.573,14.284c-1.862,0.415-3.39,1.738-4.067,3.521
        l-10.733,28.291l-10.733-28.291c-0.677-1.783-2.205-3.106-4.067-3.521c-10.54-2.347-20.49-7.153-29.573-14.284
        c-1.768-1.388-4.188-1.601-6.17-0.541c-17.133,9.155-58.235,31.291-69.831,39.107c-19.619,13.217-28.198,61.052-29.718,70.507
        c-0.151,0.938-0.063,1.897,0.253,2.792c0.702,1.982,18.708,48.548,149.839,48.548s149.137-46.566,149.839-48.548
        C324.989,300.224,325.077,299.264,324.926,298.327z M264.5,282.666l-25.667,8l-25.667-8v-13.81H264.5V282.666z"/>
    </g>

    </svg>;
    const link = state.script === 1 ? '/open/specialists/services' : location.pathname + '/date';

    useEffect(() => {
        if (state.script === 1 && state.service) {
            dispatch({type: 'SET_SERVICE', payload: null})
        }
    }, [])

    useEffect(() => {
        reachGoal('widget_doctor');
    }, [])
    
    if (state.script === 2 && !state.service) {
        return <Redirect to="/open" />
    }

    return (
        <>
            <h2 className="bit_title bit_title_second">Выберите специалиста</h2>
            <section className="bit_block bit_block_specialist bit_specialist">
                <div>
                    <ul className="bit_list bit_shadow">
                        {doctors.map(item => {
                            if (item.back) {
                                return <BlockBack state={state} key={item.id} item={item} />
                            }
                            return (
                                <Link to={link}>
                                    <li 
                                        key={item.id} 
                                        onClick={() => {
                                            dispatch({type: 'SET_DOCTOR', id: item});
                                        }}
                                        className={state.doctor && state.doctor.id === item.id
                                            ? "bit_list__item bit_list__item_active"
                                            : "bit_list__item"}>
                                            <p className="bit_list__item_spec bit_list__item-name">
                                                {item.img 
                                                    ? <img 
                                                        src={item.img} 
                                                        alt={item.name} 
                                                        title={item.name} 
                                                        className="bit_list__item-img" />
                                                    : user
                                                }
                                                {item.name}
                                            </p>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Specialist;
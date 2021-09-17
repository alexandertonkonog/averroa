import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reachGoal } from '../../utils/utils';

const Script = (props) => {

    const user = <svg version="1.1" className="bit_script__logo bit_script__logo_user" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 349.667 349.667" style={{"enableBackground":" new 0 0 349.667 349.667;"}} >
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
    const scissors = <svg version="1.1" className="bit_script__logo bit_script__logo_service" xmlns="http://www.w3.org/2000/svg"
            width="32.439px" height="32.439px" viewBox="0 0 32.439 32.439" style={{"enableBackground":"new 0 0 32.439 32.439;"}}>
        <g>
        <path d="M16.977,24.209c-0.342-0.307-0.734-0.529-1.155-0.677l1.994-7.005l0.524-0.122c0,0,13.814-1.547,13.545-8
            c-0.331-0.444-12.238,4.35-12.238,4.35l-0.844,0.299l0.16-0.563c0,0,4.03-12.188,3.566-12.491
            c-6.458,0.141-7.125,14.025-7.125,14.025l-0.042,0.249L8.797,16.6c-0.14-0.194-0.298-0.377-0.481-0.543
            c-1.666-1.497-4.5-1.068-6.317,0.955c-1.817,2.022-1.941,4.885-0.275,6.383c1.666,1.496,4.5,1.067,6.317-0.955
            c1.063-1.185,1.542-2.654,1.427-3.972l5.405-1.257l-1.028,6.16c-1.134,0.179-2.285,0.789-3.186,1.791
            c-1.817,2.023-1.94,4.887-0.274,6.384s4.5,1.068,6.317-0.955C18.519,28.568,18.642,25.706,16.977,24.209z M7.071,21.568
            c-1.337,1.488-3.345,1.871-4.475,0.855s-0.963-3.053,0.374-4.541c1.336-1.486,3.344-1.871,4.475-0.855
            C8.575,18.043,8.407,20.08,7.071,21.568z M16.709,15.688c-0.377-0.338-0.408-0.919-0.069-1.296
            c0.338-0.376,0.918-0.407,1.295-0.069c0.378,0.338,0.408,0.919,0.07,1.295C17.666,15.996,17.086,16.025,16.709,15.688z
                M11.257,30.576c-1.131-1.016-0.964-3.053,0.373-4.541s3.344-1.871,4.475-0.855c1.131,1.017,0.963,3.053-0.374,4.541
            C14.394,31.208,12.387,31.592,11.257,30.576z"/>
        </g>

        </svg>;
    
    const data = [
        {id: 1, link: '/specialists', name: 'По специалистам', logo: user, callback: () => {}},
        {id: 2, link: '/services', name: 'По услугам', logo: scissors, callback: () => {}}
    ];
    const [state, dispatch] = props.commonState;

    useEffect(() => {
        reachGoal('widget_script');
    }, [])

    return (
        <>
            <h2 className="bit_title bit_title_second">Выберите сценарий записи</h2>
            <section className="bit_script">
                <div className="bit_script__list">
                    {data.map(item => (
                        <Link
                            to={'/open' + item.link}
                            className="bit_script__item bit_shadow"
                            key={item.id} 
                            onClick={() => {
                                dispatch({type: 'CHANGE_SCRIPT', script: item.id});
                                dispatch({type: 'SET_DOCTOR', id: null});
                            }}>
                            {item.logo}
                            <h3 className="bit_title bit_title_text">{item.name}</h3>                    
                        </Link>  
                    ))}
                </div>
            </section>
        </>
    )
}

export default Script;
import { useEffect } from 'preact/hooks';
import { getData, getSchedule } from '../../api/api';
import Header from '../Header/Header';
import Main from '../Main/Main';
import loader from '../../images/load.gif'

const Wrapper = (props) => {

    const [state, dispatch] = props.resReducer;

    useEffect(() => {
        getData(props.resReducer);
        getSchedule(props.resReducer);
    }, [])

    return (
        <div className='bit_widget bit_widget_open'>
            <div className="bit_container">
                <Header select={true} state={props.resReducer} />   
                {state.data && state.schedule
                    ? <Main state={props.resReducer} />
                    : <img src={loader} alt="Загрузка" className="bit_loader" />}                    
            </div>
        </div>
    );
}

export default Wrapper;
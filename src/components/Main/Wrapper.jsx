import { useEffect } from 'preact/hooks';
import { getData } from '../../api/api';
import Header from '../Header/Header';
import Main from '../Main/Main';
import loader from '../../images/load.gif'

const Wrapper = (props) => {
    useEffect(() => {
        getData(props.resReducer);
    }, [])
    const [state] = props.resReducer;
    return (
        <div className='bit_widget bit_widget_open'>
            <div className="bit_container">
                <Header state={props.resReducer} />
                {state.data 
                    ? <Main state={props.resReducer} />
                    : <img src={loader} alt="Загрузка" className="bit_loader" />}
            </div>
        </div>
    );
}

export default Wrapper;
import { Link, Route, useHistory } from 'react-router-dom';
import logo from '../../images/close.svg';
import Search from '../Search/Search';

const Header = ({ state, select }) => {
    const [{sex, script, isDataLoaded}, dispatch] = state;
    const history = useHistory();
    const chooseSex = (id) => {
        dispatch({type: 'CHANGE_SEX', sex: id});
        if (history.location.pathname )
        if (script === 1) {
            history.push('/open/specialists/services');
        } else {
            history.push('/open/services');
        }
    }
    return (
        <div className="bit_header-container">
            <header className="bit_header">
                <h1 className="bit_title bit_title_main bit_header__title">
                    {script === 1 ? 'Запись на прием' : 'Запись на услугу'}
                </h1>
                {isDataLoaded && <Search commonState={state} />}
                <Link className="bit_header__exit" to="/">
                    <img src={logo} alt="Закрыть окно" title="Закрыть окно" className="bit_header__exit-logo" />
                </Link>
            </header>
        </div>
    )
}

export default Header;
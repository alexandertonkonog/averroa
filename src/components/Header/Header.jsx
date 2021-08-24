import { Link, Route, useHistory } from 'react-router-dom';
import logo from '../../images/close.svg';
import Select from '../Select/Select';

const Header = ({ state, select }) => {
    const [{sex, script}, dispatch] = state;
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
                    Запись на прием
                </h1>
                <Route path={["/open/services", "/open/specialists/services"]}>
                    <Select 
                        addClass="bit_header__select" 
                        callback={chooseSex} 
                        value={sex} 
                        state={state} 
                        title="Выберите пол" />
                </Route>   
                <Link className="bit_header__exit" to="/">
                    <img src={logo} alt="Закрыть окно" title="Закрыть окно" className="bit_header__exit-logo" />
                </Link>
            </header>
        </div>
    )
}

export default Header;
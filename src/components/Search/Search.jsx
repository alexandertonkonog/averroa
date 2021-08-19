import { useState, useEffect } from 'preact/hooks';
import { ServiceFormatter } from '../../utils/utils'
import logo from '../../images/search.svg';
import exit from '../../images/close.svg';

const Search = (props) => {
    let [s, setS] = useState('');
    
    const callback = (e) => {
        const val = e.target.value;
        setS(val);
    }

    const searchClickCallback = (elem) => {
        const elements = props.callback(elem);
        setS('');
        elements.forEach((item, index) => {
            props.form.change('block' + index, item.id);
            if (!item.isDirectory) {
                props.form.change('service_id', item.id);
            }
        })
    }

    const serviceFormatter = ServiceFormatter.getInstance();
    const servicesArray = serviceFormatter.getServicesByName(s);

return (
        <div className="bit_search-container">
            <div className="bit_search__header">
                <input 
                    type="text" 
                    value={s}
                    onInput={callback}
                    className="bit_search bit_input" 
                    title="Поиск по услугам" 
                    placeholder="Поиск..." />
                <img src={logo} alt="Поиск по услугам" title="Поиск по услугам" className="bit_search__icon" />
                {s?.length > 2 && <img 
                    src={exit}
                    onClick={() => setS('')}
                    alt="Сбросить" 
                    title="Сбросить" 
                    className="bit_search__icon_exit" />}
            </div>
            {servicesArray && <ul className="bit_search__list">
                {servicesArray.map(item => (
                    <li 
                        className="bit_search__list-item"
                        onClick={() => searchClickCallback(item)}>
                        {item.name}
                        <span className="bit_list__item-des">
                            {item.isDirectory
                                ? 'Группа'
                                : 'Услуга'
                            }
                        </span>
                    </li>
                ))}
            </ul>}
        </div>
    )
}

export default Search;
import { Link } from "react-router-dom";
import { DateFormatter } from '../../utils/utils';

const BlockService = ({item, callback, link, state}) => {

    return (
        <Link to={link}>
            <li 
                onClick={() => {
                    if (callback) {
                        callback(item);
                    }
                }}
                className={ state.activeBlock === item.id || (state.service && (state.service.id === item.id)) 
                    ? "bit_list__item bit_list__item_active"
                    : "bit_list__item"}>
                    <div className="bit_list__item-left">
                        <p className="bit_list__item-name">{item.name}</p>
                        <p className="bit_list__item-conditions">
                            <span className="bit_list__item-cost">{ item.cost } р</span>
                            <span className="bit_list__item-time">
                                { DateFormatter.getMinutes(new Date(item.duration)) } минут
                            </span>
                        </p>
                    </div>
            </li>
        </Link>
    );  
}

export default BlockService;
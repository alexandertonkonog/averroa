import { Link } from "react-router-dom";

const BlockGroup = ({item, callback, link, state}) => {
    return (
        <Link to={link + item.id}>
            <li 
                onClick={() => {
                    if (callback) {
                        callback(item);
                    }
                }}
                className={state.activeBlock === item.id ? "bit_list__item bit_list__item_active" : "bit_list__item"}>
                    {item.name}
                    <span className="bit_list__item-des">Группа</span>
            </li>
        </Link>
    );
}

export default BlockGroup;
import { useHistory } from "react-router-dom";

const BlockBack = ({state}) => {

    const history = useHistory();

    return (
        <li  
            onClick={() => {
                history.push(state.bread[state.bread.length - 2].link);
            }}
            className="bit_list__item">
                Назад
        </li>
    );
}

export default BlockBack;
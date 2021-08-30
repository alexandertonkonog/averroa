import { useHistory } from "react-router-dom";
import Back from "./Back";

const BlockBack = ({state}) => {

    const history = useHistory();

    return (
        <li>
            <Back state={state} />
        </li>
    );
}

export default BlockBack;
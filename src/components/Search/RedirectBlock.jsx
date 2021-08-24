import { useEffect } from "preact/hooks";
import { Redirect, useParams } from "react-router-dom";
import { getData } from "../../api/api";
import { ServiceFormatter } from "../../utils/utils";
import loader from '../../images/load.gif';

const RedirectBlock = ({commonState}) => {
    const params = useParams();
    const [state, dispatch] = commonState;

    useEffect(() => {
        if (!state.isDataLoaded) {
            getData(commonState);
        }
    }, []);

    dispatch({type: 'SET_BLOCK', payload: params.id});

    if (!state.isDataLoaded) {
        return <img src={loader} alt="Загрузка" className="bit_loader" />;
    }

    const serviceFormatter = ServiceFormatter.getInstance();
    const link = serviceFormatter.getSearchLink(params.id, state);
    
    if (link) {
        return <Redirect to={link} />
    } else {
        return <Redirect to='/open' />
    } 
}

export default RedirectBlock;
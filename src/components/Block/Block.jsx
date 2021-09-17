import { useEffect } from 'react';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import { ServiceFormatter, reachGoal } from '../../utils/utils';

import BlockGroup from './BlockGroup';
import BlockService from './BlockService';
import BlockBack from './BlockBack';

const Block = (props) => {

    const params = useParams();
    const location = useLocation();
    const [state, dispatch] = props.commonState;
    const serviceFormatter = ServiceFormatter.getInstance();

    const backBlock = {id: 0, name: 'Назад', back: true, link: '/open'};

    const data = [backBlock, ...serviceFormatter.getStageServices(params, state)];

    const serviceCallback = (item) => {
        dispatch({type: 'SET_SERVICE', payload: item})
    }

    const groupLink = state.script === 1 ? '/open/specialists/services/' : '/open/services/';
    const addLink = state.script === 1 ? '/date' : '/specialists';
    const serviceLink = location.pathname + addLink;

    useEffect(() => {
        if (state.script === 2 && state.doctor) {
            dispatch({type: 'SET_DOCTOR', payload: null})
        }
    }, [])

    useEffect(() => {
        reachGoal('widget_service');
    }, [])

    if (state.script === 1 && !state.doctor) {
        return <Redirect to="/open" />
    }

    return (
        <>
            <div className="bit_block__header">
                <h2 className="bit_title bit_title_second">Выберите из группы услуг</h2>
                
            </div>
            <section className="bit_block bit_block_service">
                {data.length
                    ?   <ul className="bit_list bit_shadow">
                            {data.map(item => {
                                if (item.isDirectory) {
                                    return <BlockGroup key={item.id} item={item} link={groupLink} state={state} />
                                } else if (item.back) {
                                    return <BlockBack state={state} key={item.id} />
                                }
                                return <BlockService key={item.id} state={state} link={serviceLink} item={item} callback={serviceCallback} />
                            })}
                        </ul>
                    :   <p className="bit_text bit_text_info bit_info">Нет услуг c этими признаками</p>
                }
            </section>
        </>
    )
}

export default Block;
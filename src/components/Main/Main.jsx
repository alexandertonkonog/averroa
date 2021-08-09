import { useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import Script from '../Script/Script';
import Specialist from '../Specialist/Specialist';
import Wizard from './Wizard';
import { formatService } from '../../utils/utils'
import Block from '../Block/Block';

const Main = ({state}) => {
    const initialValues = {};
    const params = useParams();
    const onSubmit = (values) => {
        console.log(values)
    }
    const services = state[0].data.services;
    let pageState = useState(0);
    let [serviceList, setServiceList] = useState([formatService(services)])
    console.log(pageState)
    // не переходит на предыдущий этап с 3го (2)
    return (
        <div className="main">
            <Wizard pageState={pageState} initialValues={initialValues} onSubmit={onSubmit}>
                <Script commonState={state} />
                <Specialist commonState={state} />
                {serviceList.map(item => (
                    <Block data={item} commonState={state} />
                ))}
            </Wizard>
        </div>
    )
}

export default Main;
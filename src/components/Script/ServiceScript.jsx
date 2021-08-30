import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Block from "../Block/Block";
import Specialist from "../Specialist/Specialist";
import DateTime from "../DateTime/DateTime";
import Personal from "../Personal/Personal";
import Confirm from "../Confirm/Confirm";
import Wizard from "../Main/Wizard";

const ServiceScript =  (props) => {

    const [state, dispatch] = props.commonState;

    useEffect(() => {
        dispatch({type: 'CHANGE_SCRIPT', script: 2})
    }, [])

    return (
        <Switch>
            <Route path="/open/services/:id/specialists/date/personal/confirm" >
                <Confirm commonState={props.commonState} />
            </Route>
            <Route path="/open/services/:id/specialists/date/personal" >
                <Wizard onSubmit={props.onSubmit} commonState={props.commonState}>
                    <Personal commonState={props.commonState} />
                    <Confirm onSubmit={props.onSubmit} commonState={props.commonState} />
                </Wizard>
            </Route>
            <Route path="/open/services/:id/specialists/date" >
                <DateTime commonState={props.commonState} />
            </Route>
            <Route path="/open/services/:id/specialists" >
                <Specialist commonState={props.commonState} />
            </Route>
            <Route path="/open/services/:id?" >
                <Block
                    commonState={props.commonState} />
            </Route>
            <Route path="/open/services" exact>
                <Block
                    commonState={props.commonState} />
            </Route>
        </Switch>
    )
}

export default ServiceScript;
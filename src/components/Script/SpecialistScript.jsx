import { useEffect } from "preact/hooks";
import { Route, Switch } from "react-router-dom";
import Block from "../Block/Block";
import Specialist from "../Specialist/Specialist";
import DateTime from "../DateTime/DateTime";
import Personal from "../Personal/Personal";
import Confirm from "../Confirm/Confirm";
import Wizard from "../Main/Wizard";

const SpecialistScript =  (props) => {

    const [state, dispatch] = props.commonState;

    useEffect(() => {
        dispatch({type: 'CHANGE_SCRIPT', script: 1})
    }, [])

    return (
        <Switch>
            <Route path="/open/specialists/services/:id/date/personal/confirm" >
                <Confirm commonState={props.commonState} />
            </Route>
            <Route path="/open/specialists/services/:id/date/personal" >
                <Wizard onSubmit={props.onSubmit} commonState={props.commonState}>
                    <Personal commonState={props.commonState} />
                    <Confirm commonState={props.commonState} />
                </Wizard>
            </Route>
            <Route path="/open/specialists/services/:id/date" >
                <DateTime commonState={props.commonState} />
            </Route>
            <Route path="/open/specialists/services/:id?" >
                <Block
                    commonState={props.commonState} />
            </Route>
            <Route path="/open/specialists/services" >
                <Block
                    commonState={props.commonState} />
            </Route>
            <Route path="/open/specialists" exact>
                <Specialist commonState={props.commonState} />
            </Route>
        </Switch>
    )
}

export default SpecialistScript;
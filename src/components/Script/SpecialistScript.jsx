import { Route, Switch } from "react-router-dom";
import Block from "../Block/Block";
import Specialist from "../Specialist/Specialist";

const SpecialistScript = (props) => {
    return (
        <Switch>
            <Route path="/open/specialist" exact>
                <Specialist name="specialist" commonState={props.commonState} />
            </Route>
            <Route path="/open/specialist/:id?">
                {/* <Wizard
                    pageState={[page, setPage]}
                    values={[values, setValues]} 
                    onSubmit={onSubmit}
                    commonState={state}
                    serviceList={serviceList}
                    setServiceList={setServiceList}>
                        {serviceList.map((item, index) => (
                            <Block
                                name={"block" + index}
                                key={index}
                                commonState={commonState}
                                data={item} 
                                level={index}
                                callback={callback}
                                searchCallback={searchCallback}
                                dispatch={dispatch} />
                        ))}
                </Wizard> */}
            </Route>
        </Switch>
    )
}

export default SpecialistScript;
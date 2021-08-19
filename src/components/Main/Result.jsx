import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import ErrorResult from "../Result/ErrorResult";
import Success from "../Result/Success";

const Result = (props) => {
    const params = useParams();
    return (
        <div className="bit_widget bit_widget_open">
            <div className="bit_container">
                <Header select={false} state={props.commonState} />
                {params.result === 'success'
                    ? <Success commonState={props.commonState} />
                    : <ErrorResult />
                }
            </div>
        </div>
    )
}

export default Result;
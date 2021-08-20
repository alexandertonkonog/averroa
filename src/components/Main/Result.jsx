import { useParams } from "react-router-dom";
import ErrorResult from "../Result/ErrorResult";
import Success from "../Result/Success";

const Result = (props) => {
    const params = useParams();

    if (params.result === 'success') {
        return <Success commonState={props.commonState} />
    } 

    return <ErrorResult />

}

export default Result;
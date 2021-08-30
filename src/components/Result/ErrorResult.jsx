import { Link, Redirect } from "react-router-dom"


const ErrorResult = ({commonState}) => {
    const [state, dispatch] = commonState;

    if (!state.error) {
        return <Redirect to="/open" />
    }

    return (
        <div className="bit_block">
            <div className="bit_result">
                <h2 className="bit_title">Произошла ошибка!</h2>
                <p className="bit_text">Попробуйте записаться еще раз. Если запись не произошла, перезагрузите страницу или зайдите позднее</p>
                <Link to="/open" onClick={() => dispatch({type: "SET_ERROR", payload: false})}>
                    <button className="bit_btn">Записаться еще раз</button>
                </Link>
            </div>
        </div>
    );
}

export default ErrorResult;
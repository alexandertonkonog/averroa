import { Link, Redirect } from "react-router-dom";
import { DateFormatter } from '../../utils/utils';

const Success = (props) => {

    const { resultState } = props.commonState[0];

    if (!resultState) {
        return <Redirect to="/open" />;
    }

    const stdDate = DateFormatter.getStandardDate(new Date(resultState.dateTime));
    const stdTime = DateFormatter.getStandardTime(new Date(resultState.dateTime));

    return (
        <div className="bit_block">
            <div className="bit_result">
                <h2 className="bit_title">Вы успешно записались на прием! </h2>
                <p className="bit_text">Специалист {resultState.doctor.name} ожидает Вас {stdDate} в {stdTime}</p>
                <Link to="/open">
                    <button className="bit_btn">Записаться еще раз</button>
                </Link>
            </div>
            
        </div>
    );
}

export default Success;
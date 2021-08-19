import { Link, Redirect } from "react-router-dom";
import { DateFormatter } from '../../utils/utils';

const Success = (props) => {
    const { doctor, formData, final } = props.commonState[0];
    if (!final) {
        return <Redirect to="/open" />;
    }

    const stdDate = DateFormatter.getStandardDate(new Date(formData.date));
    const stdTime = DateFormatter.getStandardTime(new Date(formData.time));
    return (
        <div className="bit_block">
            <h2 className="bit_title">Вы успешно записались на прием {stdDate} в {stdTime} к специалисту {doctor.name}</h2>
            <Link to="/open">
                <button className="bit_btn">Записаться еще раз</button>
            </Link>
        </div>
    );
}

export default Success;
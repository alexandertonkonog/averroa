import { Link } from "react-router-dom"


const ErrorResult = () => {
    return (
        <div className="bit_block">
            <h2 className="bit_title">Произошла ошибка! Попробуйте записаться еще раз или зайдите позднее</h2>
            <Link to="/open">
                <button className="bit_btn">Записаться еще раз</button>
            </Link>
        </div>
    );
}

export default ErrorResult;
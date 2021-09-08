import { useEffect } from 'react';
import { isLength, isRequired } from "../../validate/validate";
import Input from "../Input/Input";
import NumberInput from "../Input/Number";
import Checkbox from "../Input/Checkbox";
import user from '../../images/user.svg';
import { DateFormatter, reachGoal } from "../../utils/utils";
import { Redirect } from "react-router-dom";
import Back from "../Block/Back";

const Personal = (props) => {
    const [state, dispatch] = props.commonState;
    const fields = [
        {id: 1, name: 'name', label: 'Введите имя', validate: isLength(2, 30, 'имя'), placeholder: 'Ваше имя'},
        {id: 2, name: 'surname', label: 'Введите фамилию', validate: isLength(3, 30, 'фамилия'), placeholder: 'Ваша фамилия'},
    ]
    
    const { service, doctor, dateTime } = state;

    useEffect(() => {
        reachGoal('widget_personal');
    }, [])

    if (!service || !doctor || !dateTime) {
        return <Redirect to="/open" />;
    }

    const stdDate = DateFormatter.getStandardDate(new Date(dateTime));
    const stdTime = DateFormatter.getStandardTime(new Date(dateTime));
    const duration = DateFormatter.getMinutes(new Date(service.duration));
    const img = (doctor && doctor.img) || user;

    return (
        <>
            <h2 className="bit_title bit_title_second">Введите личные данные</h2>
            <Back state={state} />
            <section className="bit_block bit_block_personal">
                <div className="bit_personal bit_shadow">
                    {fields.map(item => <Input key={item.id} {...item} />)}
                    <NumberInput 
                        id={3} 
                        name="number" 
                        label="Введите телефон" 
                        placeholder="Ваш телефон" 
                        validate={isLength(11, 12, 'телефон')} />
                    <Checkbox 
                        id={4} 
                        name="confirm" 
                        label="Я соглашаюсь с политикой конфиденциальности" 
                        validate={isRequired('Необходимо согласие с политикой конфиденциальности')} />
                </div>
                <div className="bit_specialist__more bit_shadow">
                    <div className="bit_personal__header">
                        <img src={img} alt={doctor.name} title={doctor.name} className="bit_specialist__img" />
                        <h3 className="bit_specialist__name">{doctor.name}</h3>
                    </div>
                    <div className="bit_specialist__services bit_specialist__services_script-2">
                        <p className="bit_text">Выбранная услуга:</p>
                        <p className="bit_text bit_specialist__text">{service.name}</p>
                        <p className="bit_text">Длительность:</p>
                        <p className="bit_text bit_specialist__text">{duration} минут</p>
                        <p className="bit_text">Стоимость:</p>
                        <p className="bit_text bit_specialist__text">{service.cost} рублей</p>
                        <p className="bit_text">Дата приема:</p>
                        <p className="bit_text bit_specialist__text">{stdDate} в {stdTime}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Personal;
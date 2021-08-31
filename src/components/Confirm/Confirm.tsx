import { useEffect, useState } from "react";
import { useField, useForm } from "react-final-form";
import { useHistory } from "react-router-dom";
import { sendCode } from "../../api/api";
import { isEqual } from "../../validate/validate";
import Input from "../Input/Input";
import loader from '../../images/load.gif';
import { StateType } from "../../types/state";

type ConfirmProps = {
    onSubmit: (values: object) => void,
    commonState: [state: StateType, dispatch: any]
}

const Confirm = (props: ConfirmProps) => {
    const [state, dispatch] = props.commonState;
    const [loading, setLoading] = useState<boolean>(false);
    const [smsLoading, setSmsLoading] = useState<boolean>(false);

    const history = useHistory();
    const field = useField('number');
    const form = useForm();

    const fields = [
        {id: 1, name: 'code', label: 'Введите код из смс', validate: isEqual(state.code, 'Неправильный код'), placeholder: 'Ваше код'},
    ];

    const sendSMS = async () => {
        if (!state.code) {
            setSmsLoading(true);
            const result = await sendCode(props.commonState, field?.input?.value);
            setSmsLoading(false);
            if (result.error === 3) {
                setLoading(true);
                const values = form.getState().values;
                await props.onSubmit(values);
                setLoading(false);
            } else if (!result.status) {
                history.push('/open/result/error');
            } 
        }
    }

    useEffect(() => {
        sendSMS();
    }, []);

    return (
        <>
            <h2 className="bit_title bit_title_second">Подтверждение номера телефона</h2>
            <section className="bit_block bit_block_confirm">
                {loading || smsLoading
                    ?   <div className="bit_personal bit_shadow">
                            {loading && <p className="bit_text">Не удалось отправить смс-сообщение, запись будет осуществлена автоматически</p>}
                            {smsLoading && <p className="bit_text">Отправка смс-сообщения</p>}
                            <img src={loader} alt="Загрузка" className="bit_loader" />
                        </div>   
                    :   <div className="bit_personal bit_shadow">
                            {fields.map(item => <Input key={item.id} {...item} />)}
                        </div>}
                
            </section>
        </>
    )
}

export default Confirm;
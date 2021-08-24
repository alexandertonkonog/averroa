import { useEffect } from "preact/hooks";
import { useHistory } from "react-router-dom";
import { sendCode } from "../../api/api";
import { isEqual } from "../../validate/validate";
import Input from "../Input/Input";

const Confirm = (props) => {
    const [state, dispatch] = props.commonState;
    const history = useHistory();
    const fields = [
        {id: 1, name: 'code', label: 'Введите код из смс', validate: isEqual(state.code, 'Неправильный код'), placeholder: 'Ваше код'},
    ];
    const sendSMS = async () => {
        if (!state.code) {
            const result = await sendCode(props.commonState);
            if (!result) {
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
                <div className="bit_personal bit_shadow">
                    {fields.map(item => <Input key={item.id} {...item} />)}
                </div>
            </section>
        </>
    )
}

export default Confirm;
import { useEffect } from "preact/hooks";
import { sendCode } from "../../api/api";
import { isEqual } from "../../validate/validate";
import Input from "../Input/Input";

const Confirm = (props) => {
    const [state, dispatch] = props.commonState;
    const fields = [
        {id: 1, name: 'code', label: 'Введите код из смс', validate: isEqual(state.code, 'Неправильный код'), placeholder: 'Ваше код'},
    ];
    useEffect(() => {
        if (!state.code) {
            sendCode(props.commonState);
        }
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
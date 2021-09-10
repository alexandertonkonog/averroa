import { Field } from "react-final-form";
import { IMaskInput } from "react-imask";

const NumberInput = (props) => {
    return (
        <Field name={props.name} validate={props.validate}>
            {({input, meta}) => (
                <div className={props.addClass ? "bit_input-container " + props.addClass : "bit_input-container"}>
                    <p className="bit_input__header">
                        {props.label 
                            &&  <label htmlFor={'input' + props.id} className="bit_input__label">
                                    {props.label} {props.req && <span className="bit_input__label_req">*</span>}
                                </label>}
                        {meta.touched && meta.error && <span className="bit_input__error">{meta.error}</span>}
                    </p>
                    <IMaskInput
                        mask={'+{7}(000)000-00-00'}
                        radix="."
                        value={input.value}
                        unmask={true}
                        name={props.name}
                        className={meta.touched && meta.error 
                            ? "bit_input bit_input_error" 
                            : "bit_input"}
                        onAccept={(value, mask) => {
                            input.onChange(value)
                        }}
                        onFocus={input.onFocus}
                        onBlur={input.onBlur}
                        placeholder={props.placeholder}
                    />
                </div>
            )}         
        </Field>
    )
}

export default NumberInput;
import { Field } from "react-final-form";
import { useRef } from "preact/hooks";
import IMask from "imask";

const NumberInput = (props) => {
    
    const inputRef = useRef();
    const maskOptions = {
        mask: '+{7}(000)000-00-00'
    };
    const mask = inputRef.current && IMask(inputRef.current, maskOptions);
    
    return (
        <Field name={props.name} validate={props.validate}>
            {({input, meta}) => (
                <div className={props.addClass ? "bit_input-container " + props.addClass : "bit_input-container"}>
                    <p className="bit_input__header">
                        {props.label && <label htmlFor={'input' + props.id} className="bit_input__label">{props.label}</label>}
                        {meta.touched && meta.error && <span className="bit_input__error">{meta.error}</span>}
                    </p>
                    <input
                        ref={inputRef}
                        id={'input' + props.id}
                        type="text"
                        className={meta.touched && meta.error 
                            ? "bit_input bit_input_error" 
                            : "bit_input"} 
                        placeholder={props.placeholder}
                        onFocus={input.onFocus}
                        onBlur={(e) => {
                            const val = mask && mask.unmaskedValue;
                            input.onChange(val);
                            input.onBlur(e);
                        }}
                        value={mask ? mask.value : ''} />
                </div>
            )}         
        </Field>
    )
}

export default NumberInput;
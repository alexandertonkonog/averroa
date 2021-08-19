import { Field } from "react-final-form";

const Input = (props) => {
    return (
        <Field name={props.name} validate={props.validate}>
            {({input, meta}) => (
                <div className={props.addClass ? "bit_input-container " + props.addClass : "bit_input-container"}>
                    <p className="bit_input__header">
                        {props.label && <label htmlFor={'input' + props.id} className="bit_input__label">{props.label}</label>}
                        {meta.touched && meta.error && <span className="bit_input__error">{meta.error}</span>}
                    </p>
                    <input 
                        id={'input' + props.id}
                        type="text"
                        placeholder={props.placeholder}
                        className={meta.touched && meta.error 
                            ? "bit_input bit_input_error" 
                            : "bit_input"} 
                        {...input} />
                </div>
            )}         
        </Field>
    )
}

export default Input;
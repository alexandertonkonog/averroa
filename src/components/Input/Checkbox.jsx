import { Field } from "react-final-form";

const Checkbox = (props) => {
    return (
        <Field name={props.name} validate={props.validate} defaultValue={true} type="checkbox">
            {({input, meta}) => (
                <div className={props.addClass ? "bit_input-container bit_input-container_checkbox " + props.addClass : "bit_input-container  bit_input-container_checkbox"}>
                    <p className="bit_input__header">
                        {props.label && <label htmlFor={'input' + props.id} className="bit_input__label">{props.label}</label>}
                        {meta.touched && meta.error && <span className="bit_input__error">{meta.error}</span>}
                    </p>
                    <input
                        id={'input' + props.id}
                        type="checkbox"
                        placeholder={props.placeholder}
                        className={meta.touched && meta.error 
                            ? "bit_input bit_input_checkbox bit_input_error" 
                            : "bit_input bit_input_checkbox"} 
                        {...input} />
                </div>
            )}         
        </Field>
    )
}

export default Checkbox;
import { Field, useField } from 'react-final-form';
import { isRequired } from '../../validate/validate';
import user from '../../images/user.svg';

const Block = (props) => {

    console.log(props.data.some(item => 'parent' in  item));

    return (
        <>
            <h2 className="bit_title bit_title_second">Выберите из группы услуг</h2>
            <section className="bit_specialist">
                <Field name="doctor_id" validate={isRequired('Необходимо выбрать группу услуг')}>
                    {fieldProps => (
                        <div>
                            <ul className="bit_specialist__list bit_list bit_shadow">
                                {props.data.map(item => (
                                    <li 
                                        key={item.id} 
                                        onClick={() => {
                                            fieldProps.input.onChange(item.id);
                                        }}
                                        className={item.id === fieldProps.input.value 
                                            ? "bit_list__item bit_list__item_active"
                                            : "bit_list__item"}>
                                            {item.name}
                                    </li>
                                ))}
                            </ul>
                            {fieldProps.meta.touched && fieldProps.meta.error 
                                && <p className="bit_error">{fieldProps.meta.error}</p>}
                        </div>
                    )}
                </Field>
                {/* {doctor && <div className="bit_specialist__more bit_shadow">
                    <img className="bit_specialist__img" src={doctor.img ? doctor.img : user} alt={doctor.name} title={doctor.name} />
                    <h3 className="bit_title bit_title_text bit_specialist__name">{doctor.name}</h3>
                </div>} */}
            </section>
        </>
    )
}

export default Block;
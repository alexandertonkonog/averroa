import { Field, useField } from 'react-final-form';
import { isRequired } from '../../validate/validate';
import user from '../../images/user.svg';

const Specialist = (props) => {

    let [state, dispatch] = props.commonState;
    let doctors = state.data.doctors;
    let services = state.data.services;

    const doctorField = useField('doctor_id');
    const serviceField = useField('service_id');

    // const selectedDoctorId = doctorField.input.value;

    // const doctor = selectedDoctorId && doctors.find(item => item.id === selectedDoctorId);

    // const result = [];
    // let prev = null;

    // for (let i = 0; i < services.length; i++) {
    //     if (i % 3 === 0) {
    //         prev = {...services[i], isDirectory: true};
    //         result.push(prev);
    //     } else if (i % 3 === 0) {
    //         let elem = {...services[i], isDirectory: true, parent: prev.id};
    //         prev = elem;
    //         result.push(prev)
    //     } else {
    //         result.push({...services[i], isDirectory: true, parent: prev.id})
    //     }
    // }

    // console.log(JSON.stringify(result));

    return (
        <>
            <h2 className="bit_title bit_title_second">Выберите специалиста</h2>
            <section className="bit_specialist">
                <Field name="doctor_id" validate={isRequired('Необходимо выбрать специалиста')}>
                    {fieldProps => (
                        <div>
                            <ul className="bit_specialist__list bit_list bit_shadow">
                                {doctors.map(item => (
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

export default Specialist;
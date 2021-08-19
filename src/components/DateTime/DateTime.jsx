import { useState } from 'preact/hooks';
import { Field, useForm } from 'react-final-form';
import { isRequired } from '../../validate/validate';
import { DateFormatter } from '../../utils/utils';

const DateTime = (props) => {
    let [date, setDate] = useState(new Date());
    const [state, dispatch] = props.commonState;
    const form = useForm();
    const daysOfWeek = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    const doctor = state.doctor || state.data.doctors[0];
    const schedule = props.commonState.schedule.find(item => item.id === doctor.id);
    const formState = form.getState().values;
    const days = DateFormatter.getMonthsDays(date, schedule);
    const selectedDate = form.getFieldState('date');
    const times = selectedDate && selectedDate.value && DateFormatter.getTimeElements(date, schedule, formState);
    const changeMonth = (vector) => {
        const otherDate = new Date(date);
        if (vector) {
            otherDate.setMonth(otherDate.getMonth() + 1);
        } else {
            otherDate.setMonth(otherDate.getMonth() - 1);
        }
        setDate(otherDate);
    }
    return (
        <>
            <h2 className="bit_title bit_title_second">Выберите дату и время приема</h2>
            <section className="bit_block bit_block_calendar">
                <Field name="date" validate={isRequired('Необходимо выбрать дату приема')}>
                    {fieldProps => (
                        <div className="bit_shadow bit_block__calendar-item">
                            <div className="bit_calendar-container">
                                <div className="bit_calendar__months">
                                    <svg onClick={() => changeMonth(false)} className="bit_calendar__months-selector bit_calendar__months-selector_back" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.73279 9.31955C6.35699 8.91484 5.72426 8.8914 5.31955 9.26721C4.91484 9.64301 4.8914 10.2757 5.26721 10.6805L6.73279 9.31955ZM12.5 17L11.7672 17.6805C11.9564 17.8842 12.2219 18 12.5 18C12.7781 18 13.0436 17.8842 13.2328 17.6805L12.5 17ZM19.7328 10.6805C20.1086 10.2757 20.0852 9.64301 19.6805 9.26721C19.2757 8.8914 18.643 8.91484 18.2672 9.31955L19.7328 10.6805ZM5.26721 10.6805L11.7672 17.6805L13.2328 16.3195L6.73279 9.31955L5.26721 10.6805ZM13.2328 17.6805L19.7328 10.6805L18.2672 9.31955L11.7672 16.3195L13.2328 17.6805Z" fill="#859299"/>
                                    </svg>
                                    <h4 className="bit_title bit_title_text">{months[date.getMonth()]}</h4>
                                    <svg onClick={() => changeMonth(true)} className="bit_calendar__months-selector bit_calendar__months-selector_next" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.73279 9.31955C6.35699 8.91484 5.72426 8.8914 5.31955 9.26721C4.91484 9.64301 4.8914 10.2757 5.26721 10.6805L6.73279 9.31955ZM12.5 17L11.7672 17.6805C11.9564 17.8842 12.2219 18 12.5 18C12.7781 18 13.0436 17.8842 13.2328 17.6805L12.5 17ZM19.7328 10.6805C20.1086 10.2757 20.0852 9.64301 19.6805 9.26721C19.2757 8.8914 18.643 8.91484 18.2672 9.31955L19.7328 10.6805ZM5.26721 10.6805L11.7672 17.6805L13.2328 16.3195L6.73279 9.31955L5.26721 10.6805ZM13.2328 17.6805L19.7328 10.6805L18.2672 9.31955L11.7672 16.3195L13.2328 17.6805Z" fill="#859299"/>
                                    </svg>
                                </div>
                                <div className="bit_calendar__days bit_calendar__grid">
                                    {daysOfWeek.map(item => (
                                        <div className="bit_calendar__days-item">{item}</div>
                                    ))}
                                </div>
                                <div className="bit_calendar bit_calendar__grid">
                                    {days.map(item => {
                                        if (item) {
                                            const localDate = new Date(item.date);
                                            const localDay = localDate.getDate();
                                            if (item.free) {
                                                return (
                                                    <div 
                                                        onClick={() => {
                                                            fieldProps.input.onChange(item.date);
                                                            setDate(localDate);
                                                        }} 
                                                        className={fieldProps.input.value === item.date 
                                                            ? "bit_calendar__item bit_calendar__item_active" 
                                                            : "bit_calendar__item"}>{localDay}</div>
                                                )
                                            } else {
                                                return (
                                                    <div className="bit_calendar__item bit_calendar__item_busy">{localDay}</div>
                                                )
                                            }
                                        } else {
                                            return (
                                                <div className="bit_calendar__item bit_calendar__item_hidden"></div>
                                            )
                                        }   
                                    })}
                                </div>
                            </div>
                            {fieldProps.meta.touched && fieldProps.meta.error 
                                && <p className="bit_error">{fieldProps.meta.error}</p>}
                        </div>
                    )}
                </Field>
                {selectedDate && selectedDate.value && <Field name="time" validate={isRequired('Необходимо выбрать время приема')}>
                    {fieldProps => (
                        <div className="bit_shadow bit_block__calendar-item">
                            <div className="bit_time-container">
                                <h4 className="bit_title bit_title_text bit_time-container__title">Доступное время</h4>
                                <div className="bit_time">                                
                                    {times && times.map(item => (
                                        <div 
                                            className={item.date === fieldProps.input.value 
                                                ? "bit_time__item bit_time__item_active"
                                                : "bit_time__item"}
                                            onClick={(e) => {
                                                fieldProps.input.onChange(item.date);
                                                form.change('dateTime', DateFormatter.getISODate(item.date));
                                            }}>
                                                {item.visible}</div>
                                    ))}
                                </div>
                            </div>
                            {fieldProps.meta.touched && fieldProps.meta.error 
                                && <p className="bit_error">{fieldProps.meta.error}</p>}
                        </div>
                    )}
                </Field>}
            </section>
        </>
    )
}

export default DateTime;
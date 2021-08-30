import { useState } from "react";

const Select = (props) => {
    let [open, setOpen] = useState(false);
    const data = [{id: 0, name: 'Не выбран'}, ...props.data];
    const name = props.value ? data.find(item => item.id === props.value).name : props.title;
    const callback = (id) => {
        props.callback(id);
        setOpen(false);
    }
    return (
        <div className={props.addClass ? "bit_select-container " + props.addClass : "bit_select-container"}>
            {props.label && <p className="bit_select__label">{props.label}</p>}
            <div className={open ? "bit_select bit_select_open" : "bit_select"}>
                <div className={'bit_select__header bit_select__text'} onClick={() => setOpen(!open)}>
                    <p className="bit_select__title">{name}</p>
                    <svg className="bit_select__selector" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.73279 9.31955C6.35699 8.91484 5.72426 8.8914 5.31955 9.26721C4.91484 9.64301 4.8914 10.2757 5.26721 10.6805L6.73279 9.31955ZM12.5 17L11.7672 17.6805C11.9564 17.8842 12.2219 18 12.5 18C12.7781 18 13.0436 17.8842 13.2328 17.6805L12.5 17ZM19.7328 10.6805C20.1086 10.2757 20.0852 9.64301 19.6805 9.26721C19.2757 8.8914 18.643 8.91484 18.2672 9.31955L19.7328 10.6805ZM5.26721 10.6805L11.7672 17.6805L13.2328 16.3195L6.73279 9.31955L5.26721 10.6805ZM13.2328 17.6805L19.7328 10.6805L18.2672 9.31955L11.7672 16.3195L13.2328 17.6805Z" fill="#859299"/>
                    </svg>
                </div>
                <ul className="bit_select__list">
                    {data.map((item) => (
                        <li 
                            key={item.id}
                            onClick={() => callback(item.id)}
                            className="bit_select__list-item bit_select__text">
                            {item.name}
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    )
}

Select.defaultProps = {
    data: [
        {id: 'male', name: 'Мужчина'},
        {id: 'female', name: 'Женщина'},
    ]
}

export default Select;
import React from 'react';
import load from '../../images/load.gif';

const LoadButton = (props) => {
    let type = props.type || 'submit';
    let click = props.onClick || function() {};
    let text = props.text || 'Отправить';
    return (
        <button disabled={props.loading} className={"bit_btn " + props.addClass} type={type} onClick={click}>
            {props.loading  
                ? <img src={load} className="bit_loader" alt="Загрузка"/> 
                : text
            }
        </button>
    )
}

export default LoadButton;
import { useEffect } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { Field, useForm } from 'react-final-form';
import { isRequired } from '../../validate/validate';
import Search from '../Search/Search';
import { DateFormatter } from '../../utils/utils';

const Block = (props) => {
    const params = useParams();
    const form = useForm();
    useEffect(() => {
        if(!props.data.length) {
            props.dispatch({type: 'SET_NOT_SERVICE', data: true});
        }
        return () => {
            props.dispatch({type: 'SET_NOT_SERVICE', data: false});
        }
    }, []);
    return (
        <>
            <div className="bit_block__header">
                <h2 className="bit_title bit_title_second">Выберите из группы услуг</h2>
                <Search form={form} callback={props.searchCallback} commonState={props.commonState} />
            </div>
            <div className="bit_bread">
                
            </div>
            <section className="bit_block bit_block_service">
                {props.data.length
                    ? <Field defaultValue={params.id ? params.id : null} name={"block" + props.level} validate={isRequired('Необходимо выбрать группу услуг')}>
                        {fieldProps => (
                            <div>
                                <ul className="bit_list bit_shadow">
                                    {props.data.map(item => {
                                        if (item.isDirectory) {
                                            return (
                                                <li 
                                                    key={item.id} 
                                                    onClick={() => {
                                                        fieldProps.input.onChange(item.id);
                                                        props.callback(item, props.level);
                                                    }}
                                                    className={item.id === fieldProps.input.value 
                                                        ? "bit_list__item bit_list__item_active"
                                                        : "bit_list__item"}>
                                                        {item.name}
                                                        <span className="bit_list__item-des">
                                                            {item.isDirectory
                                                                ? 'Группа'
                                                                : 'Услуга'}
                                                        </span>
                                                </li>
                                            )
                                        }
                                        
                                        return (
                                            <li 
                                                key={item.id} 
                                                onClick={() => {
                                                    fieldProps.input.onChange(item.id);
                                                    props.callback(item, props.level);
                                                    form.change('service', item)
                                                }}
                                                className={item.id === fieldProps.input.value 
                                                    ? "bit_list__item bit_list__item_active"
                                                    : "bit_list__item"}>
                                                    <div className="bit_list__item-left">
                                                        <p className="bit_list__item-name">{item.name}</p>
                                                        <p className="bit_list__item-conditions">
                                                            <span className="bit_list__item-cost">{ item.cost } р</span>
                                                            <span className="bit_list__item-time">
                                                                { DateFormatter.getMinutes(new Date(item.duration)) } минут
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <p className="bit_list__item-des">
                                                        {item.isDirectory
                                                            ? 'Группа'
                                                            : 'Услуга'}
                                                    </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                                {fieldProps.meta.touched && fieldProps.meta.error 
                                    && <p className="bit_text bit_text_error bit_error">{fieldProps.meta.error}</p>}
                            </div>
                        )}
                    </Field>
                    : <p className="bit_text bit_text_info bit_info">Нет услуг c этими признаками</p>
                }
            </section>
        </>
    )
}

export default Block;
import React from 'preact-compat';
import { toChildArray } from 'preact';
import { Form } from 'react-final-form';
import { useState } from 'preact/hooks';
import LoadButton from '../LoadButton/LoadButton';


const Wizard = (props) => {

    let [page, setPage] = props.pageState;
    let [values, setValues] = props.values;
    let [state, dispatch] = props.commonState;

    const children = props.children.flat();

    const clearFields = (data) => {
        if (Array.isArray(data)) {
            data.forEach(item => window.firstbit.form.change(item, null));
        } else {
            window.firstbit.form.change(data, null)
        }
    }

    const next = (values) => {
        setPage(page + 1);
        setValues(values);
    }

    const prev = () => {
        const currentPage = page - 1;
        const name = children[page].props.name;
        clearFields(name);
        setPage(currentPage);
    }
    
    const handleSubmit = (values, form) => {
        const isLastPage = page === children.length - 1
        if (isLastPage) {
            return props.onSubmit(values, form);
        } else {
            return next(values);
        }
    }

    const activePage = children[page];
    const isLastPage = page === children.length - 1;

    return (
        <Form
            initialValues={values}
            onSubmit={handleSubmit}
        >   
            {({ handleSubmit, values, form }) => {
                window.firstbit = window.firstbit ?? {};
                window.firstbit.form = window.firstbit.form ?? form;
                return (
                    <form onSubmit={handleSubmit} className="bit_form">
                        <div className="bit_screen">
                            {activePage}
                        </div>
                        {page > 0 && (
                            <button onClick={() => prev(values)} type="button" className="bit_btn">
                                Предыдущий шаг
                            </button>
                        )}
                        {!state.notService && <LoadButton text={isLastPage ? 'Записаться' : 'Следующий шаг'} loading={props.isLoading} />}
                    </form>
                )
            }}
        </Form>
    )
}

export default Wizard;
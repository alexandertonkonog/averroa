import React from 'preact-compat';
import { toChildArray } from 'preact';
import { Form } from 'react-final-form';
import { useState } from 'preact/hooks';
import LoadButton from '../LoadButton/LoadButton';


const Wizard = (props) => {

    let [page, setPage] = props.pageState;
    let [values, setValues] = useState(props.initialValues);

    const next = (values) => {
        setPage(page + 1);
        setValues(values);
    }

    const prev = (values) => {
        setPage(page - 1);
        setValues(values);
    }

    const handleSubmit = (values) => {
        const isLastPage = page === props.children.length - 1
        if (isLastPage) {
            return props.onSubmit(values)
        } else {
            next(values)
        }
    }

    const activePage = props.children[page]
    const isLastPage = page === props.children.length - 1

    return (
        <Form
            initialValues={values}
            onSubmit={handleSubmit}
        >   
            {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit} className="bit_form">
                    <div className="bit_screen">
                        {activePage}
                    </div>
                    {page > 0 && (
                        <button onClick={() => prev(values)} className="bit_btn">
                            Предыдущий шаг
                        </button>
                    )}
                    <LoadButton text={isLastPage ? 'Записаться' : 'Следующий шаг'} loading={props.isLoading} />
                </form>
            )}
        </Form>
    )
}

export default Wizard;
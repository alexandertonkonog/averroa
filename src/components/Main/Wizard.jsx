import { Form } from 'react-final-form';
import { useState } from 'preact/hooks';
import LoadButton from '../LoadButton/LoadButton';


const Wizard = (props) => {

    let [page, setPage] = useState(0);
    let [values, setValues] = useState({});
    let [state, dispatch] = props.commonState;

    const children = props.children;

    const next = (values) => {
        setPage(page + 1);
        setValues(values);
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
            onSubmit={handleSubmit}>   
            {({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} className="bit_form">
                        {activePage}
                        {!state.notService && <LoadButton text={isLastPage ? 'Записаться' : 'Следующий шаг'} loading={props.isLoading} />}
                    </form>
                )
            }}
        </Form>
    )
}

export default Wizard;
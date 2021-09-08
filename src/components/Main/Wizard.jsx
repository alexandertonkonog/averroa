import { Form } from 'react-final-form';
import { useState } from 'react';
import LoadButton from '../LoadButton/LoadButton';


const Wizard = (props) => {

    let [page, setPage] = useState(0);
    let [values, setValues] = useState({});
    let [loading, setLoading] = useState(false);
    let [state, dispatch] = props.commonState;

    const children = props.children;

    const next = (values) => {
        setPage(page + 1);
        setValues(values);
    }
    
    const handleSubmit = async (values, form) => {
        const isLastPage = page === children.length - 1
        if (isLastPage) {
            setLoading(true);
            const result = await props.onSubmit(values, form);
            setLoading(false);
            return result;
        } else {
            return next(values);
        }
    }

    const activePage = children[page];

    return (
        <Form
            initialValues={values}
            onSubmit={handleSubmit}>   
            {({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} className="bit_form">
                        {activePage}
                        {!state.notService 
                            && <LoadButton text={'Записаться'} loading={loading} />}
                    </form>
                )
            }}
        </Form>
    )
}

export default Wizard;
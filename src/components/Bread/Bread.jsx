import { Link, useLocation } from "react-router-dom";

const Bread = ({commonState}) => {
    const [state, dispatch] = commonState;
    const location = useLocation();

    if (!state.bread) {
        return <></>
    }

    return (
        <section className="bit_bread">
            {state.bread.length !== 1 && location.pathname !== '/open' && <p className="bit_bread__inside">
                {state.bread.map((item, index) => {
                    if (index === state.bread.length - 1) {
                        return <span className="bit_bread__item bit_bread__item_active">{item.name}</span>
                    } else {
                        return <><Link to={item.link} className="bit_bread__item">{item.name} / </Link></>;
                    }
                })}
            </p>}
        </section>
    );
}

export default Bread;
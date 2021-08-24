import { Link } from "react-router-dom";

const BlockGroup = ({item, callback, link, state}) => {
    return (
        <Link to={link + item.id}>
            <li 
                onClick={() => {
                    if (callback) {
                        callback(item);
                    }
                }}
                className={state.activeBlock === item.id ? "bit_list__item bit_list__item_active" : "bit_list__item"}>
                    {item.name}
                    <svg className="bit_list__arrow" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.73279 9.31955C6.35699 8.91484 5.72426 8.8914 5.31955 9.26721C4.91484 9.64301 4.8914 10.2757 5.26721 10.6805L6.73279 9.31955ZM12.5 17L11.7672 17.6805C11.9564 17.8842 12.2219 18 12.5 18C12.7781 18 13.0436 17.8842 13.2328 17.6805L12.5 17ZM19.7328 10.6805C20.1086 10.2757 20.0852 9.64301 19.6805 9.26721C19.2757 8.8914 18.643 8.91484 18.2672 9.31955L19.7328 10.6805ZM5.26721 10.6805L11.7672 17.6805L13.2328 16.3195L6.73279 9.31955L5.26721 10.6805ZM13.2328 17.6805L19.7328 10.6805L18.2672 9.31955L11.7672 16.3195L13.2328 17.6805Z" fill="#859299"/>
                    </svg>
            </li>
        </Link>
    );
}

export default BlockGroup;
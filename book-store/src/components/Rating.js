/**
 * Book store application
 *
 * Author: Elia Contini <http://elia.contini.page/>
 *
 * Renders the rating of a book store
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./Rating.css";

const Rating = (props) => {
    const maxRating = 5;
    const rating = props.rating;

    const handleChange = (value) => {
        props.onChange(value);
    };

    let stars = [];
    for (var i = 1; i <= maxRating; i++) {
        const index = i;
        if (i <= rating) {
            stars.push(
                <FontAwesomeIcon
                    icon={faStar}
                    className="Rating-start Rating-start-isOn"
                    onClick={() => handleChange(index)}
                    key={i}
                />
            );
        } else {
            stars.push(
                <FontAwesomeIcon
                    icon={faStar}
                    className="Rating-start"
                    onClick={() => handleChange(index)}
                    key={i}
                />
            );
        }
    }

    return <div className="Rating">{stars}</div>;
};

export default Rating;

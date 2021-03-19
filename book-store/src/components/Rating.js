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

    let content = [];
    for (var i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            content.push(
                <FontAwesomeIcon
                    icon={faStar}
                    className="Rating-start-isOn"
                    key={i}
                />
            );
        } else {
            content.push(
                <FontAwesomeIcon
                    icon={faStar}
                    className="Rating-start"
                    key={i}
                />
            );
        }
    }

    return <div className="Rating">{content}</div>;
};

export default Rating;

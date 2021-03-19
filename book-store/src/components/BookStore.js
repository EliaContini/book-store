/**
 * Book store application
 *
 * Author: Elia Contini <http://elia.contini.page/>
 *
 * Renders a book stores
 */

import BestSellers from "./BestSellers";

import "./BookStore.css";

const BookStore = (props) => {
    const bookStore = props.bookStore;

    const bestSellers = bookStore.bestSellers;
    const countryFlag = bookStore.countryFlag;
    const establishmentDate = bookStore.establishmentDate;
    const imageSrc = bookStore.storeImage;
    const name = bookStore.name;
    const rating = bookStore.rating;
    const website = bookStore.website;

    return (
        <li className="BookStore">
            <div className="BookStore-layout">
                <div className="BookStore-image">
                    <img src={imageSrc} alt="{name}" />
                </div>
                <div className="BookStore-data">
                    <div className=" BookStore-layout BookStore-layout--spaced">
                        <div className="BookStore-name">
                            <h2>{name}</h2>
                        </div>
                        <div>Rating: {rating}</div>
                    </div>
                    <BestSellers books={bestSellers} />
                </div>
            </div>
            <div className="BookStore-layout BookStore-layout--spaced">
                <div className="BookStore-dateAndUrl">
                    {establishmentDate} - {website}
                </div>
                <div className="BookStore-countryFlag">
                    <img
                        src={countryFlag}
                        alt="Flag of"
                        height="12"
                        width="24"
                    />
                </div>
            </div>
        </li>
    );
};

export default BookStore;

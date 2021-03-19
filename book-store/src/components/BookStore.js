/**
 * Book store application
 *
 * Author: Elia Contini <http://elia.contini.page/>
 *
 * Renders a book store
 */

import BestSellers from "./BestSellers";

import "./BookStore.css";

const BookStore = (props) => {
    const bookStore = props.bookStore;

    const bestSellers = bookStore.bestSellers;
    const countryFlag = bookStore.countryFlag;

    const date = new Date(bookStore.establishmentDate);
    const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
    };
    const establishmentDate = new Intl.DateTimeFormat("ch", options)
        .format(date)
        .replace(/\//g, ".");

    const imageSrc = bookStore.storeImage;
    const name = bookStore.name;
    const rating = bookStore.rating;
    const websiteLink = bookStore.website;
    const website = websiteLink.replace(/^http:\/\/|https:\/\//g, "");

    return (
        <li className="BookStore">
            <div className="BookStore-data BookStore-layout">
                <div className="BookStore-image">
                    <img src={imageSrc} alt="{name}" />
                </div>
                <div className="BookStore-analytics">
                    <div className=" BookStore-layout BookStore-layout--spaceBetween">
                        <div className="BookStore-name">
                            <h2>{name}</h2>
                        </div>
                        <div>Rating: {rating}</div>
                    </div>
                    <BestSellers books={bestSellers} />
                </div>
            </div>

            <div className="BookStore-meta BookStore-layout BookStore-layout--spaceBetween">
                <div className="BookStore-dateAndUrl">
                    {establishmentDate} - <a href={websiteLink}>{website}</a>
                </div>
                <div className="BookStore-countryFlag">
                    <img
                        src={countryFlag.url}
                        alt={"Flag of " + countryFlag.name}
                        height="12"
                        width="24"
                    />
                </div>
            </div>
        </li>
    );
};

export default BookStore;

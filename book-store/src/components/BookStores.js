/**
 * Book store application
 *
 * Author: Elia Contini <http://elia.contini.page/>
 *
 * Renders all book stores
 */

import BookStore from "./BookStore";

import "./BookStores.css";

const BookStores = (props) => {
    const bookStores = props.bookStores;

    return (
        <ol className="BookStores">
            {bookStores.map((bookStore) => (
                <BookStore bookStore={bookStore} key={bookStore.id} />
            ))}
        </ol>
    );
};

export default BookStores;

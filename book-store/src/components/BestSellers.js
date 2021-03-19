/**
 * Book store application
 *
 * Author: Elia Contini <http://elia.contini.page/>
 *
 * Renders best sellers
 */

import "./BestSellers.css";

const BestSellers = (props) => {
    const books = props.books;

    return (
        <table className="BestSellers">
            <thead>
                <tr>
                    <th colSpan="2">Best-selling books</th>
                </tr>
                <tr className="BestSellers-a11y">
                    <th className="BestSellers-title">Title</th>
                    <th className="BestSellers-author">Author</th>
                </tr>
            </thead>
            <tbody>
                {books.length === 0 ? (
                    <tr>
                        <td>No data available</td>
                        <td></td>
                    </tr>
                ) : (
                    books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default BestSellers;

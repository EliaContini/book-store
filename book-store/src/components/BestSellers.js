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
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Copies sold</th>
                </tr>
            </thead>
            <tbody>
                {books.length === 0 ? (
                    <tr>
                        <td>No data available</td>
                    </tr>
                ) : (
                    books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.copiesSold}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default BestSellers;

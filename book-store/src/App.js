/**
 * Book store application
 *
 * Author: Elia Contini <http://elia.contini.page/>
 *
 * Application
 */

import { useEffect, useState } from "react";

import BookStores from "./components/BookStores";
import bookStores from "./store/bookStores";

import "./App.css";
import logo from "./logo.svg";

const data = bookStores();

function App() {
    const [bookStores, setBookStores] = useState([]);

    useEffect(() => {
        data.get()
            .then(data.prepare)
            .then((response) => {
                setBookStores(response);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    <img
                        className="App-logo"
                        src={logo}
                        height="48"
                        width="48"
                        alt="Logo"
                    />
                    Book stores - best sellers
                </h1>
            </header>
            <main className="App-main">
                <BookStores bookStores={bookStores} />
            </main>
            <footer className="App-footer">&copy; 2021 Elia Contini</footer>
        </div>
    );
}

export default App;

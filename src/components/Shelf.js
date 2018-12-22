import React from 'react'
import PropTypes from 'prop-types'
import BookInfo from './BookInfo'

const Shelf = (props) => {
    const filteredBooks = props.shelfBooks
                            ? props.shelfBooks.filter((book) => (book.shelf === props.shelfInfo.type))
                            : [];
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfInfo.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        filteredBooks.map((book) => (
                            <li key={book.id}>
                                <BookInfo bookInfo={book}
                                          currentShelf={props.shelfInfo}
                                          changeShelfHandler={props.changeShelfHandler}/>
                            </li>))
                    }
                </ol>
            </div>
        </div>
    )
};

Shelf.propTypes = {
    shelfInfo: PropTypes.object.isRequired,
    shelfBooks: PropTypes.array.isRequired,
    changeShelfHandler: PropTypes.func.isRequired
};

export default Shelf
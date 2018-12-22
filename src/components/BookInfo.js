import React from 'react'
import PropTypes from 'prop-types'
import {shelves} from './../constants/shelfType'
import './../App.css'


const BookInfo = (props) => {
    const changeShelf = (event) => {
        if ( props.currentShelf.type !== event.target.value){
            props.changeShelfHandler(event.target.value, props.bookInfo);
        } 
    };

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url(http://books.google.com/books/content?id=${props.bookInfo.id}&printsec=frontcover&img=1&zoom=1)`
                        }}>
                </div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => changeShelf(event)}
                            defaultValue={props.bookInfo.shelf}>
                                <option value="move" disabled>Move to...</option>
                                {shelves.map((shelf) => (
                                <option
                                        key={shelf.type}
                                        value={shelf.type}
                                >{shelf.title}</option>))}
                    </select>
                </div>
            </div>
            <div className="book-title">{props.bookInfo.title}</div>
            <div className="book-authors">{props.bookInfo.authors}</div>
        </div>
    )
};

BookInfo.propTypes = {
    bookInfo: PropTypes.object.isRequired,
    currentShelf: PropTypes.object.isRequired,
    changeShelfHandler: PropTypes.func.isRequired
};

export default BookInfo
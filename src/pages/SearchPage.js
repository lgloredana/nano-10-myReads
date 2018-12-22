import React from 'react'
import PropTypes from 'prop-types'
import Search from "../components/Search";
import BookInfo from "../components/BookInfo";
import * as BooksAPI from "../BooksAPI";
import {NONE_TITLE, NONE_TYPE} from "../constants/shelfType";


class SearchPage extends React.Component {
    state = {
        searchedBooks :[]
    };

    componentDidMount(){
        this.searchBook('');
    }

    searchBook(filterTerm){
        filterTerm &&
        BooksAPI.search(filterTerm)
            .then((response) => {
                let result = response.length
                    ? response.map( book => {
                            const bookWithShelf = this.props.books.find((b) => (book.id === b.id));
                            if (bookWithShelf){
                                book = { ...book, shelf: bookWithShelf.shelf}
                            }else{
                                book = { ...book, shelf: NONE_TYPE}
                            }
                            return book;
                        })
                    :[];

                this.setState({
                    searchedBooks: result
                });
            }, (error) => {
                console.log(error)
            })
            .catch((err) => {
                console.error(err);
            });
        !filterTerm && this.setState({
            searchedBooks: []
        });
    }

    handleChangeFilter(filter){
        this.searchBook(filter);
    }

    render() {
        const booksFiltered = this.state.searchedBooks.map((book) => {
            return (
                <li key={book.id}>
                    <BookInfo bookInfo={book}
                              currentShelf={{type: NONE_TYPE, title: NONE_TITLE}}
                              changeShelfHandler={this.props.changeShelfHandler}/>
                </li>);
           });
        return (
            <div className="search-books">
                <Search onChange={(filter) => this.handleChangeFilter(filter)}/>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { booksFiltered }
                    </ol>
                </div>
            </div>           
        )
    }
}

SearchPage.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelfHandler: PropTypes.func.isRequired
};

export default SearchPage
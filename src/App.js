import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'

class BooksApp extends React.Component {
  state = {
    books : []
  };

  changeShelfHandler(newShelfType, book){
    const findBook = this.state.books.find((b) => b.id === book.id);
    let newBooks;
    if ( findBook ){
        newBooks = this.state.books.map((b) => {
                                if ( b.id === book.id ) {
                                  b.shelf = newShelfType;
                                }
                                return b;
                            });

    }else{
        const newBook = { ...book, shelf :newShelfType};
        newBooks = [...this.state.books, newBook];
    }
    BooksAPI.update(book, newShelfType)
        .then(() => {
            this.setState({
                books: newBooks
            });
        })
        .catch((errResponse) => {
            console.error(errResponse);
        })
  }

  getAllBooks(){
      BooksAPI.getAll()
          .then((response) => {
              this.setState({
                  books: response
              });
          })
          .catch((err) => {console.error(err);})
  }

  componentDidMount(){
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <MainPage books={this.state.books}
               changeShelfHandler={(x,y) => this.changeShelfHandler(x,y)}/>)}
        />
        <Route path='/search' render={() => (
            <SearchPage books={this.state.books}
               changeShelfHandler={(shelfType,book) => {
                   this.changeShelfHandler(shelfType,book);
                 }}/>)}
        />
      </div>
    )
  }
}

export default BooksApp

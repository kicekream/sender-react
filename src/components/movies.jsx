import React, { Component } from "react";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/pagination";
//import Delete from "./common/delete"

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const { selectedGenre } = this.state;
    const { sortColumn } = this.state;

    const filtered =
    selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const movies = paginate(sorted, currentPage, pageSize);

  return {totalCount: filtered.length, data: movies};
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;
    const { genres, selectedGenre } = this.state;
    const { sortColumn } = this.state;

    if (count === 0) return <p>No movie in Database</p>;

    const {totalCount, data: movies} = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Movie(s) in this Category: {totalCount}</p>
          <MoviesTable
            //calling the states to the components for using
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default Movies;

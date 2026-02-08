
import { useEffect, useState } from "react";

import { Logo, Nav, NumResults, Search } from "./components/Nav";

import { Box } from "./components/Box";

import { MovieList } from "./components/Movie";

import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";

import { useFetchMovies } from "./hooks/useFetchMovies";

import { MovieDetails } from "./components/MovieDetails";

export default function App() {

    const [query, setQuery] = useState("");

    const { movies, isLoading, error } = useFetchMovies(query);

    function localWatched() {
        const stored = localStorage.getItem("watched");
        return stored ? JSON.parse(stored) : [];
    }

    const [watched, setWatched] = useState(localWatched);

    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);


    function handleSelectMovie(id) {
        setSelectedId(id);
    }


    function handleCloseMovie() {
        setSelectedId(null);
    }


    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(imdbID) {
        setWatched((watched) => watched.filter((m) => m.imdbID !== imdbID));
    }
    
    return (
        <>
            <Nav>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Nav>
            <main className="main">
                <Box>
                    {isLoading && <p className="loader">Cargando...</p>}
                    {error && <p className="error">⛔ {error}</p>}
                    <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
                </Box>
                <Box>
                    <WatchedMoviesContainer>
                        {selectedId ? (
                            <MovieDetails
                                selectedId={selectedId}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                                watched={watched}
                            />
                        ) : (
                            <>
                                <WatchedSummary watched={watched} />
                                <WatchedMoviesList watched={watched} onDelete={handleDeleteWatched} />
                            </>
                        )}
                    </WatchedMoviesContainer>
                </Box>
            </main>
        </>
    );
}
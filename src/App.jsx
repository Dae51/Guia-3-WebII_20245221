// Se importan useEffect y useState desde React
import { useEffect, useState } from "react";
// Se importan los componentes necesarios
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

// Componente principal App
export default function App() {
    // Estado para la consulta de búsqueda
    const [query, setQuery] = useState("");
    // Uso del hook personalizado para obtener las películas
    const { movies, isLoading, error } = useFetchMovies(query);
    // Función para obtener las películas vistas desde el almacenamiento local
    function localWatched() {
        const stored = localStorage.getItem("watched");
        return stored ? JSON.parse(stored) : [];
    }

    // Estado para las películas vistas
    const [watched, setWatched] = useState(localWatched);
    // Estado para la película seleccionada
    const [selectedId, setSelectedId] = useState(null);
    // Efecto para guardar las películas vistas en el almacenamiento local
    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

    // Maneja la selección de una película
    function handleSelectMovie(id) {
        setSelectedId(id);
    }

    // Maneja el cierre de los detalles de la película
    function handleCloseMovie() {
        setSelectedId(null);
    }

    // Maneja la adición de una película a la lista de vistas
    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    // Maneja la eliminación de una película de la lista de vistas
    function handleDeleteWatched(imdbID) {
        setWatched((watched) => watched.filter((m) => m.imdbID !== imdbID));
    }
    
    // Renderiza el componente App
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
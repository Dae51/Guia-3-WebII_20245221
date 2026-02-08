// Se importa useEffect y useState desde React
import { useEffect, useState } from 'react';
// Se importa el hook personalizado useFetchMovieDetails
import { useFetchMovieDetails } from '../hooks/useFetchMovieDetails';
// Se importa el componente StarRating
import StarRating from './StarRating';

// Componente MovieDetails que muestra los detalles de una película seleccionada
export const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
    // Se utiliza el hook personalizado para obtener los detalles de la película
    const { movie, error, isLoading } = useFetchMovieDetails(selectedId);

    // Detalles de la película
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    // Estado para la calificación del usuario
    const [userRating, setUserRating] = useState(0);
    // Verifica si la película ya ha sido vista
    const isWatched = watched.some(movie => movie.imdbID === selectedId);
    // Obtiene la calificación del usuario para la película vista
    const watchedUserRating = watched.find(movie => movie.imdbID ===
        selectedId)?.userRating;

    // Maneja la adición de una película a la lista de vistas
    function handleAdd() {
        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]),  
            userRating
        };
        onAddWatched(newMovie);
        onCloseMovie();  
    }

    // Efecto para restablecer la calificación del usuario cuando cambia la película seleccionada
    return (
        <div className="details">
            {isLoading ? (
                <p className="loader">Cargando...</p>
            ) : (
                <>
                    {error && <p className="error">⛔ {error}</p>}
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster de ${title}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating} IMDB rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating maxRating={10} size={18}
                                        onSetRating={setUserRating} />
                                    {userRating > 0 && (
                                        <button className="btn-add"
                                            onClick={handleAdd}>
                                            + Agregar a la lista
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>Has calificado esta película con {watchedUserRating} ⭐</p>
                            )}
                        </div>
                        <p><em>{plot}</em></p>
                        <p><b>Elenco:</b> {actors}</p>
                        <p><b>Director:</b> {director}</p>
                    </section>
                </>
            )}
        </div>
    );
};
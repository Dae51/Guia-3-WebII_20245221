// Se importan useEffect y useState desde React
import { useEffect, useState } from "react";

// Se importa la constante API_KEY desde el hook useFetchMovies
import { API_KEY } from "./useFetchMovies";

// Hook personalizado para obtener los detalles de una película
export function useFetchMovieDetails(selectedId) {
    // Estado para almacenar los detalles de la película
    const [movie, setMovie] = useState({});
    // Estado para indicar si se está cargando la información
    const [isLoading, setIsLoading] = useState(false);
    // Estado para manejar errores
    const [error, setError] = useState("");
    // Efecto que se ejecuta cuando cambia selectedId
    useEffect(() => {

        if (!selectedId) {
            setMovie({});
            setError("");
            return;
        }
        // Función asíncrona para obtener los detalles de la película
        async function fetchMovieDetails(selectedId) {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);

                if (!response.ok)
                    throw new Error("Error al cargar los detalles de la película");
                const data = await response.json();

                if (data.Response === "False")
                    throw new Error(data.Error || "No se encontraron detalles");

                setMovie(data);
            } catch (err) {

                setError(err.message);
                setMovie({});
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovieDetails(selectedId);
    }, [selectedId]);

    return { movie, isLoading, error };
}
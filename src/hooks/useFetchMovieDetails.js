
import { useEffect, useState } from "react";

import { API_KEY } from "./useFetchMovies";

export function useFetchMovieDetails(selectedId) {

    const [movie, setMovie] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");
    useEffect(() => {

        if (!selectedId) {
            setMovie({});
            setError("");
            return;
        }

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
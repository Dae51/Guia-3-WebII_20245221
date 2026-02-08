// Se importan useEffect y useState desde React
import { useEffect, useState } from 'react'
// Se importa la constante API_KEY desde el hook useFetchMovies
export const API_KEY = "f00cfcb8"

// Hook personalizado para obtener las películas basadas en una consulta de búsqueda
export function useFetchMovies(query) {
    // Estado para almacenar las películas obtenidas
    const [movies, setMovies] = useState([])
    // Estado para indicar si se está cargando la información
    const [isLoading, setIsLoading] = useState(false)
    // Estado para manejar errores
    const [error, setError] = useState("")

    
    useEffect(() => {
        // Si la consulta es menor a 3 caracteres, no se realiza la búsqueda
        if (query.length < 3) {
            setMovies([])
            setError("")
            return
        }

        // Función asíncrona para obtener las películas
        async function fetchMovies() {
            try {
                setIsLoading(true) 
                setError(null) 

                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`) // usa https si te da error

                if (!response.ok)
                    throw new Error("Error al cargar películas")

                const data = await response.json()

                if (data.Response === "False")
                    throw new Error("No se encontraron resultados")

                setMovies(data.Search)
            } catch (err) {
                setError(err.message)
                setMovies([])
            } finally {
                setIsLoading(false) 
            }
        }

        fetchMovies()
    }, [query]) 

    return { movies, isLoading, error }
}

// Componente Nav que contiene la barra de navegación
export const Nav = ({ children }) => {
    return (
        <nav className="nav-bar">
            {children}
        </nav>
    )
}

// Componente Logo que muestra el logo de la aplicación
export function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>Palomitas de papel</h1>
        </div>
    )
}

// Componente Search que maneja la búsqueda de películas
export function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Buscar peliculas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

// Componente NumResults que muestra el número de resultados encontrados
export function NumResults({ movies }) {
    return (
        <p className="num-results">
            <strong>{movies.length}</strong> resultados encontrados
        </p>
    )
}
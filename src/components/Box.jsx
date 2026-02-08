// Se importa useState desde React  
import { useState } from "react";

// Componente Box que puede expandirse y colapsarse
export const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
}
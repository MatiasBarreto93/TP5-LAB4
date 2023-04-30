import { useState, useEffect } from 'react';
import { Instrumento } from "../../interfaces/instrumento.ts";
import {InstrumentoCard} from "./instrumentoCard.tsx";

export const InstrumentoList = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/instrumentos')
            .then(response => response.json())
            .then(data => setInstrumentos(data));
    }, []);

    return (
        <div>
            {instrumentos.map(instrumento => (
                <InstrumentoCard key={instrumento.id} instrumento={instrumento} />
            ))}
        </div>
    );
};
import { useState, useEffect } from 'react';
import { Instrumento } from "../../interfaces/instrumento.ts";
import {InstrumentoCard} from "./instrumentoCard.tsx";

interface Props {
    searchTerm: string;
}

export const InstrumentoList = ({ searchTerm }: Props) => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        let url = "http://localhost:8080/api/v1/instrumentos";
        if (searchTerm) {
            url = `http://localhost:8080/api/v1/instrumentos/search?filtro=${searchTerm}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => setInstrumentos(data));
    }, [searchTerm]);

    return (
        <div>
            {instrumentos.map(instrumento => (
                <InstrumentoCard key={instrumento.id} instrumento={instrumento} />
            ))}
        </div>
    );
};
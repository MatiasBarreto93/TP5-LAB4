import {InstrumentoCard} from "./instrumentoCard.tsx";
import {useEffect, useState} from "react";
import {Instrumento} from "../../interfaces/instrumento.ts";

interface Props {
    searchTerm?: string;
}

export const InstrumentoList = ({ searchTerm }: Props) => {

    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/instrumentos")
            .then((response) => response.json())
            .then((data) => setInstrumentos(data));
    }, []);

    const filteredInstrumentos = instrumentos.filter((instrumento) => {
        if (searchTerm) {
            const searchTermLowerCase = searchTerm.toLowerCase();
            return (
                instrumento.nombre.toLowerCase().includes(searchTermLowerCase) ||
                instrumento.marca.toLowerCase().includes(searchTermLowerCase) ||
                instrumento.modelo.toLowerCase().includes(searchTermLowerCase)
            );
        } else {
            return true;
        }
    });

    return (
        <>
            {filteredInstrumentos.map((instrumento) => (
                <InstrumentoCard key={instrumento.id} instrumento={instrumento} />
            ))}
        </>
    );
};
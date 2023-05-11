import { useState, useEffect } from 'react';
import { Instrumento } from "../../interfaces/instrumento.ts";
import {InstrumentoCard} from "./instrumentoCard.tsx";

interface Props {
    searchTerm: string;
}

export const InstrumentoList = ({ searchTerm = "" }: Props) => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [filteredInstrumentos, setFilteredInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/instrumentos")
            .then((response) => response.json())
            .then((data) => {
                setInstrumentos(data);
                setFilteredInstrumentos(data);
            });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredInstrumentos(instrumentos);
            return;
        }

        const filtered = instrumentos.filter(
            (instrumento) =>
                instrumento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                instrumento.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                instrumento.modelo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInstrumentos(filtered);
    }, [searchTerm, instrumentos]);

    return (
        <>
            {filteredInstrumentos.map((instrumento) => (
                <InstrumentoCard key={instrumento.id} instrumento={instrumento} />
            ))}
        </>
    );
};
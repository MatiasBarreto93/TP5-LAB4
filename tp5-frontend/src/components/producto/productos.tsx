import {InstrumentoList} from "./productoList.tsx";
import {useState} from "react";
import {Header} from "../header/header.tsx";
import {Footer} from "../footer/footer.tsx";

export const Productos = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (newSearchTerm:string) => {
        setSearchTerm(newSearchTerm);
    }

    return(
        <>
            <Header onSearchTermChange={handleSearchTermChange} />
            <InstrumentoList searchTerm={searchTerm} />
            <Footer/>
        </>
    )
}
import {InstrumentoList} from "./productoList.tsx";
import {useState} from "react";
import {Header} from "../header/header.tsx";
import {Footer} from "../footer/footer.tsx";

export const Productos = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchTermChange = (term: string) => {
        setSearchTerm(term);
    }

    return(
        <>
            <Header searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange}/>
            <InstrumentoList searchTerm={searchTerm} />
            <Footer/>
        </>
    )
}
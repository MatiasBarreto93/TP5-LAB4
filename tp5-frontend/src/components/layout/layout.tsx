import {Header} from "../header/header.tsx";
import {Footer} from "../footer/footer.tsx";
import React, {useState} from "react";

interface LayoutProps {
    children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (searchTerm: string) => {
        console.log("searchTerm en Layout " + searchTerm);
        setSearchTerm(searchTerm);
    };

    return (
        <>
            <Header
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
            />
            <main>{children}</main>
            <Footer/>
        </>
    );
};
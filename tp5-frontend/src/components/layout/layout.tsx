import {Header} from "../header/header.tsx";
import {Footer} from "../footer/footer.tsx";

interface LayoutProps {
    children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <Header/>
            <main>{children}</main>
            <Footer />
        </>
    );
};
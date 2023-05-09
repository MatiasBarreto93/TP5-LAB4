import {HomeTxt} from "../homeTxt/homeTxt.tsx";
import {CarouselHome} from "../carousels/carousels.tsx";
import {Map} from "../map/Map.tsx";

export const Home = () => {
    return(
        <>
            <HomeTxt/>
            <CarouselHome/>
            <Map/>
        </>
    )
}
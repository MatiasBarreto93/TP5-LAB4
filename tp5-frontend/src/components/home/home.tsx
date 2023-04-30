import {Layout} from "../layout/layout.tsx";
import {HomeTxt} from "../homeTxt/homeTxt.tsx";
import {CarouselHome} from "../carousels/carousels.tsx";
import {Map} from "../map/Map.tsx";

export const Home = () => {
    return(
        <Layout>
            <HomeTxt/>
            <CarouselHome/>
            <Map/>
        </Layout>
    )
}
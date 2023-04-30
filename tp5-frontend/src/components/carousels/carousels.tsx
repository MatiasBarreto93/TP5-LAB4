import {Carousel} from "react-bootstrap";

export const CarouselHome = () =>{
    return(
        <Carousel>
            <Carousel.Item interval={3000}>
                <img
                    height={500}
                    className="d-block w-100"
                    src="https://i.pinimg.com/originals/bd/16/af/bd16affb3f19a3d759ce882a3c85f08f.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    height={500}
                    className="d-block w-100"
                    src="https://i1.wp.com/elheraldoslp.com.mx/wp-content/uploads/2020/11/Hombre-toca.jpg?fit=940%2C627&ssl=1"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    height={500}
                    className="d-block w-100"
                    src="https://musicopolix.com/blog/wp-content/webp-express/webp-images/uploads/2021/06/como-aprender-a-tocar-la-bateria-portada.jpg.webp"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}
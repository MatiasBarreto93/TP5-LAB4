import {Layout} from "../layout/layout.tsx";
import {InstrumentoTable} from "./instrumentoTable.tsx";
import {Button} from "react-bootstrap";
import {InstrumentoCreateModal} from "./createInstrumentoModal.tsx";
import {useState} from "react";

export const Administracion = () => {

    const [showModal, setShowModal] = useState(false);

    const handleCreateInstrumento = () => {
        setShowModal(true);
    };


    return(
        <Layout>
            <Button onClick={handleCreateInstrumento} className="mt-2 mb-2 mx-2 my-2">Crear instrumento</Button>
            <InstrumentoTable/>
            <InstrumentoCreateModal show={showModal} onHide={() => setShowModal(false)}/>
        </Layout>
    )
}
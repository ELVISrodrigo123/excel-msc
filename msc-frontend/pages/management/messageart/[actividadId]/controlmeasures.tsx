import SidebarLayout from "@/layouts/SidebarLayout";
import * as React from "react";
import { useRouter } from "next/router";  // Importar useRouter
import MedidasControlContainer from "../../../containers/MedidasControlContainer";

function Controlmeasures(): React.ReactElement {
    const router = useRouter();
    const { actividadId } = router.query;  // Obtener el actividadId de la URL

    if (!actividadId) {
        return <p>Cargando...</p>;  // Mostrar mensaje mientras se obtiene el actividadId
    }

    return (
        <div className="conatainer-art">
            <h1>MEDIDAS DE CONTROL</h1>
            <MedidasControlContainer actividadId={parseInt(actividadId as string)} />  {/* Convertir a número */}
        </div>
    );
}

Controlmeasures.getLayout = (page: React.ReactElement) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default Controlmeasures;

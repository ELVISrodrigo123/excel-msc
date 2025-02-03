// Archivo: pages/management/messageart/[actividadId].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarLayout from "@/layouts/SidebarLayout";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const images = [
    { url: "/img/peligro.png", title: "Precaución", width: "40%" },
    { url: "/img/riesgo.png", title: "Riesgo", width: "30%" },
    { url: "/img/medida-de-control.png", title: "Medidas de Control", width: "30%" },
];

const routes = {
    "Precaución": "precation",
    "Riesgo": "risk",
    "Medidas de Control": "controlmeasures",
};

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
        width: "100% !important",
        height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
        zIndex: 1,
        "& .MuiImageBackdrop-root": { opacity: 0.15 },
        "& .MuiImageMarked-root": { opacity: 0 },
        "& .MuiTypography-root": { border: "4px solid currentColor" },
    },
}));

const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
}));

const MessageArtPage = () => {
    const router = useRouter();
    const { actividadId } = router.query; // Captura el ID de la actividad desde la URL
    const [data, setData] = useState<{ id: string | string[]; nombre: string } | null>(null);

    useEffect(() => {
        if (actividadId) {
            console.log(`Cargando datos de la actividad ${actividadId}`);
            setTimeout(() => {
                setData({ id: actividadId, nombre: "Ejemplo de Actividad" });
            }, 1000);
        }
    }, [actividadId]);

    if (!actividadId) return <p>Cargando...</p>;

    return (
        <div className="container-art">
            <h1>Detalles de la Actividad</h1>
            <h2>
                "En Minera San Cristóbal, sabemos que la vida vale más que todo. Prevenir hoy es evitar lamentar mañana, porque la seguridad no es solo una opción, es nuestro compromiso profundo."
            </h2>

            <p><strong>ID de la Actividad:</strong> {actividadId}</p>
            <p><strong>Nombre:</strong> {data?.nombre}</p>

            <div style={{ marginTop: "4em" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}>
                    {images.map((image) => (
                        <ImageButton
                            focusRipple
                            key={image.title}
                            style={{ width: image.width }}
                            onClick={() => {
                                const route = routes[image.title];
                                if (route) {
                                    router.push(`/management/messageart/${actividadId}/${route}`);
                                }
                            }}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={(theme) => ({
                                        position: "relative",
                                        p: 4,
                                        pt: 2,
                                        pb: `calc(${theme.spacing(1)} + 6px)`,
                                    })}
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    ))}
                </Box>
            </div>
        </div>
    );
};

MessageArtPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default MessageArtPage;

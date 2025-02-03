import { useState, useEffect } from "react";
import { Box, Link, Button } from "@mui/material";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  // manejar el estado en una aplicación hook funcion  que edevuelve un array de dos valores (1 y2)recibe un parametro mas ,recibe un parametro que simula el estado 
  //false por que 
  const [showComponet, setShowComponet] = useState(false);
  //variable que va a guardar lo que es el estado de el componente 
  //permitir cambiar el estado de ese componente
  // use effect hook permite sincronizar un componente con us sistema externo
  useEffect(() => {
    AOS.init();
    //const duration = timig.loadEventEnd - timig.navigationStart;
    const duration = 6000;
    //loadEventEnd momento en el que finalizo la carga de un recurso 
    //navigationstart el tiempo que en el que se inicio la navegacion en una pagina web
    window.setTimeout(() => {
      //establecer el tiempo de espera
      setShowComponet(true);
    }, duration);
  });

  return (
    <>
      {/* if(showComponet){
      <Load/>
    }else{
      <main></main>
     } */}
      {!showComponet ? (
        <Load />
      ) : (
        <div>
          <h1 className="meryfrodry">mery </h1>
          <Box>
            <Button
              component={Link}
              href="/dashboards/crypto"
              variant="contained"
              sx={{ ml: 2 }}
            >
              Live Preview
            </Button>
          </Box>
          <section className="carusel">
            <div className="container-all">
              <input type="radio" id="1" name="image-slide" hidden />
              <input type="radio" id="2" name="image-slide" hidden />
              <input type="radio" id="3" name="image-slide" hidden />
              <div className="slide">
                <div className="item-slide">
                  <img src="/img/slide1.jpg" alt="" />
                </div>
                <div className="item-slide">
                  <img src="/img/slide2.jpg" alt="" />
                </div>
                <div className="item-slide">
                  <img src="/img/slide3.jpg" alt="" />
                </div>
              </div>
              <div className="pagination">
                <label className="pagination-item" htmlFor="1">
                  <img src="/img/slide1.jpg" alt="" />
                </label>
                <label className="pagination-item" htmlFor="2">
                  <img src="/img/slide2.jpg" alt="" />
                </label>
                <label className="pagination-item" htmlFor="3">
                  <img src="/img/slide3.jpg" alt="" />
                </label>
              </div>
            </div>
          </section>

          <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
          <script>
            AOS.init();
          </script>
        </div>

      )}
    </>
  );
}

function Load() {
  return (
    <div>

    </div>


  );
}

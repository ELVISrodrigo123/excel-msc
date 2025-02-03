export default function Carusel(){
    return(
        <>
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
                <label  className="pagination-item" htmlFor="1">
                  <img src="/img/slide1.jpg" alt="" />
                </label>
                <label  className="pagination-item" htmlFor="2">
                  <img src="/img/slide2.jpg" alt="" />
                </label>
                <label  className="pagination-item" htmlFor="3">
                  <img src="/img/slide3.jpg" alt="" />
                </label>
              </div>
            </div>
          </section>
        </>
    )
}
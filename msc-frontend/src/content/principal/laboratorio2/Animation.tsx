import DrawerAppBar from "@/content/principal/components/navbar";

export default function Animation(){
    return(
        <>
        <div className="">
        <div>
        <DrawerAppBar/>
        </div>
        <section style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} className="about-one" >
            <div >
            <h2 style={{textAlign:"center",color:"white"}}>OUR SERVICES</h2>
            <h1 style={{textAlign:"center",color:"white"}} className="about-one-section">ABOUT US</h1>
            </div>
            <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" fillOpacity="1" d="M0,128L80,144C160,160,320,192,480,218.7C640,245,800,267,960,229.3C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            
        </section>
        
        </div>
        </>
    )
}
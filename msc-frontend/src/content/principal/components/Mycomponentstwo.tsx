import {  Button} from "@mui/material";
export default function Mycomponentstwo(props:any) {
    return (
        
        <>
               <div data-aos="fade-right" data-aos-duration="2000"
                          style={{
                            width: "50%",
                            margin: "auto",
                            marginTop: "-20px",
                          }}
                        >
                          <h1 className="two-secction">
                            {props.title}
                          </h1>
                          <p
                            style={{ paddingTop: "1em", paddingBottom: "2em" }}
                          >
                            {props.paragraph}
                          </p>
                          <Button className="button-header" variant="contained">
                            <span>{props.button}</span>
                          </Button>
                        </div>
        </>
    )
}

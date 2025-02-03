import React from 'react'
import { Button } from "@mui/material"

export default function Gallery(props: any) {
    return (
        <>
            <div data-aos="fade-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000" className="box">
                <img src={props.imageUrl} alt="" />
                <div className="content">
                    <h3>{props.name}</h3>
                    <p>
                        {props.description}
                    </p>
                    <Button className='Gallery-Button' variant="contained">{ props.buttonValue }</Button>
                </div>
            </div>
        </>
    )
}
/*rfce*/ 


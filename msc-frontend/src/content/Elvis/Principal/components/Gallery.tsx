import React from 'react'

export function Gallery(props: any) {
    return (
        <>
            <div data-aos="fade-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000" className="box">
                <img src={props.imageUrl} alt="" />
                <div className="content">

                    <p>
                        {props.description}
                    </p>

                </div>
            </div>
        </>
    )
}
/*rfce*/


import React from 'react'
import { Carousel } from 'react-bootstrap'

const index = ({info}) => {
    
    const { des, photos, post } = info
    console.log(photos);
    
    return (
        <div style={{display:"grid", gridGap:"24px"}}>
            <h1>Information</h1>
            <div>
                <h5>ข้อความ</h5>
                <p> {des} </p>
            </div>
            {
                post &&
                <div>
                    <h5>
                        ข้อมูลประกาศ
                    </h5>
                    <p>
                        {post.title}
                    </p>
                </div>
            }
            {
                photos && 
                <div>
                    <h5>
                        ภาพประกอบ
                    </h5>
                    <PhotoCarousel photos={photos} />
                </div>
            }
            
        </div>
    )
}

const PhotoCarousel = ({photos}) => {

    return(
        <Carousel>
            {
                photos.map((photo) => {
                    return (
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={photo}
                            alt="report"
                            />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )

}

export default index

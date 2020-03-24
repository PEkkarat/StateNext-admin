import React from 'react'

const index = ({info}) => {
    
    const { des, photos, post } = info
    console.log(info);
    
    return (
        <div style={{display:"grid", gridGap:"24px"}}>
            <h1>Information</h1>
            <p> {des} </p>
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
        </div>
    )
}

export default index

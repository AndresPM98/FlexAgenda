import s from './DisplayReview.module.css';
import React from 'react';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

const DisplayReview = (props) => {
    
    const review = props.review

    return(
        <div className={s.reviewsContainer}>
            <div>
            <h1 className={s.text}>Opiniones de los usuarios</h1>
            </div>
            <div className={s.revsContainer}>
            {review.length && review.map(rev => {
                return (<div className={s.revContainer}>
                    <div className={s.starsContainer}>
                {[... new Array(5)].map((star, index) => {
                        return index < rev.score ? <AiFillStar/> : <AiOutlineStar/>
                    })}
                    </div>
                    <p>{rev.text}</p>
             </div>      
            )
            
            })}
            </div>
        </div>
    )
}

export default DisplayReview

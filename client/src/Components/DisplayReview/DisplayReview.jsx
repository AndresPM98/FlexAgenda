import s from './DisplayReview.module.css';
import React from 'react';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DisplayReview = () => {

    /* const reviews = [
        {score: 4,
        text: "Excelente profesional, muy buen trato"},

        {score: 2,
        text: "Regular profesional, maso trato"},

        {score: 5,
        text: "Excelente profesional, excelente trato"},

        {score: 0,
        text: "Mal profesional, un desastre"}
    ]; */
    const { id } = useParams(); 
    const allProfessionals = useSelector((state) => state.allProfessionals);

    const findProfessional = allProfessionals.find((prof) => id === prof.id);
    
    console.log(findProfessional);
    const review = findProfessional.review

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

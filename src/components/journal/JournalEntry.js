import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/note';


export const JournalEntry = ( {id, date, title, body, url}) => {

    const dispatch = useDispatch();
      
    const momentDate = moment(date);

    const note ={
        date : date,
        title:title,
        body : body,
        url:url
    }
   

    const handleEntryClick = ()=>{
        dispatch(activeNote(id, note));

    }
    

    return (
        
        
        <div
        className="journal__entry animate__animated animate__fadeIn"
        onClick = {handleEntryClick}
        >

            { url &&
                <div className ="journal__entry-picture"
                style = {{
                    backgroundSize: "cover",
                    backgroundImage : `url(${url})`
                }}
                ></div>

            }
          


            <div className="journal__entry-body">
                <p className ="journal__entry-title">
                    {title}
                </p>

                <p className ="journal__entry-content">
                    {body}
                </p>

            </div>

            <div className="journal__entry-date-box">
                <span>{momentDate.format('dddd')}</span>
                <h4>{momentDate.format('Do')}</h4>

            </div>
        </div>
    
        
    )
}

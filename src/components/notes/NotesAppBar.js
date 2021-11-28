import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpLouding } from '../../actions/note'

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const {active} = useSelector(state => state.note)

    const handleSaveClick = ()=> {
       
        dispatch ( startSaveNote (active));
    }

    const handlepictureClick = ()=> {
        document.querySelector("#fileSelector").click();
    }

    const handleFile = (event) => {
        const file = (event.target.files[0]);
        if (file){
            dispatch (startUpLouding(file));
        }
    }


    return (
        <div className = "notes__appbar">
            <span> 25 Octuber 2021 </span>
            <input 
                id = "fileSelector"
                type = "file"
                style = {{display: "none"}}
                onChange = {handleFile}

            />

            <div>
                <button
                 className="btn"
                 onClick = {handlepictureClick}
                 >
                    Piture
                </button>
                
                <button
                 className="btn"
                 onClick = {handleSaveClick}
                 >
                    Save
                </button>

            </div>
        </div>
    )
}

import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { activeNote, startDelete } from '../../actions/note';
import { useForm } from '../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()
    const {active:myActiveNote} = useSelector(state => state.note);
    const [noteValue, handleNote , reset] = useForm(myActiveNote);
    /* note es un objeto */
    const {title, body , url } = noteValue;
    const activeId  = useRef(myActiveNote.id)
    



 
    /*como el useForm se ejecuta una sola vez y no cada vez que cambia la activeNote del useSelecto, debo ejecutar 
    un useEffct para adaptarlo y ejecutarse siempre.
     Importante considerar la relacion useSelector y UseRef, mientras useSelector me da la información cuando se cargó
     la pagina, el useRef, renderiza un objeto especificpo. Así puedo comparar y utilizar if statement par ver que 
     cambio y que se debe hacer.
    */


    useEffect(() => {

        if (myActiveNote.id !== activeId.current) {
            (reset (myActiveNote));
            activeId.current = myActiveNote.id
        }    
    }, [myActiveNote, reset])

    useEffect(() => {
        dispatch ( activeNote(noteValue, {...noteValue} ) )
        
    }, [noteValue , dispatch])

    const handleDelete = () =>{
        dispatch (startDelete(myActiveNote.id));
    }
    
   

    return (
        <div className="notes__main-content">
                <NotesAppBar />
            <div className="notes__contents">
                <input
                    type = "text"
                    name = "title"
                    placeholder = "Some awesome title"
                    className = "notes__titles-input"
                    value = {title}
                    onChange = {handleNote}

                />
                <textarea
                    placeholder="What happened today"
                    className = "notes__textarea"
                    name = "body"
                    value = {body}
                    onChange = {handleNote}
                ></textarea>

                { (myActiveNote.url) &&
                    <div className = "notes__images animate__animated animate__fadeIn animate__faster">
                    <img 
                        src = {myActiveNote.url}
                        alt= "picture"
                    />
        
                </div>
                }

              

            </div>
            <button 
                className = "btn btn-danger"
                onClick = {handleDelete}
            > 
                Delete
            </button>
            
        </div>
    )
}

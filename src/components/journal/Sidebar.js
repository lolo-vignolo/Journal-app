
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/note';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const {name} = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const handleLogOutButton = ()=> {
        dispatch(startLogout());
       

    }

    const handleAddNote = () =>{
        dispatch(startNewNote());
    }


    return (
        //aside te indica que esto se encuentra en un costado
        <aside className="journal__sidebar">
            <div className = "journal__sidebar-navbar">
                <h3 className="mt-5">
                <i className="far fa-moon"></i>
                    <span> {name} </span>
                </h3>
                <button
                    className = "btn"
                    onClick = {handleLogOutButton}
                > Logout
                 </button>

            </div>

            <div>

                <div className= "journal__new-entry"
                     onClick = {handleAddNote}   
                >
                
                    <i className = "far fa-calendar-plus fa-5x"></i>
                    <p className ="mt-5">New entry</p>
                </div>

            </div>
           <JournalEntries />
        </aside>
    )
}

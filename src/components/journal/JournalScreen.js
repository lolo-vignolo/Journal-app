import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
// import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const {active} = useSelector(state => state.note)
    return (
        //el className tiene a journal y dos __ para indicar que todo lo referido a esas classes estara dentro de journal
        <div className = "journal__main-content animate__animated animate__fadeIn animate__faster">

            <Sidebar />
        
        <main>
            {
               (active !== null)
               ? (<NoteScreen />)
               : (<NothingSelected /> )

            }

        </main>
        
        
        </div>
    )
}

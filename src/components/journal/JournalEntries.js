import React from 'react';
import {JournalEntry} from './JournalEntry';
import {useSelector} from 'react-redux';

export const JournalEntries = () => {

    const {note} = useSelector(state => state.note);
    

    return (
        
        <div className = "journal__entries">

            {
                note.map(note =>(
                    <JournalEntry 
                        key = {note.id} 
                        { ...note }
                    />
                ))
            }
            </div>
        
    );
}

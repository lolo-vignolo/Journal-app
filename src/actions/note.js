import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { loadNote } from "../helpers/loadNotes";
import { types } from "../types/types";

import fileUpload from "../helpers/fileUpload";

/* aqui en estas acciones, toda accion con estructura distinta "que recibe como argumento un dispatch" van a ser acciones relacionads
a vriantes que realizo con mi base de datos, las cuales ser{an llamadas desde los componentes. Por otro lado voy a tener acciones comunes
    donde retorne un type y un payload las cuales van a generr cambion en la pantalla de mi app. Estas acciones seran lammadas dede las 
    antesriores acciones que modifican la base de datos*/ 

   //al ser una tarea asincrona, lleva su callback y el dispach en este caso
    // creo tambien el getState (atributo comun), que lo usare para conseguir el id de la persona,
    // y toda la info para gramar en firestore. funciona como el use selector, tmb sera una funcion.
    // con este segundo argumneto consigo el state . (name, uid, todo)
    // este paso agrega la la estructura de la nota al firestore. 
    // cuando son asincronas, llevan el dispach y van a ejecutar una accion dentro de si mismas. 

export const startNewNote = () =>{

    return async(dispatch , getState) => {
        const {uid} = getState().auth ;
        
        const newNote = {
            title : "",
            body : "",
            date : new Date().getTime()

        }
        const docRef = await addDoc(collection(db,`${uid}/journal/notes` ), newNote )
        console.log(docRef);

        dispatch(activeNote(docRef.id, newNote));
        dispatch (addNewNoteSideBar (docRef.id, newNote));
        

    }
}

// activo la nota para luego hacer modificaciones.
//  necesito el id, para poder rellamarla luego si necesito hacer modificaciones.
export const activeNote = (id, note) =>{
    return {
        type: types.noteActive,
        payload:{
            id,
            ...note
        }
    }
}

export const addNewNoteSideBar = (id, note)=>{
    return {
        type: types.noteAddNew,
        payload:{
            id,
            ...note
        }
    }
}




/* sera una accion que dispare a otra por lo que necesitaré un dispatch, esta accion me permitira 
cargar las notas que setien en el setNotes, el dispach que ejecuta esta ccion esta en AppRouters*/
export const startLoginNotes =  (uid) =>{
    return async(dispatch) =>{
        const notes = await loadNote(uid);
        dispatch(setNotes(notes))
    }
}



export const setNotes = (notes) =>{
    return {
        type:types.noteLoad,
        payload : notes /* sera el array que cree en el hlper loadNotes*/

    }
}


export const startSaveNote = (note) =>{
    return async (dispatch, getState)=> {
        const {uid} =  getState().auth;

        if(!note.url){
            delete note.url;
        }
        

        const noteToFirestore = { ...note};
        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef, noteToFirestore); 
        dispatch(saveNote(note.id , noteToFirestore))
        Swal.fire("Saved", note.title, "success");
    }
}

export const saveNote = (id, note) =>{
    return{
        type : types.noteUpDated,
        payload: {
            id,
            note : {
                id,
                ...note
            }
            
        }
    }

}


export const startUpLouding =(file) => {
    return async (dispatch , getState) =>{
        const {active:activeNote} =  getState().note;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });


        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

       dispatch(startSaveNote(activeNote))

       
        Swal.close();
        
    }

}

/* la primer función elimina el elemento de firestore, luego creo otra para hacerla desaparecer de redux
y la llamo con el dispatch. */
export const startDelete = (id) =>{
    return async ( dispatch , getState) =>{
        const {uid} = getState().auth;
        // await db.doc (`${uid}/journal/notes/${id}`).delete();
        const notDelete = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(notDelete)

        dispatch (deleteDeRedux(id));
    }
}


export const deleteDeRedux = (id) =>{
    return{
        type:types.noteDelete,
        payload: {
            id,
        }
    }

}

export const initialStateAgain = () =>{
    return {
        type: types.noteLogoutCleaning,
        payload : []
    }
}


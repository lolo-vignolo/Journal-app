import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";


/* con este helper quiero estructurar la información que recibo del firestore. cuando ejecuto el getDocs recibo 
muchisima infomacion en un objeto gigante del usuario con el uid que estoy pasando, luego con el snaphijo transformo usando el
 forEach esa informacion en un objeto pequeño solo con la información que me interesa, para luego hacer push al array. */


export const loadNote = async (uid) =>{

    const noteSnap = await getDocs(collection(db,`${uid}/journal/notes` ));
    const notes = [];

    /*snapHijo son cada uno de los elementos dentro del array del console.,*/

    noteSnap.forEach(snapHijo => {
        
        notes.push({
            id: snapHijo.id,
             ...snapHijo.data()
        })

    })

    return notes;
} 
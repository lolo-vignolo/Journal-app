
/* creado para ayudar y reducir el numero de lineas de codigo en el note, precisamente en la accion startUpLouding*/

const fileUpload = async (file) =>{

    

    const cloudUrl = 'https://api.cloudinary.com/v1_1/ds3b6otk5/upload';

    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append ("file", file);

    try {

        const resp = await fetch(cloudUrl, {
            method : "POST",
            body : formData
        });

        if (resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.url
        } else{
            return null;
        }

        
    } catch (error) {
       throw error;
        
    }

    
}

export default fileUpload;

/* resumen para el fetch:
IMPORTANTE POSTMASER SOLO ES PARA OBTENER DATOS, NADA MAS
- creo la funcion que este caso va a recibir el file como atributo (no es mas que el nombre de una imagen en la cpu del usuario). 
- creo una constante con el url del API, la cual la usare en el fetch
- creo que FormData(), el cual lo usare para implementarle las query al URL basico del API
- llamo al fetch , poniendole como atributo, el URL base, aclarando que metodo quiero
si va a ser POST(posteo en el API), GET, o que quiero hacer. Luego le agrego las query dentro de body 
- luego obtengo el resp.JSON, lo que me devolvera el url que voy  usar para postear la 
imagen en el servidor o sea a travez de mi code. Esta respuesta no es otra cosa que el 
objeto que recibo en POSTMASTER cuando una vez completado los key y values aprieto save y 
me tira el OBJETO.
- con este proceso, consigo postear una imagen que esta en la cpu del usuario en el API de imagenes, el URL de 
dicha imagen lo usare para agregarlo a la nota actual.
*/

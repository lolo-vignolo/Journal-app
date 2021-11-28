import fileUpload from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({ 
    cloud_name: 'ds3b6otk5', 
    api_key: '118385476565435', 
    api_secret: 'qtqxkvgAPGqrRKS896KJNqrX9X0',
    secure: true
  }); 


describe('test in helper upLoud', () => {

    test('should auloup a file and return an URL properly', async () => {

        
        
        /* llama a un fetch pasndo el url de la imagen, luego utiliza esa constante creada para llamar un blob, que basicamente lo que hace es crear un URL el cual va a pertenecer al New file,
        luego se sube el file usuando el helper fileUpload */

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');

        const blob = await resp.blob();

        const file = new File([blob], "foto.png");

        const url = await fileUpload(file);
        
        expect (typeof url).toBe("string");

        //borrar imagen por id , sino por cada test creo una imagen nueva en my cloudinary perfil

        const segments = url.split("/")

        const publics_ids = segments[segments.length - 1].replace(".png", "")      /* esta linea de codigo me obtiene el public_id desde el url que estoy testeando 'xufqgxlijvbrxg4pepwb'*/

        cloudinary.v2.api.delete_resources(publics_ids, {},()=>{});
    
    
})

test('should return an error, there isnt any picture', async () => {

    const file = new File([], "foto.png");

    const url = await fileUpload(file);
    
    expect ( url).toBe(null); 





})

})
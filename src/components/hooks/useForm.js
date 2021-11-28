import { useState } from "react";


export const useForm = (initialState={}) => {
    
    const [formulary, setformulary] = useState(initialState);

    const reset = ( newFormState = initialState) => {
        setformulary(newFormState);
    }
    
    const handleInputChange = ({target})=>{
        setformulary({
            ...formulary,
            [target.name] : target.value
        });
    };
    return [formulary , handleInputChange, reset]
    
}
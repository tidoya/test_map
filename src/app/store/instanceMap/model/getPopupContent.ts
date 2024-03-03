import { propertiesTypes } from "../types/types"
enum keysTypes {
    code= 'Код'
}

export const getPopupContent = (properties: propertiesTypes) =>{
    let content = '<div id="popupContentInMap">';

    for (let key in properties) {
        if (key === 'code') {
            content += `<p class="popupContentInMap__text">${keysTypes[key as keyof typeof keysTypes]}: ${properties[key]}</p>`;
        }else{
            content += `<p class="popupContentInMap__text">${properties[key]}</p>`;
        }
    }

    content += '</div>';
    
    return content;
}
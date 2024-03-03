import { propertiesTypes } from "../types/types"

export const getPopupContent = (properties: propertiesTypes) =>{
    let content = '<div id="popupContentInMap">';

    for (let key in properties) {
        content += `<p class="popupContentInMap__text">${properties[key]}</p>`;
    }

    content += '</div>';
    
    return content;
}
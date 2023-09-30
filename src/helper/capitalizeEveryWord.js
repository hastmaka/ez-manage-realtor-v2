import PropTypes from "prop-types";
import {capitalizeFirstLetter} from "./capitalizeFirstLetter.js";

export const capitalizeEveryWord = (txt) => {
    if(txt.includes('_')) {
        const words = txt.split('_');
        const lastWord = capitalizeFirstLetter(words.pop());
        const capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
        return capitalizedWords.join(' ') + (words.length > 0 ? ' ' : '') + lastWord;
    } else {
        return capitalizeFirstLetter(txt)
    }

};

capitalizeEveryWord.propTypes = {
    txt: PropTypes.string.isRequired
}
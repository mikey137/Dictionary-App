import axios from "axios";

const getWordData = async (word) => {
    try {
        const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.REACT_APP_DICTIONARY_API_KEY}`);

        console.log(data)

        const wordData = {
            definitions: data[0].shortdef,
            partOfSpeech: data[0].fl,
            syllables: data[0].hwi.hw,
            pronunciation: data[0].hwi.prs[0].mw,
            audio: data[0].hwi.prs[0].sound.audio,
            quote: data[0].quotes ? data[0].quotes[0].t : null
        }

        return wordData
    } catch (err) {
        console.error(err)
    }
}

const getSynonymsAndAntonyms = async (word) => {
    try {
       const {data} = await axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.REACT_APP_THESAURUS_API_KEY}`) 

       console.log(data)

       const synonymsAndAntonyms = {
           synonyms: data[0].meta.syns ? data[0].meta.syns[0] : null,
           antonyms: data[0].meta.ants ? data[0].meta.ants[0] : null
       }

       return synonymsAndAntonyms
    } catch (err) {
        console.error(err)
    }
}

const getPhoto = async (word) => {
    try {
        const {data} = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${word}&client_id=${process.env.REACT_APP_PHOTO_API_CLIENT_ID}`);

        console.log(data)

        return data.results[0].urls.regular
    } catch (err) {
        console.error(err)
    }
}


export const apiProvider = {
    getWordData,
    getPhoto,
    getSynonymsAndAntonyms
}
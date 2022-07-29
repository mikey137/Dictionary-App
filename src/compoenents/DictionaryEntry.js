import React,{Fragment, useState, useEffect} from 'react';
import {apiProvider} from '../services/apiProvider'
import {functions} from '../services/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

function DictionaryEntry({word, setWord}) {
    const [wordObject, setWordObject] = useState({
        word:"",
        photo: "",
        definition: ""
    })

    const playAudio = () => {
        wordObject.audio.play()
    }

    const handleSubmit = (e, input) => {
        e.preventDefault()
        setWord(input)  
    }

    const handleSearch = async (word) => {
        const wordData = await apiProvider.getWordData(word)
        const synonymsAndAntonyms = await apiProvider.getSynonymsAndAntonyms(word)
        const photo = await apiProvider.getPhoto(word)
        const subdirectory = functions.findSubdirectory(wordData.audio)
        setWordObject({
            word: word,
            photo: photo,
            definitions: wordData.definitions,
            partOfSpeech: wordData.partOfSpeech,
            syllables: wordData.syllables,
            pronunciation:wordData.pronunciation,
            audio: new Audio(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${wordData.audio}.mp3`),
            quote: wordData.quote ? functions.editQuoteString(wordData.quote) : null,
            synonyms: synonymsAndAntonyms.synonyms,
            antonyms: synonymsAndAntonyms.antonyms
        })
    }

    useEffect(() => {
        if(word){
            handleSearch(word)
        }
    },[word])

    return (
        <Fragment>
            <div className="background-img" style={{backgroundImage: `url(${wordObject.photo})`}}></div>
            <div className="main-content">
                <div className="flex-wrap-container">
                    <h1>{wordObject.word}</h1>
                    <h3>{wordObject.partOfSpeech}</h3>
                    <button className="icon-btn" onClick={playAudio}>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </button>
                </div>
                <div className="flex-wrap-container">
                    <h4>{wordObject.syllables} | </h4>
                    <h4>\ {wordObject.pronunciation} \</h4>
                </div>
                <ol>
                    {wordObject.definitions?.map((definition, index) => (
                        <li key={index}>{definition}</li>
                    ))}
                </ol>
                {wordObject.quote &&
                    <p>Quotes: {wordObject.quote}</p>
                }
                {wordObject.synonyms &&
                    <div className="list-container">
                        <h3>Synonyms</h3>
                        <ul>
                            {wordObject.synonyms?.map((synonym) => (
                                <li key={synonym}>
                                    <button onClick={(e) => handleSubmit(e, synonym)}>{synonym}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                } 
                {wordObject.antonyms &&
                    <div className="list-container">
                        <h3>Antonyms</h3>
                        <ul>
                            {wordObject.antonyms?.map((antonym) => (
                                <li key={antonym}>
                                    <button onClick={(e) => handleSubmit(e, antonym)}>{antonym}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </Fragment>
    );
}

export default DictionaryEntry;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Search({setWord}) {
    const [input, setInput] = useState()

    const handleOnChange = e => {
        setInput(e.target.value)
    }

    const handleSubmit = (e, input) => {
        e.preventDefault()
        setWord(input)  
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, input)} className="search-bar">
            <input 
                type="text" 
                onChange= {(e) => handleOnChange(e)}
                placeholder= "search..."
                value={input}
            />
            <button className="search-btn" type="submit" >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    );
}

export default Search;
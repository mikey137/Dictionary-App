import React, {useState} from 'react';
import './App.css';
import Search from './compoenents/Search';
import DictionaryEntry from './compoenents/DictionaryEntry';

function App() {
  const [word, setWord] = useState("dictionary")

  return (
    <div className="App">
      <Search setWord={setWord} />
      <DictionaryEntry word={word} setWord = {setWord}/>
    </div>
  );
}

export default App;

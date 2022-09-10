import { useState, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Result from './Result';
import { motion } from 'framer-motion';

function Output() {

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [search, setSearch] = useState("");
    const [dictionaryData, setDictionaryData] = useState([]);

    const [definition, setDefinition] = useState([]);
    const [partsOfSpeech, setPartsOfSpeech] = useState([]);
    const [phonetics, setPhonetics] = useState("");

    const getValue = e => {
        setSearch(e.target.value);
        // console.log(search)
    }
    const handleSubmit = e => {

        getMeaning(search);
        document.getElementById("search").value = "";
        e.preventDefault();
    }

    const getMeaning = async (value) => {

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
            const data = await response.json();

            if ((response.status < 400 || response.status >= 600)) {
                const dictionaryData = data;
                setDictionaryData(dictionaryData);
                // console.log(data)
                console.log(dictionaryData)
                // console.log(dictionaryData[0].meanings[0].definitions[0].definition)
                setDefinition(dictionaryData[0].meanings[0].definitions)
                setPartsOfSpeech(dictionaryData[0].meanings[0].partOfSpeech)

                setIsPending(true);
                setError(false);
            } else {
                setIsPending(false)
                setError(true);
                setErrorMessage("No definition found, please enter a valid word...");
            }
        } catch (error) {
            setError(true);
            setErrorMessage("Whoops! Something went wrong on our end. Please try again");
            console.log(error);
        }

    }
    //keeping unique key for every map definition. 
    let [i, seti] = useState(0);
    useEffect(() => {
        seti(0)
    }, [])

    return (
        <div className='output'>

            <form onSubmit={handleSubmit}>
                <input id='search'
                    onChange={getValue}
                    type="search"
                    placeholder='&#x1F50D; for the meaning!' />
            </form>
            <Splide
                options={{
                    arrows: false
                }}>


                {isPending &&
                    dictionaryData.map(data => (
                        <SplideSlide key={i++}>

                            <Result
                                word={dictionaryData[0].word}
                                phonetic={dictionaryData[0].phonetic}
                                definition={definition[i].definition}
                                partOfSpeech={partsOfSpeech} />

                        </SplideSlide>

                    ))
                }

            </Splide>

            {error &&
                <div id='errorMessage'>
                    <h1>{errorMessage}</h1>
                </div>
            }
        </div>
    )
}

export default Output
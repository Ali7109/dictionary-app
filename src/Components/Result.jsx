
import { motion } from 'framer-motion';


function Result({ word, phonetic, definition, partOfSpeech }) {
    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 1 }}
            className='result'>
            <div>
                <h1>{word.charAt(0).toUpperCase() + word.substring(1, word.length)} <span id="pos">({partOfSpeech})</span></h1>
                <p> {phonetic}</p>
            </div>
            <p>{definition}</p>
        </motion.div>)
}

export default Result
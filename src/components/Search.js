import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    //term copy for debounce purposes
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    //code to prevent React warning about useEffect dependancy array with missing result.length 
    //and prevent double request from actually placing it
    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedTerm(term), 500);
        return () => {
            clearTimeout(timeoutId);
          };
    }, [term])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });
    
            setResults(data.query.search);
        };

        search();
    }, [debouncedTerm])

    //easier solution, which causes React warning about results.length missing dependancy or double request problem if we place it
    // useEffect(() => {
    //     const search = async () => {
    //       const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
    //         params: {
    //           action: 'query',
    //           list: 'search',
    //           origin: '*',
    //           format: 'json',
    //           srsearch: term,
    //         },
    //       });
    
    //       setResults(data.query.search);
    //     };

    //     let timeoutId;
        
    //     //debounce only if we changed search term (don't debounce on initial load)
    //     if(term) {
    //         if(!results.length){
    //             search();
    //         } else {
    //             timeoutId = setTimeout(() => search(), 1000);
    //         }
    //     //debounce the result search
    //     }
        
    //     //cleanup function to stop timer if ter has changed earlier that 500 ms
    //     return () => {
    //       clearTimeout(timeoutId);
    //     };
    // }, [term]);

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input className="input" onChange={e => setTerm(e.target.value)} value={term} />
                </div>
                <div className="ui celled list">
                    {results.map(res => {
                        return (
                            <div className="item" key={res.pageid}>
                                <div className="right floated content">
                                    <a 
                                        className="ui button" 
                                        href={`https://en.wikipedia.org?curid=${res.pageid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Go
                                    </a>
                                </div>
                                <div className="content">
                                    <div className="header">{res.title}</div>
                                    {/* string to jsx to avoid non-treated html text problem */}
                                    {/* is a big security issue - can provoke xss attack, do you trust this 3rd party? */}
                                    <span dangerouslySetInnerHTML={{__html: res.snippet}} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Search;
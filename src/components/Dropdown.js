import React, {useRef, useState, useEffect} from 'react';

const Dropdown = ({options, selected, onSelectedChange, label}) => {
    const [opened, setOpened] = useState(false);
    const ref = useRef();

    useEffect(() => {
        //events set with 'addeventlistener' always get called first
        const onBodyClick = event => {
            if(ref.current.contains(event.target)) return;
            setOpened(false);

        }
        document.body.addEventListener('click', onBodyClick);

        //cleanup function to remove ref in case we remove dropdown from DOM
        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);

    const renderOptions = options.map(option => {
        if(option.value === selected.value) return null;
        return (
            <div 
                key={option.value} 
                className="item"
                onClick={()=> onSelectedChange(option)}
            >
                {option.label}
            </div>
        )
    })

    return (
        <div className="ui form" ref={ref}>
            <div className="field">
                <label className="label">{label}</label>
                <div 
                    className={`ui selection dropdown ${opened && "visible active"}`} 
                    onClick={() => setOpened(!opened)}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${opened && "visible transition"}`}>
                        {renderOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
import React, {useState} from 'react';

const Accordion = ({items}) => {
    const [activeIndex, setActiveIndex] = useState();

    const onItemClick = (index) => {
        if(index === activeIndex) setActiveIndex();
        else setActiveIndex(index);
    }

    const renderItems = items.map((item, i) => {
        const active = activeIndex === i ? 'active' : '';
        return (
            <React.Fragment key={item.title}>
                <div 
                    className={`title ${active}`} 
                    onClick={() => onItemClick(i)}
                >
                    <i className="dropdown icon" />
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    {item.content}
                </div>
            </React.Fragment>
        )
    });

    return (
        <div className="ui styled accordion">{renderItems}</div>
    )
}

export default Accordion;
import React from 'react';

const Link = ({children, className, href}) => {
    const onLinkClick = event => {
        //if ctrl click - work as usual (open in a new tab);
        if(event.metakey || event.ctrlKey) return;
        //without navigation control browser is making to many requests - reloading the whole page
        event.preventDefault();
        //manually change url
        window.history.pushState({}, '', href);

        //sending event that url has changed so router could change component
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }
    return (
        <a 
            className={className} 
            href={href}
            onClick={onLinkClick}
        >
            {children}
        </a>
    )
}

export default Link;
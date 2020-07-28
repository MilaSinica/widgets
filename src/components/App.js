import React, {useState} from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';
import Translate from './Translate';
import Route from './Route';
import Header from './Header';

export default () => {
  const items = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces. "
    },
    { 
      title: "Why use React?",
      content: "While often considered a JavaScript framework like Angular or Vue.js, React is actually a frontend open source library. It’s used specifically for large, complex web interfaces as well as single-page applications. Created first by Jordan Walke, a software engineer at Facebook, it was quickly implemented in Facebook’s newsfeed back in 2011. A year later Facebook’s Instagram.com followed, and that’s when it all started. These days, hundreds of thousands (if not millions) of websites are powered by this library and thousands more are born every single day. In fact, ever since the launch of React, we’ve seen an explosive growth in the usage of lightweight but powerful JavaScript libraries. Users more and more often want to use faster, more dynamic web pages, while developers opt for modern and flexible environments without tons of boilerplate in the package. That’s why ReactJS is an obvious choice for many. ",
    },
    {
      title: "What does React do?",
      content: "At its very core, React basically maintains a tree for you. This tree is able to do efficient diff computations on the nodes. Think of your HTML code as a tree. In fact, that is exactly how the browser treats your DOM (your rendered HTML on the browser). React allows you to effectively re-construct your DOM in JavaScript and push only those changes to the DOM which have actually occurred."
    }
  ];

  const options = [
    {
      label: 'Red',
      value: 'red'
    },
    {
      label: 'Blue',
      value: 'blue'
    },
    {
      label: 'Green',
      value: 'green'
    }
  ];

  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <Header />
      <Route path="/"><Accordion items={items} /></Route>
      <Route path="/search"><Search /></Route>
      <Route path="/translate"><Translate /></Route>
      <Route path="/dropdown">
        <button className="ui button primary" onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
          {showDropdown && 
            <>
              <hr />
              <Dropdown 
                options={options} 
                selected={selected} 
                onSelectedChange={setSelected} 
                label="Select Color" 
              />
              <h3 style={{color: selected.value}} className="ui header">Selected color: {selected.label}</h3>
            </>
          }
      </Route>
    </div>
  );
}

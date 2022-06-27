import React, { useState, useEffect } from 'react'
import { Input, Icon, } from 'semantic-ui-react';
import { useRef } from 'react';
import './App.css';

function Reactselect(props) {
  const onClickOutside = () => {
    setBool(false)
  }
  const [search, setSearch] = useState("");
  const [bool, setBool] = useState(false);
  const [item, setItem] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  function onKeyDown(e) {
    if (e.keyCode === 8) {
      item?.pop()
    }
  }
  return (
    <div className="App">
      <h2>React-Select-App</h2>
      <div ref={ref} >
        <div className='select' onClick={() => setBool(bool => !bool)}>
          {
            props?.isMulti ? item?.map((val) => {
              return <div className='values' key={val}>
                <div className='val'><p>{val}</p></div>
                <div className='svg-icon' onClick={() => setItem(item.filter(name => name !== val))}>{val ? <Icon name='close' size='small' className='ico' /> : null}</div>
              </div>
            }) : <div className='values'>
              <div className='val'><p>{item}</p></div>
              {item[0] ?
                <div className='svg-icon' onClick={() => setItem([])}> <Icon name='close' size='small' className='ico' /></div> : null}
            </div>
          }
          {props?.isSearchable ?
            <Input
              placeholder={item?.length > 0 ? null : "select.."}
              className='input-tag'
              transparent
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => setBool(bool => bool)}
              value={search}
              onKeyDown={onKeyDown}
            />
            :
            <div
              className='input-tag'
              onClick={() => setBool(bool => bool)}
            >
              {item?.length > 0 ? null : "select.."}
            </div>
          }
          <div className='last-icons'>
            {item?.length > 0 ? <Icon name='close' size="large" onClick={() => setItem(null)} color="grey" /> : null}
            <h3>|</h3>
            <Icon name='chevron down' size="large" onClick={() => setBool(bool => bool)} />
          </div>
        </div>
        {
          bool ? <div className='options-div' >
            {
              props?.options?.map((data) => {
                if (search && data.label.toLowerCase().includes(search)) {
                  return !item?.includes(data.label) ? <p key={data.label} onClick={() => {
                    props?.isMulti ? setItem(item ? [...item, data.label] : [data.label]) : setItem([data.label])
                    setBool(bool => !bool)
                  }}>{data.label}</p> : null
                } else if (!search) {
                  return !item?.includes(data.label) ? <p key={data.value} onClick={() => {
                    props?.isMulti ? setItem(item ? [...item, data.label] : [data.label]) : setItem([data.label])
                    setBool(bool => !bool)
                  }} >{data.label}</p> : null
                }
                return null
              })
            }
            {(props?.options?.length === item?.length) ? <p>no more options..</p> : null}
          </div> : null
        }
      </div>
    </div>
  );
}

export default Reactselect;

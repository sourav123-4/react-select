import React, { useState, useEffect } from 'react'
import { Input, Icon, } from 'semantic-ui-react';
import { useRef } from 'react';
import clsx from 'clsx';
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
      if (search) {
        return
      }
      item?.pop()
      setBool(!bool)
    }
  }
  function onEnter(e) {
    if (e.keyCode === 13) {
      props?.options?.map((val) => {
        if (val.label.toLowerCase().includes(search)) {
          props?.isMulti ? setItem(item ? [...item, val.label] : [val.label]) : setItem([val.label])
          setSearch("")
        }
        return null
      })
    }
  }
  const style = clsx({
    ["select"] : props?.backgroundcolor==="primary",
    ["select1"] : props?.backgroundcolor==="secondary",
    ["select"] : !props?.backgroundcolor
  })
  return (
    <div className="App">
      <h2>React-Select-App</h2>
      <div ref={ref} >
        <div className={style} onClick={() => setBool(bool => !bool)}>
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
              onKeyDown={(e) => {
                onKeyDown(e)
                onEnter(e)
              }
              }
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
            {item?.length > 0 ? <Icon name='close' onClick={() => setItem(null)} color="grey" /> : null}
            {/* <h4>|</h4> */}
            <Icon name="ellipsis vertical" color='gray' />
            <Icon name='chevron down' onClick={() => setBool(bool => bool)} />
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
                    setSearch("")
                  }}>{data.label}</p> : null
                } else if (!search) {
                  return !item?.includes(data.label) ? <p key={data.value} onClick={() => {
                    props?.isMulti ? setItem(item ? [...item, data.label] : [data.label]) : setItem([data.label])
                    setBool(bool => !bool)
                    setSearch("")
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

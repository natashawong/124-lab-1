import React, { useState } from 'react';
import List from './List';

import './styles.css';
import {filterType, modeType} from './Constants';

function App() {
  const initialData = [
    {
      id: 1,
      todo: "Call mom",
      completed: false,
    },
    {
      id: 2,
      todo: "Eat lunch",
      completed: false,
    }
  ]

  const [data, setData] = useState(initialData);
  const [filter, setFilterType] = useState(filterType.showAll);
  const [mode, setMode] = useState(modeType.base);
  const [deleteAllowed, setDeleteAllowed ] = useState(false);

  function plusClicked() {
      let newId = data.length;
      let newData = data;

      newData.push({
          id: newId,
          todo: "",
          completed: false,
      })

      setData(newData);
      setMode(modeType.add);
  }

  function doneClicked() {
    let newData = data;
    if (data.length > 1) {data[data.length-1].todo === "" && newData.pop()}

    setData(newData);
    setMode(modeType.base);
  }

  function editClicked() {
    data.map((items, i) => {
      if (items.completed) {setDeleteAllowed(true)}
    })
    setMode(modeType.edit);
  }

  function deleteSelected() {
    const newData = data.filter((item) => !item.completed)
    setData(newData);
  }

  return (
    <>
      <div className="buttons">
          {(mode === modeType.add || mode === modeType.edit) ? 
                (<button className="button doneButton" onClick={doneClicked}>Done</button>)
              :
              (
                <>
                <button className="button editButton" onClick={editClicked}>Edit</button>
                <button className="button plusButton" onClick={plusClicked}>+</button> 
                </>
              )
          }
      </div>
      <div className="body-container">
          <div className="title">
              <h1 className="underline">To-do list</h1>
          </div>
      </div>

      <List
        data={data} 
        filterType={filter}
        setData={(isComplete, index) => {
          let newData = data;
          newData[index].completed = isComplete;
          setData(newData);
        }}
        editData={(newTodo, index) => {
          let newData = data;
          newData[index].todo = newTodo;
          setData(newData);
        }}
        mode={mode}
      />

      <div className="footer">
        {mode === modeType.edit && 
          <>
            {deleteAllowed && <button className="button deleteSelected" onClick={deleteSelected}>Delete Selected</button>}
            {filter === filterType.hideCompleted ? 
              <button className="button showCompleted" onClick={() => setFilterType(filterType.showAll)}>Show All</button> :
              <button className="button showCompleted" onClick={() => setFilterType(filterType.hideCompleted)}>Hide Completed</button>
            }
            <button className="button deleteCompleted" onClick={deleteSelected}>Delete Completed</button> 
          </>}
      </div>
    </>
  );
}

export default App;

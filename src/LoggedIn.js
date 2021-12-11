import React, { useEffect, useState } from 'react';
import List from './List';
import Tabs from './components/Tabs';
import firebase from "firebase/compat";
import { useCollection } from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { useAuthState } from 'react-firebase-hooks/auth';

import './styles.css';
import {filterType, modeType} from './Constants';

const firebaseConfig = {
  apiKey: "AIzaSyATi5uqr6dkf4iTvqfPHndGwtHXz0O6O-s",
  authDomain: "lab-90286.firebaseapp.com",
  databaseURL: "https://lab-90286-default-rtdb.firebaseio.com",
  projectId: "lab-90286",
  storageBucket: "lab-90286.appspot.com",
  messagingSenderId: "782831139249",
  appId: "1:782831139249:web:2d846e81abb155eeece590",
  measurementId: "G-YTZ7W2BRD9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default function LoggedIn() {
  const collection = db.collection('todo_list');
  const [query, setQuery] = useState(collection);

  const [todoListData, setTodoListData] = useState([]);
  const [lastId, setLastId] = useState("");
  const [filter, setFilterType] = useState(filterType.showAll);
  const [mode, setMode] = useState(modeType.base);

  const [value, error, loading] = useCollection(collection);
  const [currList, setCurrList] = useState("");

  const auth = firebase.auth();
  const [user, userLoading, userError] = useAuthState(auth);

  const [sharedWithList, setSharedWithList] = useState([]);

  useEffect(() => {
    let data = [];
    if (value) {
      data = value.docs.map((doc) => {
            return {...doc.data()}});
      const filterData = data.filter(item => item.sharedWith.includes(user.email));
      setTodoListData(filterData);
      const tempList =  filterData.length > 0 ? filterData[0].sharedWith : [];
      setSharedWithList(tempList);

      if (currList === "") {
        setCurrList(data[0].list);
      }
    }
  }, [currList, user.email, value]);

  function plusClicked() {
    // Adds an empty Todo
    const newId = generateUniqueID();
    let currDate = firebase.firestore.Timestamp.now();
    collection.doc(newId).set({ id: newId, todo: "", completed: false, priority: 2, creationdate: currDate, list: currList, sharedWith: sharedWithList});
    setLastId(newId);
    setMode(modeType.add);
  }

  function newList() {
    // Creates a new list called "List<some combination of unique ID numbers>" with a "First Todo"
    const newId = generateUniqueID();
    let currDate = firebase.firestore.Timestamp.now();
    collection.doc(newId).set({ id: newId, todo: "First Todo", completed: false, priority: 2, creationdate: currDate, list: "List" + newId.slice(20, 25), sharedWith: [user.email]});
    setLastId(newId);
    setMode(modeType.add);
  }
  
  function removeTodo(id) {
    collection.doc(id).delete();
  }

  function editTodo(newTodo, id) {
    // edits an existing Todo
    let todoObj = {'id': id, 'todo': newTodo}
    collection.doc(id).update(todoObj);
  }

  function setCompleted(isCompleted, id) {
    // changes the state of completed
    let todoObj = {'id': id, 'completed': isCompleted}
    collection.doc(id).update(todoObj);
  }

  function setPriorityLevel(priorityLevel, id) {
    // changes the priority level
    let todoObj = {'id': id, 'priority': priorityLevel}
    collection.doc(id).update(todoObj);
  }

  function editTabTitle(tabTitle, id) {
      // changes the list title
      let todoObj = {'id': id, 'list': tabTitle}
      collection.doc(id).update(todoObj);
      setCurrList(tabTitle);
  }

  function editShareWith(toShareWith) {
    // changes who the list is shared with
    const temp = sharedWithList;
    temp.push(toShareWith);
    setSharedWithList(temp);
    let todoObj = {'sharedWith': sharedWithList}
    // update all todos belonging to this specific list
    todoListData.filter((item) => item.list === currList).forEach((todo) => collection.doc(todo.id).update(todoObj));
  }

  function doneClicked() {
    if (todoListData.length > 0 && todoListData[todoListData.length-1].todo === "") {removeTodo(lastId)}
    setMode(modeType.base);
  }

  function editClicked() {
    setMode(modeType.edit);
  }

  function handleSortChange(e) {
    const sortType = e.target.value;
    const sortOrder = sortType === "creationdate" ? 'desc' : 'asc';
    const sortQuery = collection.orderBy(sortType, sortOrder);
    setQuery(sortQuery);
  }

  function showHideButtons() {
    return (
        <>
        {filter === filterType.hideCompleted ?
        <button aria-label="Show all items" className="button showCompleted" onClick={() => setFilterType(filterType.showAll)}>Show All</button> :
        <button aria-label="Hide completed items" className="button showCompleted" onClick={() => setFilterType(filterType.hideCompleted)}>Hide Completed</button>}
        </>
    )
  }

    return (
      <div>
      {query.loading && <h1>Loading...</h1>}
      {todoListData && <>
        <div className="userInfo">
          <h3>{user.email}</h3>
          <button type="button" className="button doneButton" style={{width: 80}} onClick={() => auth.signOut()}>Log out</button>
        </div>

        <div className="body-container">
            <div className="title">
                <h1 className="underline">{user.email.substring(0, user.email.indexOf("@"))}'s To-do list</h1>
            </div>
        </div>

        <div className="buttons">
          <div className="mainDropdownContainer">
              <select name="dropdown" className="mainDropdown" onChange={handleSortChange} disabled={mode === modeType.edit}>
                <option aria-label="Sort by priority" value="priority">Sort by priority</option>
                <option aria-label="Sort by name" value="todo">Sort by name</option>
                <option aria-label="Sort by creation date" value="creationdate">Sort by creation date</option>
              </select>
          </div>

          <div className="controlButtonContainer">
            {(mode === modeType.add || mode === modeType.edit) ? 
                  (<button aria-label="Finish editing" className="button doneButton" onClick={doneClicked}>Done</button>)
                :
                (
                  <>
                  <button aria-label="Edit" className="button editButton" onClick={editClicked}>Edit</button>
                  <button aria-label="Add a new todo" className="button plusButton" onClick={plusClicked}>+</button> 
                  </>
                )
            }
          </div>
        </div>

        <Tabs
          data={todoListData}
          currTab={currList}
          onNewTab={newList}
          onSelectTab={selectedList => setCurrList(selectedList)}
          onEditTabTitle={(tabTitle, index) => editTabTitle(tabTitle, index)}
          mode={mode}
        />

        <List
          data={todoListData}
          currList={currList}
          filterType={filter}
          onSetData={(isComplete, index) => {
            setCompleted(isComplete, index)
          }}
          onEditData={(newTodo, index) => {
            editTodo(newTodo, index);
          }}
          onChangePriority={(newTodo, index) => {
            setPriorityLevel(newTodo, index);
          }}
          onShowAll={showHideButtons()}
          onRemoveTodo={(id) => {
            removeTodo(id)
          }}
          editShareWith={(newTodo, index) => {
            editShareWith(newTodo, index)
          }}
          mode={mode}
          lastId={lastId}
        />
      </>
      }
      </div>
    )
}

import React, { useEffect, useState } from "react";
import "./App.css";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(getLocalItems());

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  function addItem() {
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);

    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function editItem(id, newText) {
    const currentItem = items.filter((item) => item.id === id);

    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container mt-5 w-50">
      <h1 id="heading">My Todo List</h1>

      <div className="input-group mt-5">
        <input
          className="form-control"
          type="text"
          placeholder="Add a task..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />

        <button className="btn btn-primary" onClick={() => addItem()}>
          Add
        </button>
      </div>

      <ul className="list-group mt-4">
        {items.map((item) => {
          return (
            <div>
              <li
                className="list-group-item"
                key={item.id}
                onClick={() => setShowEdit(item.id)}
              >
                {item.value}
                <button className="btn " onClick={() => deleteItem(item.id)}>
                  ❌
                </button>
              </li>

              {showEdit === item.id ? (
                <div className="list-group">
                  <input
                    className="list-group-item"
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />

                  <button
                    className="btn btn-secondary ,list-group-item "
                    onClick={() => editItem(item.id, updatedText)}
                  >
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

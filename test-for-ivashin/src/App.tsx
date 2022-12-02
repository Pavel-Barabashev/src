import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import { v4 as uuidv4 } from "uuid";

import axios, { AxiosResponse } from "axios";
import { Entry } from "./types";

function App() {
  let [text, setText] = useState("");
  let [entries, setEntries] = useState(Array<Entry>);
  let [editableEntry, setEditableEntry] = useState<Entry>();
  let [editedText, setEditedText] = useState("");
  const entriesUrl = "http://localhost:8000/entry";

  function createEntry() {
    let result = text.match(/#\w+/g);
    console.log(result);
    let entry = { id: uuidv4(), text };
    return axios.post(entriesUrl, entry).then((response: AxiosResponse) => {
      return response;
    });
  }

  function updateEntry() {
    let editedEntry = {
      id: editableEntry?.id,
      text: editedText,
    };
    return axios.put(entriesUrl, editedEntry);
  }

  function getEntries() {
    return axios.get(entriesUrl).then((response: AxiosResponse) => {
      return response.data;
    });
  }

  useEffect(() => {
    async function wrapper() {
      let data = await getEntries();
      setEntries(data);
    }
    wrapper();
  }, []);

  return (
    <div className="App">
      <div className="entry-creation-form-container">
        <form
          className="entry-creation-form"
          onSubmit={(event) => {
            event.preventDefault();
            createEntry().then((response) => {
              console.log(response);
            });
          }}
        >
          <textarea
            required
            placeholder="enter text"
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></textarea>
          <input type="submit" value="save" />
        </form>
      </div>
      <div className="entries-container">
        {entries &&
          entries.map((entry) => (
            <div className="entry-item" key={entry.id}>
              <textarea value={entry.text} readOnly />
              <button
                onClick={() => {
                  setEditableEntry(entry);
                }}
              >
                edit
              </button>
              <button>delete</button>
            </div>
          ))}
      </div>
      {editableEntry ? (
        <form
          className="entry-edit-form"
          onSubmit={(event) => {
            event.preventDefault();
            updateEntry();
          }}
        >
          <textarea
            defaultValue={editableEntry.text}
            onChange={(event) => {
              setEditedText(event.target.value);
            }}
          />

          <input type="submit" value="submit" disabled={!editedText} />
          <input
            type="button"
            value="close"
            onClick={() => {
              setEditableEntry(undefined);
            }}
          />
        </form>
      ) : null}
    </div>
  );
}

export default App;

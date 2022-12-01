import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import { v4 as uuidv4 } from "uuid";

import axios, { AxiosResponse } from "axios";
import { Entry } from "./types";

function App() {
  let [text, setText] = useState("");
  let [entries, setEntries] = useState(Array<Entry>);
  const entriesUrl = "http://localhost:8000/entry";

  function createEntry() {
    console.log(uuidv4());
  }

  function getEntries() {
    return axios.get(entriesUrl).then((response: AxiosResponse) => {
      return response.data;
    });
  }

  useEffect(() => {
    async function wrapper() {
      let data = await getEntries();
      console.log(data);
      setEntries(data.entries);
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
            createEntry();
            getEntries();
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
      <div>{entries && entries.map((entry) => <p>{entry.id}</p>)}</div>
    </div>
  );
}

export default App;

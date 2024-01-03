import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo} from "./utils/HandleApi";
function App() {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
    <div className="App">
      {/* App Name */}
      <div className="appname">
        <h1>ＴａｓｋＦｌｏｗ</h1>
      </div>
      
      <div className="container">
        {/* heading */}
        <h2>Organize Your Day</h2>

        <div className="top">
          {/* user input */}
          <div className="inputclass">
            <input
              type="text"
              placeholder="Add your task here."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {/* button */}
          <div 
           className="add" 
           onClick={ isUpdating ?
             () => updateToDo (toDoId, text, setToDo, setText, setIsUpdating)
             : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        {/* ToDo List */}
        <div className="list">

          {toDo.map((item) => <ToDo
           key={item._id} 
           text={item.text} 
           updateMode={() => updateMode(item._id, item.text)}
           deleteToDo={() => deleteToDo(item._id, setToDo)}
           />)}

        </div>

      </div>

    </div>
  );
}

export default App;

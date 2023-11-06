import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleClearing = () => {
    setOutput('');
  }

  const submitCode = () => {
    console.log(code)

    setOutput("Error en tal parte de código")
  }
  return (
    <div className="content">
      <div className="heading">
        <h3 className="errorsLog" >Reporte de errores: <span>{output}</span> </h3>
        <button className="clearButton" onClick={handleClearing}>Clear errors</button>
      </div>
      <CodeMirror
        value={code}
        height="400px"

        theme={vscodeDark}
        onChange={(editor, change) => {
          setCode(editor);
          console.log(code)
        }}
      />
      <button className="buttonSubmit" onClick={submitCode}>Enviar</button>
    </div>

  );
}
export default App;
import React, { useState } from "react";
import "./index.css";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const CodeValidator = () => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const rules = [
    {
      regex: /^(int|string)\s+[a-z]([a-z][a-z])?\s+=\s+(\d+|"[^"]*")$/,
      message: "La asignación no es válida.",
    },
    {
      regex: /^Task[a-zA-Z]+\([a-zA-Z]\)\{[^}]\}$/,
      message: "La definición de la función no es válida.",
    },
    {
      regex: /^Iterate[a-z]([a-zA-Z][a-z])?in range\d+\.\d+\.\d+\.\d+\{[^}]\}$/,
      message: "La estructura de control 'si' no es válida.",
    },
    {
      regex:
        /^If[a-z]([a-zA-Z][a-z])?("."|\d+(\d))?(==|>|<|>=|<=)then\{[^}]\}$/,
      message: "El bucle 'for' no es válido.",
    },
    {
      regex: /^Principal Task\(\)\{[^}]*\}$/,
      message: "Funcion main no válida.",
    },
    {
      regex: /^Contenido$/,
      message: "La instrucción de impresión no es válida.",
    },
  ];

  const validateBrackets = (codeToValidate) => {
    const stack = [];
    const lines = codeToValidate.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      for (let j = 0; j < line.length; j++) {
        const char = line[j];

        if (char === "{") {
          stack.push({ line: i + 1, char: j + 1 });
        } else if (char === "}") {
          if (stack.length === 0) {
            return `Error: Llave de cierre sin correspondencia en la línea ${i + 1
              }, columna ${j + 1}`;
          }
          stack.pop();
        }
      }
    }

    if (stack.length > 0) {
      const lastUnclosed = stack.pop();
      return `Error: Llave de apertura en la línea ${lastUnclosed.line}, columna ${lastUnclosed.char} sin cierre correspondiente`;
    }

    return null; // No hay errores de llaves.
  };

  const validateLine = (line, lineNumber) => {
    for (let rule of rules) {
      if (rule.regex.test(line.trim())) {
        return null;
      }
    }
    return `Error en la línea ${lineNumber}: en la declaración de: "${line.trim()}"`;
  };

  const validateCode = (codeToValidate) => {
    const lines = codeToValidate.split("\n");
    const newErrors = {};
    let hasBracketError = false;

    lines.forEach((line, index) => {
      const error = validateLine(line, index + 1);
      if (error) {
        newErrors[index] = error;
      }
    });

    const bracketError = validateBrackets(codeToValidate);
    if (bracketError) {
      newErrors["brackets"] = bracketError;
      hasBracketError = true;
    }

    setErrors(newErrors);
  };
  const handleCodeChange = (code) => {
    const newCode = code;
    setCode(newCode);
    validateCode(newCode);
  };

  return (
    <div className="content">
      <h3 className="errorsLog" >Verificador de sintaxis</h3>
      <CodeMirror
        value={code}
        height="400px"

        theme={vscodeDark}
        onChange={(editor, change) => {
          handleCodeChange(editor);
          console.log(code)
        }}
      />

      <div style={{ marginLeft: "20px" }}>
        {Object.keys(errors).length > 0 ? (
          <ul className="errorsLog">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) : (
          <p className="errorsLog">El código es válido.</p>
        )}
      </div>
    </div>
  );
};

export default CodeValidator;

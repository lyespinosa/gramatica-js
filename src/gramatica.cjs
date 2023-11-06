module.exports = `
// Declaración de variables
Start_Var_Decl = Var_Type Var_Letter Identifier Equals Declarator

Var_Type = "int" / "string"
Var_Letter = [a-z]
Identifier = Var_Letter (Identifier / ε)
Equals = "="
Declarator = Number_Decl / Char_Literal_Decl / Identifier_Char_Literal_Decl

Number_Decl = Number Number_Char_Literal_Decl
Number = [0-9]
Number_Char_Literal_Decl = Number Number_Char_Literal_Decl / ε

Char_Literal_Decl = '"' Char_Content '"'
Char_Content = Char Char_Content / ε
Char = [^"]

Identifier_Char_Literal_Decl = Identifier

// Funciones
Start_Func = Task Letter Identifier Param_List Var_List Identifier Block_Content

Task = "Task"
Letter = [a-zA-Z]
Param_List = "(" Param_List_Content ")"
Param_List_Content = Param / ε
Param = Letter Param_Identifier Param_List_Content

Param_Identifier = Identifier

Var_List = Var_Decl Var_List / ε
Var_Decl = Var_Type Var_Letter Identifier Equals Var_Declarator
Var_Declarator = Number_Decl / Char_Literal_Decl / Identifier_Char_Literal_Decl

Block_Content = "{" Content "}"
Content = Char Block_Content / ε

// Ciclos
Start_Loop = Iterate Letter Identifier Range_Block Block_Content

Iterate = "Iterate"
Range_Block = "in range"
Range = Number Range_Rest
Range_Rest = Dot Number Range_Rest / ε

// Condicional
Start_Conditional = If Identifier Conditional_Operator Operand Conditional_Then Block_Content

If = "If"
Conditional_Operator = Greater_Than / Less_Than / Equal / Greater_Than_Equal / Less_Than_Equal / Not_Equal
Operand = Identifier / Number

Greater_Than = ">"
Less_Than = "<"
Equal = "=="
Greater_Than_Equal = ">="
Less_Than_Equal = "<="
Not_Equal = "!="

Conditional_Then = "then"

// Main
Start_Main = Principal_Task Param_List Block_Content

Principal_Task = "Principal Task"
`;
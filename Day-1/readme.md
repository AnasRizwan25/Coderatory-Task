# Tasks

This project is a Node.js CLI  utility that provides multiple interactive functionalities, ranging from XML-to-JSON conversion to string manipulation, paragraph analysis, object attribute comparison, and JavaScript code parsing into an Abstract Syntax Tree.

## Features

The script supports the following main commands (passed as the first argument when running the program):

### 1 XML to JSON Converter  
**Command:**
```bash
node index.js xmlToJson
Features:

Allows you to add XML strings to memory.
Converts stored XML into JSON format using xml2js.
Menu:

Show stored XML as JSON
Add new XML
Exit
```

### 2 Reverse Word / Array Operations
**Command:**
```bash
node index.js reverseWord
Menu:

Add array values
Reverse a word
Search word in array
Search and reverse word if found
Exit
```

### 3 Paragraph Word Search & Statistics
**Command:**
```bash
node index.js paragraph
Menu:

Write and save a paragraph
Search a word in the paragraph (case-insensitive)
Show word statistics (sorted & counted)
Exit
```

## 4 Count Common Attributes Between Two Objects
**Command:**
```bash
node index.js countCommonAttributes
Features:

Input two JavaScript objects.
Compares and outputs:
Number of common attributes
Key-value pairs that are common
```

## 5 JavaScript Abstract Syntax Tree (AST) Generator
**Command:**
```bash
node index.js abstractSyntaxTree
Features:

Accepts JavaScript code input until you type END.
Parses code into an Abstract Syntax Tree using acorn.
Outputs the AST as formatted JSON.
```

## Installation & Setup
```bash

Install dependencies:

    npm install xml2js acorn readline
    Run with a specific command:
    node index.js xmlToJson

Dependencies
    xml2js – XML parsing
    acorn – JavaScript parser
    readline – Command-line input
```

## Notes
```bash
Created as part of the first-day task for my MERN internship at Coderatory Software House.
Demonstrates CLI-based application design in Node.js with multiple interactive menus.
```

## Author
```bash

Muhammad Anas Rizwan
MERN Intern @ Coderatory Software House
```
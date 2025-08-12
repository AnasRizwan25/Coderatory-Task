const command = process.argv[2];

const xml2js = require("xml2js");
const readline = require("readline");
const acorn = require("acorn");

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let dataStore = [];

function xmlToJson(xml) {
  return new xml2js.Parser({ explicitArray: false }).parseStringPromise(xml);
}

function menu() {
  console.log("\n1. Show Data\n2. Add Data\n3. Exit");
  input.question("Choose: ", (choice) => {
    if (choice === "1") {
      if (!dataStore.length) return console.log("No data"), menu();
      dataStore.forEach((xml, i) => {
        xmlToJson(xml).then((json) =>
          console.log(`${i + 1}.`, JSON.stringify(json, null, 2))
        );
      });
      setTimeout(menu, 200);
    } else if (choice === "2") {
      input.question("Enter XML: ", (xml) => {
        dataStore.push(xml);
        console.log("XML added.");
        menu();
      });
    } else if (choice === "3") {
      console.log("Exit!");
      input.close();
    } else {
      console.log("Invalid choice");
      menu();
    }
  });
}
//xml end

function countCommonAttributes(obj1, obj2) {
  let commonAttributeCount = 0;
  let commonAttributes = {};

  for (const [key, value] of Object.entries(obj1)) {
    if (obj2.hasOwnProperty(key) && obj2[key] === value) {
      commonAttributeCount++;
      commonAttributes[key] = value;
    }
  }
  return { count: commonAttributeCount, attributes: commonAttributes };
}
//count end

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arr = [];

function reverseWord(word) {
  return word.split("").reverse().join("");
}
function askCommand() {
  rl.question(
    "\nEnter command:\n1 - Add array\n2 - Reverse word\n3 - Search word in array\n4 - Reverse word if found in array\n5 - Exit\n> ",
    (command) => {
      if (command === "1") {
        rl.question("Enter array values separated by commas: ", (data) => {
          arr = data.split(",").map((v) => v.trim());
          console.log("Array saved:", arr);
          askCommand();
        });
      } else if (command === "2") {
        rl.question("Enter a word to reverse: ", (word) => {
          console.log(reverseWord(word));
          askCommand();
        });
      } else if (command === "3") {
        rl.question("Enter a word to search in array: ", (value) => {
          console.log(arr.includes(value) ? `Found: ${value}` : "Not found");
          askCommand();
        });
      } else if (command === "4") {
        rl.question(
          "Enter a word to search and reverse if found: ",
          (value) => {
            console.log(
              arr.includes(value) ? `${reverseWord(value)}` : "Not found"
            );
            askCommand();
          }
        );
      } else if (command === "5") {
        rl.close();
      } else {
        console.log("Invalid command. Please enter 1, 2, 3, or 4.");
        askCommand();
      }
    }
  );
}
// reverse end

const r2 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let paragraph = "";
let wordStats = []; 

function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid].word === target) return mid;
    if (arr[mid].word < target) left = mid + 1;
    else right = mid - 1;
  }
  return left; // Position to insert if not found
}

function addOrUpdateWord(word) {
  let index = binarySearch(wordStats, word);
  if (index < wordStats.length && wordStats[index].word === word) {
    wordStats[index].count++;
  } else {
    wordStats.splice(index, 0, { word, count: 1 });
  }
}

function paraAskCommand() {
  r2.question(
    "\nEnter command:\n1 - Write paragraph\n2 - Find word in paragraph\n3 - Show object\n4 - Exit\n> ",
    (command) => {
      if (command === "1") {
        r2.question("Enter paragraph: ", (data) => {
          paragraph = data.toLowerCase();
          console.log("Paragraph saved.");
          paraAskCommand();
        });
      } else if (command === "2") {
        r2.question("Enter word to search: ", (word) => {
          let count = paragraph
            .split(/\W+/)
            .filter((w) => w === word.toLowerCase()).length;
          if (count > 0) {
            addOrUpdateWord(word.toLowerCase());
            console.log(`Found '${word}' ${count} time(s) in paragraph.`);
          } else {
            console.log(`${word}' not found.`);
          }
          paraAskCommand();
        });
      } else if (command === "3") {
        console.log("Word Stats:", wordStats);
        paraAskCommand();
      } else if (command === "4") {
        r2.close();
      } else {
        console.log("Invalid command. Please enter 1, 2, or 3.");
        paraAskCommand();
      }
    }
  );
}
// paragraph end


function abstractSyntaxTree(code) {
  try {
    const ast = acorn.parse(code, { ecmaVersion: 2020 });
    return ast;
  } catch (error) {
    console.error("Failed to parse code:", error.message);
    return null;
  }
}
// abstract syntax tree end

if (command === "xmlToJson") {
  menu();
} else if (command === "abstractSyntaxTree") {
  const r3 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    "Enter your JavaScript code (type 'END' on a new line to finish):"
  );

  let codeInput = "";

  r3.on("line", (line) => {
    if (line.trim().toUpperCase() === "END") {
      r3.close();
    } else {
      codeInput += line + "\n";
    }
  });

  r3.on("close", () => {
    const ast = abstractSyntaxTree(codeInput);
    if (ast) {
      console.log("\n🌳 Abstract Syntax Tree:");
      console.log(JSON.stringify(ast, null, 2));
    }
  });
} else if (command === "paragraph") {
  (function () {
    paraAskCommand();
  })();
} else if (command === "reverseWord") {
  askCommand();
} else if (command === "countCommonAttributes") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter first object: ", (obj1Str) => {
    rl.question("Enter second object: ", (obj2Str) => {
      let object1, object2;

      try {
        object1 = eval(`(${obj1Str})`);
        object2 = eval(`(${obj2Str})`);

        if (typeof object1 !== "object" || typeof object2 !== "object") {
          throw new Error("Invalid object format");
        }
      } catch (error) {
        console.error("Invalid object format.");
        rl.close();
        return;
      }

      const result = countCommonAttributes(object1, object2);
      console.log(`Number of common attributes: ${result.count}`);
      console.log("Common attributes:", result.attributes);

      rl.close();
    });
  });
} else {
  console.log("Invalid command");
  input.close();
}



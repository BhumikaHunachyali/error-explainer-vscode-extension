import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('error-explainer.helloWorld', async () => {

        

let userInput = "";

// 1. Try selection
const editor = vscode.window.activeTextEditor;
if (editor && !editor.selection.isEmpty) {
    userInput = editor.document.getText(editor.selection);
}

// 2. Try clipboard
if (!userInput) {
    userInput = await vscode.env.clipboard.readText();
}

// 3. Fallback input box
if (!userInput || userInput.trim() === "") {
    userInput = await vscode.window.showInputBox({
        placeHolder: 'Copy error or paste here'
    }) || "";
}

// 4. Final check
if (!userInput || userInput.trim() === "") {
    vscode.window.showErrorMessage("No error message found. Copy or select an error.");
    return;
}
        let explanation ="Unknown Error:\nI couldn't match this error.\nTip: Copy the full error message for better results.";
const error = userInput.toLowerCase();


if (error.includes("syntaxerror") || error.includes("invalid syntax") || error.includes("unexpected token")) {

    explanation = `Syntax Error:

Python could not understand your code structure.

Common causes:
- Missing brackets
- Wrong quotes
- Typing mistakes

Example:
print("Hello"

Fix:
Check brackets, quotes, and syntax carefully.`;
}

else if (error.includes("indentationerror") || error.includes("indent")) {

    explanation = `Indentation Error:

Your code spacing is incorrect.

Python uses indentation to identify blocks of code.

Example:
if True:
print("Hello") ❌

Fix:
Use consistent spaces/tabs inside blocks.`;
}

else if (error.includes("typeerror") || error.includes("type")) {

    explanation = `Type Error:

This happens when incompatible data types are used together.

Example:
"5" + 2 ❌

Fix:
Convert values to same type using int(), str(), etc.`;
}

else if (error.includes("nameerror") || error.includes("not defined")) {

    explanation = `Name Error:

You are using a variable that was never defined.

Example:
print(x)

Fix:
Define the variable before using it.`;
}

else if (error.includes("indexerror") || error.includes("out of range")) {

    explanation = `Index Error:

You are trying to access an invalid position in a list.

Example:
nums[10]

Fix:
Check list length before accessing elements.`;
}

else if (error.includes("keyerror")) {

    explanation = `Key Error:

The specified key does not exist in dictionary/object.

Example:
data["age"]

Fix:
Check whether the key exists before accessing it.`;
}

else if (error.includes("attributeerror")) {

    explanation = `Attribute Error:

The object does not contain that method or property.

Example:
5.append(10) ❌

Fix:
Check method/property spelling and object type.`;
}

else if (error.includes("zerodivisionerror") || error.includes("division by zero")) {

    explanation = `Zero Division Error:

A number cannot be divided by zero.

Example:
10 / 0 ❌

Fix:
Ensure denominator is not zero before division.`;
}

else {

    explanation = `Unknown Error:

I could not clearly identify this error.

Tip:
Copy the full error message from terminal for better results.`;
}
       const panel = vscode.window.createOutputChannel("Error Explainer");

panel.clear();
panel.appendLine("🔍 Error Explainer");
panel.appendLine("---------------------------\n");

panel.appendLine("📥 Input:");
panel.appendLine(userInput + "\n");

panel.appendLine("📌 Explanation:");
panel.appendLine(explanation + "\n");

panel.show();

    });

    context.subscriptions.push(disposable);
}
    

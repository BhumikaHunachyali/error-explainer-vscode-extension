**JOURNEY OF DEVELOPING EXTENSION IN VS CODE-ERROR EXPLAINER.**





**DAY-01**



**1.downloaded node.js:** so to build extension we need code in js and to run the extension (which is written in JS), we need Node.js



\*\*2.downloaded npm -\*\*it is like play store for coding. It is used to download tools and libraries for making extensions.



npm install -g yo generator-code-used to download it



\*\*3.downloaded Yeoman(yo):\*\*it is place where automatically projects are created.  creating projects manually is hard cause many files, folders, configs.. this avoids them create everything by own.



**4.Generator code-** to make yo is running we need to generator code.

&#x20;  Yeoman + generator-code = VS Code extension project



Tool	          Purpose

Node.js	        Run your code

npm	        Install tools

yo	        Create project

generator-code	Create VS Code extension

&#x20;

**ERRORS ENCOUNTERED**: while checking  npm(npm internally uses script) version got an error saying SCRIPT DISABLED. this meant computer is saying “I don’t trust scripts. I won’t run them.” to tell it “It’s okay, allow safe scripts for me” we use code

Set-ExecutionPolicy -Scope CurrentUser RemoteSigned





**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**-





**DAY-02**



**1.run yo code:** in terminal we run yo code because A tool (Yeoman) asked you questions and

then created a full project automatically. it created folder **error-explainer** in vs which have all files necessary to build an extension with stater code.



**2. opened the project-** cd error-explainer code . opens the project in vs with all folders and files which is our extension project.



**3.F5-** when we click f5 vs creates new window called extension development host i.e.,It’s a test version of VS Code and Your extension runs here safely.

in that new window we open search box(ctrl+shift+p) and type Hello world

Why this worked?

Because in package.json(a file in error explainer folder):

👉 A command named Hello World was already defined.



What happened internally:

👉 VS Code looked into:

package.json



Found:

👉 command → linked to code(Hello world)



Then:

👉 It ran function in extension.ts





Inside extension.ts, there is code like:

👉 “show message Hello World”



result:

Hello World from error-explainer!



**yo code**

**↓**

**Project created**

**↓**

**F5**

**↓**

**New VS Code (test mode)**

**↓**

**Run command**

**↓**

**Code runs**

**↓**

**Output shown**



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**



**DAY 3 and 4:**

What is Extension.ts? -> it is brain of my extension. it has code that gives output. it controls what happens when command run and has logic in it



what is package.json?-> it is configuration file. it tells vs what all commands exists wht name to show when to activate extension.



**Important part inside it:**



**You’ll see something like:**



**"commands": \[**

&#x20; **{**

&#x20;   **"command": "error-explainer.helloWorld",**#it is internal name used in extension.ts

&#x20;   **"title": "Hello World"**

&#x20; **}**

**]**

Meaning:

Field	     Meaning

command	  internal name

title	  what user sees







**package.json → defines command(it is name of button)(instruction sheet)**

**↓**

**extension.ts → runs logic(what happens when clicked it know)(brain/logic)**



You type "Hello World" in command pallette

↓

VS Code checks in package.json whether that command exists in command and title part

↓

Finds command name

↓

Goes to extension.ts(here the logic after clicking that command wht shd happen is written)

↓

Finds matching registerCommand

↓

Runs that function

↓

Your code executes

↓

Output shown



**Note: since only 1 command hello world we have entered  only hello world runs. u can modify it.**



today we made some changes to code in extension.ts like before when used hello world command output would be 'hello world from error-explainer'. we change it to show input box() like when we type hello world in palette it should show input box to enter error. this changes is done where logic  is there in extention.ts ka code..

then click f5 new window opens check by typing hello world in palette we get input box to enter error..



**modified code in extension.ts:**

import \* as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {



&#x20;   const disposable = vscode.commands.registerCommand('error-explainer.helloWorld', async () => {



&#x20;       const userInput = await vscode.window.showInputBox({

&#x20;           placeHolder: 'Paste your error here'

&#x20;       });



&#x20;       if (!userInput) {

&#x20;           return;

&#x20;       }



&#x20;       let explanation = "";



&#x20;       if (userInput.includes("SyntaxError")) {

&#x20;           explanation = "There is a syntax mistake. Check brackets, quotes, or spelling.";

&#x20;       } else if (userInput.includes("IndentationError")) {

&#x20;           explanation = "Your indentation is incorrect. Fix spacing or tabs.";

&#x20;       } else {

&#x20;           explanation = "I couldn’t understand the error. Try again with full error message.";

&#x20;       }



&#x20;       vscode.window.showInformationMessage(explanation);



&#x20;   });



&#x20;   context.subscriptions.push(disposable);

}



export function deactivate() {}





**functions:** it open input box when hello world is typed

&#x20;          if input is syntaxError it gives "There is a syntax mistake. Check brackets, quotes, or spelling." as output.

&#x20;          if input is indentationerror it gives "Your indentation is incorrect. Fix spacing or tabs." as output.



**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**



**Day:5**



i am goona hard code no use of AI tools.so inserted information regarding error

let explanation = "";



const error = userInput.toLowerCase();



if (error.includes("syntaxerror")) {

&#x20;   explanation = "Syntax Error: You wrote something wrong in code.\\nFix: Check brackets (), quotes '', and spelling.";

}

else if (error.includes("indentationerror")) {

&#x20;   explanation = "Indentation Error: Your spacing is incorrect.\\nFix: Make sure lines are aligned properly (use same spaces/tabs).";

}

else if (error.includes("typeerror")) {

&#x20;   explanation = "Type Error: You used wrong data type.\\nFix: Don’t mix strings and numbers incorrectly.";

}

else if (error.includes("nameerror")) {

&#x20;   explanation = "Name Error: Variable is not defined.\\nFix: Check spelling or define the variable before using.";

}

else if (error.includes("indexerror")) {

&#x20;   explanation = "Index Error: You are accessing something out of range.\\nFix: Check list/array length.";

}

else {

&#x20;   explanation = "I couldn’t fully understand this error.\\nTip: Paste full error message.";

}



vscode.window.showInformationMessage(explanation);



modified this in extension.ts



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**Day 6: Improved Output UI**



Replaced popup message with output panel            (made an output panel similar to terminal to display the Error)

Used **createOutputChannel()** to display results       (this is function in vs which create the output panel)

Made explanation persistent (doesn’t disappear)     (before the output would be popped and then would vanish. But after display panel it stays permanent)

Improved readability with headings and formatting

Tested extension with different error inputs



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**DAY 7:**

“Improved error detection logic using multiple keyword matching to make extension smarter and more accurate. Already syntax, indentation such errors were added today added some more and test them that's it.



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**Day 8:**

Improved usability by auto-detecting selected text instead of relying only on manual input . before we had input box where we paste the error then in output panel the output will be shown now we changes it. in code editor we will select the error name and then ctrl+shift+p go to hwllo world then then output panel will be shown will error

now problem is it cant directly from terminal after running code it will see error/ we shd write that error name like syntax,name cause tht is in our code in code editior or we shd copy the error from terminal and paste it there then do next step ctrl+shift+p etc...to open in control panal



or

Improved usability by allowing the extension to automatically detect selected text instead of relying only on manual input.



Earlier, the user had to paste the error message into an input box, and the explanation was shown in the output panel. Now, the user can simply select the error text in the editor, run the command (Ctrl + Shift + P → “Explain Error”), and directly see the explanation in the output panel.



However, one limitation is that the extension cannot directly read errors from the terminal after running code. To use it, the user must either:



manually write the error message in the editor, or

copy the error from the terminal and then run the command

**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**day 9:**

Improved usability by integrating clipboard support, allowing the extension to automatically read copied error messages.



Earlier, the user had to either paste the error manually or select it from the editor. Now, the extension first checks the clipboard and directly uses the copied error message, making the workflow faster.



The updated flow is:



Copy error from terminal

Run command (Ctrl + Shift + P → “Explain Error”)

View explanation in output panel



Additionally, a fallback system was implemented:



First checks selected text

Then checks clipboard

Finally shows input box if no input is found



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**Day 10:**

focused on improving the overall usability and presentation of the extension to make it more intuitive and professional.



Enhancements included:



Renaming the command to a meaningful name (“Explain Error”)

Structuring the output panel into clear sections (Input and Explanation)

Supporting multiple input methods (selection, clipboard, manual input)

Handling edge cases like empty or invalid input

Cleaning up code for better readability and maintainability



These changes transformed the extension from a basic working prototype into a more polished and user-friendly tool.



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**



**day 11:**

Enhanced the accuracy of the extension by improving error detection logic and supporting multiple variations of real-world error messages.



Earlier, the extension relied on simple keyword matching, which failed for slightly different error formats. Now, it handles multiple variations (e.g., “SyntaxError”, “invalid syntax”, “unexpected token”) and includes additional error types like KeyError, AttributeError, and ZeroDivisionError.



This makes the tool more reliable and closer to real-world usage.



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**day 12:**

Improved the extension with detailed, example-based explanations to create a more beginner-friendly and AI-like experience.



**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**

**day 13:**

Learned how to transform a local project into a publicly accessible and installable software project using Git and GitHub.



Initialized a Git repository, tracked project files using Git commands, connected the local project to a remote GitHub repository, resolved merge conflicts, and successfully pushed the project online.



Packaged the VS Code extension into a .vsix file using vsce, making the extension installable outside development mode.



Also improved the README with installation and usage instructions to make the project more user-friendly and portfolio-ready.


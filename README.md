# React Terminal Emulator

A web terminal built with React and TypeScript.
It simulates a command-line interface and lets you navigate the real file system of a server through text commands, using a Node.js API.

**Live demo:** <https://terminal.davidebalice.dev/>

![Screenshot](https://www.aroundweb.it/screenshot/terminal.jpg)

Backend (file system API): <https://github.com/davidebalice/node-file-system-api>

## Features

- Login screen (demo credentials are prefilled)
- Typing animation on startup
- Command history with the up and down arrow keys
- Navigate directories and list files of the real project on the server
- Open files to view the source code, or edit and save them in a modal editor with copy to clipboard
- Create, rename and delete files
- Demo mode on the server: write operations are blocked

### Commands

| Command                            | Description                            |
| ---------------------------------- | -------------------------------------- |
| `help` / `h`                       | Show the command list                  |
| `ls` / `dir`                       | List files of the current directory    |
| `cd [directory]`                   | Navigate to a directory                |
| `cd..`                             | Go up one directory level              |
| `cd.`                              | Go to the root directory               |
| `file [filename]`                  | Open a file and view its source code   |
| `edit [filename]`                  | Open and edit a file                   |
| `new [filename]`                   | Create a new file                      |
| `rename [filename] [new filename]` | Rename a file                          |
| `delete [filename]`                | Delete a file                          |
| `clear`                            | Clear the terminal history             |
| `close`                            | Close the terminal                     |
| `info`                             | Info about this terminal               |
| `github`                           | Show the source of this project        |
| `site`                             | Show the author's website              |
| `skills`                           | Show the author's dev skills           |

## Tech stack

- [React 18](https://react.dev/) with TypeScript
- [Create React App](https://create-react-app.dev/) (`react-scripts`)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting started

### Requirements

- Node.js 18 or later
- npm
- A running instance of [node-file-system-api](https://github.com/davidebalice/node-file-system-api) (or use the public demo API)

### Installation

```bash
git clone https://github.com/davidebalice/react-terminal-emulator.git
cd react-terminal-emulator
npm install
```

### Configuration

API endpoints are read from `.env` (development), `.env.production` and `.env.test`:

| Variable                     | Description                         |
| ---------------------------- | ----------------------------------- |
| `REACT_APP_LOGIN_API_URL`    | Login endpoint                      |
| `REACT_APP_FILES_API_URL`    | List files of a directory           |
| `REACT_APP_FILE_API_URL`     | Read a file                         |
| `REACT_APP_NEW_FILE_API_URL` | Create a file                       |
| `REACT_APP_EDIT_FILE_API_URL`| Save an edited file                 |
| `REACT_APP_CHECKDIR_URL`     | Check that a directory exists       |
| `REACT_APP_DELETE`           | Delete a file                       |
| `REACT_APP_RENAME`           | Rename a file                       |

### Available scripts

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm start`     | Start the development server on port 3000     |
| `npm run build` | Create a production build in `build/`         |
| `npm test`      | Run the test runner                           |

## Project structure

```
src/
├── Components/
│   ├── Terminal/   # Terminal UI, login, commands (useCommands), history (useTerminal)
│   └── Modal/      # File editor modal
├── context/        # Shared state
└── App.tsx
```

## Author

**Davide Balice** – [davidebalice.dev](https://www.davidebalice.dev)

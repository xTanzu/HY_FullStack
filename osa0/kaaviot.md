teht 0.4: Uuden muistiinpanon luonti sivulla https://studies.cs.helsinki.fi/exampleapp/notes

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 Found - redirect to /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: 200 OK - HTML file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 200 OK - main CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: 200 OK - main JavaScript file
    deactivate server

    Note right of browser: The browser executes the JavaScript file, which then causes the browser to fetch the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data [{ "content": "new note", "date": "2023-06-06T13:48:48.805Z"}, {...}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes 
```
    
teht 0.5: Sivun https://studies.cs.helsinki.fi/exampleapp/spa lataaminen

```mermaid
sequenceDiagram
    participant browser
    participant browser

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: 200 OK - HTML file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 200 OK - main CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: 200 OK - main JavaScript file
    deactivate server

    Note right of browser: The browser executes the JS file -> tells browser to fetch JSON

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 200 OK - JSON data [{"content": "note text", "date": "2023-06-06T14:18:18.530Z"}, {...}, ...]

    Note right of browser: The browser executes the callback -> tells browser to render notes
```

teht 0.6: Uuden muistiinpanon luonti sivulla https://studies.cs.helsinki.fi/exampleapp/spa

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser adds the new note to the list of notes
    Note right of browser: Browser redraws notes to include the new one
    Note right of browser: Browser sends notes the server by POST method as JSON data
    

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created - response data {"message":"note created"}
    deactivate server
```

Socket.io and SignalR simplifies the process of adding real-time communication 
between the web clients and servers. Underline both uses WebSockets to 
communicate in between. They have similar ways of fallback mechanisms such as 
long polling when WebSockets are not available. Limitations are both clientside 
and serverside should host SignalR libraries in use of SignalR and socket.io 
libraries in use of Libraries. Which mean connecting socket.io base solution of 
SignalR backend is not available.

The scope of this project is to implementing a library and a protocol to 
connecting a SignalR base client to a Socket.io based server side or another way 
around.
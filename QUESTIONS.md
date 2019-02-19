# Questions

1. There is an overall .gitignore plus one each for both the client and the server, located in /client and /server, respectively. There are multiple since we're treating client and server as separate projects. We want to ignore different files for each.
2. There is an overall build.gradle and one each for client and server. The client and the server have different tasks we need to run via Gradle.
3. The app.component.html includes angular routing which references the app.routes.ts.  This then calls the corresponding component which references any needed services that talk to the server. The Server.java file manages routes for the server side. This would be specific addresses on the backend for the database and the controllers. The app.routes.ts manages routes for the home and users for the client side. 
4. The user-list.service.ts is fielding requests that the user-list.component.ts is making to the server.  This is not done completely in the user-list.component.ts because in the component side the APIs are not separate from the rest of the code. The user-list.service.ts is a more organized way to interact with the server.

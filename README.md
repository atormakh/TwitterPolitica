Twitter Politica
===
### Contributors
Agustin Jerusalinsky
Agustin Tormakh
Camila Borinsky

## Idea

We had to do a project **Data Bases II** involving **polyglot persitance**. For this and having very recently gone through a legislative election, and seeing what a complete chaos the **Twitter World** became during that time, we wanted to see if we could take a deeper look into who are the most relevant **hidden  players**.

Besides we saw a very rare phenomenon where a candidates Twitter following and interactions seemed resonate a lot around the youth.


Installation
---
There are 3 main modules, docker, API and webapp. To start the project, all 3 components have to be running.
```bash
/
.
├── API
├── docker
└── webapp
```

### Docker
Docker is the module were all databases are stored, each one runs on a docker container.

`cd docker`

From the docker directory run the following command

`docker-compose up -d`

This will instantiate and run all required docker containers

### API
The API is used when CORS is not an available setting inside the database container (MongoDB)
From the root directory run the following commands
```
yarn
yarn start
```

This will listen in port 8000 for http requests

### Webapp

Webapp is a different npm module, and runs over ReactJS

```
cd webapp
yarn
yarn build
yarn serve -s build
```

This will serve the webapp application.

Twitter Politica
===
### Contributors
Agustin Jerusalinsky, Agustin Tormakh and Camila Borinsky

## Idea

We had to do a project **Data Bases II** involving **polyglot persitance**. For this and having very recently gone through a legislative election, and seeing what a complete chaos the **Twitter World** became during that time, we wanted to see if we could take a deeper look into who are the most relevant **hidden  players**.

Besides we saw a very rare phenomenon where a candidates Twitter following and interactions seemed resonate a lot around the youth.

## Databases
For these tasks we chose to use a selection of database engines intending to take advantage of their strengths to solve problems of different nature.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Neo4j-logo_color.png/250px-Neo4j-logo_color.png" alt="Neo4j" style="height:4em;"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/0/00/Mongodb.png" alt="MongoDB" style="height:4em;"/>
<img src="https://www.consulthink.it/wp-content/uploads/2019/12/elasticsearch-logo.png" alt="ElasticSearch" style="height:5em;"/>



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
Docker is the module were all databases are stored, each one runs on a docker container. Before starting this section make sure you have [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) installed on your computer. You can check this by running the following commands on your command line interpreter or terminal.
```
docker --version
docker-compose --version
```

Before starting, from the root directory of the project, run the following command:
```
cd docker
```

From the docker directory run the following command

`docker-compose up -d`

This will instantiate and run all required docker containers

### API
The API is used when CORS is not an available setting inside the database container (MongoDB). Before starting this section make sure you already have installed [yarn](https://classic.yarnpkg.com/en/docs/install) on your computer.
 You can check this by running the following commands on your command line interpreter or terminal.
```
yarn --version
```
From the root directory run the following commands.
```
yarn
yarn start
```

This will listen in port 8000 for http requests

### Webapp

Webapp is a different npm module, and runs over ReactJS. As well as in the API section, make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install) properly installed on your computer.

```
cd webapp
yarn
yarn build
yarn serve -s build
```

This will serve the webapp application.

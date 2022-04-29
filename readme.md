# Project Task

The project was to create a web scraper system with nodejs and have the results displayed on a frontend system.

### Project Details

1. `Backend` - Backend is built using typescript
2. `Frontend` - The frontend is built using reactJS with material UI being the sole component provider module.
3. `Database` - Postgres

### Project tests

The project has been bundled into a single docker project with instructions to boot as follows

### Mandatory requirements

> Before running the docker compose file below - make sure to create an external docker bridge network using the following command  
> `docker network create pc-local`

1. Clone the the project from the remote repository
2. Ensure you have docker installed on your local machine
3. Run `docker-compose up --build -d`
4. That should start all the three services bundled in this project.

### Reachability endpoint

The application Interface is reachable on endpoint `http://localhost:16800/`

#### Failure points - Incase of any

React material UI & Lottie for animations have peer dependency requirements. So during project creation, there might be errors arising due to those issues mentioned.

## Questions

> Imagine you're given 1 CPU and 1GB RAM server to run the BE, how can you scale your scraper to handle ~5000 URL at the same time

From my experience, system optimization involves a number of system design parameters, from the style of code implementation to the method of deployment.

I would like to start with system optimization through deployment because this is the most viable and we have very advance tools developers and system administrators to achieve an objective.

Its always important to make sure CPU and memory available on a server are utilized fully and for the case. This is easily achieved using containerization and then deploying an application inside a kubernetes cluster.

This way a single instance instance of an application is easily replicated over the node which ensures memory and CPU are fully utilized. i.e an application process consuming 256MB of memory can be replicated to run into three replicas all consuming (3\*256)MB.

When CPU becomes a bottle, A Message broker coupled with websocket connection between client and server can be a way to go.  
A message broker will queue an a CPU expensive operation, then a background process can consume the message and handle the operation and incase a response to the client is required, a websocket connection can be used.

Another method to ensure that memory and CPU limited servers have high availability is to ensure a result of an expensive operation is memoized via a caching system like redis so that its not recalculated each and every time.

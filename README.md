# kc-final-boss-backend
Nodejs backend of the final practice of Keepcoding fullstack program. 

This project is intended to work with this [Frontend](https://github.com/eliasrosales88/kc-final-boss-frontend)

## **Recommended**  
- Node  v13.7.0  
- Mongo v4.2.5  

## **Installation**  
Run `npm install` inside root folder  

--- 
## **Running the App**
For development and production check the file `.env.example` to set your own variables and copy and rename as `.env`  
You also need to check the `config.js ` file to set swagger config

### Development
- Start mongo:  
`service mongod start`  

- Start rabbit mq docker container:  
`docker-compose up -d`  

- Initialize queue consumer:  
`node queue/consumer.js`  

- To initialize the database use in root:  
`npm run dbstart`  

- To start:  
`npm run dev`  


### Production  
- Start mongo:  
`service mongod start`  

- Start rabbit mq docker container:  
`docker-compose up -d`  

- Initialize queue consumer:  
`node queue/consumer.js`  

- To initialize the database use in root:  
`npm run dbstart`  

- To start:  
`npm start`

--- 





## Top News: Real-time News Scraping and Recommendation System

### Web Server

Web server is exposed to users.

##### Client (Front-end)

Client is a single-page application written in React. It commutes with web server back-end via REST API.

##### Server (Back-end)

Server is written in Node.js. It commutes with client via REST API. Server also serves as a RPC client, commuting with back-end RPC server.

### Back-end Server

Back-end server is written in Python. It is service oriented and commutes with web server via RPC. Back-end server also consume data generated by two pipelines.

### News Data Pipeline

News data pipeline implements three functionalities and connect them into a pipeline with RabbitMQ.

##### News Monitor

Serving as news detector. Creating metadata of detected news and storing them into RabbitMQ (Powered by NEWSAPI.org)

##### News Scraper
Scraping news body(text) for each news entry in the RabbitMQ, storing the full content of each news into next RabbitMQ.

##### News Deduper
De-duplicator reads news from RabbitMQ, filters duplicate ones, and stores news into MongoDB.   

### Machine Learning Model Training Pipeline


### User Event Log Processor

<h1 align="center">
   Dev-Pay - API
</h1>

<p align="center">
  <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/OtavioBernardes/dev-pay-api?color=7D40E7">
  <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-OtavioBernardes-%20?color=7D40E7">
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/OtavioBernardes/dev-pay-api?color=7D40E7">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/OtavioBernardes/dev-pay-api?color=7D40E7">
</p>

<p align="center">
  <a href="#question-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#page_facing_up-license">License</a>&nbsp;&nbsp;&nbsp;
</p>

# Workflow Status:

![Dev-Pay](https://github.com/OtavioBernardes/dev-pay-api/actions/workflows/main.yml/badge.svg)

# Project Overview:

This project was made using clean architecture. </br>

<p align="center">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://i.ibb.co/cCmdW9j/Untitled-Diagram-drawio-1.png" />
      <source media="(prefers-color-scheme: light)" srcset="https://miro.medium.com/max/1400/1*0R0r00uF1RyRFxkxo3HVDg.png" />
      <img>
   </picture>
</p>

## :question: About

The objective of this project is to simulate operations like a digital bank.

## :gear: Technologies

**These are the technologies that I used to develop this application:**</br> 
⌨️ <strong>Typescript</strong> —> Extends JavaScript by adding types;</br> 
⚙️ <strong>NodeJS</strong> —> A platform for building network applications;</br>
🌐 <strong>Express</strong> —> Web framework for Node.js</br>
⚙️ <strong>Serverless Framework</strong> —> The Easy & Open Way To Build Serverless Apps;</br>
📚 <strong>Mysql</strong> —> Database</br>
📚 <strong>TypeORM</strong> —> ORM Database</br>
📚 <strong>Redis</strong> —> Cache</br>

## :rocket: Getting Started

1. Clone this repo: `git clone https://github.com/OtavioBernardes/dev-pay-api`
2. Move to the directory: `cd dev-pay-api`
3. Copy the .env.example file as .env: `cp .env.example .env`
4. Add .env values
5. Install all dependencies: `npm install`
6. Run docker compose: `docker-compose -f ./development/docker-compose.yml up`
6. Run `npm run migration`
7. Run `npm run dev`
8. The server runs on: http://localhost:3333
9. Run a request to create a new account in:
```
curl --request POST \
  --url http://localhost:3333/api/account \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Otávio Bernardes",
	"email": "otavio@gmail.com",
	"password": "test@123",
	"cpf": "11111111100"
}'
```

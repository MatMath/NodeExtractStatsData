# NodeExtractStatsData

## Description

This project is based on the Yeoman build with express. But also mainly to learn more about server side Node. This server section will serve specific data for the Font App. Some data might be static, some other data will get fetch from different API aroudn the web. 
Data like: 
- Building type --> Static file.
- Current Interest Rate for Mortgage --> Multiple URL Asycn call.
- Average rent cost per area --> Via Request including passing parameters.

Simple calculation and display will be done on the client side (not this app). 

## Installation

Get a API Key from www.quandl.com
Use a Docker instance and run the dockerfile inside:
`docker run -p 49160:3000 -d -e QUANDL_API_KEY=YouAPIKeyHere your-node-web-app-compiled-name`

## Usage

This is the server side so the Front app ShouldIBuyThisBuilding_Angu2 or ShouldIBuyThisBuilding_React can get access to some real market data.

## History

I love looking at the housing market and (many many years ago) I did a excel sheet fully automated that I just input some number and it tell me if the house was worth buing or not. Why not learn Node while making that online.


## License

MIT License
Disclaimer: I get the data from quandl, mistake are possible, if you make decision out of the data, well... We live only once so Go Ahead!






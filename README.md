# Ferdi Kadıoğlu EPL Checker

## Overview
This Node.js application checks the availability of a specific player on the Fantrax website and sends an email notification if the player is in league.

## Requirements
- Node.js installed on your system.
- Basic knowledge of Node.js and JavaScript.
- Access to the internet to fetch data from the Fantrax website.
- Access to an SMTP server for sending emails.

## Dependencies
- **https**: Node.js built-in module for making HTTP requests.
- **cheerio**: Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- **nodemailer**: Module for sending emails from Node.js applications.

## Setup
1. Clone or download the project from GitHub.
2. Install project dependencies using npm:
   ```bash
   npm install
Replace the placeholder values in the transporter object with your SMTP server credentials.

## Usage
1. Run the Node.js application:
   ```bash
   node .\checkstock.js
2.The application will scrape the specified URL at regular intervals (default: every 10 minutes) to check for stock availability.
3.If the desired product is in stock, an email notification will be sent to the specified recipient.

## Code Explanation
- The application uses the https module to make a GET request to the Fantrax website.
- It then utilizes cheerio to parse the HTML response and extract relevant information about the product's stock status.
- If the desired product is in stock, an email notification is sent using nodemailer.
- The process is repeated at regular intervals using setInterval().
  
## Important Notes
- Ensure that you have the necessary permissions to scrape data from the Fantrax website.
- Avoid making too many requests in a short period to prevent being blocked by the website.
- Monitor your email inbox for notifications about product availability.


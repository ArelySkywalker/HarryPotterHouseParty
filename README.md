# HarryPotterParty
5/10/16

@authors Stav Gold, Alex Goldberger and Arely Miramontes

Website URL: http://www.harrypotterhouseparty.com/

What up, my glip-glops,

Here's how to run the code I've written and also how to futz with it.

## Run what's here already
1. **Get npm,** node.js's package manager which makes it way easier to grab more code (like this project's dependencies) whenever you have a mind to.
2. **install this project's dependencies** with `cd path/to/project/ && npm install`.
3. **start the code** with `node main.js`
4. **Open a web browser** and set the URL to 127.0.0.1:80. You should load a table giving the current score of a game between teams Ravenclaw and Not Ravenclaw.

## Find out what's going on here
So Express is a web application framework based on node.js, and we use it for all of the web host stuff: it runs the web server, and listens for http requests, and serves content when called upon to do so. The content it serves is created with Pug (formerly known as Jade, which is why all its documentation is at jade-lang.com), which is a template engine that you can give JS objects to and that will spit out HTML you can display based on the properties of the object.

(Still not sure what needs a lot of explanation and what doesn't. I'll update this section as it becomes clear what is unclear.)

## Still to do:
* We need a way to push score updates to the server. At first, this can just be a button on the scoreboard view, but eventually it should be its own view, which should be able to pull typical achievement scores by category from the server.
* The scoreboard view should automatically update its table whenever the server receives a score update. How will the scoreboard, which is a client, know when the server has received new data? Maybe the server should keep track of everyone displaying the scoreboard (can be done) and fire an event at them with the necessary data in?

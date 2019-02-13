# foursquare-search

This is a small web app that makes use of the [Foursquare API](https://developer.foursquare.com/) to search a location by name for recommended or popular venues.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd foursquare-search`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).


### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Approach

My first step when apporaching this task was to analyze the requirements and convert them into a list of consise user stories.
One hurdle I faced while doing this was with the wording for **popular** venues. After scanning through the API docs for the foursquare venues API, the only match I could see for popular was **trending** venues. I'd usually raise this as a question to the product owner but in this case I decided to go ahead with using this API.

Next was picking the technology. I decided on Ember, as it's a framework I'm comfortable in meaning I could focus more on implementation rather than wrestling with learning something new.

### User Stories
```
As a user
So that I can find venues near a location
I need a search form where I can enter a named location

As a user
So that I can find venues near me I might enjoy
I need to be able to search for recommended venues

As a user
So that I can see the results of my search
I need to see a list of venues returned from my search

As a user
So that I can find venues near me that lots of people go to
I need to be able to search for popular venues
```


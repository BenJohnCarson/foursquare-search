# foursquare-search

This is a small web app that makes use of the [Foursquare API](https://developer.foursquare.com/) to search a location by name for recommended or popular venues.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

You'll also need the client ID and client secret from a foursquare account. These should be placed into a .env file in the projects root directory:

```
FOURSQUARE_CLIENT_ID=YOUR_CLIENT_ID
FOURSQUARE_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

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

## Approach

My first step when approaching this task was to analyze the requirements and convert them into a list of concise user stories.
One hurdle I faced while doing this was with the wording for **popular** venues. After scanning through the API docs for the foursquare venues API, the only match I could see for popular was **trending** venues. I'd usually raise this as a question to the product owner but in this case I decided to go ahead with using this API.

Next was picking the technology. I decided on Ember, as it's a framework I'm comfortable in meaning I could focus more on implementation rather than wrestling with learning something new. I opted for bootstrap as a CSS framework as it's easy to use to quickly flesh out a small app such as this.

Once I'd finished the user stories and picked the technology, I started work on the first user story. I wrote some tests to cover the user story and made a decision that this feature would simply cover the displaying of a search input and button, as I felt the next user story better encompassed the actual process of searching.

Following creation of the basic search form, I started work on the last user story. I choose this one next because after spending some time analysing the foursquare API, the **trending** API looked simplest and so a good place to start. The first issue I came across with this user story was how the response is structured from foursqure. Because it doesn't adhere JSON:API it would require writing custom adapters and serializers to be able to user Embers built in data management library, ember-data. In the interest of time, I decided to simply fetch the data using the fetch API and encapsulate the managing of data to the route and its controller. Another point I had to consider was managing the client id and client secret codes provided by foursquare. To prevent them being stored in github, I created a .env file that's ignored by git and stored the codes there. This file can then be read on building the app and can be set in the environment.js file, which can be read from anywhere in the app. I then made sure to add this step to the prerequisites in the README.

## User Stories
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


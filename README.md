# Map-using-Vue

Practical task to create a map app using Vue.js

## Learn basics of Vue

Plan :

- Start my watching some tutorials
- Do some on hand tasks to experience the development process

What i done :

- Began by watching some tutorials to understand the workflow (1h)
- Proceeded to tackle the next task, utilizing videos and documentation to address specific problems

## Create 2 pages - "About" and "Map"

Plan :

- Research how routing is implemented in Vue.js
- Implement it by trial and error.

What i done :

- After setting up the base pages, I looked up into the implementation of routing
- Although routing was initially included in the project, I decided to delete it to gain hands-on experience in creating it myself
- While implementing routing, I came across a lot of package/config related issues
- After debugging and fixing said issues, I could finally see my router working!
- First, I designed the Navbar
- After creating the first version, I decided to recreate the About page to be similar to [Wilibox](https://www.wilibox.com). This required to use Vue functions, like `ref` and `v-bind` to automatically show a hamburger menu when the app viewport width than 1000px
- Next, I populated the About page with placeholder data and started styling the component. I ran into some issues with text alignment because I tried to use `grid` instead of `flex`. However, I decided to keep the grid layout and just align the text to the center
- Before moving on to the Map page, I thought it would be a good idea to practice my skills by separating the Navbar as a standalone component. It wasn't that difficult. To ensure reusability, I added props to the Navbar component, allowing it to accept different routes that are then displayed in the Navbar
- It occurred to me that I should add a check to validate the passed route props. It took some time to figure out the best way to do this, and I encountered a few TypeScript type errors along the way. Eventually, I managed to implement the validation by obtaining a computed value of all filtered routes that actually exist in the app

## Implement Leaflet map

Plan :

- Try implementing Leaflet into Vue project. It somewhat finicky, so might run into some issues

What i done :

- I first tried to implement the Leaflet map using Vue2Leaflet, but as the name suggests - it's specifically designed for Vue2 so I had to look for an alternative integration package. Eventually, I found Vue-Leaflet, which, although still in BETA, seemed to work well
- To start the development, I followed the example provided in the package documentation. I then added tile layers to allow users to choose their preferred map style. Since the tile data cluttered the main project file, I extracted it into a JSON file
- Next, I displayed a single static marker on the map and showed its coordinates in the sidebar. Had to play with Typescript a bit as Leaflet has and takes different coordinate types

## Ability to place 2 markers on the map

Plan :

- This task shouldn't be that difficult, as it should barely involve Vue.

What i done :

## Display marker coordinates

Plan :

- This task also shouldn't be that difficult for same reasons.

What i done :

## Add extra features

- Show distance between markers
- Remove markers
- Move markers
- Add sidebar
- Let user input coordinates
- Add geo look up (translate coordinates to location)

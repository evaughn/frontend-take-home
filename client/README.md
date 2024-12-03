# Frontend Take-Home Assignment

## Start

Run `npm run start` within to start client application

## Considerations

### Fetch API

I used @tanstack/react-query to handle network requests and general data caching. It might have been a little heavy-handed, but it allowed me to abstract away the core of request mechanics and create custom hooks to make life simple (and to focus on design).

### Component Structure

I wanted to create a base component that was general enough to get the core mechanics of the Management exercise without being too overloaded. I came away with <ManagementTabContent>. It handles all the layout + CRUD modifications for each model type, and makes use of the fetch hooks from `/hooks` to be able

### What I would do next time

1. Probably cut down on the abstractions.
2. Use more animations. I went with the core of @radix-ui/themes and @radix-ui/primitives, but could have focused more on them.
3. Network latency and error states: I created `ToastNotificationManager` to handle app network responses, but didn't really test around slow or offline. I started making a custom hook to measure elasped time, but then realized that the time I was spending on this project exceeded the time limit.

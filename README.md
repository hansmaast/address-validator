# DI | Address validator

The DI | Address validator is a simple app that validates an address string towards the Addresshelper API.

This tiny app does not fulfill every little edge case, but it should validate user input written in the following formats:
```js
"{streetName} {number with optional letter / entrance}"

or

"{streetName}, {optional city} {number with optional letter / entrance}"
```
**Example:**
```js
// Simple address without entrance
"tiuråsen 27" ✅

// Simple address with entrance
"griffenfeldts gate 19a" ✅

// Simple address with city
"griffenfeldts gate, oslo 19a" ✅

// Wrong format, the city must be entered after the street name
"oslo, griffenfeldts gate 19a" ❌ 
```

## Setup
1. Clone the [repository]()
2. Create a `.env` file identical to `.env.example`, you need to enter your API key.
3. Install dependencies
4. run tests _(optional)_
   ```bash
   npm test
   ```
5. Start the development server
   ```bash
   npm run dev
   ```
   _or_ build and preview
   ```bash
   npm run build && npm run preview
   ```

## Reflection

Some thoughts on the implementation of the app, as well as me reflecting a bit around the example questions from the case.  

### What framework(s) and libraries did you use to implement the app? Why did you choose them? 

I've tried to keep the app as simple as possible, stripping everything down to the minimum. 

The app was [scaffolded using vite's](https://vite.dev/guide/#scaffolding-your-first-vite-project) `npm create vite@latest`. I choose this because it's fast and easy to set up a basic React app with sane defaults for TypeScript. 

Since the app has very few components, I decided to keep the folder structure flat and simple. This should be changed in the future as the app grows.

I [installed tailwind](https://tailwindcss.com/docs/installation/using-vite) for handling the styles. It comes with super nice defaults and it makes it possible to style things fast and easy. For a larger project I would make sure to create reusable components for common UI elements, avoiding duplication of styles and logic.

[Vitest](https://vitest.dev/guide/) for testing. Simple and powerful testing library that plays well with vite. 

[Biome](https://biomejs.dev/guides/getting-started/) for linting and formatting. This was a new one for me, and it seemed like a good opportunity to explore this tool. For a production app I would probably change this to Eslint (formatting and linting as well), but I wanted to try something new, as I find eslint a bit cumbersome to set up. Biome was easy! **But** I'm not sure how it plays with other IDEs other than VS Code. Eslint also has a wide range of plugins for common libraries, as far as I know the ecosystem around Biome is not as mature.



### What would you add or do differently if you had more time? 

Here are my "top of mind" things to improve: 
    
- Extend testing by adding UI related tests / e2e tests
- Use a design system / component library
- Implement loading states
- Extract components and hooks and place them in folders
- Identify edge cases and implement the most relevant ones

### How would you implement CI/CD? 

I would probably set up a pipeline that does the following:

- lint to catch low hanging fruit (errors in this case)
- run test to ensure code quality and functionality
- build application
- deploy to appropriate environment

I would make the pipeline run when code is pushed to the branch for the specific environment.

This can be done in several ways depending on the tools being used, but I would personally prefer github actions, gitlab pipelines or just some plain old git hooks and some custom scripts for a minimal setup.

For a production setup I would definitely rely on a service platform like github / gitlab / bitbucket etc.

#### Sidenote on how to "deploy to appropriate environment"

Depending on the hosting service, I would push the built application to the appropriate server or service. I've actually never set up a pipeline handling the deployment of a production ready service, as the applications I've been working on in my professional career have had this setup already. It seems like services like github actions have some great templates / guides on how to get this done in a correct way. 

The point here is to serve the _correct version_ of the application to the _correct group of people_ with _minimal effort and downtime_.

### How would you approach translation and localization? 

Me approaching translation and localization:

- Figure out what the need for localization looks like,
    - is it the text inside the app, just the api calls, everything, something else?
- Implement localization based on the need.
- Extract language code from url, or store it in localStorage.
- Make the fetching of addresses aware of the user's language preference.
- Refetch content when the language preference changes.

### How would you implement tracking and analytics? 

Something like this:

- Start by identifying what we want to track and why.
- Implement track events inside the app for the identified cases.
- There is no point in tracking if you don't know what you want to track.
- Respect user privacy.

### What testing did you do and why? 

I implemented unit tests for the utility functions only. The main focus was to make sure the creation of the API url was working as expected, and the extraction of the different parts of the address string.

I would definitely add more tests towards the UI using a library like React Testing Library. And also end-to-end tests using playwright for a larger feature.



# Getting Started with React + NestJS boilerplate FRONTEND :rocket:

### \*Note - This Boilerplate is designed to work with React + NestJS boilerplate BACKEND.

## Things included in the boilerplate

- Auth0 setup for Authentication + Authorization
- Axios for api requests
- SWR for data fetching
- MaterialUI for Styling
- Reach Router for routing
- RecoilJS for State management (For more complex applications)

Step 1: Clone the Repo.

Step 2: cd into boilerplate-frontend.

Step 3: Create an account with `Auth0` and get then create a new `Single page application`.

- When creating a new application make sure to fill out the fields in the `settings` tab for the following: `Allowed Callback URLs`, `Allowed Logout URLs`,`Allowed Web Origins`, `Allowed Origins (CORS)`.
- If you are running locally you should set them all to include `http://localhost:3000/`.

<br/>

Step 4: Grab the `domain` and `clientID` from the `settings` tab for the `.env` and `.env.dev` files

Step 5: In the base directory, create a `.env.dev` file and a `.env file` with the same content as the `.env.example` file. (to be used as the environment variables for dev and prod.)

Step 6: Go through the setup proess for the [Backend] (https://github.com/Mitchell8210/React-NestJS-boilerplate-BACKEND).

Step 7: to run locally, set the `REACT_APP_SERVER_BASE_URL` to match the backend (should be: `http://localhost:8080`)

Step 8: Lastly, run `yarn install` to install all the necessary node modules to be able to run the app.

## Start application in development mode

`yarn start:dev`

# Congratulations! You now have a fully functioning Full Stack web application! :rocket:

## Notes:

- Go to the google cloud platform and create credentials for a web application in order to connect to auth0 so that there are no warnings on the login page.
- go to the branding-> universal login section on auth0 in order to customize the look of the login page

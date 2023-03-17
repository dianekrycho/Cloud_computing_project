# Secure Web Development - Backend

This repo contains an Express app, it will be the backend used for the semester.

## 👷 Prerequisites

1. Fork this repository then clone it on your computer
2. Install Insomnia (or your API Testing tool of choice) and import the collection provided in [insomnia-collection.json](insomnia-collection.json)
3. If you don't have one, create a DB on Mongo Atlas
4. Create an `.env` file containing (replace with your data):
   > MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/paris-films?retryWrites=true&w=majority
   >
   > JWT_SECRET=your-jwt-secret
5. Install NodeJS
6. Install dependencies : `npm install`
7. If you dont have data in your DB:
   1. Download the public dataset (OpenData) given by French gov and the city of Paris, named ["Lieux de tournage à Paris"](https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information)
   2. Put the dataset at the root of this repository, named [lieux-de-tournage-a-paris.json](lieux-de-tournage-a-paris.json)
   3. Run the import script with `npm run import`
8. Run the backend `npm start`

## Quick information

This backend connects to a MongoDB Database containing locations of film sets in Paris, France.

Consulting locations requires an account. Creating, updating and deleting locations requires elevated privileges.

There are 2 access level: `user` and `admin`. Each user have a `role` property to store this data.

Users can authenticate themselves with a Json Web Token, obtained by logging-in with their `username` and `password`.

Passwords are hashed, and the hashes are never shown in API responses.

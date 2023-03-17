# secure-web-dev-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## User stories :

✅ USR1 : As a random visitor, I want to be able to register an account or log-in, so I can
access all features

✅ USR2 : As a random visitor, I want to be redirected to the login/register page when I click on
“location" tab, so that I know I must log-in to see its content

✅ USR3 : As a logged-in user, I want to see locations and be able to click on one location to
open a modal containing details, so that the website is useful

✅ USR4 : : As an “admin" user, I want to see a “Add Location” button in the location page, so
that I can create a new location

✅ USR5 : As an “admin" user, I want to see a button to edit locations in the array of locations,
so that I can edit existing locations

❗️the edit button is inside the see location details page

✅ USR6 : As an “admin" user, I want to see a button to delete locations in the array of
locations so that I can delete existing locations

❗️the delete button is inside the see location details page

### Backend modifications 
inside the "controllerGetAllLocations()" change the limit to see more locations 
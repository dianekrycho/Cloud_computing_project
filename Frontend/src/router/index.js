
import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login-view.vue";
import Welcome from "../views/Welcome-view.vue";
import Register from "../views/Register-view.vue";
import Get_Locations from "../views/Get-Locations.vue";
import Show_Locations from "../views/Show-Locations.vue";
import Get_LocationDetails from "../views/Get-LocationDetails.vue"
import Show_LocationDetails from "../views/Show-LocationDetail.vue"
import CreateLocation from "../views/CreateLocation.vue";
import EditLocation from "../views/EditLocation.vue";

const router = createRouter({
  history : createWebHistory(),
  routes:[
    {
      path: "/CreateLocation",
      name: "CreateLocation",
      component:CreateLocation,
    },
    {
      path: "/LocationDetails/EditLocation/:Id",
      name: "EditLocation",
      component:EditLocation,
    },
    {
      path: "/",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/locations",
      name: "Locations",
      component: Get_Locations,
    },
    {
      path: "/Show-Locations",
      name: "Show-Locations",
      component: Show_Locations, 
    },
    {
      path: '/LocationDetails/:Id',
      name: "Get-LocationDetails",
      component: Get_LocationDetails,
    },
    {
      path: '/Show-LocationDetails/:Id',
      name: "Show-LocationDetails",
      component: Show_LocationDetails,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
  ]
})

export default router;
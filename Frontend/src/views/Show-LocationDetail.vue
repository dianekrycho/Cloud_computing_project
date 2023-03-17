<template>
  <div>
    <h2>Name of the film : {{locationDetails.filmName}}</h2>
    <h4>Type of the film : {{locationDetails.filmType}}</h4>
    <h4>Name of the director : {{locationDetails.filmDirectorName}}</h4>
    <h4>Name of the producer : {{locationDetails.filmProducerName}}</h4>
    <h4>Addresse of the shoot : {{locationDetails.address}}</h4>
    <h4>District of the shoot: {{locationDetails.district}}</h4>
    <h4>Year of the shoot : {{locationDetails.year}}</h4>
  </div>
  <br />
  <br />
  <div v-if="this.role==='admin'">
    <button @click="editLocation()">edit location</button>
    <br />
    <br />
    <button @click="deleteLocation()">Delete</button>
  </div>
  <br />
  <br />
  <div>
    <button @click="GoBack()">Go back to location list </button>
  </div>
</template>

<script>
//import axios from "axios";
import {mapState} from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },

  computed: {
    ...mapState({
      locationDetails: (state) => state.locationDetails,
      locationId: (state) => state.locationId,
      token: (state) => state.token,
      role: (state) => state.role,
    }),
  },
  methods: {
    GoBack(){
      this.$router.push(`/locations`);
    },
    editLocation(){
      this.$router.push(`/LocationDetails/EditLocation/${this.locationId}`);
    },
    async deleteLocation(){
      try {
        await axios.delete(`http://localhost:3000/locations/${this.locationId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });
        alert('Location deleted !');
        this.$router.push(`/locations`);
      }
      catch (error) {
        alert('An error occurred, please try again later');
      }
    },
  },
};
</script>
<template>
  Chargement...
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
export default {

  computed: {
    ...mapState({
      locationDetails: (state) => state.locationDetails,
      locationId: (state) => state.locationId,
      token: (state) => state.token
    }),
  },
  mounted(){
    this.fetchLocationDetails();
  },
  methods: {
    ...mapActions(['setLocationDetails']),
    async fetchLocationDetails() {
      const response= await axios.get(`http://localhost:3000/locations/${this.locationId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      });
      await this.setLocationDetails(response.data);
      console.log(response.data)
      this.$router.push(`/Show-LocationDetails/${this.locationId}`);
    },

  },

};
</script>
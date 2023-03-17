<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">Name    </label>
      <input type="text" id="filmName" v-model="filmName" />
    </div>
    <br />
    <div class="form-group">
      <label for="filmType">Film Type (Long métrage / Série TV / Série Web / Téléfilm)    </label>
      <input type="text" id="filmType" v-model="filmType" />
    </div>
    <br />
    <div class="form-group">
      <label for="filmDirectorName">Film Director Name   </label>
      <input type="text" id="filmDirectorName" v-model="filmDirectorName" />
    </div>
    <br />
    <div class="form-group">
      <label for="filmProducerName">Film Producer Name    </label>
      <input type="text" id="filmProducerName" v-model="filmProducerName" />
    </div>
    <br />
    <div class="form-group">
      <label for="address">Address    </label>
      <input type="text" id="address" v-model="address" />
    </div>
    <br />
    <div class="form-group">
      <label for="district">District (750 + district number)    </label>
      <input type="text" id="district" v-model="district" />
    </div>
    <br />
    <div class="form-group">
      <label for="year">Year    </label>
      <input type="number" id="year" v-model="year" />
    </div>
    <br />
    <br />
    <br />
    <button type="submit">Submit</button>
  </form>
  <br />
  <br />
  <div>
    <button @click="GoBack()">Go back to location list </button>
  </div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
export default {
  computed: {
    ...mapState({
      //locationDetails: (state) => state.locationDetails,
      //locationId: (state) => state.locationId,
      token: (state) => state.token
    }),
  },
  data() {
    return {
      filmName: '',
      filmType: '',
      filmDirectorName: '',
      filmProducerName: '',
      address: '',
      district: '',
      year: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('http://localhost:3000', {
          filmName: this.filmName,
          filmType: this.filmType,
          filmDirectorName: this.filmDirectorName,
          filmProducerName: this.filmProducerName,
          address: this.address,
          district: this.district,
          year: this.year
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }});
        this.filmName = '';
        this.filmType = '';
        this.filmDirectorName = '';
        this.filmProducerName = '';
        this.address = '';
        this.district = '';
        this.year = '';
        alert('Your Location was successfully created !');
      } catch (error) {
        alert('An error occurred, please try again later');
      }
    },
    GoBack(){
      this.$router.push(`/locations`);
    }
  }
};
</script>
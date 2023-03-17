<template>
  <div>
    <h1>Edit Film</h1>
    <form @submit.prevent="submitEditForm">
      <div>
        <label for="filmName">Name:</label>
        <input type="text" id="filmName" v-model="filmName" :placeholder="locationDetails.filmName"/>
      </div>
      <br />
      <div>
        <label for="filmType">Film Type:</label>
        <input type="text" id="filmType" v-model="filmType" :placeholder="locationDetails.filmType"/>
      </div>
      <br />
      <div>
        <label for="filmDirectorName">Film Director Name:</label>
        <input type="text" id="filmDirectorName" v-model="filmDirectorName" :placeholder="locationDetails.filmDirectorName"/>
      </div>
      <br />
      <div>
        <label for="filmProducerName">Film Producer Name:</label>
        <input type="text" id="filmProducerName" v-model="filmProducerName" :placeholder="locationDetails.filmProducerName"/>
      </div>
      <br />
      <div>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" :placeholder="locationDetails.address"/>
      </div>
      <br />
      <div>
        <label for="district">District:</label>
        <input type="text" id="district" v-model="district" :placeholder="locationDetails.district"/>
      </div>
      <br />
      <div>
        <label for="year">Year:</label>
        <input type="text" id="year" v-model="year" :placeholder="locationDetails.year"/>
      </div>
      <br />
      <br />
      <br />
      <button type="submit">Submit Changes</button>
    </form>
    <br />
    <br />
    <button @click="GoBack()">Go back to location </button>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      locationDetails: (state) => state.locationDetails,
      locationId: (state) => state.locationId,
      token: (state) => state.token
    }),
  },
  data() {
    return {
      //filmId: this.$route.params.filmId,
      filmName: '',
      filmType: '',
      filmDirectorName: '',
      filmProducerName: '',
      address: '',
      district: '',
      year: '',
    }
  },
  created() {
    //this.locationId = this.$route.params.filmId;
    this.fetchFilm();
  },
  methods: {
    async fetchFilm() {
      try {
        const { data } = await axios.get(`http://localhost:3000/locations/${this.locationId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        this.filmName = data.filmName;
        this.filmType = data.filmType;
        this.filmDirectorName = data.filmDirectorName;
        this.filmProducerName = data.filmProducerName;
        this.address = data.address;
        this.district = data.district;
        this.year = data.year;
      } catch (error) {
        console.error(error);
      }
    },
    GoBack(){
      this.$router.push(`/LocationDetails/${this.locationId}`);
    },
    async submitEditForm() {
      try {
        await axios.patch(`http://localhost:3000/locations/${this.locationId}`, {
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
          }
        });
        alert('Location updated successfully!');
      } catch (error) {
        alert('An error occurred, please try again later');
      }
    }
  }
};
</script>
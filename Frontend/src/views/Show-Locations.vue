<style>
  td {
    text-align: center;
  }
</style>
<template>
    <div>
      <table style="margin: 0 auto;">
        <thead>
          <tr>
            <th>Film shoot locations </th>
            <br />
            <br />
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.filmName }}, in Paris {{item.district}}</td>
            <button @click="locationDetail(item._id)">see details</button>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <div v-if="this.role==='admin'">
        <button @click="CreateLocation">Add Location </button>
      </div>
      <br />
      <div class="pagination">
        <button @click="prevPage">Prev</button>
        {{ currentPage }} / {{ totalPages }}
        <button @click="nextPage">Next</button>
      </div>

    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters, mapState} from 'vuex';
  
  export default {  
    data() {
    return {
      data : this.$store.state.locations,
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
 
    computed: {
    ...mapState({
      role: (state) => state.role,
      locations : (state) => state.locations,
      locationId : (state) => state.locationId,
    }),
      ...mapGetters(["isAdmin"]),
    totalPages() {
      return Math.ceil(this.locations.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.locations.slice(start, end);
    },
  },
  methods: {
    ...mapActions(['setLocationId']),
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.locations.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    },
    locationDetail(id){
      this.setLocationId(id)
      this.$router.push(`/locationDetails/${id}`);
    },
    CreateLocation() {
      this.$router.push('/CreateLocation');
    },

  },
}

  
  </script>
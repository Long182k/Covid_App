<template>
    <main v-if="!loading">
        <DataTitle :text="title" :dataDate="dataDate" />
        <DataBoxes :stats="status"/>
        <CountrySelect @get-country="getCountryData" :countries="countries"   />
        <button @click="clearCountryData"  v-if="status.Country" class="bg-green-700 text-white rounded p-3 mt-10
        focus:outline-none hover:bg-green-600"> Clear Country  </button>

  </main>

  <main class="flex flex-col align-center justify-center text-center"
  v-else>
  <div class="text-gray-500 text-3xl mt-10 mb-6">
    Fetching data
    </div>
    <img :src="require('../assets/clock.gif' )" class="w-30  m-auto" alt="" />
  </main>
</template>

<script>

import DataTitle from "../components/DataTitle";
import DataBoxes from "../components/DataBoxes";
import CountrySelect from "../components/CountrySelect";
import {ref} from "vue";

export default {
  name: 'Home',
  components: {
    CountrySelect,
    DataBoxes,
    DataTitle
  },
  setup() {
    const loading = ref(true);
    const title = ref('Global');
    const dataDate = ref('');
    const status = ref({});
    const countries = ref([]);

    const fetchCovidData = async () => {
      const res = await fetch('https://api.covid19api.com/summary');
      return res.json();
    };

    const getCountryData = (country) => {
      status.value = country;
      title.value = country.Country;
    };

    const clearCountryData = async () => {
      loading.value = true;
      const data = await fetchCovidData();
      title.value = 'Global';
      status.value = data.Global;
      loading.value = false;
    }

    const baseSetup = async () => {
      const data = await fetchCovidData();
      dataDate.value = data.Date;
      status.value = data.Global;
      countries.value = data.Countries;
      loading.value = false;
    };
    baseSetup();
    return {
      loading,
      title,
      dataDate,
      status,
      countries,
      getCountryData,
      clearCountryData,
    };

  }
}
//   data () {
//     return {
//       loading: false,
//       title : 'Global',
//       dataDate : '',
//       status : {},
//       countries : [],
//     }
//   },
//   methods : {
//     async fetchCovidData() {
//       const res = await fetch ('https://api.covid19api.com/summary')
//       const data = await res.json()
//       return data
//     },
//     getCountryData(country) {
//       this.status = country
//       this.title = country.Country
//     },
//     async clearCountryData(){
//       this.loading = true
//       const data = await this.fetchCovidData()
//       this.title = 'Global'
//       this.status = data.Global
//       this.loading = false
//     }
//   },
//   async created() {
//     const data =await this.fetchCovidData()
//     this.dataDate = data.Date
//     this.status = data.Global
//     this.countries = data.Countries
//     this.loading = false
//
// },

</script>

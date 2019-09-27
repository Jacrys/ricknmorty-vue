<template>
  <div>
    <div class="header" data-role="header">
      <img src="rymlogo.png" alt />
    </div>
    <div class="instructions" v-if="!filters.name">
      <p>Please type the name of a character</p>
    </div>
    <div class="grid-button">
      <kendo-button
        icon="arrow-chevron-left"
        :disabled="(ApiResponse.info.prev === '')"
        @click.native="apiCall(ApiResponse.info.prev)"
      >Prev</kendo-button>
      <kendo-autocomplete
        class="autocomplete"
        v-model="filters.name"
        :data-source="listOfNames"
        :placeholder="'Select name...'"
      ></kendo-autocomplete>
      <kendo-button class="k-primary" @click.native="apiCall()">Search</kendo-button>
      <kendo-button @click.native.prevent="apiClear()">Clear</kendo-button>
      <kendo-button
        id="btn-r"
        icon="arrow-chevron-right"
        :disabled="(ApiResponse.info.next === '')"
        @click.native="apiCall(ApiResponse.info.next)"
      >Next</kendo-button>
    </div>
    <div class="gallery">
      <div v-for="item in ApiResponse.results" :key="item.id" class="item">
        <img :src="item.image" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import configApi from "./basicConfig";
import { AutoComplete } from "@progress/kendo-dropdowns-vue-wrapper";
import KendoButton from "./KendoButton";
import axios from "axios";
export default {
  name: "ApiSeek",
  mounted: function() {
    this.apiCall();
  },
  components: {
    "kendo-autocomplete": AutoComplete,
    "kendo-button": KendoButton
  },
  computed: {
    listOfNames() {
      let response = [];
      // eslint-disable-next-line
      if (this.ApiResponse.results.length > 0)
        this.ApiResponse.results.forEach(item => response.push(item.name));
      return response;
    }
  },
  data() {
    return {
      urlBase: configApi.url,
      ApiResponse: {
        info: {
          count: 0,
          pages: 0,
          next: "",
          prev: ""
        },
        results: []
      },
      filters: {
        name: ""
      }
    };
  },
  methods: {
    apiClear() {
      this.filters.name = "";
      this.apiCall();
    },
    apiCall(url = null) {
      let me = this;
      console.log(this.filters.name);
      let extraUrl = this.filters.name
        ? this.urlBase + "character/?name=" + this.filters.name
        : this.urlBase + "character/";
      let callUrl = url ? url : extraUrl;
      axios
        .get(callUrl)
        .then(response => (me.ApiResponse = response.data))
        // eslint-disable-next-line
        .catch(error => console.log(error.data));
    }
  }
};
</script>

<style lang="scss">
@import "../assets/sass/grid";
@import "../assets/sass/grid-tablet";
@import "../assets/sass/grid-mobile";
</style>

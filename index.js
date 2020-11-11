Vue.filter('htmlEscape', function(value) {
  return value.replace(/\&amp\;/g, '&');
});
Vue.filter('dateTime', function(val) {
  return new Date(val).toGMTString().slice(0, -13);
});

var vm = new Vue({
  el: '#wikiApp',
  data: {
    wikiObj: null,
    isResult: false,
    searchQuery: '',
  },
  computed: {

  },
  ready: function() {
  },
  methods: {
    removeSearchQuery: function() {
      this.searchQuery = '';
      this.isResult = false;
    },
    submitSearch: function() {
      var reqURL = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&exsentences=1&exintro&explaintext&exlimit=max&prop=extracts&gsrlimit=10&gsrsearch="+this.searchQuery+"&format=json";
     
      this.$http.jsonp(reqURL).then(function(response) {
        this.wikiObj = response.data.query.pages;
        this.isResult = true;
      }, function(response) { /* fail response msg */
        console.log(response);
      });
    }
  }
});

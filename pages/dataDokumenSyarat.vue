<template>
  <v-card>
    <v-card-content>
      <iframe :src="fileUrl" width="100%" height="600px"></iframe>
    </v-card-content>
  </v-card>
</template>
<script>
export default {
  middleware: ['authAdmin'],
  layout: 'defaultAdmin',
  data() {
    return {
      fileUrl: ''
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.$get(`/surat/doc/${this.$route.query.id}`, {
        responseType: 'blob' // Menggunakan responseType 'blob' untuk file binary
      })
        .then((response => {
          // console.log(response)
          const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
          this.fileUrl = url;
        })).catch((error) => {
          console.error('Error downloading PDF:', error);
        })
    },
  }
}
</script>

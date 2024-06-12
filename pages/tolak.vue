<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <CardTitleSuratDitolakComponents/>

      <div class="pt-2">
      <TableDitolakComponents/>
    </div>

    </v-col>
  </v-row>
</template>
<script>
import CardTitleSuratDitolakComponents from '~/components/GlobalComponents/Card/CardTitleSuratDitolakComponents.vue'
import TableDitolakComponents from '~/components/UserComponents/dataSuratDitolak/Table/TableDitolakComponents.vue';
export default {
  middleware : ['auth'],
  head() {
    return {
      title: 'Ditolak'
    }
  },
  data() {
    return {
    }
  },
  components: { CardTitleSuratDitolakComponents, TableDitolakComponents },
  name: 'Ditolak',
}
</script>

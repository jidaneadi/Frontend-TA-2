<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <CardTitleSuratDiajukanComponents/>
      <div class="pt-2">
      <TableDiajukanComponents/>
    </div>

    </v-col>
  </v-row>
</template>
<script>
import CardTitleSuratDiajukanComponents from '~/components/GlobalComponents/Card/CardTitleSuratDiajukanComponents.vue';
import TableDiajukanComponents from '~/components/UserComponents/dataSuratDiajukan/Table/TableDiajukanComponents.vue';

export default {
    middleware: ["auth"],
    head() {
        return {
            title: "Pengajuan"
        };
    },
    name: "Pengajuan",
    components: { CardTitleSuratDiajukanComponents, TableDiajukanComponents }
}
</script>

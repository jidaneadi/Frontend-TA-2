<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <CardTitleSuratDiterbitkanComponents/>

      <div class="pt-2">
      <TabelDiterbitkanComponents/>
    </div>

    </v-col>
  </v-row>
</template>
<script>
import TabelDiterbitkanComponents from '~/components/UserComponents/dataSuratDiterbitkan/Table/TabelDiterbitkanComponents.vue';
import CardTitleSuratDiterbitkanComponents from '~/components/GlobalComponents/Card/CardTitleSuratDiterbitkanComponents.vue'
export default {
    middleware: ["auth"],
    head() {
        return {
            title: "Diterbitkan"
        };
    },
    data() {
        return {
            dialog: true,
            // Data Table
            search: "",
            headers: [
                {
                    text: "Nama Dokumen",
                    align: "start",
                    sortable: false,
                    value: "name",
                },
                { text: "Tanggal Diterbitkan", value: "tgl" },
                // { text: 'Status', value: 'status' },
                { text: "Jenis Surat", value: "jns_surat" },
                { text: "Keterangan", value: "keterangan" },
                { text: "Aksi", value: "aksi" },
            ],
            desserts: [
                {
                    name: "Frozen Yogurt",
                    tgl: 159,
                    jns_surat: "Surat Pengantar Penerbitan KTP",
                    keterangan: 4,
                    aksi: 1,
                },
                {
                    name: "Ice cream sandwich",
                    tgl: 237,
                    jns_surat: "Surat Pengantar Keterangan Kematian",
                    keterangan: 4.3,
                    aksi: 1,
                },
                {
                    name: "Eclair",
                    tgl: 262,
                    status: 16,
                    jns_surat: "Surat Pengantar Penerbitan KK",
                    keterangan: 6,
                    aksi: 7,
                },
                {
                    name: "Cupcake",
                    tgl: 305,
                    jns_surat: "Surat Pengantar Keterangan Tidak Mampu",
                    keterangan: 4.3,
                    aksi: 8,
                },
                {
                    name: "Gingerbread",
                    tgl: 356,
                    jns_surat: "Surat Pengantar Keterangan Kelahiran",
                    keterangan: 3.9,
                    aksi: 16,
                },
                {
                    name: "Jelly bean",
                    tgl: 375,
                    status: 0,
                    jns_surat: "Surat Pengantar Penerbitan KTP",
                    keterangan: 0,
                    aksi: 0,
                },
                {
                    name: "Lollipop",
                    tgl: 392,
                    status: 0.2,
                    jns_surat: 98,
                    keterangan: 0,
                    aksi: 2,
                },
                {
                    name: "Honeycomb",
                    tgl: 408,
                    status: 3.2,
                    jns_surat: 87,
                    keterangan: 6.5,
                    aksi: 45,
                },
                {
                    name: "Donut",
                    tgl: 452,
                    status: 25,
                    jns_surat: 51,
                    keterangan: 4.9,
                    aksi: 22,
                },
                {
                    name: "KitKat",
                    tgl: 518,
                    status: 26,
                    jns_surat: 65,
                    keterangan: 7,
                    aksi: 6,
                },
            ],
        };
    },
    name: "Diterbitkan",
    components: { TabelDiterbitkanComponents, CardTitleSuratDiterbitkanComponents }
}
</script>

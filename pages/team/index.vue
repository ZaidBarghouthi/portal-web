<template>
  <div class="board-staff-page">

    <!-- Banner -->
    <pageBanner :pageMeta="boardStaffMeta" />

    <!-- Lists -->
    <div class="container pb-20">
      <boardStaffList class="board-staff-list" role="board" :title="$t('boardStaff.board')" />
      <boardStaffList class="board-staff-list" role="staff" :title="$t('boardStaff.staff')" />
      <boardStaffList class="board-staff-list" role="previousBoard" :title="$t('boardStaff.previousBoard')" compact />
      <boardStaffList class="board-staff-list" role="previousStaff" :title="$t('boardStaff.previousStaff')" compact />
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import pageBanner from "@/components/UI/PageBanner";
  import boardStaffList from '@/components/BoardStaff/BoardStaffList';

  export default {
    head() {
      const i18nSeo = this.$nuxtI18nSeo()
      return {
        title: this.boardStaffMeta['title_' + this.$i18n.locale] + ' - ' + (this.$i18n.locale == 'ar' ?
          'الجمعية الأردنية للمصدر المفتوح' : 'Jordan Open Source Association'),
        meta: [{
            name: 'description',
            content: this.boardStaffMeta['metaDescription_' + this.$i18n.locale] ? this.boardStaffMeta[
              'metaDescription_' + this.$i18n.locale] : ''
          },
          ...i18nSeo.meta
        ]
      }
    },
    layout: "default",
    components: {
      pageBanner,
      boardStaffList
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=boardandstaff');
      return {
        boardStaffMeta: pageMeta.data[0]
      }
    }
  };
</script>

<style scoped>
  .board-staff-list {
    @apply px-12 mt-20;
  }
</style>

<template>
  <div class="links">
    <span v-for="item in orderBy(menu.menuItems, 'weight')" :key="item.id">
      <nuxt-link v-if="external(item.path)" tag="a" :to="item.path"
        active-class="active" :class="menuItemClass">{{ item['label_' + $i18n.locale] }}</nuxt-link>
      <nuxt-link v-else tag="a" :to="localePath(item.path)"
        active-class="active" :class="menuItemClass">{{ item['label_' + $i18n.locale] }}</nuxt-link>
    </span>
  </div>
</template>

<script>
  import Vue2Filters from 'vue2-filters';
  export default {
    props: {
      menu: {
        type: Object,
        required: true
      },
      menuItemClass: {
        type: String
      }
    },
    mixins: [Vue2Filters.mixin],
    methods: {
      external(path) {
        var re = new RegExp("^(http|https)://", "i");
        return re.test(path);
      }
    }
  }

</script>

<style scoped>

</style>

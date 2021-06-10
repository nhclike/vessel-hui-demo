
<template>
    <div>
<!-- Latest update -->
  <vue-timeline-update
    :date="new Date('2017-02-26')"
    title="v2.2.0 - Initial D"
    description="Today I am thrilled to announce the release of Vue.js 2.2.0."
    category="announcement"
    icon="code"
    color="red"
  />

  <!-- Another update -->
  <vue-timeline-update
    :date="new Date('2016-11-22')"
    title="v2.1.0 - Hunter X Hunter"
    description="Today I am thrilled to announce the release of Vue.js 2.1.0."
    category="announcement"
    icon="code"
    color="turquoise"
  />

  <!-- Yet another update -->
  <vue-timeline-update
    :date="new Date('2016-09-30')"
    title="v2.0.0 - Ghost in the Shell"
    description="Today I am thrilled to announce the release of Vue.js 2.0.0"
    category="announcement"
    icon="code"
    color="white"
    is-last
  />
  </div>

</template>

<script>
export default {
  name: 'TimeLine'
}
</script>

<style>

</style>

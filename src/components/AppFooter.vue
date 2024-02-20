<script>
export default {
  name: "AppFooter",
};
</script>

<template>
  <footer>
    <div class="container">&copy; Boolflix - All right reserved</div>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--blfx-dark);
  padding-block: 1rem;
}
</style>

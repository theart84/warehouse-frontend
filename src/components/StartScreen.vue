<template>
  <div>
    <div class="container text-center">
      <h1 class="text">Warehouse</h1>
      <div class="text-right">
        <small
            class="text-right description-title"
        >
          a small application for working with a warehouse
        </small>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WhStartScreen',
};
</script>

<style>
.text {
  padding-top: 40vh;
  font-size: 10em;
  font-weight: 700;
  color: rgba(0,0,0,0.6);
  text-shadow: 2px 8px 6px rgba(0,0,0,0.2),  0 -5px 35px rgba(255,255,255,0.3);
}
@media (max-width: 768px) {
  .text {
    font-size: 4em;
  }
}
</style>

<style scoped>
.description-title {
  color: rgba(0,0,0,0.6);
  font-weight: 700;
  padding-right: 140px;
  text-shadow: 2px 8px 6px rgba(0,0,0,0.1),  0 -5px 35px rgba(255,255,255,0.2);
}
@media (max-width: 768px) {
  .description-title {
    padding-right: 25px;
  }
}
</style>

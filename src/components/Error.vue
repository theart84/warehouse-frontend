<template>
  <div class="card card-info-position shadow-sm" style="width: 320px;">
    <img src="@/assets/401error.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Информация</h5>
      <p class="card-text">Срок жизни токена истек, необходимо авторизоваться.</p>
      <a href="#/login" class="btn btn-primary">Авторизация</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WhError',
};
</script>

<style>
.card-info-position {
  position: absolute;
  top: calc(50vh - 170px);
  left: calc(50% - 160px);
  z-index: 10;
}
</style>

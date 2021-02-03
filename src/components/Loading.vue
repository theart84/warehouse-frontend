<template>
  <div>
    <b-spinner
        style="
          width: 50px;
          height: 50px;
          position: fixed;
          top: calc(50% - 25px);
          left: calc(50% - 25px)
        "
        variant="primary"
        label="Text Centered" />
  </div>
</template>

<script>
export default {
  name: 'WhLoading',
};
</script>

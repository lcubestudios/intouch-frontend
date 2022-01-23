<template>
  <div>
    <div class="contact_list">
      <div class="contact_list_wrapper">
        <div class="contact_profile_container">
          <div class="contact_profile_image"></div>
        </div>
        <div class="contact_profile_number">929-342-2424</div>
        <div class="contact_profile_dots_container">
          <div class="contact_profile_dots"></div>
          <div class="contact_profile_dots"></div>
          <div class="contact_profile_dots"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @media only screen and (max-width: 390px) {
    html {
      font-size: calc(100vw / 390px * 10);
    }

    .contact_list {
      width: 100%;
      height: auto;
      padding: 1rem;
      background-color: #efefef;
    }

    .contact_list_wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .contact_profile_container {
      height: 3rem;
      width: 3rem;
      background-color: black;
      border-radius: 50%;
      margin-right: 2rem;
    }

    .contact_profile_dots_container {
      margin-left: auto;
    }

    .contact_profile_dots {
      height: .5rem;
      width: .5rem;
      background-color: black;
      border-radius: 50%;
      margin: .2rem 0;
    }
  }
</style>
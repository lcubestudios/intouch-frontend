<template>
  <div>
    <div class="dropdown_container">
      <figure class="dropdown_image_container">
        <div class="dropdown_img"></div>
      </figure>
      <div class="dropdown_profile_number">
        <span class="profile_number_text">929-292-4932</span>
      </div>
      <ul class="dropdown_options">
        <div class="dropdown_items_wrapper">
          <div class="line_divider"></div>
          <div class="dropdown_item_container">
            <button><li class="dropdown_items">Log Out</li></button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
    
  @media only screen and (max-width: 390px) {
    html {
      font-size: calc(100vw / 390px * 10);
    }

    .dropdown_container {
      width: 13rem;
      height: auto;
      background-color: grey;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
    }

    .dropdown_image_container {
      height: 4rem;
      width: 4rem;
      margin-bottom: 1rem;
      background-color: beige;
      margin-top: 1rem;
      border-radius: 50%
    }

    .dropdown_profile_number {
      margin-bottom: 1.5rem;
    }

    .dropdown_options {
      width: 100%;
      text-align: center;
    }

    .dropdown_item_contianer {
      width: 100%;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .line_divider {
      height: 2px;
      background-color: black;
      width: 100%;
    }
  };




</style>
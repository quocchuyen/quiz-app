<template>
  <div class="float-left clear-both">
    <b-button v-b-toggle.sidebar-no-header>
        <b-icon icon="menu-button-wide" variant="light">
        </b-icon>
    </b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-2">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="./index.html" @click="hide">Another Link</b-nav-item>
               <b-link href="Question.vue">Link</b-link>
            </b-nav>
          </nav>
          <b-button variant="danger" block @click="hide">X</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>


<script>
export default {
  
}
</script>
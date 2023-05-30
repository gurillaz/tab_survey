<template>
  <v-app>
    <v-container fluid class="pa-0">
      <v-row no-gutters class="justify-center">
        <v-col
          cols="11"
          sm="7"
          md="5"
          lg="4"
          xl="3"
          class="align-self-center"
          style="position:absolute; z-index:1000!important"
        >
          <div class="blured-bg pa-1 pt-0 white--text">
            <v-btn
              class="mt-9"
              fab
              dark
              text
              small
              absolute
              top
              right
              @click="password_enter = !password_enter"
            >
              <v-icon v-if="!password_enter">mdi-cog</v-icon>
              <v-icon v-else>mdi-arrow-left-circle-outline</v-icon>
            </v-btn>
            <v-scroll-x-reverse-transition hide-on-leave>
              <div
                style="min-height:230px"
                v-if="!password_enter"
                ref="welcome_div"
              >
                <div class="mx-4 py-3">
                  <h1>Pyetësor</h1>
                  <h3 class="font-weight-regular mt-3">
                    Ju lutemi ndani një minutë kohë dhe mbusheni këtë pyetësor.
                    Të dhënat janë anonime dhe shërbejnë për përmisimin e
                    shërbimeve të
                    <span class="font-weight-bold">BEX Autmobile.</span>
                  </h3>
                </div>
                <v-card-actions class="px-4 mt-lg-5">
                  <v-btn block elevation="10" color="white" to="/main"
                    >Vazhdo</v-btn
                  >
                </v-card-actions>
              </div>
            </v-scroll-x-reverse-transition>

            <v-scroll-x-transition hide-on-leave>
              <div
                v-if="password_enter"
                :style="`min-height:${password_div_height}px`"
              >
                <div class="mx-4 py-3">
                  <h1>Fjalkalimi</h1>
                  <h3 class="font-weight-regular mt-3 mb-3">
                    Jep fjalkalimin per te vazhduar
                  </h3>
                  <v-text-field
                    label="Fjalkalimi"
                    dark
                    autofocus
                    v-model="password_field"
                    clearable
                    :error="wrong_password"
                    @keydown.enter="checkPasswordOpenSettings()"
                  ></v-text-field>
                </div>
                <!-- <v-card-actions>
                  <v-btn block elevation="10" color="white" to="/main">Vazhdo</v-btn>
                </v-card-actions>-->
              </div>
            </v-scroll-x-transition>
          </div>
        </v-col>
        <v-col cols="12" class="black">
          <v-carousel
            height="100vh"
            cycle
            :show-arrows="false"
            hide-delimiter-background
          >
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorsld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {
      password_enter: false,
      wrong_password: false,
      password_div_height: 200,
      items: [
        {
          src: "images/bg1.jpg",
        },
        {
          src: "images/bg2.jpg",
        },
        {
          src: "images/bg3.jpg",
        },
      ],
      password_field: "",
      default_password: "1234",
    };
  },
  computed: {},
  mounted() {
    this.matchHeight();
  },

  methods: {
    matchHeight() {
      this.password_div_height = this.$refs.welcome_div.clientHeight;
    },
    checkPasswordOpenSettings() {
      this.wrong_password = false;
      if (this.password_field == this.default_password) {
        this.$router.push("/settings");
      }
      else this.wrong_password = true;
    },
  },
};
</script>
<style lang="scss">
.blured-bg {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);

  backdrop-filter: blur(15px);
}
</style>

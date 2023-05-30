<template>
  <v-app class="blue-grey lighten-5">
    <v-sheet
      elevation="5"
      height="140"
      width="100%"
      class="pa-0"
      style="top:0; position:fixed; z-index:10"
    >
      <v-container fluid class="pa-0">
        <v-row no-gutters class="white--text">
          <v-col class="black py-0 px-4" cols="12" style="height:100px">
            <v-row no-gutters>
              <v-col cols="8">
                <p class="font-weight-bold mt-n2 ml-n1" style="font-size:86px">BEX</p>
              </v-col>
              <v-col cols="4" class="text-right">
                <p class="text-uppercase mt-8">
                  Oferta jone
                  <br />
                  <span class="font-weight-bold">eshte cilesia</span>
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="blue py-2 px-4" cols="12" style="height:40px">
            <v-row no-gutters>
              <v-col cols="8">
                <p class="font-weight-bold">BOSCH CAR SERVICE</p>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-btn class="mt-n1 mr-3" fab dark outlined x-small @click="reset_survey">
                  <v-icon>mdi-restart</v-icon>
                </v-btn>
                <v-btn class="mt-n1 mr-1" fab dark outlined x-small to="/">
                  <v-icon>mdi-home</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container fluid class="pa-0 pb-4" style="margin-top:140px">
      <v-row no-gutters class="px-4">
        <v-col>
          <div class="mt-6 mb-0 subtitle-2 grey--text">
            <v-icon small class="ml-1 mr-2">mdi-information-outline</v-icon>Plotëso duke zgjedhur njërën nga opsionet.
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="px-4">
        <v-col>
          <div v-for="question in surveyData.questionsWithOptions" v-bind:key="question.name">
            <v-card outlined class="mt-4" v-if="question.name!=='Pyetja_10'">
              <v-card-title class="pb-0 mb-0">{{question.questionTitle}}</v-card-title>
              <v-card-text class="py-0 mb-4">{{question.questionDsc}}</v-card-text>
              <v-card-text class="py-1">
                <v-divider class></v-divider>

                <v-btn-toggle
                  v-model="question.answer"
                  dense
                  active-class="primary"
                  style="width:100%!important"
                >
                  <v-container fluid class="py-0" style="width:100%!important">
                    <v-row class="pt-3">
                      <v-col
                        class="flex-grow-1 px-0 pt-0"
                        v-for="(option,index) in question.options"
                        v-bind:key="index"
                      >
                        <v-btn
                          :value="option"
                          block
                          color="blue-grey"
                          tile
                          elevation="0"
                          class="white--text"
                        >{{option}}</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-btn-toggle>
                <v-expand-transition>
                  <div v-if="question.name=='Pyetja_9' && question.answer=='Po' " class="px-0">
                    <div
                      v-for="subquestion in [surveyData.questionsWithOptions[surveyData.questionsWithOptions.length-1]]"
                      v-bind:key="subquestion.name"
                    >
                      <v-card-title class="pb-0 mb-0 px-0">{{subquestion.questionTitle}}</v-card-title>
                      <v-card-text class="py-1 px-0">
                        <v-divider class></v-divider>

                        <v-btn-toggle
                          v-model="subquestion.answer"
                          dense
                          active-class="primary"
                          style="width:100%!important"
                        >
                          <v-container fluid class="py-0" style="width:100%!important">
                            <v-row class="pt-3">
                              <v-col
                                class="flex-grow-1 px-0 pt-0"
                                v-for="(suboption,index) in subquestion.options"
                                v-bind:key="index"
                              >
                                <v-btn
                                  :value="suboption"
                                  block
                                  color="blue-grey"
                                  tile
                                  elevation="0"
                                  class="white--text"
                                >{{suboption}}</v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-btn-toggle>
                      </v-card-text>
                    </div>
                  </div>
                </v-expand-transition>
              </v-card-text>
            </v-card>
          </div>
          <v-card outlined class="mt-4">
            <v-card-title class="pb-0 mb-0">Tjera</v-card-title>
            <v-card-text class="py-0 mb-4">Vendbanimi, Mosha & vërejtje/sygjerime.</v-card-text>
            <v-card-text class="py-1">
              <v-divider class></v-divider>
              <v-container fluid class="px-0 pb-0">
                <v-row no-gutters>
                  <v-col cols="8" class="pr-2">
                    <v-text-field
                      v-model="surveyData.question11.answer"
                      :label="surveyData.question11.questionTitle"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pl-2">
                    <v-text-field
                      :label="surveyData.question12.questionTitle"
                      dense
                      outlined
                      type="number"
                      v-model="surveyData.question12.answer"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n2">
                    <v-textarea
                      outlined
                      dense
                      v-model="surveyData.question13.answer"
                      rows="3"
                      :label="surveyData.question13.questionTitle"
                      hint="Mos hezitoni të shënoni vërejtjet ose sygjerimet tuaja, edhe nëse jane negative."
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-expand-transition>
          <v-col cols="12" v-if="empty_survey">
            <v-card outlined class="mt-4" color="grey" dark>
              <v-card-text class="py-1 white--text">
                <div class="my-2 subtitle-2">
                  <v-icon class="mr-2">mdi-car-brake-alert</v-icon>Përgjigju fillimisht në disa nga pyetjet.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-expand-transition>

        <v-col cols="12">
          <v-btn class="mt-4" block color="primary" @click="submit_survey">Dërgo</v-btn>
          <div class="mt-2 mb-0 subtitle-2 grey--text text-center">
            <v-icon small class="mr-2">mdi-information-outline</v-icon>Të gjitha të dhenat janë anonime.
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="end_dialog" fullscreen transition="dialog-bottom-transition">
      <v-card tile class="dark--text">
        <v-container fluid class="clouds-bg py-0" style="height:100vh!important">
          <v-row class="justify-center" style="height:100vh!important">
            <v-col cols="10" sm="8" md="8" lg="7" xl="6" class="align-self-center">
              <div class="mb-12 mt-n12 text-center">
                <v-icon size="140" color="green" class>mdi-check-circle-outline</v-icon>
              </div>
              <h1 class="blue--text" style="line-height:2.1rem;">Faleminderit për bashkpunimin!</h1>
              <h3
                class="mt-2 blue-grey--text"
              >Përgjegjiet e juaja do të kontribojnë në përmimisin e shërbimeve të BEX Automobile</h3>
              <!-- <v-btn icon @click="end_dialog = false">
                <v-icon>mdi-close</v-icon>aasdasdasd
              </v-btn>-->
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      scriptUrl:
        "https://script.google.com/macros/s/AKfycbxbbCfgWEy31UBQp8oZJUk04cIMAjq4orwq9WZVbiD9ipEsBpHz/exec",
      end_dialog: false,
      empty_survey: false,
      surveyData: {
        date: -1,
        savedCloud: false,
        questionsWithOptions: [
          {
            name: "Pyetja_1",
            answer: -1,
            questionTitle: "1. Pritja dhe shërbimi",
            questionDsc:
              "Vlerëso pritjen nga stafi dhe marrjen parasyshë të kërkesave tuaja:",
            options: ["Dobët", "Mirë", "Shumë mirë"]
          },

          {
            name: "Pyetja_2",
            answer: -1,
            questionTitle: "2. Pranimi i automjetit nga personeli",
            questionDsc:
              "Vlerëso pranimin e automjetit dhe shpjegimin e personelit për prishjet në automjetin tuaj:",
            options: ["Dobët", "Mirë", "Shumë mirë"]
          },
          {
            name: "Pyetja_3",
            answer: -1,
            questionTitle: "3. Stafi i servisit(mekanikët)",
            questionDsc: "Si e vlerësoni stafin e servisit/mekanikët:",
            options: ["Dobët", "Mirë", "Shumë mirë", "Nuk kam përgjegjie"]
          },
          {
            name: "Pyetja_4",
            answer: -1,
            questionTitle: "4. Niveli i çmimeve",
            questionDsc: "Vlerëso nivelin e çmimeve:",
            options: ["Të ulëta", "Mesatare", "Të larta", "Shumë të larta"]
          },
          {
            name: "Pyetja_5",
            answer: -1,
            questionTitle: "5. Cilësia e punës",
            questionDsc: "Sa jeni të kënaqur me cilësine e punës:",
            options: ["Dobët", "Mesatarisht", "I kënaqur", "Nuk kam vlerësim"]
          },
          {
            name: "Pyetja_6",
            answer: -1,
            questionTitle: "6. Përpikshmëria e termineve",
            questionDsc:
              "Vlerësoni saktësinë e termineve, nëse ka pasur vonesa ose jo:",
            options: ["Me vonesa", "Mesatarë", "Të saktë"]
          },
          {
            name: "Pyetja_7",
            answer: -1,
            questionTitle: "7. Kjartësia e faturës",
            questionDsc:
              "Sa është lehtë të kuptohet fatura? Shërbimet, Çmimet etj.",
            options: [
              "E komplikuar",
              "Mesatarisht e lehtë",
              "E lehtë",
              "Nuk kam përgjegjie"
            ]
          },
          {
            name: "Pyetja_8",
            answer: -1,
            questionTitle:
              "8. A mendoni të jeni klient i rregullt në BEX Autmobile",
            questionDsc: "Ose nëse do ta vizitoni sërish BEX Automobile:",
            options: ["Po", "Jo", "Ndoshta"]
          },
          {
            name: "Pyetja_9",
            answer: -1,
            questionTitle: "9. A keni dëgjuar për ofertën e fundit?",
            questionDsc: "",
            options: ["Po", "Jo"]
          },
          {
            name: "Pyetja_10",
            answer: -1,
            questionTitle: "Ku keni dëgjuar?",
            questionDsc: "",
            options: [
              "Facebook",
              "Instagram",
              "Viber",
              "Shokët/Miqt",
              "Billboard",
              "Fletushka",
              "Tjetër"
            ]
          }
        ],

        question11: {
          name: "Pyetja_11",
          answer: "",
          questionTitle: "Vendbanimi: Qyteti ose Shteti",
          questionDsc: ""
        },
        question12: {
          name: "Pyetja_12",
          answer: "",
          questionTitle: "Mosha",
          questionDsc: ""
        },
        question13: {
          name: "Pyetja_13",
          answer: "",
          questionTitle: "Vërejtjet ose sygjerimet",
          questionDsc: ""
        }
      },

      empty_surveyData: {
        date: -1,
        savedCloud: false,
        questionsWithOptions: [
          {
            name: "Pyetja_1",
            answer: -1,
            questionTitle: "1. Pritja dhe shërbimi",
            questionDsc:
              "Vlerëso pritjen nga stafi dhe marrjen parasyshë të kërkesave tuaja:",
            options: ["Dobët", "Mirë", "Shumë mirë"]
          },

          {
            name: "Pyetja_2",
            answer: -1,
            questionTitle: "2. Pranimi i automjetit nga personeli",
            questionDsc:
              "Vlerëso pranimin e automjetit dhe shpjegimin e personelit për prishjet në automjetin tuaj:",
            options: ["Dobët", "Mirë", "Shumë mirë"]
          },
          {
            name: "Pyetja_3",
            answer: -1,
            questionTitle: "3. Stafi i servisit(mekanikët)",
            questionDsc: "Si e vlerësoni stafin e servisit/mekanikët:",
            options: ["Dobët", "Mirë", "Shumë mirë", "Nuk kam përgjegjie"]
          },
          {
            name: "Pyetja_4",
            answer: -1,
            questionTitle: "4. Niveli i çmimeve",
            questionDsc: "Vlerëso nivelin e çmimeve:",
            options: ["Të ulëta", "Mesatare", "Të larta", "Shumë të larta"]
          },
          {
            name: "Pyetja_5",
            answer: -1,
            questionTitle: "5. Cilësia e punës",
            questionDsc: "Sa jeni të kënaqur me cilësine e punës:",
            options: ["Dobët", "Mesatarisht", "I kënaqur", "Nuk kam vlerësim"]
          },
          {
            name: "Pyetja_6",
            answer: -1,
            questionTitle: "6. Përpikshmëria e termineve",
            questionDsc:
              "Vlerësoni saktësinë e termineve, nëse ka pasur vonesa ose jo:",
            options: ["Me vonesa", "Mesatarë", "Të saktë"]
          },
          {
            name: "Pyetja_7",
            answer: -1,
            questionTitle: "7. Kjartësia e faturës",
            questionDsc:
              "Sa është lehtë të kuptohet fatura? Shërbimet, Çmimet etj.",
            options: [
              "E komplikuar",
              "Mesatarisht e lehtë",
              "E lehtë",
              "Nuk kam përgjegjie"
            ]
          },
          {
            name: "Pyetja_8",
            answer: -1,
            questionTitle:
              "8. A mendoni të jeni klient i rregullt në BEX Autmobile",
            questionDsc: "Ose nëse do ta vizitoni sërish BEX Automobile:",
            options: ["Po", "Jo", "Ndoshta"]
          },
          {
            name: "Pyetja_9",
            answer: -1,
            questionTitle: "9. A keni dëgjuar për ofertën e fundit?",
            questionDsc: "",
            options: ["Po", "Jo"]
          },
          {
            name: "Pyetja_10",
            answer: -1,
            questionTitle: "Ku keni dëgjuar?",
            questionDsc: "",
            options: [
              "Facebook",
              "Instagram",
              "Viber",
              "Shokët/Miqt",
              "Billboard",
              "Fletushka",
              "Tjetër"
            ]
          }
        ],

        question11: {
          name: "Pyetja_11",
          answer: "",
          questionTitle: "Vendbanimi: Qyteti ose Shteti",
          questionDsc: ""
        },
        question12: {
          name: "Pyetja_12",
          answer: "",
          questionTitle: "Mosha",
          questionDsc: ""
        },
        question13: {
          name: "Pyetja_13",
          answer: "",
          questionTitle: "Vërejtjet ose sygjerimet",
          questionDsc: ""
        }
      }
    };
  },
  methods: {
    reset_survey() {
      this.surveyData = JSON.parse(JSON.stringify(this.empty_surveyData));
    },
    submit_survey() {
      if (this.hasInput === false) {
        this.empty_survey = true;
        return;
      }
      this.end_dialog = true;
      // Guide:https://github.com/jamiewilson/form-to-google-sheets
      let formData = new FormData();
      let questions_array = [];

      this.surveyData.questionsWithOptions.forEach(question => {
        formData.append(question.name, question.answer);
        questions_array.push(question.questionTitle);
      });

      formData.append(
        this.surveyData.question11.name,
        this.surveyData.question11.answer
      );
      questions_array.push(this.surveyData.question11.questionTitle);

      formData.append(
        this.surveyData.question12.name,
        this.surveyData.question12.answer
      );
      questions_array.push(this.surveyData.question12.questionTitle);

      formData.append(
        this.surveyData.question13.name,
        this.surveyData.question13.answer
      );
      questions_array.push(this.surveyData.question13.questionTitle);

      formData.append(
        this.surveyData.question13.name,
        this.surveyData.question13.answer
      );
      questions_array.push(this.surveyData.question13.questionTitle);

      formData.append("Pyetjet_ARRAY", questions_array);
      formData.append("filled_date", Date.now());

      fetch(this.scriptUrl, {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.status == 200) {
            this.end_dialog = false;
            this.$router.push("/");
          }
        })
        .catch(() => {
          formData.append("cloud", false);

          let pastEntries = [];
          if (localStorage.getItem("local_survey_entries") != null) {
            pastEntries = JSON.parse(
              localStorage.getItem("local_survey_entries")
            );
          }
          pastEntries.unshift(Object.fromEntries(formData));

          localStorage.setItem(
            "local_survey_entries",
            JSON.stringify(pastEntries)
          );

          this.end_dialog = false;
          this.$router.push("/");
        });
    }
  },
  computed: {
    hasInput() {
      let result = false;
      this.surveyData.questionsWithOptions.forEach(question => {
        if (question.answer != undefined && question.answer != -1) {
          result = true;
        }
      });

      if (
        this.surveyData.question11.answer != "" &&
        this.surveyData.question11.answer != -1
      ) {
        result = true;
      }
      if (
        this.surveyData.question12.answer != "" &&
        this.surveyData.question12.answer != -1
      ) {
        result = true;
      }
      if (
        this.surveyData.question13.answer != "" &&
        this.surveyData.question13.answer != -1
      ) {
        result = true;
      }

      return result;
    }
  },
  watch: {
    enter_dialog(val) {
      if (!val) return;

      setTimeout(() => (this.enter_dialog = false), 4000);
    }
  }
};
</script>

<style>
@import "../../node_modules/animate.css/animate.min.css";

.clouds-bg {
  background-image: linear-gradient(50deg, #ebebeb 0%, #ffffff 100%);
}
</style>

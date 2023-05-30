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
      <v-row no-gutters class="px-4 mt-5">
        <v-col>
          <v-card class="mt-2">
            <div v-if="local_survey_entries.length>0" class="mt-4">
              <v-row class="align-center px-4 pt-2">
                <v-col cols="12" sm="8" md="8">
                  <h3>Te ruajtura lokal</h3>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-btn
                    block
                    outlined
                    color="green"
                    @click="upload_local_data"
                    :loading="save_cloud_button_loading"
                    :disabled="entries_saved_in_cloud"
                  >
                    <v-icon left>mdi-cloud</v-icon>Ruaj ne G Sheet
                  </v-btn>
                </v-col>
                <v-col cols="12 pt-0" v-if="cloud_save_error" class="text-right">
                  <p class="red--text caption mt-n2">Te dhenat nuk u ruajten ne Google Sheet</p>
                </v-col>
              </v-row>
              <v-data-table
                :headers="table_headers"
                :items.sync="local_survey_entries"
                :items-per-page="5"
                :hide-default-footer="true"
              >
                <template
                  v-slot:item.timestamp="{ item }"
                >{{new Date(parseInt(item.timestamp)).toLocaleString()}}</template>
                <template
                  v-slot:item.filled_date="{ item }"
                >{{new Date(parseInt(item.filled_date)).toLocaleString()}}</template>
                <template v-slot:item.cloud="{ item }">
                  <div v-if="item.cloud==true">
                    <v-icon color="green">mdi-cloud-check</v-icon>
                  </div>
                  <div v-else>
                    <v-icon color="red">mdi-cloud-off-outline</v-icon>
                  </div>
                </template>
              </v-data-table>
            </div>
            <div v-else class="text-center py-4">
              <div>
                <v-icon color="green" size="80">mdi-cloud-check</v-icon>
              </div>
              <p class="green--text caption">Te gjitha te dhenat jane te ruajtura ne Google Sheet</p>
            </div>

            <h3 class="px-4 mt-4">Te ruajtura ne cloud</h3>
            <!-- {{online_survey_entries}} -->
            <div v-if="connection_fail!=true">
              <v-data-table
                :headers="table_headers"
                :items="online_survey_entries"
                :items-per-page="5"
                :loading="loading"
                sort-by="timestamp"
                :sort-desc="true"
              >
                <template
                  v-slot:item.timestamp="{ item }"
                >{{new Date(item.timestamp).toLocaleString()}}</template>
                <template
                  v-slot:item.filled_date="{ item }"
                >{{new Date(parseInt(item.filled_date)).toLocaleString()}}</template>
                <template v-slot:item.cloud="{ item }">
                  <div v-if="item.cloud==true">
                    <v-icon color="green">mdi-cloud-check</v-icon>
                  </div>
                  <div v-else>
                    <v-icon color="red">mdi-cloud-off-outline</v-icon>
                  </div>
                </template>
              </v-data-table>
            </div>
            <div v-else class="text-center pt-1 pb-12">
              <div>
                <v-icon color="red" size="80">mdi-wifi-off</v-icon>
              </div>
              <p class="grey--text caption pb-0 mb-0">{{error}}</p>
              <p class="red--text body-1">Kontrollo nese jeni i kqyqur ne internet.</p>
              <v-btn color="red" outlined small @click="get_data" :loading="loading">Refresh</v-btn>
            </div>

            <!-- <div class="mr-auto">{{new Date(parseInt(entry.filled_date)).toLocaleString()}}</div> -->
            <!-- <div v-if="entry.cloud=='true'">
                <v-icon color="green">mdi-cloud-check</v-icon>
              </div>
              <div v-else>
                <v-icon color="red">mdi-cloud-off-outline</v-icon>
            </div>-->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      table_headers: [
        {
          text: "Date e rujtjes ne G Sheet",
          align: "start",
          // sortable: true,
          value: "timestamp"
        },
        {
          text: "Data e plotesimit",
          align: "start",
          // sortable: true,
          value: "filled_date"
        },

        {
          text: "E ruajtur ne G Sheet",
          align: "end",
          // sortable: true,
          value: "cloud"
        }
      ],
      loading: true,
      scriptUrl:
        "https://script.google.com/macros/s/AKfycbxbbCfgWEy31UBQp8oZJUk04cIMAjq4orwq9WZVbiD9ipEsBpHz/exec",

      online_survey_entries: [],
      local_survey_entries: [],
      local_survey_entries_copy: [],
      connection_fail: false,
      cloud_save_error: false,
      save_cloud_button_loading: false,

      error: ""
    };
  },
  computed: {
    entries_saved_in_cloud: function() {
      let result = false;
      result = this.local_survey_entries.every(entry => entry.cloud === true);
      return result;
    }
  },

  mounted() {
    if (localStorage.getItem("local_survey_entries") != null) {
      this.local_survey_entries = JSON.parse(
        localStorage.getItem("local_survey_entries")
      );
      this.local_survey_entries_copy = JSON.parse(
        localStorage.getItem("local_survey_entries")
      );
    } else {
      this.local_survey_entries = [];
    }

    this.get_data();
  },
  methods: {
    map_response_rows_to_obj(data) {
      let result = [];
      data.map((entry, index) => {
        let tmp_arr = {};

        data[0].forEach((element, element_no) => {
          tmp_arr[element] = entry[element_no];
        });

        tmp_arr["cloud"] = true;
        if (index != 0) {
          result.push(tmp_arr);
        }
      });
      // result = [];
      return result;
    },
    upload_local_data() {
      // let self = this;
      if (this.local_survey_entries_copy.length > 0) {
        this.save_cloud_button_loading = true;
        this.local_survey_entries_copy.forEach(entry => {
          let tmp_form_data = new FormData();
          for (var key in entry) {
            tmp_form_data.append(key, entry[key]);
          }

          fetch(this.scriptUrl, {
            method: "POST",
            body: tmp_form_data
          })
            .then(response => {
              if (response.status == 200) {
                entry.timestamp = Date.now();
                entry.cloud = true;
                this.online_survey_entries.push(entry);

                this.local_survey_entries = this.local_survey_entries.filter(
                  item => item.filled_date !== entry.filled_date
                );

                localStorage.setItem(
                  "local_survey_entries",
                  JSON.stringify(this.local_survey_entries)
                );
              } else {
                this.cloud_save_error = false;
              }
            })
            .catch(() => {
              this.cloud_save_error = true;
            });
        });
      }

      setTimeout(() => {
        this.save_cloud_button_loading = false;
      }, 5000);
    },

    get_data() {
      var self = this;
      self.loading = true;
      fetch(this.scriptUrl)
        .then(function(response) {
          console.log();
          if (response.status == 200) {
            self.upload_local_data();
            self.connection_fail = false;
            return response.json();
          } else {
            self.connection_fail = true;
            self.error = response;
            return {};
          }
        })
        .then(function(data) {
          if (data.rows) {
            self.online_survey_entries = self.map_response_rows_to_obj(
              data.rows
            );
            self.loading = false;
          } else {
            self.online_survey_entries = [[]];
          }
        })

        .catch(response => {
          self.loading = false;
          self.connection_fail = true;
          self.error = response;
        });
    }
  }
};
</script>

<style scoped></style>

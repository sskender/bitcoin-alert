<template>
  <div class="elevation-1">
    <v-toolbar flat color="white">
      <v-toolbar-title>Active Alerts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Alert</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-select :items="available_coins" v-model="edited_item.coin_name" label="Coin"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="edited_item.target_price" label="Target Price"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="alerts" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.coin_name }}</td>
        <td class="text-xs-right">{{ props.item.target_price }}</td>
        <td class="text-xs-right">{{ props.item.current_val }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "DashDisplayTable",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Coin Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Target Price", value: "target_price", align: "right" },
      { text: "Current Coin Value", value: "current_val", align: "right" }
    ],
    desserts: [],
    editedIndex: -1,
    edited_item: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    available_coins: ["BTC", "ETH"]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Coin" : "Edit Coin";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.alerts = [
        {
          coin_name: "BTC",
          target_price: 250,
          current_val: 150
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.alerts.indexOf(item);
      this.edited_item = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.alerts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.edited_item = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.alerts[this.editedIndex], this.edited_item);
      } else {
        this.alerts.push(this.edited_item);
      }
      this.close();
    }
  }
};
</script>

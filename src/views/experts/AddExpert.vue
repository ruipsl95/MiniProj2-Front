<template>
  <!-- Add Expert Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Expert" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Escreve o nome do expert"
                required
              />
            </div>

            <!-- GRUPO -->
            <div class="form-group">
              <select
                id="sltGroup"
                class="form-control form-control-lg"
                v-model="group"
                required
              >
                <option value>-- SELECIONA GRUPO --</option>
                <option value="Grupo A">Grupo A</option>
                <option value="Grupo B">Grupo B</option>
                <option value="Grupo C">Grupo C</option>
              </select>
            </div>

            <!-- DESCRIÇÃO -->
            <div class="form-group">
              <textarea
                v-model="desc"
                class="form-control form-control-lg"
                id="txtDesc"
                rows="4"
                placeholder="Escreve a descrição do expert"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>

            <router-link
              :to="{ name: 'manageExperts' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      group: "",
      desc: ""
    };
  },
  computed: {
    ...mapGetters("expert", ["getMessage"])
  },
  methods: {
    add() {
      const payload = {
        name: this.name,
        group: this.group,
        desc: this.desc
      };

      this.$store.dispatch(`expert/${ADD_EXPERT}`, payload).then(
        () => {
          this.$alert(this.getMessage, "Expert adicionado!", "success");
          router.push({ name: "manageExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>

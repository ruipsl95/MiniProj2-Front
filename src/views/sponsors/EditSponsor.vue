<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Sponsor" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="sponsor.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>

            <!-- ANIMAL -->
            <div class="form-group">
              <select
                id="sltAnimal"
                class="form-control form-control-lg"
                v-model="sponsor.animal"
                required
              >
                <option value>-- SELECIONA ANIMAL --</option>
                <option value="cao">CÃO</option>
                <option value="gato">GATO</option>
                <option value="cobra">COBRA</option>
                <option value="rato">RATO</option>
                <option value="canario">CANÁRIO</option>
              </select>
            </div>

            <!-- ENDEREÇO -->
            <div class="form-group">
              <input
                v-model="sponsor.endereco"
                type="text"
                class="form-control form-control-lg"
                id="txtEndereco"
                placeholder="escreve endereço"
                required
              />
            </div>

            <!-- CONTACTO -->
            <div class="form-group">
              <input
                v-model="sponsor.contact"
                type="tel"
                class="form-control form-control-lg"
                id="txtContact"
                placeholder="escreve contacto"
                required
              />
            </div>

            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>

            <router-link
              :to="{ name: 'listSponsors' }"
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
import { EDIT_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      sponsor: {}
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsorsById", "getMessage"])
  },
  methods: {
    update() {
      this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, this.sponsor).then(
        () => {
          this.$alert(this.getMessage, "Sponsor atualizado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.sponsor = this.getSponsorsById(this.$route.params.sponsorId);
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>

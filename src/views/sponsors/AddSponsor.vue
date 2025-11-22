<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Sponsor" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
              <select id="sltAnimal" class="form-control form-control-lg" v-model="animal" required>
                <option value>-- SELECIONA ANIMAL --</option>
                <option value="cao">CÃO</option>
                <option value="gato">GATO</option>
                <option value="cobra">COBRA</option>
                <option value="rato">RATO</option>
                <option value="canario">CANÁRIO</option>
              </select>
            </div>
            <div class="form-group">
              <input
                v-model="endereco"
                type="text"
                class="form-control form-control-lg"
                id="txtEndereco"
                placeholder="escreve endereço"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="contact"
                type="tel"
                class="form-control form-control-lg"
                id="txtContact"
                placeholder="escreve contacto"
                required
              />
            </div>
            <div class="form-group">
             <input
                @change="handleFileUpload"
                type="file"
                class="form-control form-control-lg"
                id="fileUpload" 
                required
            />
            </div>
            
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i>  ADICIONAR</button>
            <router-link
              :to="{name: 'listAnimals'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            ><i class="fas fa-window-close"></i>  CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      animal: "",
      endereco: "", // Adicionado
      contact: "",  // Adicionado (para separar do endereço)
      photo: null  // Armazena o ficheiro binário
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getMessage"])
  },
  methods: {
    // 1. Captura o ficheiro quando o utilizador o seleciona
    handleFileUpload(event) {
      this.photo = event.target.files[0];
    },

    // 2. Envia os dados
    add() {
      // Criar um objecto FormData para suportar envio de ficheiros
      const formData = new FormData();
      
      formData.append('name', this.name);
      formData.append('animal', this.animal);
      formData.append('endereco', this.endereco);
      formData.append('contact', this.contact);
      
      // Adiciona a foto apenas se existir
      if (this.photo) {
        formData.append('photo', this.photo); 
      }
      
      
      // Despacha a acção enviando o formData em vez de this.$data
      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, formData).then(
        () => {
          this.$alert(this.getMessage, "Sponsor adicionado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
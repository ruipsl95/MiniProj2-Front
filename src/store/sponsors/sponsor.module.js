import sponsorService from "@/api/sponsor.service";  

import { 
  // Actions
  FETCH_SPONSORS, 
  ADD_SPONSOR, 
  EDIT_SPONSOR, 
  REMOVE_SPONSOR, 
  // Mutations
  SET_SPONSORS, 
  SET_MESSAGE,
  UPDATE_LIKES 
} from "./sponsor.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorsById: state => id => state.sponsors.find(sponsor => sponsor._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_SPONSORS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      sponsorService.getSponsors(rootState.auth.token)
        .then(
          res => {
            // depende da tua API: se usas messages, provavelmente vem em res.data.body
            // aqui estou a assumir que o service já devolve res.data.message
            commit(SET_SPONSORS, res.body);
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  },

  [ADD_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.addSponsor(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O sponsor ${res.body.name} foi adicionado com sucesso!`);
            resolve(res);
          }, 
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  },

  [EDIT_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.editSponsor(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O sponsor ${res.body.name} foi atualizado com sucesso!`);
            resolve(res);
          }, 
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  },

  [REMOVE_SPONSOR]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      sponsorService.removeSponsor(rootState.auth.token, id)
        .then(
          res => {
            commit(SET_MESSAGE, `O sponsor foi removido com sucesso!`);
            resolve(res);
          }, 
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  }
};

const mutations = {
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  },

  // Se não usares likes para sponsors, podes apagar isto
  [UPDATE_LIKES]: (state, payload) => {
    state.sponsors.forEach(sponsor => {
      if (sponsor._id === payload.sponsorId) {
        if (!sponsor.evaluation) sponsor.evaluation = [];
        sponsor.evaluation.push(payload.userId);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

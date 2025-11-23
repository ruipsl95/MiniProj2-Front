import API_URL from './config.js'

export const expertService = {
  async getExperts(token) {
    const response = await fetch(`${API_URL}/experts`, {
      method: "GET",
      headers: {
        'Authorization': token
      }
    });

    // Se o backend devolver 204 (NoSponsors), não há body para fazer json()
    if (response.status === 204) {
      return { body: [] };
    }

    if (response.ok) {
      return await response.json(); // { code, http, type, body: [...] }
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async addExpert(token, payload) {
    const options = {
      method: "POST",
      headers: {
        'Authorization': token
      },
      body: payload
    };

    // Se NÃO vier FormData, trata como JSON (caso uses noutro lado)
    if (!(payload instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${API_URL}/experts`, options);

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async editExpert(token, payload) {
    const options = {
      method: "PUT",
      headers: {
        'Authorization': token
      },
      body: payload
    };

    // Permitir também update sem ficheiro (JSON normal)
    if (!(payload instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${API_URL}/experts/${payload._id}`, options);

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },
  
  async removeSponsor(token, id) {
    const response = await fetch(`${API_URL}/experts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  }
};

function handleResponses(code) {
  let message = "";
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!";
      break;
    default:
      message = "Mensagem desconhecida";
      break;
  }
  return message;
}

export default expertService;

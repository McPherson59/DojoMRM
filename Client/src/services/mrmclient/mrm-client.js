const configuration = require('./mrm-configuration.json');

export class MrmClientService {
  async getEmissionConsommationVoiture(carburant, consommation) {
    const body =
      '{"vehicule":{ "carburant":"' +
      carburant.toUpperCase() +
      '", "consommation":' +
      consommation +
      ' } }';
    console.log(body);
    // BODY
    //{
    //"vehicule":{
    //      "carburant":"GASOIL",
    //      "consommation":20
    //  }
    // }

    // TARGET
    //return await this.performConnection(body, 'apiConsommationVoiture');

    return '{"emissionEnergetique": {"emission": 53.4,"energie": 214.8}}';
  }

  async getTrajet(carburant, typeVehicule, distance, trajets) {
    const body =
      '{"vehicule":{ "carburant":"' +
      carburant.toUpperCase() +
      '", "type":"' +
      typeVehicule +
      '", "kilometres":' +
      distance +
      ', "trajets":' +
      trajets +
      ' } }';
    console.log(body);

    // BODY
    //   {
    //     "vehicule":{
    //         "carburant":"ESSENCE",
    //         "type":"A",
    //         "kilometres":20,
    //         "trajets":[
    //             {
    //                 "type":"VILLE",
    //                 "pourcentage":50
    //             }
    //        ]
    //     }
    // }

    // TARGET
    //return await this.performConnection(body, 'apiConsommationVoiture');

    return '{"emissionEnergetique": {"emission": 1.656,"energie": 6.9336}}';
  }

  async getComparaison(emission, item) {
    const body =
      '{"emissionEnergetique":{"emission":' +
      emission +
      ',"energie":null},"item" : {"nom":"' +
      item +
      '"}}';
    console.log(body);

    // BODY  = {
    //	"emissionEnergetique":{
    //	"emission":2.714,
    //	"energie":null
    //	},
    //"item" : {
    //"nom":"Vol_PNY"
    //}
    //}

    // TARGET
    //return await this.performConnection(body, 'apiConsommationVoiture');

    return '{"result": 0.0054}';
  }

  async performConnection(Body, apiName) {
    const url = this.getUrl(apiName);

    await fetch(url, {
      method: 'POST',
      body: Body,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,UPDATE,OPTIONS',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return 'error';
      }
    });
  }

  getUrl(apiName) {
    var uri;
    switch (apiName) {
      case 'apiConsommationVoiture':
        uri = configuration.apiConsommationVoiture;
      case 'apiTrajetSimple':
        uri = configuration.apiConsommationVoiture;
      case 'apiTrajetMixte':
        uri = configuration.apiConsommationVoiture;
      case 'apiComparaison':
        uri = configuration.apiConsommationVoiture;
    }

    const url = configuration.url + uri;
    return url;
  }
}

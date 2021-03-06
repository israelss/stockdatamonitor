const TOKEN = `qQL643bmhPHv7Z7eCdyUvZWkVnv8ruY0Ba7adV5O`;
const PARAMETERS = `key_by_date=true&limit=10`;

const fetchCompany = (symbol) => {
  const REALTIME = `https://api.stockdata.org/v1/data/quote?symbols=${ symbol }&api_token=${ TOKEN }`;
  fetch(REALTIME)
    .then((response) => response.json())
    .then((data) => {
      const name = data.data[0].name;
      // const name = REALTIME.data[0].name;
      const companySpan = document.getElementById('company');
      companySpan.innerText = name;
    });
};

const fetchValues = (symbol) => {

  const date = `date-from=${ new Date.now() }`;
  const INTRADAY = `https://api.stockdata.org/v1/data/intraday?symbols=${ symbol }&api_token=${ TOKEN }&${ PARAMETERS }&${ date }`;

  fetch(INTRADAY)
    .then((response) => response.json())
    .then((response) => {
      const data = Object.values(response.data)
        .filter((_, index) => index % 60 === 0)
        .reduce((arrayObj, curr) => {
          if (!arrayObj['volume']) arrayObj['volume'] = [];
          if (!arrayObj['high']) arrayObj['high'] = [];
          if (!arrayObj['low']) arrayObj['low'] = [];
          arrayObj['volume'].push(curr[0].data.volume);
          arrayObj['high'].push(curr[0].data.high);
          arrayObj['low'].push(curr[0].data.low);
          return arrayObj;
        }, {});

      const labels = Object.keys(response.data)
        .reverse()
        .filter((_, index) => index % 60 === 0)
        .map((label) => label.match(/(?<minuto>\d{2}:\d{2}:\d{2})/).groups.minuto);

      paintGraph({ data, labels, graphId: 'volumeChart', dataKeyArray: ['volume'] });
      paintGraph({ data, labels, graphId: 'minmaxChart', dataKeyArray: ['high', 'low'] });
    });
};
const fetchData = (symbol = 'AMZN') => {
  fetchCompany(symbol);
  fetchValues(symbol);
};

window.onload = () => {
  fetchData();
  const inputButton = document.getElementById('input-button');
  inputButton.addEventListener('click', () => {
    const inputSymbol = document.getElementById('input-symbol');
    fetchData(inputSymbol.value);
  });
};

// 2 - Estudar a API
// 2.1 - 

// 5 - Organizar
// 5.1 - Refazer usando React

// 1 - Implementar busca pelo per??odo especificado at?? agora
// 1.1 - Input de data (html)
// 1.2 - Implementar a l??gica (js)
// 1.3 - 

// 3 - Estilizar (css)

// 4 - Autentica????o
// 4.1 - Form de login - pegar o token
// 4.2 - Armazenar o token
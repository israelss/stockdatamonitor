const TOKEN = `qr7awb4vb1CCx9FTsdKoii7672gi3CKapD4GRxV1`;
const PARAMETERS = `date_from=2021-10-26&key_by_date=true&limit=10`;

const fetchCompany = (symbol) => {
  const REALTIME = `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${TOKEN}`;
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
  const INTRADAY = `https://api.stockdata.org/v1/data/intraday?symbols=${symbol}&api_token=${TOKEN}&${PARAMETERS}`;

  fetch(INTRADAY)
    .then((response) => response.json())
    .then((response) => {
      const data = Object.values(response.data)
        .filter((_, index) => index % 10 === 0)
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
        .filter((_, index) => index % 10 === 0)
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
};

const intradayJSON = require('./intraday.js');
const realtimeJSON = require('./realtime.js')
const TOKEN = `qr7awb4vb1CCx9FTsdKoii7672gi3CKapD4GRxV1`

const ENDPOINTS = {
  REALTIME: `https://api.stockdata.org/v1/data/quote?symbols=AMZN&api_token=${TOKEN}`,
  INTRADAY: `https://api.stockdata.org/v1/data/intraday?symbols=AMZN&date_from=2021-10-26&key_by_date=true&limit=10&api_token=${TOKEN}`,
};

const TIME_IN_MILLISECONDS = 200;

const fetchSimulator = (url) => {
  const validUrl = Object.values(ENDPOINTS).includes(url);
  return Promise.resolve({
    status: validUrl ? 200 : 404,
    ok: validUrl,
    json: () => new Promise((resolve) => {
      setTimeout(() => {
        if (url === ENDPOINTS.REALTIME) {
          return resolve(realtimeJSON);
        }

        if (url === ENDPOINTS.INTRADAY) {
          return resolve(intradayJSON);
        }

        return resolve({ results: [] });
      }, TIME_IN_MILLISECONDS);
    }),
  });
};

module.exports = fetchSimulator;

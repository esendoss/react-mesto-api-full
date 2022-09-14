// разрешенные кросс-доменные запросы
const allowedCors = [
  'https://anotherdomain.esendoss.students.nomoredomains.sbs',
  'http://anotherdomain.esendoss.students.nomoredomains.sbs',
  'https://esendoss.students.nomoredomains.sbs',
  'http://esendoss.students.nomoredomains.sbs',
  'http://localhost:3010',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const requestMethod = req.headers['access-control-request-method'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.header('Access-Control-Allow-Methods', requestMethod);
      res.status(200).send();
      return;
    }
  }
  next();
};

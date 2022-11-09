module.exports.created = 200;
module.exports.URL_REG = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.))(:\d{2,5})?((\/.+)+)?\/?#?/;
module.exports.allowedCors = [
  'https://gaidukevich.mesto.nomoredomains.icu',
  'http://gaidukevich.mesto.nomoredomains.icu',
  'https://localhost:3000',
  'http://localhost:3000',
];
module.exports.DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

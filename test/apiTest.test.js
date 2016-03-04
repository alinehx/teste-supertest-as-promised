'use strict';

var request = require('supertest-as-promised'),
  assert = require('assert');

//sugestão colocar em uma variavel de ambiente do node
request = request('api.openweathermap.org/data/2.5/');

describe('Testando api de previsao', function () {
  var teste = function(recebido, esperado, mensagemErro) {
    assert.strictEqual(recebido, esperado, mensagemErro);
  };
  it('Deve retornar cidade Sao Paulo e sua respectiva previsao do tempo', function (done) {
    request
      .get('weather?q=Sao Paulo&APPID=356a5565c3e6da3e7878d37197e4b595')
      .expect(200)
      .then( function(res) {        
        var retorno = res.body;
        teste(retorno.coord.lon, -46.64, 'Longitude não é igual a -46.64');        
        assert.strictEqual(retorno.coord.lon, -46.64, 'Longitude não é igual a -46.64');
        assert.strictEqual(retorno.coord.lat, -23.55, 'Latitude não é igual a -23.55');
        assert.strictEqual(retorno.sys.country, 'BR', 'Pais não é igual a BR');        
        assert.strictEqual(retorno.name, 'Sao Paulo', 'Cidade não é igual a Sao Paulo');
        done();
      });
  });
  it('Deve retornar erro 404 - cidade não encontrada', function (done) {
    request
    .get('weather?q=AlineHaxkarLavorato&APPID=356a5565c3e6da3e7878d37197e4b595')
    .expect(200)
    .then( function(res) {
      assert.strictEqual(res.body.cod, '404', 'Codigo de retorno não é 404');
      assert.strictEqual(res.body.message, 'Error: Not found city', 'Mensagem não é igual a Error: Not found city');

      
      done();
    });
  });
});
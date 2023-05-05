var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    console.log(req.url);
    // Verifica se irá chamar o botão calcular IMC; se não, então ir para tela principal
    if (req.url.includes('calcularIMC') ) {

        // Recupera/desmebra os valores da URL (peso / altura)
        var q = url.parse(req.url, true).query;
        console.log(q);
        
        let altura = q.altura;
        let peso = q.peso;

        // Calcula o valor do IMC
        let imc = peso / ( altura * altura ) ;
        imc = imc.toFixed(2);

        // Processa o tipo do IMC
        let texto = '';
        if(imc < 18.50){
            texto = 'Magreza';
        }else if( imc >= 18.50 && imc < 24.90){
            texto = 'Normal';
        }else if( imc >= 24.90 && imc < 30){
            texto = 'Sobrepeso';
        }else{
            texto = 'Obesidade';
        }

        res.write('IMC: ' + imc + ' Status: ' + texto + '!');

        return res.end();

    } else {
        
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Atividade 01 ( Calculo do IMC )</h1>');
      res.write('<form action="calcularIMC">');
      res.write('<label for="peso">Peso:</label>');
      res.write('<input type="number" id="peso" name="peso" step="0.01" required><br><br>');
      res.write('<label for="altura">Altura:</label>');
      res.write('<input type="number" id="altura" name="altura" step="0.01" required><br><br>');
      res.write('<input type="submit">');
      res.write('</form>');

      return res.end();

    }
}).listen(8080);

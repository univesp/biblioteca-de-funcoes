$(document).ready(function(){

  var btnFuncao = $(".botao");
  var btnFechar = $(".btn-fechar");
  var btnOriginal = $(".btn-original");
  var btnChart1 = $(".item.n1 .btn-operacao");
  var btnChart2 = $(".item.n2 .btn-operacao");
  var btnChart3 = $(".item.n3 .btn-operacao");

  // Gráfico clicado expande item e oculta os demais;

  btnFuncao.on("click", function(){
    var parent = $(this).parent(".item");
    parent.addClass("expandido");
    parent.siblings().hide();
  });

  // Botão Fechar clicado minimiza item e reexibe os demais;

  btnFechar.on("click", function(){
    var parent = $(this).parent(".item");
    parent.removeClass("expandido");
    parent.siblings().show();
  })

  /////// GOOGLE CHARTS ////////

  google.charts.load('current', {'packages':['corechart']});

  google.charts.setOnLoadCallback(drawChart1);
  google.charts.setOnLoadCallback(drawChart2);
  google.charts.setOnLoadCallback(drawChart3);

  google.visualization.events.removeAllListeners(object)

  // FUNÇÕES

    // 1. Seno
    // 2. x^3 - 2x^2 - x + 2
    // 3. ln(x)
    // 4+ Adicione uma nova função e as regras no 'case' correspondente.

    // geraData monta coordenadas dos gráficos originais.

    function geraData(numero){
      var array = [['x', 'y']];

      // Tratamento dos intervalos

      if(numero == 1){
        inic = -2 * Math.PI;
        fim  = 2 * Math.PI;
      } else if(numero == 2){
        inic = -5;
        fim  = 5;
      } else if(numero == 3){
        inic = 0.01;
        fim  = 6;
      }

      // Incremento

      incremento = (fim - inic)/100;
      for(i = 0; i < 100; i++){
        termo = inic + i*(incremento);

        if(numero == 1){
          array.push([termo.toFixed(5), Math.sin(termo).toFixed(5)]);
        } else if(numero == 2){
          valor = Math.pow(termo,3);
          valor = valor - 2*(Math.pow(termo,2))
          valor = valor - termo + 2
          valor = valor.toFixed(5)
          array.push([termo.toFixed(5), valor ]);
        } else if(numero == 3){
          array.push([termo.toFixed(5), Math.log(termo).toFixed(5)]);
        }

        i++;
      }

      // Tratamento para Google Charts

      array[1][0] = parseFloat(array[1][0]);
      array[1][1] = parseFloat(array[1][1]);

      // Retorna array

      return array;
    }

  // OPERAÇÕES

    // 1.
    // 2.
    // 3.

    // geraDataOperacao monta coordenadas dos gráficos transformados por operações.

    function geraDataOperacao(array, numero){
      var arrayOperacao = [['x', 'y']];

      if(numero == 1){
        var arrayOperacao = [['x', 'y'],[1,2],[3,4]];
      } else if(numero == 2){
        var arrayOperacao = [['x', 'y'],[10,30],[20,40]];
      } else if(numero == 3){
        var arrayOperacao = [['x', 'y'],[23,32],[41,14]];
      }

      // Tratamento para Google Charts

      array[1][0] = parseFloat(array[1][0]);
      array[1][1] = parseFloat(array[1][1]);

      // Retorna arrayOperacao

      return arrayOperacao;
    }


// GRÁFICOS

  // Gráfico 1

  function drawChart1() {

    var optionsCollapsed = {
      curveType: 'function',
      legend: 'none',
      colors: ['black','#000000'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      hAxis: {
        textPosition: 'none',
        drawAxisLineEnabled: false
      },
      vAxis: {
        textPosition: 'none',
      },
      animation:{
        duration: 500,
        easing: 'out',
        startup: 'true',
      },
    };

    var optionsExtended = {
      curveType: 'function',
      legend: 'none', // retira legendas
      colors: ['black','#000000'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      animation: {
        duration: 500,
        easing: 'out',
        startup: 'true',
      },
      chartArea:{
        left: 0,
        right: 0,
      },
    };

    // Gera gráfico original

    var chart1Original = geraData(1);
    var data = google.visualization.arrayToDataTable(chart1Original);
    var options = optionsCollapsed;
    var chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
    chart1.draw(data, options);

    // No clique dos botões de operação

    btnChart1.on("click", function(){
      // Operação 1
      if($(this).hasClass("operacao1")){
        var chart1Operacao1 = geraDataOperacao(chart1Original, 1);
        var data = google.visualization.arrayToDataTable(chart1Operacao1);
        var options = optionsExtended;
        var chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
        chart1.draw(data, options);
      // Operação 2
      } else if($(this).hasClass("operacao2")){
        var chart1Operacao2 = geraDataOperacao(chart1Original, 2);
        var data = google.visualization.arrayToDataTable(chart1Operacao2);
        var options = optionsExtended;
        var chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
        chart1.draw(data, options);
      // Operação 3
      } else if($(this).hasClass("operacao3")){
        var chart1Operacao3 = geraDataOperacao(chart1Original, 3);
        var data = google.visualization.arrayToDataTable(chart1Operacao3);
        var options = optionsExtended;
        var chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
        chart1.draw(data, options);
      } else if($(this).hasClass("original")){
        var chart1Original = geraData(1);
        var data = google.visualization.arrayToDataTable(chart1Original);
        var options = optionsExtended;
        var chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
        chart1.draw(data, options);
      }
    });

    // Clique no botão fechar ou 'voltar para o original'

    $(".btn-fechar").on("click", function(){
      var chart1Original = geraData(1);
      var data = google.visualization.arrayToDataTable(chart1Original);
      var options = optionsCollapsed;
      var chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
      chart1.draw(data, options);
    })

  }

  // Gráfico 2

  function drawChart2() {

    var optionsCollapsed = {
      curveType: 'function',
      legend: 'none',
      colors: ['black','#000000'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      hAxis: {
        textPosition: 'none',
        drawAxisLineEnabled: false
      },
      vAxis: {
        textPosition: 'none',
      },
      animation:{
        duration: 500,
        easing: 'out',
        startup: 'true',
      },
    };

    var optionsExtended = {
      curveType: 'function',
      colors: ['black','#000000'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      hAxis: {
        title: '',
        textPosition: 'left',
        drawAxisLineEnabled: true,
      },
      vAxis: {
        title: '',
        textPosition: 'left',
      },
      animation: {
        duration: 500,
        easing: 'out',
        startup: 'true',
      },
      chartArea:{
        left: 0,
        right: 0,
      },
    };

    // Gera gráfico original

    var chart2Original = geraData(2);
    var data = google.visualization.arrayToDataTable(chart2Original);
    var options = optionsCollapsed;
    var chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
    chart2.draw(data, options);

    // No clique dos botões de operação

    btnChart2.on("click", function(){
      // Operação 1
      if($(this).hasClass("operacao1")){
        var chart2Operacao1 = geraDataOperacao(chart2Original, 1);
        var data = google.visualization.arrayToDataTable(chart2Operacao1);
        var options = optionsExtended;
        var chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
        chart2.draw(data, options);
      // Operação 2
      } else if($(this).hasClass("operacao2")){
        var chart2Operacao2 = geraDataOperacao(chart2Original, 2);
        var data = google.visualization.arrayToDataTable(chart2Operacao2);
        var options = optionsExtended;
        var chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
        chart2.draw(data, options);
      // Operação 3
      } else if($(this).hasClass("operacao3")){
        var chart2Operacao3 = geraDataOperacao(chart2Original, 3);
        var data = google.visualization.arrayToDataTable(chart2Operacao3);
        var options = optionsExtended;
        var chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
        chart2.draw(data, options);
      }
    });

    // Clique no botão fechar ou 'voltar para o original'

    $(".btn-fechar, .original").on("click", function(){
      var chart2Original = geraData(2);
      var data = google.visualization.arrayToDataTable(chart2Original);
      var options = optionsCollapsed;
      var chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
      chart2.draw(data, options);
    })

  }

  // Gráfico 3

  function drawChart3() {

    var optionsCollapsed = {
      curveType: 'function',
      legend: 'none',
      colors: ['black','#000000'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      hAxis: {
        textPosition: 'none',
        drawAxisLineEnabled: false
      },
      vAxis: {
        textPosition: 'none',
      },
      animation:{
        duration: 500,
        easing: 'out',
        startup: 'true'
      },
    };

    var optionsExtended = {
      curveType: 'function',
      legend: 'none', // retira legendas
      colors: ['black','#000000'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      animation: {
        duration: 500,
        easing: 'out',
        startup: 'true',
      },
      chartArea:{
        left: 0,
        right: 0,
      },
    };

    // Gera gráfico original

    var chart3Original = geraData(3);
    var data = google.visualization.arrayToDataTable(chart3Original);
    var options = optionsCollapsed;
    var chart3 = new google.visualization.LineChart(document.getElementById('chart3'));
    chart3.draw(data, options);

    // No clique dos botões de operação

    btnChart3.on("click", function(){
      // Operação 1
      if($(this).hasClass("operacao1")){
        var chart3Operacao1 = geraDataOperacao(chart3Original, 1);
        var data = google.visualization.arrayToDataTable(chart3Operacao1);
        var options = optionsExtended;
        var chart3 = new google.visualization.LineChart(document.getElementById('chart3'));
        chart3.draw(data, options);
      // Operação 2
      } else if($(this).hasClass("operacao2")){
        var chart3Operacao2 = geraDataOperacao(chart3Original, 2);
        var data = google.visualization.arrayToDataTable(chart3Operacao2);
        var options = optionsExtended;
        var chart3 = new google.visualization.LineChart(document.getElementById('chart3'));
        chart3.draw(data, options);
      // Operação 3
      } else if($(this).hasClass("operacao3")){
        var chart3Operacao3 = geraDataOperacao(chart3Original, 3);
        var data = google.visualization.arrayToDataTable(chart3Operacao3);
        var options = optionsExtended;
        var chart3 = new google.visualization.LineChart(document.getElementById('chart3'));
        chart3.draw(data, options);
      }
    });

    // Clique no botão fechar ou 'voltar para o original'

    $(".btn-fechar, .original").on("click", function(){
      var chart3Original = geraData(3);
      var data = google.visualization.arrayToDataTable(chart3Original);
      var options = optionsCollapsed;
      var chart3 = new google.visualization.LineChart(document.getElementById('chart3'));
      chart3.draw(data, options);
    })

  };

})

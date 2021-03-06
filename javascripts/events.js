$(document).ready(function(){

  // adicionarFuncao() adiciona novos gráficos originais (formato JSON) na biblioteca.
  // Forneça um valor para cada propriedade abaixo relacionada.

  function adicionarFuncao(nome, id, dadosOriginaisFuncao, hAxis, vAxis){

    biblioteca.funcao.push({

      nome: nome, // string
      id: id, // string
      dadosOriginaisFuncao: dadosOriginaisFuncao, // function
      hAxis: hAxis, // array
	  vAxis: vAxis, // array

    });

  }

  var biblioteca = { funcao: [] };


  adicionarFuncao(

    "identidade", // nome ( string )
    "chart1", // id ( string )
    function(dadosOriginaisArray, termo){ // função original ( function )
      dadosOriginaisArray.push([ termo, termo ]);
    },
    [-3, 3], // hAxis ( array [ inicio, fim ] )
	[-3, 3], // vAxis ( array [ inicio, fim ] )

  );


  adicionarFuncao(

    "parábola", // nome ( string )
    "chart2", // id ( string )
    function(dadosOriginaisArray, termo){ // função original ( function )
      dadosOriginaisArray.push([ termo, Math.pow(termo,2) -1 ]);
    },
    [-3, 3], // hAxis ( array [ inicio, fim ] )
	[-3, 3], // vAxis ( array [ inicio, fim ] )

  );


  adicionarFuncao(

    "polinômio", // nome ( string )
    "chart3", // id ( string )
    function(dadosOriginaisArray, termo){ // função original ( function )
      valor = Math.pow( termo, 3 );
      valor = valor - 2 * ( Math.pow ( termo, 2 ) )
      valor = valor - termo + 2
      valor = ( valor.toFixed(5) );
      dadosOriginaisArray.push([ termo.toFixed(5), valor ]);
    },
    [-3, 3], // hAxis ( array [ inicio, fim ] )
	[-3, 3], // vAxis ( array [ inicio, fim ] )

  );


  adicionarFuncao(

    "seno", // nome ( string )
    "chart4", // id ( string )
    function(dadosOriginaisArray, termo){ // função original ( function )
      dadosOriginaisArray.push([ termo.toFixed(5), Math.sin(termo.toFixed(5)) ]);
    },
    [-2 * Math.PI, 2 * Math.PI], // hAxis ( array [ inicio, fim ] )
	[-1.5, 1.5], // vAxis ( array [ inicio, fim ] )

  );


  adicionarFuncao(

    "x * seno", // nome ( string )
    "chart5", // id ( string )
    function(dadosOriginaisArray, termo){ // função original ( function )
      dadosOriginaisArray.push([ termo, termo*(Math.sin(termo)) ]);
    },
    [-10, 10], // hAxis ( array [ inicio, fim ] )
	[-10, 10], // vAxis ( array [ inicio, fim ] )

  );

  adicionarFuncao(

    "sen(x^3)", // nome ( string )
    "chart6", // id ( string )
    function(dadosOriginaisArray, termo){ // função original ( function )
      dadosOriginaisArray.push([ termo, Math.sin(Math.pow(termo,3)) ]);
    },
    [-3, 3], // hAxis ( array [ inicio, fim ] )
	[-3, 3], // vAxis ( array [ inicio, fim ] )

  );

  // adicionarOperacao() adiciona novas operações para os gráficos originais.
  // Forneça um valor para cada propriedade abaixo relacionada.

  function adicionarOperacao(nome, descricao, id, dadosOperacaoFuncao){

    operacoes.item.push({

      nome: nome, // string
      descricao: descricao, // string
      id: id, // string
      dadosOperacaoFuncao: dadosOperacaoFuncao, // function

    });

  }


  var operacoes = { item: [] }

  adicionarOperacao(

    "original", // nome ( string )
    "Os pontos originais da função.", // descrição ( string )
    ".original", // id ( string )
    function(i, dadosOriginaisArray, dadosOperacaoArray){ // função (function)
      for(j = 1; j <= nPontos - 1; j++){
        dadosOperacaoArray.push([ dadosOriginaisArray[j][0], dadosOriginaisArray[j][1] ]);
      };
    },

  );

  adicionarOperacao(

    "módulo", // nome ( string )
    "Na operação MÓDULO, os valores negativos do eixo Y tornam-se positivos (se não houver valores negativos, o gráfico permanece o mesmo).", // descrição ( string )
    ".operacao1", // id ( string )
    function(i, dadosOriginaisArray, dadosOperacaoArray){ // função (function)
      for(j = 1; j <= nPontos - 1; j++){
        if(dadosOriginaisArray[j][1] < 0){
          dadosOperacaoArray.push([ dadosOriginaisArray[j][0], -1 * dadosOriginaisArray[j][1] ]);
        } else {
          dadosOperacaoArray.push([ dadosOriginaisArray[j][0], dadosOriginaisArray[j][1] ]);
        }
      };
    },

  );

  adicionarOperacao(

    "constante", // nome ( string )
    "Na operação SOMA DE UMA CONSTANTE, o gráfico é deslocado para cima ou para baixo de acordo com valor da constante.", // descrição ( string )
    ".operacao2", // id ( string )
    function(i, dadosOriginaisArray, dadosOperacaoArray, funcao){ // função (function)
      constante = funcao.vAxis[1]/4;
      for(j = 1; j <= nPontos - 1; j++){
        x = parseFloat(dadosOriginaisArray[j][0]);
        y = parseFloat(dadosOriginaisArray[j][1]);
        y = y + constante;
        dadosOperacaoArray.push([x, y]);
      };
    },

  );


  adicionarOperacao(

    "f(|x|)", // nome ( string )
    "Na operação F DO MÓDULO, os pontos do gráfico que estão nos quadrantes à direita do eixo Y são espelhados nos quadrantes à esquerda, tornando a função par (caso a função seja originalmente par, o gráfico permanece o mesmo).", // descrição ( string )
    ".operacao3", // id ( string )
    function(i, dadosOriginaisArray, dadosOperacaoArray){ // função (function)
       for(j = 1; j <= nPontos - 1; j++){
         x = parseFloat(dadosOriginaisArray[j][0]);
         y = parseFloat(dadosOriginaisArray[j][1]);
  		   if(x < 0){
           y = parseFloat(dadosOriginaisArray[nPontos-j][1]);
         }
         dadosOperacaoArray.push([x, y]);
       };
    },

  );


  // Carrega Google charts

  google.charts.load('current', {'packages':['corechart']});

  // Roda funções e operações para cada item da biblioteca

  var nPontos = 100;

  jQuery.each(biblioteca.funcao, function(i, val){

    // Cálcula incremento e valores das coordenadas

    var funcao = biblioteca.funcao[i]

    intervalo = funcao.hAxis;
    inicio = intervalo[0];
    fim = intervalo[1];

    funcao["incremento"] = Math.abs(inicio - fim) / nPontos;
    var incremento = funcao.incremento;

    var dadosOriginaisArray = [['x', 'y']];
    funcao["dadosOriginaisArray"] = dadosOriginaisArray;

    for(j = 1; j < nPontos; j++){
      funcao["termo"] = inicio + ( j * incremento );
      funcao.dadosOriginaisFuncao(funcao.dadosOriginaisArray, funcao.termo);
      funcao.dadosOriginaisArray[j][0] = parseFloat(funcao.dadosOriginaisArray[j][0]);
      funcao.dadosOriginaisArray[j][1] = parseFloat(funcao.dadosOriginaisArray[j][1]);
    }

    // Calcula altura ou largura do gráfico com base no tamanho da tela atual

    function redimensiona(medida){

      var breakpoint = 966;
      var windowWidth = $(window).width();

      if(medida == "width"){
        if(windowWidth >= breakpoint){
          return windowWidth/2;
        } else {
          return windowWidth;
        }
      } else if(medida == "height"){
        if(windowWidth >= breakpoint){
          return windowWidth/4;
        } else {
          return windowWidth/2;
        }
      }
    }

    // Define propriedades da visualização do gráfico listado em menu e expandido

    var visualizacaoCollapsada = {
      curveType: 'function',
      legend: 'none',
      colors: ['black','#172833'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      animation:{
        duration: 500,
        easing: 'out',
        startup: 'true',
      },
      hAxis: {
        textPosition: 'none',
        drawAxisLineEnabled: false,
		viewWindow:{
            max: funcao.hAxis[1],
            min: funcao.hAxis[0],
            interval: 1,
        }
      },
      vAxis: {
        textPosition: 'none',
		viewWindow:{
			max: funcao.vAxis[1],
            min: funcao.vAxis[0],
            interval: 1,
        }
      },
      fontName: 'serif',
      width: 300, // baseado em valores declarados no CSS
      height: 150, // baseado em valores declarados no CSS
    };

    var visualizacaoExpandida = {
      curveType: 'function',
      legend: 'none',
      colors: ['black','#172833'],
      backgroundColor: 'transparent',
      enableInteractivity: false,
      animation: {
        duration: 750,
        easing: 'out',
        startup: 'true',
      },
      hAxis: {
        textPosition: 'left',
        title: 'y',
		viewWindow:{
            max: funcao.hAxis[1],
            min: funcao.hAxis[0],
            interval: 1,
        }
      },
      vAxis: {
        textPosition: 'left',
        title: 'x',
		viewWindow:{
			max: funcao.vAxis[1],
            min: funcao.vAxis[0],
            interval: 1,
        }
      },
      fontName: 'Glegoo',
      width: redimensiona("width"),
      height: redimensiona("height"),
    };

    // Converte dados para o Google Charts e exibe

    google.charts.setOnLoadCallback(function(){

      var data = google.visualization.arrayToDataTable(dadosOriginaisArray);
      var options = visualizacaoCollapsada;
      var chart = new google.visualization.LineChart(document.getElementById(funcao.id));
      chart.draw(data, options);

    });

    // Roda funções relacionadas às operações incluídas no array.

    jQuery.each(operacoes.item, function(i,val){

      // Transforma gráficos originais de acordo com a operação atual

      var operacao = operacoes.item[i];

      var dadosOperacaoArray = [['x', 'y']];
      operacao["dadosOperacaoArray"] = dadosOperacaoArray;

      operacao.dadosOperacaoFuncao(i, funcao.dadosOriginaisArray, operacao.dadosOperacaoArray, funcao);

      // Inclui texto descritivo nos botões das operações e adiciona evento de clique

      var item = $("#" + funcao.id).parent(".botao").parent(".item");

      item.find(operacao.id)
        .append("<h6>" + operacao.descricao + "</h6>")
        .on("click", function(){

          // Converte dados para o Google Charts e exibe

          var data = google.visualization.arrayToDataTable(dadosOperacaoArray);
          var options = visualizacaoExpandida;
          var chart = new google.visualization.LineChart(document.getElementById(funcao.id));
          chart.draw(data, options);

        });

    });

    // Variáveis dos botões principais

    var btnAbrirItem = $(".botao");
    var btnFecharItem = $(".btn-fechar");
    var btnFuncaoOriginal = $(".original");

    // Evento de clique nas funções do menu

    btnAbrirItem.on("click", function(){

      // Abre item clicado e esconde os demais

      var parent = $(this).parent(".item");
      parent.addClass("expandido");
      parent.siblings().hide();

      // Inicia com o botão da operação original ativo

      btnFuncaoOriginal.addClass("ativo");
      btnFuncaoOriginal.siblings().removeClass("ativo");

      // Converte dados da array Original para Google Charts e exibe

      var data = google.visualization.arrayToDataTable(funcao.dadosOriginaisArray);
      var options = visualizacaoExpandida;
      var chart = new google.visualization.LineChart(document.getElementById(funcao.id));
      chart.draw(data, options);

    });

    // Evento de clique no botão Fechar

    btnFecharItem.on("click", function(){

      // Fecha item e volta para menu de itens

      var parent = $(this).parent(".item");
      parent.removeClass("expandido");
      parent.siblings().show();

      // Volta para operação original ativa

      btnFuncaoOriginal.addClass("ativo");
      btnFuncaoOriginal.siblings().removeClass("ativo");

      // Converte dados da array Original para Google Charts e exibe

      var data = google.visualization.arrayToDataTable(funcao.dadosOriginaisArray);
      var options = visualizacaoCollapsada;
      var chart = new google.visualization.LineChart(document.getElementById(funcao.id));
      chart.draw(data, options);

    });

    // Eventos de clique nos botões de operação

    $(".btn-operacao").on("click", function(){

      // Adiciona classe de botão ativo e a remove das demais.

      $(this).addClass("ativo");
      $(this).siblings().removeClass("ativo");

    });

  });

});

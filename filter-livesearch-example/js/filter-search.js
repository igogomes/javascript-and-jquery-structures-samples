(function() {
    var $imgs = $('#gallery img');                                  //Obtenção das imagens
    var $search = $('#filter-search');                              //Obtenção do elemento de entrada
    var cache = [];                                                 //Criação de um array

    $imgs.each(function() {                                         //Iteração por cada imagem
        cache.push({                                                //Adição de objeto ao array cache
            element: this,                                          //Imagem atual dentro da iteração
            text: this.alt.trim().toLowerCase()                     //Texto alt associado à imagem em letra minúsculas e sem espaços iniciais ou finais
        });
    });

    function filter() {                                             //Declaração da função filter
        var query = this.value.trim().toLowerCase();                //Obtenção da consulta

        cache.forEach(function(img) {                               //Para cada iteração no array cache, uma imagem é verificada
            var index = 0;                                          //Configuração do index como zero
            if(query) {                                             //Caso algum texto de pesquisa seja apresentado
                index = img.text.indexOf(query);                    //Verificação da presença do texto de pesquisa
            }

            img.element.style.display = index === -1 ? 'none' : ''; //Exibição ou omissão das imagens de acordo o texto de pesquisa
        });
    }

    if('oninput' in $search[0]) {                                   //Caso o navegador não reconheça o evento de entrada
        $search.on('input', filter);                                //Utilização do evento de entrada para chamada da função filter
    }
    else {                                                          //Caso contrário
        $search.on('keyup', filter);                                //Utilização do evento keyup para chamada da função filter
    }
}());
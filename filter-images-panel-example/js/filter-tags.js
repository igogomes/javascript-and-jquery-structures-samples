(function() {
    var $imgs = $('#gallery img');                                      //Armazenamento de todas as imagens
    var $buttons = $('#buttons');                                       //Armazenamento do elemento buttons
    var tagged = {};                                                    //Criação do objeto tagged

    $imgs.each(function() {                                             //Iteração sobre cada imagem
        var img = this;                                                 //Armazenamento da imagem na variável
        var tags = $(this).data('tags');                                //Obtenção das marcações associadas a cada imagem

        if(tags) {                                                      //Caso a imagem apresente tags associadas
            tags.split(',').forEach(function(tagName) {                 //Divisão das tags encontradas através da vírgula
                if(tagged[tagName] == null) {                           //Caso o objeto não contenha tag
                    tagged[tagName] = [];                               //Adição de array vazio ao objeto
                }
                tagged[tagName].push(img);                              //Adição da imagem ao array
            });
        }
    });

    $('<button/>', {                                                    //Criação de um botão vazio
        text: 'Show All',                                               //Adição do texto "Show All" ao botão
        class: 'active',                                                //Adição da classe "active", para ativá-lo
        click: function() {                                             //Relação de ações para execução a partir do clique no botão
            $(this)                                                     //Obtenção do botão clicado
            .addClass('active')                                         //Adição da classe "active"
            .siblings()                                                 //Obtenção dos botões irmãos
            .removeClass('active');                                     //Remoção da classe "active" dos botões irmãos
            $imgs.show();                                               //Exibição de todas as imagens
        }
    }).appendTo($buttons);                                              //Adição do botão criado ao conjunto com outros botões

    $.each(tagged, function(tagName) {                                  //Iteração com relação de ações para cada nome de tag
        $('<button/>', {                                                //Criação de botão vazio para cada nome de tag
            text: tagName + ' (' + tagged[tagName].length + ')',        //Adição do nome da tag ao botão criado
            click: function() {                                         //Ações para execução a partir do clique no botão
                $(this)                                                 //Obtenção do botão clicado
                .addClass('active')                                     //Adição da classe "active" ao botão clicado
                .siblings()                                             //Obtenção dos botões irmãos
                .removeClass('active');                                 //Remoção da classe "active" dos botões irmãos
                $imgs                                                   //Seleção de todas as imagens
                .hide()                                                 //Omissão de todas as imagens
                .filter(tagged[tagName])                                //Localização das imagens que contêm a tag associada ao botão clicado
                .show();                                                //Exibição das imagens que contêm a tag associada ao botão clicado
            }
        }).appendTo($buttons);                                          //Adição do botão à relação de botões
    });

}());
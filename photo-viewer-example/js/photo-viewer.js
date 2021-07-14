var request;                                                    //Última imagem a ser solicitada
var $current;                                                   //Imagem sendo exibida no momento
var cache = {};                                                      //Armazenamento do objeto em cache
var $frame = $('#photo-viewer');                                //Armazenamento do contêiner para imagem principal
var $thumbs = $('.thumb');                                      //Armazenamento do contêiner para imagem miniatura

function crossfade($img) {                                      //Função para efeito de transição entre imagens com passagem de nova imagem como parâmetro
    if($current) {                                              //Caso uma imagem não esteja sendo exibida no momento
        $current.stop().fadeOut('slow');                        //Animação é paralisada e efeito fade-out executado
    }

    $img.css({                                                  //Definição das margens CSS para imagem
        marginLeft: -$img.width() / 2,                          //Margem negativa = largura da imagem / 2
        marginTop: -$img.height() / 2                           //Margem negativa = altura da imagem / 2
    });

    $img.stop().fadeTo('slow', 1);                              //Pausa de animação para nova imagem e execução de efeito fade-in

    $current = $img;                                            //Nova imagem exibida como imagem atual
}

$(document).on('click', '.thumb', function(e) {                 //Função acionada a partir de clique em miniatura
    var $img;                                                   //Criação de variável local chamada $img
    var src = this.href;                                        //Armazenamento do caminho / diretório da imagem
    request = src;                                              //Armazenamento do caminho / diretório da imagem novamente sob solicitação

    e.preventDefault();                                         //Interrupção do comportamento padrão do link 

    $thumbs.removeClass('active');                              //Remoção da classe 'active' de todas as miniaturas
    $(this).addClass('active');                                 //Adição da classe 'active' à miniatura acionada / clicada

    if(cache.hasOwnProperty(src)) {                             //Caso o cache contenha a imagem da miniatura acionada / clicada
        if(cache[src].isLoading === false) {                    //Caso 'isLoading' seja falso
            crossfade(cache[src].$img);                         //Função 'crossfade()' é acionada
        }
    }
    else {                                                      //Caso contrário, a imagem não se encontra em cache
        $img = $('<img/>');                                     //Armazenamento do elemento <img/> vazio na variável $img
        cache[src] = {                                          //Armazenamento da imagem acionada em cache
            $img: $img,                                         //Adição do caminho / diretório da imagem
            isLoading: true                                     //Configuração da propriedade 'isLoading' como true
        };

        //Instruções após carregamento da imagem
        $img.on('load', function() {                            //Quando a imagem for carregada
            $img.hide();                                        //Omissão da imagem
            //Remoção da classe 'is-loading' da nova imagem principal e anexação de elemento img à div principal
            $frame.removeClass('is-loading').append($img);
            cache[src].isLoading = false;                       //Atualização de isLoading em cache
            //Caso a imagem solicitada ainda seja recente
            if(request === src) {
                crossfade($img);                                //Função 'crossfade()' é acionada
            }                                                   //Aplicação de mecanismo assíncrono de carregamento
        });

        $frame.addClass('is-loading');                          //Adição da classe 'is-loading' à div principal

        $img.attr({                                             //Configuração de atributos no elemento <img>
            'src': src,                                         //Adição do atributo src para carregamento da imagem
            'alt': this.title || ''                             //Adição de título caso algum tenha sido adicionado ao link
        });
    }
});

//A última linha é executada uma única vez, com o intuito de demonstrar a primeira imagem
$('.thumb').eq(0).click();                                      //Simulação do clique do usuário na primeira miniatura
var modal = (function() {                                           //Declaração do objeto modal
    var $window = $(window);
    var $modal = $('<div class="modal"/>');                         //Criação de marcação para modal
    var $content = $('<div class="modal-content"/>');
    var $close = $('<button role="button" class="modal-close">close</button>');

    $modal.append($content, $close);                                //Adição do botão de fechamento ao modal

    $close.on('click', function(e) {                                //Caso o usuário clique no botão de fechamento
        e.preventDefault();                                         //Impedimento de comportamento acionado a partir de botão
        modal.close();                                              //Fechamento da janela do modal
    });

    return {                                                        //Adição de códigos para modal
        center: function() {                                        //Configuração do método 'center'
            //Cálculo da distância do canto superior esquerdo da janela ao centro do modal
            var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
            $modal.css({                                            //Configuração de CSS para modal
                top: top + $window.scrollTop(),                     //Centralização vertical
                left: left + $window.scrollLeft()                   //Centralização horizontal                                    
            });
        },
        open: function(settings) {                                  //Configuração do método 'open'
            $content.empty().append(settings.content);              //Configuração do novo conteúdo para o modal

            $modal.css({                                            //Configuração das dimensões do modal
                width: settings.width || 'auto',                    //Configuração da largura
                height: settings.height || 'auto'                   //Configuração da altura
            }).appendTo('body');                                    //Adição do conteúdo à página

            modal.center();                                         //Chamada do método 'center'
            $(window).on('resize', modal.center);                   //Chamada do método 'center' caso a janela seja redimensionada
        },
        close: function() {                                         //Configuração do método 'close'
            $content.empty();                                       //Remoção do conteúdo do modal
            $modal.detach();                                        //Remoção do modal da página
            $(window).off('resize', modal.center);                  //Remoção da rotina de tratamento de evento
        }
    };
}());
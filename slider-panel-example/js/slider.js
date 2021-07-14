$('.slider').each(function() {                                      //Verificação da presença de todos os slides no código
    var $this = $(this);                                            //Obtenção do item atual
    var $group = $this.find('.slide-group');                        //Obtenção do grupo de slides
    var $slides = $this.find('.slide');                             //Objeto jQuery para armazenamento de todos os slides
    var buttonArray = [];                                           //Criação de array para armazenamento dos botões de navegação do slider
    var currentIndex = 0;                                           //Número de índice do slide atual
    var timeout;                                                    //Variável para registro de timer

    function move(newIndex) {                                       //Movimentação entre slides                  
        var animateLeft, slideLeft;                                 //Declaração de variáveis

        advance();                                                  //Quando o slide se movimenta, a função advance() é acionada

        //Caso o slide atual estiver sendo exibido ou um slide estiver sendo animado, nenhuma ação é realizada
        if($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        buttonArray[currentIndex].removeClass('active');            //Remoção da classe 'active' do item
        buttonArray[newIndex].addClass('active');                   //Adição da classe 'active' ao novo item

        if(newIndex > currentIndex) {                               //Caso novo item seja maior que o item atual
            slideLeft = '100%';                                     //Slide à direita é selecionado
            animateLeft = '-100%';                                  //Animação do grupo atual para a esquerda
        }

        else {                                                      //Caso contrário
            slideLeft = "-100%";                                    //Slide à esquerda é selecionado
            animateLeft = '100%';                                   //Animação do grupo atual para a direita
        }

        //Posicionamento do novo slide à esquerda se menor e à direita se maior que o slide atualmente exibido
        $slides.eq(newIndex).css({left: slideLeft, display: 'block'});
        $group.animate({left:animateLeft}, function() {             //Animação dos slides
            $slides.eq(currentIndex).css({display: 'none'});        //Omissão do slide anterior
            $slides.eq(newIndex).css({left: 0});                    //Definição da posição do novo item
            $group.css({left: 0});                                  //Definição da posição do grupo de slides
            currentIndex = newIndex;                                //Configuração do item atual como nova imagem
        });
    }

    function advance() {                                            //Definição de timer entre a exibição dos slides
        clearTimeout(timeout);                                      //Limpeza do tempo armazenado no timeout
        //Inicialização do timer para execução de função anônima a cada quatro segundos
        timeout = setTimeout(function() {
            if(currentIndex < ($slides.lenght - 1)) {               //Caso o slide em exibição não seja o último da sequência de slides
                move(currentIndex + 1);                             //Slider realiza exibição do próximo slide
            }
            else {                                                  //Caso o slide em exibição seja o último da sequência de slides
                move(0);                                            //Exibição do primeiro slide da sequência de slides
            }
        }, 4000);                                                   //Tempo em milissegundos entre a exibição de cada slide
    }

    $.each($slides, function(index) {
        //Criação de elemento button para botão
        var $button = $('<button type="button" class="slide-btn">&bull;</button>');

        if(index === currentIndex) {                                //Caso o índice corresponda ao item atual
            $button.addClass('active');                             //Adição da classe 'active' ao botão
        }

        $button.on('click', function() {                            //Função para tratamento do clique sobre o botão
            move(index);                                            //Acionamento da função 'move()'
        }).appendTo('.slide-buttons');                              //Adição ao armazenamento de botões
        buttonArray.push($button);                                  //Adição do botão ao array de botões
    });

    advance();
});
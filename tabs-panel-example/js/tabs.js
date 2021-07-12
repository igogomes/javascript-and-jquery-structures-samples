$('.tab-list').each(function() {                        //Localização da lista de abas
    var $this = $(this);                                //Armazenamento da lista
    var $tab = $this.find('li.active');                 //Obtenção do item de lista ativo
    var $link = $tab.find('a');                         //Obtenção do link da aba ativa
    var $panel = $($link.attr('href'));                 //Obtenção do painel ativo

    $this.on('click', '.tab-control', function(e) {     
        e.preventDefault();                             //Impedimento de comportamento de link 
        var $link = $(this);                            //Armazenamento do link atual
        var id = this.hash;                             //Obtenção da referência da guia acionada

        if(id && !$link.is('.active')) {                //Csao a aba acionada não esteja ativa
            $panel.removeClass('active');               //Remoção da classe 'active' do painel ativo no momento
            $tab.removeClass('active');                 //Remoção da classe 'active' da guia ativa no momento

            $panel = $(id).addClass('active');          //Ativação do novo painel
            $tab = $link.parent().addClass('active');   //Ativação da nova aba
        }
    });
});
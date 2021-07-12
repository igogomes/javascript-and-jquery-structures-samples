$('.accordion').on('click', '.accordion-control', function(e) {     //Quando elemento é clicado dentro da lista
    e.preventDefault();                                             //Impedimento da ação padrão do botão
    $(this)                                                         //Obtenção do elemento que recebeu o clique
    .next('.accordion-panel')                                       //Seleção do conteúdo de painel mais próximo
    .not(':animated')                                               //Caso o elemento não esteja sendo animado no momento
    .slideToggle();                                                 //Alternância de comportamento para exibição ou omissão
});
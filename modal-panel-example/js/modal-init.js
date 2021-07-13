(function() {
    var $content = $('#share-options').detach();                        //Remoção de modal da página
    $('#share').on('click', function() {                                //Tratamento de clique para abertura de modal
        modal.open({content: $content, width: 340, height: 300});       //Abertura de modal
    });
}());
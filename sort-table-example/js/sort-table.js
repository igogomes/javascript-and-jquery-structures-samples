var compare = {                                                         //Declaração do objeto compare
    name: function(a, b) {                                              //Adição do método "name"
        a = a.replace(/^the /i, '');                                    //Remoção do termo "the" do início do parâmetro
        b = b.replace(/^the /i, '');                                    //Remoção do termo "the" do início do parâmetro
    
        if(a < b) {                                                     //Se o valor a for menor que o valor b
            return -1;                                                  //Retorno do valor -1
        }

        else {                                                          //Caso contrário
            return a > b ? 1 : 0;                                       //Se o valor a for maior que o valor b o valor retornado será 1, caso contrário ou ambos forem iguais, o valor retornado será zero
        }
    },
    duration: function(a, b) {                                          //Adição do método duration
        a = a.split(':');                                               //Divisão do tempo através dos dois pontos
        b = b.split(':');                                               //Divisão do tempo através dos dois pontos

        a = Number(a[0] * 60 + Number(a[1]));                           //Conversão do tempo em segundos
        b = Number(b[0] * 60 + Number(b[0]));                           //Conversão do tempo em segundos

        return a - b;                                                   //Retorno do valor de a menos o valor de b
    },
    date: function(a, b) {                                              //Adição do método date
        a = new Date(a);                                                //Novo objeto Date para armazenamento da data
        b = new Date(b);                                                //Novo objeto Date para armazenamento da data

        return a - b;                                                   //Retorno do valor de a menos o valor de b
    }
};

$('.sortable').each(function() {
    var $table = $(this);                                               //Tabela ordenável
    var $tbody = $table.find('tbody');                                  //Armazenamento do corpo da tabela
    var $controls = $table.find('th');                                  //Armazenametno dos cabeçalhos da tabela
    var rows = $tbody.find('tr').toArray();                             //Armazenamento do array contendo linhas

    $controls.on('click', function() {                                  //Ações mediante clique em cabeçalhos
        var $header = $(this);                                          //Obtenção do cabeçalho
        var order = $header.data('sort');                               //Obtenção do valor do atributo data-sort
        var column;                                                     //Declaração de variável column

        //Caso o item selecionado tiver classe ascendente ou descendente, o conteúdo será invertido
        if($header.is('.ascending') || $header.is('.descending')) {
            $header.toggleClass('ascending descending');                //Alternância entre classes
            $tbody.append(rows.reverse());                              //Inversão do array
        }
        else {                                                          //Caso contrário, uma ordenação é realizada
            $header.addClass('ascending');                              //Adição de classe ao cabeçalho

            //Remoção de ascendência ou descendência de todos os outros cabeaçalhos
            $header.siblings().removeClass('ascending descending');

            if(compare.hasOwnProperty(order)) {                         //Caso o objeto compare possuir método
                column = $controls.index(this);                         //Localização do número de índice da coluna

                rows.sort(function(a, b) {                              //Acionamento de sort() no array de linhas
                    a = $(a).find('td').eq(column).text();              //Obtenção do texto da coluna na linha a
                    b = $(b).find('td').eq(column).text();              //Obtenção do texto da coluna na linha b
                    return compare[order](a, b);                        //Chamada do método compare
                });

                $tbody.append(rows);
            }
        }
    });
});
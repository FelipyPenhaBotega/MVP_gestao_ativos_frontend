$(document).ready(function() {
    const apiUrl = 'http://localhost:5000/ativos';
    const symbolsUrl = 'http://localhost:5000/ativos/symbols';

    // Função para carregar a lista de símbolos
    function loadSymbols() {
        $.get(symbolsUrl, function(data) {
            $('#nome').empty();
            data.forEach(symbolData => {
                $('#nome').append(`<option value="${symbolData.symbol}">${symbolData.symbol}</option>`);
            });
        });
    }

    // Função para carregar a lista de ativos
    function loadAtivos() {
        $.get(apiUrl, function(data) {
            $('#ativosTable').empty();
            let totalValue = 0;
            data.forEach(ativo => {
                const total = ativo.quantidade * ativo.valor;
                totalValue += total;
                $('#ativosTable').append(`
                    <tr>
                        <td>${ativo.id}</td>
                        <td>${ativo.nome}</td>
                        <td>${ativo.quantidade}</td>
                        <td>${ativo.valor}</td> 
                        <td>${total}</td> 
                        <td>
                            <button class="btn btn-info btn-sm" onclick="editAtivo(${ativo.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteAtivo(${ativo.id})">Deletar</button>
                        </td>
                    </tr>
                `);
            });
            $('#totalValue').text(totalValue.toFixed(2));
        });
    }

    // Evento de submit do formulário
    $('#ativoForm').submit(function(event) {
        event.preventDefault();
        const id = $('#ativoId').val();
        const nome = $('#nome').val();
        const quantidade = $('#quantidade').val();
        const ativo = { id, nome, quantidade };

        if (id) {
            // Atualizar ativo
            $.ajax({
                url: `${apiUrl}/${id}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(ativo),
                success: function() {
                    loadAtivos();
                    $('#ativoForm')[0].reset();
                    $('#ativoId').val('');
                }
            });
        } else {
            // Adicionar ativo
            $.ajax({
                url: apiUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(ativo),
                success: function() {
                    loadAtivos();
                    $('#ativoForm')[0].reset();
                }
            });
        }
    });

    // Função para editar ativo
    window.editAtivo = function(id) {
        $.get(`${apiUrl}/${id}`, function(ativo) {
            $('#ativoId').val(ativo.id);
            $('#nome').val(ativo.nome);
            $('#quantidade').val(ativo.quantidade);
        });
    }

    // Função para deletar ativo
    window.deleteAtivo = function(id) {
        $.ajax({
            url: `${apiUrl}/${id}`,
            type: 'DELETE',
            success: function() {
                loadAtivos();
            }
        });
    }

    // Carregar lista de símbolos e ativos ao iniciar
    loadSymbols();
    loadAtivos();
});

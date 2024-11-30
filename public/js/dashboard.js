function chamarDados() {
    var idUsuario = sessionStorage.ID_USUARIO;

    listarKpi(idUsuario);
    listarCurtidaGrafico(idUsuario);
    listarComentarioGrafico(idUsuario);
    listarVisualizacaoGrafico(idUsuario);
    curtida();
}

function listarKpi(idUsuario) {
    fetch(`/dados/listarKpi/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var kpi = resposta[0];

                infoCards.innerHTML = `
                        <div class="card">
                            <h3>Publicações</h3>
                            <h1>${kpi.publicacaoKpi}</h1>
                        </div>

                        <div class="card">
                            <h3>Seguidores</h3>
                            <h1>${kpi.seguidorKpi}</h1>
                        </div>

                        <div class="card">
                            <h3>Curtidas</h3>
                            <h1>${kpi.curtidaKpi}</h1>
                        </div>

                        <div class="card">
                            <h3>Comentários</h3>
                            <h1>${kpi.comentarioKpi}</h1>
                        </div>

                        <div class="card">
                            <h3>Visualizações</h3>
                            <h1>${kpi.visualizacaoKpi}</h1>
                        </div>
                    `;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

let proximaAtualizacaoCurtida;
let proximaAtualizacaoComentario;
let proximaAtualizacaoVisualizacao;

function listarCurtidaGrafico(idUsuario) {
    if (proximaAtualizacaoCurtida != undefined) {
        clearTimeout(proximaAtualizacaoCurtida);
    }

    fetch(`/dados/listarCurtida/${idUsuario}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                setTimeout(() => {
                    listarCurtidaGrafico(idUsuario)
                }, 2000);

            } else {
                resposta.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    plotarGraficoCurtida(resposta, idUsuario);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoCurtida(resposta, idUsuario) {
    // Criando estrutura para plotar gráfico - labels
    let labelsCurtida = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosCurtida = {
        labels: labelsCurtida,
        datasets: [{
            label: 'Curtidas',
            data: [],
            fill: false,
            borderColor: '#5E4889',
            backgroundColor: '#5E4889',
            borderRadius: 15
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = resposta.length - 1; i >= 0; i--) {
        var registro = resposta[i];

        labelsCurtida.push(registro.dtCurtida);
        dadosCurtida.datasets[0].data.push(registro.curtida);
    }

    // Criando estrutura para plotar gráfico - config
    const configCurtida = {
        type: 'bar',
        data: dadosCurtida,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '(Mês)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(Curtidas)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChartCurtida = new Chart(
        document.getElementById(`chartCurtida`),
        configCurtida
    );

    setTimeout(() => {
        atualizarGraficoCurtida(idUsuario, dadosCurtida, myChartCurtida);
    }, 2000);
}

function atualizarGraficoCurtida(idUsuario, dadosCurtida, myChartCurtida) {
    fetch(`/dados/listarCurtida/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                if ((novoRegistro[0].dtCurtida == dadosCurtida.labels[dadosCurtida.labels.length - 1]) && (dadosCurtida.datasets[0].data[dadosCurtida.labels.length - 1] != novoRegistro[0].curtida)) {
                    // Entra aqui se o horário da captura do dado for igual mas o dado foi alterado (passou mais uma pessoa)

                    // Atualizamos o gráfico com o novo dado do banco
                    dadosCurtida.datasets[0].data[dadosCurtida.labels.length - 1] = novoRegistro[0].curtida;

                    myChartCurtida.update();
                } else if ((novoRegistro[0].dtCurtida != dadosCurtida.labels[dadosCurtida.labels.length - 1]) && (dadosCurtida.datasets[0].data[dadosCurtida.labels.length - 1] != novoRegistro[0].curtida)) {
                    // Entra aqui se o passou uma pessoa e o horário é diferente do gráfico

                    // dadosCurtida.labels.shift(); // apagar o primeiro
                    dadosCurtida.labels.push(novoRegistro[0].dtCurtida); // incluir um novo momento

                    myChartCurtida.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoCurtida = setTimeout(() => {
                    listarKpi(idUsuario);
                    atualizarGraficoCurtida(idUsuario, dadosCurtida, myChartCurtida);
                }, 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoCurtida = setTimeout(() => {
                listarKpi(idUsuario);
                atualizarGraficoCurtida(idUsuario, dadosCurtida, myChartCurtida)
            }, 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function listarComentarioGrafico(idUsuario) {
    if (proximaAtualizacaoComentario != undefined) {
        clearTimeout(proximaAtualizacaoComentario);
    }

    fetch(`/dados/listarComentario/${idUsuario}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                setTimeout(() => {
                    listarComentarioGrafico(idUsuario)
                }, 2000);

            } else {
                resposta.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    plotarGraficoComentario(resposta, idUsuario);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoComentario(resposta, idUsuario) {
    // Criando estrutura para plotar gráfico - labels
    let labelsComentario = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosComentario = {
        labels: labelsComentario,
        datasets: [{
            label: 'Comentários',
            data: [],
            fill: false,
            borderColor: '#5E4889',
            backgroundColor: '#5E4889',
            borderRadius: 15
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = resposta.length - 1; i >= 0; i--) {
        var registro = resposta[i];

        labelsComentario.push(registro.dtComentario);
        dadosComentario.datasets[0].data.push(registro.comentario);
    }

    // Criando estrutura para plotar gráfico - config
    const configComentario = {
        type: 'bar',
        data: dadosComentario,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '(Mês)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(Comentários)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChartComentario = new Chart(
        document.getElementById(`chartComentario`),
        configComentario
    );

    setTimeout(() => {
        atualizarGraficoComentario(idUsuario, dadosComentario, myChartComentario);
    }, 2000);
}

function atualizarGraficoComentario(idUsuario, dadosComentario, myChartComentario) {
    fetch(`/dados/listarComentario/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                if ((novoRegistro[0].dtComentario == dadosComentario.labels[dadosComentario.labels.length - 1]) && (dadosComentario.datasets[0].data[dadosComentario.labels.length - 1] != novoRegistro[0].comentario)) {
                    // Entra aqui se o horário da captura do dado for igual mas o dado foi alterado (passou mais uma pessoa)

                    // Atualizamos o gráfico com o novo dado do banco
                    dadosComentario.datasets[0].data[dadosComentario.labels.length - 1] = novoRegistro[0].comentario;

                    myChartComentario.update();
                } else if ((novoRegistro[0].dtComentario != dadosComentario.labels[dadosComentario.labels.length - 1]) && (dadosComentario.datasets[0].data[dadosComentario.labels.length - 1] != novoRegistro[0].comentario)) {
                    // Entra aqui se o passou uma pessoa e o horário é diferente do gráfico

                    // dadosComentario.labels.shift(); // apagar o primeiro
                    dadosComentario.labels.push(novoRegistro[0].dtComentario); // incluir um novo momento

                    myChartComentario.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoComentario = setTimeout(() => {
                    listarKpi(idUsuario);
                    atualizarGraficoComentario(idUsuario, dadosComentario, myChartComentario);
                }, 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoComentario = setTimeout(() => {
                listarKpi(idUsuario);
                atualizarGraficoComentario(idUsuario, dadosComentario, myChartComentario);
            }, 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function listarVisualizacaoGrafico(idUsuario) {
    if (proximaAtualizacaoVisualizacao != undefined) {
        clearTimeout(proximaAtualizacaoVisualizacao);
    }

    fetch(`/dados/listarVisualizacao/${idUsuario}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                setTimeout(() => {
                    listarVisualizacaoGrafico(idUsuario)
                }, 2000);

            } else {
                resposta.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    plotarGraficoVisualizacao(resposta, idUsuario);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoVisualizacao(resposta, idUsuario) {
    // Criando estrutura para plotar gráfico - labels
    let labelsVisualizacao = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosVisualizacao = {
        labels: labelsVisualizacao,
        datasets: [{
            label: 'Visualizações',
            data: [],
            fill: false,
            borderColor: '#5E4889',
            backgroundColor: '#5E4889',
            borderRadius: 15
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = resposta.length - 1; i >= 0; i--) {
        var registro = resposta[i];

        labelsVisualizacao.push(registro.dtVisualizacao);
        dadosVisualizacao.datasets[0].data.push(registro.visualizacao);
    }

    // Criando estrutura para plotar gráfico - config
    const configVisualizacao = {
        type: 'bar',
        data: dadosVisualizacao,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '(Mês)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(Visualizações)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChartVisualizacao = new Chart(
        document.getElementById(`chartVisualizacao`),
        configVisualizacao
    );

    setTimeout(() => {
        atualizarGraficoVisualizacao(idUsuario, dadosVisualizacao, myChartVisualizacao);
    }, 2000);
}

function atualizarGraficoVisualizacao(idUsuario, dadosVisualizacao, myChartVisualizacao) {
    fetch(`/dados/listarVisualizacao/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                if ((novoRegistro[0].dtVisualizacao == dadosVisualizacao.labels[dadosVisualizacao.labels.length - 1]) && (dadosVisualizacao.datasets[0].data[dadosVisualizacao.labels.length - 1] != novoRegistro[0].totalFluxo)) {
                    // Entra aqui se o horário da captura do dado for igual mas o dado foi alterado (passou mais uma pessoa)

                    // Atualizamos o gráfico com o novo dado do banco
                    dadosVisualizacao.datasets[0].data[dadosVisualizacao.labels.length - 1] = novoRegistro[0].visualizacao;

                    myChartVisualizacao.update();
                } else if ((novoRegistro[0].dtVisualizacao != dadosVisualizacao.labels[dadosVisualizacao.labels.length - 1]) && (dadosVisualizacao.datasets[0].data[dadosVisualizacao.labels.length - 1] != novoRegistro[0].visualizacao)) {
                    // Entra aqui se o passou uma pessoa e o horário é diferente do gráfico

                    // dadosVisualizacao.labels.shift(); // apagar o primeiro
                    dadosVisualizacao.labels.push(novoRegistro[0].dtVisualizacao); // incluir um novo momento

                    myChartVisualizacao.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoVisualizacao = setTimeout(() => {
                    listarKpi(idUsuario);
                    atualizarGraficoVisualizacao(idUsuario, dadosVisualizacao, myChartVisualizacao);
                }, 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoVisualizacao = setTimeout(() => {
                listarKpi(idUsuario);
                atualizarGraficoVisualizacao(idUsuario, dadosVisualizacao, myChartVisualizacao);
            }, 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function curtida() {
    chartCurtida.style.display = 'block';
    chartComentario.style.display = 'none';
    chartVisualizacao.style.display = 'none';

    btnCurt.style.backgroundColor = '#5E4889';
    btnCome.style.backgroundColor = '#211F22';
    btnVisu.style.backgroundColor = '#211F22';
}

function visualizacao() {
    chartCurtida.style.display = 'none';
    chartComentario.style.display = 'none';
    chartVisualizacao.style.display = 'block';

    btnCurt.style.backgroundColor = '#211F22';
    btnCome.style.backgroundColor = '#211F22';
    btnVisu.style.backgroundColor = '#5E4889';
}

function comentario() {
    chartCurtida.style.display = 'none';
    chartComentario.style.display = 'block';
    chartVisualizacao.style.display = 'none';

    btnCurt.style.backgroundColor = '#211F22';
    btnCome.style.backgroundColor = '#5E4889';
    btnVisu.style.backgroundColor = '#211F22';
}
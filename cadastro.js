let campos = document.querySelectorAll(".input-campo");
let botao = document.querySelector("button");

// Função para limpar campos
function limparCampos() {
    campos.forEach(campo => {
        campo.value = "";
    });
}

// Função para bloquear letras e permitir apenas números
function bloquearLetras(event) {
    if (event.target.id !== "cpf") {  // Exclui CPF da função de bloquear letras
        event.target.value = event.target.value.replace(/\D/g, ''); // Permite apenas números
    }
}

// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');  // Remove tudo o que não for número
    if (cpf.length > 11) {
        cpf = cpf.slice(0, 11);  // Limita a 11 caracteres
    }
    if (cpf.length <= 3) {
        cpf = cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else if (cpf.length <= 6) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (cpf.length <= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
}

// Adiciona evento de input para CPF e Telefone, com a formatação automática para CPF
document.getElementById("cpf").addEventListener("input", (event) => {
    event.target.value = formatarCPF(event.target.value); // Formata CPF
});
document.getElementById("telefone").addEventListener("input", bloquearLetras);
document.getElementById("cartao_sus").addEventListener("input", bloquearLetras);
document.getElementById("n_casa").addEventListener("input", bloquearLetras);
document.getElementById("cep").addEventListener("input", bloquearLetras);

botao.addEventListener("click", () => {
    let camposPreenchidos = true;
    let proximapagina = false;

    campos.forEach(campo => {
        if (campo.classList.contains("data-nascimento")) {
            if (!campo.value) {
                campo.style.color = "red";
                campo.style.border = "solid 1px red";
                camposPreenchidos = false;
            }
            campo.addEventListener("click", () => {
                campo.style.color = "";
                campo.style.border = "";
            });
            return;
        }
        if (!campo.value || campo.value == "Preencha este campo") {
            campo.value = "Preencha este campo";
            campo.style.color = "red";
            campo.style.border = "initial";
            campo.style.borderStyle = "solid"; 
            campo.style.borderColor = "red"; 
            campo.style.borderWidth = "1px"; 
            camposPreenchidos = false;
        }
    });

    // Verifica se o CPF tem exatamente 11 dígitos, mas apenas se não estiver vazio
    const cpf = document.getElementById("cpf").value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const cpfCampo = document.getElementById("cpf");

    if (cpf.length == 0) {
        cpfCampo.value = "Preencha este campo";
        cpfCampo.style.color = "red";
        cpfCampo.style.border = "1px solid red";
        camposPreenchidos = false;
    } else if (cpf.length != 11) {
        cpfCampo.value = "CPF inválido";
        cpfCampo.style.color = "red";
        cpfCampo.style.border = "1px solid red";
        camposPreenchidos = false;
    }

    // Verifica se nenhum campo contém a mensagem "Preencha este campo"
    const camposSemMensagem = Array.from(campos).every(campo => campo.value !== "Preencha este campo");

    if (camposPreenchidos && camposSemMensagem) {
        limparCampos();
        proximapagina = true;

        setTimeout(() => {
            window.location.href = "convenio.html";
        }, 100);
    }

    if (!camposPreenchidos || !camposSemMensagem) {
        campos.forEach(campo => {
            if (campo.value == "Preencha este campo" || campo.style.color == "red") {
                campo.addEventListener("focus", () => {
                    if (campo.value == "Preencha este campo") {
                        campo.value = "";
                        campo.style.color = "";
                        campo.style.border = "";
                    }         
                });
            } 
            else {
                campo.addEventListener("focus", () => {
                    // Você pode adicionar lógica para outros casos se necessário
                });
            }
            if (campo.value == "CPF inválido") {
                campo.addEventListener("click", () => {
                    campo.value = "";
                    campo.style.color = "";
                    campo.style.border = "";
                });
            } 
            else {
                campo.addEventListener("focus", () => {
                    // Você pode adicionar lógica para outros casos se necessário
                });
            }
        });
    }
});

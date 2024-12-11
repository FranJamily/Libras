let campo = document.querySelector(".cpf");
let botao = document.querySelector("button");

// Função para limpar campos
function limparCampos() {
    campo.value = "";
    campo.style.color = "";
    campo.style.border = "";
}

// Função para formatar CPF
function formatarCPF(cpf) {
    // Remove tudo o que não for número
    cpf = cpf.replace(/\D/g, '');
    
    // Limita o CPF a no máximo 11 dígitos
    if (cpf.length > 11) {
        cpf = cpf.slice(0, 11);
    }

    // Formata o CPF
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

campo.addEventListener("input", (event) => {
    // Formata o CPF enquanto o usuário digita
    campo.value = formatarCPF(event.target.value);
});

botao.addEventListener("click", () => {
    let camposPreenchidos = true;

    // Verifica se o campo está vazio ou contém mensagem de erro
    if (!campo.value || campo.value === "Preencha este campo") {
        campo.value = "Preencha este campo";
        campo.style.color = "red";
        campo.style.border = "1px solid red";
        camposPreenchidos = false;
    }

    // Verifica se o CPF é válido e contém 11 dígitos
    const cpfNumerico = campo.value.replace(/\D/g, '');  // Remove qualquer coisa que não seja número
    if (cpfNumerico.length === 0) {
        campo.value = "Preencha este campo";  // Caso o campo esteja vazio, exibe "Preencha este campo"
        campo.style.color = "red";
        campo.style.border = "1px solid red";
        camposPreenchidos = false;
    } else if (cpfNumerico.length !== 11) {
        campo.value = "CPF inválido";  // Exibe "CPF inválido" caso não tenha 11 dígitos
        campo.style.color = "red";
        campo.style.border = "1px solid red";
        camposPreenchidos = false;
    }

    // Caso o campo tenha o valor esperado (exemplo: 001.234.567-89)
    if (campo.value === "001.234.567-89" && camposPreenchidos) {
        limparCampos();
        setTimeout(() => {
            window.location.href = "../plano/pag5.html";
        }, 100);
        return; // Encerra a execução após redirecionar
    }

    // Caso o campo não tenha o valor esperado e o CPF seja válido
    if (campo.value !== "001.234.567-89" && camposPreenchidos) {
        limparCampos();
        setTimeout(() => {
            window.location.href = "../cadastro/pag2.html";
        }, 100);
        return;
    }

    // Adiciona eventos para remover a mensagem de erro
    campo.addEventListener("focus", () => {
        if (campo.value === "Preencha este campo" || campo.value === "CPF inválido") {
            limparCampos();
        }
    });
});

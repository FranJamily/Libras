const input = document.querySelector(".digitar");
const button = document.querySelector(".envio .enviar");
const mensagensDiv = document.querySelector(".mensagens");
const botao_cliente = document.querySelector(".botao-cliente");
const botao_recepcao = document.querySelector(".botao-recepcionista");

botao_cliente.addEventListener("click", () => {
    botao_cliente.style.transform = "scale(1.10)";
    botao_cliente.style.background = "linear-gradient(0deg, #d1e8ff 22%, #5784e6 84%)";
    botao_cliente.style.color = "black";
    revezamento = "Cliente";

    botao_recepcao.style.color = "";
    botao_recepcao.style.transform = "";
    botao_recepcao.style.background = "";
    nome_negrito.style.color = "#5784e6"

    const nome_negrito = mensagensDiv.querySelector("p:last-child strong");
    if (nome_negrito) {
        nome_negrito.style.color = "#5784e6";
    }
}
);


botao_recepcao.addEventListener("click", () => {
    revezamento = "Recepcionista";
    botao_recepcao.style.transform = "scale(1.10)";
    botao_recepcao.style.background = "linear-gradient(0deg, #d1e8ff 22%, #5784e6 84%)";
    botao_recepcao.style.color = "black";

    botao_cliente.style.color = "";
    botao_cliente.style.transform = "";
    botao_cliente.style.background = "";
    nome_negrito.style.color = "#fe7740"

    const nome_negrito = mensagensDiv.querySelector("p:last-child strong");
    if (nome_negrito) {
        nome_negrito.style.color = "#fe7740";
    }
}
);

button.addEventListener("click", () => {
    const mensagem = input.value.trim();
    if (mensagem) {
        const novoParagrafo = document.createElement("p");
        novoParagrafo.innerHTML = `<strong>${revezamento}:</strong> ${mensagem}`;
        mensagensDiv.appendChild(novoParagrafo);

        const nome_negrito = novoParagrafo.querySelector("strong");
        if (nome_negrito) {
            nome_negrito.style.color = revezamento === "Cliente" ? "#5784e6" : "#fe7740";
        }

        input.value = ""; // Limpa o campo de entrada
        mensagensDiv.scrollTop = mensagensDiv.scrollHeight; // Rola para o final
    }
});

// Opcional: Permitir envio ao pressionar Enter
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
});
async function gerarPoesia() {
    const nome = document.getElementById('nomeUsuario').value;
    const resultado = document.getElementById('resultadoPoesia');
    const apiKey = "s
    if (!nome) {
        alert("Por favor, digite um nome!");
        return;
    }

    resultado.innerText = "O poeta está buscando inspiração nas estrelas... ✨";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // ou "gpt-4"
                messages: [
                    {
                        role: "system", 
                        content: "Você é um poeta artista, sensível e muito inteligente. 
        Sua missão é escrever poesias curtas, elegantes e emocionantes para o Dia Internacional da Mulher.
        
        REGRAS:
        1. Se o nome recebido for claramente MASCULINO, responda educadamente: "Peço perdão, mas hoje minha inspiração está voltada exclusivamente para homenagear as mulheres. Que tal pedir para uma mulher especial digitar o nome dela?"
        2. Se o nome for FEMININO, escreva uma poesia que:
           - Comece ou termine citando o nome dela de forma carinhosa.
           - Foque na força, beleza e importância da mulher na sociedade e na vida.
           - Tenha um tom de celebração pelo dia 8 de Março.
           - Use emojis delicados como 🌹, ✨ ou 💖.`"
                    },
                    {
                        role: "user", 
                        content: `Escreva uma poesia para o nome: ${nome}`
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const poesiaGerada = data.choices[0].message.content;
        
        // Exibe o resultado na tela
        resultado.innerText = poesiaGerada;

    } catch (error) {
        resultado.innerText = "Ops! O poeta se perdeu nos versos. Tente novamente.";
        console.error("Erro na API:", error);
    }

}

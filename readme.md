# Robô de Atendimento CRT_02

## ATENÇÃO ESSA VERSÃO AINDA ESTÁ EM FASE DE TESTES, LOGO, AINDA ESTÃO SENDO DESENVOLVIDAS NOVAS FUNCIONALIDADES PARA CHEGAR NO UM PRODUTO FINAL

Este projeto implementa um robô de atendimento automatizado para WhatsApp, desenvolvido em Node.js utilizando a biblioteca `whatsapp-web.js`. O bot oferece um fluxo de atendimento interativo baseado em menus para guiar os usuários através de diversas solicitações.

## Como Usar:

### Pré-requisitos:
- Node.js (versão 16.x ou superior)
- npm (Node Package Manager)

### Instalação e Execução:
1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/m32pinto/robo_de_atendimento_CRT02.git](https://github.com/m32pinto/robo_de_atendimento_CRT02.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd robo_de_atendimento_CRT02
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o bot:**
    ```bash
    node src/bot.js
    # Ou, se configurado no package.json:
    # npm start
    ```
5.  **Conecte o WhatsApp:**
    * Uma URL longa (`data:image/png;base64,...`) será exibida no terminal.
    * Copie e cole essa URL em seu navegador web.
    * Escaneie o QR Code exibido no navegador com seu celular (WhatsApp > Aparelhos Conectados > Conectar um aparelho).
    * O bot estará pronto quando "Client is ready!" for exibido no terminal.

## Funcionalidades Principais:

* **Atendimento Guiado por Menu:** Permite ao usuário navegar por opções numeradas.
* **Gestão de Estados de Conversa:** O bot rastreia o estado atual de cada usuário para fornecer respostas contextuais.
* **Retorno Universal:** A opção `0` permite voltar ao menu anterior ou principal.
* **Respostas Detalhadas:** Fornece informações completas para cada opção de atendimento.

## Bibliotecas Utilizadas:

* [`whatsapp-web.js`](https://wwebjs.dev/): Para conexão e interação com o WhatsApp Web.
* [`qrcode`](https://www.npmjs.com/package/qrcode): Para gerar o QR Code de conexão como uma Data URL.
* `axios` (se implementada a integração com LLM para a opção "Falar com atendente").

## Evolução do Projeto (Versão Atual):

Esta versão (`correcao_v0`) representa uma refatoração significativa em relação à versão inicial, focando em:

* **Estrutura de Código Mais Robusta:** Consolidação da lógica de cada submenu em um único bloco `if` para aquele estado, tornando o fluxo de atendimento mais previsível e fácil de depurar.
* **Tratamento Consistente do Retorno (`0`):** Implementação de uma lógica universal para o dígito `0` que permite ao usuário retornar de qualquer submenu para o menu principal de forma consistente.
* **Consistência nos Nomes dos Estados:** Padronização dos nomes dos estados (ex: `menu_atualizacoes` sem 'ç') para evitar erros de referência.
* **Mensagens Formatadas:** Textos de resposta aprimorados com quebras de linha (`\n`) e formatação Markdown para melhor legibilidade no WhatsApp.
* **Correção de Erros de Referência:** Resolução de problemas como `ReferenceError: chatid is not defined` através da correção de nomes de variáveis.
* **Geração Confiável do QR Code:** Confirmação e depuração da geração do QR Code como Data URL, garantindo que a conexão inicial seja feita sem problemas.

---

**Passos para Adicionar e Enviar o `README.md` para o GitHub:**

1.  **Abra o seu projeto no VS Code.**
2.  **Crie um novo arquivo na raiz do seu projeto** (no mesmo nível da pasta `src/`) e nomeie-o como `README.md`.
3.  **Cole o conteúdo Markdown** que forneci acima dentro do arquivo `README.md`.
4.  **Salve o `README.md`.**
5.  **Abra o Terminal no VS Code.**
6.  **Certifique-se de que você está no branch `correcao_v0`:**
    ```bash
    git branch
    ```
    (Deve aparecer `* correcao_v0`)
    Se não estiver, mude para ele: `git checkout correcao_v0`
7.  **Adicione o `README.md` ao Git:**
    ```bash
    git add README.md
    ```
    (Se você alterou `package.json` para o script `start`, adicione também: `git add package.json`)
8.  **Faça o commit das suas alterações:**
    ```bash
    git commit -m "docs: Adiciona README.md com documentacao do projeto e comparacao de versoes"
    ```
    (Use `docs:` para indicar que é uma mudança de documentação, uma convenção comum).
9.  **Envie (push) as alterações para o GitHub:**
    ```bash
    git push origin correcao_v0
    ```

Após o push, o `README.md` estará visível no seu repositório no GitHub, e você poderá até criar um Pull Request de `correcao_v0` para `main` para incorporar essas mudanças na sua versão principal.

Me avise se tiver alguma dúvida durante esse processo!
const { Client } = require('whatsapp-web.js');
const qrcodeLib = require('qrcode');




const client = new Client();
const estadosAtendimento = {}; // Objeto para rastrear o estado de cada conversa




client.on('ready', () => {
    console.log('Client is ready!');
});




client.on('qr', qr => {
    qrcodeLib.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Erro ao gerar a URL do QR code:', err);
            return;
        }
        console.log('Escaneie este QR code no WhatsApp Web:', url);
    });
});




client.on('message', async msg => {
    const chatId = msg.from;
    const mensagemCliente = msg.body;




    console.log(`Mensagem de ${chatId}: ${mensagemCliente} - Estado: ${estadosAtendimento[chatId]}`); // Adicionamos o estado ao log




    // Passo 1: Solicitar CPF
    if (!estadosAtendimento[chatId]) {
        await msg.reply('Olá prezado(a)! Em que podemos ajudar? Para agilizar seu processo, por gentileza, informe seu CPF no formato: 00000000000.');
        estadosAtendimento[chatId] = 'aguardando_cpf';
        return;
    }




    // Passo 2: Verificar CPF (simplesmente avançar para o menu por enquanto)
    if (estadosAtendimento[chatId] === 'aguardando_cpf') {
        // Aqui você pode adicionar uma lógica de validação de CPF se necessário
        await msg.reply(`CPF correto. Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
        estadosAtendimento[chatId] = 'menu_principal';
        return;
    }




    // Passo 3: Lógica do menu principal
    if (estadosAtendimento[chatId] === 'menu_principal') { // MENU PRINCIPAL 0
        if (mensagemCliente === '1') {
            await msg.reply(`Você escolheu Registros e Cadastros. Escolha uma das opções abaixo:\n\n1-Solicitação de registro profissional\n2-Solicitação de interrupção de registro\n3-Solicitação de reativação profissional (inativos)\n4-Protocolo de reativação de registro\n5-Protocolo de registro definitivo ou renovação de provisório\n\n0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'menu_registros';
        } else if (mensagemCliente === '2') {
            await msg.reply(`Você escolheu Emissão de Documentos e Certificações. Escolha uma das opções abaixo:\n\n6-Emissão de certidão de quitação de pessoa física\n7-Emissão de carteira digital\n8-Solicitação de carteira física\n\n0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'menu_documentos';
        } else if (mensagemCliente === '3') {
            await msg.reply(`Você escolheu Atualizações e Inclusões. Escolha uma das opções abaixo:\n\n9-Inclusão de foto\n10-Protocolo de inclusão de especialização técnica\n11-Protocolo de inclusão de título\n12-Protocolo de alteração de endereço\n\n0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'menu_atualizacoes';
        } else if (mensagemCliente === '4') {
            await msg.reply(`Você escolheu Guias, Suporte e Pendências no Pagamento. Escolha uma das opções abaixo:\n\n13-Manual instrutivo para geração de anuidade\n14-Falar com um atendente\n\n0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'menu_pagamentos';
        } else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        } else {
            await msg.reply('Opção inválida. Por favor, digite um número de 1 a 4 para continuar.');
        }
        return;
    }




    // Passo 4: Lógica para os submenus (vamos adicionar isso gradualmente)


    // MENU REGISTROS 1


    if (estadosAtendimento[chatId] === 'menu_registros') {
       
        // Lógica para as opções de Registros e Cadastros
        //DIGITO 1


        if (mensagemCliente === '1') {
            await msg.reply(`SOLICITAÇÃO DE REGISTRO PROFISSIONAL\n\n` +
        `Entre no site: [https://corporativo.sinceti.net.br/app/view/sight/externo.php?form=CadastrarProfissional](https://corporativo.sinceti.net.br/app/view/sight/externo.php?form=CadastrarProfissional) e preencha o formulário, sendo obrigatório o preenchimento nos espaços que conterem um asterisco vermelho. Segue abaixo os documentos necessários para solicitação de Registro Profissional:\n\n` +
        `1. Diploma ou certificado do ensino técnico;\n` +
        `2. Histórico do ensino técnico com indicação das cargas horárias cursadas;\n` +
        `3. RG (frente e verso)\n` +
        `4. CPF (frente e verso)\n` +
        `5. Comprovantes de endereço atualizado ou declaração de residência;\n` +
        `6. Foto 3x4, de preferência de fundo branco;\n` +
        `7. Título de eleitor (frente e verso)\n` +
        `8. Prova de quitação com a Justiça Eleitoral (Certidão de quitação eleitoral)\n` +
        `9. Prova de quitação com o Serviço Militar (sexo masculino).\n\n` +
        `Obs.: anexar os documentos digitalizados em PDF ou JPG individualmente.\n\n` +
        `Colocar um e-mail e no final gerar o boleto de análise de registo.\n\n` +
        `Após 24h do pagamento, ao constar no sistema, a sua solicitação é enviada para ser analisada.\n\n` +
        `0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'aguardando_retorno_registros'; // Novo estado para lidar com o "0"
        }


        //DIGITO 2
       
            else if(mensagemCliente === '2'){
            await msg.reply(`Para solicitar a INTERRUPÇÃO DE REGISTRO proceda da seguinte forma:\n\n` +
        `1. Acesse seu ambiente de serviços no SINCETI; [https://servicos.sinceti.net.br/](https://servicos.sinceti.net.br/)\n\n` +
        `2. Selecione a opção PROTOCOLOS, em seguida CADASTRAR;\n\n` +
        `3. Em GRUPO DE ASSUNTO escolha a opção PROFISSIONAL;\n\n` +
        `4. Em ASSUNTO, vá até a opção SOLICITAÇÃO DE INTERRUPÇÃO DE REGISTRO PROFISSIONAL;\n\n` +
        `5. Em DESCRIÇÃO DO PROTOCOLO, descreva os motivos pelos quais deseja solicitar a interrupção do registro;\n\n` +
        `6. Em DOCUMENTOS ANEXOS, clique em NOVO ARQUIVO, em seguida anexe um documento comprobatório que informe que você não possui atividade laborativa compatível com a área técnica (declaração de não ocupação de cargo ou atividade na área de sua formação técnica profissional, constando nome completo e CPF, assinada pelo requerente e datada).\n\n` +
        `7. Por fim, clique em CADASTRAR.\n\n` +
        `0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'aguardando_retorno_registros';




        }


        //DIGITO 3
       
        else if(mensagemCliente === '3'){
            await msg.reply(`SOLICITAÇÃO DE REATIVAÇÃO PROFISSIONAL (INATIVOS)\n\n` +
        `1. Acesse seu ambiente de serviços no SINCETI; [https://servicos.sinceti.net.br/](https://servicos.sinceti.net.br/)\n\n` +
        `2. Selecione a opção PROTOCOLOS, em seguida CADASTRAR;\n\n` +
        `3. Em GRUPO DE ASSUNTO escolha a opção PROFISSIONAL;\n\n` +
        `4. Em ASSUNTO, vá até a opção REATIVAÇÃO DE REGISTRO - PROFISSIONAL INATIVO ;\n\n` +
        `5. Em DESCRIÇÃO DO PROTOCOLO, descreva os motivos pelos quais deseja solicitar a reativação de registro.\n\n` +
        `6. selecione a opção “Declaro, sob as penas da Lei, serem verdadeiras as informações aqui declaradas”\n\n` +
        `7. Se precisar anexar mais de um documento, clique em "NOVO ARQUIVO" que encontra-se localizado acima do campo "responder de responder despacho".\n\n` +
        `Aconselhamos para fins de atualização de dados cadastrais, encaminhar os seguintes documentos no protocolo:\n\n` +
        `1. RG;\n\n` +
        `2. CPF;\n\n` +
        `3. Comprovantes de endereço atualizado ou declaração de residência;\n\n` +
        `4. Foto 3x4, de preferência de fundo branco;\n\n` +
        `5. Título de eleitor;\n\n` +
        `6. Prova de quitação com a Justiça Eleitoral (comprovante de votação ou certidão de quitação eleitoral).\n\n` +
        `0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'aguardando_retorno_registros';




        }


        //DIGITO 4
       
        else if(mensagemCliente === '4'){
            await msg.reply(`PROTOCOLO DE REATIVAÇÃO DE REGISTRO.\n\n` +
        `1. Acesse seu ambiente de serviços no SINCETI; [https://servicos.sinceti.net.br/](https://servicos.sinceti.net.br/)\n\n` +
        `2. Na parte superior da sua tela vai a protocolos > CADASTRAR;\n\n` +
        `3. GRUPO DE ASSUNTO: profissional;\n\n` +
        `4. ASSUNTO: Reativação de Registro–Profissional;\n\n` +
        `5. Em DESCRIÇÃO DO PROTOCOLO, descreva os motivos pelos quais deseja solicitar a reativação de registro;\n\n` +
        `6. Selecione a opção “Declaro, sobre as penas da Lei, serem verdadeiras as informações aqui declaradas”\n\n` +
        `7. CADASTRAR.\n\n` +
        `**OBS.:** Realize o pagamento do seu boleto referente a taxa de análise de Registro no valor de R$63,83 (Lembrando que o prazo para compensação de boleto é de 24 a 72 horas).\n\n` +
        `0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'aguardando_retorno_registros';




        }


        //DIGITO 5
       
        else if(mensagemCliente === '5'){
                    await msg.reply(`PROTOCOLO DE REGISTRO DEFINITIVO OU RENOVAÇÃO DE PROVISÓRIO.\n\n`+
       `**Acesse seu ambiente de serviços no SINCETI: [https://servicos.sinceti.net.br/](https://servicos.sinceti.net.br/)\n\n` +
        `2. **Na parte superior da sua tela, vá em:** protocolos > CADASTRAR\n\n` +
        `3. **GRUPO DE ASSUNTO:** profissional\n\n` +
        `4. **ASSUNTO:**\n\n` +
        `-Solicitação de Registro Definitivo (caso haja diploma e histórico)\n\n` +
        `- renovação de registro provisório (caso haja declaração de conclusão de curso e histórico)\n\n` +
        `5. **Em DESCRIÇÃO DO PROTOCOLO, descreva os motivos pelos quais deseja solicitar o Registro Definitivo ou Renovação do Provisório.**\n\n` +
        `6. **Selecione a opção:** “Declaro, sobre as penas da Lei, serem verdadeiras as informações aqui declaradas”\n\n` +
        `7. **Clique em:** "NOVO ARQUIVO" (localizado acima do campo "CADASTRAR")\n\n` +
        `8. **Anexe a documentação solicitada.**\n\n` +
        `9. **Cadastrar.**\n\n` +
        `0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'aguardando_retorno_registros';




        }
       
       //RETORNO PARA O MENU PRINCIPAL
       //Nota_1= o dígito 0 deve retornar para o menu de registros
       
        else if (mensagemCliente === '0') {
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        } else {
            await msg.reply('Opção inválida. Por favor, digite um número de 0 a 5.');
        }
        return;
    }


    //MENU DOCUMENTOS




    if (estadosAtendimento[chatId] === 'menu_documentos') {


        //DIGITO 6
        //Nota_1= os dígitos do menu poderiam sr iniciados em 1 para facilitar.


        if (mensagemCliente === '6') {//EMISSÃO DE CERTIDÃO DE QUITAÇÃO DE PESSOA FÍSICA
            await msg.reply(`EMISSÃO DE CERTIDÃO DE QUITAÇÃO DE PESSOA FÍSICA:\n\n1. Acesse seu ambiente de serviços no SINCETI; https://servicos.sinceti.net.br/\n2. Selecione a opção CERTIDÕES em seguida SOLICITAR CERTIDÃO;\n3. Tipo de Certidão: Certidão de quitação de pessoa física;\n4. Confirme as suas informações;\n5. Preencha o código de segurança;\n6. Cadastrar...\n7 Selecione novamente a opção (Certidão de quitação de pessoa física) e ficará disponível a opção IMPRIMIR.\n\n0-Voltar para o menu anterior`);
            estadosAtendimento[chatId] = 'aguardando_retorno_documentos';
        } else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        } else {
            await msg.reply('Opção inválida. Por favor, digite um número de 0 ou 6 a 8.');
        }
        return;
    }


    //DIGITO 7


    if (estadosAtendimento[chatId] === 'documentos'){//EMISSÃO DE CARTEIRA DIGITAL
        if (mensagemCliente == '7'){
            await msg.reply(`EMISSÃO DE CARTEIRA DIGITAL:\n\n
                                1. Acesse seu ambiente de serviços no SINCETI; https://servicos.sinceti.net.br/ /n/n
                                2. Selecione a opção IMPRESSÃO DE CARTEIRA. \n\n
                                0-Voltar para o menu anterior \n\n`);
            estadosAtendimento[chatId] = 'aguardando_retorno_atualizacoes';
        }else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        }
    }


    //DIGITO 8


     if (estadosAtendimento[chatId] === 'menu_documentos'){//SOLICITAÇÃO DE CARTEIRA FÍSICA
        if (mensagemCliente == '7'){
            await msg.reply(`SOLICITAÇÃO DE CARTEIRA FÍSICA:\n\n
                                1. Acesse seu ambiente de serviços no SINCETI; https://servicos.sinceti.net.br/ \n\n
                                2. Na parte superior da sua tela vai a protocolos > CADASTRAR; \n\n
                                3. GRUPO DE ASSUNTO: profissional; \n\n
                                4. ASSUNTO: opção de solicitação de carteira profissional; \n\n
                                5. DESCRIÇÃO DO PROTOCOLO: “Solicito a emissão da carteira profissional junto ao crt02”. \n\n
                                0-Voltar para o menu anterior \n\n`);
            estadosAtendimento[chatId] = 'aguardando_retorno_atualizacoes';
        }else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        }
    }


        //DIGITO 9


       if (estadosAtendimento[chatId] === 'menu_atualizações'){//Inclusão de foto
        if (mensagemCliente == '9'){
            await msg.reply(`INCLUSÃO DE FOTO\n\n
                            1. Acesse seu ambiente de serviços no SINCETI; https://servicos.sinceti.net.br/ \n\n
                            2. Na parte superior da sua tela vai a protocolos > CADASTRAR; \n\n
                            3. GRUPO DE ASSUNTO: profissional; \n\n
                            4. ASSUNTO: selecione a opção de inclusão de foto; \n\n
                            5. DESCRIÇÃO DO PROTOCOLO: “Solicito a inclusão de foto para emissão de carteira”; \n\n
                            6. Anexe dois documentos (FOTO 3X4 e RG ou CNH). \n\n
                            0-Voltar para o menu anterior \n\n`);
            estadosAtendimento[chatId] = 'aguardando_retorno_atualizacoes';
        }else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        }
    }
   


    //DIGITO 10
       if (estadosAtendimento[chatId] === 'menu_atualizações'){//Inclusão de especialização técnica
        if (mensagemCliente == '10'){
                    await msg.reply(`PROTOCOLO DE INCLUSÃO DE ESPECIALIZAÇÃO TÉCNICA \n\n
                                    1. Acesse seu ambiente de serviços no SINCETI; https://servicos.sinceti.net.br/ \n\n
                                    2. Na parte superior da sua tela vai a protocolos > CADASTRAR \n\n
                                    3. GRUPO DE ASSUNTO: profissional \n\n
                                    4. ASSUNTO: selecione a opção de “inclusão de especialização técnica” \n\n
                                    5. DESCRIÇÃO DO PROTOCOLO: “Solicito a inclusão de minha especialização técnica ao registro profissional”. \n\n                                    6. Selecione a opção “Declaro, sobre as penas da Lei, serem verdadeiras as informações aqui declaradas”
                                    7. Clique em "NOVO ARQUIVO" que encontra-se localizado acima do campo "CADASTRAR". \n\n
                                    8. Anexe os documentos solicitados (Diploma e Histórico) \n\n
                                    0-Voltar para o menu anterior \n\n`);
            estadosAtendimento[chatId] = 'aguardando_retorno_atualizacoes';
        }else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        }
    }




      //DIGITO 11 PROTOCOLO DE INCLUSAO DE TÍTULO


       if (estadosAtendimento[chatId] === 'menu_atualizações'){//Inclusão de título
        if (mensagemCliente == '11'){
                    await msg.reply(`PROTOCOLO INCLUSÃO DE TÍTULO: \n\n
                                    1. Acesse seu ambiente de serviços no SINCETI; https://servicos.sinceti.net.br/ \n\n
                                    2. Na parte superior da sua tela vai a protocolos > CADASTRAR \n\n
                                    3. GRUPO DE ASSUNTO: profissional \n\n
                                    4. ASSUNTO: selecione a opção de inclusão de Título \n\n
                                    5. DESCRIÇÃO DO PROTOCOLO: “Solicito a inclusão de título em meu registro profissional” \n\n
                                    6. Selecione a opção “Declaro, sobre as penas da Lei, serem verdadeiras as informações aqui declaradas” \n\n
                                    7. clique em "NOVO ARQUIVO" que encontra-se localizado acima do campo "CADASTRAR". \n\n
                                    8. Anexe os documentos solicitados (Diploma e Histórico) \n\n
                                    OBS.: O profissional deve estar ADIMPLENTE para essa solicitação… \n\n
                                    0-Voltar para o menu anterior \n\n`);
            estadosAtendimento[chatId] = 'aguardando_retorno_atualizacoes';
        }else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        }
    }


    //DIGITO 12 ALTERAÇÃO DE ENDEREÇO
     
       if (estadosAtendimento[chatId] === 'menu_atualizações'){//Protocolo de alteração de endereço
        if (mensagemCliente == '12'){
                    await msg.reply(``);
            estadosAtendimento[chatId] = 'aguardando_retorno_atualizacoes';
        }else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        }
    }
   
    //DIGITO 13






     if (estadosAtendimento[chatId] === 'menu_pagamentos') {//MENU PAGAMENTOS 2
        console.log(`Entrou no estado menu_pagamentos. Mensagem do cliente: ${mensagemCliente}`); // Adicionamos este log específico




        if (mensagemCliente === '13') {
            await msg.reply(`Manual Instrutivo para Geração de Anuidade \n\n
                                Este manual tem como objetivo orientar o usuário sobre como acessar e utilizar o sistema para gerar anuidades. \n\n
                                *Passo 1: Acesso ao Sistema* \n\n
                                1. Acesse o sistema utilizando seu CPF e senha pessoal, através do link: https://servicos.sinceti.net.br/ \n\n
                                *Passo 2: Navegação para a Geração de Anuidade* \n\n
                                2. No canto superior da tela, localize e clique na aba ou menu denominado "Financeiro". \n\n
                                *Passo 3: Seleção da Opção Anuidade* \n\n
                                3. Dentro do menu Financeiro, encontre e selecione a opção específica para "Anuidade". \n\n
                                *Passo 4: Escolha dos Anos em Aberto* \n\n
                                4. Na página de Anuidade, selecione os anos referentes às anuidades em aberto. \n\n
                                *Passo 5: Aceitação do Termo de Compromisso* \n\n
                                5. Antes de prosseguir, é necessário concordar com o termo de compromisso relacionado à geração das anuidades. \n\n
                                *Passo 6: Realização de Simulações e Seleção de Parcelas* \n\n
                                6. Realize simulações conforme necessário e escolha o padrão de parcelas que melhor atenda às suas necessidades. ( informamos que caso haja juros e multa ou taxa em sua simulação, haverá acréscimos de acordo com a quantidade de parcelas escolhidas.) \n\n
                                *Passo 7: Geração da Anuidade* \n\n
                                7. Após escolher o padrão de parcelas desejado, clique na opção "Gerar Anuidade" para finalizar o processo. \n\n
                                *Observações Finais:* \n\n
                                - Certifique-se de revisar todas as informações inseridas antes de confirmar a geração da anuidade. \n\n
                                - A data de vencimento dos boletos ficarão definidas para o último dia do mês de cada parcela. \n\n
                                - Em caso de dúvidas ou problemas técnicos, entre em contato com o suporte técnico responsável. \n\n
                                Este manual visa facilitar o processo de geração de anuidades no sistema, proporcionando uma experiência clara e eficiente para o usuário. \n\n  
                                0-Voltar para o menu anterior\n\n`);
            estadosAtendimento[chatId] = 'aguardando_retorno_pagamentos';
        } else if (mensagemCliente === '14') {
             await msg.reply(`Manual Instrutivo para Geração de Anuidade...\n\n0-Voltar para o menu anterior`);//ATENÇÃO AQUI É ALGO PARA PREENCHER O CÓDIGO
            estadosAtendimento[chatId] = 'aguardando_retorno_pagamentos';
        } else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        } else {
            await msg.reply('Opção inválida. Por favor, digite 0, 13 ou 14.');
        }
        return;
    }


      //DIGITO 14 FALAR COM UM ATENDENTE


       if (estadosAtendimento[chatId] === 'menu_pagamentos'){//FALAR COM UM ATENDENTE
        if (mensagemCliente == '14'){
                    await msg.reply(`Aguarde alguns instantes que um atendente irá prosseguir com o seu atendimento. `);
            estadosAtendimento[chatId] = 'aguardando_retorno_atualizacoes';
        }else if (mensagemCliente === '0') { //RETORNO PARA O MENU PRINCIPAL
            await msg.reply(`Segue as opções abaixo:\n\n1. Registros e Cadastros\n2. Emissão de Documentos e Certificações\n3. Atualizações e Inclusões\n4. Guias, Suporte e Pendências no Pagamento\n\nDigite um número para continuarmos`);
            estadosAtendimento[chatId] = 'menu_principal';
        }
    }


    // Adicione mais lógica para os outros menus (menu_atualizacoes, menu_pagamentos) e para o retorno ao menu anterior (0)




    // Passo 5: Opção inválida (se o estado for conhecido e a mensagem não corresponder a nenhuma opção)
    if (estadosAtendimento[chatId] && estadosAtendimento[chatId] !== 'aguardando_cpf') {
        // Se chegamos aqui e o estado é conhecido, mas não há lógica específica para a mensagem
        // e não é o estado inicial de aguardando CPF.
        const estadosValidos = ['menu_principal', 'menu_registros', 'menu_documentos', 'menu_atualizacoes', 'menu_pagamentos', 'aguardando_retorno_registros', 'aguardando_retorno_documentos'];
        if (estadosValidos.includes(estadosAtendimento[chatId])) {
            await msg.reply('Opção inválida. Por favor, escolha uma das opções disponíveis.');
        }
    }
});




client.initialize();




const atendimentoEmAndamento = {};
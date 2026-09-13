# OnFocus — AppMobile (Cliente Nativo do Estudante)

Este diretório contém a base de código do cliente nativo Android do **OnFocus**, desenvolvido para execução nos smartphones dos estudantes em sala de aula.

---

## 📱 Visão Geral da Arquitetura

- **[`app.jsx`](file:///home/guilherme/Documents/repos/Hackthon-ultimaHora/AppMobile/app.jsx)**: Representa a implementação cliente para dispositivos móveis (React Native / Android).
  - **Fluxo do Estudante**:
    1. **Standby**: Tela de repouso aguardando leitura do QR Code dinâmico da sala.
    2. **Check-in & Assinatura ECDSA**: Validação criptográfica do QR Code efêmero com chave pública da instituição e verificação do BSSID Wi-Fi da escola.
    3. **Launcher Pedagógico (Whitelist)**: Restrição amigável de tela, exibindo apenas os aplicativos autorizados pelo professor para a aula (ex: GeoGebra, Calculadora).
    4. **Privacidade por Design (LGPD)**: Verificação estrita apenas do pacote em primeiro plano (*Foreground Package Check*), sem captura de tela, leitura de arquivos privados, mensagens ou fotos do aluno.
    5. **Checkout & Término**: Desbloqueio seguro e retorno ao uso pessoal do smartphone mediante encerramento da aula ou QR de saída.

---

## 💻 Demonstração Rápida no Pitch do Hackathon (Simulador Web)

Para fins de avaliação prática, demonstração em tempo real e facilidade de apresentação durante o Hackathon sem dependência de emuladores móveis pesados, a plataforma OnFocus conta com um **simulador interativo espelhado** integrado à aplicação web do Gestor:

- **Rota do Simulador**: [`http://localhost:3000/mobile`](file:///home/guilherme/Documents/repos/Hackthon-ultimaHora/Gestor/src/app/mobile/page.tsx)
- **Componentes do Simulador**: Localizados em [`Gestor/src/components/mobile/`](file:///home/guilherme/Documents/repos/Hackthon-ultimaHora/Gestor/src/components/mobile/)
- **Identidade Visual**: Totalmente alinhada com as cores oficiais do Pitch Deck (Deep Navy `#0a0f1e` e Ciano `#22d3ee`).

---

## 🔗 Relação entre Módulos

| Diretório | Finalidade | Ambiente |
| :--- | :--- | :--- |
| `AppMobile/` | Cliente nativo de referência do estudante | React Native / Android OS |
| `Gestor/` | Painel web administrativo do professor e coordenador | Next.js 14 (App Router) |
| `Gestor/src/app/mobile` | Simulador web interativo do cliente mobile | Navegador Web (Demo do Pitch) |

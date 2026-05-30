import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './LegalPages.css';

export default function Privacy() {
  return (
    <div className="legal-layout">
      <div className="legal-container max-width-container">
        <Link to="/" className="legal-back-link">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
        
        <header className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Última atualização: 25 de Maio de 2026</p>
        </header>

        <section className="legal-content glass-panel">
          <h2>1. Compromisso com a Privacidade</h2>
          <p>
            A sua privacidade é de extrema importância para nós. No Post Recap (disponível em <strong>animesrecaps.me</strong>), é nossa política respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site Post Recap e outros sites que possuímos e operamos.
          </p>

          <h2>2. Coleta e Uso de Informações</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer o serviço (como criar sua conta via Firebase Auth e autenticar suas contas de mídias sociais). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
          </p>
          <ul>
            <li><strong>Firebase Authentication:</strong> Quando você faz login com o Google ou e-mail, coletamos seu endereço de e-mail e nome público de exibição para criar seu perfil de usuário.</li>
            <li><strong>TikTok API Data:</strong> Quando você conecta seu TikTok, solicitamos autorização via OAuth 2.0. Armazenamos de forma segura o <code>access_token</code> de teste e lemos apenas o seu nome de usuário (display name) e o link para a imagem do seu avatar para exibir no painel. Não lemos ou armazenamos mensagens, contatos ou informações privadas não autorizadas.</li>
            <li><strong>Instagram/Meta API Data:</strong> Da mesma forma, utilizamos tokens autorizados exclusivamente para realizar o agendamento e a publicação de Reels que você expressamente solicita.</li>
          </ul>

          <h2>3. Retenção e Segurança dos Dados</h2>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados. Os tokens de acesso são armazenados de forma criptografada em nosso banco de dados.
          </p>

          <h2>4. Compartilhamento de Dados</h2>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei ou quando estritamente necessário para concluir as solicitações de publicação feitas por você nas APIs do TikTok e Instagram.
          </p>

          <h2>5. Direitos do Usuário e Exclusão de Dados (Data Deletion)</h2>
          <p>
            Você é livre para recusar a nossa solicitação de informações pessoais ou de tokens de mídia social, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
          </p>
          <p>
            Em conformidade com as diretrizes do TikTok e do Instagram, oferecemos a você o direito total de desvincular suas contas e apagar todos os dados de forma instantânea:
          </p>
          <ul>
            <li>Para desvincular seu TikTok, clique no botão <strong>"Desconectar"</strong> no painel de controle do seu Dashboard. Isso apagará imediatamente o token de acesso de nosso banco de dados local.</li>
            <li>Para solicitar a exclusão total da sua conta do Post Recap e todos os dados associados a ela, envie um e-mail com a solicitação para o nosso suporte através do site. Processaremos a exclusão em até 48 horas.</li>
          </ul>

          <h2>6. Consentimento</h2>
          <p>
            O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
          </p>
        </section>
      </div>
    </div>
  );
}

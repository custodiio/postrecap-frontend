import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import './LegalPages.css';

export default function Privacy() {
  const [lang, setLang] = useState('en'); // Default to English for reviewers

  return (
    <div className="legal-layout">
      <div className="legal-container max-width-container">
        <div className="legal-top-nav">
          <Link to="/" className="legal-back-link">
            <ArrowLeft size={16} /> {lang === 'en' ? 'Back to Home' : 'Voltar para Home'}
          </Link>
          
          <div className="language-selector glass-panel">
            <Globe size={14} className="lang-icon" />
            <button 
              onClick={() => setLang('en')} 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('pt')} 
              className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
            >
              Português
            </button>
          </div>
        </div>
        
        <header className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">
            {lang === 'en' ? 'Last Updated: June 14, 2026' : 'Última atualização: 14 de Junho de 2026'}
          </p>
        </header>

        {lang === 'en' ? (
          <section className="legal-content glass-panel">
            <h2>1. Privacy Commitment</h2>
            <p>
              Your privacy is of utmost importance to us. At Post Recap (available at <strong>postrecap.tech</strong>), it is our policy to respect your privacy regarding any information we may collect across our website and other sites we own and operate.
            </p>

            <h2>2. Information We Collect and Access</h2>
            <p>
              We only request personal information when we truly need it to provide a functional service to you (such as creating your account via Firebase Auth or connecting your social media channels). We collect it by fair and lawful means, with your knowledge and consent.
            </p>
            <ul>
              <li>
                <strong>Firebase Authentication:</strong> When you sign up or log in using Email or Google OAuth, we collect your email address, display name, and profile picture URL to establish your user identity in our database.
              </li>
              <li>
                <strong>TikTok Developer Platform API:</strong> When you connect your TikTok account, you grant permissions via the official TikTok OAuth 2.0 authorization screen. We securely store the temporary <code>access_token</code> and use it solely to publish and schedule the videos you choose, and retrieve basic profile information (such as display name and avatar image) to personalize your dashboard. We do not read or store private messages, contacts, or unauthorized user data.
              </li>
              <li>
                <strong>Instagram / Meta Graph API:</strong> Similarly, we request and store authorized page/user access tokens exclusively to automate the publishing and scheduling of Reels content that you actively submit to our interface.
              </li>
              <li>
                <strong>Google &amp; YouTube Data API:</strong> When you connect your YouTube channel, you grant permissions via the official Google OAuth 2.0 screen. We request access to the minimum required scopes: upload permission (to publish videos) and read-only permission (to retrieve your channel name and avatar for display on your dashboard). Our use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </li>
            </ul>

            <h2>3. Advanced Data Security & Token Encryption</h2>
            <p>
              We prioritize the protection of your digital assets. All sensitive database records, including TikTok, Instagram, and YouTube OAuth access tokens, are encrypted at rest using industry-standard AES-256 encryption.
            </p>
            <p>
              Furthermore, to maintain a strict stateless architecture and avoid data accumulation:
            </p>
            <ul>
              <li>
                <strong>Video Files Processing:</strong> Any video file you upload to our platform is stored temporarily on our isolated backend server disk.
              </li>
              <li>
                <strong>Immediate Deletion:</strong> The moment the video is successfully published to TikTok, Instagram, or YouTube via the official APIs (or scheduled upload process finishes), the source video file is permanently and irreversibly purged from our servers.
              </li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>
              We do not share any personally identifying information publicly or with third parties, except when required to do so by law, or when absolutely necessary to transmit video files and captions to the official APIs of TikTok, Instagram, and YouTube to fulfill your publishing requests.
            </p>

            <h2>5. Your Rights and Data Deletion (Instructions)</h2>
            <p>
              You are free to refuse our request for personal information or social media API tokens, with the understanding that we may be unable to provide you with some of your desired services.
            </p>
            <p>
              In compliance with TikTok, Meta (Instagram), and Google (YouTube) Platform Policies, we provide you with the absolute right to revoke API permissions and request the deletion of your account and all associated data at any time:
            </p>
            <ul>
              <li>
                <strong>Revoking TikTok Access:</strong> You can disconnect your TikTok account directly from our dashboard by clicking the <strong>"Disconnect"</strong> button in the Channels section. Additionally, you can revoke access at any time through your official TikTok account settings: Go to <strong>Settings &rarr; Security and Login &rarr; Manage App Access</strong>, locate Post Recap, and click <strong>Remove</strong>.
              </li>
              <li>
                <strong>Revoking Instagram/Meta Access:</strong> You can disconnect your Instagram page from our interface, or manage permissions directly on your Facebook settings page under <strong>Settings &amp; Privacy &rarr; Business Integrations</strong>.
              </li>
              <li>
                <strong>Revoking Google/YouTube Access:</strong> You can disconnect your YouTube channel directly from our dashboard by clicking the <strong>"Disconnect"</strong> button. You can also revoke access at any time through your Google Security settings page at <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Third-party apps with account access</a>.
              </li>
              <li>
                <strong>Full Data Deletion:</strong> If you wish to permanently delete your Post Recap account and purge all your personal data, tokens, and records from our databases, please send an email request to our support at: <a href="mailto:contato@postrecap.tech">contato@postrecap.tech</a>. We will process your deletion request and confirm the purging of all data within 48 hours.
              </li>
            </ul>

            <h2>6. User Consent</h2>
            <p>
              Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
            </p>
          </section>
        ) : (
          <section className="legal-content glass-panel">
            <h2>1. Compromisso com a Privacidade</h2>
            <p>
              A sua privacidade é de extrema importância para nós. No Post Recap (disponível em <strong>postrecap.tech</strong>), é nossa política respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site Post Recap e outros sites que possuímos e operamos.
            </p>

            <h2>2. Coleta e Uso de Informações</h2>
            <p>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer o serviço (como criar sua conta via Firebase Auth e autenticar suas contas de mídias sociais). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
            </p>
            <ul>
              <li>
                <strong>Firebase Authentication:</strong> Quando você faz login com o Google ou e-mail, coletamos seu endereço de e-mail, nome público de exibição e foto de perfil para criar seu perfil de usuário no sistema.
              </li>
              <li>
                <strong>TikTok API Data:</strong> Quando você conecta seu TikTok, solicitamos autorização via OAuth 2.0. Armazenamos de forma segura o <code>access_token</code> e lemos apenas o seu nome de usuário (display name) e o link para a imagem do seu avatar para exibir no painel. Esses tokens são usados estritamente para realizar a publicação de vídeos autorizada por você. Não lemos ou armazenamos mensagens, contatos ou informações privadas.
              </li>
              <li>
                <strong>Instagram/Meta API Data:</strong> Da mesma forma, utilizamos tokens autorizados de páginas exclusivamente para realizar o agendamento e a publicação de Reels que você expressamente solicita.
              </li>
              <li>
                <strong>Google &amp; YouTube API Data:</strong> Quando você conecta seu canal do YouTube, solicitamos autorização via OAuth 2.0 do Google. Nós solicitamos permissão para fazer uploads de vídeos e para ler informações públicas básicas do seu canal (nome e imagem do avatar para exibir no dashboard). Nossa utilização e transferência de informações recebidas de APIs do Google para qualquer outro aplicativo estarão em total conformidade com a <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, incluindo os seus requisitos de Uso Limitado.
              </li>
            </ul>

            <h2>3. Segurança de Dados Avançada & Criptografia de Tokens</h2>
            <p>
              Priorizamos a proteção dos seus ativos digitais. Todos os registros confidenciais do banco de dados, incluindo tokens de acesso OAuth do TikTok, Instagram e YouTube, são criptografados em repouso usando criptografia AES-256 padrão da indústria.
            </p>
            <p>
              Além disso, para manter uma arquitetura stateless estrita e evitar o acúmulo de dados confidenciais:
            </p>
            <ul>
              <li>
                <strong>Processamento de Arquivos de Vídeo:</strong> Qualquer arquivo de vídeo que você envia para nossa plataforma é armazenado de forma estritamente temporária em nosso servidor backend isolado.
              </li>
              <li>
                <strong>Exclusão Imediata:</strong> No momento em que o vídeo é publicado no TikTok, Instagram ou YouTube via APIs oficiais (ou o envio agendado é concluído), o arquivo de vídeo original é apagado de forma definitiva e irreversível dos nossos servidores.
              </li>
            </ul>

            <h2>4. Compartilhamento de Dados</h2>
            <p>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei ou quando estritamente necessário para concluir as solicitações de publicação feitas por você nas APIs oficiais do TikTok, Instagram e YouTube.
            </p>

            <h2>5. Direitos do Usuário e Exclusão de Dados (Instruções)</h2>
            <p>
              Você é livre para recusar a nossa solicitação de informações pessoais ou de tokens de mídia social, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
            </p>
            <p>
              Em conformidade com as diretrizes do TikTok, Instagram e Google (YouTube), oferecemos a você o direito total de desvincular suas contas e apagar todos os dados de forma instantânea:
            </p>
            <ul>
              <li>
                <strong>Desvincular TikTok:</strong> Clique no botão <strong>"Desconectar"</strong> no painel de controle do seu Dashboard. Isso apagará imediatamente o token de acesso de nosso banco de dados. Você também pode revogar a permissão no próprio TikTok acessando: <strong>Configurações &rarr; Segurança e Login &rarr; Gerenciar acesso de aplicativos</strong>, localize o Post Recap e clique em <strong>Remover</strong>.
              </li>
              <li>
                <strong>Desvincular Instagram:</strong> A desconexão pode ser feita em nosso painel ou gerenciando suas integrações de negócios em sua conta do Facebook em <strong>Configurações e Privacidade &rarr; Integrações de Empresas</strong>.
              </li>
              <li>
                <strong>Desvincular Google/YouTube:</strong> A desconexão pode ser feita no nosso painel. Além disso, você pode revogar as permissões a qualquer momento através das configurações de segurança do Google em <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Aplicativos de terceiros com acesso à conta</a>.
              </li>
              <li>
                <strong>Exclusão Completa dos Dados:</strong> Para solicitar a exclusão total da sua conta do Post Recap e todos os dados associados a ela, envie um e-mail com a solicitação para o nosso suporte: <a href="mailto:contato@postrecap.tech">contato@postrecap.tech</a>. Processaremos a exclusão em até 48 horas.
              </li>
            </ul>

            <h2>6. Consentimento</h2>
            <p>
              O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

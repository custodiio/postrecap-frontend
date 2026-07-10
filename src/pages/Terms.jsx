import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import './LegalPages.css';

export default function Terms() {
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
          <h1>Terms of Service</h1>
          <p className="last-updated">
            {lang === 'en' ? 'Last Updated: June 14, 2026' : 'Última atualização: 14 de Junho de 2026'}
          </p>
        </header>

        {lang === 'en' ? (
          <section className="legal-content glass-panel">
            <h2>1. Terms of Use</h2>
            <p>
              By accessing the website <strong>postrecap.tech</strong> (hereinafter referred to as "Post Recap"), you agree to comply with these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2>2. License of Use</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Post Recap's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
            </p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose or for public display (commercial or non-commercial) outside the provided features of the service;</li>
              <li>Attempt to decompile or reverse engineer any software contained on Post Recap's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or 'mirror' the materials on any other server.</li>
            </ul>

            <h2>3. Third-Party Integrations and APIs</h2>
            <p>
              Post Recap integrates with official third-party APIs, including the <strong>TikTok Developer Platform (TikTok API)</strong>, <strong>Meta for Developers (Instagram Graph API)</strong>, and <strong>Google API Services (YouTube Data API)</strong>.
            </p>
            <p>
              Our application requests specific API scopes to provide social media automation services:
            </p>
            <ul>
              <li>
                <strong>TikTok API Integration:</strong> To publish and schedule video content, we request the <code>video.upload</code>, <code>video.publish</code>, and <code>user.info.basic</code> permissions. All actions are subject to the <a href="https://www.tiktok.com/legal/page/v2/terms-of-service/en" target="_blank" rel="noopener noreferrer">TikTok Terms of Service</a> and TikTok Developer Policies.
              </li>
              <li>
                <strong>Instagram Graph API Integration:</strong> To schedule and publish Reels content, we request the <code>instagram_basic</code> and <code>instagram_content_publish</code> permissions. All actions are subject to the <a href="https://help.instagram.com/581076165575477" target="_blank" rel="noopener noreferrer">Instagram Terms of Use</a> and Meta Platform Terms.
              </li>
              <li>
                <strong>YouTube API Integration:</strong> To schedule and publish video content, we request the <code>youtube.upload</code> and <code>youtube.readonly</code> permissions. By using our YouTube integration, you agree to be bound by the official <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube Terms of Service (ToS)</a> and Google Terms of Service.
              </li>
            </ul>

            <h2>4. User Content & Intellectual Property</h2>
            <p>
              You retain all ownership rights and intellectual property rights in the video files, scripts, text, and graphics that you upload and publish through Post Recap. Post Recap does not claim any ownership over your content.
            </p>
            <p>
              However, by using our publishing services, you represent and warrant that:
            </p>
            <ul>
              <li>You own or have the necessary licenses, rights, consents, and permissions to distribute the uploaded media content;</li>
              <li>The content does not infringe the copyrights, patents, trademarks, trade secrets, or other proprietary rights of any third party;</li>
              <li>The content complies with the community guidelines and terms of service of TikTok and Instagram. Post Recap reserves the right to terminate accounts that repeatedly violate intellectual property rights.</li>
            </ul>

            <h2>5. API Disclaimers & Availability</h2>
            <p>
              Post Recap is an independent tool and is not endorsed, sponsored, or directly affiliated with TikTok, ByteDance, Instagram, or Meta Platforms.
            </p>
            <p>
              Since our service relies heavily on third-party APIs, we cannot guarantee constant, uninterrupted availability of these integrations. Any changes, limitations, or service shutdowns implemented by TikTok or Meta on their developer platforms may affect, limit, or disable certain features of Post Recap immediately and without prior notice.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall Post Recap or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials or services on Post Recap, even if Post Recap or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2>7. Modifications to Terms</h2>
            <p>
              Post Recap may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service.
            </p>

            <h2>8. Contact Support</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us via email at: <a href="mailto:contato@postrecap.tech">contato@postrecap.tech</a>.
            </p>
          </section>
        ) : (
          <section className="legal-content glass-panel">
            <h2>1. Termos de Uso</h2>
            <p>
              Ao acessar o site <strong>postrecap.tech</strong> (doravante denominado "Post Recap"), você concorda em cumprir estes Termos de Serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concorda com algum destes termos, está proibido de usar ou acessar este site.
            </p>

            <h2>2. Licença de Uso</h2>
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Post Recap, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            <ul>
              <li>Modificar ou copiar os materiais;</li>
              <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial) fora das funcionalidades fornecidas pelo serviço;</li>
              <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Post Recap;</li>
              <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
            </ul>

            <h2>3. Integrações de Terceiros e APIs</h2>
            <p>
              O Post Recap integra-se com APIs oficiais de terceiros, incluindo as do <strong>TikTok (TikTok Developer Platform)</strong>, do <strong>Instagram (Meta for Developers)</strong> e do <strong>Google (YouTube Data API)</strong>.
            </p>
            <p>
              Nosso aplicativo solicita escopos específicos de API para fornecer serviços de automação de mídias sociais:
            </p>
            <ul>
              <li>
                <strong>Integração com a API do TikTok:</strong> Para publicar e agendar conteúdos de vídeo, solicitamos as permissões <code>video.upload</code>, <code>video.publish</code> e <code>user.info.basic</code>. Todas as ações estão sujeitas aos <a href="https://www.tiktok.com/legal/page/v2/terms-of-service/pt-BR" target="_blank" rel="noopener noreferrer">Termos de Serviço do TikTok</a> e às Políticas de Desenvolvedor do TikTok.
              </li>
              <li>
                <strong>Integração com a API do Instagram:</strong> Para agendar e publicar Reels, solicitamos as permissões <code>instagram_basic</code> e <code>instagram_content_publish</code>. Todas as ações estão sujeitas aos <a href="https://help.instagram.com/581076165575477" target="_blank" rel="noopener noreferrer">Termos de Uso do Instagram</a> e aos Termos da Plataforma Meta.
              </li>
              <li>
                <strong>Integração com a API do YouTube:</strong> Para publicar e agendar vídeos no YouTube, solicitamos as permissões <code>youtube.upload</code> e <code>youtube.readonly</code>. Ao utilizar a integração com o YouTube em nossa plataforma, você concorda em cumprir e estar vinculado aos <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">Termos de Serviço do YouTube</a> e aos Termos de Serviço do Google.
              </li>
            </ul>

            <h2>4. Conteúdo do Usuário e Propriedade Intelectual</h2>
            <p>
              Você mantém todos os direitos de propriedade intelectual sobre os arquivos de vídeo, legendas, textos e imagens que envia e publica por meio do Post Recap. O Post Recap não reivindica qualquer propriedade sobre o seu conteúdo.
            </p>
            <p>
              No entanto, ao usar nossos serviços de publicação, você declara e garante que:
            </p>
            <ul>
              <li>Você possui ou tem as licenças, direitos, consentimentos e permissões necessários para distribuir o conteúdo de mídia enviado;</li>
              <li>O conteúdo não infringe direitos autorais, patentes, marcas registradas ou outros direitos de propriedade de terceiros;</li>
              <li>O conteúdo está em conformidade com as diretrizes de comunidade e os termos de serviço do TikTok e do Instagram. O Post Recap reserva-se o direito de encerrar contas que infrinjam direitos autorais repetidamente.</li>
            </ul>

            <h2>5. Isenção de Responsabilidade das APIs</h2>
            <p>
              O Post Recap é uma ferramenta independente e não possui endosso, patrocínio ou afiliação direta com o TikTok, ByteDance, Instagram ou Meta Platforms.
            </p>
            <p>
              Como nosso serviço depende fortemente de APIs de terceiros, não garantimos a disponibilidade constante e ininterrupta dessas integrações. Quaisquer alterações, limites ou suspensões de serviço implementados pelo TikTok ou pela Meta em suas plataformas de desenvolvedores podem impactar, limitar ou desativar recursos do Post Recap de forma imediata e sem aviso prévio.
            </p>

            <h2>6. Limitação de Responsabilidade</h2>
            <p>
              Em nenhum caso o Post Recap ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no Post Recap, mesmo que o Post Recap ou um representante autorizado tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
            </p>

            <h2>7. Modificações nos Termos</h2>
            <p>
              O Post Recap pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
            </p>

            <h2>8. Contato do Suporte</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco através do e-mail: <a href="mailto:contato@postrecap.tech">contato@postrecap.tech</a>.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

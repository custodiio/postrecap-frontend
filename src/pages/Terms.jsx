import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './LegalPages.css';

export default function Terms() {
  return (
    <div className="legal-layout">
      <div className="legal-container max-width-container">
        <Link to="/" className="legal-back-link">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
        
        <header className="legal-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Última atualização: 25 de Maio de 2026</p>
        </header>

        <section className="legal-content glass-panel">
          <h2>1. Termos de Uso</h2>
          <p>
            Ao acessar o site <strong>animesrecaps.me</strong> (doravante denominado "Post Recap"), você concorda em cumprir estes Termos de Serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
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
            O Post Recap integra-se com APIs oficiais de terceiros, incluindo as do <strong>TikTok (TikTok Developer Platform)</strong> e do <strong>Instagram (Meta for Developers)</strong>.
          </p>
          <ul>
            <li><strong>TikTok API:</strong> O upload de vídeos e a recuperação de dados de perfil são regidos pelos <a href="https://www.tiktok.com/legal/page/v2/terms-of-service/pt-BR" target="_blank" rel="noopener noreferrer">Termos de Serviço do TikTok</a>.</li>
            <li><strong>Instagram API:</strong> O agendamento e a publicação de Reels são regidos pelos <a href="https://help.instagram.com/581076165575477" target="_blank" rel="noopener noreferrer">Termos de Uso do Instagram</a> e pelos Termos de Serviço da Meta.</li>
            <li>Você é inteiramente responsável por garantir que o conteúdo que publica (incluindo legendas e vídeos de animes) não viole os direitos autorais de terceiros e esteja em conformidade com as diretrizes de comunidade de cada rede social correspondente.</li>
          </ul>

          <h2>4. Limitação de Responsabilidade</h2>
          <p>
            Em nenhum caso o Post Recap ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no Post Recap, mesmo que o Post Recap ou um representante autorizado tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
          </p>

          <h2>5. Modificações nos Termos</h2>
          <p>
            O Post Recap pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco através do e-mail de suporte cadastrado em animesrecaps.me.
          </p>
        </section>
      </div>
    </div>
  );
}

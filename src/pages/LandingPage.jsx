import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Phone3D from '../components/Phone3D';
import ScrollReveal from '../components/ScrollReveal';
import LogoIcon from '../components/LogoIcon';
import { Zap, Play, Eye, Sparkles, Calendar, ChevronDown, Check, ArrowRight, Shield, MonitorPlay, Upload, BarChart3, Users, TrendingUp } from 'lucide-react';
import './LandingPage.css';

/* Framer Motion variants for staggered children */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] } }
};

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "O que é o Post Recap?",
      a: "O Post Recap é uma ferramenta avançada de curadoria, simulação de retenção e agendamento de posts para criadores de conteúdo do TikTok e Instagram. Ele permite validar o posicionamento visual de vídeos e legendas antes de publicá-los oficialmente."
    },
    {
      q: "Como funciona o simulador do TikTok?",
      a: "Quando você faz o upload de um vídeo, nossa ferramenta renderiza uma réplica perfeita da interface 'Para Você' (FYP) e do perfil do TikTok. Isso permite ver exatamente onde os botões (curtidas, comentários) e a legenda vão cobrir o vídeo, evitando ocultar elementos importantes ou legendas embutidas."
    },
    {
      q: "A publicação é automatizada?",
      a: "Sim! Após aprovar o vídeo e otimizar as hashtags e legendas usando nossa IA integrada, você pode conectar sua conta do TikTok Sandbox ou Instagram oficial e realizar a postagem de forma direta ou agendada."
    },
    {
      q: "Quais dados o aplicativo acessa da minha conta?",
      a: "Respeitamos totalmente a sua privacidade. Solicitamos apenas as permissões necessárias para realizar o upload de vídeos em sua conta (escopo video.upload e video.publish) e ler informações básicas públicas de perfil. Não coletamos ou armazenamos suas senhas."
    }
  ];

  return (
    <div className="landing-layout">
      {/* Barra de Navegação */}
      <header className="navbar glass-panel-heavy">
        <div className="navbar-container max-width-container">
          <Link to="/" className="nav-logo">
            <LogoIcon size={28} />
            <span className="logo-text">Post<span className="logo-highlight">Recap</span></span>
          </Link>
          <nav className="nav-links">
            <a href="#features">Recursos</a>
            <a href="#faq">FAQ</a>
            <Link to="/terms">Termos</Link>
            <Link to="/privacy">Privacidade</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="glow-btn">
              <span className="btn-text-desktop">Começar Agora</span>
              <span className="btn-text-mobile">Entrar</span>
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
          </div>
        </div>
      </header>

      {/* Seção Hero */}
      <section className="hero-section">
        <div className="hero-container max-width-container grid-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="badge-wrapper">
              <span className="badge floating-element">
                <Sparkles size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} /> 
                Retenção Otimizada por IA
              </span>
            </div>
            <h1 className="hero-title">
              Otimize seus vídeos antes de postar no <span className="text-gradient">TikTok</span> e <span className="text-gradient">Instagram</span>.
            </h1>
            <p className="hero-description">
              Simule a interface móvel real, preveja cortes indesejados nas legendas, gere hashtags virais por inteligência artificial e agende posts com um clique.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="glow-btn">
                Testar Gratuitamente <Play size={16} />
              </Link>
              <a href="#features" className="sec-btn">
                Ver Recursos
              </a>
            </div>
            
            {/* Elementos de confiança */}
            <div className="hero-trust">
              <div className="trust-item">
                <Check size={16} color="var(--success)" />
                <span>Integração Oficial TikTok Sandbox</span>
              </div>
              <div className="trust-item">
                <Check size={16} color="var(--success)" />
                <span>Garantia de Privacidade de Dados</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="blob-glow ciano-glow"></div>
            <div className="blob-glow magenta-glow"></div>
            <Phone3D />
          </motion.div>
        </div>
      </section>

      {/* Seção de Métricas / Social Proof */}
      <section className="stats-section">
        <div className="max-width-container">
          <motion.div
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon-wrap"><MonitorPlay size={22} color="var(--tiktok-cyan)" /></div>
              <div className="stat-number">9:16</div>
              <div className="stat-label">Simulador nativo idêntico à interface do celular</div>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon-wrap"><Zap size={22} color="var(--tiktok-magenta)" /></div>
              <div className="stat-number">1 Clique</div>
              <div className="stat-label">Publicação e agendamento diretos via API oficial</div>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon-wrap"><Shield size={22} color="var(--primary)" /></div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Seguro com OAuth oficial sem salvar suas senhas</div>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon-wrap"><Sparkles size={22} color="var(--instagram-orange)" /></div>
              <div className="stat-number">IA</div>
              <div className="stat-label">Otimização inteligente de legendas e hashtags virais</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção "Como Funciona" */}
      <section className="how-it-works-section">
        <div className="max-width-container">
          <ScrollReveal animation="fadeUp">
            <div className="section-header">
              <h2 className="section-title">Como Funciona</h2>
              <p className="section-subtitle">
                Três passos simples para otimizar e publicar seus recaps com máxima qualidade visual.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="steps-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="step-card glass-panel" variants={itemVariants}>
              <div className="step-number">01</div>
              <div className="step-icon-wrapper">
                <Upload size={28} />
              </div>
              <h3 className="step-title">Faça o Upload</h3>
              <p className="step-desc">
                Arraste e solte seu vídeo de anime recap na plataforma. Suportamos MP4, MOV em proporção 9:16 para o TikTok.
              </p>
            </motion.div>

            <div className="step-connector">
              <div className="connector-line"></div>
              <ArrowRight size={16} color="var(--primary)" />
            </div>

            <motion.div className="step-card glass-panel" variants={itemVariants}>
              <div className="step-number">02</div>
              <div className="step-icon-wrapper">
                <Eye size={28} />
              </div>
              <h3 className="step-title">Simule e Otimize</h3>
              <p className="step-desc">
                Visualize em tempo real como o vídeo aparece no feed FYP e no perfil. Ajuste legendas e hashtags com IA integrada.
              </p>
            </motion.div>

            <div className="step-connector">
              <div className="connector-line"></div>
              <ArrowRight size={16} color="var(--primary)" />
            </div>

            <motion.div className="step-card glass-panel" variants={itemVariants}>
              <div className="step-number">03</div>
              <div className="step-icon-wrapper">
                <Play size={28} />
              </div>
              <h3 className="step-title">Publique Direto</h3>
              <p className="step-desc">
                Com um clique, publique diretamente no TikTok via API oficial. O vídeo vai ao ar com todas as otimizações aplicadas.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Recursos (Features) */}
      <section id="features" className="features-section">
        <div className="max-width-container">
          <ScrollReveal animation="fadeUp">
            <div className="section-header">
              <h2 className="section-title">O que torna o Post Recap único?</h2>
              <p className="section-subtitle">
                Ferramentas profissionais projetadas especificamente para maximizar a retenção visual e simplificar sua distribuição de conteúdo.
              </p>
            </div>
          </ScrollReveal>
          
          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="feature-card glass-panel" variants={itemVariants}>
              <div className="feature-icon-wrapper f-cyan">
                <Eye size={24} />
              </div>
              <h3 className="feature-card-title">Simulador FYP de Celular</h3>
              <p className="feature-card-desc">
                Veja exatamente como o seu vídeo final de recap é exibido na tela 'Para Você' do TikTok ou Reels do Instagram. Previna que legendas fiquem atrás de botões de interação.
              </p>
            </motion.div>

            <motion.div className="feature-card glass-panel" variants={itemVariants}>
              <div className="feature-icon-wrapper f-magenta">
                <Sparkles size={24} />
              </div>
              <h3 className="feature-card-title">IA Hashtag Suggester</h3>
              <p className="feature-card-desc">
                Nossa IA inteligente analisa o texto da legenda do vídeo de anime e sugere instantaneamente as 3 melhores hashtags virais para turbinar as visualizações.
              </p>
            </motion.div>

            <motion.div className="feature-card glass-panel" variants={itemVariants}>
              <div className="feature-icon-wrapper f-purple">
                <Calendar size={24} />
              </div>
              <h3 className="feature-card-title">Agendamento Inteligente</h3>
              <p className="feature-card-desc">
                Fila de postagens dedicada para planejar sua grade semanal. Agende a postagem com antecedência para publicar nos horários de maior tráfego orgânico.
              </p>
            </motion.div>

            <motion.div className="feature-card glass-panel" variants={itemVariants}>
              <div className="feature-icon-wrapper f-orange">
                <Shield size={24} />
              </div>
              <h3 className="feature-card-title">Conexão API Segura</h3>
              <p className="feature-card-desc">
                Utilizamos o fluxo de autorização OAuth 2.0 oficial das plataformas (TikTok e Meta Developers). Suas credenciais permanecem sob custódia criptografada e segura.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section id="faq" className="faq-section">
        <div className="max-width-container">
          <ScrollReveal animation="fadeUp">
            <div className="section-header">
              <h2 className="section-title">Perguntas Frequentes</h2>
              <p className="section-subtitle">Tire suas dúvidas sobre o funcionamento do Post Recap</p>
            </div>
          </ScrollReveal>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} animation="slideLeft" delay={index * 0.1}>
                <div 
                  className={`faq-item glass-panel ${activeFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </div>
                  <div className={`faq-answer ${activeFaq === index ? 'faq-answer-open' : ''}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="footer-section">
        <ScrollReveal animation="fadeUp">
          <div className="footer-container max-width-container">
            <div className="footer-brand">
              <div className="nav-logo">
                <LogoIcon size={24} />
                <span className="logo-text">Post<span className="logo-highlight">Recap</span></span>
              </div>
              <p className="footer-desc">
                Ferramenta avançada de visualização de retenção e agendamento de posts. Desenvolvido para criadores de sucesso.
              </p>
            </div>
            
            <div className="footer-links-group">
              <h4>Legal</h4>
              <Link to="/terms">Termos de Serviço</Link>
              <Link to="/privacy">Políticas de Privacidade</Link>
            </div>

            <div className="footer-links-group">
              <h4>Contato</h4>
              <a href="mailto:contato@postrecap.tech">contato@postrecap.tech</a>
              <a href="https://github.com/custodiio" target="_blank" rel="noopener noreferrer">GitHub Oficial</a>
            </div>
            
            <div className="footer-links-group">
              <h4>API Integrations</h4>
              <span className="footer-api-info">TikTok Developer App ID: SB Sandbox App</span>
              <span className="footer-api-info">Instagram Graph API Verified Client</span>
            </div>
          </div>
        </ScrollReveal>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Post Recap (postrecap.tech). Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

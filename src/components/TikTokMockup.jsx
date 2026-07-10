import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Share2, Bookmark, Music, Search, Grid, Plus, Check, Film, 
  Send, MoreHorizontal, ThumbsUp, ThumbsDown, MessageSquare, Play, RefreshCw, Sparkles,
  User, Camera
} from 'lucide-react';

/* SVG ícone TikTok customizado */
function TikTokIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.3 0 .59.04.86.1v-3.5a6.37 6.37 0 00-.86-.06A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.41 4.85 6.29 6.29 0 001.93-4.56V9.42A8.2 8.2 0 0019.59 11V7.5a4.87 4.87 0 010-.81z" fill="currentColor"/>
    </svg>
  );
}

/* SVG ícone Instagram customizado */
function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.0" fill="none"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2.0" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
    </svg>
  );
}

/* SVG ícone YouTube Shorts customizado */
function YouTubeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 12a11 11 0 11-22 0 11 11 0 0122 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor"/>
    </svg>
  );
}

export default function TikTokMockup({ 
  videoUrl, 
  caption, 
  hashtags = [], 
  username: propUsername = "kumarecaps", 
  avatar: propAvatar,
  tiktokUsername,
  tiktokAvatar,
  instagramUsername,
  youtubeChannelName,
  youtubeAvatar
}) {
  const [platform, setPlatform] = useState('tiktok'); // 'tiktok', 'instagram', 'youtube'
  const [viewMode, setViewMode] = useState('fyp'); // tiktok: 'fyp'/'profile', instagram: 'reels'/'profile', youtube: 'shorts'
  
  const username = platform === 'tiktok' ? (tiktokUsername || propUsername)
    : platform === 'instagram' ? (instagramUsername || propUsername)
    : platform === 'youtube' ? (youtubeChannelName || propUsername)
    : propUsername;

  const avatar = platform === 'tiktok' ? (tiktokAvatar || propAvatar)
    : platform === 'youtube' ? youtubeAvatar
    : '';
  
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(14200);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(3840);
  
  const videoRef = useRef(null);

  // Sincroniza a sub-visualização padrão ao alternar plataforma
  useEffect(() => {
    if (platform === 'tiktok') setViewMode('fyp');
    else if (platform === 'instagram') setViewMode('reels');
    else if (platform === 'youtube') setViewMode('shorts');
  }, [platform]);

  // Reinicia o vídeo quando o videoUrl mudar
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => console.log("Auto-play blocked or failed", err));
    }
  }, [videoUrl, platform, viewMode]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleBookmark = () => {
    if (bookmarked) {
      setBookmarked(false);
      setBookmarkCount(prev => prev - 1);
    } else {
      setBookmarked(true);
      setBookmarkCount(prev => prev + 1);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  // Dados de configuração das plataformas
  const platformConfig = {
    tiktok: { label: 'TikTok', modes: ['fyp', 'profile'], modeLabels: { fyp: 'Para Você', profile: 'Perfil' }, defaultMode: 'fyp' },
    instagram: { label: 'Instagram', modes: ['reels', 'profile'], modeLabels: { reels: 'Reels', profile: 'Perfil' }, defaultMode: 'reels' },
    youtube: { label: 'YouTube', modes: ['shorts'], modeLabels: { shorts: 'Shorts' }, defaultMode: 'shorts' }
  };

  const activePlatformConfig = platformConfig[platform];

  return (
    <div className="multibrand-mockup-wrapper" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '12px',
      width: '100%',
      position: 'relative'
    }}>
      {/* Console Lateral Unificado (Ícones + Expansão com Título e Modos) */}
      <div className="mockup-sidebar-control" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'flex-end',
        zIndex: 10,
        position: 'sticky',
        top: '100px',
        width: '110px',
        minWidth: '110px',
        flexShrink: 0
      }}>
        {/* Renderiza cada plataforma */}
        {Object.entries(platformConfig).map(([key, config]) => {
          const isActive = platform === key;
          const brandClass = key === 'tiktok' ? 'tt' : key === 'instagram' ? 'ig' : 'yt';
          
          return (
            <div key={key} className={`sidebar-platform-item ${isActive ? 'expanded' : ''}`}>
              {/* Balão envolvente: ícone + título vertical da rede */}
              <div 
                className={`sidebar-bubble ${brandClass}-bubble ${isActive ? 'active' : ''}`}
              >
                {/* Ícone da rede */}
                <button 
                  onClick={() => setPlatform(key)}
                  className={`sidebar-icon-btn ${brandClass}-icon-btn ${isActive ? 'active' : ''}`}
                  title={`Visualizar no ${config.label}`}
                  type="button"
                >
                  {key === 'tiktok' && <TikTokIcon size={17} />}
                  {key === 'instagram' && <InstagramIcon size={17} />}
                  {key === 'youtube' && <YouTubeIcon size={17} />}
                </button>

                {/* Título vertical expandido (só aparece na rede selecionada) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className={`sidebar-platform-label ${brandClass}-label`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {config.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Modos colados ao lado da bolha (texto vertical) */}
              <AnimatePresence>
                {isActive && config.modes.length > 0 && (
                  <motion.div
                    className={`sidebar-modes-strip ${brandClass}-strip`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {config.modes.map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`sidebar-mode-vbtn ${viewMode === mode ? 'active' : ''} ${brandClass}-mode`}
                        type="button"
                      >
                        {config.modeLabels[mode]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Frame do Celular */}
      <div className="phone-device" style={{
        width: '280px',
        height: '570px',
        background: '#000',
        borderRadius: '36px',
        border: '8px solid #1c1c28',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 3px var(--border-color)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        flexShrink: 0
      }}>
        {/* Dynamic Island */}
        <div style={{
          width: '100px',
          height: '22px',
          background: '#000',
          borderRadius: '15px',
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ width: '5px', height: '5px', background: '#111', borderRadius: '50%', marginRight: '16px' }} />
          <div style={{ width: '30px', height: '4px', background: '#111', borderRadius: '10px' }} />
        </div>

        {/* ────────── MODO TIKTOK: FYP ────────── */}
        {platform === 'tiktok' && viewMode === 'fyp' && (
          <div style={{ width: '100%', height: '100%', position: 'relative', background: '#020202' }}>
            {/* Header */}
            <div style={{
              position: 'absolute',
              top: '38px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 20px',
              zIndex: 10,
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              <span style={{ opacity: 0.6 }}><Search size={16} /></span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ opacity: 0.6 }}>Seguindo</span>
                <span style={{ borderBottom: '2px solid #fff', paddingBottom: '3px' }}>Para Você</span>
              </div>
              <span style={{ width: '16px' }}></span>
            </div>

            {/* Video / Empty State */}
            {videoUrl ? (
              <video ref={videoRef} src={videoUrl} loop muted autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="empty-mockup-inner" style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(180deg, #07070a 0%, #0d0c1b 100%)', color: 'var(--text-muted)', textAlign: 'center', padding: '20px', gap: '10px'
              }}>
                <Film size={28} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Aguardando Vídeo</span>
                <span style={{ fontSize: '0.7rem', maxWidth: '180px' }}>Arraste seu recap no formulário para simular a interface FYP.</span>
              </div>
            )}

            {/* Bottom Gradient overlay */}
            <div style={{
              position: 'absolute', bottom: '0', left: '0', width: '100%', height: '220px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 3
            }} />

            {/* Ações Laterais */}
            <div style={{ position: 'absolute', right: '12px', bottom: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', zIndex: 5 }}>
              {/* Profile */}
              <div style={{ position: 'relative', marginBottom: '4px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #fff', background: '#222',
                  backgroundImage: avatar ? `url(${avatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: 'bold'
                }}>
                  {!avatar && (username || "K").charAt(0).toUpperCase()}
                </div>
                <div style={{
                  position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '14px', height: '14px',
                  borderRadius: '50%', background: 'var(--tiktok-magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>
                  <Plus size={8} strokeWidth={4} />
                </div>
              </div>
              
              {/* Like */}
              <div onClick={handleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={20} fill={liked ? 'var(--tiktok-magenta)' : 'none'} color={liked ? 'var(--tiktok-magenta)' : '#fff'} />
                </div>
                <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: '500', marginTop: '2px' }}>{formatNumber(likeCount)}</span>
              </div>

              {/* Comentários */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={20} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: '500', marginTop: '2px' }}>853</span>
              </div>

              {/* Favorito */}
              <div onClick={handleBookmark} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bookmark size={20} fill={bookmarked ? '#face15' : 'none'} color={bookmarked ? '#face15' : '#fff'} />
                </div>
                <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: '500', marginTop: '2px' }}>{formatNumber(bookmarkCount)}</span>
              </div>

              {/* Compartilhar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={18} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: '500', marginTop: '2px' }}>1.2K</span>
              </div>

              {/* Music Disc */}
              <div className="music-disc-animation" style={{
                width: '32px', height: '32px', borderRadius: '50%', background: 'radial-gradient(circle, #333 30%, #111 80%)',
                border: '3px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'spin 4s linear infinite',
                backgroundImage: avatar ? `url(${avatar})` : 'none', backgroundSize: 'cover', marginTop: '4px'
              }}>
                {!avatar && <Music size={12} color="#fff" />}
              </div>
            </div>

            {/* Detalhes do Criador e Legenda */}
            <div style={{ position: 'absolute', left: '12px', bottom: '26px', right: '65px', zIndex: 5, color: '#fff', textAlign: 'left' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                @{username}
                <span style={{ background: 'var(--tiktok-cyan)', color: '#000', fontSize: '0.55rem', padding: '1px 3px', borderRadius: '2px', fontWeight: '800' }}>SANDBOX</span>
              </div>
              <div style={{ fontSize: '0.8rem', lineHeight: '1.4', marginBottom: '8px', maxHeight: '70px', overflowY: 'auto', paddingRight: '4px' }}>
                {caption || "Legenda do seu recap no feed..."}{' '}
                {hashtags.map((tag, idx) => (
                  <span key={idx} style={{ color: 'var(--tiktok-cyan)', fontWeight: '600', marginRight: '4px' }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', opacity: 0.85 }}>
                <Music size={10} />
                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100px' }}>
                  <span style={{ display: 'inline-block', animation: 'marquee 8s linear infinite' }}>Som original - @{username}</span>
                </div>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '8px', left: '10px', right: '10px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', zIndex: 5 }}>
              <div style={{ width: '45%', height: '100%', background: 'var(--tiktok-cyan)', borderRadius: '2px' }} />
            </div>
          </div>
        )}

        {/* ────────── MODO TIKTOK: PERFIL ────────── */}
        {platform === 'tiktok' && viewMode === 'profile' && (
          <div style={{ width: '100%', height: '100%', background: '#0b0b0f', color: '#fff', overflowY: 'auto', padding: '50px 15px 15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.1)', background: '#1d1d29',
                backgroundImage: avatar ? `url(${avatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', marginBottom: '10px'
              }}>
                {!avatar && (username || "K").charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '2px' }}>@{username}</span>
              
              <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', margin: '10px 0', opacity: 0.9 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700' }}>148</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Seguindo</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700' }}>24.5K</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Seguidores</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700' }}>124.8K</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Curtidas</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.06)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <Check size={10} color="var(--success)" /> Conta Vinculada
              </div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '10px' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', color: 'var(--tiktok-cyan)', borderBottom: '2px solid var(--tiktok-cyan)', paddingBottom: '6px' }}>
                <Grid size={16} />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.4 }}><Bookmark size={16} /></div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.4 }}><Heart size={16} /></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
              <div style={{ aspectRatio: '3/4', background: '#1d1d29', position: 'relative', overflow: 'hidden', borderRadius: '3px', border: '1px solid var(--tiktok-cyan)' }}>
                {videoUrl ? (
                  <video src={videoUrl} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #100b20, #030307)' }} />
                )}
                <span style={{ position: 'absolute', bottom: '4px', left: '4px', fontSize: '0.65rem', fontWeight: '600', background: 'rgba(0,0,0,0.5)', padding: '1px 3px', borderRadius: '2px' }}>Atual</span>
              </div>
              <div style={{ aspectRatio: '3/4', background: '#13131d', position: 'relative', overflow: 'hidden', borderRadius: '3px' }}>
                <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '10px' }}>Recap #4</div>
                <span style={{ position: 'absolute', bottom: '4px', left: '4px', fontSize: '0.65rem', opacity: 0.7 }}>▶ 12K</span>
              </div>
              <div style={{ aspectRatio: '3/4', background: '#13131d', position: 'relative', overflow: 'hidden', borderRadius: '3px' }}>
                <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '10px' }}>Recap #3</div>
                <span style={{ position: 'absolute', bottom: '4px', left: '4px', fontSize: '0.65rem', opacity: 0.7 }}>▶ 8K</span>
              </div>
            </div>
          </div>
        )}

        {/* ────────── MODO INSTAGRAM: REELS ────────── */}
        {platform === 'instagram' && viewMode === 'reels' && (
          <div style={{ width: '100%', height: '100%', position: 'relative', background: '#020202' }}>
            {/* Header Reels */}
            <div style={{
              position: 'absolute', top: '38px', left: '0', width: '100%', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', zIndex: 10, color: '#fff'
            }}>
              <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Reels</span>
              <Camera size={20} />
            </div>

            {/* Video */}
            {videoUrl ? (
              <video ref={videoRef} src={videoUrl} loop muted autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="empty-mockup-inner" style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(180deg, #09050f 0%, #030307 100%)', color: 'var(--text-muted)', textAlign: 'center', padding: '20px', gap: '10px'
              }}>
                <InstagramIcon size={32} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Aguardando Vídeo</span>
                <span style={{ fontSize: '0.7rem', maxWidth: '180px' }}>Simule a visualização nativa de Reels do Instagram.</span>
              </div>
            )}

            {/* Bottom shadow overlay */}
            <div style={{
              position: 'absolute', bottom: '0', left: '0', width: '100%', height: '220px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 3
            }} />

            {/* Ações Verticais IG */}
            <div style={{ position: 'absolute', right: '12px', bottom: '65px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', zIndex: 5 }}>
              
              {/* Curtir */}
              <div onClick={handleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <Heart size={22} fill={liked ? '#ff3040' : 'none'} color={liked ? '#ff3040' : '#fff'} />
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '4px' }}>{formatNumber(likeCount - 2300)}</span>
              </div>

              {/* Comentário */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <MessageCircle size={22} color="#fff" />
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '4px' }}>439</span>
              </div>

              {/* Enviar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Send size={20} color="#fff" />
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '4px' }}></span>
              </div>

              {/* Salvar */}
              <div onClick={handleBookmark} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <Bookmark size={20} fill={bookmarked ? '#fff' : 'none'} color="#fff" />
              </div>

              {/* Opções */}
              <MoreHorizontal size={20} color="#fff" style={{ cursor: 'pointer' }} />

              {/* Disco Áudio */}
              <div style={{
                width: '26px', height: '26px', borderRadius: '6px', border: '2px solid #fff',
                background: 'radial-gradient(circle, #333 30%, #111 80%)',
                animation: 'spin 4s linear infinite'
              }} />
            </div>

            {/* Informações da Base IG */}
            <div style={{ position: 'absolute', left: '14px', bottom: '30px', right: '65px', zIndex: 5, color: '#fff', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: '#ff3040',
                  backgroundImage: avatar ? `url(${avatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'
                }}>
                  {!avatar && (username || "K").charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{username}</span>
                <span style={{
                  border: '1px solid rgba(255,255,255,0.4)', borderRadius: '4px', fontSize: '0.65rem',
                  padding: '2px 8px', fontWeight: '700', cursor: 'pointer'
                }}>Seguir</span>
              </div>

              <div style={{ fontSize: '0.8rem', lineHeight: '1.4', marginBottom: '8px', maxHeight: '60px', overflowY: 'auto' }}>
                {caption || "Legenda do seu Reels no Instagram..."}{' '}
                {hashtags.map((tag, idx) => (
                  <span key={idx} style={{ color: '#38bdf8', fontWeight: '600', marginRight: '4px' }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', opacity: 0.9 }}>
                <Music size={10} />
                <span style={{ fontWeight: '500' }}>Áudio original • {username}</span>
              </div>
            </div>
          </div>
        )}

        {/* ────────── MODO INSTAGRAM: PERFIL ────────── */}
        {platform === 'instagram' && viewMode === 'profile' && (
          <div style={{ width: '100%', height: '100%', background: '#000', color: '#fff', overflowY: 'auto', padding: '50px 15px 15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
              <div style={{
                width: '68px', height: '68px', borderRadius: '50%', padding: '2px',
                background: 'linear-gradient(45deg, #f77737, #d62976, #962fbf)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%', background: '#000', border: '2px solid #000',
                  backgroundImage: avatar ? `url(${avatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold'
                }}>
                  {!avatar && (username || "K").charAt(0).toUpperCase()}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', flex: 1, justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>45</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>Publicações</div>
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>14.2K</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>Seguidores</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '18px', fontSize: '0.8rem' }}>
              <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Kumar Recaps</div>
              <div style={{ opacity: 0.8, marginTop: '2px', lineHeight: '1.3' }}>
                🔥 Vídeos diários de anime recap
                <br />🎬 Otimizado pelo Post Recap
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
              <div style={{ flex: 1, background: '#1c1c1e', padding: '6px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                Ver Estatísticas
              </div>
              <div style={{ flex: 1, background: '#1c1c1e', padding: '6px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                Editar Perfil
              </div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #1c1c1e', paddingBottom: '8px', marginBottom: '10px' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', color: '#fff', borderBottom: '1px solid #fff', paddingBottom: '8px' }}>
                <Grid size={16} />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.4 }}><Film size={16} /></div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.4 }}><User size={16} /></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
              <div style={{ aspectRatio: '1/1', background: '#1c1c1e', position: 'relative', overflow: 'hidden' }}>
                {videoUrl ? (
                  <video src={videoUrl} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #100b20, #030307)' }} />
                )}
                <span style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '0.55rem', fontWeight: '800', background: 'rgba(0,0,0,0.6)', padding: '1px 3px', borderRadius: '2px' }}>REELS</span>
              </div>
              <div style={{ aspectRatio: '1/1', background: '#111' }} />
              <div style={{ aspectRatio: '1/1', background: '#111' }} />
            </div>
          </div>
        )}

        {/* ────────── MODO YOUTUBE: SHORTS ────────── */}
        {platform === 'youtube' && (
          <div style={{ width: '100%', height: '100%', position: 'relative', background: '#020202' }}>
            {/* Header Shorts YT */}
            <div style={{
              position: 'absolute', top: '38px', left: '0', width: '100%', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', zIndex: 10, color: '#fff'
            }}>
              <span style={{ fontWeight: '800', fontSize: '1rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#ff0000' }}>▶</span> Shorts
              </span>
              <Search size={18} />
            </div>

            {/* Video YT */}
            {videoUrl ? (
              <video ref={videoRef} src={videoUrl} loop muted autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="empty-mockup-inner" style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(180deg, #1f0404 0%, #030307 100%)', color: 'var(--text-muted)', textAlign: 'center', padding: '20px', gap: '10px'
              }}>
                <YouTubeIcon size={32} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Aguardando Vídeo</span>
                <span style={{ fontSize: '0.7rem', maxWidth: '180px' }}>Visualização de Shorts do YouTube (Placeholder).</span>
              </div>
            )}

            {/* Gradient YT */}
            <div style={{
              position: 'absolute', bottom: '0', left: '0', width: '100%', height: '200px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 3
            }} />

            {/* Ações Verticais YT */}
            <div style={{ position: 'absolute', right: '12px', bottom: '65px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', zIndex: 5 }}>
              {/* Likes YT */}
              <div onClick={handleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ThumbsUp size={18} color={liked ? '#ff0000' : '#fff'} fill={liked ? '#ff0000' : 'none'} />
                </div>
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '2px' }}>{formatNumber(likeCount - 4300)}</span>
              </div>

              {/* Dislike YT */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ThumbsDown size={18} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '2px' }}>Não gostei</span>
              </div>

              {/* Comentários YT */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={18} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '2px' }}>243</span>
              </div>

              {/* Compartilhar YT */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={16} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '2px' }}>Compartilhar</span>
              </div>

              {/* Remix YT */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RefreshCw size={16} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '600', marginTop: '2px' }}>Remix</span>
              </div>
            </div>

            {/* Descrição e Canal Base YT */}
            <div style={{ position: 'absolute', left: '12px', bottom: '26px', right: '65px', zIndex: 5, color: '#fff', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', background: '#fff',
                  backgroundImage: avatar ? `url(${avatar})` : 'none', backgroundSize: 'cover',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '10px', fontWeight: 'bold'
                }}>
                  {!avatar && (username || "K").charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: '700', fontSize: '0.8rem' }}>@{username}</span>
                <span style={{
                  background: '#ff0000', color: '#fff', fontSize: '0.7rem', padding: '3px 8px',
                  borderRadius: '16px', fontWeight: '700', cursor: 'pointer'
                }}>Inscrever-se</span>
              </div>

              <div style={{ fontSize: '0.8rem', lineHeight: '1.4', marginBottom: '4px', maxHeight: '55px', overflowY: 'auto' }}>
                {caption || "Legenda do seu Shorts do YouTube..."}{' '}
                {hashtags.map((tag, idx) => (
                  <span key={idx} style={{ color: '#38bdf8', fontWeight: '600', marginRight: '4px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>




      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .music-disc-animation {
          box-shadow: 0 0 10px rgba(0,0,0,0.8);
        }
      `}</style>
    </div>
  );
}

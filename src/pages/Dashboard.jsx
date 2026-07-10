import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, RefreshCw, Upload, Video, AlertCircle, Sparkles, CheckCircle2, Check,
  Link2, LogIn, Disc, Music, Camera, Lock, Film, Calendar, LayoutDashboard, 
  BarChart3, Settings, Trash2, Eye, Share2, Heart, MessageSquare, Plus, Play,
  ArrowRight, ArrowLeft, Bell, Clock
} from 'lucide-react';
import LogoIcon from '../components/LogoIcon';
import TikTokMockup from '../components/TikTokMockup';
import './Dashboard.css';

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
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-gradient-dash)" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="5" stroke="url(#ig-gradient-dash)" strokeWidth="2" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-gradient-dash)"/>
      <defs>
        <linearGradient id="ig-gradient-dash" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f77737"/>
          <stop offset="50%" stopColor="#d62976"/>
          <stop offset="100%" stopColor="#962fbf"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* SVG ícone YouTube customizado */
function YoutubeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" fill="currentColor"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000"/>
    </svg>
  );
}

/* Função utilitária para formatar números de métricas */
function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
}

/* Função utilitária para colorir hashtags neon na legenda da grade */
function renderCaptionWithHashtags(text) {
  if (!text) return "Sem legenda...";
  const parts = text.split(/(\s+)/);
  return parts.map((part, idx) => {
    if (part.startsWith('#')) {
      return (
        <span key={idx} className="neon-hashtag-grid" style={{ color: 'var(--primary-light)', fontWeight: '600', textShadow: '0 0 8px rgba(138, 63, 252, 0.3)' }}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' ou 'manager'
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [tiktokUsername, setTiktokUsername] = useState('');
  const [tiktokAvatar, setTiktokAvatar] = useState('');
  
  // Estados de Conformidade com UX do TikTok
  const [tiktokNickname, setTiktokNickname] = useState('');
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [tiktokPrivacy, setTiktokPrivacy] = useState('');
  const [tiktokComment, setTiktokComment] = useState(false);
  const [tiktokDuet, setTiktokDuet] = useState(false);
  const [tiktokStitch, setTiktokStitch] = useState(false);
  const [commercialDisclosure, setCommercialDisclosure] = useState(false);
  const [promoteYourBrand, setPromoteYourBrand] = useState(false);
  const [promoteBrandedContent, setPromoteBrandedContent] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [simulatedLimitReached, setSimulatedLimitReached] = useState(false);
  
  // Estados para Debug/Diagnóstico da API do TikTok
  const [debugResponse, setDebugResponse] = useState(null);
  const [isDebugLoading, setIsDebugLoading] = useState(false);
  
  // Estados para Notificações e Capa de Vídeo
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const notificationsDropdownRef = useRef(null);
  
  // Instagram Connection Status (Simulado)
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [instagramUsername, setInstagramUsername] = useState('');
  
  // YouTube Connection Status (Simulado)
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [youtubeChannelName, setYoutubeChannelName] = useState('');
  
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  
  // Agendador de Postagens
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  
  // Redes sociais selecionadas para postagem
  const [selectedPlatforms, setSelectedPlatforms] = useState(['tiktok']);
  
  // Fila de postagens (carregada do localStorage ou mock)
  const [postsList, setPostsList] = useState([]);

  // Filtros da Fila & Analytics
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'scheduled', 'published'
  const [filterPlatform, setFilterPlatform] = useState('all'); // 'all', 'tiktok', 'instagram', 'youtube'

  // Controle de Modal de Conexões e Etapa de Criação (Stepper)
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [creationStep, setCreationStep] = useState(1);
  
  const [uploadingPosts, setUploadingPosts] = useState({});
  const [uploadMessage, setUploadMessage] = useState('');
  
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Efeito para fechar os dropdowns ao clicar fora deles (Usuário e Notificações)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target)) {
        setShowNotificationsDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (!email) { navigate('/login'); return; }
    setUserEmail(email);
    setUserName(localStorage.getItem('user_name') || '');
    setUserAvatar(localStorage.getItem('user_avatar') || '');
    checkTiktokConnection(email);
    checkYoutubeConnection(email);

    // Carregar postagens do localStorage ou inicializar com dados ricos
    loadPosts();

    // Carregar notificações do localStorage
    const localNotifications = localStorage.getItem('notifications');
    if (localNotifications) {
      setNotifications(JSON.parse(localNotifications));
    } else {
      const initialNotifications = [
        {
          id: 'init_1',
          type: 'success',
          title: 'Estúdio Post Recap Ativo',
          message: 'Seu dashboard multicanais de aprovação sandbox está pronto para uso!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: true
        }
      ];
      localStorage.setItem('notifications', JSON.stringify(initialNotifications));
      setNotifications(initialNotifications);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('tiktok_success') === 'true') {
      setUploadMessage('Conta do TikTok conectada com sucesso no Sandbox!');
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setUploadMessage(''), 5000);
    } else if (params.get('tiktok_error')) {
      setUploadMessage(`Falha ao conectar TikTok: ${params.get('tiktok_error')}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('youtube_success') === 'true') {
      setUploadMessage('Conta do YouTube conectada com sucesso!');
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setUploadMessage(''), 5000);
    } else if (params.get('youtube_error')) {
      setUploadMessage(`Falha ao conectar YouTube: ${params.get('youtube_error')}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [navigate]);

  // Inicializa postagens de alta fidelidade
  const loadPosts = () => {
    const localPosts = localStorage.getItem('posts');
    if (localPosts) {
      setPostsList(JSON.parse(localPosts));
    } else {
      const mockPosts = [
        {
          id: '1',
          caption: 'O sacrifício final de Vegeta! A cena mais emocionante de DBZ em alta definição. #dbz #vegeta #anime',
          platforms: ['tiktok', 'instagram'],
          status: 'Publicado',
          date: '28/05/2026 18:30',
          metrics: { views: 42300, likes: 8900, comments: 245, shares: 142 }
        },
        {
          id: '2',
          caption: 'Os mistérios da nova temporada de Solo Leveling. Quem mais está ansioso? ⚔️🔥 #sololeveling #sungjinwoo #anime',
          platforms: ['tiktok', 'youtube'],
          status: 'Publicado',
          date: '25/05/2026 14:15',
          metrics: { views: 82500, likes: 12400, comments: 489, shares: 384 }
        },
        {
          id: '3',
          caption: 'Top 3 animes de suspense psicológico que você precisa assistir ainda hoje! 🧠😱 #anime #recap #otaku',
          platforms: ['tiktok', 'instagram', 'youtube'],
          status: 'Agendado',
          date: '30/05/2026 19:00',
          metrics: { views: 0, likes: 0, comments: 0, shares: 0 }
        }
      ];
      localStorage.setItem('posts', JSON.stringify(mockPosts));
      setPostsList(mockPosts);
    }
  };

  // Função para gerar capa (thumbnail) real do vídeo vertical usando Canvas
  const generateVideoThumbnail = (file) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.src = URL.createObjectURL(file);
    
    video.onloadedmetadata = () => {
      // Pula para o primeiro segundo para capturar um frame real (e evitar tela preta)
      video.currentTime = 1.0;
    };
    
    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        // Mantém a proporção vertical 9:16 compacta para economizar localStorage (menos de 10KB!)
        canvas.width = 180;
        canvas.height = 320;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const base64Thumbnail = canvas.toDataURL('image/jpeg', 0.7);
        setVideoThumbnail(base64Thumbnail);
        
        // Revoga URL temporária
        URL.revokeObjectURL(video.src);
      } catch (err) {
        console.error("Erro ao extrair frame do vídeo:", err);
      }
    };
  };

  // Função utilitária para registrar novas notificações
  const addNotification = (type, title, message) => {
    const newNotification = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  // Exclui uma notificação específica
  const handleDeleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  // Limpa todas as notificações
  const handleClearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
  };

  // Limpa notificações com mais de uma semana (7 dias)
  const handleClearOldNotifications = () => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    setNotifications(prev => {
      const updated = prev.filter(n => new Date(n.timestamp).getTime() > oneWeekAgo);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  // Marca todas as notificações como lidas ao abrir o painel
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const getTiktokCreatorInfo = async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/tiktok/creator-info?email=${email}`);
      if (res.ok) {
        const data = await res.json();
        setCreatorInfo(data);
        setTiktokNickname(data.creator_nickname);
        // Se as configurações do criador desativam as interações globalmente, desabilita/desmarca:
        if (data.comment_disabled) setTiktokComment(false);
        if (data.duet_disabled) setTiktokDuet(false);
        if (data.stitch_disabled) setTiktokStitch(false);
      }
    } catch (err) {
      console.error("Erro ao obter informações do criador do TikTok:", err);
    }
  };

  const checkTiktokConnection = async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/tiktok/status?email=${email}`);
      if (res.ok) {
        const data = await res.json();
        setTiktokConnected(data.connected);
        if (data.connected) {
          setTiktokUsername(data.username);
          setTiktokAvatar(data.avatar);
          if (!selectedPlatforms.includes('tiktok')) {
            setSelectedPlatforms(prev => [...prev, 'tiktok']);
          }
          await getTiktokCreatorInfo(email);
        }
      }
    } catch (err) { console.error("Erro ao obter status do TikTok:", err); }
  };

  const checkYoutubeConnection = async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/youtube/status?email=${email}`);
      if (res.ok) {
        const data = await res.json();
        setYoutubeConnected(data.connected);
        if (data.connected) {
          setYoutubeChannelName(data.channel_name);
          if (!selectedPlatforms.includes('youtube')) {
            setSelectedPlatforms(prev => [...prev, 'youtube']);
          }
        }
      }
    } catch (err) { console.error("Erro ao obter status do YouTube:", err); }
  };

  const handleTiktokConnect = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/tiktok/login?email=${userEmail}`);
      if (res.ok) {
        const data = await res.json();
        window.location.href = data.url;
      } else { alert("Erro ao inicializar conexão com o TikTok."); }
    } catch (err) { console.error("Erro ao conectar TikTok:", err); }
  };

  const handleTiktokDisconnect = async () => {
    if (!window.confirm("Deseja realmente desconectar sua conta do TikTok?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/tiktok/disconnect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      });
      if (res.ok) {
        setTiktokConnected(false);
        setTiktokUsername('');
        setTiktokAvatar('');
        setDebugResponse(null);
        setSelectedPlatforms(prev => prev.filter(p => p !== 'tiktok'));
        setVideoFile(null);
        setVideoPreviewUrl('');
      }
    } catch (err) { console.error("Erro ao desconectar:", err); }
  };

  // Função para testar a chamada CRUA do perfil do TikTok (Diagnóstico)
  const handleTiktokDebug = async () => {
    setIsDebugLoading(true);
    setDebugResponse(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/tiktok/debug-profile?email=${userEmail}`);
      const data = await res.json();
      setDebugResponse(data);
      
      // Se a resposta retornar dados válidos, tenta atualizar na tela na hora!
      if (data.success && data.tiktok_api_response?.status_code === 200) {
        const user_data = data.tiktok_api_response.body?.data?.user;
        if (user_data) {
          const name = user_data.display_name || user_data.username || "Conta Sandbox";
          const img = user_data.avatar_url || "";
          setTiktokUsername(name);
          setTiktokAvatar(img);
        }
      }
    } catch (err) {
      setDebugResponse({ 
        success: false, 
        error: `Erro ao fazer a requisição de debug no frontend: ${err.message}` 
      });
    } finally {
      setIsDebugLoading(false);
    }
  };

  // Simular conexão Instagram
  const handleInstagramConnect = () => {
    if (instagramConnected) {
      if (window.confirm("Desconectar do Instagram Business Sandbox?")) {
        setInstagramConnected(false);
        setInstagramUsername('');
        setSelectedPlatforms(prev => prev.filter(p => p !== 'instagram'));
      }
    } else {
      setInstagramConnected(true);
      setInstagramUsername('recaps.studio');
      setSelectedPlatforms(prev => [...prev, 'instagram']);
      setUploadMessage('Instagram Business API Sandbox conectado com sucesso (Simulado)!');
      setTimeout(() => setUploadMessage(''), 4000);
    }
  };

  // Conectar/Desconectar YouTube via OAuth 2.0 real
  const handleYoutubeConnect = async () => {
    if (youtubeConnected) {
      if (window.confirm("Desconectar do YouTube?")) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/youtube/disconnect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail })
          });
          if (res.ok) {
            setYoutubeConnected(false);
            setYoutubeChannelName('');
            setSelectedPlatforms(prev => prev.filter(p => p !== 'youtube'));
            setUploadMessage('YouTube desconectado com sucesso!');
            setTimeout(() => setUploadMessage(''), 4000);
          } else {
            alert('Falha ao desconectar do YouTube');
          }
        } catch (err) {
          console.error(err);
          alert('Erro ao conectar com o servidor');
        }
      }
    } else {
      try {
        const res = await fetch(`${API_BASE_URL}/api/youtube/login?email=${userEmail}`);
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            window.location.href = data.url;
          } else {
            alert('URL de login não retornada pelo servidor');
          }
        } else {
          alert('Erro ao requisitar login do YouTube');
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao conectar com o servidor');
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate('/');
  };

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") { setDragActive(true); }
    else if (e.type === "dragleave") { setDragActive(false); }
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetVideo(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) { validateAndSetVideo(e.target.files[0]); }
  };

  const validateAndSetVideo = (file) => {
    if (!file.type.startsWith('video/')) { alert("Por favor, selecione apenas arquivos de vídeo (MP4, MOV)."); return; }
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoPreviewUrl(url);
    
    // Extrai e gera a capa (thumbnail) real do vídeo em Base64
    generateVideoThumbnail(file);

    // Carregar e ler a duração do vídeo
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.onloadedmetadata = () => {
      setVideoDuration(tempVideo.duration);
      console.log("Duração do vídeo detectada:", tempVideo.duration, "segundos");
    };
    tempVideo.src = url;
  };

  const handleNextStep = () => {
    // Validação de duração máxima para o TikTok
    if (selectedPlatforms.includes('tiktok') && creatorInfo && creatorInfo.max_video_post_duration_sec) {
      if (videoDuration > creatorInfo.max_video_post_duration_sec) {
        alert(`O vídeo selecionado tem ${Math.round(videoDuration)}s de duração, o que excede o limite máximo permitido de ${creatorInfo.max_video_post_duration_sec}s para esta conta do TikTok.`);
        return;
      }
    }
    setCreationStep(2);
  };

  const handleSuggestTags = async () => {
    if (!caption) { alert("Por favor, digite uma legenda antes de sugerir hashtags."); return; }
    setIsGeneratingTags(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/tiktok/suggest-tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption })
      });
      if (res.ok) { const data = await res.json(); setSuggestedTags(data.hashtags); }
    } catch (err) { console.error("Erro ao buscar hashtags:", err); }
    finally { setIsGeneratingTags(false); }
  };

  const addTagToCaption = (tag) => {
    if (!caption.includes(tag)) { setCaption(prev => prev.trim() + " " + tag); }
  };

  // Alterna a seleção de redes sociais
  const togglePlatformSelection = (plat) => {
    if (selectedPlatforms.includes(plat)) {
      if (selectedPlatforms.length === 1) return; // requer pelo menos uma
      setSelectedPlatforms(prev => prev.filter(p => p !== plat));
    } else {
      setSelectedPlatforms(prev => [...prev, plat]);
    }
  };

  const handleDeletePost = (id) => {
    if (!window.confirm("Deseja remover esta publicação do gerenciador?")) return;
    const updated = postsList.filter(p => p.id !== id);
    setPostsList(updated);
    localStorage.setItem('posts', JSON.stringify(updated));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!videoFile) { alert("Selecione um arquivo de vídeo."); return; }
    if (isScheduled && !scheduleDateTime) { alert("Por favor, selecione uma data e horário válidos para o agendamento."); return; }

    // Validações obrigatórias da API de Postagem Direta do TikTok
    if (selectedPlatforms.includes('tiktok')) {
      if (simulatedLimitReached || (creatorInfo && !creatorInfo.can_post)) {
        alert("A API do TikTok indica que o criador não pode fazer mais postagens neste momento (limite atingido). Tente novamente mais tarde.");
        return;
      }
      if (creatorInfo && creatorInfo.max_video_post_duration_sec && videoDuration > creatorInfo.max_video_post_duration_sec) {
        alert(`A duração do vídeo (${Math.round(videoDuration)}s) excede o limite máximo permitido pelo TikTok (${creatorInfo.max_video_post_duration_sec}s).`);
        return;
      }
      
      // Validações de Conteúdo Comercial
      if (commercialDisclosure) {
        if (!promoteYourBrand && !promoteBrandedContent) {
          alert("Você precisa indicar se seu conteúdo promove a si mesmo, a um terceiro ou ambos (Conteúdo Comercial ativo).");
          return;
        }
        if (promoteBrandedContent && tiktokPrivacy === 'SELF_ONLY') {
          alert("A visibilidade de conteúdo de marca não pode ser configurada como privada.");
          return;
        }
      }

      // Validação de Privacidade (Deve ser selecionada manualmente)
      if (!tiktokPrivacy) {
        alert("Por favor, selecione manualmente o status de privacidade do seu post do TikTok.");
        return;
      }
    }

    // Salva os dados localmente para que a Promise de background possa acessá-los após limparmos a interface
    const bgVideoFile = videoFile;
    const bgCaption = caption;
    const bgSelectedPlatforms = [...selectedPlatforms];
    const bgIsScheduled = isScheduled;
    const bgScheduleDateTime = scheduleDateTime;
    const bgVideoThumbnail = videoThumbnail;
    const bgEmail = userEmail;

    // 1. Geramos um ID único para esse upload concorrente
    const postId = Date.now().toString();

    // 2. Criamos a data formatada
    const formattedDate = bgIsScheduled 
      ? new Date(bgScheduleDateTime).toLocaleString('pt-BR') 
      : new Date().toLocaleString('pt-BR');
    
    // 3. Criamos o post IMEDIATAMENTE com status de 'Enviando' na fila de posts
    const newPost = {
      id: postId,
      caption: bgCaption,
      platforms: bgSelectedPlatforms,
      status: 'Enviando', // Status de progresso reativo na grade
      date: formattedDate,
      thumbnail: bgVideoThumbnail, // A capa real em Base64 extraída via canvas!
      metrics: { views: 0, likes: 0, comments: 0, shares: 0 }
    };

    // Insere o card na lista do estado e do localStorage na mesma hora
    setPostsList(prev => {
      const updated = [newPost, ...prev];
      localStorage.setItem('posts', JSON.stringify(updated));
      return updated;
    });

    // 4. Registra este post no mapeamento de uploads ativos concorrentes
    setUploadingPosts(prev => ({ 
      ...prev, 
      [postId]: { progress: 0, status: 'uploading', fileName: bgVideoFile.name } 
    }));

    // 5. Registra uma notificação de envio em lote no sino
    addNotification(
      'sending',
      bgIsScheduled ? 'Agendando Post' : 'Enviando Vídeo',
      `O vídeo para a publicação "${bgCaption.substring(0, 30)}${bgCaption.length > 30 ? '...' : ''}" está sendo processado em segundo plano.`
    );

    // 6. Reseta IMEDIATAMENTE os campos do formulário na tela para que o usuário navegue à vontade
    setVideoFile(null);
    setVideoPreviewUrl('');
    setCaption('');
    setVideoThumbnail('');
    setSuggestedTags([]);
    setIsScheduled(false);
    setScheduleDateTime('');
    setCreationStep(1);
    setTiktokPrivacy('');
    setTiktokComment(false);
    setTiktokDuet(false);
    setTiktokStitch(false);
    setCommercialDisclosure(false);
    setPromoteYourBrand(false);
    setPromoteBrandedContent(false);
    setVideoDuration(0);
    
    setUploadMessage('Seu vídeo está sendo enviado em background! Você pode acompanhar o progresso real na aba Fila & Analytics. Atenção: após a conclusão do envio, pode levar alguns minutos para que o TikTok processe o conteúdo e o torne visível em seu perfil.');
    setTimeout(() => setUploadMessage(''), 8000);

    // 7. Dispara a Promise em background de forma assíncrona (suporta múltiplas requisições paralelas)
    (async () => {
      let uploadSuccess = true;
      let errorMessage = '';

      // 1. Processa upload do TikTok se selecionado e conectado
      if (bgSelectedPlatforms.includes('tiktok') && tiktokConnected) {
        const formData = new FormData();
        formData.append('email', bgEmail);
        formData.append('title', bgCaption);
        formData.append('video', bgVideoFile);
        formData.append('post_id', postId);
        formData.append('privacy_level', tiktokPrivacy);
        formData.append('disable_comment', !tiktokComment);
        formData.append('disable_duet', !tiktokDuet);
        formData.append('disable_stitch', !tiktokStitch);

        try {
          const uploadPromise = () => new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_BASE_URL}/api/tiktok/upload`);
            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploadingPosts(prev => {
                  if (!prev[postId]) return prev;
                  const maxPercent = bgSelectedPlatforms.includes('youtube') && youtubeConnected ? 7 : 15;
                  return {
                    ...prev,
                    [postId]: { ...prev[postId], progress: Math.min(Math.round(percent * (maxPercent / 100)), maxPercent) }
                  };
                });
              }
            };
            xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Status ${xhr.status}`));
            xhr.onerror = () => reject(new Error('Erro na conexão com o servidor local.'));
            xhr.send(formData);
          });

          await uploadPromise();

          const pollStatus = () => new Promise((resolvePoll, rejectPoll) => {
            const checkInterval = setInterval(async () => {
              try {
                const res = await fetch(`${API_BASE_URL}/api/tiktok/upload-status?post_id=${postId}`);
                if (!res.ok) return;
                const data = await res.json();
                if (data.status === 'uploading') {
                  setUploadingPosts(prev => {
                    if (!prev[postId]) return prev;
                    let prog = data.progress;
                    if (bgSelectedPlatforms.includes('youtube') && youtubeConnected) {
                      prog = Math.round(data.progress * 0.5);
                    }
                    return { ...prev, [postId]: { ...prev[postId], progress: prog } };
                  });
                } else if (data.status === 'success') {
                  clearInterval(checkInterval);
                  resolvePoll();
                } else if (data.status === 'error') {
                  clearInterval(checkInterval);
                  rejectPoll(new Error(data.message || 'Erro no processamento do TikTok.'));
                }
              } catch (e) {}
            }, 2000);
          });

          await pollStatus();
        } catch (error) {
          uploadSuccess = false;
          errorMessage = `TikTok: ${error.message}`;
        }
      }

      // 2. Processa upload do YouTube se selecionado, conectado (e se não houve erro anterior)
      if (uploadSuccess && bgSelectedPlatforms.includes('youtube') && youtubeConnected) {
        const formData = new FormData();
        formData.append('email', bgEmail);
        formData.append('title', bgCaption);
        formData.append('video', bgVideoFile);
        formData.append('post_id', postId);
        formData.append('privacy_level', 'private');

        try {
          const uploadPromise = () => new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_BASE_URL}/api/youtube/upload`);
            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploadingPosts(prev => {
                  if (!prev[postId]) return prev;
                  const startPercent = bgSelectedPlatforms.includes('tiktok') && tiktokConnected ? 50 : 0;
                  const range = bgSelectedPlatforms.includes('tiktok') && tiktokConnected ? 10 : 15;
                  const current = startPercent + Math.min(Math.round(percent * (range / 100)), range);
                  return { ...prev, [postId]: { ...prev[postId], progress: current } };
                });
              }
            };
            xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Status ${xhr.status}`));
            xhr.onerror = () => reject(new Error('Erro na conexão com o servidor local.'));
            xhr.send(formData);
          });

          await uploadPromise();

          const pollStatus = () => new Promise((resolvePoll, rejectPoll) => {
            const checkInterval = setInterval(async () => {
              try {
                const res = await fetch(`${API_BASE_URL}/api/youtube/upload-status?post_id=${postId}`);
                if (!res.ok) return;
                const data = await res.json();
                if (data.status === 'uploading') {
                  setUploadingPosts(prev => {
                    if (!prev[postId]) return prev;
                    let prog = data.progress;
                    if (bgSelectedPlatforms.includes('tiktok') && tiktokConnected) {
                      prog = 50 + Math.round(data.progress * 0.5);
                    }
                    return { ...prev, [postId]: { ...prev[postId], progress: prog } };
                  });
                } else if (data.status === 'success') {
                  clearInterval(checkInterval);
                  resolvePoll();
                } else if (data.status === 'error') {
                  clearInterval(checkInterval);
                  rejectPoll(new Error(data.message || 'Erro no processamento do YouTube.'));
                }
              } catch (e) {}
            }, 2000);
          });

          await pollStatus();
        } catch (error) {
          uploadSuccess = false;
          errorMessage = `YouTube: ${error.message}`;
        }
      }

      // 3. Simulação fluida de progresso (caso não envie para nenhuma rede real)
      const hasRealTiktok = bgSelectedPlatforms.includes('tiktok') && tiktokConnected;
      const hasRealYoutube = bgSelectedPlatforms.includes('youtube') && youtubeConnected;

      if (!hasRealTiktok && !hasRealYoutube) {
        for (let p = 0; p <= 100; p += 10) {
          setUploadingPosts(prev => {
            if (!prev[postId]) return prev;
            return {
              ...prev,
              [postId]: { ...prev[postId], progress: p }
            };
          });
          await new Promise(r => setTimeout(r, 200));
        }
      }

      if (uploadSuccess) {
        setUploadingPosts(prev => {
          if (!prev[postId]) return prev;
          return {
            ...prev,
            [postId]: { ...prev[postId], progress: 100, status: 'success' }
          };
        });

        setPostsList(prev => {
          const updated = prev.map(p => {
            if (p.id === postId) {
              return { ...p, status: bgIsScheduled ? 'Agendado' : 'Publicado' };
            }
            return p;
          });
          localStorage.setItem('posts', JSON.stringify(updated));
          return updated;
        });

        addNotification(
          'success',
          bgIsScheduled ? 'Agendamento Concluído' : 'Publicado com Sucesso',
          `✓ O vídeo "${bgCaption.substring(0, 30)}${bgCaption.length > 30 ? '...' : ''}" foi ${bgIsScheduled ? 'agendado' : 'publicado'} com sucesso nas redes!`
        );

        setTimeout(() => {
          setUploadingPosts(prev => {
            const copy = { ...prev };
            delete copy[postId];
            return copy;
          });
        }, 3000);
      } else {
        setUploadingPosts(prev => {
          if (!prev[postId]) return prev;
          return {
            ...prev,
            [postId]: { ...prev[postId], status: 'error', progress: 0, message: errorMessage }
          };
        });

        setPostsList(prev => {
          const updated = prev.map(p => {
            if (p.id === postId) {
              return { ...p, status: 'Erro' };
            }
            return p;
          });
          localStorage.setItem('posts', JSON.stringify(updated));
          return updated;
        });

        addNotification(
          'error',
          'Erro de Publicação',
          `✕ Falha ao enviar o vídeo "${bgCaption.substring(0, 30)}${bgCaption.length > 30 ? '...' : ''}": ${errorMessage}`
        );
      }
    })();
  };

  const getConsentStatement = () => {
    if (!selectedPlatforms.includes('tiktok')) return null;
    if (commercialDisclosure) {
      if (promoteBrandedContent) {
        return "Ao postar, você concorda com a Política de Conteúdo de Marca do TikTok e a Confirmação de Uso de Música.";
      }
      return "Ao postar, você concorda com a Confirmação de Uso de Música do TikTok.";
    }
    return "Ao postar, você concorda com a Confirmação de Uso de Música do TikTok.";
  };

  const isPublishDisabled = selectedPlatforms.length === 0 || 
    (selectedPlatforms.includes('tiktok') && commercialDisclosure && !promoteYourBrand && !promoteBrandedContent);

  return (
    <div className="dashboard-layout">
      {/* Header do Painel */}
      <header className="dashboard-header glass-panel-heavy">
        <div className="dash-header-container max-width-container">
          <div className="dash-brand">
            <LogoIcon size={34} />
            <div className="dash-brand-text-group">
              <span className="dash-logo-text">Post<span className="logo-highlight">Recap</span></span>
              <span className="dash-brand-subtitle">Creator Studio</span>
            </div>
          </div>

          <div className="dash-user-menu">
            {/* Abas Superiores de Navegação no Header (Lado Direito) */}
            <nav className="dash-nav-tabs">
              <button 
                onClick={() => setActiveTab('studio')} 
                className={`dash-tab-btn ${activeTab === 'studio' ? 'active' : ''}`}
              >
                <Video size={16} /> Estúdio de Criação
              </button>
              <button 
                onClick={() => setActiveTab('manager')} 
                className={`dash-tab-btn ${activeTab === 'manager' ? 'active' : ''}`}
              >
                <LayoutDashboard size={16} /> Fila & Analytics
              </button>
            </nav>

            {/* Indicador de Contas Vinculadas no Header (Lado Direito) */}
            <div className="header-connections-indicator">
              <span className="indicator-label">Canais:</span>
              
              {/* TikTok Badge */}
              <div 
                onClick={() => setShowConnectionsModal(true)} 
                className={`platform-header-badge tt-header-badge ${tiktokConnected ? 'connected' : 'disconnected'}`}
                title={tiktokConnected ? `TikTok: @${tiktokUsername} (Clique para gerenciar)` : 'Conectar TikTok Sandbox (Requer Conexão)'}
              >
                <TikTokIcon size={13} />
                <span className={`status-dot ${tiktokConnected ? 'active' : 'inactive'}`} />
              </div>

              {/* Instagram Badge */}
              <div 
                onClick={() => setShowConnectionsModal(true)} 
                className={`platform-header-badge ig-header-badge ${instagramConnected ? 'connected' : 'disconnected'}`}
                title={instagramConnected ? `Instagram: @${instagramUsername} (Clique para gerenciar)` : 'Conectar Instagram Sandbox (Requer Conexão)'}
              >
                <InstagramIcon size={13} />
                <span className={`status-dot ${instagramConnected ? 'active' : 'inactive'}`} />
              </div>

              {/* YouTube Badge */}
              <div 
                onClick={() => setShowConnectionsModal(true)} 
                className={`platform-header-badge yt-header-badge ${youtubeConnected ? 'connected' : 'disconnected'}`}
                title={youtubeConnected ? `YouTube: ${youtubeChannelName} (Clique para gerenciar)` : 'Conectar YouTube Sandbox (Requer Conexão)'}
              >
                <YoutubeIcon size={13} />
                <span className={`status-dot ${youtubeConnected ? 'active' : 'inactive'}`} />
              </div>
            </div>

            {/* Ícone do Sino com Painel Flutuante de Notificações */}
            <div className="notifications-menu-wrapper" ref={notificationsDropdownRef}>
              <button 
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                  // Ao abrir, marca todas como lidas
                  if (!showNotificationsDropdown) {
                    handleMarkAllNotificationsAsRead();
                  }
                }} 
                className="notifications-bell-btn"
                title="Notificações"
                type="button"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notifications-badge-pulse">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotificationsDropdown && (
                  <motion.div 
                    className="notifications-dropdown-menu glass-panel-heavy"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="notifications-dropdown-header">
                      <span className="notif-title">Notificações</span>
                      {notifications.length > 0 && (
                        <button onClick={handleClearAllNotifications} className="clear-all-btn" type="button">
                          Limpar Tudo
                        </button>
                      )}
                    </div>
                    
                    <div className="dropdown-divider" />
                    
                    <div className="notifications-list-container">
                      {notifications.length === 0 ? (
                        <div className="no-notifications-state">
                          <span>Nenhuma notificação por enquanto</span>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className={`notif-dropdown-item ${n.read ? 'read' : 'unread'} ${n.type}`}>
                            <div className="notif-item-header">
                              <span className="notif-item-title-text">{n.title}</span>
                              <button onClick={(e) => handleDeleteNotification(n.id, e)} className="notif-delete-btn" type="button">
                                <Plus size={10} style={{ transform: 'rotate(45deg)', display: 'block' }} />
                              </button>
                            </div>
                            <p className="notif-item-message">{n.message}</p>
                            <span className="notif-item-time">
                              {new Date(n.timestamp).toLocaleDateString('pt-BR')} {new Date(n.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {notifications.length > 0 && (
                      <>
                        <div className="dropdown-divider" />
                        <div className="notifications-dropdown-footer">
                          <button onClick={handleClearOldNotifications} className="clear-old-btn" type="button">
                            Limpar Antigas (mais de 1 semana)
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bolinha do Perfil com Dropdown flutuante */}
            <div className="user-menu-wrapper" ref={dropdownRef}>
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)} 
                className="user-avatar-btn"
                title={userName || userEmail || "Minha Conta"}
                type="button"
              >
                {userAvatar ? (
                  <div className="user-avatar-img" style={{ backgroundImage: `url(${userAvatar})` }} />
                ) : (
                  <span className="user-avatar-initial">{(userName || userEmail || 'U').charAt(0).toUpperCase()}</span>
                )}
              </button>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div 
                    className="user-dropdown-menu glass-panel-heavy"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="dropdown-user-details">
                      <span className="dropdown-username">{userName || 'Criador'}</span>
                      <span className="dropdown-email">{userEmail}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <button onClick={handleSignOut} className="dropdown-item logout-item" type="button">
                      <LogOut size={14} /> Sair da Conta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Grid Principal */}
      <main className="dash-content-grid max-width-container">
        
        {/* ABA 1: ESTÚDIO DE CRIAÇÃO */}
        {activeTab === 'studio' && (
          <>
            <section className="dash-control-panel">
              {/* Status Message global */}
              <AnimatePresence>
                {uploadMessage && (
                  <motion.div
                    className="global-message glass-panel"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>{uploadMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TRATAMENTO DE ESTADO VAZIO (SEM NENHUMA CONEXÃO VINCULADA) */}
              {!(tiktokConnected || instagramConnected || youtubeConnected) ? (
                <motion.div
                  className="dash-card glass-panel empty-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="empty-state-icon-wrapper" style={{ 
                    animation: 'none', 
                    background: 'rgba(138, 63, 252, 0.05)', 
                    border: '1px solid rgba(138, 63, 252, 0.15)', 
                    borderRadius: '50%', 
                    width: '80px', 
                    height: '80px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '20px' 
                  }}>
                    <Lock size={32} color="var(--primary)" />
                  </div>
                  <h4>Estúdio de Criação Bloqueado</h4>
                  <p style={{ maxWidth: '340px', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    Para liberar o simulador móvel de retenção visual e a postagem multicanais por etapas, vincule pelo menos uma rede social Sandbox no cabeçalho.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setShowConnectionsModal(true)} 
                    className="glow-btn"
                    style={{ marginTop: '24px', padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Link2 size={16} /> Vincular Primeira Conta
                  </button>
                </motion.div>
              ) : (
                /* CARD 2: EDITOR DE CONTEÚDO (Com Stepper Flow) */
                <motion.div
                  className="dash-card glass-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Cabeçalho do Stepper */}
                  <div className="stepper-progress-header">
                    <button 
                      type="button"
                      onClick={() => videoFile && setCreationStep(1)}
                      className={`step-indicator ${creationStep === 1 ? 'active' : ''} ${creationStep > 1 ? 'completed' : ''}`}
                      disabled={!videoFile}
                    >
                      <span className="step-num">{creationStep > 1 ? <Check size={10} strokeWidth={3} /> : '1'}</span>
                      Carregar Vídeo
                    </button>
                    <div className={`step-line ${creationStep > 1 ? 'active' : ''}`} />
                    <button 
                      type="button"
                      className={`step-indicator ${creationStep === 2 ? 'active' : ''}`}
                      disabled={!videoFile}
                    >
                      <span className="step-num">2</span>
                      Detalhes do Post
                    </button>
                  </div>

                  <form onSubmit={handlePublish} className="content-form">
                    
                    {/* ETAPA 1: UPLOAD DE VÍDEO */}
                    {creationStep === 1 && (
                      <div className="step-animation-wrap">
                        <div className="form-group" style={{ marginBottom: '24px' }}>
                          <span className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Upload size={16} color="var(--primary)" /> Enviar Arquivo de Vídeo (Vertical)
                          </span>
                          <div 
                            className={`drag-drop-area ${dragActive ? 'active' : ''} ${videoFile ? 'has-file' : ''}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                            style={{ padding: '50px 30px' }}
                          >
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="video/*" onChange={handleFileChange} />
                            {videoFile ? (
                              <div className="file-details">
                                <CheckCircle2 size={36} color="var(--success)" />
                                <span className="file-name" style={{ fontSize: '0.95rem', fontWeight: '700' }}>{videoFile.name}</span>
                                <span className="file-size" style={{ opacity: 0.7 }}>{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                                <span className="change-file-btn" style={{ fontWeight: '600' }}>Clique ou arraste outro para alterar</span>
                              </div>
                            ) : (
                              <div className="drag-prompt">
                                <Upload size={38} className="upload-icon" style={{ marginBottom: '5px' }} />
                                <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Arraste seu vídeo aqui</span>
                                <span className="sub-prompt">ou <strong style={{ color: 'var(--primary)', textDecoration: 'underline' }}>procure arquivos</strong> no dispositivo</span>
                                <span className="sub-prompt" style={{ fontSize: '0.75rem', marginTop: '4px' }}>Formatos suportados: MP4, MOV vertical (Proporção 9:16)</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-actions" style={{ marginTop: '20px' }}>
                          <button 
                            type="button" 
                            onClick={handleNextStep} 
                            className="glow-btn"
                            style={{ width: '100%', justifyContent: 'center', height: '48px', fontSize: '0.9rem' }} 
                            disabled={!videoFile}
                          >
                            Avançar para Detalhes <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ETAPA 2: CONFIGURAÇÃO DE DETALHES */}
                    {creationStep === 2 && videoFile && (
                      <div className="step-animation-wrap">
                        {/* Mini Barra do Vídeo Selecionado (Destaque Reduzido) */}
                        <div className="compact-video-bar">
                          <div className="compact-video-info">
                            <div className="compact-video-icon">
                              <Film size={15} />
                            </div>
                            <div className="compact-video-text">
                              <span className="compact-video-name" title={videoFile.name}>{videoFile.name}</span>
                              <span className="compact-video-size">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              setVideoFile(null);
                              setVideoPreviewUrl('');
                              setCreationStep(1);
                            }} 
                            className="compact-video-change-btn"
                          >
                            Alterar Vídeo
                          </button>
                        </div>

                        {/* SELEÇÃO DE REDES SOCIAIS PREMIUM (Publicar Em) */}
                        <div className="form-group">
                          <span className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                            <Share2 size={15} color="var(--primary)" /> Canais de Distribuição (Publicar Em)
                          </span>
                          
                          <div className="distrib-channels-premium-row">
                            
                            {/* TikTok Channel Button */}
                            <button
                              type="button"
                              onClick={() => tiktokConnected ? togglePlatformSelection('tiktok') : null}
                              className={`premium-channel-btn ${selectedPlatforms.includes('tiktok') ? 'selected' : ''} ${!tiktokConnected ? 'unconnected' : ''}`}
                              disabled={!tiktokConnected}
                            >
                              <div className="channel-icon-wrapper tt-glow">
                                <TikTokIcon size={18} />
                              </div>
                              <div className="channel-btn-details">
                                <span className="channel-title">TikTok</span>
                                <span className="channel-subtitle">
                                  {tiktokConnected ? `@${tiktokUsername}` : 'Desconectado'}
                                </span>
                              </div>
                              {tiktokConnected ? (
                                <div className="channel-status-indicator">
                                  {selectedPlatforms.includes('tiktok') ? (
                                    <div className="indicator-checked"><Check size={9} strokeWidth={4} /></div>
                                  ) : (
                                    <div className="indicator-unchecked" />
                                  )}
                                </div>
                              ) : (
                                <span className="premium-badge-unconnected">Requer Conexão</span>
                              )}
                            </button>

                            {/* Instagram Channel Button */}
                            <button
                              type="button"
                              onClick={() => instagramConnected ? togglePlatformSelection('instagram') : null}
                              className={`premium-channel-btn ${selectedPlatforms.includes('instagram') ? 'selected' : ''} ${!instagramConnected ? 'unconnected' : ''}`}
                              disabled={!instagramConnected}
                            >
                              <div className="channel-icon-wrapper ig-glow">
                                <InstagramIcon size={18} />
                              </div>
                              <div className="channel-btn-details">
                                <span className="channel-title">Instagram</span>
                                <span className="channel-subtitle">
                                  {instagramConnected ? `@${instagramUsername}` : 'Desconectado'}
                                </span>
                              </div>
                              {instagramConnected ? (
                                <div className="channel-status-indicator">
                                  {selectedPlatforms.includes('instagram') ? (
                                    <div className="indicator-checked"><Check size={9} strokeWidth={4} /></div>
                                  ) : (
                                    <div className="indicator-unchecked" />
                                  )}
                                </div>
                              ) : (
                                <span className="premium-badge-unconnected">Requer Conexão</span>
                              )}
                            </button>

                            {/* YouTube Channel Button */}
                            <button
                              type="button"
                              onClick={() => youtubeConnected ? togglePlatformSelection('youtube') : null}
                              className={`premium-channel-btn ${selectedPlatforms.includes('youtube') ? 'selected' : ''} ${!youtubeConnected ? 'unconnected' : ''}`}
                              disabled={!youtubeConnected}
                            >
                              <div className="channel-icon-wrapper yt-glow">
                                <YoutubeIcon size={18} />
                              </div>
                              <div className="channel-btn-details">
                                <span className="channel-title">YouTube</span>
                                <span className="channel-subtitle">
                                  {youtubeConnected ? youtubeChannelName : 'Desconectado'}
                                </span>
                              </div>
                              {youtubeConnected ? (
                                <div className="channel-status-indicator">
                                  {selectedPlatforms.includes('youtube') ? (
                                    <div className="indicator-checked"><Check size={9} strokeWidth={4} /></div>
                                  ) : (
                                    <div className="indicator-unchecked" />
                                  )}
                                </div>
                              ) : (
                                <span className="premium-badge-unconnected">Requer Conexão</span>
                              )}
                            </button>

                          </div>
                        </div>

                        {/* Legenda do Post */}
                        <div className="form-group" style={{ marginTop: '20px' }}>
                          <label className="form-label" htmlFor="caption">Legenda / Texto do Post</label>
                          <textarea 
                            id="caption" className="form-textarea" 
                            placeholder="Escreva a legenda e as tags que serão simuladas..."
                            rows={3} value={caption} onChange={(e) => setCaption(e.target.value)}
                          />
                        </div>

                        {/* Hashtags IA */}
                        <div className="form-group">
                          <div className="hashtag-generator-header">
                            <span className="form-label">Hashtags Recomendadas por IA</span>
                            <button type="button" onClick={handleSuggestTags} className="sec-btn ai-tag-btn" disabled={isGeneratingTags || !caption}>
                              <Sparkles size={13} className={isGeneratingTags ? 'spin-animation' : ''} />
                              {isGeneratingTags ? 'Analisando...' : 'Sugerir Tags'}
                            </button>
                          </div>
                          {suggestedTags.length > 0 && (
                            <div className="suggested-tags-list">
                              {suggestedTags.map((tag, idx) => (
                                <button key={idx} type="button" className="tag-pill" onClick={() => addTagToCaption(tag)}>
                                  + {tag}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* CONFIGURAÇÕES DE METADADOS DO TIKTOK */}
                        {selectedPlatforms.includes('tiktok') && (
                          <div className="tiktok-metadata-section glass-panel" style={{ marginTop: '20px', padding: '16px', border: '1px solid rgba(22, 119, 255, 0.15)', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
                              <TikTokIcon size={16} />
                              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Metadados do TikTok</span>
                              {tiktokNickname && (
                                <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: 'auto' }}>
                                  Destino: <strong style={{ color: 'var(--tiktok-cyan)' }}>@{tiktokNickname}</strong>
                                </span>
                              )}
                            </div>

                            {/* Nickname e Avatar da Conta */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px' }}>
                              {tiktokAvatar ? (
                                <img src={tiktokAvatar} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                              ) : (
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                                  {(tiktokNickname || 'T').charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Publicando na conta de: <strong>{tiktokNickname || 'Conta Sandbox'}</strong>
                              </span>
                            </div>

                            {/* Dropdown de Privacidade (Privacy Status) */}
                            <div className="form-group" style={{ marginBottom: '16px' }}>
                              <label className="form-label" htmlFor="tiktok-privacy" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                Status de Privacidade (Obrigatório)
                                <span style={{ fontSize: '0.7rem', color: 'var(--error)' }}>* Requer seleção manual</span>
                              </label>
                              <select
                                id="tiktok-privacy"
                                className="form-input"
                                value={tiktokPrivacy}
                                onChange={(e) => setTiktokPrivacy(e.target.value)}
                                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.82rem' }}
                              >
                                <option value="" disabled>Selecione o nível de privacidade...</option>
                                {creatorInfo?.privacy_level_options?.map((opt) => {
                                  let label = opt;
                                  if (opt === 'PUBLIC_TO_EVERYONE') label = 'Público (Todos)';
                                  else if (opt === 'MUTUAL_FOLLOW_FRIENDS') label = 'Amigos (Seguidores Mútuos)';
                                  else if (opt === 'SELF_ONLY') label = 'Apenas Eu (Privado)';
                                  else if (opt === 'FOLLOWER_OF_CREATOR') label = 'Seguidores';
                                  
                                  const isDisabled = opt === 'SELF_ONLY' && commercialDisclosure && promoteBrandedContent;
                                  
                                  return (
                                    <option 
                                      key={opt} 
                                      value={opt} 
                                      disabled={isDisabled}
                                    >
                                      {label} {isDisabled ? ' - (Indisponível para Conteúdo de Marca)' : ''}
                                    </option>
                                  );
                                })}
                              </select>
                              {commercialDisclosure && promoteBrandedContent && (
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                                  💡 <em>Nota: Conteúdo de Marca não permite visibilidade privada ("Só Eu").</em>
                                </span>
                              )}
                            </div>

                            {/* Permissões de Interação */}
                            <div className="form-group" style={{ marginBottom: '16px' }}>
                              <span className="form-label" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>Configurações de Interação (Desmarcadas por padrão)</span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: creatorInfo?.comment_disabled ? 'not-allowed' : 'pointer', opacity: creatorInfo?.comment_disabled ? 0.5 : 1 }}>
                                  <input
                                    type="checkbox"
                                    checked={tiktokComment}
                                    onChange={(e) => setTiktokComment(e.target.checked)}
                                    disabled={creatorInfo?.comment_disabled}
                                  />
                                  Permitir Comentários {creatorInfo?.comment_disabled && ' (Desativado pelo perfil)'}
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: creatorInfo?.duet_disabled ? 'not-allowed' : 'pointer', opacity: creatorInfo?.duet_disabled ? 0.5 : 1 }}>
                                  <input
                                    type="checkbox"
                                    checked={tiktokDuet}
                                    onChange={(e) => setTiktokDuet(e.target.checked)}
                                    disabled={creatorInfo?.duet_disabled}
                                  />
                                  Permitir Dueto {creatorInfo?.duet_disabled && ' (Desativado pelo perfil)'}
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: creatorInfo?.stitch_disabled ? 'not-allowed' : 'pointer', opacity: creatorInfo?.stitch_disabled ? 0.5 : 1 }}>
                                  <input
                                    type="checkbox"
                                    checked={tiktokStitch}
                                    onChange={(e) => setTiktokStitch(e.target.checked)}
                                    disabled={creatorInfo?.stitch_disabled}
                                  />
                                  Permitir Ponto / Stitch {creatorInfo?.stitch_disabled && ' (Desativado pelo perfil)'}
                                </label>
                              </div>
                            </div>

                            {/* Divulgação de Conteúdo Comercial */}
                            <div className="form-group" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span className="form-label" style={{ fontSize: '0.8rem', marginBottom: 0 }}>Conteúdo Comercial (Divulgação)</span>
                                <label className="switch-toggle" style={{ transform: 'scale(0.85)' }}>
                                  <input
                                    type="checkbox"
                                    checked={commercialDisclosure}
                                    onChange={(e) => {
                                      const val = e.target.checked;
                                      setCommercialDisclosure(val);
                                      if (!val) {
                                        setPromoteYourBrand(false);
                                        setPromoteBrandedContent(false);
                                      }
                                    }}
                                  />
                                  <span className="switch-slider"></span>
                                </label>
                              </div>

                              {commercialDisclosure && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)' }}
                                >
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                                    Selecione as opções de promoção comercial para este conteúdo:
                                  </span>

                                  {/* Checkbox: Sua Marca */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', cursor: 'pointer' }}>
                                      <input
                                        type="checkbox"
                                        checked={promoteYourBrand}
                                        onChange={(e) => setPromoteYourBrand(e.target.checked)}
                                      />
                                      Sua Marca (Sua empresa/negócio)
                                    </label>
                                    {promoteYourBrand && (
                                      <span style={{ fontSize: '0.7rem', color: 'var(--tiktok-magenta)', marginLeft: '22px' }}>
                                        📢 Sua foto/vídeo será rotulado como <strong>"Conteúdo Promocional"</strong>
                                      </span>
                                    )}
                                  </div>

                                  {/* Checkbox: Conteúdo de Marca */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', cursor: 'pointer' }}>
                                      <input
                                        type="checkbox"
                                        checked={promoteBrandedContent}
                                        onChange={(e) => {
                                          const val = e.target.checked;
                                          setPromoteBrandedContent(val);
                                          if (val && tiktokPrivacy === 'SELF_ONLY') {
                                            setTiktokPrivacy('');
                                            alert('A visibilidade de conteúdo de marca não pode ser privada ("Só Eu"). A seleção de privacidade foi redefinida.');
                                          }
                                        }}
                                      />
                                      Conteúdo de Marca (Promovendo outro negócio)
                                    </label>
                                    {promoteBrandedContent && (
                                      <span style={{ fontSize: '0.7rem', color: 'var(--tiktok-magenta)', marginLeft: '22px' }}>
                                        🤝 Sua foto/vídeo será rotulado como <strong>"Parceria paga"</strong>
                                      </span>
                                    )}
                                  </div>

                                  {promoteYourBrand && promoteBrandedContent && (
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '6px', fontSize: '0.7rem', color: '#ffc107' }}>
                                      ⚠️ Como ambas as opções foram marcadas, a publicação será rotulada como <strong>"Parceria paga"</strong>.
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* AGENDADOR DE POSTAGEM */}
                        <div className="form-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
                          <div className="scheduler-header">
                            <div className="sched-label-wrap">
                              <Calendar size={16} color="var(--primary)" />
                              <span className="form-label" style={{ marginBottom: 0 }}>Agendar Publicação</span>
                            </div>
                            <label className="switch-toggle">
                              <input 
                                type="checkbox" 
                                checked={isScheduled} 
                                onChange={(e) => setIsScheduled(e.target.checked)} 
                              />
                              <span className="switch-slider"></span>
                            </label>
                          </div>

                          {isScheduled && (
                            <motion.div 
                              className="scheduler-panel glass-panel"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              style={{ marginTop: '12px', padding: '14px', overflow: 'hidden' }}
                            >
                              <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ fontSize: '0.8rem' }}>Escolha Data & Horário de Postagem</label>
                                <input 
                                  type="datetime-local" 
                                  className="form-input" 
                                  value={scheduleDateTime}
                                  onChange={(e) => setScheduleDateTime(e.target.value)}
                                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}
                                />
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                                  ⚡ <strong>Horário Sugerido por IA:</strong> Hoje às 19:30 (Baseado na retenção média).
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Declaração de Consentimento Obrigatória */}
                        {selectedPlatforms.includes('tiktok') && (
                          <div className="consent-statement-box" style={{ 
                            marginTop: '20px', 
                            padding: '12px', 
                            background: 'rgba(255, 255, 255, 0.03)', 
                            border: '1px solid rgba(255, 255, 255, 0.05)', 
                            borderRadius: '6px', 
                            fontSize: '0.75rem', 
                            color: 'var(--text-secondary)',
                            textAlign: 'center',
                            lineHeight: '1.4'
                          }}>
                            🔒 <strong>Termos de Consentimento:</strong> {getConsentStatement()}
                          </div>
                        )}

                        {/* Botoes de Acao do Stepper */}
                        <div className="stepper-actions-row" style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                          <button 
                            type="button" 
                            onClick={() => setCreationStep(1)} 
                            className="sec-btn"
                            style={{ flex: '1', justifyContent: 'center', height: '46px' }}
                          >
                            <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Voltar
                          </button>
                          
                          <button 
                            type="submit" className="glow-btn publish-btn" 
                            style={{ flex: '2', justifyContent: 'center', height: '46px' }} 
                            disabled={isPublishDisabled}
                            title={
                              (selectedPlatforms.includes('tiktok') && commercialDisclosure && !promoteYourBrand && !promoteBrandedContent)
                                ? "Você precisa indicar se seu conteúdo promove a si mesmo, a um terceiro ou ambos."
                                : ""
                            }
                          >
                            {isScheduled ? 'Agendar Postagem' : 'Publicar nas Redes'}
                          </button>
                        </div>

                      </div>
                    )}

                  </form>
                </motion.div>
              )}
            </section>

            {/* Lado Direito: Simulador */}
            <section className="dash-visual-preview">
              <div className="sticky-preview-container">
                
                
                {tiktokConnected || instagramConnected || youtubeConnected ? (
                  <TikTokMockup 
                    videoUrl={videoPreviewUrl}
                    caption={caption}
                    hashtags={(caption && caption.match(/#[a-zA-Z0-9_]+/g)) || []}
                    username={tiktokUsername || instagramUsername || "kumarecaps"}
                    avatar={tiktokAvatar}
                  />
                ) : (
                  <div className="mockup-placeholder glass-panel">
                    <div className="phone-silhouette">
                      <div className="phone-screen-silhouette">
                        <Disc size={40} className="spin-animation placeholder-icon" />
                        <span>Conecte uma plataforma para carregar o mockup interativo móvel</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* ABA 2: FILA & ANALYTICS */}
        {activeTab === 'manager' && (
          <section className="dash-manager-panel" style={{ gridColumn: 'span 12' }}>
            
            {/* Gerenciador Visual de Fila */}
            <motion.div 
              className="dash-card glass-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="posts-manager-header-visual">
                <div className="manager-title-group">
                  <h3 className="card-title">Gerenciador de Fila & Histórico</h3>
                  <p className="card-desc">Monitore suas postagens e agendamentos multicanais de recap em sandbox.</p>
                </div>
                
                {/* BARRA DE FILTROS INTERATIVOS */}
                <div className="filters-toolbar">
                  {/* Filtro de Status */}
                  <div className="filter-group">
                    <span className="filter-label">Status:</span>
                    <div className="filter-buttons">
                      <button 
                        onClick={() => setFilterStatus('all')}
                        className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                        type="button"
                      >
                        Todos
                      </button>
                      <button 
                        onClick={() => setFilterStatus('published')}
                        className={`filter-btn ${filterStatus === 'published' ? 'active' : ''}`}
                        type="button"
                      >
                        Publicados
                      </button>
                      <button 
                        onClick={() => setFilterStatus('scheduled')}
                        className={`filter-btn ${filterStatus === 'scheduled' ? 'active' : ''}`}
                        type="button"
                      >
                        Agendados
                      </button>
                    </div>
                  </div>

                  {/* Filtro de Plataforma */}
                  <div className="filter-group">
                    <span className="filter-label">Rede:</span>
                    <div className="filter-buttons">
                      <button 
                        onClick={() => setFilterPlatform('all')}
                        className={`filter-btn ${filterPlatform === 'all' ? 'active' : ''}`}
                        type="button"
                      >
                        Todas
                      </button>
                      <button 
                        onClick={() => setFilterPlatform('tiktok')}
                        className={`filter-btn ${filterPlatform === 'tiktok' ? 'active' : ''}`}
                        title="TikTok"
                        type="button"
                      >
                        <TikTokIcon size={12} />
                      </button>
                      <button 
                        onClick={() => setFilterPlatform('instagram')}
                        className={`filter-btn ${filterPlatform === 'instagram' ? 'active' : ''}`}
                        title="Instagram"
                        type="button"
                      >
                        <InstagramIcon size={12} />
                      </button>
                      <button 
                        onClick={() => setFilterPlatform('youtube')}
                        className={`filter-btn ${filterPlatform === 'youtube' ? 'active' : ''}`}
                        title="YouTube"
                        type="button"
                      >
                        <YoutubeIcon size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* LÓGICA DE FILTRAGEM DOS POSTS */}
              {(() => {
                const filteredPosts = postsList.filter(post => {
                  const isScheduledIntent = post.status.toLowerCase() === 'agendado' || 
                    (post.status === 'Enviando' && post.scheduled) || 
                    (post.status === 'Erro' && post.scheduled);
                  
                  const isPublishedIntent = post.status.toLowerCase() === 'publicado' || 
                    (post.status === 'Enviando' && !post.scheduled) || 
                    (post.status === 'Erro' && !post.scheduled);

                  const statusMatch = filterStatus === 'all' || 
                    (filterStatus === 'scheduled' && isScheduledIntent) || 
                    (filterStatus === 'published' && isPublishedIntent);
                  
                  const platformMatch = filterPlatform === 'all' || 
                    post.platforms.includes(filterPlatform);
                  
                  return statusMatch && platformMatch;
                });

                if (filteredPosts.length === 0) {
                  return (
                    <div className="no-posts-found-state">
                      <AlertCircle size={28} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                      <span>Nenhum post encontrado para os filtros selecionados.</span>
                      <p>Vá até o Estúdio e crie uma nova publicação!</p>
                    </div>
                  );
                }

                return (
                  /* GRID VISUAL DE CARDS DE POSTS */
                  <div className="posts-visual-grid">
                    {filteredPosts.map(post => {
                      const isScheduledPost = post.status.toLowerCase() === 'agendado' || 
                        (post.status === 'Enviando' && post.scheduled) || 
                        (post.status === 'Erro' && post.scheduled);
                      const uploadData = uploadingPosts[post.id];
                      const isUploading = post.status === 'Enviando' || !!uploadData;
                      const isUploadError = post.status === 'Erro';
                      
                      return (
                        <div 
                          key={post.id} 
                          className={`post-visual-card ${isScheduledPost ? 'scheduled' : 'published'} ${isUploading ? 'uploading' : ''} ${isUploadError ? 'upload-error' : ''}`}
                        >
                          
                          {/* Capa (Cover / Thumbnail) do Post */}
                          <div className="post-card-cover-wrapper">
                            {post.thumbnail ? (
                              <img src={post.thumbnail} alt="Capa do Vídeo" className="post-card-cover-img" />
                            ) : (
                              /* Fallback Premium se o post mockado não tiver thumbnail */
                              <div className="post-card-cover-fallback">
                                <Film size={26} color="rgba(255,255,255,0.15)" />
                                <span className="fallback-text">Sem Capa</span>
                              </div>
                            )}

                            {/* OVERLAY DE UPLOAD EM SEGUNDO PLANO (Progresso no próprio Card) */}
                            {isUploading && (
                              <div className="post-card-upload-overlay">
                                <RefreshCw size={22} className="spin-animation upload-overlay-icon" />
                                <span className="upload-overlay-title">Enviando</span>
                                <span className="upload-overlay-percent">{uploadData?.progress ?? 0}%</span>
                                <div className="upload-overlay-progress-container">
                                  <div className="upload-overlay-progress-bar" style={{ width: `${uploadData?.progress ?? 0}%` }} />
                                </div>
                              </div>
                            )}

                            {/* OVERLAY DE ERRO NO CARD */}
                            {isUploadError && (
                              <div className="post-card-upload-overlay error">
                                <AlertCircle size={22} className="upload-overlay-icon error" />
                                <span className="upload-overlay-title error">Erro no Envio</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePost(post.id);
                                  }}
                                  className="upload-overlay-retry-btn"
                                  title="Remover Post com Erro"
                                >
                                  Remover
                                </button>
                              </div>
                            )}

                            {/* OVERLAY DE RELÓGIO Pulsante se for Agendado (apenas se não estiver enviando) */}
                            {isScheduledPost && !isUploading && !isUploadError && (
                              <div className="post-card-scheduled-overlay">
                                <div className="overlay-clock-wrapper">
                                  <Clock size={32} className="pulsing-clock" />
                                </div>
                                <span className="overlay-scheduled-label">Agendado</span>
                              </div>
                            )}

                            {/* Badge do Status no Canto da Capa */}
                            {!isUploading && !isUploadError && (
                              <span className={`post-card-status-badge ${isScheduledPost ? 'scheduled' : 'success'}`}>
                                {post.status}
                              </span>
                            )}
                            
                            {isUploading && (
                              <span className="post-card-status-badge uploading">
                                {uploadData?.progress === 100 ? "Concluindo..." : "Enviando..."}
                              </span>
                            )}

                            {isUploadError && (
                              <span className="post-card-status-badge error">
                                Falhou
                              </span>
                            )}

                            {/* Badges de Plataformas (Top Right) */}
                            <div className="post-card-platforms-badges">
                              {post.platforms.includes('tiktok') && (
                                <span className="card-plat-badge card-tt" title="TikTok"><TikTokIcon size={10} /></span>
                              )}
                              {post.platforms.includes('instagram') && (
                                <span className="card-plat-badge card-ig" title="Instagram"><InstagramIcon size={10} /></span>
                              )}
                              {post.platforms.includes('youtube') && (
                                <span className="card-plat-badge card-yt" title="YouTube"><YoutubeIcon size={10} /></span>
                              )}
                            </div>
                          </div>

                          {/* Informações Finais do Card */}
                          <div className="post-card-info">
                            <p className="post-card-caption-text" title={post.caption}>
                              {renderCaptionWithHashtags(post.caption)}
                            </p>
                            
                            <div className="post-card-footer">
                              <span className="post-card-date-label">
                                {post.date}
                              </span>
                              
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="post-card-delete-btn" 
                                title="Remover post"
                                type="button"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </motion.div>
          </section>
        )}
      </main>

      {/* MODAL DE CONEXÃO COM PLATAFORMAS (Estilo Glassmorphism e Centralizado) */}
      <AnimatePresence>
        {showConnectionsModal && (
          <div className="modal-overlay-wrapper">
            <motion.div 
              className="modal-overlay-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConnectionsModal(false)}
            />
            <motion.div 
              className="connections-modal-card glass-panel-heavy"
              initial={{ scale: 0.92, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 15, opacity: 0 }}
              transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
            >
              <div className="modal-header">
                <div className="modal-title-wrap">
                  <Link2 size={20} color="var(--primary)" />
                  <span className="modal-title">Vincular Contas Sandbox</span>
                </div>
                <button 
                  type="button"
                  className="modal-close-btn" 
                  onClick={() => setShowConnectionsModal(false)}
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-desc" style={{ marginBottom: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Gerencie suas chaves e logins Sandbox das redes sociais. Conectar as contas libera os simuladores de feed em tempo real e permite testar postagens automáticas.
                </p>

                <div className="connections-list" style={{ marginTop: 0 }}>
                  {/* Conector TikTok */}
                  {/* Conector TikTok */}
                  <div className={`conn-item ${tiktokConnected ? 'connected' : 'disconnected'}`} style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <div className="conn-info">
                        <div className="platform-icon tt-icon">
                          <TikTokIcon size={20} />
                        </div>
                        <div>
                          <div className="conn-name">TikTok Sandbox API</div>
                          <div className="conn-status">
                            {tiktokConnected && <span className="pulse-dot"></span>}
                            {tiktokConnected ? `Conectado como @${tiktokUsername}` : 'Desconectado'}
                          </div>
                        </div>
                      </div>
                      {tiktokConnected ? (
                        <button onClick={handleTiktokDisconnect} className="sec-btn disconnect-btn" style={{ padding: '8px 14px', fontSize: '0.8rem' }} type="button">
                          Desconectar
                        </button>
                      ) : (
                        <button onClick={handleTiktokConnect} style={{ padding: '8px 14px', fontSize: '0.8rem', backgroundColor: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'background 0.2s' }} type="button" onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#111'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#000'}>
                          <TikTokIcon size={14} /> Conectar com TikTok
                        </button>
                      )}
                    </div>

                    {/* Controle de Simulação de Limite */}
                    {tiktokConnected && (
                      <div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#ffc107', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ⚠️ Simular Limite de Postagens Excedido
                        </span>
                        <label className="switch-toggle" style={{ transform: 'scale(0.75)' }}>
                          <input
                            type="checkbox"
                            checked={simulatedLimitReached}
                            onChange={(e) => setSimulatedLimitReached(e.target.checked)}
                          />
                          <span className="switch-slider"></span>
                        </label>
                      </div>
                    )}
                    
                    {/* Painel de Diagnóstico do Perfil */}
                    <div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Diagnóstico do Perfil TikTok</span>
                        <button
                          type="button"
                          onClick={handleTiktokDebug}
                          disabled={isDebugLoading}
                          className="sec-btn"
                          style={{ padding: '6px 10px', fontSize: '0.7rem', height: 'auto', background: 'rgba(138, 63, 252, 0.1)', borderColor: 'rgba(138, 63, 252, 0.2)', color: 'var(--primary)' }}
                        >
                          {isDebugLoading ? 'Testando...' : 'Testar API de Perfil'}
                        </button>
                      </div>
                      
                      {debugResponse && (
                        <div style={{ 
                          marginTop: '10px', 
                          background: 'rgba(0,0,0,0.5)', 
                          border: '1px solid rgba(255,255,255,0.08)', 
                          borderRadius: '6px', 
                          padding: '10px', 
                          maxHeight: '180px', 
                          overflowY: 'auto',
                          fontSize: '0.72rem',
                          fontFamily: 'monospace',
                          whiteSpace: 'pre-wrap',
                          color: '#a9b2c3',
                          textAlign: 'left',
                          lineHeight: '1.4'
                        }}>
                          <div style={{ fontWeight: 'bold', color: debugResponse.tiktok_api_response?.status_code === 200 ? 'var(--success)' : 'var(--error)', marginBottom: '5px' }}>
                            HTTP Status: {debugResponse.tiktok_api_response?.status_code || 'Erro'}
                          </div>
                          {JSON.stringify(debugResponse, null, 2)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Conector Instagram */}
                  <div className={`conn-item ${instagramConnected ? 'connected' : 'disconnected'}`}>
                    <div className="conn-info">
                      <div className="platform-icon ig-icon" style={{ background: 'rgba(214, 41, 118, 0.1)', color: '#d62976' }}>
                        <InstagramIcon size={20} />
                      </div>
                      <div>
                        <div className="conn-name">Instagram Business API</div>
                        <div className="conn-status">
                          {instagramConnected && <span className="pulse-dot"></span>}
                          {instagramConnected ? `Conectado como @${instagramUsername}` : 'Sandbox Meta (Simulado)'}
                        </div>
                      </div>
                    </div>
                    <button onClick={handleInstagramConnect} className={`sec-btn ${instagramConnected ? 'disconnect-btn' : ''}`} style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                      {instagramConnected ? 'Desconectar' : 'Conectar'}
                    </button>
                  </div>

                  {/* Conector YouTube */}
                  <div className={`conn-item ${youtubeConnected ? 'connected' : 'disconnected'}`}>
                    <div className="conn-info">
                      <div className="platform-icon yt-icon" style={{ background: 'rgba(255, 0, 0, 0.1)', color: '#ff0000' }}>
                        <YoutubeIcon size={20} />
                      </div>
                      <div>
                        <div className="conn-name">YouTube Shorts API</div>
                        <div className="conn-status">
                          {youtubeConnected && <span className="pulse-dot"></span>}
                          {youtubeConnected ? `Vinculado a ${youtubeChannelName}` : 'Canal Studio (Simulado)'}
                        </div>
                      </div>
                    </div>
                    <button onClick={handleYoutubeConnect} className={`sec-btn ${youtubeConnected ? 'disconnect-btn' : ''}`} style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                      {youtubeConnected ? 'Desconectar' : 'Conectar'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}

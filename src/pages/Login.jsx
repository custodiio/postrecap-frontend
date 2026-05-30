import React, { useState } from 'react';
import LogoIcon from '../components/LogoIcon';
import { useNavigate, Link } from 'react-router-dom';
import { 
  auth, 
  googleProvider, 
  db,
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Lock, ArrowLeft, ShieldAlert, Sparkles, CheckCircle, User, Phone } from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Controle de estados adicionais
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado do controle de aprovação de segurança
  const [approvalPending, setApprovalPending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const checkUserApproval = async (userEmail, uid) => {
    try {
      if (!uid) return false;
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data().approved === true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao verificar aprovação no Firestore:", error);
      return false;
    }
  };

  const handleAuthenticationSuccess = async (user) => {
    setLoading(true);
    const approved = await checkUserApproval(user.email, user.uid);
    setLoading(false);
    
    if (approved) {
      // Salva dados de login na sessão
      localStorage.setItem('user_email', user.email);
      localStorage.setItem('user_name', user.displayName || user.email.split('@')[0]);
      localStorage.setItem('user_avatar', user.photoURL || '');
      localStorage.setItem('user_uid', user.uid);
      navigate('/dashboard');
    } else {
      // Bloqueia e exibe tela de aprovação pendente
      setPendingEmail(user.email);
      setApprovalPending(true);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (forgotPassword) {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage('E-mail de recuperação de senha enviado com sucesso!');
        setForgotPassword(false);
      } else if (isSignUp) {
        if (!name.trim() || !phone.trim()) {
          setErrorMessage('Nome e Telefone são obrigatórios para cadastro.');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Salva o documento no Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: name.trim(),
          phone: phone.trim(),
          approved: false,
          createdAt: serverTimestamp()
        });

        await handleAuthenticationSuccess(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await handleAuthenticationSuccess(userCredential.user);
      }
    } catch (error) {
      console.error("Erro durante autenticação/firestore:", error);
      const friendlyMsg = getFriendlyErrorMessage(error.code);
      if (friendlyMsg === 'Ocorreu um erro ao realizar a operação. Tente novamente.' && error.message) {
        setErrorMessage(`Erro: ${error.message}`);
      } else {
        setErrorMessage(friendlyMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Verifica se o usuário já existe no Firestore. Se não, cria com approved: false
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || '',
          phone: '',
          approved: false,
          createdAt: serverTimestamp()
        });
      }

      await handleAuthenticationSuccess(result.user);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(getFriendlyErrorMessage(error.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email': return 'E-mail inválido.';
      case 'auth/user-disabled': return 'Esta conta foi desativada.';
      case 'auth/user-not-found': return 'Não existe nenhum usuário registrado com este e-mail.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      case 'auth/email-already-in-use': return 'Este endereço de e-mail já está em uso por outra conta.';
      case 'auth/weak-password': return 'A senha deve conter pelo menos 6 caracteres.';
      case 'auth/invalid-credential': return 'Credenciais incorretas.';
      default: return 'Ocorreu um erro ao realizar a operação. Tente novamente.';
    }
  };

  // TELA DE PENDÊNCIA DE APROVAÇÃO (REGRA DE SEGURANÇA GLOBAL)
  if (approvalPending) {
    return (
      <div className="login-layout">
        <div className="login-glow-blob c-blob1"></div>
        <div className="login-glow-blob c-blob2"></div>
        
        <div className="login-card glass-panel pulsing-border" style={{ maxWidth: '460px', textAlign: 'center' }}>
          <div className="alert-icon-container">
            <ShieldAlert size={48} color="var(--warning)" />
          </div>
          <h2 className="login-title" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Aprovação Requerida</h2>
          <p className="login-subtitle" style={{ fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5' }}>
            Sua conta com o e-mail <strong style={{ color: 'var(--tiktok-cyan)' }}>{pendingEmail}</strong> foi criada com sucesso, mas ela aguarda aprovação manual do administrador do sistema no banco de dados.
          </p>
          
          <div className="glass-panel" style={{ padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'left', marginBottom: '24px' }}>
            <span style={{ fontWeight: 'bold', color: '#fff', display: 'block', marginBottom: '6px' }}>Instruções para liberação:</span>
            Acesse o <strong style={{color: '#FFCA28'}}>Console do Firebase</strong> (Firestore Database), vá na coleção <code style={{color: '#fff'}}>users</code> e altere o campo <code style={{color: '#00e676'}}>approved</code> para <code style={{color: '#00e676'}}>true</code> no documento deste usuário.
          </div>

          <button 
            onClick={async () => {
              setLoading(true);
              try {
                // Tenta recarregar o usuário atual do Firebase Auth para obter o UID
                await auth.currentUser?.reload();
                const user = auth.currentUser;
                
                if (user) {
                  const approved = await checkUserApproval(user.email, user.uid);
                  if (approved) {
                    localStorage.setItem('user_email', user.email);
                    localStorage.setItem('user_name', user.displayName || user.email.split('@')[0]);
                    localStorage.setItem('user_uid', user.uid);
                    navigate('/dashboard');
                  } else {
                    setErrorMessage('Esta conta ainda não foi aprovada pelo administrador no banco de dados.');
                    setTimeout(() => setErrorMessage(''), 4000);
                  }
                } else {
                  setErrorMessage('Sessão expirada. Por favor, faça login novamente.');
                }
              } catch (e) {
                 setErrorMessage('Erro ao verificar. Tente fazer login novamente.');
              }
              setLoading(false);
            }} 
            className="glow-btn"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
          >
            Já aprovei, entrar
          </button>
          
          {errorMessage && <div className="error-banner" style={{ marginBottom: '15px' }}>{errorMessage}</div>}

          <button 
            onClick={() => {
              setApprovalPending(false);
              setForgotPassword(false);
              setIsSignUp(false);
            }} 
            className="sec-btn"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-layout">
      {/* Botão flutuante de Voltar */}
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Voltar para Home
      </Link>

      <div className="login-glow-blob c-blob1"></div>
      <div className="login-glow-blob c-blob2"></div>

      <div className="login-card glass-panel">
        <div className="login-header">
          <div style={{ marginBottom: '10px' }}><LogoIcon size={48} /></div>
          <h2 className="login-title">
            {forgotPassword ? 'Recuperar Senha' : (isSignUp ? 'Criar Conta' : 'Conectar-se')}
          </h2>
          <p className="login-subtitle">
            {forgotPassword 
              ? 'Insira seu e-mail para receber o link de redefinição' 
              : 'Otimize e planeje sua retenção de vídeo no TikTok'}
          </p>
        </div>

        {errorMessage && <div className="error-banner">{errorMessage}</div>}
        {successMessage && <div className="success-banner"><CheckCircle size={14} /> {successMessage}</div>}

        <form className="login-form" onSubmit={handleEmailAuth}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Endereço de E-mail</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="nome@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {isSignUp && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome Completo</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={18} />
                  <input 
                    type="text" 
                    id="name" 
                    className="form-input" 
                    placeholder="João Silva"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Telefone (WhatsApp)</label>
                <div className="input-with-icon">
                  <Phone className="input-icon" size={18} />
                  <input 
                    type="tel" 
                    id="phone" 
                    className="form-input" 
                    placeholder="(11) 99999-9999"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {!forgotPassword && (
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="password">Senha</label>
                {!isSignUp && (
                  <button 
                    type="button" 
                    className="link-btn" 
                    onClick={() => { setForgotPassword(true); setErrorMessage(''); }}
                    style={{ fontSize: '0.8rem' }}
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input 
                  type="password" 
                  id="password" 
                  className="form-input" 
                  placeholder="Mínimo de 6 caracteres"
                  required={!forgotPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          <button type="submit" className="glow-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Aguarde...' : (forgotPassword ? 'Enviar Link' : (isSignUp ? 'Registrar-se' : 'Entrar'))}
          </button>
        </form>

        {!forgotPassword && (
          <>
            <div className="login-divider">
              <span>ou continue com</span>
            </div>

            <button onClick={handleGoogleLogin} className="google-login-btn sec-btn" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '8px' }}>
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.12h4.03c2.36-2.17 3.72-5.37 3.72-8.74z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.03-3.12c-1.12.75-2.55 1.19-3.93 1.19-3.05 0-5.63-2.06-6.55-4.83H1.31v3.22A12 12 0 0 0 12 24z" />
                <path fill="#FBBC05" d="M5.45 14.33a7.14 7.14 0 0 1 0-4.66V6.45H1.31a12 12 0 0 0 0 11.1l4.14-3.22z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 7.31 0 3.28 2.69 1.31 6.45l4.14 3.22c.92-2.77 3.5-4.83 6.55-4.83z" />
              </svg>
              Google Login
            </button>
          </>
        )}

        <div className="login-footer">
          {forgotPassword ? (
            <button className="link-btn" onClick={() => setForgotPassword(false)}>
              Voltar para o Login
            </button>
          ) : (
            <span>
              {isSignUp ? 'Já possui uma conta?' : 'Não possui uma conta?'}
              <button 
                className="link-btn" 
                onClick={() => { setIsSignUp(!isSignUp); setErrorMessage(''); setSuccessMessage(''); }}
                style={{ marginLeft: '6px', fontWeight: '600' }}
              >
                {isSignUp ? 'Entrar' : 'Cadastre-se'}
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

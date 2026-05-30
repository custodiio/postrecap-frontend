import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase carregada a partir das variáveis de ambiente do Vite (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa o Firebase de forma segura para evitar quebra total caso as chaves do .env não tenham sido preenchidas
let app;
let auth = null;
let googleProvider = null;
let db = null;

const isConfigValid = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'sua_api_key_aqui';

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    db = getFirestore(app);
  } catch (error) {
    console.error("Falha ao inicializar o Firebase com as credenciais fornecidas:", error);
  }
} else {
  console.warn(
    "[Aviso] As chaves reais do Firebase em 'tiktok_approval/.env' não foram configuradas. " +
    "A Landing Page funcionará perfeitamente, mas o login real precisará das credenciais do 'anime-pipeline'."
  );
}

export { 
  auth, 
  googleProvider,
  db,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
};

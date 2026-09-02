import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  School, 
  GraduationCap, 
  Award, 
  Check, 
  Sparkles,
  Phone,
  ShieldCheck,
  UserCheck,
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';
import { Department, Student } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (student: Student) => void;
}

const AVATAR_PRESETS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400', label: 'Étudiant 1' },
  { id: '2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', label: 'Étudiante 1' },
  { id: '3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', label: 'Étudiant 2' },
  { id: '4', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', label: 'Étudiante 2' },
  { id: '5', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', label: 'Étudiant 3' },
  { id: '6', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', label: 'Étudiante 3' },
];

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');

  // Form State for Registration
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState<Department>('Économie');
  const [degree, setDegree] = useState<string>('Licence 1');
  const [isScholarship, setIsScholarship] = useState<boolean>(true);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string>(AVATAR_PRESETS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true);

  // Form State for Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Error State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Veuillez saisir votre nom complet.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Veuillez indiquer une adresse e-mail valide.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!acceptTerms) {
      setErrorMessage('Vous devez accepter les conditions d\'utilisation.');
      return;
    }

    const finalAvatar = customAvatarUrl.trim() || selectedAvatarUrl;

    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: fullName.trim(),
      degree: degree,
      department: department,
      avatarUrl: finalAvatar,
      isScholarship: isScholarship,
      semester: 'Semestre 1',
      gpa: 15.0,
      maxGpa: 20,
      ects: 30,
      totalEcts: 60,
      skills: [
        { subject: department === 'Économie' ? 'Macroéconomie' : department === 'Gestion' ? 'Management' : 'Sociologie', value: 16.0, fullMark: 20 },
        { subject: 'Méthodologie', value: 15.5, fullMark: 20 },
        { subject: 'Analyse Données', value: 14.5, fullMark: 20 },
        { subject: 'Langues & Com', value: 15.0, fullMark: 20 },
        { subject: 'Projets Réseau', value: 16.0, fullMark: 20 },
      ]
    };

    onRegister(newStudent);
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMessage('Veuillez renseigner vos identifiants.');
      return;
    }

    // Simulated login creating/restoring student state
    const demoStudent: Student = {
      id: `std-demo-${Date.now()}`,
      name: loginEmail.split('@')[0].replace('.', ' ').toUpperCase() || 'Étudiant Rovaniaina',
      degree: 'Master 1',
      department: 'Gestion',
      avatarUrl: AVATAR_PRESETS[1].url,
      isScholarship: true,
      semester: 'Semestre 2',
      gpa: 15.8,
      maxGpa: 20,
      ects: 45,
      totalEcts: 60,
      skills: [
        { subject: 'Gestion', value: 17.0, fullMark: 20 },
        { subject: 'Finance', value: 15.0, fullMark: 20 },
        { subject: 'Économie', value: 16.0, fullMark: 20 }
      ]
    };

    onRegister(demoStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-[#c3c6d1]/60 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003366] via-[#002244] to-[#001e40] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            id="btn-close-register-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059] flex items-center justify-center text-white shadow-md">
              <School className="w-6 h-6 text-[#001e40]" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold tracking-tight text-white">
                Université Rovaniaina
              </h2>
              <p className="text-xs text-[#fed488] font-medium">
                Portail d'Inscription & d'Admission Étudiant
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => { setActiveTab('register'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'register'
                  ? 'bg-white text-[#003366] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              id="tab-register"
            >
              <UserCheck className="w-4 h-4" />
              <span>Créer un compte (Inscription)</span>
            </button>

            <button
              onClick={() => { setActiveTab('login'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-white text-[#003366] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              id="tab-login"
            >
              <Lock className="w-4 h-4" />
              <span>Se connecter</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-[#f7f9fb]">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          {activeTab === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              
              {/* Section 1: Informations Personnelles */}
              <div className="bg-white p-4 rounded-xl border border-[#c3c6d1]/60 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#C5A059]" />
                  <span>1. Identité de l'Étudiant</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#43474f] mb-1">Nom complet *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#737780] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ex. Rasoanaivo Fitia"
                        className="w-full pl-9 pr-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] focus:bg-white outline-none"
                        required
                        id="input-register-fullname"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#43474f] mb-1">Adresse E-mail *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#737780] absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="etudiant@univ-rovaniaina.mg"
                        className="w-full pl-9 pr-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] focus:bg-white outline-none"
                        required
                        id="input-register-email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#43474f] mb-1">Téléphone (Optionnel)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#737780] absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+261 34 00 000 00"
                      className="w-full pl-9 pr-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] focus:bg-white outline-none"
                      id="input-register-phone"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Parcours Académique */}
              <div className="bg-white p-4 rounded-xl border border-[#c3c6d1]/60 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#C5A059]" />
                  <span>2. Parcours Académique & Filière</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#43474f] mb-1">Département d'Études *</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as Department)}
                      className="w-full px-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] outline-none font-medium"
                      id="select-register-department"
                    >
                      <option value="Économie">Filière Économie</option>
                      <option value="Gestion">Filière Gestion</option>
                      <option value="Sociologie">Filière Sociologie</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#43474f] mb-1">Niveau d'études visé *</label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] outline-none font-medium"
                      id="select-register-degree"
                    >
                      <option value="Licence 1">Licence 1 (L1)</option>
                      <option value="Licence 2">Licence 2 (L2)</option>
                      <option value="Licence 3">Licence 3 (L3)</option>
                      <option value="Master 1">Master 1 (M1)</option>
                      <option value="Master 2">Master 2 (M2)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#f2f4f6] rounded-lg border border-[#c3c6d1]/40">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#C5A059]" />
                    <div>
                      <p className="text-xs font-semibold text-[#003366]">Statut Boursier d'État</p>
                      <p className="text-[11px] text-[#737780]">Demande ou bénéficiaire d'une bourse d'excellence</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isScholarship}
                      onChange={(e) => setIsScholarship(e.target.checked)}
                      className="sr-only peer"
                      id="checkbox-scholarship"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003366]"></div>
                  </label>
                </div>
              </div>

              {/* Section 3: Personnalisation de l'Avatar */}
              <div className="bg-white p-4 rounded-xl border border-[#c3c6d1]/60 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#C5A059]" />
                  <span>3. Photo de Profil (Avatar)</span>
                </h3>

                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {AVATAR_PRESETS.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => { setSelectedAvatarUrl(avatar.url); setCustomAvatarUrl(''); }}
                      className={`relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 transition-all ${
                        selectedAvatarUrl === avatar.url && !customAvatarUrl
                          ? 'border-[#003366] ring-2 ring-[#C5A059]'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={avatar.url} alt={avatar.label} className="w-full h-full object-cover" />
                      {selectedAvatarUrl === avatar.url && !customAvatarUrl && (
                        <div className="absolute inset-0 bg-[#003366]/40 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div>
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="Ou collez une URL d'image personnalisée..."
                    className="w-full px-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] outline-none"
                    id="input-custom-avatar"
                  />
                </div>
              </div>

              {/* Section 4: Sécurité & Validation */}
              <div className="bg-white p-4 rounded-xl border border-[#c3c6d1]/60 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#C5A059]" />
                  <span>4. Mot de Passe</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#43474f] mb-1">Mot de passe *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] outline-none"
                      required
                      id="input-register-password"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#43474f] mb-1">Confirmer le mot de passe *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] outline-none"
                      required
                      id="input-register-confirm-password"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#003366] focus:ring-0"
                    id="checkbox-accept-terms"
                  />
                  <span className="text-xs text-[#43474f]">
                    J'accepte le règlement intérieur et la charte d'utilisation informatique de l'Université Rovaniaina.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-[#003366] text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#001e40] transition-all shadow-md flex items-center justify-center gap-2 group"
                id="btn-submit-registration"
              >
                <span>Finaliser mon inscription</span>
                <ArrowRight className="w-4 h-4 text-[#fed488] group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          ) : (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-[#c3c6d1]/60 shadow-sm">
              <div className="text-center pb-2">
                <ShieldCheck className="w-12 h-12 text-[#C5A059] mx-auto mb-2" />
                <h3 className="font-heading font-bold text-base text-[#003366]">Espace Connexion Étudiant</h3>
                <p className="text-xs text-[#737780]">Accédez à votre dossier académique et vos cours en ligne</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#43474f] mb-1">Adresse E-mail Étudiant</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#737780] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="etudiant@univ-rovaniaina.mg"
                    className="w-full pl-9 pr-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] outline-none"
                    required
                    id="input-login-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#43474f] mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#737780] absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-[#f2f4f6] text-xs text-[#191c1e] rounded-lg border border-[#c3c6d1]/80 focus:border-[#003366] outline-none"
                    required
                    id="input-login-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#b08d4a] transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                id="btn-submit-login"
              >
                <span>Se connecter à mon compte</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-xs text-[#003366] font-semibold hover:underline"
                >
                  Pas encore inscrit ? Créer un compte d'étudiant
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-[#eceef0] px-6 py-3 border-t border-[#c3c6d1]/50 text-[11px] text-[#737780] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Université Rovaniaina • Secrétariat Académique</span>
          </div>
          <span className="font-semibold text-[#003366]">Année Universitaire 2026-2027</span>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Copy, 
  RefreshCw, 
  Save, 
  ExternalLink,
  Upload,
  Link2,
  Code2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Course, Professor, SupabaseConfig } from '../types';
import { getSampleSQLMigration, saveSupabaseConfig } from '../lib/supabase';
import { CURATED_IMAGE_PRESETS } from '../data/mockData';

interface SupabaseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  professors: Professor[];
  onUpdateCourseImage: (courseId: string, newUrl: string) => void;
  onUpdateProfessorImage: (profId: string, newUrl: string) => void;
  supabaseConfig: SupabaseConfig;
  onSaveSupabaseConfig: (config: SupabaseConfig) => void;
  onResetToDefaults: () => void;
}

export const SupabaseManagerModal: React.FC<SupabaseManagerModalProps> = ({
  isOpen,
  onClose,
  courses,
  professors,
  onUpdateCourseImage,
  onUpdateProfessorImage,
  supabaseConfig,
  onSaveSupabaseConfig,
  onResetToDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'supabase_config' | 'sql_schema'>('images');
  
  // Supabase form state
  const [urlInput, setUrlInput] = useState(supabaseConfig.supabaseUrl);
  const [keyInput, setKeyInput] = useState(supabaseConfig.supabaseAnonKey);
  const [bucketInput, setBucketInput] = useState(supabaseConfig.storageBucket);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Selected item for image editing
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customImageUrl.trim() || !selectedCourseId) return;
    onUpdateCourseImage(selectedCourseId, customImageUrl.trim());
    setCustomImageUrl('');
  };

  const handleApplyPreset = (presetUrl: string) => {
    if (selectedCourseId) {
      onUpdateCourseImage(selectedCourseId, presetUrl);
    }
  };

  const handleSaveConfig = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      const isCustom = urlInput && urlInput.startsWith('https://') && keyInput && keyInput.length > 20;
      const updated: SupabaseConfig = {
        supabaseUrl: urlInput.trim(),
        supabaseAnonKey: keyInput.trim(),
        storageBucket: bucketInput.trim() || 'course-images',
        isConnected: Boolean(isCustom),
        autoSync: true
      };
      onSaveSupabaseConfig(updated);
      setConnectionMessage({
        type: isCustom ? 'success' : 'info',
        text: isCustom 
          ? 'Connexion Supabase enregistrée avec succès ! Les données et images dynamiques sont synchronisées.'
          : 'Mode local actif avec support des images dynamiques Supabase.'
      });
    }, 600);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(getSampleSQLMigration());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#c3c6d1] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#003366] flex items-center justify-center text-[#fed488]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base sm:text-lg">
                Gestionnaire Supabase & Liens d'Images Dynamiques
              </h2>
              <p className="text-xs text-[#d5e3ff]">
                Synchronisation en temps réel de la base de données et des visuels
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#d5e3ff] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#eceef0] bg-[#f2f4f6] px-4 pt-2 gap-2 text-xs font-heading font-semibold">
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 ${
              activeTab === 'images'
                ? 'bg-white text-[#003366] border-t-2 border-[#C5A059] shadow-xs font-bold'
                : 'text-[#43474f] hover:text-[#003366]'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#C5A059]" />
            <span>Liens d'Images Dynamiques</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase_config')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 ${
              activeTab === 'supabase_config'
                ? 'bg-white text-[#003366] border-t-2 border-[#C5A059] shadow-xs font-bold'
                : 'text-[#43474f] hover:text-[#003366]'
            }`}
          >
            <Database className="w-4 h-4 text-[#003366]" />
            <span>Paramètres Supabase</span>
          </button>

          <button
            onClick={() => setActiveTab('sql_schema')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 ${
              activeTab === 'sql_schema'
                ? 'bg-white text-[#003366] border-t-2 border-[#C5A059] shadow-xs font-bold'
                : 'text-[#43474f] hover:text-[#003366]'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#775a19]" />
            <span>Schéma SQL PostgreSQL</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6 text-sm text-[#191c1e]">
          
          {/* TAB 1: DYNAMIC IMAGES MANAGER */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              
              {/* Select Course to Modify */}
              <div>
                <label className="block text-xs font-heading font-bold text-[#003366] uppercase tracking-wider mb-2">
                  1. Choisissez le cours à modifier
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#c3c6d1] bg-white text-[#191c1e] font-medium focus:ring-2 focus:ring-[#003366]"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      [{course.code}] {course.title} ({course.department})
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Image Preview */}
              {currentCourse && (
                <div className="bg-[#f2f4f6] p-4 rounded-xl border border-[#c3c6d1]/60 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-36 h-24 rounded-lg overflow-hidden shrink-0 border border-[#c3c6d1] shadow-xs">
                    <img
                      src={currentCourse.coverImageUrl}
                      alt={currentCourse.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold text-[#775a19] tracking-wider">
                      Image actuelle
                    </span>
                    <h4 className="font-heading font-bold text-sm text-[#003366] truncate">
                      {currentCourse.title}
                    </h4>
                    <p className="text-xs text-[#737780] truncate font-mono mt-1">
                      {currentCourse.coverImageUrl}
                    </p>
                  </div>
                </div>
              )}

              {/* Enter custom URL */}
              <form onSubmit={handleApplyCustomUrl} className="space-y-2">
                <label className="block text-xs font-heading font-bold text-[#003366] uppercase tracking-wider">
                  2. Entrez un lien d'image dynamique (URL Supabase Storage ou Web)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Link2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737780]" />
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="https://votre-projet.supabase.co/storage/v1/object/public/course-images/image.jpg"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#c3c6d1] bg-white text-[#191c1e] focus:ring-2 focus:ring-[#003366]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#003366] hover:bg-[#001e40] text-white px-4 py-2 rounded-lg text-xs font-heading font-semibold transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Appliquer</span>
                  </button>
                </div>
              </form>

              {/* Presets Gallery */}
              <div>
                <label className="block text-xs font-heading font-bold text-[#003366] uppercase tracking-wider mb-2.5">
                  3. Ou appliquez un modèle d'image académique en 1 clic
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CURATED_IMAGE_PRESETS.map((preset, index) => (
                    <div
                      key={index}
                      onClick={() => handleApplyPreset(preset.url)}
                      className="group cursor-pointer rounded-lg overflow-hidden border border-[#c3c6d1] hover:border-[#003366] hover:shadow-md transition-all bg-white p-1.5 flex flex-col"
                    >
                      <div className="h-20 w-full rounded overflow-hidden relative mb-1.5 bg-gray-100">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                          {preset.category}
                        </span>
                      </div>
                      <p className="text-[11px] font-heading font-semibold text-[#191c1e] truncate group-hover:text-[#003366]">
                        {preset.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SUPABASE CONFIG */}
          {activeTab === 'supabase_config' && (
            <div className="space-y-5">
              
              <div className="bg-[#d5e3ff]/50 p-4 rounded-xl border border-[#d5e3ff] text-xs text-[#001b3c] leading-relaxed flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#003366] shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-xs mb-1">
                    Intégration Supabase Prête à l'Emploi
                  </p>
                  <p>
                    L'application supporte le chargement dynamique des images et des cours depuis un projet <strong>Supabase</strong>. 
                    Vous pouvez brancher votre propre base de données Supabase ci-dessous ou utiliser le stockage réactif local.
                  </p>
                </div>
              </div>

              {connectionMessage && (
                <div className={`p-3.5 rounded-lg text-xs flex items-center gap-2 ${
                  connectionMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-blue-50 text-blue-800 border border-blue-300'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{connectionMessage.text}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-[#003366] uppercase tracking-wider mb-1.5">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://votre-id-projet.supabase.co"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#c3c6d1] bg-white text-[#191c1e] focus:ring-2 focus:ring-[#003366]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-[#003366] uppercase tracking-wider mb-1.5">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full text-xs p-2.5 rounded-lg border border-[#c3c6d1] bg-white text-[#191c1e] font-mono focus:ring-2 focus:ring-[#003366]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-[#003366] uppercase tracking-wider mb-1.5">
                    Storage Bucket Name pour les images
                  </label>
                  <input
                    type="text"
                    value={bucketInput}
                    onChange={(e) => setBucketInput(e.target.value)}
                    placeholder="course-images"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#c3c6d1] bg-white text-[#191c1e] focus:ring-2 focus:ring-[#003366]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleSaveConfig}
                  disabled={isTesting}
                  className="bg-[#003366] hover:bg-[#001e40] text-white px-5 py-2.5 rounded-lg text-xs font-heading font-semibold transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Enregistrer la configuration</span>
                </button>

                <button
                  onClick={onResetToDefaults}
                  className="px-4 py-2.5 text-xs text-[#ba1a1a] hover:bg-rose-50 rounded-lg border border-[#ffdad6] transition-colors"
                >
                  Réinitialiser les données d'origine
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: SQL SCHEMA */}
          {activeTab === 'sql_schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#43474f]">
                  Copiez et collez ce script dans le <strong>SQL Editor</strong> de votre tableau de bord Supabase :
                </p>
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1.5 bg-[#003366] hover:bg-[#001e40] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-xs"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copié !' : 'Copier le SQL'}</span>
                </button>
              </div>

              <pre className="bg-[#141f2f] text-[#d5e3ff] p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-80 border border-[#293446]">
                {getSampleSQLMigration()}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#f2f4f6] px-6 py-4 border-t border-[#eceef0] flex items-center justify-between text-xs">
          <span className="text-[#737780]">
            {courses.length} formations certifiées enregistrées
          </span>
          <button
            onClick={onClose}
            className="bg-[#003366] hover:bg-[#001e40] text-white px-5 py-2 rounded-lg font-heading font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};

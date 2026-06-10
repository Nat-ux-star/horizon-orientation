import React, { useState } from 'react';
import { 
  GraduationCap, 
  Check, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Mail,
  School,
  MapPin,
  User,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Conversational Form State
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    currentClass: 'Seconde',
    highSchoolName: '',
    highSchoolLocation: '',
    emailAddress: '',
    freeMessage: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Diagnostic Report Generation
  const getDiagnosticSummary = () => {
    const studentName = formData.firstName ? `${formData.firstName}` : "élève";
    
    switch (formData.currentClass) {
      case 'Seconde':
        return {
          title: `Diagnostic d'Orientation Initiale : ${studentName}`,
          statusLabel: "Phase cruciale d'anticipation",
          statusColor: "text-sky-900 bg-sky-50 border-sky-100",
          analysis: "C'est en classe de Seconde que se posent les fondations du dossier académique de votre enfant. Le choix stratégique des matières ou spécialités pour la Première doit correspondre à la fois à ses aptitudes naturelles et aux prérequis des meilleures filières post-bac (en local ou à l'étranger). Nous analysons ses résultats scolaires globaux pour dessiner cette trajectoire.",
          recommendations: [
            "Sélectionner la bonne combinaison de spécialités scientifiques, littéraires ou économiques.",
            "Identifier dès maintenant les matières à fort coefficient pour les critères d'excellence locale.",
            "Démarrer de premières lectures méthodologiques pour solidifier l'expression écrite."
          ]
        };
      case 'Première':
        return {
          title: `Diagnostic d'Orientation Intermédiaire : ${studentName}`,
          statusLabel: "Tranche décisive du dossier",
          statusColor: "text-sky-900 bg-sky-50 border-sky-100",
          analysis: "La classe de Première est l'année pivot. Les notes des trois trimestres de cette année sont épluchées minutieusement par tous les comités d'admission au plan national (grandes écoles, classes préparatoires) et à l'étranger (dossiers européens et internationaux). C’est aussi l'année d'analyse d'éligibilité pour les bourses de mérite.",
          recommendations: [
            "Auditer et équilibrer impérativement les moyennes des enseignements clés.",
            "Maximiser les points aux examens et épreuves anticipées.",
            "Structurer le profil de l'élève (expériences, projets artistiques, sportifs, associatifs ou linguistiques)."
          ]
        };
      case 'Terminale':
      default:
        return {
          title: `Diagnostic d'Orientation Stratégique : ${studentName}`,
          statusLabel: "Tranche opérationnelle d'urgence",
          statusColor: "text-sky-900 bg-sky-50 border-sky-100",
          analysis: "L'année de Terminale est une course contre la montre. Il faut concilier la préparation intense du diplôme du Baccalauréat avec la gestion sans faille des calendriers d'admissions complexes. Une seule erreur sur les plateformes de candidature nationale ou internationale peut compromettre une année d'efforts.",
          recommendations: [
            "Validation experte de la cohérence et de l'ordre des voeux d'orientation.",
            "Rédaction chirurgicale des projets de formation motivés et des lettres d'intention.",
            "Bilan financier prévisionnel et de stratégie proactive de détection de bourses post-bac."
          ]
        };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form compliance protection
    if (
      !formData.lastName.trim() || 
      !formData.firstName.trim() || 
      !formData.highSchoolName.trim() || 
      !formData.highSchoolLocation.trim() || 
      !formData.emailAddress.trim()
    ) {
      alert("Veuillez remplir tous les champs obligatoires marqués d'un astérisque (*).");
      return;
    }

    setIsSubmitting(true);

    // Prepare mailto link details
    const mailtoEmail = "ngoria@protonmail.com";
    const subject = `Nouvelle demande de diagnostic - Horizon Sup - ${formData.firstName} ${formData.lastName}`;
    const bodyText = `Bonjour,\n\nVoici les détails de ma demande de diagnostic d'orientation pour Horizon Sup :\n\n` +
      `- Prénom : ${formData.firstName}\n` +
      `- Nom : ${formData.lastName}\n` +
      `- Classe actuelle : ${formData.currentClass}\n` +
      `- Nom du Lycée : ${formData.highSchoolName}\n` +
      `- Ville / Lieu du Lycée : ${formData.highSchoolLocation}\n` +
      `- Adresse E-mail : ${formData.emailAddress}\n\n` +
      `Message / Présentation du projet :\n${formData.freeMessage || 'Aucun message particulier.'}\n\n` +
      `Merci d'étudier mon profil.\n`;

    // High conversion psychological validation delay
    setTimeout(() => {
      const code = `HS-${Math.floor(10000 + Math.random() * 90000)}`;
      setReferenceCode(code);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto scroll directly to output feedback to delight user
      setTimeout(() => {
        executeScrollTo('success-result-card');
      }, 100);

      // Open Mailto link
      try {
        window.location.href = `mailto:${mailtoEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      } catch (err) {
        console.error("Erreur d'ouverture du client e-mail", err);
      }
    }, 1200);
  };


  const handleResetForm = () => {
    setFormData({
      lastName: '',
      firstName: '',
      currentClass: 'Seconde',
      highSchoolName: '',
      highSchoolLocation: '',
      emailAddress: '',
      freeMessage: ''
    });
    setReferenceCode('');
    setIsSubmitted(false);
  };

  return (
    <div className="bg-sky-50 text-sky-950 min-h-screen font-sans selection:bg-red-600 selection:text-white relative antialiased">
      
      {/* 1. EN-TÊTE SIMPLIFIÉ (TIMELESS, NO YEARS, NO PHONE, EXCLUSIVE CTA IN ENERGETIC RED) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm" id="header">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            
            {/* Minimal Brand Identity */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2.5 cursor-pointer select-none"
              id="brand-identity"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-900 flex items-center justify-center shadow-md shadow-sky-900/10">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-lg font-black text-sky-950 tracking-tight block leading-none">Horizon Sup</span>
              </div>
            </div>

            {/* Unique Action Button : "Demander un diagnostic" in vivid red (smooth scroll to form) */}
            <div>
              <button 
                onClick={() => executeScrollTo('conversion-form')}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold rounded-xl transition-all duration-200 active:scale-95 shadow-sm shadow-red-600/15 cursor-pointer"
                id="header-diagnostic-cta"
              >
                <span>Demander un diagnostic</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. SECTION HÉRO (Le Cœur du site - styled in beautiful sky colors and bold red buttons, reduced padding) */}
      <section className="relative py-10 sm:py-14 md:py-16 bg-gradient-to-b from-white via-sky-50/70 to-sky-100/50 overflow-hidden" id="hero">
        <div className="absolute top-10 right-[-10%] w-[40%] h-[40%] bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-5 left-[-10%] w-[40%] h-[40%] bg-sky-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            
            {/* Visual Micro Tagline Label in Sky/Red theme */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-sky-100 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[10px] font-bold text-sky-900 uppercase tracking-widest">Le bon projet scolaire se construit tôt</span>
            </div>

            {/* Hero Title (Exact Requested Copy) */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-sky-950 tracking-tight leading-[1.12]">
              Votre orientation post-bac se prépare dès la Seconde
            </h1>

            {/* Hero Sub-title (Exact Requested Copy) */}
            <p className="text-sm sm:text-base md:text-lg text-sky-900/85 font-normal leading-relaxed max-w-3xl mx-auto">
              Que vous envisagiez de poursuivre vos études supérieures au plan national ou à l'international, nous construisons avec vous un projet d'admission solide et vous guidons vers les meilleures opportunités de bourses.
            </p>

            {/* Primary Action Button in High Conversion Energetic Red */}
            <div className="pt-3 sm:pt-4">
              <button
                onClick={() => executeScrollTo('conversion-form')}
                className="relative inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-red-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                id="hero-main-cta"
              >
                <span>Commencer mon Diagnostic Gratuit</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 shrink-0 text-red-100" />
              </button>
              
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 text-[11px] sm:text-xs text-sky-900/60 font-semibold">
                <span>✓ Accompagnement individualisé</span>
                <span className="hidden sm:inline">•</span>
                <span>✓ Analyse confidentielle de vos bulletins</span>
                <span className="hidden sm:inline">•</span>
                <span>✓ Opportunités locales & internationales</span>
              </div>
            </div>

          </div>

          {/* Clean Trust Indicators block styled with sky/white elegance, reduced mt */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto border-t border-sky-100 pt-5 text-sky-950">
            <div className="flex flex-col items-center p-2 text-center">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm border border-sky-100/50">
                <CheckCircle2 className="w-4.5 h-4.5 text-red-600" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-sky-950">Bâtir un projet ambitieux</span>
              <p className="text-[11px] text-sky-900/60 mt-1">Anticiper dès la classe de Seconde pour consolider un dossier parfait.</p>
            </div>
            <div className="flex flex-col items-center p-2 text-center">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm border border-sky-100/50">
                <CheckCircle2 className="w-4.5 h-4.5 text-red-600" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-sky-950">Filières d'excellence</span>
              <p className="text-[11px] text-sky-900/60 mt-1">Sécuriser son admission supérieure locale ou internationale en évitant les erreurs.</p>
            </div>
            <div className="flex flex-col items-center p-2 text-center">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm border border-sky-100/50">
                <CheckCircle2 className="w-4.5 h-4.5 text-red-600" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-sky-950">Optimisation des Bourses</span>
              <p className="text-[11px] text-sky-900/60 mt-1">Identification experte de toutes les opportunités d'aides et bourses post-bac.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION NOTRE ACCOMPAGNEMENT (3 blocs simples et courts - Styled in Serene Sky Blue Card layouts, reduced padding) */}
      <section className="py-10 sm:py-12 bg-white border-t border-b border-sky-100/50" id="accompaniment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-8 sm:mb-10">
            <span className="text-xs uppercase font-extrabold text-sky-600 tracking-wider block font-semibold">Une expertise globale</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-sky-950">
              Notre Accompagnement
            </h2>
            <p className="text-sky-900/60 text-xs leading-relaxed">
              Une méthodologie rodée pour structurer les aspirations scolaires des futurs bacheliers et rassurer les parents à chaque étape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Bloc 1 (Exact copy requested) */}
            <div className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 hover:border-sky-200 hover:bg-sky-50 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white text-sky-900 font-extrabold flex items-center justify-center text-sm shadow-sm border border-sky-100/30">
                  01
                </div>
                <h3 className="text-lg font-bold text-sky-950">
                  Dès la Seconde & Première
                </h3>
                <p className="text-sky-900/75 text-xs sm:text-sm leading-relaxed">
                  Anticiper les bons choix, comprendre ses aspirations et booster son dossier académique avant qu'il ne soit trop tard.
                </p>
              </div>
              <div className="pt-4 border-t border-sky-100 mt-6 flex items-center text-xs font-bold text-sky-900">
                <span>Phase de fondation précoce</span>
                <Check className="w-3.5 h-3.5 ml-1.5 text-red-600 shrink-0" />
              </div>
            </div>

            {/* Bloc 2 (Exact copy requested) */}
            <div className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 hover:border-sky-200 hover:bg-sky-50 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white text-sky-900 font-extrabold flex items-center justify-center text-sm shadow-sm border border-sky-100/30">
                  02
                </div>
                <h3 className="text-lg font-bold text-sky-950">
                  Filières Nationales & Supérieur
                </h3>
                <p className="text-sky-900/75 text-xs sm:text-sm leading-relaxed">
                  Bénéficiez de notre expertise locale pour maîtriser les rouages des inscriptions, cibler les établissements d'excellence et sécuriser vos choix d'orientation.
                </p>
              </div>
              <div className="pt-4 border-t border-sky-100 mt-6 flex items-center text-xs font-bold text-sky-900">
                <span>Sécurisation académique</span>
                <Check className="w-3.5 h-3.5 ml-1.5 text-red-600 shrink-0" />
              </div>
            </div>

            {/* Bloc 3 (Exact copy requested) */}
            <div className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 hover:border-sky-200 hover:bg-sky-50 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white text-sky-900 font-extrabold flex items-center justify-center text-sm shadow-sm border border-sky-100/30">
                  03
                </div>
                <h3 className="text-lg font-bold text-sky-950">
                  Dossiers & Bourses Internationaux
                </h3>
                <p className="text-sky-900/75 text-xs sm:text-sm leading-relaxed">
                  Profitez de notre expertise internationale pour optimiser vos CV, lettres de motivation, et identifier les financements disponibles pour l'étranger.
                </p>
              </div>
              <div className="pt-4 border-t border-sky-100 mt-6 flex items-center text-xs font-bold text-sky-900">
                <span>Rayonnement et financements</span>
                <Check className="w-3.5 h-3.5 ml-1.5 text-red-600 shrink-0" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SECTION RASSURANCE & EXPERTISE (3 puces rapides) */}
      <section className="py-8 bg-sky-50 border-b border-sky-100/70" id="rassurance">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            
            {/* Point 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-5 rounded-2xl bg-white border border-sky-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-red-600 shrink-0 shadow-inner">
                <Check className="w-6 h-6 shrink-0 stroke-[3]" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-extrabold text-sky-950">Double expertise</h4>
                <p className="text-xs text-sky-900/75 leading-relaxed">Une double expertise reconnue sur les systèmes d'enseignement locaux et internationaux</p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-5 rounded-2xl bg-white border border-sky-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-red-600 shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-extrabold text-sky-950 font-display">Dossiers d'admission</h4>
                <p className="text-xs text-sky-900/75 leading-relaxed">Des dossiers d'admission 100% conformes aux exigences administratives les plus strictes</p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-5 rounded-2xl bg-white border border-sky-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-red-600 shrink-0 shadow-inner">
                <Zap className="w-6 h-6 shrink-0 text-red-600" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-extrabold text-sky-950">Tarifs & profil</h4>
                <p className="text-xs text-sky-900/75 leading-relaxed">Des tarifs sur-mesure définis uniquement après l'étude de votre profil</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SECTION FORMULAIRE DE CONVERSION (Précis, qualifié, sans numéro de téléphone, par E-mail, with sky blue container and primary Red button) */}
      <section className="py-12 sm:py-16 bg-[#f5faff] border-b border-sky-100" id="conversion-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Header of Form */}
          <div className="text-center space-y-2 mb-8 max-w-xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-sky-900 bg-sky-100 px-3 py-1.5 rounded-md inline-block font-semibold">
              Analyse Confidentielle & Sécurisée
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-sky-950 tracking-tight">
              Demandez votre Diagnostic d'Orientation Gratuit
            </h2>
            <p className="text-sky-900/70 text-xs sm:text-sm leading-relaxed font-semibold">
              Prenez une minute pour remplir ce formulaire. Nous analyserons votre profil avec attention.
            </p>
          </div>

          {/* Form container */}
          <div className="bg-white border border-sky-100 rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden" id="lead-form-outer">
            
            {/* Visual top accent layout line in vivid red */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-sky-600 to-red-600"></div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="lead-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <p className="text-xs text-sky-600 italic text-right">
                    Les champs marqués d'une astérisque (<span className="text-red-500">*</span>) sont obligatoires.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Prénom */}
                    <div className="text-left">
                      <label htmlFor="firstName" className="block text-xs sm:text-sm font-bold text-sky-950 mb-1.5 flex items-center space-x-1.5">
                        <User className="w-4 h-4 text-sky-400" />
                        <span>Prénom <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        name="firstName"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Ex: Fatou"
                        className="w-full px-4 py-3 bg-sky-50/20 border border-sky-100 rounded-xl text-sm text-sky-950 placeholder-sky-900/30 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all font-semibold"
                      />
                    </div>

                    {/* Nom */}
                    <div className="text-left">
                      <label htmlFor="lastName" className="block text-xs sm:text-sm font-bold text-sky-950 mb-1.5 flex items-center space-x-1.5">
                        <User className="w-4 h-4 text-sky-400" />
                        <span>Nom <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        name="lastName"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Ex: Diagne"
                        className="w-full px-4 py-3 bg-sky-50/20 border border-sky-100 rounded-xl text-sm text-sky-950 placeholder-sky-900/30 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Classe Actuelle Dropdown */}
                    <div className="text-left">
                      <label htmlFor="currentClass" className="block text-xs sm:text-sm font-bold text-sky-950 mb-1.5 flex items-center space-x-1.5">
                        <GraduationCap className="w-4 h-4 text-sky-600" />
                        <span>Classe actuelle <span className="text-red-500">*</span></span>
                      </label>
                      <div className="relative">
                        <select
                          name="currentClass"
                          id="currentClass"
                          value={formData.currentClass}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-sky-50/25 border border-sky-100 rounded-xl text-sm text-sky-950 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 appearance-none transition-all font-semibold"
                        >
                          <option value="Seconde">Seconde</option>
                          <option value="Première">Première</option>
                          <option value="Terminale">Terminale</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-sky-800">
                          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                    {/* Adresse E-mail (Required, replacing telephone/WhatsApp) */}
                    <div className="text-left">
                      <label htmlFor="emailAddress" className="block text-xs sm:text-sm font-bold text-sky-950 mb-1.5 flex items-center space-x-1.5">
                        <Mail className="w-4 h-4 text-sky-600" />
                        <span>Adresse E-mail <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="email" 
                        name="emailAddress"
                        id="emailAddress"
                        required
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="parent@email.com ou eleve@email.com"
                        className="w-full px-4 py-3 bg-sky-50/20 border border-sky-100 rounded-xl text-sm text-sky-950 placeholder-sky-900/30 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nom de votre Lycée */}
                    <div className="text-left">
                      <label htmlFor="highSchoolName" className="block text-xs sm:text-sm font-bold text-sky-950 mb-1.5 flex items-center space-x-1.5">
                        <School className="w-4 h-4 text-sky-400" />
                        <span>Nom de votre Lycée <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        name="highSchoolName"
                        id="highSchoolName"
                        required
                        value={formData.highSchoolName}
                        onChange={handleInputChange}
                        placeholder="Ex: Lycée Seydou Nourou Tall"
                        className="w-full px-4 py-3 bg-sky-50/20 border border-sky-100 rounded-xl text-sm text-sky-950 placeholder-sky-900/30 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all font-semibold"
                      />
                    </div>

                    {/* Ville / Lieu du Lycée */}
                    <div className="text-left">
                      <label htmlFor="highSchoolLocation" className="block text-xs sm:text-sm font-bold text-sky-950 mb-1.5 flex items-center space-x-1.5">
                        <MapPin className="w-4 h-4 text-sky-400" />
                        <span>Ville / Lieu du Lycée <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        name="highSchoolLocation"
                        id="highSchoolLocation"
                        required
                        value={formData.highSchoolLocation}
                        onChange={handleInputChange}
                        placeholder="Ex: Dakar, Thiès, Saint-Louis..."
                        className="w-full px-4 py-3 bg-sky-50/20 border border-sky-100 rounded-xl text-sm text-sky-950 placeholder-sky-900/30 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  {/* Message/Bloc de champ libre */}
                  <div className="text-left">
                    <label htmlFor="freeMessage" className="block text-xs sm:text-sm font-bold text-sky-950 mb-1.5 flex items-center space-x-1.5">
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>Message / Décrivez votre projet</span>
                    </label>
                    <textarea 
                      name="freeMessage"
                      id="freeMessage"
                      rows={4}
                      value={formData.freeMessage}
                      onChange={handleInputChange}
                      placeholder="Dites-nous en quelques mots ce que vous aimeriez faire plus tard ou vos questions..."
                      className="w-full px-4 py-3 bg-sky-50/20 border border-sky-100 rounded-xl text-sm text-sky-950 placeholder-sky-900/30 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all font-semibold resize-none"
                    />
                  </div>

                  {/* Massive high conversion action button in energetic RED */}
                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-8 py-4 sm:py-5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base rounded-2xl cursor-pointer shadow-lg hover:shadow-red-650/15 active:scale-[0.98] transition-all disabled:opacity-50"
                      id="submit-diagnostic-form"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block w-4 h-4 rounded-full border-2 border-white/35 border-t-white animate-spin mr-2 shrink-0"></span>
                          <span>Analyse et transmission de votre dossier...</span>
                        </>
                      ) : (
                        <span>Valider ma demande de diagnostic</span>
                      )}
                    </button>
                    
                    <p className="text-[10px] sm:text-xs text-sky-900/60 mt-4 font-semibold leading-relaxed">
                      Aucun prix affiché • Vos données d'évaluation font l'objet d'une stricte confidentialité réglementaire.
                    </p>
                  </div>

                </motion.form>
              ) : (
                /* INNOVATIVE SUCCESS & PRE-DIAGNOSTIC REPORT ACTION PANEL */
                <motion.div 
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-left"
                  id="success-result-card"
                >
                  <div className="text-center pb-5 border-b border-sky-100">
                    <div className="w-16 h-16 bg-sky-50 text-sky-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-sky-100 shadow-sm">
                      <Check className="w-8 h-8 shrink-0 stroke-[3px]" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-black text-sky-950 font-display">
                      Demande bien transmise !
                    </h3>
                    
                    {/* Exact requested success message copy */}
                    <div className="mt-3 bg-sky-50 text-sky-900 text-xs sm:text-sm font-bold py-3.5 px-4 rounded-2xl border border-sky-100 leading-relaxed max-w-lg mx-auto">
                      "Merci ! Votre demande a bien été transmise. Notre équipe étudie votre profil avec attention et vous répondra par e-mail dans les meilleurs délais."
                    </div>
                  </div>

                  {/* Dynamic interactive report based on dropdown responses */}
                  <div className="p-5 sm:p-6 bg-sky-50/50 border border-sky-100 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold text-sky-900 bg-sky-100 px-2.5 py-0.5 rounded tracking-wider">Aperçu stratégique</span>
                      <span className="text-[10px] font-bold text-sky-850 font-mono">Dossier : {referenceCode}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-sky-950">
                      {getDiagnosticSummary().title}
                    </h4>

                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-sm">
                          <p className="text-sky-600 font-bold uppercase text-[9px] tracking-wide">Établissement scolaire</p>
                          <p className="text-sky-950 font-bold mt-1">{formData.highSchoolName} ({formData.highSchoolLocation})</p>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-sm">
                          <p className="text-sky-600 font-bold uppercase text-[9px] tracking-wide">Statut temporel</p>
                          <p className="text-sky-950 font-bold mt-1 text-red-600 font-semibold">{getDiagnosticSummary().statusLabel}</p>
                        </div>
                      </div>

                      <div className="text-xs bg-white p-4 rounded-xl border border-sky-100">
                        <p className="text-sky-900 font-extrabold text-[10px] uppercase tracking-wide">Analyse initiale par e-mail à venir :</p>
                        <p className="text-sky-950/80 font-medium leading-relaxed mt-1.5 animate-fade-in">
                          {getDiagnosticSummary().analysis}
                        </p>
                      </div>

                      {formData.freeMessage.trim() && (
                        <div className="text-xs bg-white p-3.5 rounded-xl border border-sky-100">
                          <p className="text-sky-600 font-bold text-[9px] uppercase tracking-wide">Sujet d'intérêt déclaré :</p>
                          <p className="text-sky-950 italic mt-1 font-semibold">"{formData.freeMessage}"</p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-[9px] uppercase font-extrabold text-sky-600 tracking-wide">Points prioritaires que nous allons valider par e-mail :</p>
                        <ul className="space-y-2.5">
                          {getDiagnosticSummary().recommendations.map((step, idx) => (
                            <li key={idx} className="flex items-start text-xs text-sky-900">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5 mr-2.5"></span>
                              <span className="font-semibold leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Email confidence callout */}
                  <div className="text-center bg-sky-50 p-4 rounded-xl text-xs text-sky-900/80 border border-sky-100 leading-relaxed font-semibold">
                    Un e-mail de confirmation vient de vous être adressé à l'adresse <strong className="text-sky-950">{formData.emailAddress}</strong>. Vérifiez vos courriers indésirables (spams) si vous ne le recevez pas dans les prochaines minutes.
                  </div>

                  {/* Reset form */}
                  <div className="text-center pt-2">
                    <button
                      onClick={handleResetForm}
                      className="text-xs text-red-600 hover:text-red-800 font-bold underline"
                    >
                      Modifier mes réponses ou faire une nouvelle demande
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 6. PIED DE PAGE & FOOTER (TIMELESS, NO DATE/YEAR, NO WHATSAPP, HIGH CONFIDENTIALITY - BLUE, GREY & WHITE DESIGN) */}
      <footer className="bg-white text-sky-950 py-12 border-t border-sky-100" id="footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            
            {/* Left Column Brand */}
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-900 flex items-center justify-center text-white shadow-sm">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-black text-sky-950 tracking-tight">Horizon Sup</span>
              </div>
              <p className="text-xs text-sky-900/60 leading-relaxed font-semibold">
                Cabinet spécialiste de l'orientation scolaire d'excellence. De la Seconde aux admissions post-bac, nous structurons la réussite académique de chaque élève.
              </p>
            </div>

            {/* Middle Column Assurances styled in light grey/blue tones */}
            <div className="text-xs space-y-2.5 bg-sky-50/30 p-5 rounded-2xl border border-sky-100/55">
              <span className="block font-black text-sky-900 uppercase text-[10px] tracking-widest font-mono">Garanties & Rassurance</span>
              <p className="text-sky-950/80 font-medium">✓ Entretien d'évaluation préliminaire offert</p>
              <p className="text-sky-950/80 font-medium">✓ Conformité aux directives des universités mondiales</p>
              <p className="text-sky-950/80 font-medium">✓ Traitement scrupuleux selon le règlement de protection des données</p>
            </div>

            {/* Right Column Exclusive Email Contact */}
            <div className="text-xs space-y-2.5 bg-sky-50/30 p-5 rounded-2xl border border-sky-100/55">
              <span className="block font-black text-sky-900 uppercase text-[10px] tracking-widest font-mono">Échanges exclusifs par e-mail</span>
              <p className="text-sky-950/80 font-medium">Communication officielle : <strong className="text-red-600 font-bold block mt-1">admissions@horizonsup.org</strong></p>
              <p className="text-sky-950/60 italic font-medium mt-2">Aucun service instantané téléphonique afin de garantir la qualité des analyses.</p>
            </div>

          </div>

          <div className="border-t border-sky-100 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-sky-900/40 space-y-4 sm:space-y-0">
            <div className="font-semibold">
              &copy; Horizon Sup. Tous droits réservés.
            </div>
            <div className="flex space-x-3 text-sky-900/30 font-semibold">
              <span>Projet Académique d'Excellence</span>
              <span>•</span>
              <span>National & International</span>
              <span>•</span>
              <span>Analyse Confidentielle</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

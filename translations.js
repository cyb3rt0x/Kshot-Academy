const LANGUAGES = [
  { code:'en', label:'English', dir:'ltr' },
  { code:'zh', label:'中文', dir:'ltr' },
  { code:'hi', label:'हिन्दी', dir:'ltr' },
  { code:'es', label:'Español', dir:'ltr' },
  { code:'fr', label:'Français', dir:'ltr' },
  { code:'ar', label:'العربية', dir:'rtl' },
  { code:'pt', label:'Português', dir:'ltr' }
];
const UI_TRANSLATIONS = {
  en:{home:'Home', academies:'Academies', paths:'Paths', faq:'FAQ', roadmap:'Roadmap', start:'Start Your Journey', search:'Search the Academy', published:'Completed', development:'In Development'},
  zh:{home:'首页', academies:'学院', paths:'路径', faq:'问答', roadmap:'路线图', start:'开始学习', search:'搜索学院', published:'已完成', development:'开发中'},
  hi:{home:'होम', academies:'अकादमियाँ', paths:'मार्ग', faq:'FAQ', roadmap:'रोडमैप', start:'यात्रा शुरू करें', search:'अकादमी खोजें', published:'पूर्ण', development:'निर्माणाधीन'},
  es:{home:'Inicio', academies:'Academias', paths:'Rutas', faq:'FAQ', roadmap:'Ruta', start:'Comienza', search:'Buscar en la Academia', published:'Completado', development:'En desarrollo'},
  fr:{home:'Accueil', academies:'Académies', paths:'Parcours', faq:'FAQ', roadmap:'Feuille de route', start:'Commencer', search:'Rechercher', published:'Terminé', development:'En développement'},
  ar:{home:'الرئيسية', academies:'الأكاديميات', paths:'المسارات', faq:'الأسئلة', roadmap:'الخطة', start:'ابدأ رحلتك', search:'ابحث في الأكاديمية', published:'مكتمل', development:'قيد التطوير'},
  pt:{home:'Início', academies:'Academias', paths:'Caminhos', faq:'FAQ', roadmap:'Roteiro', start:'Começar Jornada', search:'Pesquisar na Academia', published:'Concluído', development:'Em desenvolvimento'}
};
function t(key){ const lang=localStorage.getItem('kshot_lang')||'en'; return (UI_TRANSLATIONS[lang]&&UI_TRANSLATIONS[lang][key])||UI_TRANSLATIONS.en[key]||key; }

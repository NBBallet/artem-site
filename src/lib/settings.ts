import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface SiteSettings {
  ctaTextEn: string;
  ctaTextUk: string;
  ctaTextFr: string;
  animaBlockquoteEn: string;
  animaBlockquoteUk: string;
  animaBlockquoteFr: string;
  /** Poster image URLs (Cloudinary). Empty string = use built-in default. */
  animaPoster1: string;
  animaPoster2: string;
  animaPoster3: string;
  animaPoster4: string;
  /** Cloudinary PDF URL for libretto download. Empty = button hidden. */
  animaLibrettoPdf: string;
  /** Credits — all editable in Notion Site Settings */
  animaCreditIdeaEn: string;
  animaCreditIdeaUk: string;
  animaCreditIdeaFr: string;
  animaCreditChoreographyEn: string;
  animaCreditChoreographyUk: string;
  animaCreditChoreographyFr: string;
  animaCreditMusic: string;
  animaCreditCostumesEn: string;
  animaCreditCostumesUk: string;
  animaCreditCostumesFr: string;
  animaCreditPremiereDateEn: string;
  animaCreditPremiereDateUk: string;
  animaCreditPremiereDateFr: string;
  animaCreditVenueEn: string;
  animaCreditVenueUk: string;
  animaCreditVenueFr: string;
  animaCreditCompany: string;
  /** Video captions — editable in Notion Site Settings */
  animaVideoShowreelEn: string;
  animaVideoShowreelUk: string;
  animaVideoShowreelFr: string;
  animaVideoPremiereEn: string;
  animaVideoPremiereUk: string;
  animaVideoPremiereFr: string;
  animaVideoRehearsalEn: string;
  animaVideoRehearsalUk: string;
  animaVideoRehearsalFr: string;
  /** Festival section */
  animaFestivalName: string;
  animaFestivalSubtitleEn: string;
  animaFestivalSubtitleUk: string;
  animaFestivalSubtitleFr: string;
  animaFestivalDatesEn: string;
  animaFestivalDatesUk: string;
  animaFestivalDatesFr: string;
  animaFestivalVenueEn: string;
  animaFestivalVenueUk: string;
  animaFestivalVenueFr: string;
  animaFestivalDescriptionEn: string;
  animaFestivalDescriptionUk: string;
  animaFestivalDescriptionFr: string;
  animaFestivalOrganizersEn: string;
  animaFestivalOrganizersUk: string;
  animaFestivalOrganizersFr: string;
  /** LITSO → NBB section */
  animaLitsoTitleEn: string;
  animaLitsoTitleUk: string;
  animaLitsoTitleFr: string;
  animaLitsoBodyEn: string;
  animaLitsoBodyUk: string;
  animaLitsoBodyFr: string;
  /** Booking CTA — editable in Notion Anima Settings DB */
  animaCtaLabelEn: string; animaCtaLabelUk: string; animaCtaLabelFr: string;
  animaCtaTitleEn: string; animaCtaTitleUk: string; animaCtaTitleFr: string;
  animaCtaTextEn: string;  animaCtaTextUk: string;  animaCtaTextFr: string;
  animaCtaBtnEn: string;   animaCtaBtnUk: string;   animaCtaBtnFr: string;
  /** Scenes / Arcana section header */
  animaScenesLabelEn: string;
  animaScenesLabelUk: string;
  animaScenesLabelFr: string;
  animaScenesTitleEn: string;
  animaScenesTitleUk: string;
  animaScenesTitleFr: string;
  animaScenesDescriptionEn: string;
  animaScenesDescriptionUk: string;
  animaScenesDescriptionFr: string;
  /** About section — editable in Notion Site Settings */
  aboutLabelEn: string;
  aboutLabelUk: string;
  aboutLabelFr: string;
  aboutNameEn: string;
  aboutNameUk: string;
  aboutNameFr: string;
  aboutRoleEn: string;
  aboutRoleUk: string;
  aboutRoleFr: string;
  aboutManifestoEn: string;
  aboutManifestoUk: string;
  aboutManifestoFr: string;
  aboutBioEn: string;
  aboutBioUk: string;
  aboutBioFr: string;
  aboutNbbEn: string;
  aboutNbbUk: string;
  aboutNbbFr: string;
  /** CV / Résumé CTA section */
  cvCtaLabelEn: string;
  cvCtaLabelUk: string;
  cvCtaLabelFr: string;
  cvCtaTitleEn: string;
  cvCtaTitleUk: string;
  cvCtaTitleFr: string;
  cvCtaTextEn: string;
  cvCtaTextUk: string;
  cvCtaTextFr: string;
  cvCtaBtnEn: string;
  cvCtaBtnUk: string;
  cvCtaBtnFr: string;
  /** CV URL — language-agnostic, stored in Value EN */
  cvUrl: string;
  /** Firebird page */
  firebirdImage: string;
  firebirdUrl: string;
  firebirdBtnEn: string;
  firebirdBtnUk: string;
  firebirdBtnFr: string;
  firebirdCaptionEn: string;
  firebirdCaptionUk: string;
  firebirdCaptionFr: string;
  /** Firebird page — editable texts */
  firebirdTitleEn: string;
  firebirdTitleUk: string;
  firebirdTitleFr: string;
  firebirdSubtitleEn: string;
  firebirdSubtitleUk: string;
  firebirdSubtitleFr: string;
  firebirdDescriptionEn: string;
  firebirdDescriptionUk: string;
  firebirdDescriptionFr: string;
  firebirdYear: string;
  firebirdMusic: string;
  /** Firebird — NYCB reference video */
  firebirdRefVideoId: string;
  firebirdRefLabelEn: string;
  firebirdRefLabelUk: string;
  firebirdRefLabelFr: string;
  firebirdRefTitleEn: string;
  firebirdRefTitleUk: string;
  firebirdRefTitleFr: string;
  /** The Ants work — editable texts */
  theAntsTitleEn: string;
  theAntsTitleUk: string;
  theAntsTitleFr: string;
  theAntsSubtitleEn: string;
  theAntsSubtitleUk: string;
  theAntsSubtitleFr: string;
  theAntsDescriptionEn: string;
  theAntsDescriptionUk: string;
  theAntsDescriptionFr: string;
  theAntsYear: string;
  theAntsMusic: string;
  /** Mozart 25 work — editable texts */
  mozart25TitleEn: string;
  mozart25TitleUk: string;
  mozart25TitleFr: string;
  mozart25SubtitleEn: string;
  mozart25SubtitleUk: string;
  mozart25SubtitleFr: string;
  mozart25DescriptionEn: string;
  mozart25DescriptionUk: string;
  mozart25DescriptionFr: string;
  mozart25Year: string;
  mozart25Music: string;
  /** Adios work — editable texts */
  adiosTitleEn: string;
  adiosTitleUk: string;
  adiosTitleFr: string;
  adiosSubtitleEn: string;
  adiosSubtitleUk: string;
  adiosSubtitleFr: string;
  adiosDescriptionEn: string;
  adiosDescriptionUk: string;
  adiosDescriptionFr: string;
  adiosYear: string;
  adiosMusic: string;
  /** Carmen work — editable texts */
  carmenTitleEn: string;
  carmenTitleUk: string;
  carmenTitleFr: string;
  carmenSubtitleEn: string;
  carmenSubtitleUk: string;
  carmenSubtitleFr: string;
  carmenDescriptionEn: string;
  carmenDescriptionUk: string;
  carmenDescriptionFr: string;
  carmenYear: string;
  carmenMusic: string;
  /** Video captions — per-work (all editable in per-work Notion DBs) */
  theAntsVideo1En: string;
  theAntsVideo1Uk: string;
  theAntsVideo1Fr: string;
  theAntsVideo2En: string;
  theAntsVideo2Uk: string;
  theAntsVideo2Fr: string;
  mozart25Video1En: string;
  mozart25Video1Uk: string;
  mozart25Video1Fr: string;
  mozart25Video2En: string;
  mozart25Video2Uk: string;
  mozart25Video2Fr: string;
  adiosVideo1En: string;
  adiosVideo1Uk: string;
  adiosVideo1Fr: string;
  adiosVideo2En: string;
  adiosVideo2Uk: string;
  adiosVideo2Fr: string;
  carmenVideo1En: string;
  carmenVideo1Uk: string;
  carmenVideo1Fr: string;
  /** Contact section */
  contactTitleEn: string;
  contactTitleUk: string;
  contactTitleFr: string;
  contactSubtitleEn: string;
  contactSubtitleUk: string;
  contactSubtitleFr: string;
  /** Email + social links — stored in Value EN */
  contactEmail: string;
  socialInstagram: string;
  socialThreads: string;
  socialTelegram: string;
  /** ── ICARE pitch page — all editable in ⚙️ ICARE Settings DB ── */
  icareImage: string;
  icareHeroLabelEn: string;  icareHeroLabelUk: string;
  icareHeroLabelFr: string;
  icareHeroSubtitleEn: string; icareHeroSubtitleUk: string;
  icareHeroSubtitleFr: string;
  icareHeroTaglineEn: string;  icareHeroTaglineUk: string;
  icareHeroTaglineFr: string;
  icareMissionTitleEn: string; icareMissionTitleUk: string;
  icareMissionTitleFr: string;
  icareMission1932En: string;  icareMission1932Uk: string;
  icareMission1932Fr: string;
  icareMission93En: string;    icareMission93Uk: string;
  icareMission93Fr: string;
  icareMission2026En: string;  icareMission2026Uk: string;
  icareMission2026Fr: string;
  icareQuoteEn: string;        icareQuoteUk: string;
  icareQuoteFr: string;
  icareQuoteCiteEn: string;    icareQuoteCiteUk: string;
  icareQuoteCiteFr: string;
  icareConceptTitleEn: string; icareConceptTitleUk: string;
  icareConceptTitleFr: string;
  icareConceptDescEn: string;  icareConceptDescUk: string;
  icareConceptDescFr: string;
  icarePillar1TitleEn: string; icarePillar1TitleUk: string;
  icarePillar1TitleFr: string;
  icarePillar1DescEn: string;  icarePillar1DescUk: string;
  icarePillar1DescFr: string;
  icarePillar2TitleEn: string; icarePillar2TitleUk: string;
  icarePillar2TitleFr: string;
  icarePillar2DescEn: string;  icarePillar2DescUk: string;
  icarePillar2DescFr: string;
  icarePillar3TitleEn: string; icarePillar3TitleUk: string;
  icarePillar3TitleFr: string;
  icarePillar3DescEn: string;  icarePillar3DescUk: string;
  icarePillar3DescFr: string;
  icareScoreSubtitleEn: string; icareScoreSubtitleUk: string;
  icareScoreSubtitleFr: string;
  icareScoreDescEn: string;    icareScoreDescUk: string;
  icareScoreDescFr: string;
  icareDramaturgyTitleEn: string; icareDramaturgyTitleUk: string;
  icareDramaturgyTitleFr: string;
  icareDramaturgyDescEn: string;  icareDramaturgyDescUk: string;
  icareDramaturgyDescFr: string;
  icareSpecsTitleEn: string;   icareSpecsTitleUk: string;
  icareSpecsTitleFr: string;
  icareBioEn: string;          icareBioUk: string;
  icareBioFr: string;
  icareBio2En: string;         icareBio2Uk: string;
  icareBio2Fr: string;
  icareCtaTitleEn: string;     icareCtaTitleUk: string;
  icareCtaTitleFr: string;
  icareCtaTextEn: string;      icareCtaTextUk: string;
  icareCtaTextFr: string;
  icareCtaBtnEn: string;       icareCtaBtnUk: string;
  icareCtaBtnFr: string;
  /** Premiere CTA — per work (editable in each work's Notion DB) */
  theAntsPremiereTitleEn: string;  theAntsPremiereTitleUk: string;
  theAntsPremiereTitleFr: string;
  theAntsPremiereTextEn: string;   theAntsPremiereTextUk: string;
  theAntsPremiereTextFr: string;
  theAntsPremiereBtnEn: string;    theAntsPremiereBtnUk: string;
  theAntsPremiereBtnFr: string;
  mozart25PremiereTitleEn: string; mozart25PremiereTitleUk: string;
  mozart25PremiereTitleFr: string;
  mozart25PremiereTextEn: string;  mozart25PremiereTextUk: string;
  mozart25PremiereTextFr: string;
  mozart25PremiereBtnEn: string;   mozart25PremiereBtnUk: string;
  mozart25PremiereBtnFr: string;
  carmenPremiereTitleEn: string;   carmenPremiereTitleUk: string;
  carmenPremiereTitleFr: string;
  carmenPremiereTextEn: string;    carmenPremiereTextUk: string;
  carmenPremiereTextFr: string;
  carmenPremiereBtnEn: string;     carmenPremiereBtnUk: string;
  carmenPremiereBtnFr: string;
  /** Mercy page — all editable in ⚙️ Mercy Settings DB */
  mercyImage: string;
  mercyHeroLabelEn: string;     mercyHeroLabelUk: string;
  mercyHeroLabelFr: string;
  mercyHeroSubtitleEn: string;  mercyHeroSubtitleUk: string;
  mercyHeroSubtitleFr: string;
  mercyHeroTaglineEn: string;   mercyHeroTaglineUk: string;
  mercyHeroTaglineFr: string;
  mercyIntroTitleEn: string;    mercyIntroTitleUk: string;
  mercyIntroTitleFr: string;
  mercyIntroBodyEn: string;     mercyIntroBodyUk: string;
  mercyIntroBodyFr: string;
  mercyContextTitleEn: string;  mercyContextTitleUk: string;
  mercyContextTitleFr: string;
  mercyContextBodyEn: string;   mercyContextBodyUk: string;
  mercyContextBodyFr: string;
  mercyVideo1Id: string;
  mercyVideo1En: string;        mercyVideo1Uk: string;
  mercyVideo1Fr: string;
  mercyCtaTitleEn: string;      mercyCtaTitleUk: string;
  mercyCtaTitleFr: string;
  mercyCtaTextEn: string;       mercyCtaTextUk: string;
  mercyCtaTextFr: string;
  mercyCtaBtnEn: string;        mercyCtaBtnUk: string;
  mercyCtaBtnFr: string;
  /** Homepage hero — editable in ⚙️ Site Settings DB */
  heroTaglineEn: string;  heroTaglineUk: string;
  heroTaglineFr: string;
  heroRoleEn: string;     heroRoleUk: string;
  heroRoleFr: string;
  /** Mercy hero chips — 4 label pills, editable in ⚙️ Mercy Settings DB */
  mercyChip1En: string;   mercyChip1Uk: string;
  mercyChip1Fr: string;   // year
  mercyChip2En: string;   mercyChip2Uk: string;
  mercyChip2Fr: string;   // type
  mercyChip3En: string;   mercyChip3Uk: string;
  mercyChip3Fr: string;   // music
  mercyChip4En: string;   mercyChip4Uk: string;
  mercyChip4Fr: string;   // place
  /** Humans hero chips — 4 label pills, editable in ⚙️ Humans Settings DB */
  humansChip1En: string;  humansChip1Uk: string;
  humansChip1Fr: string;  // year
  humansChip2En: string;  humansChip2Uk: string;
  humansChip2Fr: string;  // type
  humansChip3En: string;  humansChip3Uk: string;
  humansChip3Fr: string;  // cycle
  humansChip4En: string;  humansChip4Uk: string;
  humansChip4Fr: string;  // theme
  /** Humans page — all editable in ⚙️ Humans Settings DB */
  humansImage: string;
  humansHeroLabelEn: string;    humansHeroLabelUk: string;
  humansHeroLabelFr: string;
  humansHeroSubtitleEn: string; humansHeroSubtitleUk: string;
  humansHeroSubtitleFr: string;
  humansHeroTaglineEn: string;  humansHeroTaglineUk: string;
  humansHeroTaglineFr: string;
  humansIntroTitleEn: string;   humansIntroTitleUk: string;
  humansIntroTitleFr: string;
  humansIntroBodyEn: string;    humansIntroBodyUk: string;
  humansIntroBodyFr: string;
  humansMythTitleEn: string;    humansMythTitleUk: string;
  humansMythTitleFr: string;
  humansMythBodyEn: string;     humansMythBodyUk: string;
  humansMythBodyFr: string;
  humansVideo1Id: string;
  humansVideo1En: string;       humansVideo1Uk: string;
  humansVideo1Fr: string;
  humansCtaTitleEn: string;     humansCtaTitleUk: string;
  humansCtaTitleFr: string;
  humansCtaTextEn: string;      humansCtaTextUk: string;
  humansCtaTextFr: string;
  humansCtaBtnEn: string;       humansCtaBtnUk: string;
  humansCtaBtnFr: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  ctaTextEn:
    "JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us ·",
  ctaTextUk:
    "ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами ·",
  ctaTextFr:
    "REJOIGNEZ LA COMMUNAUTÉ · Faites partie de la famille artistique de Newspaper Birds · Réservez un spectacle · Collaborez avec nous ·",
  animaBlockquoteEn:
    "The Hero harmonizes himself through the Major Arcana of Tarot. The Soul of the Hero is a separate character who appears in the penultimate scene as the result of all transformations.",
  animaBlockquoteUk:
    "Герой гармонізує себе за допомогою Старших Арканів карт Таро. Душа Героя, це окремий персонаж, що з'являється у передостанній сцені як результат усіх трансформацій.",
  animaBlockquoteFr:
    "Le Héros s'harmonise à travers les Arcanes majeurs du Tarot. L'Âme du Héros est un personnage à part qui apparaît dans l'avant-dernière scène, comme résultat de toutes les transformations.",
  animaPoster1: "",
  animaPoster2: "",
  animaPoster3: "",
  animaPoster4: "",
  animaLibrettoPdf: "",
  animaCreditIdeaEn: "",
  animaCreditIdeaUk: "",
  animaCreditIdeaFr: "",
  animaCreditChoreographyEn: "",
  animaCreditChoreographyUk: "",
  animaCreditChoreographyFr: "",
  animaCreditMusic: "",
  animaCreditCostumesEn: "",
  animaCreditCostumesUk: "",
  animaCreditCostumesFr: "",
  animaCreditPremiereDateEn: "",
  animaCreditPremiereDateUk: "",
  animaCreditPremiereDateFr: "",
  animaCreditVenueEn: "",
  animaCreditVenueUk: "",
  animaCreditVenueFr: "",
  animaCreditCompany: "",
  animaVideoShowreelEn: "",
  animaVideoShowreelUk: "",
  animaVideoShowreelFr: "",
  animaVideoPremiereEn: "",
  animaVideoPremiereUk: "",
  animaVideoPremiereFr: "",
  animaVideoRehearsalEn: "",
  animaVideoRehearsalUk: "",
  animaVideoRehearsalFr: "",
  animaFestivalName: "",
  animaFestivalSubtitleEn: "",
  animaFestivalSubtitleUk: "",
  animaFestivalSubtitleFr: "",
  animaFestivalDatesEn: "",
  animaFestivalDatesUk: "",
  animaFestivalDatesFr: "",
  animaFestivalVenueEn: "",
  animaFestivalVenueUk: "",
  animaFestivalVenueFr: "",
  animaFestivalDescriptionEn: "",
  animaFestivalDescriptionUk: "",
  animaFestivalDescriptionFr: "",
  animaFestivalOrganizersEn: "",
  animaFestivalOrganizersUk: "",
  animaFestivalOrganizersFr: "",
  animaLitsoTitleEn: "",
  animaLitsoTitleUk: "",
  animaLitsoTitleFr: "",
  animaLitsoBodyEn: "",
  animaLitsoBodyUk: "",
  animaLitsoBodyFr: "",
  animaCtaLabelEn: "", animaCtaLabelUk: "", animaCtaLabelFr: "",
  animaCtaTitleEn: "", animaCtaTitleUk: "", animaCtaTitleFr: "",
  animaCtaTextEn: "",  animaCtaTextUk: "",  animaCtaTextFr: "",
  animaCtaBtnEn: "",   animaCtaBtnUk: "",   animaCtaBtnFr: "",
  animaScenesLabelEn: "",
  animaScenesLabelUk: "",
  animaScenesLabelFr: "",
  animaScenesTitleEn: "",
  animaScenesTitleUk: "",
  animaScenesTitleFr: "",
  animaScenesDescriptionEn: "",
  animaScenesDescriptionUk: "",
  animaScenesDescriptionFr: "",
  aboutLabelEn: "",
  aboutLabelUk: "",
  aboutLabelFr: "",
  aboutNameEn: "",
  aboutNameUk: "",
  aboutNameFr: "",
  aboutRoleEn: "",
  aboutRoleUk: "",
  aboutRoleFr: "",
  aboutManifestoEn: "",
  aboutManifestoUk: "",
  aboutManifestoFr: "",
  aboutBioEn: "",
  aboutBioUk: "",
  aboutBioFr: "",
  aboutNbbEn: "",
  aboutNbbUk: "",
  aboutNbbFr: "",
  cvCtaLabelEn: "",
  cvCtaLabelUk: "",
  cvCtaLabelFr: "",
  cvCtaTitleEn: "",
  cvCtaTitleUk: "",
  cvCtaTitleFr: "",
  cvCtaTextEn: "",
  cvCtaTextUk: "",
  cvCtaTextFr: "",
  cvCtaBtnEn: "",
  cvCtaBtnUk: "",
  cvCtaBtnFr: "",
  cvUrl: "",
  firebirdImage: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Nicholas_Roerich_-_Mother_of_the_World%2C_1924_-_warmer_colours.jpg",
  firebirdUrl: "https://firebird-hordieiev.surge.sh/",
  firebirdBtnEn: "View full concept",
  firebirdBtnUk: "Переглянути повну концепцію",
  firebirdBtnFr: "Voir le concept complet",
  firebirdCaptionEn: "N. Roerich, Mother of the World, 1924",
  firebirdCaptionUk: "М. Реріх, Мати Світу, 1924",
  firebirdCaptionFr: "N. Roerich, La Mère du Monde, 1924",
  firebirdTitleEn: "",
  firebirdTitleUk: "",
  firebirdTitleFr: "",
  firebirdSubtitleEn: "",
  firebirdSubtitleUk: "",
  firebirdSubtitleFr: "",
  firebirdDescriptionEn: "",
  firebirdDescriptionUk: "",
  firebirdDescriptionFr: "",
  firebirdYear: "2026",
  firebirdMusic: "Igor Stravinsky",
  firebirdRefVideoId: "MXM3HtkdHMQ",
  firebirdRefLabelEn: "Relevance · Reference",
  firebirdRefLabelUk: "Актуальність · Референс",
  firebirdRefLabelFr: "Pertinence · Référence",
  firebirdRefTitleEn: "New York City Ballet — Firebird (Stravinsky)",
  firebirdRefTitleUk: "Нью-Йоркський міський балет — Жар-Птиця (Стравінський)",
  firebirdRefTitleFr: "New York City Ballet — L'Oiseau de feu (Stravinsky)",
  // The Ants & Mozart 25 — text comes from Portfolio — Works DB (bilingual fields there)
  // Settings DB is used ONLY for video captions; leave text fields empty to fall through
  theAntsTitleEn: "", theAntsTitleUk: "",
  theAntsTitleFr: "",
  theAntsSubtitleEn: "", theAntsSubtitleUk: "",
  theAntsSubtitleFr: "",
  theAntsDescriptionEn: "", theAntsDescriptionUk: "",
  theAntsDescriptionFr: "",
  theAntsYear: "", theAntsMusic: "",
  mozart25TitleEn: "", mozart25TitleUk: "",
  mozart25TitleFr: "",
  mozart25SubtitleEn: "", mozart25SubtitleUk: "",
  mozart25SubtitleFr: "",
  mozart25DescriptionEn: "", mozart25DescriptionUk: "",
  mozart25DescriptionFr: "",
  mozart25Year: "", mozart25Music: "",
  adiosTitleEn: "Adios",
  adiosTitleUk: "Адіос",
  adiosTitleFr: "Adios",
  adiosSubtitleEn: "Contemporary ballet · БАЛЕТ-FEST 1st Place",
  adiosSubtitleUk: "Сучасний балет · БАЛЕТ-FEST 1 місце",
  adiosSubtitleFr: "Pièce contemporaine · Opéra de Lviv · 1re place",
  adiosDescriptionEn: "A contemporary solo charged with longing and departure — set to Benjamin Clementine's iconic song from his Mercury Prize-winning debut album At Least for Now.",
  adiosDescriptionUk: "Сучасне соло, насичене тугою та прощанням — на однойменну пісню Бенджаміна Клементайна з його дебютного альбому At Least for Now, що отримав Mercury Prize.",
  adiosDescriptionFr: "Un quatuor de ballet empreint de nostalgie et d'adieu, sur la chanson éponyme de Benjamin Clementine tirée de son album At Least for Now, lauréat du Mercury Prize.\n\nLauréat du concours de chorégraphes de l'Opéra de Lviv, Ukraine, 2015.",
  adiosYear: "2016",
  adiosMusic: "Benjamin Clementine",
  carmenTitleEn: "Carmen",
  carmenTitleUk: "Кармен",
  carmenTitleFr: "Carmen",
  carmenSubtitleEn: "One-act ballet · Bizet-Shchedrin",
  carmenSubtitleUk: "Одноактний балет · Бізе-Щедрін",
  carmenSubtitleFr: "Ballet en un acte",
  carmenDescriptionEn: "Bizet's immortal opera reborn through Rodion Shchedrin's 1967 orchestration for strings and percussion. Presented at the Lviv Opera choreographers competition.",
  carmenDescriptionUk: "Безсмертна опера Бізе, переосмислена крізь оркестровку Щедріна для смичкових та ударних (1967). Представлена на конкурсі балетмейстерів у Львівській опері.",
  carmenDescriptionFr: "L'opéra immortel de Bizet, réinventé à travers l'orchestration de Chtchedrine pour cordes et percussions (1967), composée spécifiquement pour un ballet interprété par Maya Plissetskaïa.",
  carmenYear: "2019",
  carmenMusic: "Georges Bizet / Rodion Shchedrin",
  theAntsVideo1En: "Part 1. Awakening of life in the anthill. Dance of the Queen, the secret service, princesses and ordinary workers.",
  theAntsVideo1Uk: "Частина 1. Пробудження життя в мурашнику. Танок Королеви, секретної служби, принцес та звичайних робітників.",
  theAntsVideo1Fr: "Partie 1. L'éveil de la vie dans la fourmilière. Danse de la Reine, des services secrets, des princesses et des ouvrières ordinaires.",
  theAntsVideo2En: "Part 2. Solo of the Prince, the main hero of the performance.",
  theAntsVideo2Uk: "Частина 2. Соло принца, головного героя вистави.",
  theAntsVideo2Fr: "Partie 2. Solo du Prince, héros principal du spectacle.",
  mozart25Video1En: "Stage choreographic development of the ballet. First act. Teaser.",
  mozart25Video1Uk: "Сценічна хореографічна розробка балету. Перший акт. Тизер.",
  mozart25Video1Fr: "Développement chorégraphique scénique du ballet. Premier acte. Teaser.",
  mozart25Video2En: "A more extensive, full version of the choreographic text.",
  mozart25Video2Uk: "Більш розлога, повна версія хореографічного тексту.",
  mozart25Video2Fr: "Une version plus complète et développée du texte chorégraphique.",
  adiosVideo1En: "БАЛЕТ-FEST · 1st Place · Theatrical Recording",
  adiosVideo1Uk: "БАЛЕТ-FEST · 1 місце · Театральний запис",
  adiosVideo1Fr: "BALLET-FEST · 1re place · Captation théâtrale",
  adiosVideo2En: "Adios — staging tease",
  adiosVideo2Uk: "Адіос — постановочний тизер",
  adiosVideo2Fr: "Adios · aperçu de la mise en scène",
  carmenVideo1En: "Teaser · Scene 6",
  carmenVideo1Uk: "Тизер · Сцена 6",
  carmenVideo1Fr: "Teaser · Scène 6",
  contactTitleEn: "",
  contactTitleUk: "",
  contactTitleFr: "",
  contactSubtitleEn: "",
  contactSubtitleUk: "",
  contactSubtitleFr: "",
  contactEmail: "",
  socialInstagram: "",
  socialThreads: "",
  socialTelegram: "",
  // ── ICARE defaults ──
  icareImage: "https://i.ytimg.com/vi/BOpf7s2eqVs/maxresdefault.jpg",
  icareHeroLabelEn: "World Premiere · 2026",        icareHeroLabelUk: "Світова прем'єра · 2026",
  icareHeroLabelFr: "Première mondiale · 2026",
  icareHeroSubtitleEn: "After the score by Igor Markevich, 1932", icareHeroSubtitleUk: "За партитурою Ігоря Маркевича, 1932",
  icareHeroSubtitleFr: "D'après la partition d'Igor Markevitch, 1932",
  icareHeroTaglineEn: "The first staging in history of a ballet that waited 93 years for a choreographer.", icareHeroTaglineUk: "Перша в історії постановка балету, що 93 роки чекав хореографа.",
  icareHeroTaglineFr: "La première mise en scène de l'histoire d'un ballet qui a attendu quatre-vingt-treize ans pour voir le jour.",
  icareMissionTitleEn: "93 years of waiting. One world premiere.", icareMissionTitleUk: "93 роки очікування. Одна світова прем'єра.",
  icareMissionTitleFr: "93 ans d'attente. Une première mondiale contemporaine.",
  icareMission1932En: "Igor Markevich composes Le Vol d'Icare in Paris. Written for Diaghilev's company. Diaghilev died in 1929 — the premiere was postponed indefinitely.", icareMission1932Uk: "Ігор Маркевич написав «Політ Ікара» в Парижі для трупи Дягілєва. Дягілєв помер у 1929-му — прем'єра відтерміновується назавжди.",
  icareMission1932Fr: "Igor Markevitch composa Le Vol d'Icare pour l'Opéra de Paris, sur commande de Serge Lifar. Lifar estimait beaucoup la partition ; voici une citation : « La musique était admirable, l'idée de son union avec la danse séduisante, mais j'avais le net sentiment qu'il me serait impossible d'accorder mon rythme à celui de Markevitch. » La première fut reportée d'une décennie.",
  icareMission93En: "Years of silence. The score survived. Concert performances existed. No choreographer gave it a body.", icareMission93Uk: "Роки тиші. Партитура існувала. Концертні виконання були. Хореографічного тіла — не було.",
  icareMission93Fr: "Des années de silence ont suivi. La partition attendait la scène. Il y eut des exécutions en concert avec Markevitch et ses élèves, mais aucune mise en scène chorégraphique ne fut jamais réalisée.",
  icareMission2026En: "Artem Hordieiev creates the first full staging. Ensemble of Five performs the original 1932 score. A world premiere 93 years in the making.", icareMission2026Uk: "Артем Гордієв створює першу повноцінну постановку. Ensemble of Five виконує партитуру 1932 року. Світова прем'єра через 93 роки.",
  icareMission2026Fr: "Artem Hordieiev en crée aujourd'hui la première mise en scène théâtrale à part entière. La première mondiale arrive quatre-vingt-treize ans plus tard.",
  icareQuoteEn: "Icarus did not fall by mistake. He chose to fly.", icareQuoteUk: "Ікар не впав через помилку. Він вибрав летіти.",
  icareQuoteFr: "Icare n'est pas tombé parce qu'il était négligent ou imprudent. Dès le début, il choisissait consciemment de voler.",
  icareQuoteCiteEn: "Artem Hordieiev — Choreographer", icareQuoteCiteUk: "Артем Гордієв — хореограф-постановник",
  icareQuoteCiteFr: "Artem Hordieiev, chorégraphe",
  icareConceptTitleEn: "Three Axes", icareConceptTitleUk: "Три осі координат",
  icareConceptTitleFr: "Trois axes du concept",
  icareConceptDescEn: "The production is built on the intersection of three cultural strata — together they form a choreographic language entirely its own.", icareConceptDescUk: "Вистава будується на перетині трьох культурних пластів, що разом утворюють власну хореографічну мову.",
  icareConceptDescFr: "La production se construit sur le déploiement de trois étapes philosophiques qui, ensemble, engendrent son propre langage scénique.",
  icarePillar1TitleEn: "Flight as Conscious Choice", icarePillar1TitleUk: "Польот як усвідомлений вибір",
  icarePillar1TitleFr: "Une manière de voir les choses",
  icarePillar1DescEn: "Icarus was not reckless. He knew the wax would melt. He flew anyway — and longer than any human before him. This myth is not a warning. It is a manifesto.", icarePillar1DescUk: "Ікар не безрозсудний. Він знав, що віск розтопиться. Він летів — і довше, ніж будь-хто до нього. Цей міф — не застереження. Це маніфест.",
  icarePillar1DescFr: "L'événement de la vie en lui-même n'est ni positif ni négatif ; il est neutre en soi. Seule notre attitude lui attribue un rôle, une couleur, une intention particulière. Cela fait écho à l'enseignement du stoïcisme. Les stoïciens enseignaient que la seule chose véritablement en votre pouvoir est votre attitude face à ce qui arrive.",
  icarePillar2TitleEn: "Minoan Substrate", icarePillar2TitleUk: "Мінойський субстрат",
  icarePillar2TitleFr: "Interprétation du vol d'Icare",
  icarePillar2DescEn: "Crete. The labyrinth. Daedalus. Minoan civilisation as the original source — a movement culture that precedes Greece, precedes logos, where the body is the only truth.", icarePillar2DescUk: "Крит. Лабіринт. Дедал. Мінойська цивілізація як першоджерело — культура руху, що передує Греції, передує логосу, де тіло є єдиною правдою.",
  icarePillar2DescFr: "Le SOLEIL ouvre ses portes à un « NOUVEL » Icare du vingt et unième siècle, car celui-ci n'a pas rebroussé chemin, mais a accepté le défi « tel quel ». Il a laissé le Soleil brûler et la Lune refroidir. Le corps devient l'instrument de la volonté : ni l'esprit, ni l'arme, mais le corps lui-même qui perce. Au lieu de l'éternelle aspiration de l'humanité vers l'impossible, il y a l'accomplissement de l'impossible par l'être humain, comme un choix conscient. Comme une résistance ukrainienne.",
  icarePillar3TitleEn: "Matisse — Body Syntax", icarePillar3TitleUk: "Матіс — синтаксис тіла",
  icarePillar3TitleFr: "Matisse + syntaxe du corps",
  icarePillar3DescEn: "Blue Nudes. The Jazz cut-outs. Choreography that refuses ornament — only contour, only the essential line, only the irreducible truth of the body in space.", icarePillar3DescUk: "Сині Ню. Аплікації з «Джазу». Хореографія, що відмовляється від орнаменту — тільки контур, тільки суттєва лінія, тільки незвідна правда тіла в просторі.",
  icarePillar3DescFr: "L'Icare de Matisse comme une iconographie fondamentalement différente, alternative. Au lieu d'un être humain volant vers le soleil, nous avons un être humain qui EST le soleil. Cela pourrait devenir l'image finale de l'interprétation de la production.",
  icareScoreSubtitleEn: "Igor Markevich, Paris, 1932", icareScoreSubtitleUk: "Ігор Маркевич, Париж, 1932",
  icareScoreSubtitleFr: "Igor Markevitch, Paris, 1932",
  icareScoreDescEn: "Quintet: violin, viola, cello, double bass, piano. Duration: 27 minutes. Performed by Ensemble of Five.", icareScoreDescUk: "Квінтет: скрипка, альт, віолончель, контрабас, фортепіано. Тривалість: 27 хвилин. Виконує Ensemble of Five.",
  icareScoreDescFr: "Durée : 27 minutes. Interprété par l'Orchestre national de Belgique.",
  icareDramaturgyTitleEn: "7 Movements · 27 Minutes", icareDramaturgyTitleUk: "7 частин · 27 хвилин",
  icareDramaturgyTitleFr: "7 Movements · 27 Minutes",
  icareDramaturgyDescEn: "From silence to flight to illumination. Each movement — a distinct state of body and soul.", icareDramaturgyDescUk: "Від тиші до польоту до осяяння. Кожна частина — окремий стан тіла і душі.",
  icareDramaturgyDescFr: "From silence to flight to illumination. Each movement — a distinct state of body and soul.",
  icareSpecsTitleEn: "Production Requirements", icareSpecsTitleUk: "Умови постановки",
  icareSpecsTitleFr: "Production Requirements",
  icareBioEn: "Artem Hordieiev is a choreographer and founder of Newspaper Ballet Bureau (NBB). His works have been recognised at international competitions and presented on stages across Ukraine and Europe. Productions include The Ants (after Bernard Werber), Anima, Mozart 25, and Carmen (Bizet–Shchedrin).", icareBioUk: "Артем Гордієв — хореограф і засновник Newspaper Ballet Bureau (NBB). Його роботи відзначені на міжнародних конкурсах і представлені на сценах України та Європи. Серед постановок — «Мурахи» (за Бернаром Вербером), «Аніма», «Моцарт 25», «Кармен» (Бізе–Щедрін).",
  icareBioFr: "Artem Hordieiev is a choreographer and founder of Newspaper Ballet Bureau (NBB). His works have been recognised at international competitions and presented on stages across Ukraine and Europe. Productions include The Ants (after Bernard Werber), Anima, Mozart 25, and Carmen (Bizet–Shchedrin).",
  icareBio2En: "ICARE — the world's first choreographic staging of Markevich's Le Vol d'Icare — will be the centrepiece of his 2026 Paris season.", icareBio2Uk: "ICARE — перша в світі хореографічна постановка «Польоту Ікара» Маркевича — стане центральним проєктом його паризького сезону 2026 року.",
  icareBio2Fr: "ICARE — the world's first choreographic staging of Markevich's Le Vol d'Icare — will be the centrepiece of his 2026 Paris season.",
  icareCtaTitleEn: "Available for World Premiere", icareCtaTitleUk: "Доступна для прем'єри",
  icareCtaTitleFr: "Disponible pour la première mondiale",
  icareCtaTextEn: "ICARE is open to negotiations with theatres, festivals, and producing organisations — exclusive partner for the world premiere staging.", icareCtaTextUk: "ICARE відкрита для переговорів з театрами, фестивалями та продюсерськими організаціями — виключний партнер для першої постановки у світі.",
  icareCtaTextFr: "Le projet ICARE est ouvert aux discussions avec les théâtres, festivals et organisations de production en tant que partenaires clés pour la première mondiale.",
  icareCtaBtnEn: "Contact Choreographer", icareCtaBtnUk: "Написати хореографу",
  icareCtaBtnFr: "Contacter le chorégraphe",
  // ── Premiere CTA defaults ──
  theAntsPremiereTitleEn: "Available for Co-Production",  theAntsPremiereTitleUk: "Доступна для копродукції",
  theAntsPremiereTitleFr: "Disponible pour coproduction",
  theAntsPremiereTextEn: "The Ants is available for international co-production, festival presentation and touring. Contact us to discuss collaboration.", theAntsPremiereTextUk: "«Мурахи» доступні для міжнародної копродукції, фестивального показу та гастролей. Зв'яжіться з нами, щоб обговорити співпрацю.",
  theAntsPremiereTextFr: "Les Fourmis est disponible pour une coproduction internationale, une présentation en festival et une tournée. Contactez-nous pour discuter d'une collaboration.",
  theAntsPremiereBtnEn: "Book Performance", theAntsPremiereBtnUk: "Замовити виставу",
  theAntsPremiereBtnFr: "Réserver le spectacle",
  mozart25PremiereTitleEn: "Available for International Stages", mozart25PremiereTitleUk: "Доступна для міжнародних сцен",
  mozart25PremiereTitleFr: "Disponible pour les scènes internationales",
  mozart25PremiereTextEn: "Mozart 25 is available for festival presentation, international touring and co-production. Contact us to discuss programming.", mozart25PremiereTextUk: "«Моцарт 25» доступний для фестивального показу, міжнародних гастролей та копродукції. Зв'яжіться з нами для обговорення програмування.",
  mozart25PremiereTextFr: "Mozart 25 est disponible pour une présentation en festival, une tournée internationale et une coproduction. Contactez-nous pour discuter de la programmation.",
  mozart25PremiereBtnEn: "Book Performance", mozart25PremiereBtnUk: "Замовити виставу",
  mozart25PremiereBtnFr: "Réserver le spectacle",
  carmenPremiereTitleEn: "Available for International Stages", carmenPremiereTitleUk: "Доступна для міжнародних сцен",
  carmenPremiereTitleFr: "Disponible pour les scènes internationales",
  carmenPremiereTextEn: "Carmen (Bizet–Shchedrin) is available for festival presentation, competition and international touring. Contact us to discuss programming.", carmenPremiereTextUk: "«Кармен» (Бізе–Щедрін) доступна для фестивального показу, конкурсу та міжнародних гастролей. Зв'яжіться для обговорення.",
  carmenPremiereTextFr: "Carmen (Bizet–Chtchedrine) est disponible pour des présentations en festival et des coproductions internationales. Contactez-nous pour discuter de la programmation.",
  carmenPremiereBtnEn: "Book Performance", carmenPremiereBtnUk: "Замовити виставу",
  carmenPremiereBtnFr: "Réserver le spectacle",
  // ── Homepage hero defaults ──
  heroTaglineEn: "",   heroTaglineUk: "",
  heroTaglineFr: "",
  heroRoleEn: "",      heroRoleUk: "",
  heroRoleFr: "",
  // ── Mercy chip defaults ──
  mercyChip1En: "2021",             mercyChip1Uk: "2021",
  mercyChip1Fr: "2021",
  mercyChip2En: "Dance Film",       mercyChip2Uk: "Танцювальний фільм",
  mercyChip2Fr: "Trio contemporain",
  mercyChip3En: "Max Richter — Voices", mercyChip3Uk: "Max Richter — Voices",
  mercyChip3Fr: "Max Richter • Voices",
  mercyChip4En: "Lviv",             mercyChip4Uk: "Львів",
  mercyChip4Fr: "Lviv",
  // ── Humans chip defaults ──
  humansChip1En: "2020",            humansChip1Uk: "2020",
  humansChip1Fr: "2020",
  humansChip2En: "Dance Piece",     humansChip2Uk: "Танцювальна п'єса",
  humansChip2Fr: "Pièce dansée",
  humansChip3En: "Roerich Cycle",   humansChip3Uk: "Цикл Реріха",
  humansChip3Fr: "Cycle Roerich",
  humansChip4En: "Cosmogony",       humansChip4Uk: "Космогонія",
  humansChip4Fr: "Cosmogonie",
  // ── Mercy defaults ──
  mercyImage: "",
  mercyHeroLabelEn: "2021 · Max Richter · Voices",   mercyHeroLabelUk: "2021 · Max Richter · Voices",
  mercyHeroLabelFr: "2021 · Max Richter · Voices",
  mercyHeroSubtitleEn: "Dance Film · Vocal-Choreographic Piece", mercyHeroSubtitleUk: "Танцювальний фільм · Вокально-хореографічна п'єса",
  mercyHeroSubtitleFr: "Une méditation chorégraphique",
  mercyHeroTaglineEn: "Born in lockdown. Danced in defiance. A meditation on mercy, freedom, and the thin line between them.", mercyHeroTaglineUk: "Народжена у локдауні. Станцьована всупереч. Медитація про милосердя, свободу та тонку межу між ними.",
  mercyHeroTaglineFr: "Né du confinement. Dansé en défi aux règles. Une méditation sur la clémence, la liberté, et la ligne fragile qui les sépare.",
  mercyIntroTitleEn: "When Rehearsal Became Impossible", mercyIntroTitleUk: "Коли репетиція стала неможливою",
  mercyIntroTitleFr: "Le silence de la pandémie",
  mercyIntroBodyEn: "The pandemic split the National Ballet into seven isolated cohorts of five or six. Ensemble work — the very architecture of ballet — became illegal. Walking through empty Kyiv, the choreographer encountered the raw paradox of the human condition: total isolation inside an entire city. That sensation became the work. At personal expense, without institutional support, he travelled to Lviv and created Mercy — a small production that elevated corps dancers to the status of principal soloists. Not a compromise. A manifesto of what persists when everything is taken away.",
  mercyIntroBodyUk: "Пандемія розбила Національний балет на сім ізольованих груп по п'ять-шість людей. Ансамблева робота — сама архітектура балету — стала незаконною. Блукаючи порожнім Києвом, хореограф зіткнувся з парадоксом людського становища: повна ізоляція всередині цілого міста. Це відчуття стало виставою. За власні кошти, без інституційної підтримки, він поїхав до Львова і створив Mercy — невелику постановку, яка підняла артистів кордебалету до статусу провідних солістів. Не компроміс. Маніфест того, що лишається, коли все відібрано.",
  mercyIntroBodyFr: "La pandémie a divisé la compagnie de ballet de Lviv en sept groupes isolés de cinq à six danseurs. Le travail d'ensemble est devenu impossible. Errant dans un Kyiv désert, le chorégraphe s'est confronté au paradoxe de la condition humaine : l'isolement total des citadins dans leurs appartements et le silence absolu des rues. Cette sensation est devenue une vision. À ses propres frais et sans soutien institutionnel, il s'est rendu à Lviv et a créé Mercy — une petite production qui a élevé des danseurs du corps de ballet au rang de solistes principaux lors d'un concours de perfectionnement professionnel. Cette danse est un manifeste de ce qui subsiste lorsque tant a été retiré à un être humain.",
  mercyContextTitleEn: "Max Richter · Voices · The Chain of Meaning", mercyContextTitleUk: "Max Richter · Voices · Ланцюг смислу",
  mercyContextTitleFr: "Max Richter · Voices · La chaîne du sens",
  mercyContextBodyEn: "The choreography is set to Max Richter's Voices (2020), built on a single radical act: a twenty-four-hour continuous reading of the Universal Declaration of Human Rights, as voiced by Eleanor Roosevelt in 1948. That Declaration, in turn, invoked the Roerich Pact — the first international treaty protecting cultural heritage in wartime, signed in Washington in 1935. The chain: a ballet born from pandemic isolation, choreographed to music about human rights, rooted in a treaty that made culture sacred. Mercy stands in that lineage. In potential — it is a large project.",
  mercyContextBodyUk: "Хореографія поставлена на музику Макса Ріхтера Voices (2020) — твір, побудований на одному радикальному акті: двадцятичотиригодинному безперервному читанні Загальної декларації прав людини у виконанні Елеонори Рузвельт, 1948. Та Декларація, своєю чергою, спиралась на Пакт Реріха — перший міжнародний договір про захист культурної спадщини під час війни, підписаний у Вашингтоні 1935 року. Ланцюг: балет, народжений з пандемічної ізоляції, поставлений на музику про права людини, вкорінену в договорі, що зробив культуру священною. Mercy стоїть у цій традиції. В потенціалі — великий проєкт.",
  mercyContextBodyFr: "Chorégraphie sur la musique de Max Richter tirée de l'album Voices (2020). L'œuvre s'inspire de la lecture historique de la Déclaration universelle des droits de l'homme par Eleanor Roosevelt en 1948. La Déclaration, à son tour, puise dans le Pacte Roerich — le premier traité international pour la protection du patrimoine culturel en temps de guerre, signé à Washington en 1935. Un ballet né de l'isolement pandémique, sur une musique centrée sur les droits humains et enraciné dans un traité qui plaçait la culture au-dessus de la nécessité militaire. Un projet au potentiel de production à grande échelle.",
  mercyVideo1Id: "",
  mercyVideo1En: "", mercyVideo1Uk: "",
  mercyVideo1Fr: "",
  mercyCtaTitleEn: "A Work in Development",  mercyCtaTitleUk: "Проєкт у розробці",
  mercyCtaTitleFr: "Un projet en développement",
  mercyCtaTextEn: "Mercy is in the conceptual and choreographic development phase. Producing partners interested in a full-length development are welcome to reach out. The artistic foundation exists. The scale is available.",
  mercyCtaTextUk: "Mercy перебуває у фазі концептуальної та хореографічної розробки. Виробничі партнери, зацікавлені у повномасштабній постановці, можуть звернутися напряму. Мистецька основа існує. Масштаб — доступний.",
  mercyCtaTextFr: "Mercy est actuellement en phase de développement conceptuel et chorégraphique. Les partenaires de production intéressés par un développement long format sont invités à nous contacter.",
  mercyCtaBtnEn: "Discuss the Project",      mercyCtaBtnUk: "Обговорити проєкт",
  mercyCtaBtnFr: "Discuter du projet",
  // ── Humans defaults ──
  humansImage: "",
  humansHeroLabelEn: "Roerich Cosmogony · Dance Piece", humansHeroLabelUk: "Космогонія Реріха · Танцювальна п'єса",
  humansHeroLabelFr: "Cosmogonie de Roerich",
  humansHeroSubtitleEn: "Part of the Roerich Sacred Cycle", humansHeroSubtitleUk: "Частина сакрального циклу Реріха",
  humansHeroSubtitleFr: "Partie du cycle sacré de Roerich",
  humansHeroTaglineEn: "Before the first rule. Before the first word. The ritual that made us human.", humansHeroTaglineUk: "До першого правила. До першого слова. Ритуал, що зробив нас людьми.",
  humansHeroTaglineFr: "Avant la première loi. Avant le premier mot. Le rituel qui a fait de nous des humains.",
  humansIntroTitleEn: "A Choreographic Cosmogony", humansIntroTitleUk: "Хореографічна космогонія",
  humansIntroTitleFr: "Une cosmogonie chorégraphique",
  humansIntroBodyEn: "Humans is the second chapter of a sacred cycle rooted in the philosophical legacy of Nicholas Roerich — painter, explorer, and architect of the Roerich Pact. The work continues a choreographic research into the ancient mystical rituals that precede recorded civilization: the awakening of nature, the origin of consciousness, the first moment a body became human. The audience enters a hypothetical world in which human beings were not born — they were made. Not by gods in the theological sense. By cosmic parents: beings from another plane whose ritual dance is itself the act of creation.",
  humansIntroBodyUk: "Humans — другий розділ сакрального циклу, вкоріненого у філософській спадщині Миколи Реріха — художника, дослідника і архітектора Пакту Реріха. Вистава продовжує хореографічне дослідження стародавніх містичних ритуалів, що передують зафіксованій цивілізації: пробудження природи, витоки свідомості, перший момент, коли тіло стало людиною. Глядач занурюється у гіпотетичний світ, де людей не народжують — їх творять. Не богами в теологічному сенсі. Космічними батьками: істотами з іншої площини, чий ритуальний танець є самим актом творення.",
  humansIntroBodyFr: "Humans est un mouvement d'un cycle sacré enraciné dans l'héritage philosophique de Nicholas Roerich — artiste, explorateur et architecte du Pacte Roerich. Le spectacle poursuit une exploration chorégraphique des rituels mystiques ancestraux antérieurs à la civilisation écrite. Il évoque l'énergie primitive du Sacre du printemps (Stravinsky/Roerich), en sondant l'éveil de la nature, les origines de la conscience et l'instant primordial où le corps est devenu pour la première fois un instrument du rituel. Le spectateur est plongé dans un monde hypothétique où les humains ne naissent pas ; ils sont créés. Non par des dieux au sens théologique, mais par des « Parents cosmiques », des êtres d'une autre dimension dont la danse rituelle est l'acte même de la création.",
  humansMythTitleEn: "The Myth of Making", humansMythTitleUk: "Міф про Творення",
  humansMythTitleFr: "Genèse. Un mythe des origines humaines",
  humansMythBodyEn: "The cosmic parents arrive. Their bodies enact an ancient ritual: the awakening of matter, the shaping of form, the ignition of consciousness. From their movement, a human being is born — incomplete, dependent, terrified, full of unrealised potential. Then the parents depart. Back to their native planet. The created being is left alone on Earth — to discover language, to establish rules, to build civilisation from nothing. This is the fundamental human condition: made by something greater than ourselves, then abandoned to the impossible task of becoming.",
  humansMythBodyUk: "Космічні батьки з'являються. Їхні тіла відтворюють стародавній ритуал: пробудження матерії, формування форми, запалення свідомості. З їхнього руху народжується людина — неповна, залежна, налякана, сповнена нереалізованого потенціалу. Потім батьки йдуть. Назад на свою рідну планету. Створена істота залишається на Землі на самоті — щоб відкрити мову, встановити правила, побудувати цивілізацію з нічого. Це фундаментальний стан людини: створений чимось більшим за себе, а потім покинутий перед неможливим завданням ставати.",
  humansMythBodyFr: "Les Parents cosmiques apparaissent. Leurs corps rejouent un rituel ancien : l'éveil de la matière, le façonnement de la forme, l'allumage de la conscience. De leur mouvement naît l'être humain — incomplet, dépendant, terrifié, mais débordant d'un potentiel inexploité. Puis les créateurs s'en vont, regagnant leur monde d'origine. L'être créé reste seul sur Terre, pour découvrir le langage, établir des règles et bâtir une civilisation à partir de rien.",
  humansVideo1Id: "",
  humansVideo1En: "", humansVideo1Uk: "",
  humansVideo1Fr: "",
  humansCtaTitleEn: "Part of the Roerich Cycle", humansCtaTitleUk: "Частина циклу Реріха",
  humansCtaTitleFr: "Partie du cycle Roerich",
  humansCtaTextEn: "Humans is in active development as the second part of a larger Roerich cosmogony trilogy. Co-production partners and festival presenters are invited to begin a conversation about future staging.",
  humansCtaTextUk: "Humans у активній розробці як друга частина більшої трилогії космогонії Реріха. Виробничі партнери та фестивальні презентери запрошуються до початку розмови про майбутню постановку.",
  humansCtaTextFr: "Humans est actuellement en développement actif, dans le cadre d'une trilogie plus vaste consacrée à la cosmogonie de Roerich. Les partenaires de production et programmateurs de festivals sont invités à entamer un dialogue concernant la future mise en scène.",
  humansCtaBtnEn: "Discuss the Project", humansCtaBtnUk: "Обговорити проєкт",
  humansCtaBtnFr: "Discuter du projet",
};

function richText(rt: Array<{ plain_text: string }> | undefined): string {
  // Collapse Notion newlines to spaces so body text wraps naturally in HTML
  return (rt?.map((t) => t.plain_text).join("") ?? "").replace(/\n/g, " ");
}

/** Query one Notion DB, return [] if env var is missing or query fails. */
async function queryDb(dbId: string | undefined): Promise<unknown[]> {
  if (!dbId) return [];
  try {
    const res = await notion.databases.query({ database_id: dbId });
    return res.results;
  } catch (err) {
    console.error(`[settings] queryDb(${dbId.slice(0, 8)}…) failed:`, err);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_SETTINGS_DB_ID)
    return DEFAULT_SETTINGS;

  try {
    // All DBs queried in parallel — per-work DBs override main DB for their keys
    const [mainRows, animaRows, adiosRows, carmenRows, firebirdRows, theAntsRows, mozart25Rows, icareRows, mercyRows, humansRows] =
      await Promise.all([
        queryDb(process.env.NOTION_SETTINGS_DB_ID),
        queryDb(process.env.NOTION_ANIMA_DB_ID),
        queryDb(process.env.NOTION_ADIOS_DB_ID),
        queryDb(process.env.NOTION_CARMEN_DB_ID),
        queryDb(process.env.NOTION_FIREBIRD_DB_ID),
        queryDb(process.env.NOTION_THE_ANTS_DB_ID),
        queryDb(process.env.NOTION_MOZART25_DB_ID),
        queryDb(process.env.NOTION_ICARE_DB_ID),
        queryDb(process.env.NOTION_MERCY_DB_ID),
        queryDb(process.env.NOTION_HUMANS_DB_ID),
      ]);

    const settings: SiteSettings = { ...DEFAULT_SETTINGS };
    const allRows = [
      ...mainRows, ...animaRows, ...adiosRows, ...carmenRows,
      ...firebirdRows, ...theAntsRows, ...mozart25Rows, ...icareRows,
      ...mercyRows, ...humansRows,
    ];

    for (const page of allRows) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = (page as any).properties as Record<string, any>;

      const key = richText(props["Setting"]?.title);
      const valueEn = richText(props["Value EN"]?.rich_text);
      const valueUk = richText(props["Value UK"]?.rich_text);
      const valueFr = richText(props["Value FR"]?.rich_text);

      if (key === "cta_text") {
        if (valueEn) settings.ctaTextEn = valueEn;
        if (valueUk) settings.ctaTextUk = valueUk; if (valueFr) settings.ctaTextFr = valueFr;
      }
      // Homepage hero
      if (key === "hero_tagline") { if (valueEn) settings.heroTaglineEn = valueEn; if (valueUk) settings.heroTaglineUk = valueUk; if (valueFr) settings.heroTaglineFr = valueFr; }
      if (key === "hero_role") { if (valueEn) settings.heroRoleEn = valueEn; if (valueUk) settings.heroRoleUk = valueUk; if (valueFr) settings.heroRoleFr = valueFr; }
      // Mercy chips
      if (key === "mercy_chip_1") { if (valueEn) settings.mercyChip1En = valueEn; if (valueUk) settings.mercyChip1Uk = valueUk; if (valueFr) settings.mercyChip1Fr = valueFr; }
      if (key === "mercy_chip_2") { if (valueEn) settings.mercyChip2En = valueEn; if (valueUk) settings.mercyChip2Uk = valueUk; if (valueFr) settings.mercyChip2Fr = valueFr; }
      if (key === "mercy_chip_3") { if (valueEn) settings.mercyChip3En = valueEn; if (valueUk) settings.mercyChip3Uk = valueUk; if (valueFr) settings.mercyChip3Fr = valueFr; }
      if (key === "mercy_chip_4") { if (valueEn) settings.mercyChip4En = valueEn; if (valueUk) settings.mercyChip4Uk = valueUk; if (valueFr) settings.mercyChip4Fr = valueFr; }
      // Humans chips
      if (key === "humans_chip_1") { if (valueEn) settings.humansChip1En = valueEn; if (valueUk) settings.humansChip1Uk = valueUk; if (valueFr) settings.humansChip1Fr = valueFr; }
      if (key === "humans_chip_2") { if (valueEn) settings.humansChip2En = valueEn; if (valueUk) settings.humansChip2Uk = valueUk; if (valueFr) settings.humansChip2Fr = valueFr; }
      if (key === "humans_chip_3") { if (valueEn) settings.humansChip3En = valueEn; if (valueUk) settings.humansChip3Uk = valueUk; if (valueFr) settings.humansChip3Fr = valueFr; }
      if (key === "humans_chip_4") { if (valueEn) settings.humansChip4En = valueEn; if (valueUk) settings.humansChip4Uk = valueUk; if (valueFr) settings.humansChip4Fr = valueFr; }
      if (key === "anima_blockquote") {
        if (valueEn) settings.animaBlockquoteEn = valueEn;
        if (valueUk) settings.animaBlockquoteUk = valueUk; if (valueFr) settings.animaBlockquoteFr = valueFr;
      }
      // Poster URLs and PDF — URL is language-agnostic, stored in Value EN
      if (key === "anima_poster_1" && valueEn) settings.animaPoster1 = valueEn;
      if (key === "anima_poster_2" && valueEn) settings.animaPoster2 = valueEn;
      if (key === "anima_poster_3" && valueEn) settings.animaPoster3 = valueEn;
      if (key === "anima_poster_4" && valueEn) settings.animaPoster4 = valueEn;
      if (key === "anima_libretto_pdf" && valueEn) settings.animaLibrettoPdf = valueEn;
      // Credits
      if (key === "anima_credit_idea") {
        if (valueEn) settings.animaCreditIdeaEn = valueEn;
        if (valueUk) settings.animaCreditIdeaUk = valueUk; if (valueFr) settings.animaCreditIdeaFr = valueFr;
      }
      if (key === "anima_credit_choreography") {
        if (valueEn) settings.animaCreditChoreographyEn = valueEn;
        if (valueUk) settings.animaCreditChoreographyUk = valueUk; if (valueFr) settings.animaCreditChoreographyFr = valueFr;
      }
      if (key === "anima_credit_music" && valueEn) settings.animaCreditMusic = valueEn;
      if (key === "anima_credit_costumes") {
        if (valueEn) settings.animaCreditCostumesEn = valueEn;
        if (valueUk) settings.animaCreditCostumesUk = valueUk; if (valueFr) settings.animaCreditCostumesFr = valueFr;
      }
      if (key === "anima_credit_premiere_date") {
        if (valueEn) settings.animaCreditPremiereDateEn = valueEn;
        if (valueUk) settings.animaCreditPremiereDateUk = valueUk; if (valueFr) settings.animaCreditPremiereDateFr = valueFr;
      }
      if (key === "anima_credit_venue") {
        if (valueEn) settings.animaCreditVenueEn = valueEn;
        if (valueUk) settings.animaCreditVenueUk = valueUk; if (valueFr) settings.animaCreditVenueFr = valueFr;
      }
      if (key === "anima_credit_company" && valueEn) settings.animaCreditCompany = valueEn;
      // Video captions
      if (key === "anima_video_showreel") {
        if (valueEn) settings.animaVideoShowreelEn = valueEn;
        if (valueUk) settings.animaVideoShowreelUk = valueUk; if (valueFr) settings.animaVideoShowreelFr = valueFr;
      }
      if (key === "anima_video_premiere") {
        if (valueEn) settings.animaVideoPremiereEn = valueEn;
        if (valueUk) settings.animaVideoPremiereUk = valueUk; if (valueFr) settings.animaVideoPremiereFr = valueFr;
      }
      if (key === "anima_video_rehearsal") {
        if (valueEn) settings.animaVideoRehearsalEn = valueEn;
        if (valueUk) settings.animaVideoRehearsalUk = valueUk; if (valueFr) settings.animaVideoRehearsalFr = valueFr;
      }
      // Festival section
      if (key === "anima_festival_name" && valueEn) settings.animaFestivalName = valueEn;
      if (key === "anima_festival_subtitle") {
        if (valueEn) settings.animaFestivalSubtitleEn = valueEn;
        if (valueUk) settings.animaFestivalSubtitleUk = valueUk; if (valueFr) settings.animaFestivalSubtitleFr = valueFr;
      }
      if (key === "anima_festival_dates") {
        if (valueEn) settings.animaFestivalDatesEn = valueEn;
        if (valueUk) settings.animaFestivalDatesUk = valueUk; if (valueFr) settings.animaFestivalDatesFr = valueFr;
      }
      if (key === "anima_festival_venue") {
        if (valueEn) settings.animaFestivalVenueEn = valueEn;
        if (valueUk) settings.animaFestivalVenueUk = valueUk; if (valueFr) settings.animaFestivalVenueFr = valueFr;
      }
      if (key === "anima_festival_description") {
        if (valueEn) settings.animaFestivalDescriptionEn = valueEn;
        if (valueUk) settings.animaFestivalDescriptionUk = valueUk; if (valueFr) settings.animaFestivalDescriptionFr = valueFr;
      }
      if (key === "anima_festival_organizers") {
        if (valueEn) settings.animaFestivalOrganizersEn = valueEn;
        if (valueUk) settings.animaFestivalOrganizersUk = valueUk; if (valueFr) settings.animaFestivalOrganizersFr = valueFr;
      }
      // LITSO → NBB section
      if (key === "anima_litso_title") {
        if (valueEn) settings.animaLitsoTitleEn = valueEn;
        if (valueUk) settings.animaLitsoTitleUk = valueUk; if (valueFr) settings.animaLitsoTitleFr = valueFr;
      }
      if (key === "anima_litso_body") {
        if (valueEn) settings.animaLitsoBodyEn = valueEn;
        if (valueUk) settings.animaLitsoBodyUk = valueUk; if (valueFr) settings.animaLitsoBodyFr = valueFr;
      }
      if (key === "anima_cta_label") { if (valueEn) settings.animaCtaLabelEn = valueEn; if (valueUk) settings.animaCtaLabelUk = valueUk; if (valueFr) settings.animaCtaLabelFr = valueFr; }
      if (key === "anima_cta_title") { if (valueEn) settings.animaCtaTitleEn = valueEn; if (valueUk) settings.animaCtaTitleUk = valueUk; if (valueFr) settings.animaCtaTitleFr = valueFr; }
      if (key === "anima_cta_text") { if (valueEn) settings.animaCtaTextEn = valueEn; if (valueUk) settings.animaCtaTextUk = valueUk; if (valueFr) settings.animaCtaTextFr = valueFr; }
      if (key === "anima_cta_btn") { if (valueEn) settings.animaCtaBtnEn = valueEn; if (valueUk) settings.animaCtaBtnUk = valueUk; if (valueFr) settings.animaCtaBtnFr = valueFr; }
      // Scenes section header
      if (key === "anima_scenes_label") {
        if (valueEn) settings.animaScenesLabelEn = valueEn;
        if (valueUk) settings.animaScenesLabelUk = valueUk; if (valueFr) settings.animaScenesLabelFr = valueFr;
      }
      if (key === "anima_scenes_title") {
        if (valueEn) settings.animaScenesTitleEn = valueEn;
        if (valueUk) settings.animaScenesTitleUk = valueUk; if (valueFr) settings.animaScenesTitleFr = valueFr;
      }
      if (key === "anima_scenes_description") {
        if (valueEn) settings.animaScenesDescriptionEn = valueEn;
        if (valueUk) settings.animaScenesDescriptionUk = valueUk; if (valueFr) settings.animaScenesDescriptionFr = valueFr;
      }
      // About section
      if (key === "about_label") {
        if (valueEn) settings.aboutLabelEn = valueEn;
        if (valueUk) settings.aboutLabelUk = valueUk; if (valueFr) settings.aboutLabelFr = valueFr;
      }
      if (key === "about_name") {
        if (valueEn) settings.aboutNameEn = valueEn;
        if (valueUk) settings.aboutNameUk = valueUk; if (valueFr) settings.aboutNameFr = valueFr;
      }
      if (key === "about_role") {
        if (valueEn) settings.aboutRoleEn = valueEn;
        if (valueUk) settings.aboutRoleUk = valueUk; if (valueFr) settings.aboutRoleFr = valueFr;
      }
      if (key === "about_manifesto") {
        if (valueEn) settings.aboutManifestoEn = valueEn;
        if (valueUk) settings.aboutManifestoUk = valueUk; if (valueFr) settings.aboutManifestoFr = valueFr;
      }
      if (key === "about_bio") {
        if (valueEn) settings.aboutBioEn = valueEn;
        if (valueUk) settings.aboutBioUk = valueUk; if (valueFr) settings.aboutBioFr = valueFr;
      }
      if (key === "about_nbb") {
        if (valueEn) settings.aboutNbbEn = valueEn;
        if (valueUk) settings.aboutNbbUk = valueUk; if (valueFr) settings.aboutNbbFr = valueFr;
      }
      // CV CTA section
      if (key === "cv_cta_label") {
        if (valueEn) settings.cvCtaLabelEn = valueEn;
        if (valueUk) settings.cvCtaLabelUk = valueUk; if (valueFr) settings.cvCtaLabelFr = valueFr;
      }
      if (key === "cv_cta_title") {
        if (valueEn) settings.cvCtaTitleEn = valueEn;
        if (valueUk) settings.cvCtaTitleUk = valueUk; if (valueFr) settings.cvCtaTitleFr = valueFr;
      }
      if (key === "cv_cta_text") {
        if (valueEn) settings.cvCtaTextEn = valueEn;
        if (valueUk) settings.cvCtaTextUk = valueUk; if (valueFr) settings.cvCtaTextFr = valueFr;
      }
      if (key === "cv_cta_btn") {
        if (valueEn) settings.cvCtaBtnEn = valueEn;
        if (valueUk) settings.cvCtaBtnUk = valueUk; if (valueFr) settings.cvCtaBtnFr = valueFr;
      }
      if (key === "cv_url" && valueEn) settings.cvUrl = valueEn;
      // Contact section
      if (key === "contact_title") {
        if (valueEn) settings.contactTitleEn = valueEn;
        if (valueUk) settings.contactTitleUk = valueUk; if (valueFr) settings.contactTitleFr = valueFr;
      }
      if (key === "contact_subtitle") {
        if (valueEn) settings.contactSubtitleEn = valueEn;
        if (valueUk) settings.contactSubtitleUk = valueUk; if (valueFr) settings.contactSubtitleFr = valueFr;
      }
      // Firebird page
      if (key === "firebird_image" && valueEn) settings.firebirdImage = valueEn;
      if (key === "firebird_url" && valueEn) settings.firebirdUrl = valueEn;
      if (key === "firebird_btn") {
        if (valueEn) settings.firebirdBtnEn = valueEn;
        if (valueUk) settings.firebirdBtnUk = valueUk; if (valueFr) settings.firebirdBtnFr = valueFr;
      }
      if (key === "firebird_caption") {
        if (valueEn) settings.firebirdCaptionEn = valueEn;
        if (valueUk) settings.firebirdCaptionUk = valueUk; if (valueFr) settings.firebirdCaptionFr = valueFr;
      }
      if (key === "firebird_title") {
        if (valueEn) settings.firebirdTitleEn = valueEn;
        if (valueUk) settings.firebirdTitleUk = valueUk; if (valueFr) settings.firebirdTitleFr = valueFr;
      }
      if (key === "firebird_subtitle") {
        if (valueEn) settings.firebirdSubtitleEn = valueEn;
        if (valueUk) settings.firebirdSubtitleUk = valueUk; if (valueFr) settings.firebirdSubtitleFr = valueFr;
      }
      if (key === "firebird_description") {
        if (valueEn) settings.firebirdDescriptionEn = valueEn;
        if (valueUk) settings.firebirdDescriptionUk = valueUk; if (valueFr) settings.firebirdDescriptionFr = valueFr;
      }
      if (key === "firebird_year" && valueEn) settings.firebirdYear = valueEn;
      if (key === "firebird_music" && valueEn) settings.firebirdMusic = valueEn;
      if (key === "firebird_ref_video" && valueEn) settings.firebirdRefVideoId = valueEn;
      if (key === "firebird_ref_label") {
        if (valueEn) settings.firebirdRefLabelEn = valueEn;
        if (valueUk) settings.firebirdRefLabelUk = valueUk; if (valueFr) settings.firebirdRefLabelFr = valueFr;
      }
      if (key === "firebird_ref_title") {
        if (valueEn) settings.firebirdRefTitleEn = valueEn;
        if (valueUk) settings.firebirdRefTitleUk = valueUk; if (valueFr) settings.firebirdRefTitleFr = valueFr;
      }
      if (key === "the_ants_title") {
        if (valueEn) settings.theAntsTitleEn = valueEn;
        if (valueUk) settings.theAntsTitleUk = valueUk; if (valueFr) settings.theAntsTitleFr = valueFr;
      }
      if (key === "the_ants_subtitle") {
        if (valueEn) settings.theAntsSubtitleEn = valueEn;
        if (valueUk) settings.theAntsSubtitleUk = valueUk; if (valueFr) settings.theAntsSubtitleFr = valueFr;
      }
      if (key === "the_ants_description") {
        if (valueEn) settings.theAntsDescriptionEn = valueEn;
        if (valueUk) settings.theAntsDescriptionUk = valueUk; if (valueFr) settings.theAntsDescriptionFr = valueFr;
      }
      if (key === "the_ants_year" && valueEn) settings.theAntsYear = valueEn;
      if (key === "the_ants_music" && valueEn) settings.theAntsMusic = valueEn;
      if (key === "mozart25_title") {
        if (valueEn) settings.mozart25TitleEn = valueEn;
        if (valueUk) settings.mozart25TitleUk = valueUk; if (valueFr) settings.mozart25TitleFr = valueFr;
      }
      if (key === "mozart25_subtitle") {
        if (valueEn) settings.mozart25SubtitleEn = valueEn;
        if (valueUk) settings.mozart25SubtitleUk = valueUk; if (valueFr) settings.mozart25SubtitleFr = valueFr;
      }
      if (key === "mozart25_description") {
        if (valueEn) settings.mozart25DescriptionEn = valueEn;
        if (valueUk) settings.mozart25DescriptionUk = valueUk; if (valueFr) settings.mozart25DescriptionFr = valueFr;
      }
      if (key === "mozart25_year" && valueEn) settings.mozart25Year = valueEn;
      if (key === "mozart25_music" && valueEn) settings.mozart25Music = valueEn;
      if (key === "adios_title") {
        if (valueEn) settings.adiosTitleEn = valueEn;
        if (valueUk) settings.adiosTitleUk = valueUk; if (valueFr) settings.adiosTitleFr = valueFr;
      }
      if (key === "adios_subtitle") {
        if (valueEn) settings.adiosSubtitleEn = valueEn;
        if (valueUk) settings.adiosSubtitleUk = valueUk; if (valueFr) settings.adiosSubtitleFr = valueFr;
      }
      if (key === "adios_description") {
        if (valueEn) settings.adiosDescriptionEn = valueEn;
        if (valueUk) settings.adiosDescriptionUk = valueUk; if (valueFr) settings.adiosDescriptionFr = valueFr;
      }
      if (key === "adios_year" && valueEn) settings.adiosYear = valueEn;
      if (key === "adios_music" && valueEn) settings.adiosMusic = valueEn;
      if (key === "carmen_title") {
        if (valueEn) settings.carmenTitleEn = valueEn;
        if (valueUk) settings.carmenTitleUk = valueUk; if (valueFr) settings.carmenTitleFr = valueFr;
      }
      if (key === "carmen_subtitle") {
        if (valueEn) settings.carmenSubtitleEn = valueEn;
        if (valueUk) settings.carmenSubtitleUk = valueUk; if (valueFr) settings.carmenSubtitleFr = valueFr;
      }
      if (key === "carmen_description") {
        if (valueEn) settings.carmenDescriptionEn = valueEn;
        if (valueUk) settings.carmenDescriptionUk = valueUk; if (valueFr) settings.carmenDescriptionFr = valueFr;
      }
      if (key === "carmen_year" && valueEn) settings.carmenYear = valueEn;
      if (key === "carmen_music" && valueEn) settings.carmenMusic = valueEn;
      // Video captions
      if (key === "the_ants_video_1") {
        if (valueEn) settings.theAntsVideo1En = valueEn;
        if (valueUk) settings.theAntsVideo1Uk = valueUk; if (valueFr) settings.theAntsVideo1Fr = valueFr;
      }
      if (key === "the_ants_video_2") {
        if (valueEn) settings.theAntsVideo2En = valueEn;
        if (valueUk) settings.theAntsVideo2Uk = valueUk; if (valueFr) settings.theAntsVideo2Fr = valueFr;
      }
      if (key === "mozart25_video_1") {
        if (valueEn) settings.mozart25Video1En = valueEn;
        if (valueUk) settings.mozart25Video1Uk = valueUk; if (valueFr) settings.mozart25Video1Fr = valueFr;
      }
      if (key === "mozart25_video_2") {
        if (valueEn) settings.mozart25Video2En = valueEn;
        if (valueUk) settings.mozart25Video2Uk = valueUk; if (valueFr) settings.mozart25Video2Fr = valueFr;
      }
      if (key === "adios_video_1") {
        if (valueEn) settings.adiosVideo1En = valueEn;
        if (valueUk) settings.adiosVideo1Uk = valueUk; if (valueFr) settings.adiosVideo1Fr = valueFr;
      }
      if (key === "adios_video_2") {
        if (valueEn) settings.adiosVideo2En = valueEn;
        if (valueUk) settings.adiosVideo2Uk = valueUk; if (valueFr) settings.adiosVideo2Fr = valueFr;
      }
      if (key === "carmen_video_1") {
        if (valueEn) settings.carmenVideo1En = valueEn;
        if (valueUk) settings.carmenVideo1Uk = valueUk; if (valueFr) settings.carmenVideo1Fr = valueFr;
      }
      if (key === "contact_email" && valueEn) settings.contactEmail = valueEn;
      if (key === "social_instagram" && valueEn) settings.socialInstagram = valueEn;
      if (key === "social_threads" && valueEn) settings.socialThreads = valueEn;
      if (key === "social_telegram" && valueEn) settings.socialTelegram = valueEn;
      // ── ICARE page ──
      if (key === "icare_image" && valueEn) settings.icareImage = valueEn;
      if (key === "icare_hero_label") { if (valueEn) settings.icareHeroLabelEn = valueEn; if (valueUk) settings.icareHeroLabelUk = valueUk; if (valueFr) settings.icareHeroLabelFr = valueFr; }
      if (key === "icare_hero_subtitle") { if (valueEn) settings.icareHeroSubtitleEn = valueEn; if (valueUk) settings.icareHeroSubtitleUk = valueUk; if (valueFr) settings.icareHeroSubtitleFr = valueFr; }
      if (key === "icare_hero_tagline") { if (valueEn) settings.icareHeroTaglineEn = valueEn; if (valueUk) settings.icareHeroTaglineUk = valueUk; if (valueFr) settings.icareHeroTaglineFr = valueFr; }
      if (key === "icare_mission_title") { if (valueEn) settings.icareMissionTitleEn = valueEn; if (valueUk) settings.icareMissionTitleUk = valueUk; if (valueFr) settings.icareMissionTitleFr = valueFr; }
      if (key === "icare_mission_1932") { if (valueEn) settings.icareMission1932En = valueEn; if (valueUk) settings.icareMission1932Uk = valueUk; if (valueFr) settings.icareMission1932Fr = valueFr; }
      if (key === "icare_mission_93") { if (valueEn) settings.icareMission93En = valueEn; if (valueUk) settings.icareMission93Uk = valueUk; if (valueFr) settings.icareMission93Fr = valueFr; }
      if (key === "icare_mission_2026") { if (valueEn) settings.icareMission2026En = valueEn; if (valueUk) settings.icareMission2026Uk = valueUk; if (valueFr) settings.icareMission2026Fr = valueFr; }
      if (key === "icare_quote") { if (valueEn) settings.icareQuoteEn = valueEn; if (valueUk) settings.icareQuoteUk = valueUk; if (valueFr) settings.icareQuoteFr = valueFr; }
      if (key === "icare_quote_cite") { if (valueEn) settings.icareQuoteCiteEn = valueEn; if (valueUk) settings.icareQuoteCiteUk = valueUk; if (valueFr) settings.icareQuoteCiteFr = valueFr; }
      if (key === "icare_concept_title") { if (valueEn) settings.icareConceptTitleEn = valueEn; if (valueUk) settings.icareConceptTitleUk = valueUk; if (valueFr) settings.icareConceptTitleFr = valueFr; }
      if (key === "icare_concept_desc") { if (valueEn) settings.icareConceptDescEn = valueEn; if (valueUk) settings.icareConceptDescUk = valueUk; if (valueFr) settings.icareConceptDescFr = valueFr; }
      if (key === "icare_pillar_1_title") { if (valueEn) settings.icarePillar1TitleEn = valueEn; if (valueUk) settings.icarePillar1TitleUk = valueUk; if (valueFr) settings.icarePillar1TitleFr = valueFr; }
      if (key === "icare_pillar_1_desc") { if (valueEn) settings.icarePillar1DescEn = valueEn; if (valueUk) settings.icarePillar1DescUk = valueUk; if (valueFr) settings.icarePillar1DescFr = valueFr; }
      if (key === "icare_pillar_2_title") { if (valueEn) settings.icarePillar2TitleEn = valueEn; if (valueUk) settings.icarePillar2TitleUk = valueUk; if (valueFr) settings.icarePillar2TitleFr = valueFr; }
      if (key === "icare_pillar_2_desc") { if (valueEn) settings.icarePillar2DescEn = valueEn; if (valueUk) settings.icarePillar2DescUk = valueUk; if (valueFr) settings.icarePillar2DescFr = valueFr; }
      if (key === "icare_pillar_3_title") { if (valueEn) settings.icarePillar3TitleEn = valueEn; if (valueUk) settings.icarePillar3TitleUk = valueUk; if (valueFr) settings.icarePillar3TitleFr = valueFr; }
      if (key === "icare_pillar_3_desc") { if (valueEn) settings.icarePillar3DescEn = valueEn; if (valueUk) settings.icarePillar3DescUk = valueUk; if (valueFr) settings.icarePillar3DescFr = valueFr; }
      if (key === "icare_score_subtitle") { if (valueEn) settings.icareScoreSubtitleEn = valueEn; if (valueUk) settings.icareScoreSubtitleUk = valueUk; if (valueFr) settings.icareScoreSubtitleFr = valueFr; }
      if (key === "icare_score_desc") { if (valueEn) settings.icareScoreDescEn = valueEn; if (valueUk) settings.icareScoreDescUk = valueUk; if (valueFr) settings.icareScoreDescFr = valueFr; }
      if (key === "icare_dramaturgy_title") { if (valueEn) settings.icareDramaturgyTitleEn = valueEn; if (valueUk) settings.icareDramaturgyTitleUk = valueUk; if (valueFr) settings.icareDramaturgyTitleFr = valueFr; }
      if (key === "icare_dramaturgy_desc") { if (valueEn) settings.icareDramaturgyDescEn = valueEn; if (valueUk) settings.icareDramaturgyDescUk = valueUk; if (valueFr) settings.icareDramaturgyDescFr = valueFr; }
      if (key === "icare_specs_title") { if (valueEn) settings.icareSpecsTitleEn = valueEn; if (valueUk) settings.icareSpecsTitleUk = valueUk; if (valueFr) settings.icareSpecsTitleFr = valueFr; }
      if (key === "icare_bio") { if (valueEn) settings.icareBioEn = valueEn; if (valueUk) settings.icareBioUk = valueUk; if (valueFr) settings.icareBioFr = valueFr; }
      if (key === "icare_bio_2") { if (valueEn) settings.icareBio2En = valueEn; if (valueUk) settings.icareBio2Uk = valueUk; if (valueFr) settings.icareBio2Fr = valueFr; }
      if (key === "icare_cta_title") { if (valueEn) settings.icareCtaTitleEn = valueEn; if (valueUk) settings.icareCtaTitleUk = valueUk; if (valueFr) settings.icareCtaTitleFr = valueFr; }
      if (key === "icare_cta_text") { if (valueEn) settings.icareCtaTextEn = valueEn; if (valueUk) settings.icareCtaTextUk = valueUk; if (valueFr) settings.icareCtaTextFr = valueFr; }
      if (key === "icare_cta_btn") { if (valueEn) settings.icareCtaBtnEn = valueEn; if (valueUk) settings.icareCtaBtnUk = valueUk; if (valueFr) settings.icareCtaBtnFr = valueFr; }
      // ── Premiere CTA per work ──
      if (key === "the_ants_premiere_title") { if (valueEn) settings.theAntsPremiereTitleEn = valueEn; if (valueUk) settings.theAntsPremiereTitleUk = valueUk; if (valueFr) settings.theAntsPremiereTitleFr = valueFr; }
      if (key === "the_ants_premiere_text") { if (valueEn) settings.theAntsPremiereTextEn = valueEn; if (valueUk) settings.theAntsPremiereTextUk = valueUk; if (valueFr) settings.theAntsPremiereTextFr = valueFr; }
      if (key === "the_ants_premiere_btn") { if (valueEn) settings.theAntsPremiereBtnEn = valueEn; if (valueUk) settings.theAntsPremiereBtnUk = valueUk; if (valueFr) settings.theAntsPremiereBtnFr = valueFr; }
      if (key === "mozart25_premiere_title") { if (valueEn) settings.mozart25PremiereTitleEn = valueEn; if (valueUk) settings.mozart25PremiereTitleUk = valueUk; if (valueFr) settings.mozart25PremiereTitleFr = valueFr; }
      if (key === "mozart25_premiere_text") { if (valueEn) settings.mozart25PremiereTextEn = valueEn; if (valueUk) settings.mozart25PremiereTextUk = valueUk; if (valueFr) settings.mozart25PremiereTextFr = valueFr; }
      if (key === "mozart25_premiere_btn") { if (valueEn) settings.mozart25PremiereBtnEn = valueEn; if (valueUk) settings.mozart25PremiereBtnUk = valueUk; if (valueFr) settings.mozart25PremiereBtnFr = valueFr; }
      if (key === "carmen_premiere_title") { if (valueEn) settings.carmenPremiereTitleEn = valueEn; if (valueUk) settings.carmenPremiereTitleUk = valueUk; if (valueFr) settings.carmenPremiereTitleFr = valueFr; }
      if (key === "carmen_premiere_text") { if (valueEn) settings.carmenPremiereTextEn = valueEn; if (valueUk) settings.carmenPremiereTextUk = valueUk; if (valueFr) settings.carmenPremiereTextFr = valueFr; }
      if (key === "carmen_premiere_btn") { if (valueEn) settings.carmenPremiereBtnEn = valueEn; if (valueUk) settings.carmenPremiereBtnUk = valueUk; if (valueFr) settings.carmenPremiereBtnFr = valueFr; }
      // ── Mercy page ──
      if (key === "mercy_image" && valueEn) settings.mercyImage = valueEn;
      if (key === "mercy_hero_label") { if (valueEn) settings.mercyHeroLabelEn = valueEn; if (valueUk) settings.mercyHeroLabelUk = valueUk; if (valueFr) settings.mercyHeroLabelFr = valueFr; }
      if (key === "mercy_hero_subtitle") { if (valueEn) settings.mercyHeroSubtitleEn = valueEn; if (valueUk) settings.mercyHeroSubtitleUk = valueUk; if (valueFr) settings.mercyHeroSubtitleFr = valueFr; }
      if (key === "mercy_hero_tagline") { if (valueEn) settings.mercyHeroTaglineEn = valueEn; if (valueUk) settings.mercyHeroTaglineUk = valueUk; if (valueFr) settings.mercyHeroTaglineFr = valueFr; }
      if (key === "mercy_intro_title") { if (valueEn) settings.mercyIntroTitleEn = valueEn; if (valueUk) settings.mercyIntroTitleUk = valueUk; if (valueFr) settings.mercyIntroTitleFr = valueFr; }
      if (key === "mercy_intro_body") { if (valueEn) settings.mercyIntroBodyEn = valueEn; if (valueUk) settings.mercyIntroBodyUk = valueUk; if (valueFr) settings.mercyIntroBodyFr = valueFr; }
      if (key === "mercy_context_title") { if (valueEn) settings.mercyContextTitleEn = valueEn; if (valueUk) settings.mercyContextTitleUk = valueUk; if (valueFr) settings.mercyContextTitleFr = valueFr; }
      if (key === "mercy_context_body") { if (valueEn) settings.mercyContextBodyEn = valueEn; if (valueUk) settings.mercyContextBodyUk = valueUk; if (valueFr) settings.mercyContextBodyFr = valueFr; }
      if (key === "mercy_video_1" && valueEn) settings.mercyVideo1Id = valueEn;
      if (key === "mercy_video_1_caption") { if (valueEn) settings.mercyVideo1En = valueEn; if (valueUk) settings.mercyVideo1Uk = valueUk; if (valueFr) settings.mercyVideo1Fr = valueFr; }
      if (key === "mercy_cta_title") { if (valueEn) settings.mercyCtaTitleEn = valueEn; if (valueUk) settings.mercyCtaTitleUk = valueUk; if (valueFr) settings.mercyCtaTitleFr = valueFr; }
      if (key === "mercy_cta_text") { if (valueEn) settings.mercyCtaTextEn = valueEn; if (valueUk) settings.mercyCtaTextUk = valueUk; if (valueFr) settings.mercyCtaTextFr = valueFr; }
      if (key === "mercy_cta_btn") { if (valueEn) settings.mercyCtaBtnEn = valueEn; if (valueUk) settings.mercyCtaBtnUk = valueUk; if (valueFr) settings.mercyCtaBtnFr = valueFr; }
      // ── Humans page ──
      if (key === "humans_image" && valueEn) settings.humansImage = valueEn;
      if (key === "humans_hero_label") { if (valueEn) settings.humansHeroLabelEn = valueEn; if (valueUk) settings.humansHeroLabelUk = valueUk; if (valueFr) settings.humansHeroLabelFr = valueFr; }
      if (key === "humans_hero_subtitle") { if (valueEn) settings.humansHeroSubtitleEn = valueEn; if (valueUk) settings.humansHeroSubtitleUk = valueUk; if (valueFr) settings.humansHeroSubtitleFr = valueFr; }
      if (key === "humans_hero_tagline") { if (valueEn) settings.humansHeroTaglineEn = valueEn; if (valueUk) settings.humansHeroTaglineUk = valueUk; if (valueFr) settings.humansHeroTaglineFr = valueFr; }
      if (key === "humans_intro_title") { if (valueEn) settings.humansIntroTitleEn = valueEn; if (valueUk) settings.humansIntroTitleUk = valueUk; if (valueFr) settings.humansIntroTitleFr = valueFr; }
      if (key === "humans_intro_body") { if (valueEn) settings.humansIntroBodyEn = valueEn; if (valueUk) settings.humansIntroBodyUk = valueUk; if (valueFr) settings.humansIntroBodyFr = valueFr; }
      if (key === "humans_myth_title") { if (valueEn) settings.humansMythTitleEn = valueEn; if (valueUk) settings.humansMythTitleUk = valueUk; if (valueFr) settings.humansMythTitleFr = valueFr; }
      if (key === "humans_myth_body") { if (valueEn) settings.humansMythBodyEn = valueEn; if (valueUk) settings.humansMythBodyUk = valueUk; if (valueFr) settings.humansMythBodyFr = valueFr; }
      if (key === "humans_video_1" && valueEn) settings.humansVideo1Id = valueEn;
      if (key === "humans_video_1_caption") { if (valueEn) settings.humansVideo1En = valueEn; if (valueUk) settings.humansVideo1Uk = valueUk; if (valueFr) settings.humansVideo1Fr = valueFr; }
      if (key === "humans_cta_title") { if (valueEn) settings.humansCtaTitleEn = valueEn; if (valueUk) settings.humansCtaTitleUk = valueUk; if (valueFr) settings.humansCtaTitleFr = valueFr; }
      if (key === "humans_cta_text") { if (valueEn) settings.humansCtaTextEn = valueEn; if (valueUk) settings.humansCtaTextUk = valueUk; if (valueFr) settings.humansCtaTextFr = valueFr; }
      if (key === "humans_cta_btn") { if (valueEn) settings.humansCtaBtnEn = valueEn; if (valueUk) settings.humansCtaBtnUk = valueUk; if (valueFr) settings.humansCtaBtnFr = valueFr; }
    }

    return settings;
  } catch (err) {
    console.error("getSiteSettings error:", err);
    return DEFAULT_SETTINGS;
  }
}

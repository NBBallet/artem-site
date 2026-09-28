// Тексти сайту живуть у src/content/settings.json (з 28.09.2026).
// До того вони читались із Notion на кожен запит; Notion відключено, бо Артем
// там більше не править, а ~10 запитів на сторінку давали «порожні» поля при
// rate-limit (див. AGENTS.md). Правка — редактором на самому сайті (/edit).
import data from "@/content/settings.json";

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
  /** LITSO → Newspaper Birds section */
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
  aboutBioEn: string;
  aboutBioUk: string;
  aboutBioFr: string;
  aboutNbbEn: string;
  aboutNbbUk: string;
  aboutNbbFr: string;
  aboutCollabLabelEn: string;
  aboutCollabLabelUk: string;
  aboutCollabLabelFr: string;
  aboutCollabNamesEn: string;
  aboutCollabNamesUk: string;
  aboutCollabNamesFr: string;
  aboutCollabSubtitleEn: string;
  aboutCollabSubtitleUk: string;
  aboutCollabSubtitleFr: string;
  aboutCollabLeadEn: string;
  aboutCollabLeadUk: string;
  aboutCollabLeadFr: string;
  aboutCollabP1En: string;
  aboutCollabP1Uk: string;
  aboutCollabP1Fr: string;
  aboutCollabP2En: string;
  aboutCollabP2Uk: string;
  aboutCollabP2Fr: string;
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

export const DEFAULT_SETTINGS: SiteSettings = data as SiteSettings;

export async function getSiteSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS;
}

import type { Locale } from "./auth";

// --- User Profile ---

export type HeroBadge = "Legend Hero" | "Rising Hero" | "New Hero";

export interface UserProfile {
  id: string;
  full_name: string;
  department_code: string | null;
  department_name: string | null;
  star_count: number;
  hero_badge: HeroBadge | null;
  avatar_url: string | null;
}

// --- Kudo ---

export interface Kudo {
  id: string;
  sender: UserProfile;
  receiver: UserProfile;
  content: string;
  hashtag_category: string | null;
  hashtags: string[];
  images: string[];
  heart_count: number;
  is_hearted: boolean;
  created_at: string;
}

export type KudoHighlight = Kudo;

// --- Stats ---

export interface KudosStats {
  kudos_received: number;
  kudos_sent: number;
  hearts_received: number;
  secret_box_opened: number;
  secret_box_unopened: number;
}

// --- Secret Box ---

export interface SecretBox {
  id: string;
  is_opened: boolean;
  gift_description: string | null;
  opened_at: string | null;
}

// --- Top Sunner ---

export interface TopSunner {
  profile: UserProfile;
  gift_description: string;
}

// --- Spotlight ---

export interface SpotlightEntry {
  name: string;
  count: number;
}

// --- Department ---

export interface Department {
  code: string;
  name: string;
}

// --- API Response Types ---

export interface KudosFeedResponse {
  data: Kudo[];
  total: number;
  page: number;
  has_more: boolean;
}

export interface KudosHighlightsResponse {
  data: KudoHighlight[];
}

export interface SpotlightResponse {
  data: SpotlightEntry[];
  total_kudos: number;
}

export interface HeartToggleResponse {
  hearted: boolean;
  heart_count: number;
}

export interface TopReceiversResponse {
  data: TopSunner[];
}

export interface OpenSecretBoxResponse {
  success: boolean;
  gift_description: string;
}

export interface UserSearchResponse {
  data: UserProfile[];
}

// --- Translations ---

export interface KudosTranslations {
  // Hero
  heroTagline: string;
  actionBarPlaceholder: string;
  searchPlaceholder: string;
  // Section titles
  sectionSubtitle: string;
  highlightTitle: string;
  spotlightTitle: string;
  allKudosTitle: string;
  // Filters
  filterHashtag: string;
  filterDepartment: string;
  // Stats
  statKudosReceived: string;
  statKudosSent: string;
  statHeartsReceived: string;
  statSecretBoxOpened: string;
  statSecretBoxUnopened: string;
  openSecretBox: string;
  // Top Sunner
  topSunnerTitle: string;
  // Actions
  copyLink: string;
  viewDetail: string;
  // Toast
  linkCopied: string;
  // Pagination
  spotlightCount: string;
  // Edge cases
  noKudos: string;
  noData: string;
  retry: string;
  loadMore: string;
  // Secret Box modal
  secretBoxTitle: string;
  secretBoxInstruction: string;
  secretBoxUnopenedLabel: string;
  secretBoxError: string;
}

// --- Kudos Feed Filters ---

export interface KudosFeedFilters {
  hashtag?: string;
  department?: string;
  category?: string;
}

// --- Rules Modal ---

export interface BadgeTier {
  name: string;
  threshold: string;
  description: string;
}

export interface RulesTranslations {
  title: string;
  sectionReceiverTitle: string;
  sectionReceiverIntro: string;
  badgeTiers: BadgeTier[];
  sectionSenderTitle: string;
  sectionSenderIntro: string;
  sectionSenderSecretBox: string;
  iconBadgeNames: string[];
  sectionSenderCollect: string;
  sectionKudosQuocDanTitle: string;
  sectionKudosQuocDanBody: string;
  buttonClose: string;
  buttonWriteKudos: string;
}

export type RulesTranslationsByLocale = Record<Locale, RulesTranslations>;

// --- Write Kudo Modal ---

export interface WriteKudoFormData {
  receiver_id: string;
  danh_hieu: string;
  content: string;
  hashtags: string[];
  images: string[];
  is_anonymous: boolean;
}

export interface WriteKudoTranslations {
  title: string;
  labelReceiver: string;
  labelDanhHieu: string;
  labelHashtag: string;
  labelImage: string;
  placeholderSearch: string;
  placeholderDanhHieu: string;
  placeholderContent: string;
  helperDanhHieu: string;
  helperMention: string;
  communityStandards: string;
  maxHashtag: string;
  maxImage: string;
  checkboxAnonymous: string;
  buttonCancel: string;
  buttonSubmit: string;
  errorRequired: string;
  errorHashtagMin: string;
  successMessage: string;
  noResults: string;
}

export type WriteKudoTranslationsByLocale = Record<Locale, WriteKudoTranslations>;

// --- Locale helper ---

export type KudosTranslationsByLocale = Record<Locale, KudosTranslations>;

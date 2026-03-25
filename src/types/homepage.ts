export interface HomepageTranslations {
  // Navigation
  navAboutSaa: string;
  navAwardInfo: string;
  navSunKudos: string;
  navTieuChuan: string;
  // Hero
  comingSoon: string;
  days: string;
  hours: string;
  minutes: string;
  eventTimeLabel: string;
  eventTimeValue: string;
  eventVenueLabel: string;
  eventVenueValue: string;
  livestreamNote: string;
  aboutAwards: string;
  aboutKudos: string;
  // Awards
  awardsCaption: string;
  awardsTitle: string;
  detail: string;
  // Kudos
  kudosLabel: string;
  kudosTitle: string;
  kudosSubtitle: string;
  kudosDescription: string;
  // User menu
  menuProfile: string;
  menuSignOut: string;
  // Footer
  copyright: string;
}

export interface RootFurtherContent {
  paragraphs: string[];
  quote: string;
  quoteAttribution: string;
  paragraphsAfterQuote: string[];
}

export interface AwardItem {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface AwardDetailItem extends AwardItem {
  quantityDisplay: string;
  quantityUnit?: string;
  prizeValue: string;
  prizeNote?: string;
  secondPrizeValue?: string;
  secondPrizeNote?: string;
}

export interface AwardsPageTranslations {
  sectionSubtitle: string;
  sectionTitle: string;
  quantityLabel: string;
  prizeLabel: string;
  sidebarAriaLabel: string;
  orText: string;
  kudosLabel: string;
  kudosTitle: string;
  kudosDescription: string;
  kudosDetailButton: string;
}

import { cookies } from "next/headers";
import type { Locale, LoginTranslations } from "@/types/auth";
import type { KudosTranslations, KudosTranslationsByLocale, RulesTranslations, RulesTranslationsByLocale, WriteKudoTranslations, WriteKudoTranslationsByLocale } from "@/types/kudos";
import type {
  HomepageTranslations,
  RootFurtherContent,
  AwardItem,
  AwardDetailItem,
  AwardsPageTranslations,
} from "@/types/homepage";
import type { CountdownTranslations } from "@/types/countdown";
import type { FabTranslations } from "@/types/fab";

const loginTranslations: Record<Locale, LoginTranslations> = {
  vi: {
    heroDescription:
      "Bắt đầu hành trình của bạn cùng SAA 2025.\nĐăng nhập để khám phá!",
    loginButton: "ĐĂNG NHẬP với Google",
    copyright: "Bản quyền thuộc về Sun* © 2025",
    errorDefault: "Đã có lỗi xảy ra. Vui lòng thử lại.",
    errorDomain: "Chỉ tài khoản @sun-asterisk.com được phép truy cập.",
  },
  en: {
    heroDescription:
      "Start your journey with SAA 2025.\nLogin to explore!",
    loginButton: "LOGIN With Google",
    copyright: "Copyright belongs to Sun* © 2025",
    errorDefault: "An error occurred. Please try again.",
    errorDomain: "Only @sun-asterisk.com accounts are allowed.",
  },
};

const homepageTranslations: Record<Locale, HomepageTranslations> = {
  vi: {
    navAboutSaa: "Về SAA 2025",
    navAwardInfo: "Thông tin giải thưởng",
    navSunKudos: "Sun* Kudos",
    navTieuChuan: "Tiêu chuẩn chung",
    comingSoon: "Sắp diễn ra",
    days: "NGÀY",
    hours: "GIỜ",
    minutes: "PHÚT",
    eventTimeLabel: "Thời gian:",
    eventTimeValue: "26/12/2025",
    eventVenueLabel: "Địa điểm:",
    eventVenueValue: "Âu Cơ Art Center",
    livestreamNote: "Tường thuật trực tiếp qua sóng Livestream",
    aboutAwards: "VỀ GIẢI THƯỞNG",
    aboutKudos: "VỀ KUDOS",
    awardsCaption: "Sun* annual awards 2025",
    awardsTitle: "Hệ thống giải thưởng",
    detail: "Chi tiết",
    kudosLabel: "Phong trào ghi nhận",
    kudosTitle: "Sun* Kudos",
    kudosSubtitle: "ĐIỂM MỚI CỦA SAA 2025",
    kudosDescription:
      "Hoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được diễn ra dành cho tất cả Sunner. Hoạt động sẽ được triển khai vào tháng 11/2025, khuyến khích người Sun* chia sẻ những lời ghi nhận, cảm ơn đồng nghiệp trên hệ thống do BTC công bố. Đây sẽ là chất liệu để Hội đồng Heads tham khảo trong quá trình lựa chọn người đạt giải.",
    menuProfile: "Trang cá nhân",
    menuSignOut: "Đăng xuất",
    copyright: "Bản quyền thuộc về Sun* © 2025",
  },
  en: {
    navAboutSaa: "About SAA 2025",
    navAwardInfo: "Award Information",
    navSunKudos: "Sun* Kudos",
    navTieuChuan: "General Standards",
    comingSoon: "Coming soon",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    eventTimeLabel: "Time:",
    eventTimeValue: "26/12/2025",
    eventVenueLabel: "Venue:",
    eventVenueValue: "Âu Cơ Art Center",
    livestreamNote: "Live broadcast via Livestream",
    aboutAwards: "ABOUT AWARDS",
    aboutKudos: "ABOUT KUDOS",
    awardsCaption: "Sun* annual awards 2025",
    awardsTitle: "Award Categories",
    detail: "Details",
    kudosLabel: "Recognition Movement",
    kudosTitle: "Sun* Kudos",
    kudosSubtitle: "NEW IN SAA 2025",
    kudosDescription:
      "A recognition and appreciation activity for colleagues - held for the first time for all Sunners. The activity will be launched in November 2025, encouraging Sun* members to share words of recognition and thanks to colleagues on the system announced by the organizing committee. This will serve as material for the Heads Council to reference in the award selection process.",
    menuProfile: "Profile",
    menuSignOut: "Sign out",
    copyright: "Copyright belongs to Sun* © 2025",
  },
};

const rootFurtherContent: Record<Locale, RootFurtherContent> = {
  vi: {
    paragraphs: [
      "Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu ngày càng cao từ khách hàng, Sun* lựa chọn chiến lược đa dạng hóa năng lực để không chỉ nỗ lực trở thành tinh anh trong lĩnh vực của mình, mà còn hướng đến một cái đích cao hơn, nơi mọi Sunner đều là \"problem-solver\" - chuyên gia trong việc giải quyết mọi vấn đề, tìm lời giải cho mọi bài toán của dự án, khách hàng và xã hội.",
      "Lấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt cùng tinh thần đào sâu để bứt phá trong kỷ nguyên AI, \"Root Further\" đã được chọn để trở thành chủ đề chính thức của Lễ trao giải Sun* Annual Awards 2025.",
      "Vượt ra khỏi nét nghĩa bề mặt, \"Root Further\" chính là hành trình chúng ta không ngừng vươn xa hơn, cắm rễ mạnh hơn, chạm đến những tầng \"địa chất\" ẩn sâu để tiếp tục tồn tại, vươn lên và nuôi dưỡng đam mê kiến tạo giá trị luôn cháy bỏng của người Sun*. Mượn hình ảnh bộ rễ liên tục đâm sâu vào lòng đất, mạnh mẽ len lỏi qua từng lớp \"trầm tích\" để thẩm thấu những gì tinh tuý nhất, người Sun* cũng đang \"hấp thụ\" dưỡng chất từ thời đại và những thử thách của thị trường để làm mới mình mỗi ngày, mở rộng năng lực và mạnh mẽ \"bén rễ\" vào kỷ nguyên AI - một tầng \"địa chất\" hoàn toàn mới, phức tạp và khó đoán, nhưng cũng hội tụ vô vàn tiềm năng cùng cơ hội.",
    ],
    quote: "\u201CCây sâu bén rễ, bão giông chẳng nề\u201D",
    quoteAttribution:
      "(Ngạn ngữ Anh — A tree with deep roots fears no storm)",
    paragraphsAfterQuote: [
      "Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ vững. Một tổ chức với những cá nhân tự tin vào năng lực đa dạng, sẵn sàng kiến tạo và đón nhận thử thách, làm chủ sự thay đổi là tổ chức không chỉ vững vàng trước biến động, mà còn khai thác được mọi lợi thế, chinh phục các thách thức của thời cuộc. Không đơn thuần là tên gọi của chương mới trên hành trình phát triển tổ chức, \"Root Further\" còn như một lời cổ vũ, động viên mỗi chúng ta hãy dám tin vào bản thân, dám đào sâu, khai mở mọi tiềm năng, dám phá bỏ giới hạn, dám trở thành phiên bản đa nhiệm và xuất sắc nhất của mình. Bởi trong thời đại AI, đa dạng năng lực và tận dụng sức mạnh thời cuộc chính là điều kiện tiên quyết để trường tồn.",
      "Không ai biết trước ẩn sâu trong \"lòng đất\" của ngành công nghệ và thị trường hiện đại còn biết bao tầng \"địa chất\" bí ẩn. Chỉ biết rằng khi \"Root Further\" đã trở thành tinh thần cội rễ, chúng ta sẽ không sợ hãi, mà càng thấy háo hức trước bất cứ vùng vô định nào trên hành trình tiến về phía trước. Vì ta luôn tin rằng, trong chính những miền vô tận đó, là bao điều kỳ diệu và cơ hội vươn mình đang chờ ta.",
    ],
  },
  en: {
    paragraphs: [
      "Facing the rapid changes of the AI era and increasingly high demands from clients, Sun* has chosen a strategy of diversifying capabilities — not only striving to become elite in its field, but also aiming for a higher goal where every Sunner is a \"problem-solver\" — an expert in solving all challenges, finding solutions for every project, client, and societal need.",
      "Inspired by the diversity of capabilities, flexible development potential, and the spirit of digging deep to break through in the AI era, \"Root Further\" was chosen as the official theme of the Sun* Annual Awards 2025 ceremony.",
      "Beyond its surface meaning, \"Root Further\" is our journey of constantly reaching further, rooting deeper, touching the hidden \"geological layers\" to continue existing, rising up, and nurturing the ever-burning passion for value creation of Sun* people. Borrowing the image of roots continuously plunging deep into the earth, powerfully weaving through layers of \"sediment\" to absorb the finest essence, Sun* people are also \"absorbing\" nourishment from the era and market challenges to renew themselves daily, expanding capabilities and boldly \"taking root\" in the AI era — an entirely new, complex and unpredictable \"geological layer,\" yet one that converges boundless potential and opportunities.",
    ],
    quote: "\u201CA tree with deep roots fears no storm\u201D",
    quoteAttribution: "(English proverb)",
    paragraphsAfterQuote: [
      "Before storms, only trees with strong enough roots can stand firm. An organization with individuals confident in diverse capabilities, ready to create and embrace challenges, mastering change — is an organization that not only stands firm amid turbulence, but also leverages every advantage to conquer the challenges of the times. More than just the name of a new chapter in the organization's development journey, \"Root Further\" is also a word of encouragement, motivating each of us to dare to believe in ourselves, dare to dig deep, unlock all potential, dare to break limits, dare to become the most versatile and excellent version of ourselves. Because in the AI era, diversifying capabilities and harnessing the power of the times is the prerequisite for endurance.",
      "No one knows what lies deep in the \"underground\" of the modern technology industry and market — how many mysterious \"geological layers\" remain. We only know that when \"Root Further\" has become a rooted spirit, we will not be afraid, but rather feel excited before any uncharted territory on the journey ahead. Because we always believe that within those infinite frontiers lie wondrous things and opportunities for growth waiting for us.",
    ],
  },
};

const awardItems: Record<Locale, AwardItem[]> = {
  vi: [
    {
      slug: "top-talent",
      title: "Top Talent",
      description:
        "Vinh danh những cá nhân xuất sắc nhất, có đóng góp nổi bật cho sự phát triển của Sun*.",
      image: "/images/homepage/awards/top-talent.png",
    },
    {
      slug: "top-project",
      title: "Top Project",
      description:
        "Ghi nhận những dự án tiêu biểu mang lại giá trị vượt trội cho khách hàng và công ty.",
      image: "/images/homepage/awards/top-project.png",
    },
    {
      slug: "top-project-leader",
      title: "Top Project Leader",
      description:
        "Tôn vinh những người dẫn dắt dự án xuất sắc, truyền cảm hứng cho đội nhóm.",
      image: "/images/homepage/awards/top-project-leader.png",
    },
    {
      slug: "best-manager",
      title: "Best Manager",
      description:
        "Vinh danh những nhà quản lý tài năng, tạo môi trường làm việc tích cực và hiệu quả.",
      image: "/images/homepage/awards/best-manager.png",
    },
    {
      slug: "signature-creator",
      title: "Signature 2025 - Creator",
      description:
        "Ghi nhận những sáng tạo độc đáo, mang dấu ấn riêng và tạo giá trị khác biệt.",
      image: "/images/homepage/awards/signature-creator.png",
    },
    {
      slug: "mvp",
      title: "MVP (Most Valuable Person)",
      description:
        "Tôn vinh cá nhân có giá trị nhất, người tạo ra ảnh hưởng lớn nhất trong năm.",
      image: "/images/homepage/awards/mvp.png",
    },
  ],
  en: [
    {
      slug: "top-talent",
      title: "Top Talent",
      description:
        "Honoring outstanding individuals with remarkable contributions to Sun*'s growth.",
      image: "/images/homepage/awards/top-talent.png",
    },
    {
      slug: "top-project",
      title: "Top Project",
      description:
        "Recognizing exemplary projects that deliver exceptional value to clients and the company.",
      image: "/images/homepage/awards/top-project.png",
    },
    {
      slug: "top-project-leader",
      title: "Top Project Leader",
      description:
        "Celebrating outstanding project leaders who inspire and drive their teams.",
      image: "/images/homepage/awards/top-project-leader.png",
    },
    {
      slug: "best-manager",
      title: "Best Manager",
      description:
        "Honoring talented managers who create positive and effective work environments.",
      image: "/images/homepage/awards/best-manager.png",
    },
    {
      slug: "signature-creator",
      title: "Signature 2025 - Creator",
      description:
        "Recognizing unique creations that bear a distinctive mark and deliver differentiated value.",
      image: "/images/homepage/awards/signature-creator.png",
    },
    {
      slug: "mvp",
      title: "MVP (Most Valuable Person)",
      description:
        "Celebrating the most valuable individual with the greatest impact of the year.",
      image: "/images/homepage/awards/mvp.png",
    },
  ],
};

const awardDetailItems: Record<Locale, AwardDetailItem[]> = {
  vi: [
    {
      slug: "top-talent",
      title: "Top Talent",
      description:
        "Vinh danh những cá nhân xuất sắc nhất, có đóng góp nổi bật cho sự phát triển của Sun*. Giải thưởng dành cho những người luôn nỗ lực không ngừng, thể hiện năng lực chuyên môn vượt trội và tinh thần cống hiến hết mình.",
      image: "/images/homepage/awards/top-talent.png",
      quantityDisplay: "10",
      quantityUnit: "Cá nhân",
      prizeValue: "7.000.000 VNĐ",
      prizeNote: "cho mỗi giải thưởng",
    },
    {
      slug: "top-project",
      title: "Top Project",
      description:
        "Ghi nhận những dự án tiêu biểu mang lại giá trị vượt trội cho khách hàng và công ty. Giải thưởng tôn vinh sự phối hợp nhịp nhàng, sáng tạo trong giải pháp và cam kết chất lượng của cả đội ngũ.",
      image: "/images/homepage/awards/top-project.png",
      quantityDisplay: "02",
      quantityUnit: "Tập thể",
      prizeValue: "15.000.000 VNĐ",
      prizeNote: "cho mỗi giải thưởng",
    },
    {
      slug: "top-project-leader",
      title: "Top Project Leader",
      description:
        "Tôn vinh những người dẫn dắt dự án xuất sắc, truyền cảm hứng cho đội nhóm. Những leader không chỉ đảm bảo tiến độ và chất lượng mà còn tạo động lực phát triển cho từng thành viên.",
      image: "/images/homepage/awards/top-project-leader.png",
      quantityDisplay: "03",
      quantityUnit: "Cá nhân",
      prizeValue: "7.000.000 VNĐ",
      prizeNote: "cho mỗi giải thưởng",
    },
    {
      slug: "best-manager",
      title: "Best Manager",
      description:
        "Vinh danh những nhà quản lý tài năng, tạo môi trường làm việc tích cực và hiệu quả. Người quản lý xuất sắc không chỉ đạt mục tiêu kinh doanh mà còn phát triển con người và xây dựng văn hóa đội nhóm.",
      image: "/images/homepage/awards/best-manager.png",
      quantityDisplay: "01",
      quantityUnit: "Cá nhân",
      prizeValue: "10.000.000 VNĐ",
    },
    {
      slug: "signature-creator",
      title: "Signature 2025 - Creator",
      description:
        "Ghi nhận những sáng tạo độc đáo, mang dấu ấn riêng và tạo giá trị khác biệt. Giải thưởng dành cho cá nhân hoặc nhóm có sản phẩm, ý tưởng mang tính đột phá trong năm.",
      image: "/images/homepage/awards/signature-creator.png",
      quantityDisplay: "01",
      quantityUnit: "Cá nhân hoặc tập thể",
      prizeValue: "5.000.000 VNĐ",
      prizeNote: "cho giải cá nhân",
      secondPrizeValue: "8.000.000 VNĐ",
      secondPrizeNote: "cho giải tập thể",
    },
    {
      slug: "mvp",
      title: "MVP (Most Valuable Person)",
      description:
        "Tôn vinh cá nhân có giá trị nhất, người tạo ra ảnh hưởng lớn nhất trong năm. Giải thưởng cao quý nhất của SAA dành cho người có đóng góp toàn diện và xuất sắc nhất.",
      image: "/images/homepage/awards/mvp.png",
      quantityDisplay: "01",
      prizeValue: "15.000.000 VNĐ",
    },
  ],
  en: [
    {
      slug: "top-talent",
      title: "Top Talent",
      description:
        "Honoring outstanding individuals with remarkable contributions to Sun*'s growth. This award recognizes those who consistently demonstrate exceptional expertise and wholehearted dedication.",
      image: "/images/homepage/awards/top-talent.png",
      quantityDisplay: "10",
      quantityUnit: "Individual",
      prizeValue: "7.000.000 VNĐ",
      prizeNote: "per award",
    },
    {
      slug: "top-project",
      title: "Top Project",
      description:
        "Recognizing exemplary projects that deliver exceptional value to clients and the company. This award celebrates seamless collaboration, creative solutions, and the team's commitment to quality.",
      image: "/images/homepage/awards/top-project.png",
      quantityDisplay: "02",
      quantityUnit: "Team",
      prizeValue: "15.000.000 VNĐ",
      prizeNote: "per award",
    },
    {
      slug: "top-project-leader",
      title: "Top Project Leader",
      description:
        "Celebrating outstanding project leaders who inspire and drive their teams. Leaders who not only ensure progress and quality but also motivate the development of each team member.",
      image: "/images/homepage/awards/top-project-leader.png",
      quantityDisplay: "03",
      quantityUnit: "Individual",
      prizeValue: "7.000.000 VNĐ",
      prizeNote: "per award",
    },
    {
      slug: "best-manager",
      title: "Best Manager",
      description:
        "Honoring talented managers who create positive and effective work environments. An outstanding manager not only achieves business goals but also develops people and builds team culture.",
      image: "/images/homepage/awards/best-manager.png",
      quantityDisplay: "01",
      quantityUnit: "Individual",
      prizeValue: "10.000.000 VNĐ",
    },
    {
      slug: "signature-creator",
      title: "Signature 2025 - Creator",
      description:
        "Recognizing unique creations that bear a distinctive mark and deliver differentiated value. This award is for individuals or teams with breakthrough products or ideas of the year.",
      image: "/images/homepage/awards/signature-creator.png",
      quantityDisplay: "01",
      quantityUnit: "Individual or Team",
      prizeValue: "5.000.000 VNĐ",
      prizeNote: "for individual award",
      secondPrizeValue: "8.000.000 VNĐ",
      secondPrizeNote: "for team award",
    },
    {
      slug: "mvp",
      title: "MVP (Most Valuable Person)",
      description:
        "Celebrating the most valuable individual with the greatest impact of the year. The highest honor of SAA for the person with the most comprehensive and outstanding contributions.",
      image: "/images/homepage/awards/mvp.png",
      quantityDisplay: "01",
      prizeValue: "15.000.000 VNĐ",
    },
  ],
};

const awardsPageTranslations: Record<Locale, AwardsPageTranslations> = {
  vi: {
    sectionSubtitle: "Sun* Annual Awards 2025",
    sectionTitle: "Hệ thống giải thưởng SAA 2025",
    quantityLabel: "Số lượng giải thưởng:",
    prizeLabel: "Giá trị giải thưởng:",
    sidebarAriaLabel: "Danh mục giải thưởng",
    orText: "Hoặc",
    kudosLabel: "Phong trào ghi nhận",
    kudosTitle: "Sun* Kudos",
    kudosDescription:
      "Sun* Kudos là chiến dịch ghi nhận những đóng góp thầm lặng nhưng ý nghĩa của các thành viên Sun*. Hãy gửi lời cảm ơn đến đồng nghiệp của bạn!",
    kudosDetailButton: "Chi tiết",
  },
  en: {
    sectionSubtitle: "Sun* Annual Awards 2025",
    sectionTitle: "SAA 2025 Award System",
    quantityLabel: "Number of awards:",
    prizeLabel: "Prize value:",
    sidebarAriaLabel: "Award categories",
    orText: "Or",
    kudosLabel: "Recognition Movement",
    kudosTitle: "Sun* Kudos",
    kudosDescription:
      "Sun* Kudos is a campaign recognizing the quiet but meaningful contributions of Sun* members. Send your appreciation to your colleagues!",
    kudosDetailButton: "Details",
  },
};

const fabTranslations: Record<Locale, FabTranslations> = {
  vi: {
    theLe: "Thể lệ",
    vietKudos: "Viết KUDOS",
    ariaLabel: "Mở menu hành động nhanh",
    closeLabel: "Đóng",
  },
  en: {
    theLe: "Rules",
    vietKudos: "Write KUDOS",
    ariaLabel: "Open quick actions menu",
    closeLabel: "Close",
  },
};

const countdownTranslations: Record<Locale, CountdownTranslations> = {
  vi: {
    heading: "Sự kiện sẽ bắt đầu sau",
    daysLabel: "NGÀY",
    hoursLabel: "GIỜ",
    minutesLabel: "PHÚT",
  },
  en: {
    heading: "The event starts in",
    daysLabel: "DAYS",
    hoursLabel: "HOURS",
    minutesLabel: "MINUTES",
  },
};

export function getCountdownTranslations(
  locale: Locale
): CountdownTranslations {
  return countdownTranslations[locale];
}

export function getTranslations(locale: Locale): LoginTranslations {
  return loginTranslations[locale];
}

export function getHomepageTranslations(locale: Locale): HomepageTranslations {
  return homepageTranslations[locale];
}

export function getAwardItems(locale: Locale): AwardItem[] {
  return awardItems[locale];
}

export function getRootFurtherContent(locale: Locale): RootFurtherContent {
  return rootFurtherContent[locale];
}

export function getAwardDetailItems(locale: Locale): AwardDetailItem[] {
  return awardDetailItems[locale];
}

export function getAwardsPageTranslations(
  locale: Locale
): AwardsPageTranslations {
  return awardsPageTranslations[locale];
}

export function getFabTranslations(locale: Locale): FabTranslations {
  return fabTranslations[locale];
}

const kudosTranslations: KudosTranslationsByLocale = {
  vi: {
    heroTagline: "Hệ thống ghi nhận và cảm ơn",
    actionBarPlaceholder: "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?",
    searchPlaceholder: "Tìm kiếm profile Sunner",
    sectionSubtitle: "Sun* Annual Awards 2025",
    highlightTitle: "KUDOS NỔI BẬT",
    spotlightTitle: "BẢNG VINH DANH",
    allKudosTitle: "TẤT CẢ KUDOS",
    filterHashtag: "Hashtag",
    filterDepartment: "Phòng ban",
    statKudosReceived: "Số Kudos bạn nhận được:",
    statKudosSent: "Số Kudos bạn đã gửi:",
    statHeartsReceived: "Số tim bạn nhận được:",
    statSecretBoxOpened: "Số Secret Box bạn đã mở:",
    statSecretBoxUnopened: "Số Secret Box chưa mở:",
    openSecretBox: "Mở Secret Box",
    topSunnerTitle: "10 SUNNER NHẬN QUÀ\nMỚI NHẤT",
    copyLink: "Sao chép",
    viewDetail: "Xem chi tiết",
    linkCopied: "Đã sao chép liên kết!",
    spotlightCount: "KUDOS",
    noKudos: "Chưa có kudos nào",
    noData: "Chưa có dữ liệu",
    retry: "Thử lại",
    loadMore: "Xem thêm",
    secretBoxTitle: "KHÁM PHÁ SECRET BOX CỦA BẠN",
    secretBoxInstruction: "Click vào box để mở",
    secretBoxUnopenedLabel: "Secretbox chưa mở",
    secretBoxError: "Không thể mở secret box. Vui lòng thử lại.",
  },
  en: {
    heroTagline: "Recognition & Appreciation System",
    actionBarPlaceholder: "Who would you like to send kudos to today?",
    searchPlaceholder: "Search Sunner profile",
    sectionSubtitle: "Sun* Annual Awards 2025",
    highlightTitle: "HIGHLIGHT KUDOS",
    spotlightTitle: "SPOTLIGHT BOARD",
    allKudosTitle: "ALL KUDOS",
    filterHashtag: "Hashtag",
    filterDepartment: "Department",
    statKudosReceived: "Kudos received:",
    statKudosSent: "Kudos sent:",
    statHeartsReceived: "Hearts received:",
    statSecretBoxOpened: "Secret Box opened:",
    statSecretBoxUnopened: "Secret Box unopened:",
    openSecretBox: "Open Secret Box",
    topSunnerTitle: "10 SUNNER RECEIVED\nGIFTS RECENTLY",
    copyLink: "Copy Link",
    viewDetail: "View detail",
    linkCopied: "Link copied — ready to share!",
    spotlightCount: "KUDOS",
    noKudos: "No kudos yet",
    noData: "No data available",
    retry: "Retry",
    loadMore: "Load more",
    secretBoxTitle: "DISCOVER YOUR SECRET BOX",
    secretBoxInstruction: "Click the box to open",
    secretBoxUnopenedLabel: "Unopened Secretbox",
    secretBoxError: "Failed to open secret box. Please try again.",
  },
};

export function getKudosTranslations(locale: Locale): KudosTranslations {
  return kudosTranslations[locale];
}

const rulesTranslations: RulesTranslationsByLocale = {
  vi: {
    title: "Thể lệ",
    sectionReceiverTitle: "NGƯỜI NHẬN KUDOS: HUY HIỆU HERO CHO NHỮNG ẢNH HƯỞNG TÍCH CỰC",
    sectionReceiverIntro: "Dựa trên số lượng đồng đội gửi trao Kudos, bạn sẽ sở hữu Huy hiệu Hero tương ứng, được hiển thị trực tiếp cạnh tên profile",
    badgeTiers: [
      { name: "New Hero", threshold: "Có 1-4 người gửi Kudos cho bạn", description: "Hành trình lan tỏa điều tốt đẹp bắt đầu – những lời cảm ơn và ghi nhận đầu tiên đã tìm đến bạn." },
      { name: "Rising Hero", threshold: "Có 5-9 người gửi Kudos cho bạn", description: "Hình ảnh bạn đang lớn dần trong trái tim đồng đội bằng sự tử tế và cống hiến của mình." },
      { name: "Super Hero", threshold: "Có 10–20 người gửi Kudos cho bạn", description: "Bạn đã trở thành biểu tượng được tin tưởng và yêu quý, người luôn sẵn sàng hỗ trợ và được nhiều đồng đội nhớ đến." },
      { name: "Legend Hero", threshold: "Có hơn 20 người gửi Kudos cho bạn", description: "Bạn đã trở thành huyền thoại – người để lại dấu ấn khó quên trong tập thể bằng trái tim và hành động của mình." },
    ],
    sectionSenderTitle: "NGƯỜI GỬI KUDOS: SƯU TẬP TRỌN BỘ 6 ICON, NHẬN NGAY PHẦN QUÀ BÍ ẨN",
    sectionSenderIntro: "Mỗi lời Kudos bạn gửi sẽ được đăng tải trên hệ thống và nhận về những lượt ❤️ từ cộng đồng Sunner. Cứ mỗi 5 lượt ❤️, bạn sẽ được mở 1 Secret Box, với cơ hội nhận về một trong 6 icon độc quyền của SAA.",
    sectionSenderSecretBox: "",
    iconBadgeNames: ["REVIVAL", "TOUCH OF LIGHT", "STAY GOLD", "FLOW TO HORIZON", "BEYOND THE BOUNDARY", "ROOT FURTHER"],
    sectionSenderCollect: "Những Sunner thu thập trọn bộ 6 icon sẽ nhận về một phần quà bí ẩn từ SAA 2025.",
    sectionKudosQuocDanTitle: "KUDOS QUỐC DÂN",
    sectionKudosQuocDanBody: "5 Kudos nhận về nhiều ❤️ nhất toàn Sun* sẽ chính thức trở thành Kudos Quốc Dân và được trao phần quà đặc biệt từ SAA 2025: Root Further.",
    buttonClose: "Đóng",
    buttonWriteKudos: "Viết KUDOS",
  },
  en: {
    title: "Rules",
    sectionReceiverTitle: "KUDOS RECIPIENTS: HERO BADGES FOR POSITIVE IMPACT",
    sectionReceiverIntro: "Based on the number of colleagues who send you Kudos, you will earn a corresponding Hero Badge displayed next to your profile name",
    badgeTiers: [
      { name: "New Hero", threshold: "1-4 people sent you Kudos", description: "Your journey of spreading goodness begins – the first words of appreciation have found you." },
      { name: "Rising Hero", threshold: "5-9 people sent you Kudos", description: "Your image is growing in the hearts of your teammates through your kindness and dedication." },
      { name: "Super Hero", threshold: "10-20 people sent you Kudos", description: "You have become a symbol of trust and love, always ready to support and remembered by many teammates." },
      { name: "Legend Hero", threshold: "More than 20 people sent you Kudos", description: "You have become a legend – leaving an unforgettable mark through your heart and actions." },
    ],
    sectionSenderTitle: "KUDOS SENDERS: COLLECT ALL 6 ICONS, GET A MYSTERY GIFT",
    sectionSenderIntro: "Every Kudos you send will be posted on the system and receive ❤️ from the Sunner community. For every 5 ❤️, you can open 1 Secret Box with a chance to receive one of 6 exclusive SAA icons.",
    sectionSenderSecretBox: "",
    iconBadgeNames: ["REVIVAL", "TOUCH OF LIGHT", "STAY GOLD", "FLOW TO HORIZON", "BEYOND THE BOUNDARY", "ROOT FURTHER"],
    sectionSenderCollect: "Sunners who collect all 6 icons will receive a mystery gift from SAA 2025.",
    sectionKudosQuocDanTitle: "NATIONAL KUDOS",
    sectionKudosQuocDanBody: "The 5 Kudos with the most ❤️ across all of Sun* will officially become National Kudos and receive a special gift from SAA 2025: Root Further.",
    buttonClose: "Close",
    buttonWriteKudos: "Write KUDOS",
  },
};

export function getRulesTranslations(locale: Locale): RulesTranslations {
  return rulesTranslations[locale];
}

const writeKudoTranslations: WriteKudoTranslationsByLocale = {
  vi: {
    title: "Gửi lời cám ơn và ghi nhận đến đồng đội",
    labelReceiver: "Người nhận",
    labelDanhHieu: "Danh hiệu",
    labelHashtag: "Hashtag",
    labelImage: "Hình ảnh",
    placeholderSearch: "Tìm kiếm",
    placeholderDanhHieu: "Dành tặng một danh hiệu cho đồng đội",
    placeholderContent: "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!",
    helperDanhHieu: "Ví dụ: Người truyền động lực cho tôi.\nDanh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn.",
    helperMention: "Bạn có thể \"@ + tên\" để nhắc tới đồng nghiệp khác",
    communityStandards: "Tiêu chuẩn cộng đồng",
    maxHashtag: "Tối đa 5",
    maxImage: "Tối đa 5",
    checkboxAnonymous: "Gửi lời cám ơn và ghi nhận ẩn danh",
    buttonCancel: "Hủy",
    buttonSubmit: "Gửi",
    errorRequired: "Trường này bắt buộc",
    errorHashtagMin: "Chọn ít nhất 1 hashtag",
    successMessage: "Gửi Kudos thành công!",
    noResults: "Không tìm thấy",
  },
  en: {
    title: "Send appreciation and recognition to your teammate",
    labelReceiver: "Recipient",
    labelDanhHieu: "Title",
    labelHashtag: "Hashtag",
    labelImage: "Image",
    placeholderSearch: "Search",
    placeholderDanhHieu: "Give a title to your teammate",
    placeholderContent: "Write your appreciation and recognition here!",
    helperDanhHieu: "Example: The one who motivates me.\nThis title will be displayed as your Kudos headline.",
    helperMention: "You can use \"@ + name\" to mention a colleague",
    communityStandards: "Community Standards",
    maxHashtag: "Max 5",
    maxImage: "Max 5",
    checkboxAnonymous: "Send appreciation and recognition anonymously",
    buttonCancel: "Cancel",
    buttonSubmit: "Send",
    errorRequired: "This field is required",
    errorHashtagMin: "Select at least 1 hashtag",
    successMessage: "Kudos sent successfully!",
    noResults: "No results found",
  },
};

export function getWriteKudoTranslations(locale: Locale): WriteKudoTranslations {
  return writeKudoTranslations[locale];
}

export async function getLocaleFromCookie(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  if (locale === "en" || locale === "vi") {
    return locale;
  }
  return "vi";
}

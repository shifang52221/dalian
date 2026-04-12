import type { Locale } from "../../lib/i18n";
import type { SiteSettingsView } from "../../types/content";
import type { ImageAsset } from "../image-manifest";
import { getSiteCopy } from "../site-copy";

export interface HomeContent {
  siteSettings: SiteSettingsView;
  hero: {
    eyebrow: string;
    title: string;
    titleLines?: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: string[];
    stats: Array<{ value: string; label: string }>;
    image?: ImageAsset;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    badge: { value: string; label: string };
    stats: Array<{ value: string; label: string }>;
    image?: ImageAsset;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
      previewGroup?: string;
      image?: ImageAsset;
    }>;
  };
  advantages: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  projects: {
    eyebrow: string;
    title: string;
    categories: Array<{
      title: string;
      description: string;
      tags: string[];
      image?: ImageAsset;
    }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Array<{ name: string; role: string; quote: string }>;
  };
  news: {
    eyebrow: string;
    title: string;
    items: Array<{ slug?: string; title: string; summary: string; meta: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    details: Array<{ label: string; value: string }>;
    formLabels: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
    };
  };
}

const homeContent: Record<Locale, HomeContent> = {
  zh: {
    hero: {
      eyebrow: "钢铁行业辊道设备与表面工程",
      title: "面向连铸连轧场景的制造与表面强化解决方案",
      titleLines: ["面向连铸连轧场景的制造", "与表面强化解决方案"],
      description:
        "大连博恒新技术有限公司专注连铸、连轧、冷轧等成套辊道设备及备品备件制造，具备堆焊、喷焊、等离子堆焊等核心表面工程能力。",
      primaryCta: "联系我们",
      secondaryCta: "查看产品业绩",
      highlights: ["连铸设备", "连轧设备", "冷轧设备", "表面强化"],
      stats: [
        { value: "15吨", label: "埋弧堆焊设备" },
        { value: "3吨", label: "明弧堆焊设备" },
        { value: "3吨", label: "埋弧堆焊设备" },
      ],
    },
    about: {
      eyebrow: "公司简介",
      title: "以质量、严谨与诚信服务国内外钢铁客户",
      description:
        "公司坐落于大连，长期面向钢铁行业提供辊道设备、备件以及表面强化技术服务，并与大连理工大学持续合作研发新工艺。",
      points: [
        "专注连铸、连轧、冷轧成套辊道设备与备件制造",
        "拥有堆焊、喷焊、等离子堆焊等表面强化核心技术",
        "可按图制造，也可结合现场工况进行涂层设计",
        "持续聚焦关键损耗件寿命提升与制造成本优化",
      ],
      badge: { value: "15T", label: "埋弧堆焊最大承重" },
      stats: [
        { value: "4000-5000", label: "堆焊年产能力" },
        { value: "800-1000", label: "喷焊年产能力" },
      ],
    },
    capabilities: {
      eyebrow: "核心能力",
      title: "覆盖制造、热处理、装配与检测的完整工艺能力",
      items: [
        {
          title: "埋弧堆焊",
          description: "适用于关键辊类部件修复与新制，承重能力高，工艺稳定。",
        },
        {
          title: "明弧堆焊",
          description: "适合宽边足辊、窄边足辊等部件，满足多种硬度区间需求。",
        },
        {
          title: "等离子堆焊",
          description: "用于高附着力、高耐磨场景，面向特殊损耗件寿命提升。",
        },
        {
          title: "火焰喷焊",
          description: "可用于耐磨层构建和表面修复，提升部件服役周期。",
        },
        {
          title: "热处理与装配",
          description: "配套热处理、喷丸、装配等环节，保证整体交付一致性。",
        },
        {
          title: "质量检测",
          description: "涵盖调质硬度检测、堆焊 PT 检测等品质控制流程。",
        },
      ],
    },
    advantages: {
      eyebrow: "为什么选择我们",
      title: "更贴近钢铁装备场景的工艺、研发与交付能力",
      items: [
        {
          title: "工艺经验",
          description: "针对连铸、连轧、冷轧等多种工况积累了丰富材料和工艺应用经验。",
        },
        {
          title: "合作研发",
          description: "长期与大连理工大学合作研发相关新技术的工程化应用。",
        },
        {
          title: "质量稳定",
          description: "具备较完备的制造、热处理、装配与检测流程，保证交付稳定性。",
        },
        {
          title: "面向全球客户",
          description: "服务国内外钢铁企业与装备厂商，可支持新制、修复和工况改进。",
        },
      ],
    },
    projects: {
      eyebrow: "产品业绩",
      title: "连铸、连轧与其他特种产品的典型应用",
      categories: [
        {
          title: "连铸设备",
          description: "拉矫机辊子、连铸辊、足辊、辊套等产品覆盖多类使用场景。",
          tags: ["Cr13 系列", "Cr14 系列", "新制与修复"],
        },
        {
          title: "连轧设备",
          description: "上下夹送辊、助卷辊、导辊、层流辊等产品服务于多条轧线。",
          tags: ["Cr8-Mo-W-Co", "Ni-Cr-B-Si", "stellite 合金"],
        },
        {
          title: "其他产品",
          description: "包括料斗、法兰、轴套、阀门、转子、汽缸修复等定制化业务。",
          tags: ["耐磨层", "修复", "特殊工况"],
        },
      ],
    },
    testimonials: {
      eyebrow: "合作反馈",
      title: "合作客户与应用反馈占位",
      items: [
        {
          name: "合作客户占位",
          role: "连铸设备配套",
          quote: "后续可替换为真实项目反馈、应用总结或合作客户评价摘要。",
        },
        {
          name: "项目反馈占位",
          role: "连轧工艺配套",
          quote: "当前保留目标站轮播结构，后续可逐步补入真实客户案例与配套说明。",
        },
        {
          name: "应用场景占位",
          role: "特殊工况修复",
          quote: "建议后期使用更偏 B2B 的项目描述语言，而不是消费类口碑文案。",
        },
      ],
    },
    news: {
      eyebrow: "新闻中心",
      title: "企业新闻与更新动态",
      items: [
        {
          slug: "surface-engineering-upgrade",
          title: "官网内容体系升级，支持中日双语展示",
          summary: "新官网将围绕公司能力、产品业绩、新闻和留言系统进行统一升级。",
          meta: "2026-03-16",
        },
        {
          slug: "process-capability-overview",
          title: "围绕表面工程能力完善企业展示内容",
          summary: "新版页面将系统展示堆焊、喷焊、等离子堆焊、热处理和质量控制能力。",
          meta: "2026-03-10",
        },
        {
          slug: "news-cms-planning",
          title: "新闻发布与留言管理模块进入规划阶段",
          summary: "后台将支持新闻发布、页面文案维护、留言查看与处理中日双语内容。",
          meta: "2026-03-05",
        },
      ],
    },
    contact: {
      eyebrow: "联系我们",
      title: "欢迎联系博恒获取设备与工艺支持",
      description: "如需了解辊类产品、表面强化工艺或合作方式，可通过以下方式联系我们。",
      details: [
        { label: "地址", value: "辽宁省大连市旅顺口区三涧堡街道韩家村" },
        { label: "手机", value: "86-13591839861" },
        { label: "邮箱", value: "710877810@sina.com" },
      ],
      formLabels: {
        name: "姓名",
        company: "公司名称",
        email: "电子邮箱",
        phone: "联系电话",
        message: "需求说明",
        submit: "提交留言",
      },
    },
  },
  ja: {
    hero: {
      eyebrow: "鉄鋼向けロール設備・表面技術",
      title: "表面強化技術と圧延設備部品の一体提供",
      titleLines: ["表面強化技術と", "圧延設備部品の一体提供"],
      description:
        "大連博恒新技術有限公司は、連続鋳造・連続圧延・冷間圧延向けのロール設備、予備品、堆接・溶射などの表面技術を提供します。",
      primaryCta: "お問い合わせ",
      secondaryCta: "実績を見る",
      highlights: ["連鋳設備", "圧延設備", "冷間圧延設備", "表面強化"],
      stats: [
        { value: "15トン", label: "埋弧肉盛設備" },
        { value: "3トン", label: "明弧肉盛設備" },
        { value: "3トン", label: "埋弧肉盛設備" },
      ],
    },
    about: {
      eyebrow: "会社概要",
      title: "品質、厳格さ、誠実さを軸に鉄鋼業界へ対応",
      description:
        "大連に拠点を置き、ロール設備、予備品、表面強化技術を中心に、国内外の鉄鋼ユーザーへ継続的に製品と技術を提供しています。",
      points: [
        "連続鋳造・連続圧延・冷間圧延向けの設備と部品を製造",
        "肉盛、溶射、プラズマ肉盛などの表面強化技術を保有",
        "図面製作に加え、現場条件に応じたコーティング設計にも対応",
        "重要消耗部品の寿命向上とコスト削減に継続して取り組む",
      ],
      badge: { value: "15T", label: "サブマージアーク最大荷重" },
      stats: [
        { value: "4000-5000", label: "肉盛の年間生産能力" },
        { value: "800-1000", label: "溶射の年間生産能力" },
      ],
    },
    capabilities: {
      eyebrow: "コア技術",
      title: "製造から熱処理、組立、検査まで一貫対応",
      items: [
        {
          title: "サブマージアーク肉盛",
          description: "主要ロール部品の新作・補修に対応し、安定した施工品質を確保します。",
        },
        {
          title: "オープンアーク肉盛",
          description: "足ロールや周辺部品など、多様な硬度仕様に対応します。",
        },
        {
          title: "プラズマ肉盛",
          description: "高耐摩耗条件の部品向けに、高密着な表面層を形成します。",
        },
        {
          title: "火炎溶射",
          description: "耐摩耗層の形成や補修用途に対応し、部品寿命を延ばします。",
        },
        {
          title: "熱処理・組立",
          description: "熱処理、ショット処理、組立まで含めた一貫生産体制を備えています。",
        },
        {
          title: "品質管理",
          description: "硬度検査や PT 検査など、品質保証のための工程を整備しています。",
        },
      ],
    },
    advantages: {
      eyebrow: "選ばれる理由",
      title: "鉄鋼設備領域に適した工法・研究開発・供給体制",
      items: [
        {
          title: "工法経験",
          description: "連鋳・圧延・冷間圧延など複数工況に対する材料と工法の実績があります。",
        },
        {
          title: "共同研究",
          description: "大連理工大学と連携し、表面技術の応用研究を継続しています。",
        },
        {
          title: "安定品質",
          description: "製造、熱処理、組立、検査までの工程を整え、安定した品質を提供します。",
        },
        {
          title: "国内外対応",
          description: "新作・補修・改善提案を含め、国内外の鉄鋼関連ユーザーへ対応可能です。",
        },
      ],
    },
    projects: {
      eyebrow: "実績紹介",
      title: "連鋳設備、圧延設備、特殊製品の代表実績",
      categories: [
        {
          title: "連鋳設備",
          description: "矯正ロール、連鋳ロール、足ロール、スリーブなどに対応しています。",
          tags: ["Cr13 系", "Cr14 系", "新作・補修"],
        },
        {
          title: "圧延設備",
          description: "ピンチロール、ガイドロール、レベラーロールなど多様な圧延ラインへ供給。",
          tags: ["Cr8-Mo-W-Co", "Ni-Cr-B-Si", "stellite 合金"],
        },
        {
          title: "その他製品",
          description: "ホッパー、フランジ、ブッシュ、バルブ、ローター補修なども対応可能です。",
          tags: ["耐摩耗", "補修", "特殊条件"],
        },
      ],
    },
    testimonials: {
      eyebrow: "協力フィードバック",
      title: "顧客・案件フィードバックの仮配置",
      items: [
        {
          name: "顧客フィードバック仮置き",
          role: "連鋳設備配套",
          quote: "今後、実案件の概要や顧客評価をここに反映できるようにしておきます。",
        },
        {
          name: "案件紹介仮置き",
          role: "圧延設備工法",
          quote: "現段階では参考サイトのレイアウトと動きを維持し、内容は後から差し替えます。",
        },
        {
          name: "用途説明仮置き",
          role: "特殊工況修復",
          quote: "B2B 向けの案件説明や用途まとめに置き換えることを前提にした占位です。",
        },
      ],
    },
    news: {
      eyebrow: "ニュース",
      title: "企業ニュースと更新情報",
      items: [
        {
          slug: "surface-engineering-upgrade",
          title: "日中二言語対応の企業サイトへ全面更新",
          summary: "新サイトでは会社情報、実績、ニュース、お問い合わせを一体的に再構成します。",
          meta: "2026-03-16",
        },
        {
          slug: "process-capability-overview",
          title: "表面技術と製造能力の紹介構成を強化",
          summary: "肉盛、溶射、プラズマ肉盛、熱処理、品質管理を中心に紹介します。",
          meta: "2026-03-10",
        },
        {
          slug: "news-cms-planning",
          title: "ニュース配信と問い合わせ管理の設計を開始",
          summary: "管理画面ではニュース公開、ページ編集、問い合わせ確認を二言語で扱える設計です。",
          meta: "2026-03-05",
        },
      ],
    },
    contact: {
      eyebrow: "お問い合わせ",
      title: "設備・工法に関するご相談をお待ちしています",
      description:
        "ロール製品、表面強化工法、協業に関するご相談は、以下の連絡先またはフォームをご利用ください。",
      details: [
        { label: "住所", value: "中国遼寧省大連市旅順口区三澗堡街道韓家村" },
        { label: "携帯", value: "86-13591839861" },
        { label: "メール", value: "710877810@sina.com" },
      ],
      formLabels: {
        name: "お名前",
        company: "会社名",
        email: "メールアドレス",
        phone: "電話番号",
        message: "ご相談内容",
        submit: "送信する",
      },
    },
  },
  en: {
    hero: {
      eyebrow: "Roller equipment and surface engineering for steel production",
      title: "Manufacturing and Surface Engineering Solutions for Continuous Casting and Rolling Applications",
      titleLines: [
        "Manufacturing for continuous casting and rolling applications",
        "and surface engineering solutions",
      ],
      description:
        "Dalian Boheng New Technology Co., Ltd. specializes in complete roller conveyor equipment and spare parts for continuous casting, continuous rolling, and cold rolling, supported by core capabilities such as weld overlay, thermal spraying, and plasma cladding.",
      primaryCta: "Contact Us",
      secondaryCta: "View Project Cases",
      highlights: [
        "Continuous Casting Equipment",
        "Continuous Rolling Equipment",
        "Cold Rolling Equipment",
        "Surface Engineering",
      ],
      stats: [
        { value: "15-ton", label: "Submerged-Arc Cladding System" },
        { value: "3-ton", label: "Open-Arc Cladding System" },
        { value: "3-ton", label: "Submerged-Arc Cladding System" },
      ],
    },
    about: {
      eyebrow: "Company Profile",
      title: "Serving global steel customers through quality, discipline, and credibility",
      description:
        "Based in Dalian, the company has long provided roller equipment, spare parts, and surface engineering services for the steel industry while continuously developing new processes together with Dalian University of Technology.",
      points: [
        "Focused on complete roller equipment and spare parts for continuous casting, continuous rolling, and cold rolling lines",
        "Equipped with core surface engineering technologies including weld overlay, thermal spraying, and plasma cladding",
        "Able to manufacture to drawings and also design suitable coatings based on real operating conditions",
        "Committed to improving service life for critical wear parts while reducing manufacturing cost",
      ],
      badge: { value: "15T", label: "Maximum submerged-arc cladding load" },
      stats: [
        { value: "4000-5000", label: "Annual weld-overlay capacity" },
        { value: "800-1000", label: "Annual spraying capacity" },
      ],
    },
    capabilities: {
      eyebrow: "Core Capabilities",
      title: "Integrated process capabilities from fabrication and heat treatment to assembly and inspection",
      items: [
        {
          title: "Submerged-Arc Cladding",
          description:
            "Suitable for new production and repair of key roller components, with high load capacity and stable process control.",
        },
        {
          title: "Open-Arc Cladding",
          description:
            "Well suited to wide-side and narrow-side foot rollers and other parts requiring different hardness ranges.",
        },
        {
          title: "Plasma Cladding",
          description:
            "Used for high-adhesion and high-wear applications where service life improvement of special wear parts is critical.",
        },
        {
          title: "Flame Spraying",
          description:
            "Applied to wear-resistant layer formation and surface repair to extend the operating cycle of components.",
        },
        {
          title: "Heat Treatment and Assembly",
          description:
            "Supported by heat treatment, shot blasting, and assembly capabilities to ensure consistent final delivery.",
        },
        {
          title: "Quality Inspection",
          description:
            "Covers hardness testing after quenching and tempering, PT inspection of cladding, and other quality-control procedures.",
        },
      ],
    },
    advantages: {
      eyebrow: "Why Choose Us",
      title: "Process, R&D, and delivery capabilities built around steel-equipment applications",
      items: [
        {
          title: "Process Experience",
          description:
            "Extensive experience in materials and process applications across continuous casting, continuous rolling, and cold rolling conditions.",
        },
        {
          title: "Joint Development",
          description:
            "Long-term cooperation with Dalian University of Technology on engineering applications of new technologies.",
        },
        {
          title: "Stable Quality",
          description:
            "Relatively complete workflows for manufacturing, heat treatment, assembly, and inspection ensure reliable delivery quality.",
        },
        {
          title: "Support for Global Clients",
          description:
            "Serving steel mills and equipment makers at home and abroad, with support for new production, repair, and condition improvement.",
        },
      ],
    },
    projects: {
      eyebrow: "Project Cases",
      title: "Typical applications across continuous casting, rolling lines, and other specialty products",
      categories: [
        {
          title: "Continuous Casting Equipment",
          description:
            "Products such as straightening rolls, caster rolls, foot rolls, and sleeves cover a wide range of operating scenarios.",
          tags: ["Cr13 series", "Cr14 series", "New build and repair"],
        },
        {
          title: "Continuous Rolling Equipment",
          description:
            "Pinch rolls, wrapper rolls, guide rolls, and laminar rolls serve multiple rolling lines and process stages.",
          tags: ["Cr8-Mo-W-Co", "Ni-Cr-B-Si", "Stellite alloy"],
        },
        {
          title: "Other Products",
          description:
            "Including hoppers, flanges, shaft sleeves, valves, rotor repair, cylinder repair, and other customized jobs.",
          tags: ["Wear-resistant layers", "Repair", "Special conditions"],
        },
      ],
    },
    testimonials: {
      eyebrow: "Cooperation Feedback",
      title: "Placeholder area for customer and application feedback",
      items: [
        {
          name: "Customer feedback placeholder",
          role: "Continuous casting equipment support",
          quote:
            "This space can later be replaced with real project summaries, application feedback, or customer evaluation excerpts.",
        },
        {
          name: "Project summary placeholder",
          role: "Rolling process support",
          quote:
            "For now, the section preserves the target layout and motion system, ready for future client cases and project notes.",
        },
        {
          name: "Application placeholder",
          role: "Special-condition repair",
          quote:
            "The recommendation is to replace this with B2B-oriented project language rather than consumer-style endorsement copy.",
        },
      ],
    },
    news: {
      eyebrow: "News Center",
      title: "Company news and latest updates",
      items: [
        {
          slug: "surface-engineering-upgrade",
          title: "Official website upgraded to support Chinese and Japanese presentation",
          summary:
            "The new website reorganizes company capabilities, project cases, news, and the inquiry system into a unified structure.",
          meta: "2026-03-16",
        },
        {
          slug: "process-capability-overview",
          title: "Corporate presentation refined around surface engineering capabilities",
          summary:
            "The updated pages systematically present weld overlay, thermal spraying, plasma cladding, heat treatment, and quality control.",
          meta: "2026-03-10",
        },
        {
          slug: "news-cms-planning",
          title: "News publishing and inquiry management module enters planning stage",
          summary:
            "The backend is planned to support news publishing, page copy maintenance, and bilingual inquiry management.",
          meta: "2026-03-05",
        },
      ],
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Get in touch with Boheng for equipment and process support",
      description:
        "If you would like to discuss roller products, surface engineering processes, or cooperation opportunities, please contact us through the channels below.",
      details: [
        {
          label: "Address",
          value: "Hanjia Village, Sanjianpu Subdistrict, Lushunkou District, Dalian, Liaoning, China",
        },
        { label: "Mobile", value: "86-13591839861" },
        { label: "Email", value: "710877810@sina.com" },
      ],
      formLabels: {
        name: "Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        message: "Requirements",
        submit: "Submit Inquiry",
      },
    },
  },
};

const polishedTestimonials: Record<
  Locale,
  HomeContent["testimonials"]
> = {
  zh: {
    eyebrow: "合作与交付",
    title: "面向工业客户的协同与交付保障",
    items: [
      {
        name: "材料与工艺匹配",
        role: "面向实际工况选型",
        quote:
          "结合连铸、连轧、冷轧等不同工况，对材料、表面工艺和热处理路线进行匹配，兼顾寿命、成本与交付节奏。",
      },
      {
        name: "制造与质量控制",
        role: "关键部件稳定交付",
        quote:
          "围绕堆焊、喷焊、热处理、调质与检测组织生产流程，保证关键部件在制造和修复过程中的质量稳定性。",
      },
      {
        name: "售前与售后协同",
        role: "更适合 B2B 项目推进",
        quote:
          "针对新制、修复或工况改进类项目，可结合客户停机计划、现场条件和后续使用节奏提供持续沟通与支持。",
      },
    ],
  },
  ja: {
    eyebrow: "協力と納入体制",
    title: "産業分野に向けた協同と安定供給の要点",
    items: [
      {
        name: "材料と工法の選定",
        role: "実際の使用条件に合わせた最適化",
        quote:
          "連鋳・圧延・冷間工程など各工況に合わせて、材料、表面処理、熱処理条件を整理し、寿命とコストの両立を図ります。",
      },
      {
        name: "製造と品質管理",
        role: "重要部品の安定供給",
        quote:
          "肉盛、溶射、熱処理、調質、検査までを一貫して管理し、重要部品の再現性と品質安定を確保します。",
      },
      {
        name: "前後工程の連携支援",
        role: "B2B 案件に適した対応",
        quote:
          "新作、補修、工法改善のいずれにおいても、停止日程や現場条件を踏まえた連携で継続的に対応します。",
      },
    ],
  },
  en: {
    eyebrow: "Cooperation and Delivery",
    title: "Coordinated execution and delivery assurance for industrial clients",
    items: [
      {
        name: "Material and process matching",
        role: "Selection based on real operating conditions",
        quote:
          "For continuous casting, rolling, and cold-rolling conditions, we match materials, surface processes, and heat-treatment routes with attention to service life, cost, and delivery rhythm.",
      },
      {
        name: "Manufacturing and quality control",
        role: "Stable delivery of key components",
        quote:
          "Production is organized around weld overlay, spraying, heat treatment, quenching and tempering, and inspection to maintain stable quality in both new manufacturing and repair work.",
      },
      {
        name: "Pre-sales and after-sales coordination",
        role: "More suitable for B2B project execution",
        quote:
          "For new production, repair, or operating-condition improvement projects, we can coordinate with shutdown schedules, field conditions, and follow-up usage plans through sustained communication.",
      },
    ],
  },
};

const enterpriseAboutOverrides: Record<Locale, HomeContent["about"]> = {
  zh: {
    eyebrow: "公司简介",
    title: "立足大连的钢铁装备与表面强化专业制造工厂",
    description:
      "大连博恒新技术有限公司，坐落于中国辽东半岛最南端海滨城市 大连，背依中国东北腹地与山东半岛隔海相望，是中国东部沿海集经济、贸易、工业、旅游多元化的重要港口城市。\n\n我公司是钢铁行业连铸、连轧、冷轧等成套辊道设备及备品备件制造的专业化工厂，拥有“堆焊、喷焊、等离子堆焊”等表面强化核心技术、同时拥有不同工况下材料与工艺应用的丰富经验，一直与大连理工大学合作研发相关新技术的应用，不但能够按图制造，还可以根据用户现场工况设计相应涂层，提高关键件的寿命。\n\n我公司拥有比较完备的堆焊、喷焊、热处理、喷丸、装配等生产制造能力，固定的热处理、铆焊、加工等协作单位，以稳定的质量赢得国内外用户的认可。",
    points: [
      "以质求生、以严求精、以诚求信是我公司的宗旨。",
      "高效率、低成本，为用户提供高质量的产品及服务是我公司的目标。",
      "用户的改进需求是我公司技术研发、创新的方向。",
    ],
    badge: { value: "DALIAN", label: "山海港城制造基地" },
    stats: [
      { value: "4000-5000", label: "年堆焊能力" },
      { value: "800-1000", label: "年喷焊能力" },
    ],
  },
  ja: {
    eyebrow: "企業紹介",
    title: "大連を拠点に、鉄鋼設備と表面強化製造を支える",
    description:
      "大連博恒新技術有限公司は中国北方の海浜都市である大連に拠点を置き、鉄鋼業界向けの連鋳・連圧・冷間圧延設備用ロールライン機器および予備部品の製造に注力しています。肉盛、溶射、プラズマ肉盛などの表面強化技術を備え、大連理工大学との継続的な共同研究を通じて、図面製作だけでなく現場条件に応じたコーティング設計にも対応しています。",
    points: [
      "連鋳・連圧・冷間圧延向け成套ロールライン設備と予備部品の製造に対応。",
      "肉盛、溶射、プラズマ肉盛などの表面強化技術と多様な工況での材料適用経験を保有。",
      "図面製作に加え、現場条件に応じた皮膜設計で主要消耗部品の寿命向上を支援。",
    ],
    badge: { value: "DALIAN", label: "港湾都市の製造拠点" },
    stats: [
      { value: "4000-5000", label: "年間肉盛能力" },
      { value: "800-1000", label: "年間溶射能力" },
    ],
  },
  en: {
    eyebrow: "Company Profile",
    title: "A specialized manufacturing plant in Dalian for steel equipment and surface engineering",
    description:
      "Dalian Boheng New Technology Co., Ltd. is located in Dalian, the major coastal city at the southern tip of the Liaodong Peninsula. Facing the Northeast China hinterland and the Shandong Peninsula across the sea, Dalian is an important eastern coastal port city integrating economy, trade, industry, and tourism.\n\nOur company is a specialized manufacturer of complete roller conveyor equipment and spare parts for continuous casting, continuous rolling, and cold rolling in the steel industry. We possess core surface engineering technologies such as weld overlay, thermal spraying, and plasma cladding, as well as extensive experience in material and process application under different operating conditions. Through long-term cooperation with Dalian University of Technology, we continue to develop and apply new technologies. We can manufacture according to drawings and also design suitable coatings based on on-site service conditions to improve the life of critical parts.\n\nWe maintain relatively complete production capabilities for weld overlay, spraying, heat treatment, shot blasting, and assembly, together with stable supporting partners for heat treatment, fabrication, and machining. Reliable quality has earned recognition from customers at home and abroad.",
    points: [
      "Survival through quality, excellence through strict standards, and trust through sincerity are the principles of our company.",
      "High efficiency and low cost, while delivering high-quality products and services, remain our operating objective.",
      "Customer improvement requirements are the direction of our technology development and innovation.",
    ],
    badge: { value: "DALIAN", label: "Coastal manufacturing base" },
    stats: [
      { value: "4000-5000", label: "Annual weld-overlay capacity" },
      { value: "800-1000", label: "Annual spraying capacity" },
    ],
  },
};

export function getFallbackHomeContent(locale: Locale) {
  const siteCopy = getSiteCopy(locale);

  return {
    siteSettings: {
      companyName: siteCopy.companyName,
      address: siteCopy.footer.address,
      phone: siteCopy.footer.phone,
      email: siteCopy.footer.email,
    },
    ...homeContent[locale],
    about: enterpriseAboutOverrides[locale],
    testimonials: polishedTestimonials[locale],
  };
}

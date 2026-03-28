import type { Locale } from "../lib/i18n";

interface SiteCopy {
  companyName: string;
  nav: Array<{ href: string; label: string }>;
  footer: {
    title: string;
    description: string;
    contactTitle: string;
    quickLinksTitle: string;
    serviceTitle: string;
    address: string;
    phone: string;
    email: string;
    quickLinks: Array<{ href: string; label: string }>;
    services: string[];
  };
  newsPreviewAction: string;
}

const siteCopy: Record<Locale, SiteCopy> = {
  zh: {
    companyName: "大连博恒新技术有限公司",
    nav: [
      { href: "/#home", label: "首页" },
      { href: "/#about", label: "公司简介" },
      { href: "/#capabilities", label: "核心能力" },
      { href: "/#projects", label: "产品业绩" },
      { href: "/news", label: "新闻中心" },
      { href: "/#contact", label: "联系我们" },
    ],
    footer: {
      title: "面向钢铁行业的表面强化与辊道装备制造",
      description:
        "大连博恒新技术有限公司专注连铸、连轧及相关备件制造，持续提供堆焊、喷焊与表面工程解决方案。",
      contactTitle: "联系信息",
      quickLinksTitle: "快速导航",
      serviceTitle: "核心方向",
      address: "辽宁省大连市旅顺口区三涧堡街道韩家村",
      phone: "86-13591839861",
      email: "710877810@sina.com",
      quickLinks: [
        { href: "/#home", label: "首页" },
        { href: "/#about", label: "公司简介" },
        { href: "/#capabilities", label: "核心能力" },
        { href: "/news", label: "新闻中心" },
      ],
      services: ["连铸设备", "连轧设备", "表面强化", "备件修复"],
    },
    newsPreviewAction: "查看详情",
  },
  ja: {
    companyName: "大連博恒新技術有限公司",
    nav: [
      { href: "/ja/#home", label: "ホーム" },
      { href: "/ja/#about", label: "会社概要" },
      { href: "/ja/#capabilities", label: "コア技術" },
      { href: "/ja/#projects", label: "実績紹介" },
      { href: "/ja/news", label: "ニュース" },
      { href: "/ja/#contact", label: "お問い合わせ" },
    ],
    footer: {
      title: "表面強化技術と圧延設備部品の製造拠点",
      description:
        "大連博恒新技術有限公司は、連続鋳造・連続圧延分野向けのロール設備、予備品、および表面処理ソリューションを提供します。",
      contactTitle: "連絡先",
      quickLinksTitle: "クイックリンク",
      serviceTitle: "コア領域",
      address: "中国遼寧省大連市旅順口区三澗堡街道韓家村",
      phone: "86-13591839861",
      email: "710877810@sina.com",
      quickLinks: [
        { href: "/ja/#home", label: "ホーム" },
        { href: "/ja/#about", label: "会社概要" },
        { href: "/ja/#capabilities", label: "コア技術" },
        { href: "/ja/news", label: "ニュース" },
      ],
      services: ["連鋳設備", "圧延設備", "表面強化", "補修対応"],
    },
    newsPreviewAction: "続きを読む",
  },
};

export function getSiteCopy(locale: Locale) {
  return siteCopy[locale];
}

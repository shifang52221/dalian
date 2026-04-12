import type { Locale } from "../../lib/i18n";

export interface NewsItem {
  slug: string;
  date: string;
  title: string;
  summary: string;
  content: string[];
  contentHtml?: string;
  image?: {
    src: string;
    alt: string;
  };
}

const newsContent: Record<Locale, NewsItem[]> = {
  zh: [
    {
      slug: "surface-engineering-upgrade",
      date: "2026-03-16",
      title: "官网内容体系升级，支持中日双语展示",
      summary: "新官网将围绕公司能力、产品业绩、新闻和留言系统进行统一升级。",
      content: [
        "新网站将采用中日双语路由与统一的内容字段结构，以便后续通过后台系统进行维护。",
        "前台将重点展示钢铁行业辊道设备、表面强化能力、产品业绩以及企业新闻等信息。",
      ],
    },
    {
      slug: "process-capability-overview",
      date: "2026-03-10",
      title: "围绕表面工程能力完善企业展示内容",
      summary: "新版页面将系统展示堆焊、喷焊、等离子堆焊、热处理和质量控制能力。",
      content: [
        "网站展示将围绕博恒现有制造能力展开，突出面向连铸、连轧等场景的工艺支撑。",
        "后续后台接入后，可进一步扩展典型产品、应用案例和客户分布等栏目。",
      ],
    },
    {
      slug: "news-cms-planning",
      date: "2026-03-05",
      title: "新闻发布与留言管理模块进入规划阶段",
      summary: "后台将支持新闻发布、页面文案维护、留言查看与处理中日双语内容。",
      content: [
        "计划中的后台将以轻量 CMS 为核心，支持新闻列表、详情维护以及前台内容同步更新。",
        "留言数据也会统一进入后台，方便按来源语言进行跟进与管理。",
      ],
    },
  ],
  ja: [
    {
      slug: "surface-engineering-upgrade",
      date: "2026-03-16",
      title: "日中二言語対応の企業サイトへ全面更新",
      summary: "新サイトでは会社情報、実績、ニュース、お問い合わせを一体的に再構成します。",
      content: [
        "新しいサイトは日中の二言語ルートと統一されたコンテンツ構造で設計され、管理画面からの更新を前提としています。",
        "トップページではロール設備、表面強化技術、実績紹介、企業ニュースを中心に情報発信を行います。",
      ],
    },
    {
      slug: "process-capability-overview",
      date: "2026-03-10",
      title: "表面技術と製造能力の紹介構成を強化",
      summary: "肉盛、溶射、プラズマ肉盛、熱処理、品質管理を中心に紹介します。",
      content: [
        "サイトでは、連鋳・圧延分野に対応する博恒の製造体制と表面工程能力をわかりやすく整理します。",
        "今後は典型製品、適用事例、顧客分布なども管理画面から追加可能にする予定です。",
      ],
    },
    {
      slug: "news-cms-planning",
      date: "2026-03-05",
      title: "ニュース配信と問い合わせ管理の設計を開始",
      summary: "管理画面ではニュース公開、ページ編集、問い合わせ確認を二言語で扱える設計です。",
      content: [
        "軽量 CMS をベースに、ニュースの一覧・詳細・公開状態を管理できる構成を検討しています。",
        "問い合わせ情報も管理画面に集約し、言語別に確認・対応できるようにします。",
      ],
    },
  ],
  en: [
    {
      slug: "surface-engineering-upgrade",
      date: "2026-03-16",
      title: "Official website architecture upgraded for bilingual corporate presentation",
      summary:
        "The new official website is being upgraded in a unified way around company capabilities, project cases, news, and the inquiry system.",
      content: [
        "The new website adopts localized routing and a unified content-field structure so that it can be maintained through the CMS in future iterations.",
        "The frontend focuses on roller equipment for the steel industry, surface engineering capabilities, project cases, and corporate news.",
      ],
    },
    {
      slug: "process-capability-overview",
      date: "2026-03-10",
      title: "Corporate presentation refined around surface engineering capabilities",
      summary:
        "The new pages systematically present weld overlay, thermal spraying, plasma cladding, heat treatment, and quality-control capabilities.",
      content: [
        "The website presentation is organized around Boheng's existing manufacturing capacity, highlighting process support for continuous casting, rolling, and related applications.",
        "After full CMS integration, the structure can be further expanded with typical products, application cases, and customer-distribution sections.",
      ],
    },
    {
      slug: "news-cms-planning",
      date: "2026-03-05",
      title: "News publishing and inquiry management module enters planning stage",
      summary:
        "The backend will support news publishing, page-copy maintenance, and multilingual inquiry tracking and handling.",
      content: [
        "The planned backend centers on a lightweight CMS and will support maintenance of news lists, article details, and synchronized frontend content updates.",
        "Inquiry data will also flow into the backend in a unified way so teams can follow up by source language and manage communication more efficiently.",
      ],
    },
  ],
};

export function getFallbackNews(locale: Locale) {
  return newsContent[locale];
}

export function getFallbackNewsBySlug(slug: string, locale: Locale) {
  return getFallbackNews(locale).find((item) => item.slug === slug);
}

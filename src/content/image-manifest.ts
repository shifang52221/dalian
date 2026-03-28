export interface ImageAsset {
  src: string;
  alt: string;
}

interface ImageManifest {
  heroSpotlight: ImageAsset;
  about: ImageAsset;
  gallery: ImageAsset[];
}

const imageManifest: ImageManifest = {
  heroSpotlight: {
    src: "/images/horl.webp",
    alt: "博恒首页首屏背景图",
  },
  about: {
    src: "/images/boheng-crops/about-projects.png",
    alt: "博恒连轧设备与产品现场图片",
  },
  gallery: [
    {
      src: "/images/boheng-crops/gallery-workshop.png",
      alt: "生产车间环境",
    },
    {
      src: "/images/boheng-crops/gallery-machine.png",
      alt: "埋弧堆焊设备",
    },
    {
      src: "/images/boheng-crops/gallery-fire-spray.png",
      alt: "火焰喷焊工艺",
    },
    {
      src: "/images/boheng-crops/gallery-quality.png",
      alt: "质量检测与表面处理",
    },
    {
      src: "/images/boheng-crops/gallery-rnd.png",
      alt: "技术研发与修复工艺",
    },
    {
      src: "/images/boheng-crops/gallery-rolling.png",
      alt: "连轧设备部件",
    },
  ],
};

imageManifest.about = {
  src: "/images/dalian-coast-card.webp",
  alt: "大连海岸城市风景展示图",
};

export function getImageManifest() {
  return imageManifest;
}

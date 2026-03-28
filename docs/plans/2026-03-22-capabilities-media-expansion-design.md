# Capabilities Media Expansion Design

**Goal**

将首页“核心能力”模块的图片能力从“埋弧堆焊”扩展到另外四张卡片，使“明弧堆焊、等离子堆焊、火焰喷焊、质量检测”也拥有相同的卡片内 hover 出图和当前页点击大图预览能力。

## Scope

- 复用现有交互结构与样式
- 仅扩展图片映射，不重做布局
- 使用以下资源路径：
  - `/images/capabilities/minghu.jpg`
  - `/images/capabilities/denglizi.jpg`
  - `/images/capabilities/huoyan.jpg`
  - `/images/capabilities/zhijian.jpg`

## Implementation Notes

- 继续由 `Capabilities.astro` 中的媒体映射表控制
- 只要卡片标题命中对应能力，就自动启用：
  - 卡片内 hover 出图
  - 点击大图预览
- 其他卡片保持不变

## Testing

- 增加一条回归测试
- 验证组件中包含新增四张图片路径
- 保证已有 hover-image / preview-lightbox 测试继续通过

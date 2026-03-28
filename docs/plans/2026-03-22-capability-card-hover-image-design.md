# Capability Card Hover Image Design

**Goal**

在首页“核心能力”模块中，为“埋弧堆焊”卡片增加卡片内部悬停出图效果。图片保持在卡片内部，不做外侧弹层，不改变现有三列排版秩序，整体视觉继续保持稳重、统一、纯主题蓝 hover 的方向。

## Chosen Direction

- 采用 `A` 方案
- 图片作为卡片内部底层媒体
- 默认隐藏，hover 时淡入并做极轻微缩放
- 文字和图标继续维持现有 hover 逻辑，切换为白色
- 图片上覆盖一层纯主题蓝遮罩，避免画面过花、与整站蓝色体系冲突

## Scope

- 仅给“埋弧堆焊”卡片接入 `/images/capabilities/maihu.jpg`
- 其余能力卡片保持当前结构与交互不变
- 不新增新的外部浮层、不改变卡片网格布局、不引入渐变 hover

## Implementation Notes

- 在 `Capabilities.astro` 中为命中“埋弧堆焊 / 埋弧肉盛”的卡片注入媒体层
- 媒体层放在卡片内部，使用单独类名控制显示与动画
- 在 `global.css` 中增加该媒体层、蓝色遮罩、hover 淡入与 reduced motion 退化
- 继续复用当前 `.service-card--capability:hover` 的纯蓝主题逻辑

## Testing

- 新增一个回归测试
- 验证组件包含专属 hover 图片资源路径
- 验证样式包含卡片媒体层、hover 可见状态与 reduced motion 规则

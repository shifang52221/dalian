# Capability Rechuli Preview Polish Design

**Goal**

为“热处理与装配”卡片接入 `rechuli.jpg`，并在不改变当前 hover 出图与当前页大图预览结构的前提下，把预览层做得更精致、更接近成品站的质感。

## Scope

- 新增一张图片映射：
  - `热处理与装配` -> `/images/capabilities/rechuli.jpg`
- 保持现有卡片 hover 与点击预览机制
- 精修预览层细节：
  - 更有层次的外框
  - 更精致的图片区包裹
  - 更明确但克制的标题信息区

## Design Direction

- 继续维持蓝色主题与稳重路线
- 不新增花哨动画，只在已有淡入/轻位移基础上增强质感
- 通过细边框、内发光、图片框包裹和小型标签来提升完成度

## Testing

- 增加一条回归测试
- 验证组件包含 `/images/capabilities/rechuli.jpg`
- 验证组件包含新的预览信息区类名
- 验证样式包含精修后的预览层细节类

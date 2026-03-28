# Capabilities Motion Refinement Design

**Goal**

完善首页“核心能力”区域的进入动效，采用稳重分层型节奏：左侧标题与说明先轻微进入，右侧六张能力卡再按从左到右、从上到下的顺序依次进入，整体幅度克制，不做跳跃、弹性或夸张漂浮。

## Motion Direction

- 左侧：
  - `eyebrow` 先出现
  - 主标题随后进入
  - 说明文字最后进入
- 右侧：
  - 6 张卡片继续保留顺序延迟
  - 进入位移很小，强调“整齐、有序”
  - 卡片图标壳层可带极轻微的二段跟进感，但不独立乱动

## Constraints

- 不能做大幅位移
- 不能做弹跳
- 不能出现强烈漂浮循环
- hover 仍保持纯主题蓝切换，不加渐变

## Recommendation

使用 capabilities 专属的 motion 类，不直接依赖全局 `[data-reveal]` 的默认效果。

这样可以：

- 保留全局 reveal 作为基础
- 单独强化这一块的层次节奏
- 不影响其他模块的 reveal 风格

## Testing

- 增加一个 capabilities 动效测试
- 验证组件包含 lead motion 类
- 验证样式包含 lead stagger、卡片初始轻位移和 reduced motion 退化


# Sitewide Blue Unification Design

**Goal**

把网站从“首页雾感蓝 + 其余页面蓝金混合”的状态，统一收敛成一套整站一致的雾感科技蓝品牌体系，确保首页、内页、表单、按钮、状态高亮与焦点态都属于同一视觉语言，不再出现花色混搭。

## Problem

当前站点已经把首页 Hero 的高亮从荧光绿改成了雾感科技蓝，但整站仍存在以下不统一问题：

- 全局按钮仍大量依赖暖金强调色
- 输入框、文本域焦点态仍使用暖金 ring
- 联系表单成功态仍使用绿色
- 内页返回按钮、通用 CTA 仍沿用旧的蓝金体系
- 首页 Hero 使用一套蓝色 token，其他页面使用另一套全局 token，品牌色没有合并

这会让用户感知成“首页是一套站，内页又是一套站”。

## Approaches

### A. 只继续微调首页，不碰全局 token

优点是改动最少。缺点是无法满足“整站彻底统一”的目标。

### B. 用首页雾感蓝替换全局强调色，并把通用组件统一接入

优点是品牌一致性最好，修改范围可控，后续继续微调也最方便。首页和内页最终共用同一套蓝色 token。

### C. 重做整站全部颜色体系

优点是最彻底。缺点是成本高，容易把当前已稳定的层次和可读性一起打乱，超出当前需求。

## Recommendation

采用 **B**。

原因是用户明确要求“必须彻底统一，不能花里胡哨”。这意味着我们需要把全局强调色入口统一成一套蓝色 token，而不是继续让首页单独蓝、内页继续蓝金混搭。

## Color System

### Brand blue

- 主蓝：`#79baf3`
- 浅蓝：`#9fd2ff`
- 强高亮蓝：`#a9d9ff`
- 蓝色光晕：`rgba(121, 186, 243, 0.24)`
- 深蓝文字：`#102235`

### Neutral support

- 主文字继续保持现有深灰蓝
- 面板和输入底色继续保留浅灰蓝中性背景
- 不再使用暖金作为主 CTA 或焦点强调色

## Scope

- `src/styles/global.css`
  - 全局颜色 token
  - 通用按钮 `.button--primary`
  - 通用蓝色强调元素
  - 联系区按钮、状态、焦点相关样式
  - 与 `--accent-warm` / `--accent-warm-strong` / `--accent` / `--success` 有关的视觉入口
- `src/components/ui/button.tsx`
  - Shadcn 风格按钮主变体
- `src/components/ui/input.tsx`
  - Focus ring 颜色
- `src/components/ui/textarea.tsx`
  - Focus ring 颜色

## Testing

- 新增一个“全站蓝色统一”测试
  - 验证全局 token 已切换到蓝色体系
  - 验证通用按钮与输入焦点不再依赖暖金或绿色
- 保持首页 Hero 蓝色测试继续通过
- 保持现有 shell / CTA / UI 相关测试继续通过


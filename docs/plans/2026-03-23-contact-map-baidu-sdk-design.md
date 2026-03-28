# Contact Map Baidu SDK Design

**Goal**

让联系页中的站内地图在中国大陆环境下稳定显示，并直接呈现公司地址对应的百度地图真实地图，而不再依赖不稳定的第三方整页 `iframe` 地图方案。

## Context

- 高德官网搜索页作为 `iframe` 嵌入时会触发登录与风控相关逻辑，不适合站内真实地图展示。
- OpenStreetMap 虽然可嵌入，但用户明确反馈在中国大陆访问不稳定，不符合项目场景。
- 用户已提供百度地图浏览器端 `AK`，并确认 `referer` 白名单已配置。

## Options Considered

### Option A: Use Baidu Maps JavaScript API GL on the page

- 优点：适合中国大陆访问环境。
- 优点：是真实地图，不需要登录查看。
- 优点：用户已提供可用 AK，实施条件齐备。
- 缺点：需要在前端加载百度脚本并处理初始化。

### Option B: Keep only a styled location card with external links

- 优点：实现最简单、完全稳定。
- 缺点：站内没有真实地图，不符合当前目标。

### Option C: Wait for a Gaode Web key and build with AMap JS API

- 优点：可以保持高德底图。
- 缺点：当前没有高德 Web key，且用户已经提供百度 AK，可立即落地。

## Chosen Approach

采用 **Option A**。

- 联系页不再使用地图 `iframe` 作为主要展示方式。
- 页面中渲染一个百度地图容器，由前端脚本按需加载百度 `WebGL JS API`。
- 先用韩家村附近的大概坐标作为回退中心点。
- 再通过百度地理编码器按完整地址获取更合适的展示点位，并设置标记。
- 工具条继续保留：
  - 地址文本
  - 在高德打开
  - 在百度打开

## Data Flow

- Astro 组件将以下信息输出到地图容器的 `data-*` 属性：
  - 百度 AK
  - 公司名称
  - 地址文本
  - 回退经纬度
- 浏览器脚本执行时：
  - 检查是否已加载百度脚本
  - 若未加载则动态注入 `https://api.map.baidu.com/api?type=webgl&v=1.0&ak=...`
  - 创建地图实例
  - 使用 `Geocoder` 优先按地址获取点位
  - 若地理编码失败，使用回退坐标初始化
  - 创建标记与信息文本

## UX Notes

- 地图区域继续沿用现有容器样式，保证整站风格统一。
- 不额外加入花哨地图控件，只保留基础缩放/拖拽能力。
- 地图下方不增加冗余内容，避免联系区显得杂乱。

## Testing

- 回归测试验证组件包含百度脚本地址 `api.map.baidu.com/api?type=webgl&v=1.0&ak=`
- 验证组件包含 `data-baidu-map`
- 验证组件不再包含 OSM 嵌入地址
- 验证组件不再包含地图 `iframe`
- 验证高德/百度外链仍保留

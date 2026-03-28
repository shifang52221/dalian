# Contact Map OSM Embed Design

**Goal**

让联系页中的站内地图稳定显示工厂大概位置，且不再出现“网络错误”或“需要登录”，同时继续保留“在高德打开 / 在百度打开”的地址跳转能力。

## Context

- 当前站内地图使用的是高德官网搜索页的整页 `iframe`。
- 实际使用中已经出现“网络错误”和“需要登录”的问题。
- 用户已明确选择方案 A：站内使用真正不需要登录的地图展示，外链继续走高德/百度。

## Root Cause

- `www.amap.com/search` 是高德完整 PC 官网页面，不是官方面向第三方站点的轻量嵌入地图。
- 该页面内部包含登录容器、风控脚本和复杂交互逻辑，在第三方站点 `iframe` 中运行不稳定。
- 因此问题不在地址文本，而在嵌入对象本身不适合站内地图展示。

## Options Considered

### Option A: OpenStreetMap embedded iframe + AMap/Baidu external links

- 优点：不需要登录，适合直接嵌入，稳定性最高。
- 优点：页面内可以直接看到工厂大概区域与标记点。
- 优点：继续保留高德和百度作为国内用户的外部导航入口。
- 缺点：站内地图样式不是高德底图。

### Option B: Remove real map and use a designed location card only

- 优点：最稳定，完全无第三方地图依赖。
- 缺点：站内看不到真实地图，不符合当前用户预期。

### Option C: Official AMap JS SDK integration

- 优点：站内仍是高德体验。
- 缺点：需要高德 Web Key，超出当前信息条件。

## Chosen Approach

采用 **Option A**。

- 站内地图改为 OpenStreetMap 官方嵌入地址：
  - 使用 `export/embed.html`
  - 传入 `bbox`
  - 传入工厂大概位置的 `marker`
- 右上角按钮继续保留：
  - 高德：按完整地址搜索
  - 百度：按完整地址搜索
- 地图工具条中的地址文本继续显示，作为站内语义确认。

## Location Strategy

- 当前阶段使用“三涧堡街道韩家村附近”的近似坐标做标记点。
- 目标不是门牌级精度，而是“默认看起来就在工厂那片区域”。
- 若后续拿到精确经纬度，再替换 `marker` 与 `bbox` 即可，无需重做结构。

## UX Notes

- 站内地图优先负责“可见、稳定、无登录障碍”。
- 外部地图按钮负责“继续导航与搜索”。
- 不新增夸张动效，保持整站稳重统一。

## Testing

- 回归测试验证站内地图使用 `openstreetmap.org/export/embed.html`。
- 验证嵌入地址包含 `bbox=` 与 `marker=`。
- 验证高德与百度外链仍保留完整地址搜索能力。
- 验证组件中不再包含 `www.amap.com/search` 作为内嵌地图地址。

# Contact Map Area Center Design

**Goal**

让联系页中的默认地图在未拿到精确门牌坐标前，稳定落在“大连市旅顺口区三涧堡街道附近”这一片区域，而不是继续依赖村级地址搜索的模糊结果。

## Context

- 当前地图已经切换为高德作为默认展示入口。
- 现有实现通过完整地址 `query` 搜索，并叠加 `city` 与 `geoobj` 约束范围。
- 用户已经确认当前阶段不需要精确工厂门口点位，只要默认打开能落在目标区域即可。

## Problem

- 村级地址在公开地图搜索中经常无法稳定命中精确位置。
- 即使带上城市和范围约束，搜索结果也可能偏到附近其它 POI，导致“看不到工厂在哪”。
- 对当前页面来说，优先级更高的是“默认视野正确”，而不是“搜索结果精确”。

## Options Considered

### Option A: Continue using address search with tighter query text

- 优点：保留地址驱动，不需要手工坐标。
- 缺点：依然受公开搜索结果波动影响，稳定性不足。

### Option B: Use an approximate area center as the embedded map target

- 优点：默认落点稳定，符合“先落区域”的当前目标。
- 优点：不需要登录，也不需要额外 key。
- 缺点：仍不是工厂门口的精准打点。

### Option C: Integrate a fully custom map with explicit marker rendering

- 优点：后续可以做真正精确点位和更完整交互。
- 缺点：需要经纬度或高德 key，当前信息不足，超出本轮需求。

## Chosen Approach

采用 **Option B**。

- 将 `iframe` 默认地址从“按完整地址搜索”调整为“按近似中心点打开高德地图”。
- 近似中心点取三涧堡街道附近区域中心，用于保证默认视野稳定落在目标片区。
- 页面上的地址文本与“在高德打开 / 在百度打开”外链继续保留，便于用户进一步精查。

## UX Notes

- 页面内嵌地图的任务是“先看到大概区域”，不是承担全部导航责任。
- 外链按钮继续作为二级动作，避免用户在站内地图上因为 POI 不精确而困惑。
- 不新增花哨特效，保持整站稳重统一。

## Testing

- 新增回归测试，验证组件默认嵌入链接不再依赖 `www.amap.com/search`。
- 验证链接使用基于坐标的高德地址，并保留目标区域坐标值。
- 继续验证外链按钮与地图容器结构没有回退。

# Contact Map Address Search Design

**Goal**

让联系页中的站内地图和右上角“在高德打开”都默认落到大连博恒新技术有限公司的大概厂址区域，而不是出现全国视图或跳转到与站内展示不一致的地址结果。

## Context

- 当前联系页已经有真实地图容器与高德/百度外链按钮。
- 上一版尝试用基于坐标的 `m.amap.com` H5 链接让地图直接落在三涧堡区域。
- 实际浏览器效果表明，这种 H5 坐标方式在当前桌面 `iframe` 场景中表现不稳定，出现了全国大范围视图，不能满足用户对“默认就是工厂地址附近”的预期。

## Root Cause

- 站内 `iframe` 使用的是坐标型 H5 地图 URI，而不是更稳定的地址搜索页。
- 右上角高德外链仍然使用另一套搜索入口，导致站内与外链的定位逻辑不一致。
- 村级地址本身不一定能精确打到工厂门口，但用“完整地址 + 城市/区域范围约束”的搜索结果，至少可以稳定落在厂家大概地址区域。

## Options Considered

### Option A: Use one address-search-based AMap URL for both embed and external open

- 优点：站内与外链一致，用户认知最稳定。
- 优点：不需要登录，也不需要地图 key。
- 优点：符合用户明确选择的修正方向。
- 缺点：仍是大概地址区域，不是精确门牌打点。

### Option B: Keep embed as approximate area center, but use address search for external open

- 优点：外链相对更准。
- 缺点：站内与外链不一致，仍然容易让用户感觉“这个位置不对”。

### Option C: Build a custom marker map with SDK

- 优点：后续可实现精准标点与自定义样式。
- 缺点：需要更完整地图接入信息，超出当前修复范围。

## Chosen Approach

采用 **Option A**。

- 将站内 `iframe` 改回高德地址搜索页。
- 使用完整地址 `辽宁省大连市旅顺口区三涧堡街道韩家村` 作为查询词。
- 保留 `city=210200` 和三涧堡附近的 `geoobj` 范围约束，确保默认视野优先落在大连旅顺附近。
- 将“在高德打开”外链切换为同一套搜索参数，保证站内外的一致性。

## UX Notes

- 这一版的目标是“用户一眼就能看出是在工厂附近”，不是追求门牌级精度。
- 地图上方现有地址文本继续保留，作为视觉和语义双重确认。
- 百度外链继续保留，作为备用入口，不改变当前交互结构。

## Testing

- 回归测试要验证站内嵌图重新使用 `www.amap.com/search`。
- 验证组件中包含完整地址查询词、`city=210200` 与 `geoobj=` 范围参数。
- 验证高德外链不再使用旧的 `uri.amap.com` 搜索地址。
- 验证不再包含 `m.amap.com/?q=` 坐标型链接。

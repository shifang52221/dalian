# CMS 后台发布说明 / CMS Publishing Guide

本文档给客户使用，按 PocketBase 后台真实集合与字段编写。

适用范围：

- 新闻发布
- 首页内容修改
- 公司信息修改
- 多语言内容维护

## 1. 后台常用英文按钮对照

| 后台英文 | 中文说明 | 用途 |
| --- | --- | --- |
| Dashboard | 控制台 | 后台首页 |
| Collections | 数据集合 | 左侧所有内容分类 |
| New record | 新建记录 | 新增一条内容 |
| Edit | 编辑 | 修改当前内容 |
| Save | 保存 | 保存当前修改 |
| Delete | 删除 | 删除当前记录 |
| Search | 搜索 | 查找内容 |
| Filter | 筛选 | 按条件筛选 |
| Sort | 排序 | 调整显示顺序 |
| Upload | 上传 | 上传图片或文件 |
| Back | 返回 | 返回上一页 |

## 2. 字段后缀说明

后台里很多字段会带后缀，请按下面理解：

| 字段后缀 | 中文说明 | 备注 |
| --- | --- | --- |
| `_zh` | 中文内容 | 中文站使用 |
| `_ja` | 日文内容 | 日文站使用 |
| `_en` | 英文内容 | 英文站使用 |
| `is_published` | 是否发布 | 开启后前台可见 |
| `sort_order` | 排序值 | 数字越小越靠前 |

重要说明：

- `is_published = true`：前台显示
- `is_published = false`：前台隐藏
- `sort_order` 建议从 `1` 开始顺序填写
- 带 `_zh`、`_ja`、`_en` 的内容，建议三边都填写完整再发布

## 3. 发布前通用原则

1. 先编辑内容，再检查 `is_published` 是否开启。
2. 多条卡片类内容要检查 `sort_order`，避免顺序混乱。
3. 新闻 `slug` 一旦上线，尽量不要随意修改，否则原链接可能失效。
4. 从 Word 复制内容时，建议先清理格式再粘贴，避免出现异常 HTML 标签。
5. 如果只是普通正文，不要手动输入 `<p>`、`<ul>`、`&Phi;` 这一类代码。

## 4. 各集合对应的网站位置

| 集合名 Collection | 中文作用 | 前台对应位置 |
| --- | --- | --- |
| `site_settings` | 公司基础信息 | 头部公司名、底部联系方式、地图链接 |
| `home_sections` | 首页分区标题摘要 | 首页 Hero 和公司简介的区块标题 |
| `home_hero` | 首页首屏主视觉 | 首页顶部大标题、按钮、统计项 |
| `home_about` | 企业简介 | 首页公司简介区域 |
| `advantages` | 优势卡片 | 首页四个优势卡片 |
| `capabilities` | 工艺能力卡片 | 首页六个工艺/设备卡片 |
| `product_cases` | 产品业绩 | 首页产品分类与标签 |
| `cooperation_highlights` | 合作亮点 | 首页合作/能力说明卡片 |
| `news` | 新闻中心 | 新闻列表页和新闻详情页 |
| `messages` | 留言信息 | 客户提交的留言内容 |

## 5. 新闻发布方法

进入：`Collections` -> `news`

### 5.1 新建新闻

点击 `New record`，按下面填写：

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `slug` | 新闻链接标识 | 只能用英文、小写、短横线，例如 `new-surface-process` |
| `title_zh` | 中文标题 | 新闻中文标题 |
| `title_ja` | 日文标题 | 新闻日文标题 |
| `title_en` | 英文标题 | 新闻英文标题 |
| `summary_zh` | 中文摘要 | 列表页简介，建议 1-2 句 |
| `summary_ja` | 日文摘要 | 日文列表页简介 |
| `summary_en` | 英文摘要 | 英文列表页简介 |
| `content_zh` | 中文正文 | 新闻详情正文 |
| `content_ja` | 日文正文 | 日文详情正文 |
| `content_en` | 英文正文 | 英文详情正文 |
| `cover_image` | 封面图 | 上传新闻封面图片 |
| `published_at` | 发布时间 | 选择发布日期 |
| `is_published` | 是否发布 | 开启后前台可见 |

### 5.2 新闻发布建议

- `summary_zh`、`summary_ja`、`summary_en` 只写摘要，不要写太长。
- `content_zh`、`content_ja`、`content_en` 才是正文区域。
- `cover_image` 建议使用清晰横图，避免过小或拉伸。
- 发布时间建议按真实发布日期填写。

### 5.3 新闻正文粘贴注意事项

如果正文是普通文字：

- 直接粘贴纯文本或在编辑器中正常分段
- 不要手动补 HTML 标签

如果正文里要放表格：

- 可以直接粘贴整理后的表格内容
- 如果必须保留表格样式，建议使用完整表格代码，不要只粘贴半截标签

错误示例：

- `<p> &Phi;`
- 单独的 `<ul><li>...`
- 从 Word 直接复制导致的乱码标签

## 6. 首页首屏修改方法

进入：`Collections` -> `home_hero`

通常只保留一条正在使用的记录，并确保这一条 `is_published = true`。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `eyebrow_zh` | 顶部小标题中文 | 大标题上方的小字 |
| `eyebrow_ja` | 顶部小标题日文 | 日文站显示 |
| `eyebrow_en` | 顶部小标题英文 | 英文站显示 |
| `title_zh` | 主标题中文 | 首页首屏主标题 |
| `title_ja` | 主标题日文 | 日文站主标题 |
| `title_en` | 主标题英文 | 英文站主标题 |
| `description_zh` | 描述中文 | 主标题下方说明 |
| `description_ja` | 描述日文 | 日文站说明 |
| `description_en` | 描述英文 | 英文站说明 |
| `primary_cta_label_zh` | 主按钮中文 | 例如“联系我们” |
| `primary_cta_label_ja` | 主按钮日文 | 日文按钮文案 |
| `primary_cta_label_en` | 主按钮英文 | 英文按钮文案 |
| `primary_cta_href` | 主按钮链接 | 例如 `#contact` |
| `secondary_cta_label_zh` | 次按钮中文 | 例如“查看产品业绩” |
| `secondary_cta_label_ja` | 次按钮日文 | 日文按钮文案 |
| `secondary_cta_label_en` | 次按钮英文 | 英文按钮文案 |
| `secondary_cta_href` | 次按钮链接 | 例如 `#projects` |
| `highlights_zh` | 中文标签组 | JSON 数组 |
| `highlights_ja` | 日文标签组 | JSON 数组 |
| `highlights_en` | 英文标签组 | JSON 数组 |
| `stats_zh` | 中文统计项 | JSON 数组对象 |
| `stats_ja` | 日文统计项 | JSON 数组对象 |
| `stats_en` | 英文统计项 | JSON 数组对象 |
| `is_published` | 是否发布 | 开启后前台可见 |

### 6.1 `highlights_zh` / `highlights_ja` / `highlights_en` 填写示例

```json
["连铸设备", "连轧设备", "冷轧设备", "表面强化"]
```

### 6.2 `stats_zh` / `stats_ja` / `stats_en` 填写示例

```json
[
  { "value": "15吨", "label": "埋弧堆焊设备" },
  { "value": "3吨", "label": "明弧堆焊设备" },
  { "value": "3吨", "label": "埋弧堆焊设备" }
]
```

## 7. 企业简介修改方法

进入：`Collections` -> `home_about`

通常只保留一条正在使用的记录，并确保这一条 `is_published = true`。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `eyebrow_zh` | 区块小标题中文 | 例如“公司简介” |
| `eyebrow_ja` | 区块小标题日文 | 日文站显示 |
| `eyebrow_en` | 区块小标题英文 | 英文站显示 |
| `title_zh` | 企业简介主标题中文 | 公司简介大标题 |
| `title_ja` | 企业简介主标题日文 | 日文站大标题 |
| `title_en` | 企业简介主标题英文 | 英文站大标题 |
| `description_zh` | 中文正文 | 企业简介主文内容 |
| `description_ja` | 日文正文 | 日文站正文 |
| `description_en` | 英文正文 | 英文站正文 |
| `points_zh` | 中文要点 | JSON 数组 |
| `points_ja` | 日文要点 | JSON 数组 |
| `points_en` | 英文要点 | JSON 数组 |
| `badge_value` | 徽章主值 | 例如 `DALIAN` |
| `badge_label_zh` | 徽章说明中文 | 徽章下方说明 |
| `badge_label_ja` | 徽章说明日文 | 日文站说明 |
| `badge_label_en` | 徽章说明英文 | 英文站说明 |
| `stats_zh` | 中文统计项 | JSON 数组对象 |
| `stats_ja` | 日文统计项 | JSON 数组对象 |
| `stats_en` | 英文统计项 | JSON 数组对象 |
| `image_alt_zh` | 图片说明中文 | 图片替代文本 |
| `image_alt_ja` | 图片说明日文 | 日文替代文本 |
| `image_alt_en` | 图片说明英文 | 英文替代文本 |
| `is_published` | 是否发布 | 开启后前台可见 |

### 7.1 `points_zh` / `points_ja` / `points_en` 填写示例

```json
[
  "以质求生、以严求精、以诚求信是我公司的宗旨。",
  "高效率、低成本，为用户提供高质量的产品及服务是我公司的目标。",
  "用户的改进需求是我公司技术研发、创新的方向。"
]
```

### 7.2 `stats_zh` / `stats_ja` / `stats_en` 填写示例

```json
[
  { "value": "4000-5000", "label": "年堆焊能力" },
  { "value": "800-1000", "label": "年喷焊能力" }
]
```

## 8. 首页优势卡片修改方法

进入：`Collections` -> `advantages`

这里是多条记录模式，每一条代表一个卡片。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `title_zh` | 中文标题 | 卡片标题 |
| `title_ja` | 日文标题 | 日文站卡片标题 |
| `title_en` | 英文标题 | 英文站卡片标题 |
| `description_zh` | 中文说明 | 卡片正文 |
| `description_ja` | 日文说明 | 日文卡片正文 |
| `description_en` | 英文说明 | 英文卡片正文 |
| `sort_order` | 排序 | 数字越小越靠前 |
| `is_published` | 是否发布 | 开启后前台可见 |

建议：

- 当前首页建议保留 4 条优势卡片
- `sort_order` 可按 `1, 2, 3, 4` 排列

## 9. 工艺能力卡片修改方法

进入：`Collections` -> `capabilities`

这里是多条记录模式，每一条代表一个工艺卡片。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `title_zh` | 中文标题 | 工艺名称 |
| `title_ja` | 日文标题 | 日文工艺名称 |
| `title_en` | 英文标题 | 英文工艺名称 |
| `description_zh` | 中文说明 | 卡片说明文字 |
| `description_ja` | 日文说明 | 日文说明文字 |
| `description_en` | 英文说明 | 英文说明文字 |
| `icon_key` | 图标标识 | 不建议随意改动 |
| `preview_group` | 图片目录组 | 对应预览图片目录，不建议随意改动 |
| `sort_order` | 排序 | 数字越小越靠前 |
| `is_published` | 是否发布 | 开启后前台可见 |

当前 `preview_group` 对应关系：

| `preview_group` | 中文说明 |
| --- | --- |
| `maihu` | 埋弧堆焊 |
| `minghu` | 明弧堆焊 |
| `denglizi` | 等离子堆焊 |
| `huoyan` | 火焰喷焊 |
| `rechuli` | 热处理 |
| `zhijian` | 质检 |

重要说明：

- `icon_key` 和 `preview_group` 会影响卡片图标和悬浮图片
- 如果只是改文字，请不要动这两个字段

## 10. 产品业绩修改方法

进入：`Collections` -> `product_cases`

这里是多条记录模式，每一条代表一个产品分类。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `category_zh` | 中文分类名 | 如“连铸设备” |
| `category_ja` | 日文分类名 | 日文站分类名 |
| `category_en` | 英文分类名 | 英文站分类名 |
| `description_zh` | 中文说明 | 分类介绍 |
| `description_ja` | 日文说明 | 日文分类介绍 |
| `description_en` | 英文说明 | 英文分类介绍 |
| `tags_zh` | 中文标签组 | JSON 数组 |
| `tags_ja` | 日文标签组 | JSON 数组 |
| `tags_en` | 英文标签组 | JSON 数组 |
| `sort_order` | 排序 | 数字越小越靠前 |
| `is_published` | 是否发布 | 开启后前台可见 |

### 10.1 `tags_zh` / `tags_ja` / `tags_en` 示例

```json
["Cr13 系列", "Cr14 系列", "新制与修复"]
```

## 11. 合作亮点修改方法

进入：`Collections` -> `cooperation_highlights`

这里是多条记录模式，每一条代表一个说明卡片。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `name_zh` | 中文标题 | 卡片主标题 |
| `name_ja` | 日文标题 | 日文主标题 |
| `name_en` | 英文标题 | 英文主标题 |
| `role_zh` | 中文副标题 | 卡片副标题 |
| `role_ja` | 日文副标题 | 日文副标题 |
| `role_en` | 英文副标题 | 英文副标题 |
| `quote_zh` | 中文内容 | 说明文字 |
| `quote_ja` | 日文内容 | 日文说明文字 |
| `quote_en` | 英文内容 | 英文说明文字 |
| `sort_order` | 排序 | 数字越小越靠前 |
| `is_published` | 是否发布 | 开启后前台可见 |

## 12. 公司基础信息修改方法

进入：`Collections` -> `site_settings`

通常只需要维护一条记录。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `company_name_zh` | 公司中文名 | 头部与页面显示 |
| `company_name_ja` | 公司日文名 | 日文站显示 |
| `company_name_en` | 公司英文名 | 英文站显示 |
| `phone` | 电话 | 统一联系电话 |
| `email` | 邮箱 | 对外邮箱 |
| `address_zh` | 中文地址 | 中文站显示 |
| `address_ja` | 日文地址 | 日文站显示 |
| `address_en` | 英文地址 | 英文站显示 |
| `copyright_zh` | 中文版权信息 | 页脚显示 |
| `copyright_ja` | 日文版权信息 | 日文页脚显示 |
| `copyright_en` | 英文版权信息 | 英文页脚显示 |
| `icp` | 备案号 | 可选 |
| `map_url` | 地图链接 | 地图按钮跳转链接 |

## 13. 首页区块标题修改方法

进入：`Collections` -> `home_sections`

这里是首页区块标题和摘要，不是正文。

| 字段名 | 中文说明 | 填写建议 |
| --- | --- | --- |
| `key` | 区块标识 | 不建议修改 |
| `title_zh` | 中文标题 | 区块标题 |
| `title_ja` | 日文标题 | 日文区块标题 |
| `title_en` | 英文标题 | 英文区块标题 |
| `summary_zh` | 中文摘要 | 区块简述 |
| `summary_ja` | 日文摘要 | 日文区块简述 |
| `summary_en` | 英文摘要 | 英文区块简述 |
| `is_published` | 是否发布 | 开启后前台可见 |

当前常见 `key`：

| `key` | 对应位置 |
| --- | --- |
| `hero` | 首页首屏标题摘要 |
| `about` | 公司简介区块标题摘要 |

重要说明：

- `key` 是程序识别用的，不要改成别的词
- 如果改错，前台对应区块可能读取不到内容

## 14. 留言查看方法

进入：`Collections` -> `messages`

这里主要用于查看客户留言，不建议手动新增。

| 字段名 | 中文说明 |
| --- | --- |
| `name` | 联系人姓名 |
| `company` | 公司名称 |
| `email` | 邮箱 |
| `phone` | 电话 |
| `message` | 留言内容 |
| `locale` | 语言来源 |
| `is_processed` | 是否已处理 |

## 15. 发布完成后的检查清单

每次修改后，建议检查以下内容：

1. 点开前台首页，确认文字已经更新。
2. 如果修改的是新闻，检查新闻列表页和新闻详情页。
3. 检查中文站、日文站、英文站是否都正常。
4. 检查图片是否显示正常，是否变形。
5. 检查 `is_published` 是否误关。
6. 检查多条卡片的 `sort_order` 是否冲突。

## 16. 最容易出错的地方

### 16.1 新闻正文里出现代码或乱码

原因：

- 从 Word 直接复制了带格式内容
- 手动输入了不完整 HTML

处理方式：

- 删除异常标签后重新粘贴纯文本
- 表格内容建议先整理后再粘贴

### 16.2 改了内容但前台没变化

请检查：

1. 是否点了 `Save`
2. `is_published` 是否开启
3. 是否改到了正确的集合
4. 是否把 `key`、`icon_key`、`preview_group` 这类程序字段改错了

### 16.3 卡片顺序错乱

原因：

- `sort_order` 重复
- 数字填写不连续

建议：

- 统一按 `1, 2, 3, 4...` 排序

## 17. 给客户的简化操作建议

如果客户只做日常维护，建议只修改以下集合：

- `news`
- `site_settings`
- `home_about`
- `advantages`
- `product_cases`
- `cooperation_highlights`

以下字段不建议客户随意修改：

- `key`
- `icon_key`
- `preview_group`
- `slug`（已上线新闻）

## 18. 一句话记忆版

- 改新闻：进 `news`
- 改公司简介：进 `home_about`
- 改首页大标题：进 `home_hero`
- 改四个优势卡片：进 `advantages`
- 改产品分类：进 `product_cases`
- 改电话地址邮箱：进 `site_settings`

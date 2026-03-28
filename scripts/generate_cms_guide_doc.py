from __future__ import annotations

from pathlib import Path


OUTPUT_PATH = Path(r"C:\Users\Administrator\Desktop\后台发布说明-中英对照版.doc")


SECTIONS: list[tuple[str, object]] = [
    ("title", "大连博恒新技术有限公司"),
    ("subtitle", "后台发布说明（中英对照版）"),
    ("meta", "适用于 PocketBase 后台日常内容维护    版本日期：2026-03-28"),
    ("h1", "一、文档用途"),
    (
        "p",
        "这份说明给客户使用，帮助客户在后台发布新闻、修改首页内容、维护公司信息，并通过后台英文按钮快速对应中文操作。",
    ),
    (
        "p",
        "本说明尽量使用“后台英文名 + 中文解释 + 填写建议”的方式编写，适合英文不熟悉的操作人员。",
    ),
    ("h1", "二、后台常用英文按钮对照"),
    (
        "table",
        [
            ["后台英文", "中文说明", "用途"],
            ["Dashboard", "控制台", "后台首页"],
            ["Collections", "数据集合", "左侧所有内容分类"],
            ["New record", "新建记录", "新增一条内容"],
            ["Edit", "编辑", "修改当前内容"],
            ["Save", "保存", "保存当前修改"],
            ["Delete", "删除", "删除当前记录"],
            ["Search", "搜索", "查找内容"],
            ["Filter", "筛选", "按条件筛选"],
            ["Sort", "排序", "调整显示顺序"],
            ["Upload", "上传", "上传图片或文件"],
            ["Back", "返回", "返回上一页"],
        ],
    ),
    ("h1", "三、字段后缀说明"),
    (
        "table",
        [
            ["字段后缀", "中文说明", "备注"],
            ["_zh", "中文内容", "中文站使用"],
            ["_ja", "日文内容", "日文站使用"],
            ["is_published", "是否发布", "开启后前台可见"],
            ["sort_order", "排序值", "数字越小越靠前"],
        ],
    ),
    ("bullet", "is_published = true：前台显示"),
    ("bullet", "is_published = false：前台隐藏"),
    ("bullet", "sort_order 建议从 1 开始顺序填写"),
    ("bullet", "带 _zh 和 _ja 的内容，建议两边都填写完整再发布"),
    ("h1", "四、发布前通用原则"),
    ("number", "先编辑内容，再检查 is_published 是否开启。"),
    ("number", "多条卡片类内容要检查 sort_order，避免顺序混乱。"),
    ("number", "新闻 slug 一旦上线，尽量不要随意修改，否则原链接可能失效。"),
    ("number", "从 Word 复制内容时，建议先清理格式再粘贴，避免出现异常 HTML 标签。"),
    ("number", "如果只是普通正文，不要手动输入 <p>、<ul>、&Phi; 这一类代码。"),
    ("h1", "五、各集合对应的网站位置"),
    (
        "table",
        [
            ["集合名 Collection", "中文作用", "前台对应位置"],
            ["site_settings", "公司基础信息", "头部公司名、底部联系方式、地图链接"],
            ["home_sections", "首页分区标题摘要", "首页 Hero 和公司简介的区块标题"],
            ["home_hero", "首页首屏主视觉", "首页顶部大标题、按钮、统计项"],
            ["home_about", "企业简介", "首页公司简介区域"],
            ["advantages", "优势卡片", "首页四个优势卡片"],
            ["capabilities", "工艺能力卡片", "首页六个工艺/设备卡片"],
            ["product_cases", "产品业绩", "首页产品分类与标签"],
            ["cooperation_highlights", "合作亮点", "首页合作/能力说明卡片"],
            ["news", "新闻中心", "新闻列表页和新闻详情页"],
            ["messages", "留言信息", "客户提交的留言内容"],
        ],
    ),
    ("h1", "六、新闻发布方法"),
    ("p", "进入路径：Collections -> news"),
    ("h2", "1. 新建新闻时填写以下字段"),
    (
        "table",
        [
            ["字段名", "中文说明", "填写建议"],
            ["slug", "新闻链接标识", "只能用英文、小写、短横线，例如 new-surface-process"],
            ["title_zh", "中文标题", "新闻中文标题"],
            ["title_ja", "日文标题", "新闻日文标题"],
            ["summary_zh", "中文摘要", "列表页简介，建议 1-2 句"],
            ["summary_ja", "日文摘要", "日文列表页简介"],
            ["content_zh", "中文正文", "新闻详情正文"],
            ["content_ja", "日文正文", "日文详情正文"],
            ["cover_image", "封面图", "上传新闻封面图片"],
            ["published_at", "发布时间", "选择发布日期"],
            ["is_published", "是否发布", "开启后前台可见"],
        ],
    ),
    ("h2", "2. 新闻发布建议"),
    ("bullet", "summary_zh 和 summary_ja 只写摘要，不要写太长。"),
    ("bullet", "content_zh 和 content_ja 才是正文区域。"),
    ("bullet", "cover_image 建议使用清晰横图，避免过小或拉伸。"),
    ("bullet", "发布时间建议按真实发布日期填写。"),
    ("h2", "3. 新闻正文粘贴注意事项"),
    ("bullet", "正文是普通文字时，直接粘贴纯文本或在编辑器中正常分段。"),
    ("bullet", "不要手动补 HTML 标签。"),
    ("bullet", "如果正文里要放表格，可以直接粘贴整理后的表格内容。"),
    ("bullet", "如必须保留表格样式，建议使用完整表格代码，不要只粘贴半截标签。"),
    ("p", "错误示例：<p> &Phi;、单独的 <ul><li>...、从 Word 直接复制导致的乱码标签。"),
    ("h1", "七、首页首屏修改方法"),
    (
        "p",
        "进入路径：Collections -> home_hero。通常只保留一条正在使用的记录，并确保这一条 is_published = true。",
    ),
    (
        "table",
        [
            ["字段名", "中文说明", "填写建议"],
            ["eyebrow_zh / eyebrow_ja", "顶部小标题", "大标题上方的小字"],
            ["title_zh / title_ja", "主标题", "首页首屏主标题"],
            ["description_zh / description_ja", "描述", "主标题下方说明"],
            ["primary_cta_label_zh / primary_cta_label_ja", "主按钮文案", "例如“联系我们”"],
            ["primary_cta_href", "主按钮链接", "例如 #contact"],
            ["secondary_cta_label_zh / secondary_cta_label_ja", "次按钮文案", "例如“查看产品业绩”"],
            ["secondary_cta_href", "次按钮链接", "例如 #projects"],
            ["highlights_zh / highlights_ja", "标签组", "JSON 数组"],
            ["stats_zh / stats_ja", "统计项", "JSON 数组对象"],
            ["is_published", "是否发布", "开启后前台可见"],
        ],
    ),
    ("p", 'highlights 示例：["连铸设备", "连轧设备", "冷轧设备", "表面强化"]'),
    (
        "p",
        'stats 示例：[{"value":"15吨","label":"埋弧堆焊设备"},{"value":"3吨","label":"明弧堆焊设备"}]',
    ),
    ("h1", "八、企业简介修改方法"),
    (
        "p",
        "进入路径：Collections -> home_about。通常只保留一条正在使用的记录，并确保这一条 is_published = true。",
    ),
    (
        "table",
        [
            ["字段名", "中文说明", "填写建议"],
            ["eyebrow_zh / eyebrow_ja", "区块小标题", "例如“公司简介”"],
            ["title_zh / title_ja", "企业简介主标题", "公司简介大标题"],
            ["description_zh / description_ja", "正文", "企业简介主文内容"],
            ["points_zh / points_ja", "要点", "JSON 数组"],
            ["badge_value", "徽章主值", "例如 DALIAN"],
            ["badge_label_zh / badge_label_ja", "徽章说明", "徽章下方说明"],
            ["stats_zh / stats_ja", "统计项", "JSON 数组对象"],
            ["image_alt_zh / image_alt_ja", "图片说明", "图片替代文本"],
            ["is_published", "是否发布", "开启后前台可见"],
        ],
    ),
    (
        "p",
        'points 示例：["以质求生、以严求精、以诚求信是我公司的宗旨。", "高效率、低成本，为用户提供高质量的产品及服务是我公司的目标。"]',
    ),
    ("p", 'stats 示例：[{"value":"4000-5000","label":"年堆焊能力"},{"value":"800-1000","label":"年喷焊能力"}]'),
    ("h1", "九、首页其他常改内容"),
    ("h2", "1. 优势卡片：Collections -> advantages"),
    ("bullet", "每一条记录代表一个卡片。"),
    ("bullet", "主要字段：title_zh、title_ja、description_zh、description_ja、sort_order、is_published。"),
    ("bullet", "建议首页保留 4 条，sort_order 用 1、2、3、4。"),
    ("h2", "2. 工艺能力卡片：Collections -> capabilities"),
    ("bullet", "每一条记录代表一个工艺卡片。"),
    ("bullet", "主要字段：title、description、sort_order、is_published。"),
    ("bullet", "icon_key 和 preview_group 不建议随意改动，否则会影响图标和悬浮图片。"),
    (
        "p",
        "当前 preview_group 对应：maihu=埋弧堆焊，minghu=明弧堆焊，denglizi=等离子堆焊，huoyan=火焰喷焊，rechuli=热处理，zhijian=质检。",
    ),
    ("h2", "3. 产品业绩：Collections -> product_cases"),
    ("bullet", "每一条记录代表一个产品分类。"),
    ("bullet", "主要字段：category_zh、category_ja、description_zh、description_ja、tags_zh、tags_ja、sort_order、is_published。"),
    ("p", 'tags 示例：["Cr13 系列", "Cr14 系列", "新制与修复"]'),
    ("h2", "4. 合作亮点：Collections -> cooperation_highlights"),
    ("bullet", "每一条记录代表一个说明卡片。"),
    ("bullet", "主要字段：name_zh、name_ja、role_zh、role_ja、quote_zh、quote_ja、sort_order、is_published。"),
    ("h2", "5. 公司基础信息：Collections -> site_settings"),
    ("bullet", "通常只需要维护一条记录。"),
    ("bullet", "可修改公司名称、电话、邮箱、地址、版权信息、地图链接。"),
    ("h2", "6. 首页区块标题：Collections -> home_sections"),
    ("bullet", "这里只是区块标题和摘要，不是正文。"),
    ("bullet", "key 是程序识别字段，不建议修改。"),
    ("bullet", "常见 key：hero、about。"),
    ("h1", "十、留言查看方法"),
    ("p", "进入路径：Collections -> messages。这里主要用于查看客户留言，不建议手动新增。"),
    (
        "table",
        [
            ["字段名", "中文说明"],
            ["name", "联系人姓名"],
            ["company", "公司名称"],
            ["email", "邮箱"],
            ["phone", "电话"],
            ["message", "留言内容"],
            ["locale", "语言来源"],
            ["is_processed", "是否已处理"],
        ],
    ),
    ("h1", "十一、发布完成后的检查清单"),
    ("number", "点开前台首页，确认文字已经更新。"),
    ("number", "如果修改的是新闻，检查新闻列表页和新闻详情页。"),
    ("number", "检查中文站和日文站是否都正常。"),
    ("number", "检查图片是否显示正常，是否变形。"),
    ("number", "检查 is_published 是否误关。"),
    ("number", "检查多条卡片的 sort_order 是否冲突。"),
    ("h1", "十二、最容易出错的地方"),
    ("h2", "1. 新闻正文里出现代码或乱码"),
    ("bullet", "原因：从 Word 直接复制了带格式内容，或手动输入了不完整 HTML。"),
    ("bullet", "处理：删除异常标签后重新粘贴纯文本，表格内容建议先整理后再粘贴。"),
    ("h2", "2. 改了内容但前台没变化"),
    ("number", "检查是否点了 Save。"),
    ("number", "检查 is_published 是否开启。"),
    ("number", "检查是否改到了正确的集合。"),
    ("number", "检查是否把 key、icon_key、preview_group 这类程序字段改错了。"),
    ("h2", "3. 卡片顺序错乱"),
    ("bullet", "原因：sort_order 重复，或数字填写不连续。"),
    ("bullet", "建议：统一按 1、2、3、4…… 排序。"),
    ("h1", "十三、给客户的简化建议"),
    ("p", "如果客户只做日常维护，建议优先修改以下集合：news、site_settings、home_about、advantages、product_cases、cooperation_highlights。"),
    ("p", "以下字段不建议客户随意修改：key、icon_key、preview_group、slug（已上线新闻）。"),
    ("h1", "十四、一句话记忆版"),
    ("bullet", "改新闻：进 news"),
    ("bullet", "改公司简介：进 home_about"),
    ("bullet", "改首页大标题：进 home_hero"),
    ("bullet", "改四个优势卡片：进 advantages"),
    ("bullet", "改产品分类：进 product_cases"),
    ("bullet", "改电话地址邮箱：进 site_settings"),
]


def rtf_escape(text: str) -> str:
    result: list[str] = []
    for char in text:
        code = ord(char)
        if char == "\\":
            result.append(r"\\")
        elif char == "{":
            result.append(r"\{")
        elif char == "}":
            result.append(r"\}")
        elif char == "\n":
            result.append(r"\line ")
        elif 32 <= code <= 126:
            result.append(char)
        else:
            if code > 32767:
                code -= 65536
            result.append(rf"\u{code}?")
    return "".join(result)


def para(text: str, *, font_size: int = 22, bold: bool = False, align: str = "l", space_after: int = 120) -> str:
    align_map = {"l": r"\ql", "c": r"\qc", "r": r"\qr", "j": r"\qj"}
    align_prefix = align_map.get(align, r"\ql")
    bold_on = r"\b " if bold else ""
    bold_off = r"\b0 " if bold else ""
    return (
        rf"{{\pard{align_prefix}\sa{space_after}\fs{font_size}"
        rf"{bold_on}{rtf_escape(text)}{bold_off}\par}}"
    )


def bullet(text: str) -> str:
    return para(f"• {text}", font_size=22, align="l", space_after=60)


def number(index: int, text: str) -> str:
    return para(f"{index}. {text}", font_size=22, align="l", space_after=60)


def table(rows: list[list[str]]) -> str:
    output: list[str] = []
    for row_index, row in enumerate(rows):
        joined = "    |    ".join(row)
        output.append(
            para(
                joined,
                font_size=21,
                bold=row_index == 0,
                align="l",
                space_after=40,
            )
        )
    output.append(para("", font_size=8, space_after=60))
    return "".join(output)


def build_document() -> str:
    parts = [
        r"{\rtf1\ansi\ansicpg936\deff0",
        r"{\fonttbl{\f0\fnil\fcharset134 Microsoft YaHei;}{\f1\fnil\fcharset0 Calibri;}}",
        r"\viewkind4\uc1\pard\f0",
        para(SECTIONS[0][1], font_size=36, bold=True, align="c", space_after=80),
        para(SECTIONS[1][1], font_size=32, bold=True, align="c", space_after=80),
        para(SECTIONS[2][1], font_size=20, align="c", space_after=220),
    ]

    number_index = 0
    for kind, content in SECTIONS[3:]:
        if kind == "h1":
            number_index = 0
            parts.append(para(str(content), font_size=28, bold=True, align="l", space_after=100))
        elif kind == "h2":
            number_index = 0
            parts.append(para(str(content), font_size=24, bold=True, align="l", space_after=80))
        elif kind == "p":
            parts.append(para(str(content), font_size=22, align="j", space_after=80))
        elif kind == "bullet":
            parts.append(bullet(str(content)))
        elif kind == "number":
            number_index += 1
            parts.append(number(number_index, str(content)))
        elif kind == "table":
            parts.append(table(content))

    parts.append("}")
    return "".join(parts)


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(build_document(), encoding="utf-8")
    print(OUTPUT_PATH)


if __name__ == "__main__":
    main()

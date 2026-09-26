# 超星学习通自动化助手

> 基于 DeepSeek 原生多模态的学习通自动刷课/答题用户脚本

[![Version](https://img.shields.io/badge/version-2.3.1-blue)](https://github.com/Khihl-lucky/ChaoXing-AutoAnswer)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/Khihl-lucky/ChaoXing-AutoAnswer/blob/main/LICENSE)

## 简介

超星学习通自动化助手是一款运行在 [Tampermonkey](https://www.tampermonkey.net/)（油猴）上的用户脚本，专为超星学习通平台设计。默认使用 DeepSeek 官方的 `deepseek-flash` 模型：纯文本题快速作答，图片题自动截图交给它原生视觉理解；也可在设置中切换到 `deepseek-v4-pro` 获得更强的纯文本推理——**只需一个 DeepSeek API Key**。

**你需要自己准备 DeepSeek 的 API Key**，脚本本身免费且开源。

> v2.2.0 起，DeepSeek 原生多模态（Vision）已正式可用，脚本不再依赖第三方多模态服务，原先的 Kimi 配置已全部移除。

## 更新日志

### v2.3.1

- **变更**：脚本文件更名为 `chaoxing-autoanswer.user.js`，符合油猴对 `.user.js` 后缀的识别规则，从链接打开即可触发自动安装
- **新增**：补充 `@downloadURL` / `@updateURL` / `@supportURL`，装一次之后版本更新可由油猴自动检测
- 若你此前是通过链接安装的旧文件名版本，请用新链接重装一次；脚本内的 `@name` 未变，Tampermonkey 会提示覆盖更新

### v2.3.0

- **修复**：`/knowledge/cards` 空白页卡死。`_logP` 原先定义在脚本后段，而该分支为同步执行，会先一步访问 `_logP.NAV` 抛 `TypeError`，导致随后的 `toNext()` 不执行、脚本停在该页不再跳转。现将日志配置前移至文件顶部（[chaoxing-autoanswer.user.js](chaoxing-autoanswer.user.js)）
- **修复**：浮窗收起后无法拖动、点击展开展开时好时坏。最小化状态下拖动被 `#ne-21close` 守卫拦截；补上 4px 拖动阈值后，点击不再被手抖产生的 mousemove 吞掉；收起/展开收敛为单一状态入口
- **优化**：拖动起始坐标改取未缩放的计算样式，消除浮动球 hover 缩放导致的起始跳变；位置持久化改用拖动过程中维护的坐标，避免刷新后位置回跳
- **优化**：补充拖动中断兜底（拖到窗口外松手不再让浮窗"粘"在鼠标上）
- **变更**：浮窗状态栏模型显示统一为「DeepSeek 多模态」

### v2.2.0

- 接入 DeepSeek 原生多模态（Vision）：图片题改由 `deepseek-flash` 识别，移除 Kimi 相关配置与代码
- 默认模型改为 `deepseek-flash`；新增「图片题处理」与「多模态模型」设置项
- 升级时自动清理 v2.1.0 遗留的 Kimi 配置

## 核心功能

### 全任务类型自动处理

| 任务类型 | 处理方式 | 说明 |
|----------|----------|------|
| 视频/音频 | 自动播放 + 倍速 + 静音 | 支持1~2×调速，人脸识别弹窗检测，完成状态轮询 |
| 测验/作业 | AI 搜题 + 自动作答 | 精确匹配 → Levenshtein模糊 → 字母回退，三级策略 |
| 文档/PPT | 模拟翻阅 + 自动提交 | 递归iframe逐屏滚动，触底后提交，DOM实时刷新 |
| 阅读 | 逐屏滚动 + 自动提交 | 与文档类似，超时/跨域降级为直接提交 |
| 读书 | API提交 | 调用读书任务接口 |
| 直播 | 回放进度模拟 | 支持进度上报，时长达标自动跳过 |
| 速课 | API提交 | 快速完成微课程任务 |
| 讨论区 | AI自动回复 | 全网首个实现讨论区AI自动回复的脚本 |
| 考试 | AI搜题自动作答 | 整卷预览模式，支持答题后自动跳转 |

### 智能防卡死

- 视频人脸识别弹窗检测，暂停播放等待用户操作
- 任务完成状态轮询（最多3次，5秒间隔）
- 文档翻阅45秒超时保护
- 跨域iframe检测与降级策略
- **跳过任务按钮**：卡死时可手动跳过当前任务点

### UI与交互

- **Liquid Glass UI v3.0**：iOS 26 液态毛玻璃风格浮窗
  - 边缘折射光晕、SVG 噪点纹理、多层光影堆叠
  - 最小化为 36px 毛玻璃浮动球，可拖拽/点击展开
  - 按钮涟漪效果、蓝紫/红色光泽 hover 微交互
  - 状态指示灯根据 API 配置自动变色（绿/灰白）
  - 自定义 iOS 风格 Toggle 开关，绿色渐变光晕
  - 输入框蓝色焦点环、设置项逐条入场动画
- **统一日志系统**：`[模块] [状态] 消息` 格式，7 级颜色语义
  - `[完成]` 绿色 | `[错误]` 红色 | `[跳过]` 橙色 | `[警告]` 黄色 | `[信息]` 蓝色 | `[启动]` 紫色 | `[忽略]` 灰色
  - 日志条目左侧色彩条 + 入场动画 + 自动滚动
  - AI 思考过程可折叠，展开可见所用模型与题目截图
- 设置面板：6 个 emoji 分组（🤖 DeepSeek / 👁️ 原生多模态 / 🎬 视频音频 / 📝 答题 / 📋 测验考试 / ⚙️ 模式）
- 浮窗全局禁止文字选中（日志区除外），体验接近原生 App
- 位置/状态持久化，刷新后保持

## 快速开始

### 1. 安装油猴插件

前往 [Tampermonkey 官网](https://www.tampermonkey.net/) 安装对应浏览器的扩展。

### 2. 安装脚本

点击下面的链接即可自动唤起 Tampermonkey 安装（文件名带 `.user.js` 后缀，油猴会识别为可安装脚本）：

**[➡️ 点此安装 chaoxing-autoanswer.user.js](https://raw.githubusercontent.com/Khihl-lucky/ChaoXing-AutoAnswer/main/chaoxing-autoanswer.user.js)**

也可以从 [Releases](https://github.com/Khihl-lucky/ChaoXing-AutoAnswer/releases) 下载后手动导入，或复制源码在 Tampermonkey 管理面板中新建脚本粘贴。

> 脚本头部已写入 `@downloadURL` / `@updateURL`，安装一次后新版本可由油猴自动检测更新。

### 3. 配置 API 密钥

打开脚本浮窗 → 点击 **设置** → 填写 API 密钥：

| 配置项 | 说明 | 获取地址 |
|--------|------|----------|
| DeepSeek API Key | 文本题与图片题共用，一个 Key 即可 | [platform.deepseek.com](https://platform.deepseek.com) |

### 4. 开始使用

打开超星学习通课程页面，脚本会自动检测任务点并开始处理。日志会实时显示在浮窗面板中。

## 配置项说明

### DeepSeek 配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| API 密钥 | DeepSeek 平台获取的 sk- 开头的密钥 | - |
| API 地址 | DeepSeek API 端点 | `https://api.deepseek.com` |
| 文本模型 | `deepseek-flash`（默认，快速且支持图片）/ `deepseek-v4-pro`（强力，纯文本） | `deepseek-flash` |
| 图片题处理 | `自动路由`（推荐）/ `总是用多模态` / `只用文本模型` | `自动路由` |
| 多模态模型 | 视觉模型名，官方当前为 `deepseek-flash`（唯一支持图片理解） | `deepseek-flash` |

#### 模型与视觉能力对照（官方信息）

| 模型名 | 模型版本 | Context | Vision（图片） | 脚本默认 |
|--------|----------|---------|----------------|----------|
| `deepseek-flash` | DeepSeek-V4.1-Flash | 1M | ✅ 支持 | ✔ 文本与图片均默认使用 |
| `deepseek-v4-pro` | DeepSeek-V4-Pro-0813 | 1M | ❌ 不支持 | 可选，切到它后图片题仍由 `deepseek-flash` 处理 |

> 旧的 `deepseek-v4-flash` 与 `deepseek-v4-flash-vision-exp` 已被官方退役，请求仍会被接受并由 DeepSeek-V4.1-Flash 承接计费，建议直接使用 `deepseek-flash`。脚本已将旧名一并视为支持视觉，便于使用第三方中转地址时兼容。

#### 图片题处理方式

| 模式 | 行为 | 适用场景 |
|------|------|----------|
| 自动路由 | 图片题 → 多模态模型；纯文本题 → 文本模型 | 推荐，兼顾成本与准确率 |
| 总是用多模态 | 所有题目都走多模态模型 | 题目普遍含图、公式、图表 |
| 只用文本模型 | 不做视觉识别，图片标签转为 `[图片]` 文本 | 只用纯文本模型，或想省 token |

> 若被路由到不支持视觉的模型却带着图片，脚本会自动改用多模态模型并记录警告，避免接口直接返回 400。

#### 图片参数细节

- 截图以 base64 `data:image/png` 内联在 user 消息的 `content` 数组中（OpenAI 兼容格式）
- 使用 `detail: "high"` 保留原始分辨率，截图中的小字与公式更易识别
- 图片只能放在 `user` 消息中，放 `system`/`assistant` 会被官方 API 以 400 拒绝
- 单张图片 base64 上限 32 MiB，请求体上限 48 MiB；每张图片计费上限 1024 tokens

### 视频/音频

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 播放倍速 | 视频/音频播放速度 | `1×` |
| 处理视频 | 是否自动处理视频任务 | 开启 |
| 处理音频 | 是否自动处理音频任务 | 开启 |
| 复习模式 | 补挂视频时长，不跳过已完成视频 | 关闭 |

### 答题行为

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 搜题间隔 | 两次AI请求之间的最小间隔（秒） | `0` |
| 好学生模式 | 仅加粗答案，不自动选择 | 关闭 |
| 答案插入题目后 | 将AI答案插入题目下方 | 开启 |
| 相似度匹配 | Levenshtein模糊匹配答案 | 开启 |

### 测验/考试

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 测验自动提交 | 答题完成后自动提交 | 关闭 |
| 强制提交 | 无论是否作答完毕都提交 | 关闭 |
| 考试自动跳转 | 答完一题后自动跳转下一题 | 关闭 |

### 模式开关

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 重做模式 | 不跳过已作答的题目 | 关闭 |
| 仅处理任务点 | 跳过非任务点题目 | 开启 |

## 项目结构

```
学习通脚本/
├── chaoxing-autoanswer.user.js   # 主脚本（~5600行，油猴可直接安装）
└── README.md                     # 项目文档
```

## 技术亮点

- **原生多模态分流**：同一个 DeepSeek Key，默认全程使用 `deepseek-flash`；切到 `deepseek-v4-pro` 后纯文本走 pro、图片题截图仍自动交给 `deepseek-flash` 视觉理解
- **三级答案匹配**：精确匹配 → Levenshtein编辑距离 → 字母回退
- **字体解密**：内置Typr.js + MD5，解密超星 `font-cxsecret` 字体混淆
- **跨iframe递归**：深层iframe（3层）逐屏滚动模拟，文档触底自动提交
- **任务跳过**：`postMessage` 跨窗口通信，父窗口一键跳过iframe中的卡死任务
- **DOM状态同步**：手动标记 `ans-job-finished`，无需刷新页面即可检测完成状态

## 常见问题

**Q: 文档/PPT任务卡住了怎么办？**

A: 点击浮窗中的红色 **跳过任务** 按钮，脚本会跳过当前任务并自动进入下一个。

**Q: 为什么API请求失败？**

A: 检查日志面板中的错误信息。常见原因：API Key 无效、余额不足、网络代理问题。

**Q: 图片题识别不出来？**

A: 确认「图片题处理」不是「只用文本模型」，且「多模态模型」为 `deepseek-flash`（`deepseek-v4-pro` 不支持图片）。若报 400，通常是模型名不支持视觉，脚本一般会自动改用多模态模型并在日志中给出警告。

**Q: 视频为什么没有倍速播放？**

A: 部分超星视频禁用了倍速菜单，脚本会自动回退到1×以避免进度被清空。

**Q: 考试能自动提交吗？**

A: 当前仅支持整卷预览模式的考试自动答题，不支持自动交卷。答题完成后请人工核对。

**Q: 从 v2.1.0 升级需要改什么？**

A: 无需改代码。旧的 Kimi 配置项已从脚本中移除，设置里只需保留 DeepSeek API Key 即可；图片题会自动改由 `deepseek-flash` 处理。

## 开发

```bash
# 直接编辑 chaoxing-autoanswer.user.js
# 在Tampermonkey中加载本地文件即可调试
```

## 免责声明

本项目仅用于学习与研究目的，包括但不限于脚本调试、前端自动化研究和页面行为分析。使用者应遵守目标平台的使用规定，不得将本项目用于任何违反相关服务条款的行为。因不当使用本项目而产生的一切后果，由使用者自行承担，项目作者不对此负责。

## 致谢

- 原作者 [Ne-21](https://scriptcat.org/en/users/227) — 脚本基础架构
- [DeepSeek](https://www.deepseek.com/) — 文本推理与原生多模态视觉模型
- DeepSeek Harness — AI 辅助开发

## 参考资料

- [DeepSeek 模型与定价](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
- [DeepSeek Vision 图片输入指南](https://api-docs.deepseek.com/zh-cn/guides/vision)

## 许可证

MIT © [Khihl-lucky](https://github.com/Khihl-lucky)

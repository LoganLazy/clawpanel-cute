import{r as ze}from"./markdown-DqCdLfO3.js";import{a as C,t as Z,b as O,s as me}from"./index-ZS5CnNlZ.js";import{showConfirm as pt}from"./modal-DK6Az47R.js";import{Q as $e,P as Mt,A as os,f as is}from"./model-presets-C_GYMLJU.js";const rs=`
# OpenClaw 知识库（内置参考）

## 一、架构概览
OpenClaw 是开源个人 Girl Star平台，核心组件：
- **Gateway 网关**：核心后端服务，处理消息路由、Agent 执行、渠道连接
- **CLI**：命令行工具，用于安装/配置/管理 OpenClaw
- **Agent（智能体）**：独立的 AI 角色实例，有自己的工作区、身份、模型配置
- **Workspace（工作区）**：Agent 的个性化存储（Skills、提示、记忆）
- **Channel（渠道）**：消息通道（WhatsApp/Telegram/Discord/Mattermost 等）
- **Control UI / Dashboard**：内置 Web 管理界面，端口 18789

## 二、目录结构
\`\`\`
~/.openclaw/
├── openclaw.json          # 主配置文件（JSON5，支持注释）
├── .env                   # 全局环境变量
├── workspace/             # 默认(main) Agent 的工作区
│   ├── IDENTITY.md        # Agent 身份定义
│   ├── SOUL.md            # Agent 灵魂/人格
│   ├── USER.md            # 用户信息
│   ├── AGENTS.md          # 操作规则
│   └── ...                # Skills、记忆等
├── agents/
│   ├── main/
│   │   └── agent/
│   │       ├── auth-profiles.json   # 认证配置（OAuth + API Key）
│   │       ├── models.json          # 模型提供商配置
│   │       └── auth.json            # 运行时认证缓存（自动管理）
│   └── <agentId>/
│       ├── agent/                   # 同上
│       └── workspace/              # 自定义 Agent 的工作区
├── credentials/
│   ├── oauth.json                  # 旧版 OAuth 导入
│   ├── whatsapp/<accountId>/       # WhatsApp 凭证
│   └── <channel>-allowFrom.json   # 配对白名单
└── logs/                           # 日志文件
\`\`\`

**重要路径规则：**
- main Agent 工作区：\`~/.openclaw/workspace\`（根级别）
- 自定义 Agent 工作区：\`~/.openclaw/agents/<agentId>/workspace\`
- Agent 配置目录：\`~/.openclaw/agents/<agentId>/agent/\`

## 三、CLI 常用命令
| 命令 | 说明 |
|------|------|
| \`openclaw onboard\` | 新手引导向导（推荐首次使用） |
| \`openclaw onboard --install-daemon\` | 引导 + 安装后台服务 |
| \`openclaw setup\` | 初始化/配置工作区 |
| \`openclaw gateway\` | 启动 Gateway（前台） |
| \`openclaw gateway --port 18789 --verbose\` | 指定端口启动 |
| \`openclaw gateway status\` | 查看 Gateway 状态 |
| \`openclaw dashboard\` | 打开 Web Dashboard |
| \`openclaw status\` | 系统状态概览 |
| \`openclaw status --all\` | 完整调试报告（可粘贴） |
| \`openclaw health\` | 健康检查 |
| \`openclaw doctor\` | 诊断配置问题 |
| \`openclaw doctor --fix\` | 自动修复配置问题 |
| \`openclaw security audit --deep\` | 深度安全审计 |
| \`openclaw channels login\` | 登录渠道（如 WhatsApp QR） |
| \`openclaw pairing list <channel>\` | 列出配对请求 |
| \`openclaw pairing approve <channel> <code>\` | 批准配对 |
| \`openclaw configure --section web\` | 配置 Web 搜索（Brave API） |
| \`openclaw config set <key> <value>\` | 设置单个配置项 |
| \`openclaw logs\` | 查看日志 |
| \`openclaw service start/stop/restart\` | 管理后台服务 |
| \`openclaw message send --target <num> --message "text"\` | 发送测试消息 |

## 四、配置文件（openclaw.json）
配置位于 \`~/.openclaw/openclaw.json\`，JSON5 格式（支持注释和尾逗号）。
不存在时使用安全默认值。严格 schema 验证，未知键会阻止启动。

### 最小配置示例
\`\`\`json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace"
    }
  },
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"]
    }
  }
}
\`\`\`

### 关键配置项
- **agents.defaults.workspace** — 默认工作区路径
- **agents.defaults.model.primary** — 默认模型（格式 "provider/model"）
- **agents.defaults.sandbox** — 沙箱配置（mode: "off"|"non-main"|"all"）
- **agents.list[]** — 多 Agent 配置（id, name, workspace, model, identity, groupChat, sandbox）
- **channels.whatsapp** — WhatsApp（allowFrom, groups, dmPolicy, accounts）
- **channels.telegram** — Telegram Bot
- **channels.discord** — Discord Bot
- **channels.mattermost** — Mattermost 插件
- **gateway.auth.token** — Gateway 认证令牌
- **gateway.port** — Gateway 端口（默认 18789）
- **models.providers** — 自定义模型提供商（baseUrl, apiKey, api, models[]）
- **env.vars** — 内联环境变量
- **bindings[]** — 消息路由绑定（channel→agentId）

### 配置管理 RPC
- \`config.get\` — 获取当前配置（含 hash）
- \`config.apply\` — 全量替换配置并重启（需 baseHash）
- \`config.patch\` — 部分更新配置并重启（JSON merge patch 语义）
- \`config.schema\` — 获取配置的 JSON Schema

### 环境变量
- \`~/.openclaw/.env\` — 全局 .env
- 配置中支持 \`\${VAR_NAME}\` 语法引用环境变量
- env.shellEnv.enabled=true 可从 shell 导入环境变量

## 五、多 Agent 路由
\`\`\`json5
{
  agents: {
    list: [
      { id: "main", workspace: "~/.openclaw/workspace", sandbox: { mode: "off" } },
      { id: "helper", name: "Helper Bot", workspace: "~/.openclaw/agents/helper/workspace" }
    ]
  },
  bindings: [
    { match: { channel: "telegram" }, agentId: "helper" },
    { match: { channel: "whatsapp" }, agentId: "main" }
  ]
}
\`\`\`
- main Agent 的工作区默认 \`~/.openclaw/workspace\`
- 其他 Agent 默认 \`~/.openclaw/workspace-<agentId>\`
- Agent 配置目录固定为 \`~/.openclaw/agents/<agentId>/agent/\`

## 六、模型配置
模型配置存储在 \`~/.openclaw/agents/<agentId>/agent/models.json\`。
也可在 openclaw.json 的 \`models.providers\` 中定义自定义提供商。

自定义提供商示例：
\`\`\`json5
{
  models: {
    providers: {
      "my-proxy": {
        baseUrl: "http://localhost:4000/v1",
        apiKey: "sk-...",
        api: "openai-completions",
        models: [
          { id: "gpt-4o", name: "GPT-4o", reasoning: false, input: ["text", "image"],
            contextWindow: 128000, maxTokens: 16384 }
        ]
      }
    }
  },
  agents: {
    defaults: {
      model: { primary: "my-proxy/gpt-4o" }
    }
  }
}
\`\`\`

## 七、认证
- **OAuth（推荐）**：通过 \`openclaw onboard\` 设置，支持 Anthropic、OpenAI Codex
- **API Key**：直接在 auth-profiles.json 或环境变量中设置
- **凭证位置**：\`~/.openclaw/agents/<agentId>/agent/auth-profiles.json\`
- **旧版导入**：\`~/.openclaw/credentials/oauth.json\`

## 八、安装
**macOS/Linux：**
\`\`\`bash
curl -fsSL https://openclaw.ai/install.sh | bash
\`\`\`
**Windows（WSL2 推荐）：**
\`\`\`powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
\`\`\`
**npm 全局安装：**
\`\`\`bash
npm install -g openclaw@latest
\`\`\`
**前置条件：** Node.js >= 22

## 九、后台服务
- **macOS**：launchd 服务（openclaw 应用管理）
- **Linux**：systemd 用户服务（需 \`sudo loginctl enable-linger $USER\`）
- **Windows**：WSL2 内运行 Linux 步骤

## 十、渠道配置
### WhatsApp
- \`openclaw channels login\` → 扫描 QR 登录
- 配置 allowFrom 白名单限制私聊
- groups 配置群组行为（requireMention 等）
- 首次私信会返回配对码，需 approve

### Telegram
- 使用 Bot Token
- \`channels.telegram.tokenFile\` 或环境变量
- 群组支持 @提及触发

### Discord
- 使用 Bot Token
- 环境变量或配置中设置
- 支持 guild 级别配置

## 十一、故障排查
1. \`openclaw doctor\` — 诊断所有已知问题
2. \`openclaw doctor --fix\` — 自动修复
3. \`openclaw status --all\` — 完整状态报告
4. \`openclaw health\` — 健康检查
5. \`openclaw logs\` — 查看日志
6. 配置验证失败 → Gateway 拒绝启动，仅允许诊断命令
7. WhatsApp 不回消息 → 检查配对是否已 approve
8. 认证错误 → 检查 auth-profiles.json 或重新 \`openclaw onboard\`

## 十二、ClawStar 公益 AI 接口计划
ClawStar 项目组正式开放公益 AI 接口测试计划，降低用户接入 AI 能力的门槛。

### 核心信息
- **GPT-AI 网关地址**：https://gpt.qt.cool/v1
- **支持接口**：/v1/chat/completions、/v1/responses（OpenAI 兼容）
- **支持模型**：OpenAI 全系列（GPT-5、GPT-5.1、GPT-5.2 及其 Codex 变体）
- **费用**：测试期间所有调用成本由项目组内部承担，用户无需付费
- **限制**：无请求限制
- **用户后台**：https://gpt.qt.cool/user（查看用量、提交工单）

### 官方入口
- **ClawStar 项目主页**：https://github.com/LoganLazy/clawpanel-cute
- **GPT-AI 网关官网**：https://gpt.qt.cool/
- **用户后台**：https://gpt.qt.cool/user
- **晴辰导航站**：https://qt.cool/

### 测试密钥
- ClawStar 已内置公共体验密钥，开箱即用
- 用户也可前往 gpt.qt.cool 签到获取独立密钥
- 独立密钥可在用户后台管理和查询用量

### 接入方式
已兼容 OpenAI API 的项目，只需替换：
1. Base URL → https://gpt.qt.cool/v1
2. API Key → 测试密钥
即可完成接入。

### 在 ClawStar 中配置
- **助手设置**：打开 Girl Star设置 → 模型配置 → 使用「一键接入」按钮
- **模型配置页**：进入模型配置 → 使用「一键添加全部模型」按钮
- 两处均自动填入网关地址和内置密钥
`.trim(),Wt="clawpanel-assistant",Kt="clawpanel-assistant-sessions",Ot=50;async function ls(e,t){try{await C.saveImage(e,t)}catch(s){console.warn("图片保存失败:",s)}}async function cs(e){try{return await C.loadImage(e)}catch{return null}}const Ft={chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>',execute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',unlimited:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"/></svg>'},Oe={chat:{label:"聊天",desc:"纯对话，不调用任何工具",tools:!1,readOnly:!1,confirmDanger:!0,accent:"var(--text-secondary)"},plan:{label:"规划",desc:"可调用工具分析，但不修改文件",tools:!0,readOnly:!0,confirmDanger:!0,accent:"var(--info)"},execute:{label:"执行",desc:"完整工具权限，危险操作需确认",tools:!0,readOnly:!1,confirmDanger:!0,accent:"var(--accent)"},unlimited:{label:"无限",desc:"最大权限，工具调用无需确认",tools:!0,readOnly:!1,confirmDanger:!1,accent:"var(--warning)"}},Yt="execute",ds=os;function X(e){const t=(e||"").trim();return t==="anthropic"||t==="anthropic-messages"?"anthropic-messages":t==="google-gemini"?"google-gemini":"openai-completions"}function Be(e){const t=X(e);return t==="anthropic-messages"||t==="google-gemini"}function Et(e){return{"openai-completions":"自动兼容 Chat Completions 和 Responses API；Ollama 可留空 API Key","anthropic-messages":"使用 Anthropic Messages API（/v1/messages）","google-gemini":"使用 Gemini generateContent API"}[X(e)]||"自动兼容 Chat Completions 和 Responses API；Ollama 可留空 API Key"}function It(e){return{"openai-completions":"https://api.openai.com/v1 或 http://127.0.0.1:11434","anthropic-messages":"https://api.anthropic.com","google-gemini":"https://generativelanguage.googleapis.com/v1beta"}[X(e)]||"https://api.openai.com/v1"}function Ht(e){return{"openai-completions":"sk-...（Ollama 可留空）","anthropic-messages":"sk-ant-...","google-gemini":"AIza..."}[X(e)]||"sk-..."}const be="Girl Star",Ne="专业、友善、简洁。善于分析问题，给出可操作的解决方案。";function ps(){const e=(u==null?void 0:u.assistantName)||be,t=(u==null?void 0:u.assistantPersonality)||Ne;return`你是「${e}」，ClawStar 内置的 AI 智能助手。

## 你的性格
${t}

## 你是谁
- 你是 ClawStar 内置的智能助手
- 你帮助用户管理和排障 OpenClaw AI Agent 平台
- 你精通 OpenClaw 的架构、配置、Gateway、Agent 管理等所有方面
- 你善于分析日志、诊断错误、提供解决方案

## 相关资源
- **ClawStar 官网**: https://github.com/LoganLazy/clawpanel-cute
- **GitHub**: https://github.com/LoganLazy/clawpanel-cute
- **开源项目**:
  - **ClawStar** — OpenClaw 可视化管理面板（Tauri v2）
  - **OpenClaw 汉化版** — AI Agent 平台中文版，npm install -g @qingchencloud/openclaw-zh

## ClawStar 是什么
- OpenClaw 的可视化管理面板，基于 Tauri v2 的跨平台桌面应用（Windows/macOS/Linux）
- 支持仪表盘监控、模型配置、Agent 管理、实时聊天、记忆文件管理、Girl Star工具调用等
- 官网: https://github.com/LoganLazy/clawpanel-cute | GitHub: https://github.com/LoganLazy/clawpanel-cute

## OpenClaw 是什么
- 开源的 AI Agent 平台，支持多模型、多 Agent、MCP 工具调用
- 核心组件: Gateway（API 网关）、Agent（AI 代理）、Tools（工具系统）
- 配置文件: ~/.openclaw/openclaw.json（全局配置）
- 安装方式: npm install -g @qingchencloud/openclaw-zh（汉化版，推荐）或 npm install -g openclaw（官方英文版）

## OpenClaw CLI 命令速查
### 基础命令
- openclaw --version — 查看版本
- openclaw --help — 查看帮助
- openclaw config show — 显示当前配置
- openclaw config apply — 应用配置变更（同步 models.json）

### Agent 管理
- openclaw agent list — 列出所有 Agent
- openclaw agent create <name> — 创建新 Agent
- openclaw agent delete <id> — 删除 Agent
- openclaw agent default <id> — 设为默认 Agent

### Gateway 控制
- openclaw gateway start — 启动 Gateway
- openclaw gateway stop — 停止 Gateway
- openclaw gateway restart — 重启 Gateway
- openclaw gateway status — 查看 Gateway 状态
- openclaw gateway log — 查看 Gateway 日志
- openclaw gateway install — 安装 Gateway 为系统服务
- openclaw gateway uninstall — 卸载 Gateway 系统服务

### Skills 管理
- openclaw skills list — 列出所有 Skills 及其状态
- openclaw skills info <name> — 查看某个 Skill 详情
- openclaw skills check — 检查所有 Skills 的依赖是否满足
- Skill 依赖安装: 根据 install spec 执行 brew/npm/go/uv 安装缺少的命令行工具
- ClawHub (clawhub.com): 社区 Skill 市场，可搜索和安装新 Skill
- Skills 目录: 捆绑 Skills 在 openclaw 安装包内，自定义 Skills 放在 ~/.openclaw/skills/<name>/

### 聊天与调试
- openclaw chat — 进入交互式聊天
- openclaw chat -m "消息" — 发送单条消息
- openclaw chat --model <model> — 指定模型聊天
- openclaw doctor — 诊断配置问题

## 关键配置结构
- openclaw.json: 全局配置（models.providers、gateway、tools）
- models.json: Agent 运行时模型注册表（~/.openclaw/agents/<id>/agent/models.json）
- clawpanel.json: ClawStar 自身配置（~/.openclaw/clawpanel.json）
- gateway.mode: "local"（必须在 gateway 对象内，不能在顶层）
- gateway.port: 默认 18789
- gateway.auth.mode: "none" | "token" | "password"

## 常见问题速查
1. **Gateway 启动失败 Bootstrap failed: 5** → plist 二进制路径过期（nvm/fnm 切版本后），升级 ClawStar 到 v0.4.8+ 自动回退 CLI 启动
2. **Unrecognized key: "mode"** → mode 字段不能放在顶层，必须在 gateway.mode，升级到 v0.4.6+ 自动修复
3. **fnm 管理的 Node.js 检测不到** → 升级到 v0.4.7+，已支持 FNM_DIR/node-versions 扫描
4. **models.json 不同步** → ClawStar 改了 openclaw.json 但 Gateway 用的 models.json 未更新，重启 Gateway 或执行 openclaw config apply
5. **WebSocket 连接失败** → 检查 gateway.controlUi.allowedOrigins 是否包含 ["*"]
6. **SIGTERM 循环** → com.openclaw.healthcheck 服务异常，禁用: launchctl bootout gui/$(id -u)/com.openclaw.healthcheck
7. **BOM 导致 JSON 解析失败** → PowerShell Set-Content 会加 BOM，ClawStar 已自动剥离

## 生态项目安装指引
当用户问到如何安装其他产品时，推荐以下安装方式：
- **OpenClaw 汉化版**: npm install -g @qingchencloud/openclaw-zh（推荐国内用户）
- **OpenClaw 官方版**: npm install -g openclaw
- **ClawStar**: 从 https://github.com/LoganLazy/clawpanel-cute/releases 下载
- **更多项目**: 访问 https://github.com/LoganLazy/clawpanel-cute

## 社区贡献指引
当用户发现 Bug 或有改进建议时，你应该主动引导用户参与开源贡献：

### 提交 Issue
引导用户到对应仓库提交 Issue，帮用户整理好格式：
- **ClawStar**: https://github.com/LoganLazy/clawpanel-cute/issues/new
- **OpenClaw 汉化版**: https://github.com/LoganLazy/clawpanel-cute/issues/new

Issue 模板（帮用户填好）：
\`\`\`
**问题描述**: [一句话描述]
**复现步骤**: 1. ... 2. ... 3. ...
**期望行为**: ...
**实际行为**: ...
**环境信息**: OS / ClawStar 版本 / OpenClaw 版本
**截图/日志**: （如有）
\`\`\`

### 提交 PR
如果你能定位到 Bug 的原因和修复方案，主动帮用户生成 PR 内容：
1. 分析问题根因（读配置/日志/代码）
2. 给出具体的修复代码或配置变更
3. 生成 PR 标题和描述（中文），格式：
   - 标题: \`fix: 修复xxx问题\` 或 \`feat: 新增xxx功能\`
   - 描述: 问题原因、修复方案、影响范围
4. 告诉用户如何 Fork → 修改 → 提交 PR

### 贡献流程（告诉用户）
1. Fork 仓库到自己的 GitHub
2. \`git clone\` 到本地
3. 创建分支: \`git checkout -b fix/问题描述\`
4. 修改代码并测试
5. \`git commit -m "fix: 修复xxx"\`
6. \`git push origin fix/问题描述\`
7. 在 GitHub 上发起 Pull Request

当用户遇到问题时，如果你判断这是一个 Bug，应该主动说「我可以帮你整理成 Issue 提交到我们仓库」或「这个 Bug 我能定位原因，要不要我帮你生成 PR？」

### 自主操作（重要）
你有能力直接通过工具完成 Issue/PR 全流程，用户只需确认：
- 用 ask_user 工具询问用户确认方案
- 用 run_command 执行 git clone、checkout -b、add、commit、push
- 用 write_file 修改代码/配置
- 不要只是告诉用户怎么做，而是直接帮用户做！

## ask_user 工具使用指南
你有一个强大的 ask_user 工具，可以向用户提问并获取结构化回答：
- **单选 (single)**: 让用户从多个方案中选一个，如「选择要提交到哪个仓库」
- **多选 (multiple)**: 让用户选择多项，如「选择要检查的组件」
- **文本 (text)**: 让用户输入自由文本，如「请描述你遇到的问题」

使用场景：
- 需要用户做决定时（修复方案 A 还是 B？）
- 需要用户提供信息时（Bug 复现步骤？）
- 确认操作前（确定要执行这些 git 命令吗？）
- 收集反馈时（哪些功能有问题？）

注意：每个选项应该简短明了，不要超过 4 个选项（用户可以输入自定义内容）。

## web_search / fetch_url 使用指南
当你无法确定答案或需要最新信息时，可以使用 web_search 搜索互联网：
- 搜索错误信息时，用引号包裹关键错误文本
- 加 site:github.com 搜索 GitHub Issues
- 加 site:stackoverflow.com 搜索 StackOverflow
- 搜索后如需更多细节，用 fetch_url 抓取具体页面内容
- fetch_url 返回纯文本格式，大页面会截断到 100KB

## 你的工作方式
- 用中文回复
- 如果用户粘贴了日志，仔细分析每一行，找出关键错误
- 给出具体的解决步骤，包括可直接执行的命令
- 如果不确定，诚实说明并建议用户提供更多信息
- 回复简洁专业，避免啰嗦
- 发现 Bug 时主动引导用户提交 Issue 或 PR，降低贡献门槛`}const he={terminal:[{type:"function",function:{name:"run_command",description:"在本机终端执行 shell 命令。用于系统管理、服务操作、文件查看等。注意：命令会直接在用户的机器上执行，请谨慎使用。",parameters:{type:"object",properties:{command:{type:"string",description:"要执行的 shell 命令"},cwd:{type:"string",description:"工作目录（可选，默认为用户主目录）"}},required:["command"]}}}],system:[{type:"function",function:{name:"get_system_info",description:"获取当前系统信息，包括操作系统类型（windows/macos/linux）、CPU 架构、用户主目录、主机名、默认 Shell。在执行任何命令前应先调用此工具来判断操作系统，以选择正确的命令语法。",parameters:{type:"object",properties:{},required:[]}}}],process:[{type:"function",function:{name:"list_processes",description:"列出当前运行中的进程。可以按名称过滤，用于检查某个服务是否在运行（如 node、openclaw、gateway）。",parameters:{type:"object",properties:{filter:{type:"string",description:"过滤关键词（可选），只返回包含该关键词的进程"}},required:[]}}},{type:"function",function:{name:"check_port",description:"检测指定端口是否被占用，并返回占用该端口的进程信息。常用端口：Gateway 18789、WebSocket 18790。",parameters:{type:"object",properties:{port:{type:"integer",description:"要检测的端口号"}},required:["port"]}}}],interaction:[{type:"function",function:{name:"ask_user",description:"向用户提问并等待回答。支持单选、多选和自由输入。当你需要用户做决定、确认方案、选择选项时使用此工具。用户可以选择预设选项，也可以输入自定义内容。",parameters:{type:"object",properties:{question:{type:"string",description:"要问用户的问题"},type:{type:"string",enum:["single","multiple","text"],description:"交互类型：single=单选, multiple=多选, text=自由输入"},options:{type:"array",items:{type:"string"},description:"预设选项列表（single/multiple 时必填，text 时可选作为建议）"},placeholder:{type:"string",description:"自由输入时的占位提示文字（可选）"}},required:["question","type"]}}}],webSearch:[{type:"function",function:{name:"web_search",description:"联网搜索关键词，返回搜索结果列表（标题、链接、摘要）。用于查找错误解决方案、最新文档、GitHub Issues 等。",parameters:{type:"object",properties:{query:{type:"string",description:"搜索关键词"},max_results:{type:"integer",description:"最大结果数（默认 5）"}},required:["query"]}}},{type:"function",function:{name:"fetch_url",description:"抓取指定 URL 的网页内容，返回纯文本/Markdown 格式。用于获取搜索结果中某个页面的详细内容。",parameters:{type:"object",properties:{url:{type:"string",description:"要抓取的网页 URL"}},required:["url"]}}}],skills:[{type:"function",function:{name:"skills_list",description:"列出所有 OpenClaw Skills 及其状态（可用/缺依赖/已禁用）。返回每个 Skill 的名称、描述、来源、依赖状态、缺少的依赖项、可用的安装选项等信息。",parameters:{type:"object",properties:{},required:[]}}},{type:"function",function:{name:"skills_info",description:"查看指定 Skill 的详细信息，包括描述、来源、依赖要求、缺少的依赖、安装选项等。",parameters:{type:"object",properties:{name:{type:"string",description:"Skill 名称，如 github、weather、coding-agent"}},required:["name"]}}},{type:"function",function:{name:"skills_check",description:"检查所有 Skills 的依赖状态，返回哪些可用、哪些缺少依赖、哪些已禁用的汇总信息。",parameters:{type:"object",properties:{},required:[]}}},{type:"function",function:{name:"skills_install_dep",description:"安装 Skill 缺少的依赖。根据 Skill 的 install spec 执行对应的包管理器命令（brew/npm/go/uv）。安装完成后会自动生效。",parameters:{type:"object",properties:{kind:{type:"string",enum:["brew","node","go","uv"],description:"安装类型"},spec:{type:"object",description:"安装参数。brew 需要 formula，node 需要 package，go 需要 module，uv 需要 package。",properties:{formula:{type:"string",description:"Homebrew formula 名称"},package:{type:"string",description:"npm 或 uv 包名"},module:{type:"string",description:"Go module 路径"}}}},required:["kind","spec"]}}},{type:"function",function:{name:"skills_clawhub_search",description:"在 ClawHub 社区市场中搜索 Skills。返回匹配的 Skill 列表（slug 和描述）。",parameters:{type:"object",properties:{query:{type:"string",description:"搜索关键词"}},required:["query"]}}},{type:"function",function:{name:"skills_clawhub_install",description:"从 ClawHub 社区市场安装一个 Skill 到本地 ~/.openclaw/skills/ 目录。",parameters:{type:"object",properties:{slug:{type:"string",description:"ClawHub 上的 Skill slug（名称标识）"}},required:["slug"]}}}],fileOps:[{type:"function",function:{name:"read_file",description:"读取指定路径的文件内容。用于查看配置文件、日志文件等。",parameters:{type:"object",properties:{path:{type:"string",description:"文件的完整路径"}},required:["path"]}}},{type:"function",function:{name:"write_file",description:"写入或创建文件。会自动创建父目录。注意：会覆盖已有内容。",parameters:{type:"object",properties:{path:{type:"string",description:"文件的完整路径"},content:{type:"string",description:"要写入的内容"}},required:["path","content"]}}},{type:"function",function:{name:"list_directory",description:"列出目录下的文件和子目录。",parameters:{type:"object",properties:{path:{type:"string",description:"目录路径"}},required:["path"]}}}]},us=new Set(["run_command","write_file","skills_install_dep","skills_clawhub_install"]),ms=[/rm\s+(-[a-zA-Z]*f[a-zA-Z]*\s+)?[\/~]/i,/rm\s+-[a-zA-Z]*r[a-zA-Z]*\s+\//i,/format\s+[a-zA-Z]:/i,/mkfs\./i,/dd\s+.*of=\/dev\//i,/>\s*\/dev\/[sh]d/i,/DROP\s+(DATABASE|TABLE|SCHEMA)/i,/TRUNCATE\s+TABLE/i,/DELETE\s+FROM\s+\w+\s*;?\s*$/i,/:(){ :\|:& };:/,/shutdown|reboot|init\s+[06]/i,/chmod\s+(-R\s+)?777\s+\//i,/chown\s+(-R\s+)?.*\s+\//i,/curl\s+.*\|\s*(sudo\s+)?bash/i,/wget\s+.*\|\s*(sudo\s+)?bash/i,/npm\s+publish/i,/git\s+push\s+.*--force/i];function gs(e){return e?ms.some(t=>t.test(e)):!1}const ut=[{id:"check-config",icon:O("wrench",16),name:"检查 OpenClaw 配置",desc:"读取并分析 openclaw.json，检查配置是否正确",tools:["fileOps"],prompt:`请帮我检查 OpenClaw 的配置文件。

具体操作：
1. 调用 get_system_info 获取系统信息，确定主目录和 OS 类型
2. 用 list_directory 查看 ~/.openclaw/ 目录结构
3. 用 read_file 读取 ~/.openclaw/openclaw.json
4. 分析配置内容，检查：
   - models.providers 服务商配置（baseUrl 格式、apiKey 是否存在）
   - gateway 配置（port 默认 18789、mode 必须在 gateway 对象内）
   - 常见配置错误（mode 放在顶层、缺少 gateway 对象、controlUi.allowedOrigins 未配置）
5. 给出配置健康度评估和具体改进建议`},{id:"diagnose-gateway",icon:O("shield",16),name:"诊断 Gateway",desc:"检查 Gateway 运行状态、端口、日志",tools:["terminal","fileOps"],prompt:`请帮我诊断 OpenClaw Gateway 的运行状态。

具体操作：
1. 调用 get_system_info 获取 OS 类型和主目录
2. 用 list_processes 工具检查 openclaw/gateway 进程是否在运行
3. 用 check_port 工具检查端口 18789 是否在监听
4. 用 read_file 读取 ~/.openclaw/logs/gateway.log（取最后 50 行）
5. 分析日志中的 ERROR、WARN、fail 等关键词
6. 给出诊断结论（进程状态 + 端口状态 + 日志分析）和修复建议`},{id:"browse-dir",icon:O("folder",16),name:"浏览配置目录",desc:"查看 .openclaw 目录结构和文件",tools:["fileOps"],prompt:`请帮我浏览 OpenClaw 的配置目录结构。

具体操作：
1. 调用 get_system_info 获取主目录路径（Windows: $env:USERPROFILE, Mac/Linux: ~）
2. 用 list_directory 列出 ~/.openclaw/ 根目录
3. 列出 ~/.openclaw/agents/ 下的 Agent 列表
4. 对于 main Agent，列出 ~/.openclaw/agents/main/agent/ 子目录
5. 简要说明每个目录/文件的作用：
   - openclaw.json: 全局配置（模型、Gateway、工具）
   - clawpanel.json: ClawStar 面板配置
   - mcp.json: MCP 工具配置
   - agents/: Agent 工作目录
   - logs/: 日志文件
   - backups/: 配置备份
6. 标注关键配置文件和常用路径`},{id:"check-env",icon:O("monitor",16),name:"检查系统环境",desc:"检测 Node.js、npm 版本和系统信息",tools:["terminal"],prompt:`请帮我检查当前系统环境是否满足 OpenClaw 的运行要求。

具体操作：
1. 调用 get_system_info 获取 OS、架构、Node.js 版本等基础信息
2. 用 run_command 检查 Node.js 版本（node -v），要求 >= 18
3. 用 run_command 检查 npm 版本（npm -v）
4. 用 run_command 检查 OpenClaw CLI（openclaw --version）
5. 用 check_port 检查 Gateway 端口 18789
6. 给出环境评估报告，每项标注通过/失败，并给出缺失项的安装命令`},{id:"analyze-logs",icon:O("clipboard",16),name:"分析错误日志",desc:"读取最近日志，定位错误原因",tools:["terminal","fileOps"],prompt:`请帮我分析 OpenClaw 最近的日志，找出可能的问题。

具体操作：
1. 调用 get_system_info 获取主目录路径
2. 用 list_directory 查看 ~/.openclaw/logs/ 有哪些日志文件
3. 用 read_file 读取 ~/.openclaw/logs/gateway.log
4. 搜索 ERROR、WARN、fail、exception、SIGTERM、Bootstrap 等关键词
5. 对照常见问题速查表分析错误原因
6. 汇总日志分析报告，给出具体修复步骤`},{id:"fix-common",icon:O("wrench",16),name:"一键排障",desc:"自动检测并修复常见问题",tools:["terminal","fileOps"],prompt:`请帮我自动检测并修复 OpenClaw 的常见问题。

先调用 get_system_info 获取系统信息，然后按以下步骤逐一检查：
1. **配置检查**：用 read_file 读取 openclaw.json，检查是否有已知错误（mode 在顶层、缺少 gateway 对象等）
2. **models.json 同步**：用 read_file 对比 openclaw.json 和 agents/main/agent/models.json 的 providers
3. **Gateway 状态**：用 list_processes 检查 openclaw 进程，用 check_port 检查端口 18789
4. **WebSocket 配置**：检查 gateway.controlUi.allowedOrigins 是否包含 "*"
5. **Node.js 环境**：用 run_command 检查 node 和 npm 版本

对每个检查项给出通过/失败状态，并对发现的问题给出具体修复命令（但不要自动修改配置文件，等我确认）。`},{id:"report-bug",icon:O("bug",16),name:"提交 Bug 报告",desc:"整理问题信息，生成标准 Issue 提交到 GitHub",tools:["terminal","fileOps"],prompt:`我想反馈一个 Bug，请帮我整理成标准的 GitHub Issue。

具体操作：
1. 用 ask_user 工具询问我遇到了什么问题（如果我还没说的话）
2. 调用 get_system_info 获取系统环境信息
3. 用 run_command 收集：openclaw --version、node -v 等版本信息
4. 用 read_file 读取最近的错误日志（如有）
5. 按标准 Issue 模板整理：
   - **问题描述**（一句话）
   - **复现步骤**（1, 2, 3...）
   - **期望行为** / **实际行为**
   - **环境信息**（自动填充）
   - **相关日志**（如有）
6. 用代码块展示完整 Issue 内容，给出对应仓库的 Issue 链接：
   - ClawStar: https://github.com/LoganLazy/clawpanel-cute/issues/new
   - OpenClaw: https://github.com/LoganLazy/clawpanel-cute/issues/new
`},{id:"pr-assistant",icon:O("zap",16),name:"PR 助手",desc:"定位 Bug 原因，生成修复代码和 PR 描述",tools:["terminal","fileOps"],prompt:`我发现了一个问题，想提交 PR 来修复它。请帮我走一遍 PR 流程。

具体操作：
1. 先听我描述问题（如果我还没说的话）
2. 帮我分析问题可能的原因，如果有工具可以用就主动调用来诊断
3. 定位到具体的代码/配置/逻辑问题
4. 给出修复方案和具体代码
5. 生成标准的 PR 内容：
   - **PR 标题**: \`fix: 修复xxx\` 或 \`feat: 新增xxx\`
   - **问题描述**: 说明问题原因
   - **修复方案**: 具体改了什么
   - **影响范围**: 会影响哪些功能
   - **测试建议**: 如何验证修复
6. 给出完整的贡献流程：
   - Fork 仓库链接
   - git clone / checkout -b / commit / push 命令
   - 创建 PR 的链接
7. 如果用户不熟悉 Git，给出每一步的详细命令`},{id:"skills-manager",icon:O("box",16),name:"Skills 管理",desc:"查看、检查依赖、安装 Skills",tools:["skills"],prompt:`请帮我管理 OpenClaw 的 Skills。

具体操作：
1. 调用 skills_list 获取所有 Skills 及其状态
2. 汇总展示：多少个可用、多少个缺依赖、多少个已禁用
3. 对于缺依赖的 Skills，列出每个缺少的依赖和对应的安装方法
4. 询问用户是否要安装某些缺少的依赖（用 ask_user 列出选项）
5. 如果用户选择安装，调用 skills_install_dep 执行安装
6. 安装完成后再次调用 skills_list 确认状态变化

注意：
- 安装依赖可能需要特定的包管理器（brew 仅限 macOS，Windows 用 npm/go 等）
- 先调用 get_system_info 判断操作系统，过滤出适合当前平台的安装选项
- 如果用户想从 ClawHub 搜索安装新 Skill，使用 skills_clawhub_search 和 skills_clawhub_install`}];function ge(){return Oe[u==null?void 0:u.mode]?u.mode:Yt}function mt(){const e=Oe[ge()];if(!e.tools)return[];const t=u.tools||{},s=[...he.system,...he.process,...he.interaction];return t.terminal!==!1&&s.push(...he.terminal),t.webSearch!==!1&&s.push(...he.webSearch),t.fileOps!==!1&&(e.readOnly?s.push(...he.fileOps.filter(o=>o.function.name!=="write_file")):s.push(...he.fileOps)),e.readOnly?s.push(...he.skills.filter(o=>!["skills_install_dep","skills_clawhub_install"].includes(o.function.name))):s.push(...he.skills),s}function Pt(e,t){const s=e.querySelector(".ast-main")||e;s.dataset.mode=t,Qt(e,t)}function Qt(e,t){const s=e==null?void 0:e.querySelector("#ast-mode-selector"),o=e==null?void 0:e.querySelector("#ast-mode-slider"),n=s==null?void 0:s.querySelector(`.ast-mode-btn[data-mode="${t}"]`);if(!s||!o||!n)return;const l=s.getBoundingClientRect(),a=n.getBoundingClientRect();o.style.width=a.width+"px",o.style.left=a.left-l.left+"px",o.style.opacity="1"}const Rt={chat:{primary:"#6b7280",rgb:"107,114,128"},plan:{primary:"#3b82f6",rgb:"59,130,246"},execute:{primary:"#8b5cf6",rgb:"139,92,246"},unlimited:{primary:"#f59e0b",rgb:"245,158,11"}};function fs(e,t){const s=e==null?void 0:e.querySelector(".ast-main"),o=e==null?void 0:e.querySelector(".ast-header"),n=e==null?void 0:e.querySelector("#ast-mode-selector");if(!s||!o)return;const l=Rt[t]||Rt.execute,a=Oe[t],i=document.createElement("div");if(i.className="ast-mode-ripple",n){const m=n.getBoundingClientRect(),g=s.getBoundingClientRect();i.style.setProperty("--ripple-x",m.left+m.width/2-g.left+"px"),i.style.setProperty("--ripple-y",m.top+m.height/2-g.top+"px")}if(i.style.setProperty("--ripple-color",l.primary),s.appendChild(i),setTimeout(()=>i.remove(),800),n){const m=n.getBoundingClientRect(),g=s.getBoundingClientRect(),p=m.left+m.width/2-g.left,f=m.top+m.height/2-g.top;for(let v=0;v<24;v++){const x=document.createElement("div");x.className="ast-mode-particle";const T=Math.PI*2*v/24+(Math.random()-.5)*.5,H=60+Math.random()*120,J=3+Math.random()*4;x.style.setProperty("--px",p+"px"),x.style.setProperty("--py",f+"px"),x.style.setProperty("--dx",Math.cos(T)*H+"px"),x.style.setProperty("--dy",Math.sin(T)*H-30+"px"),x.style.setProperty("--size",J+"px"),x.style.setProperty("--color",l.primary),x.style.setProperty("--delay",Math.random()*.1+"s"),x.style.setProperty("--duration",.5+Math.random()*.4+"s"),s.appendChild(x),setTimeout(()=>x.remove(),1e3)}}o.classList.remove("ast-mode-pulse"),o.offsetWidth,o.classList.add("ast-mode-pulse");const r=e.querySelector(".ast-mode-toast");if(r&&r.remove(),!a)return;const d=document.createElement("div");d.className=`ast-mode-toast mode-${t}`,d.innerHTML=`<span class="ast-mode-toast-icon">${Ft[t]}</span><span class="ast-mode-toast-label">${a.label}</span><span class="ast-mode-toast-desc">${a.desc}</span>`,s.appendChild(d),setTimeout(()=>d.classList.add("show"),10),setTimeout(()=>{d.classList.remove("show"),setTimeout(()=>d.remove(),300)},2e3)}function Vt(){var n,l;let e="";if((n=u==null?void 0:u.soulSource)!=null&&n.startsWith("openclaw:")&&q){if(e+=`# 你的身份
`,q.identity&&(e+=q.identity+`

`),q.soul&&(e+=`# 灵魂
`+q.soul+`

`),q.user&&(e+=`# 你的用户
`+q.user+`

`),q.agents){const a=q.agents.length>4e3?q.agents.slice(0,4e3)+`

[...已截断]`:q.agents;e+=`# 操作规则
`+a+`

`}if(q.tools&&(e+=`# 工具笔记
`+q.tools+`

`),q.memory){const a=q.memory.length>3e3?q.memory.slice(-3e3):q.memory;e+=`# 长期记忆
`+a+`

`}if((l=q.recentMemories)!=null&&l.length){e+=`# 最近记忆
`;for(const a of q.recentMemories){const i=a.content.length>800?a.content.slice(0,800)+"...":a.content;e+=`## ${a.date}
${i}

`}}e+=`
# ClawStar 工具能力
你同时是 ClawStar 内置助手，拥有以下额外能力：
`,e+=`- 执行终端命令、读写文件、浏览目录
`,e+=`- 联网搜索和网页抓取
`,e+=`- 管理 OpenClaw 配置和服务
`,e+=`- 你精通 OpenClaw 的架构、配置、Gateway、Agent 管理
`}else e+=ps();const t=ge(),s=Oe[t];e+=`

## 当前模式：${s.label}模式`,t==="chat"?(e+=`
你处于纯聊天模式，没有任何工具可用。请通过文字回答问题，给出具体的命令建议供用户手动执行。`,e+=`
如果用户需要你执行操作，建议用户切换到「执行」或「规划」模式。`):(t==="plan"&&(e+=`
**你处于规划模式**：可以调用工具读取信息、分析问题，但 **绝对不能修改任何文件**（write_file 已禁用）。`,e+=`
你的任务是：分析问题 → 制定方案 → 输出详细步骤，让用户确认后再切换到执行模式操作。`,e+=`
即使使用 run_command，也只能执行只读命令（查看、检查、列出），不要执行任何修改操作。`),t==="unlimited"&&(e+=`
**你处于无限模式**：所有工具调用无需用户确认，请高效完成任务。`),e+=`

### 可用工具`,e+=`
- **用户交互**: ask_user — 向用户提问（单选/多选/文本），获取结构化回答。需要用户做决定时优先用此工具。`,e+=`
- **系统信息**: get_system_info — 获取 OS 类型、架构、主目录等。**在执行任何命令前必须先调用此工具**。`,e+=`
- **进程/端口**: list_processes（按名称过滤）、check_port（检测端口占用）`,e+=`
- **终端**: run_command — 执行 shell 命令`,s.readOnly?e+=`
- **文件**: read_file、list_directory（只读，write_file 已禁用）`:e+=`
- **文件**: read_file、write_file、list_directory`,e+=`

### 终端命令规范（极其重要）`,e+=`
- **Windows**: 终端是 **PowerShell**，必须使用 PowerShell 语法：`,e+="\n  - 列目录: `Get-ChildItem` 或 `ls`（不要用 `dir`）",e+="\n  - 看文件: `Get-Content` 或 `cat`（不要用 `type`）",e+='\n  - 查进程: `Get-Process | Where-Object { $_.Name -like "*openclaw*" }`',e+="\n  - 查端口: `Get-NetTCPConnection -LocalPort 18789`",e+="\n  - 文件尾: `Get-Content file.log -Tail 50`",e+='\n  - 搜内容: `Select-String -Path file.log -Pattern "ERROR"`',e+="\n  - 环境变量: `$env:USERPROFILE`（不要用 `%USERPROFILE%`）",e+=`
- **macOS**: zsh，标准 Unix 命令`,e+=`
- **Linux**: bash，标准 Unix 命令`,e+=`
- **绝对禁止** cmd.exe 语法（dir、type、findstr、netstat）`,e+=`
- **一次只执行一条命令**，等结果出来再决定下一步`,e+=`
- **不要重复执行相同的命令**`,e+=`

### 跨平台路径`,e+="\n- Windows: `$env:USERPROFILE\\.openclaw\\`",e+="\n- macOS/Linux: `~/.openclaw/`",e+=`

### 工具使用原则`,e+=`
- 先 get_system_info，再根据 OS 执行正确命令`,e+=`
- 优先用 read_file / list_directory / list_processes / check_port 等专用工具，减少 run_command 使用`,e+=`
- 主动使用工具，不要只建议用户手动操作`,s.confirmDanger&&(e+=`
- 执行破坏性操作前先告知用户`)),e+=`

## 内置技能卡片`,e+=`
用户可以在欢迎页点击技能卡片快速触发操作。当用户遇到问题时，你也可以主动推荐合适的技能：`;for(const a of ut)e+=`
- **${a.name}**（${a.desc}）`;e+=`

当用户的需求匹配某个技能时，可以建议用户点击对应的技能卡片，或者你直接按技能的步骤操作。`,e+=`

`+rs;const o=(u.knowledgeFiles||[]).filter(a=>a.enabled!==!1&&a.content);if(o.length>0){e+=`

## 用户自定义知识库`,e+=`
以下是用户提供的参考知识，回答问题时请优先参考这些内容：`;for(const a of o){const i=a.content.length>5e3?a.content.slice(0,5e3)+`

[...内容已截断]`:a.content;e+=`

### ${a.name}
${i}`}}return e}async function ys(){var e,t,s,o;try{const n=await C.assistantSystemInfo(),l=((t=(e=n.match(/主目录[:：]\s*(.+)/))==null?void 0:e[1])==null?void 0:t.trim())||((o=(s=n.match(/Home[:：]\s*(.+)/))==null?void 0:s[1])==null?void 0:o.trim())||"";if(!l)return[];const a=[];let i=!1;try{await C.assistantListDir(l+"/.openclaw/workspace"),i=!0}catch{}a.push({id:"default",label:"默认 (主工作区)",hasWorkspace:i});try{const r=l+"/.openclaw/agents",m=(await C.assistantListDir(r)).split(`
`).filter(g=>g.includes("[DIR]")).map(g=>g.replace(/^\[DIR\]\s*/,"").replace(/[\/\\]+$/,"").trim()).filter(Boolean);for(const g of m){if(g==="main")continue;const p=r+"/"+g+"/workspace";let f=!1;try{await C.assistantListDir(p),f=!0}catch{}a.push({id:g,label:g,hasWorkspace:f})}}catch{}return a}catch(n){return console.error("[soul] 扫描 Agent 失败:",n),[]}}async function hs(e="default"){var t,s,o,n;try{const l=await C.assistantSystemInfo(),a=((s=(t=l.match(/主目录[:：]\s*(.+)/))==null?void 0:t[1])==null?void 0:s.trim())||((n=(o=l.match(/Home[:：]\s*(.+)/))==null?void 0:o[1])==null?void 0:n.trim())||"";if(!a)throw new Error("无法获取主目录");let i;e==="default"||e==="main"?i=a+"/.openclaw/workspace":i=a+"/.openclaw/agents/"+e+"/workspace";let r=!1;try{await C.assistantListDir(i),r=!0}catch{}if(!r)throw new Error("Agent workspace 不存在: "+e);const d=async g=>{try{return await C.assistantReadFile(g)}catch{return null}},m={agentId:e,identity:await d(i+"/IDENTITY.md"),soul:await d(i+"/SOUL.md"),user:await d(i+"/USER.md"),agents:await d(i+"/AGENTS.md"),tools:await d(i+"/TOOLS.md"),memory:await d(i+"/MEMORY.md"),recentMemories:[]};try{const f=(await C.assistantListDir(i+"/memory")).split(`
`).map(v=>v.trim()).filter(v=>v.match(/\d{4}-\d{2}-\d{2}/)).sort().slice(-3);for(const v of f){const x=v.replace(/^\[FILE\]\s*/,"").replace(/\s*\(.*\)$/,"").trim(),T=await d(i+"/memory/"+x);T&&m.recentMemories.push({date:x,content:T})}}catch{}return q=m,m}catch(l){return console.error("[soul] 加载失败:",l),q=null,null}}function ws(){return q?[{name:"SOUL.md",desc:"灵魂 · 人格边界",content:q.soul},{name:"IDENTITY.md",desc:"身份 · 名称形象",content:q.identity},{name:"USER.md",desc:"用户 · 偏好称呼",content:q.user},{name:"AGENTS.md",desc:"规则 · 操作指令",content:q.agents},{name:"TOOLS.md",desc:"笔记 · 工具环境",content:q.tools},{name:"MEMORY.md",desc:"记忆 · 长期存储",content:q.memory}].map(t=>({name:t.name,desc:t.desc,loaded:!!t.content,size:t.content?t.content.length:0})):[]}function Bt(e){var i;if(!e)return"";const t=ws(),s=t.filter(r=>r.loaded),o=t.reduce((r,d)=>r+d.size,0),n=((i=e.recentMemories)==null?void 0:i.length)||0,l=o>1024?(o/1024).toFixed(1)+" KB":o+" B";let a=`<div class="ast-soul-header">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>已加载 <strong>${s.length}/${t.length}</strong> 个文件（${l}）</span>
  </div>`;a+='<div class="ast-soul-files">';for(const r of t){const d=r.loaded?r.size>1024?(r.size/1024).toFixed(1)+" KB":r.size+" B":"—";a+=`<div class="ast-soul-file ${r.loaded?"loaded":"missing"}">
      <div class="ast-soul-file-icon">${r.loaded?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}</div>
      <div class="ast-soul-file-info">
        <span class="ast-soul-file-name">${r.name}</span>
        <span class="ast-soul-file-desc">${r.desc}</span>
      </div>
      <span class="ast-soul-file-size">${d}</span>
    </div>`}return n>0&&(a+=`<div class="ast-soul-file loaded">
      <div class="ast-soul-file-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
      <div class="ast-soul-file-info">
        <span class="ast-soul-file-name">memory/</span>
        <span class="ast-soul-file-desc">每日记忆日志</span>
      </div>
      <span class="ast-soul-file-size">${n} 个文件</span>
    </div>`),a+="</div>",a}let re=null,b=null,N=null,ce=null,Je=null,we=null,te=!1,M=null,u=null,D=[],ve=null,Qe=0,je=null;const rt=new Map;let le=[],Fe=null,se=[],Te=null,q=null;function Ve(){je||(je=setTimeout(()=>{je=null,Le()},500))}function gt(){je&&(clearTimeout(je),je=null),Le()}function bs(){if(!b||!te)return;const e=De();if(!e)return;const t=e.messages[e.messages.length-1];if(!t||t.role!=="assistant")return;const s=b.querySelectorAll(".ast-msg-bubble-ai"),o=s[s.length-1];o&&t.content&&(o.innerHTML=ze(t.content)+'<span class="ast-cursor">▊</span>',b.scrollTop=b.scrollHeight)}function Nt(){We(),Fe=setInterval(bs,200)}function We(){Fe&&(clearInterval(Fe),Fe=null)}function Zt(e){le.push({id:Date.now().toString(),text:e,ts:Date.now()}),Ce()}function Ce(){if(!we)return;if(le.length===0){we.innerHTML="",we.style.display="none";return}we.style.display="block";const e='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',t='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',s='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',o='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';we.innerHTML=`<div class="ast-queue-header">${e} 发送队列 (${le.length})</div>`+le.map((n,l)=>`
      <div class="ast-queue-item" data-queue-id="${n.id}">
        <span class="ast-queue-num">${l+1}</span>
        <span class="ast-queue-text" data-queue-edit="${n.id}" title="点击编辑">${w(n.text)}</span>
        <div class="ast-queue-actions">
          <button class="ast-queue-btn edit" data-queue-edit-btn="${n.id}" title="编辑">${s}</button>
          <button class="ast-queue-btn send" data-queue-send="${n.id}" title="立即发送（插队）">${t}</button>
          <button class="ast-queue-btn delete" data-queue-del="${n.id}" title="删除">${o}</button>
        </div>
      </div>
    `).join("")}function Xt(){if(te||le.length===0)return;const e=le.shift();Ce(),ht(e.text)}const vs=4*1024*1024,st=2048;function lt(e){if(!e.type.startsWith("image/"))return;if(e.size>vs*2){Z("图片太大（超过 8MB）","error");return}const t=new FileReader;t.onload=s=>{const o=new Image;o.onload=()=>{let{width:n,height:l}=o;if(n>st||l>st){const d=st/Math.max(n,l);n=Math.round(n*d),l=Math.round(l*d)}const a=document.createElement("canvas");a.width=n,a.height=l,a.getContext("2d").drawImage(o,0,0,n,l);const r=a.toDataURL("image/jpeg",.85);se.push({id:Date.now().toString()+Math.random().toString(36).slice(2,6),dataUrl:r,name:e.name||"image.jpg",width:n,height:l}),ft()},o.src=s.target.result},t.readAsDataURL(e)}function xs(e){const t=e.getAsFile();t&&lt(t)}function ks(e){se=se.filter(t=>t.id!==e),ft()}function ft(){const e=re==null?void 0:re.querySelector("#ast-image-preview");if(!e)return;if(se.length===0){e.innerHTML="",e.style.display="none";return}e.style.display="flex";const t='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';e.innerHTML=se.map(s=>`
    <div class="ast-img-thumb" data-img-id="${s.id}">
      <img src="${s.dataUrl}" alt="${w(s.name)}"/>
      <button class="ast-img-thumb-del" data-img-del="${s.id}" title="移除">${t}</button>
    </div>
  `).join("")}function Ss(){se=[],ft()}function $s(e,t){if(!t||t.length===0)return e;const s=[];e&&s.push({type:"text",text:e});for(const o of t)s.push({type:"image_url",image_url:{url:o.dataUrl,detail:"auto"}});return s}function ee(e,t){t==="idle"?rt.delete(e):rt.set(e,t),xe()}function Xe(e){return rt.get(e)||"idle"}async function Me(e,t,s=3){const o=[1e3,3e3,8e3];for(let n=0;n<=s;n++)try{const l=await fetch(e,t);if(l.ok||l.status<500||n>=s)return l;await new Promise(a=>setTimeout(a,o[n]))}catch(l){if(l.name==="AbortError"||n>=s)throw l;await new Promise(a=>setTimeout(a,o[n]))}}function Ts(){try{const e=localStorage.getItem(Wt);u=e?JSON.parse(e):null}catch{u=null}return u||(u={baseUrl:"",apiKey:"",model:"",temperature:.7,tools:{terminal:!1,fileOps:!1,webSearch:!1},assistantName:be,assistantPersonality:Ne}),u.assistantName||(u.assistantName=be),u.assistantPersonality||(u.assistantPersonality=Ne),u.tools||(u.tools={terminal:!1,fileOps:!1,webSearch:!1}),u.mode||(u.mode=Yt),u.apiType=X(u.apiType),u.autoRounds===void 0&&(u.autoRounds=8),Array.isArray(u.knowledgeFiles)||(u.knowledgeFiles=[]),u}function Ge(){localStorage.setItem(Wt,JSON.stringify(u))}function Ls(){try{const e=localStorage.getItem(Kt);D=e?JSON.parse(e):[]}catch{D=[]}return D}function Le(){D.length>Ot&&(D=D.slice(-Ot));const e=JSON.stringify(D,(t,s)=>{if(!(t==="dataUrl"&&typeof s=="string"&&s.startsWith("data:image/")))return t==="url"&&typeof s=="string"&&s.startsWith("data:image/")?"[image]":s});try{localStorage.setItem(Kt,e)}catch(t){t.name==="QuotaExceededError"&&D.length>1&&(D.shift(),Le())}}function De(){return D.find(e=>e.id===ve)||null}function es(){const e={id:crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2),title:"新会话",messages:[],createdAt:Date.now(),updatedAt:Date.now()};return D.push(e),ve=e.id,Le(),e}function qs(e){D=D.filter(t=>t.id!==e),ve===e&&(ve=D.length>0?D[D.length-1].id:null),Le()}function _s(e){var t,s,o;if(e.messages.length>=1&&e.title==="新会话"){const n=e.messages.find(l=>l.role==="user");if(n){const l=n._text||(typeof n.content=="string"?n.content:((o=(s=(t=n.content)==null?void 0:t.find)==null?void 0:s.call(t,r=>r.type==="text"))==null?void 0:o.text)||"[图片消息]"),a=l.split(`
`).find(r=>r.trim())||l,i=a.slice(0,30)+(a.length>30?"...":"");e.title=i}}}function Ze(e,t){let s=(e||"").replace(/\/+$/,"");s=s.replace(/\/api\/chat\/?$/,""),s=s.replace(/\/api\/generate\/?$/,""),s=s.replace(/\/api\/tags\/?$/,""),s=s.replace(/\/api\/?$/,""),s=s.replace(/\/chat\/completions\/?$/,""),s=s.replace(/\/completions\/?$/,""),s=s.replace(/\/responses\/?$/,""),s=s.replace(/\/messages\/?$/,""),s=s.replace(/\/models\/?$/,"");const o=X(t||u.apiType);return o==="anthropic-messages"?(s.endsWith("/v1")||(s+="/v1"),s):o==="google-gemini"?s:/:(11434)$/i.test(s)&&!s.endsWith("/v1")?`${s}/v1`:s}function Ee(e,t){const s=X(e||u.apiType),o=t||u.apiKey||"";if(s==="anthropic-messages"){const l={"Content-Type":"application/json","anthropic-version":"2023-06-01"};return o&&(l["x-api-key"]=o),l}const n={"Content-Type":"application/json"};return o&&(n.Authorization=`Bearer ${o}`),n}const jt=12e4,As=3e4;async function ts(e,t){const s=X(u.apiType);if(!u.baseUrl||!u.model||Be(s)&&!u.apiKey)throw new Error("请先配置 AI 模型（点击右上角设置按钮）");const o=Ze(u.baseUrl,s);M=new AbortController;const n=[{role:"system",content:Vt()},...e];let l=!1;const a=setTimeout(()=>{l=!0,M&&M.abort()},jt);try{if(s==="anthropic-messages"){await Os(o,n,t);return}if(s==="google-gemini"){await Es(o,n,t);return}try{await Cs(o,n,t);return}catch(i){if(i.name==="AbortError"&&l)throw new Error(`请求超时（${jt/1e3} 秒），模型响应时间过长`);const r=i.message||"";if(r.includes("legacy protocol")||r.includes("/v1/responses")||r.includes("not supported")){console.log("[assistant] Chat Completions 不支持此模型，自动切换到 Responses API"),M=new AbortController,await Ms(o,n,t);return}throw i}}finally{clearTimeout(a)}}let E=null;async function Cs(e,t,s){var r,d,m;const o=e+"/chat/completions",n={model:u.model,messages:t,stream:!0,temperature:u.temperature||.7},l=Date.now();E={url:o,method:"POST",requestBody:{...n,messages:n.messages.map(g=>({role:g.role,content:typeof g.content=="string"?g.content.slice(0,200)+(g.content.length>200?"...":""):"[multimodal]"}))},requestTime:new Date(l).toLocaleString("zh-CN")};const a=await Me(o,{method:"POST",headers:Ee(),body:JSON.stringify(n),signal:M.signal});if(E.status=a.status,E.contentType=a.headers.get("content-type")||"",E.responseTime=new Date().toLocaleString("zh-CN"),E.latency=Date.now()-l+"ms",!a.ok){const g=await a.text().catch(()=>"");E.errorBody=g.slice(0,500);let p=`API 错误 ${a.status}`;try{const f=JSON.parse(g);p=((r=f.error)==null?void 0:r.message)||f.message||p}catch{g&&(p+=`: ${g.slice(0,200)}`)}throw new Error(p)}const i=a.headers.get("content-type")||"";if(i.includes("text/event-stream")||i.includes("text/plain")){E.streaming=!0;let g=0,p=0,f=0,v="";await et(a,x=>{var H,J;g++;const T=(J=(H=x.choices)==null?void 0:H[0])==null?void 0:J.delta;T&&(T.content?(p++,s(T.content)):T.reasoning_content&&(f++,v+=T.reasoning_content))},M==null?void 0:M.signal),E.chunks={total:g,content:p,reasoning:f},p===0&&v&&(console.warn("[assistant] 无 content 块，使用 reasoning_content 作为回复"),s(v),E.fallbackToReasoning=!0)}else{E.streaming=!1;const g=await a.json();E.responseBody={id:g.id,model:g.model,object:g.object,usage:g.usage},console.log("[assistant] 非流式响应:",g);const p=(m=(d=g.choices)==null?void 0:d[0])==null?void 0:m.message,f=(p==null?void 0:p.content)||(p==null?void 0:p.reasoning_content)||"";f&&s(f)}}async function Ms(e,t,s){var r,d;const o=e+"/responses",n=t.filter(m=>m.role!=="system"),l=((r=t.find(m=>m.role==="system"))==null?void 0:r.content)||"",a={model:u.model,input:n,instructions:l,stream:!0,temperature:u.temperature||.7},i=await Me(o,{method:"POST",headers:Ee(),body:JSON.stringify(a),signal:M.signal});if(!i.ok){const m=await i.text().catch(()=>"");let g=`API 错误 ${i.status}`;try{const p=JSON.parse(m);g=((d=p.error)==null?void 0:d.message)||p.message||g}catch{m&&(g+=`: ${m.slice(0,200)}`)}throw new Error(g)}await et(i,m=>{var g,p,f;m.type==="response.output_text.delta"&&m.delta&&s(m.delta),(f=(p=(g=m.choices)==null?void 0:g[0])==null?void 0:p.delta)!=null&&f.content&&s(m.choices[0].delta.content)},M==null?void 0:M.signal)}async function Os(e,t,s){var f,v;const o=e+"/messages",n=((f=t.find(x=>x.role==="system"))==null?void 0:f.content)||"",l=t.filter(x=>x.role!=="system"),a={model:u.model,max_tokens:8192,stream:!0,temperature:u.temperature||.7};n&&(a.system=n),a.messages=l;const i=Date.now();E={url:o,method:"POST",requestBody:{...a,messages:a.messages.map(x=>({role:x.role,content:typeof x.content=="string"?x.content.slice(0,200)+(x.content.length>200?"...":""):"[multimodal]"}))},requestTime:new Date(i).toLocaleString("zh-CN")};const r=await Me(o,{method:"POST",headers:Ee(),body:JSON.stringify(a),signal:M.signal});if(E.status=r.status,E.contentType=r.headers.get("content-type")||"",E.responseTime=new Date().toLocaleString("zh-CN"),E.latency=Date.now()-i+"ms",!r.ok){const x=await r.text().catch(()=>"");E.errorBody=x.slice(0,500);let T=`API 错误 ${r.status}`;try{const H=JSON.parse(x);T=((v=H.error)==null?void 0:v.message)||H.message||T}catch{x&&(T+=`: ${x.slice(0,200)}`)}throw new Error(T)}E.streaming=!0;let d=0,m=0,g=0,p="";await et(r,x=>{if(d++,x.type==="content_block_delta"){const T=x.delta;(T==null?void 0:T.type)==="text_delta"&&T.text?(m++,s(T.text)):(T==null?void 0:T.type)==="thinking_delta"&&T.thinking&&(g++,p+=T.thinking)}},M==null?void 0:M.signal),E.chunks={total:d,content:m,thinking:g},m===0&&p&&(console.warn("[assistant] Anthropic: 无 text 块，使用 thinking 作为回复"),s(p),E.fallbackToThinking=!0)}async function Es(e,t,s){var g,p;const o=((g=t.find(f=>f.role==="system"))==null?void 0:g.content)||"",a={contents:t.filter(f=>f.role!=="system").map(f=>({role:f.role==="assistant"?"model":"user",parts:[{text:typeof f.content=="string"?f.content:JSON.stringify(f.content)}]})),generationConfig:{temperature:u.temperature||.7}};o&&(a.systemInstruction={parts:[{text:o}]});const i=`${e}/models/${u.model}:streamGenerateContent?alt=sse&key=${u.apiKey}`,r=Date.now();E={url:i.replace(u.apiKey,"***"),method:"POST",requestTime:new Date(r).toLocaleString("zh-CN")};const d=await Me(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a),signal:M.signal});if(E.status=d.status,E.latency=Date.now()-r+"ms",!d.ok){const f=await d.text().catch(()=>"");let v=`API 错误 ${d.status}`;try{v=((p=JSON.parse(f).error)==null?void 0:p.message)||v}catch{}throw new Error(v)}E.streaming=!0;let m=0;await et(d,f=>{var x,T,H,J,Y;m++;const v=(Y=(J=(H=(T=(x=f.candidates)==null?void 0:x[0])==null?void 0:T.content)==null?void 0:H.parts)==null?void 0:J[0])==null?void 0:Y.text;v&&s(v)},M==null?void 0:M.signal),E.chunks={total:m}}async function et(e,t,s){const o=e.body.getReader(),n=new TextDecoder;let l="";const a=()=>{try{o.cancel()}catch{}};if(s){if(s.aborted)throw o.cancel(),new DOMException("Aborted","AbortError");s.addEventListener("abort",a,{once:!0})}try{for(;;){if(s!=null&&s.aborted)throw new DOMException("Aborted","AbortError");const i=o.read(),r=new Promise((p,f)=>setTimeout(()=>f(new Error("流式响应超时：30 秒内未收到数据")),As)),{done:d,value:m}=await Promise.race([i,r]);if(d){if(s!=null&&s.aborted)throw new DOMException("Aborted","AbortError");break}l+=n.decode(m,{stream:!0});const g=l.split(`
`);l=g.pop()||"";for(const p of g){if(s!=null&&s.aborted)throw new DOMException("Aborted","AbortError");const f=p.trim();if(!f||f.startsWith("event:")||!f.startsWith("data:"))continue;const v=f.slice(5).trim();if(v==="[DONE]")return;try{t(JSON.parse(v))}catch{}}}}finally{s==null||s.removeEventListener("abort",a)}}async function Is(e,t){switch(e){case"run_command":return await C.assistantExec(t.command,t.cwd);case"read_file":return await C.assistantReadFile(t.path);case"write_file":return await C.assistantWriteFile(t.path,t.content);case"list_directory":return await C.assistantListDir(t.path);case"get_system_info":return await C.assistantSystemInfo();case"list_processes":return await C.assistantListProcesses(t.filter);case"check_port":return await C.assistantCheckPort(t.port);case"ask_user":return await ss(t);case"web_search":return await C.assistantWebSearch(t.query,t.max_results);case"fetch_url":return await C.assistantFetchUrl(t.url);case"skills_list":{const s=await C.skillsList(),o=(s==null?void 0:s.skills)||[],n=o.filter(r=>r.eligible&&!r.disabled),l=o.filter(r=>!r.eligible&&!r.disabled),a=o.filter(r=>r.disabled);let i=`共 ${o.length} 个 Skills: ${n.length} 可用, ${l.length} 缺依赖, ${a.length} 已禁用

`;return n.length&&(i+=`## 可用 (${n.length})
`+n.map(r=>`- ${r.emoji||"📦"} **${r.name}**: ${r.description||""}${r.bundled?" [捆绑]":""}`).join(`
`)+`

`),l.length&&(i+=`## 缺依赖 (${l.length})
`+l.map(r=>{const d=r.missing||{},m=[...d.bins||[],...(d.env||[]).map(p=>"$"+p),...d.config||[]].join(", "),g=(r.install||[]).map(p=>p.label).join(" / ");return`- ${r.emoji||"📦"} **${r.name}**: 缺少 ${m}${g?" → 可通过: "+g:""}`}).join(`
`)+`

`),a.length&&(i+=`## 已禁用 (${a.length})
`+a.map(r=>`- ${r.emoji||"📦"} **${r.name}**: ${r.description||""}`).join(`
`)+`
`),i}case"skills_info":return JSON.stringify(await C.skillsInfo(t.name),null,2);case"skills_check":return JSON.stringify(await C.skillsCheck(),null,2);case"skills_install_dep":{const s=await C.skillsInstallDep(t.kind,t.spec);return s!=null&&s.success?`安装成功
${s.output||""}`:"安装失败"}case"skills_clawhub_search":{const s=await C.skillsClawHubSearch(t.query);return s!=null&&s.length?s.map(o=>`- **${o.slug}**: ${o.description||"无描述"}`).join(`
`):"未找到匹配的 Skill"}case"skills_clawhub_install":{const s=await C.skillsClawHubInstall(t.slug);return s!=null&&s.success?`Skill "${t.slug}" 安装成功
${s.output||""}`:"安装失败"}default:return`未知工具: ${e}`}}function ss({question:e,type:t,options:s,placeholder:o}){const n=De();return n&&ee(n.id,"waiting"),new Promise(l=>{const a="ask-user-"+Date.now(),i=(s||[]).map((g,p)=>`<label class="ast-ask-option">
        <input type="${t==="multiple"?"checkbox":"radio"}" name="${a}" value="${w(g)}">
        <span>${w(g)}</span>
      </label>`).join(""),r=t==="text"||!(s!=null&&s.length)?`<textarea class="ast-ask-text" placeholder="${w(o||"请输入...")}" rows="2"></textarea>`:"",d=t!=="text"&&(s!=null&&s.length)?'<div class="ast-ask-custom"><input type="text" class="ast-ask-custom-input" placeholder="或输入自定义内容..."></div>':"",m=document.createElement("div");m.className="ast-ask-card",m.id=a,m.innerHTML=`
      <div class="ast-ask-question">${w(e)}</div>
      ${i?`<div class="ast-ask-options">${i}</div>`:""}
      ${d}
      ${r}
      <div class="ast-ask-actions">
        <button class="ast-ask-submit btn btn-primary btn-sm">确认</button>
        <button class="ast-ask-skip btn btn-secondary btn-sm">跳过</button>
      </div>
    `,b.appendChild(m),b.scrollTop=b.scrollHeight,m.querySelector(".ast-ask-submit").addEventListener("click",()=>{var p,f,v,x,T,H;let g="";if(t==="text"||!(s!=null&&s.length))g=((f=(p=m.querySelector(".ast-ask-text"))==null?void 0:p.value)==null?void 0:f.trim())||"";else if(t==="multiple"){const J=[...m.querySelectorAll('input[type="checkbox"]:checked')].map(Ie=>Ie.value),Y=(x=(v=m.querySelector(".ast-ask-custom-input"))==null?void 0:v.value)==null?void 0:x.trim();Y&&J.push(Y),g=J.join("、")||"未选择"}else{const J=m.querySelector('input[type="radio"]:checked');g=((H=(T=m.querySelector(".ast-ask-custom-input"))==null?void 0:T.value)==null?void 0:H.trim())||(J==null?void 0:J.value)||"未选择"}m.innerHTML=`<div class="ast-ask-answered">
        <div class="ast-ask-question">${w(e)}</div>
        <div class="ast-ask-answer">${O("check",14)} ${w(g)}</div>
      </div>`,m.classList.add("answered"),n&&ee(n.id,"streaming"),l(`用户回答: ${g}`)}),m.querySelector(".ast-ask-skip").addEventListener("click",()=>{m.innerHTML=`<div class="ast-ask-answered">
        <div class="ast-ask-question">${w(e)}</div>
        <div class="ast-ask-answer" style="color:var(--text-tertiary)">— 已跳过</div>
      </div>`,m.classList.add("answered"),n&&ee(n.id,"streaming"),l("用户跳过了此问题")})})}async function zt(e,t=!1){const s=e.function.name;let o;try{o=JSON.parse(e.function.arguments)}catch{o={}}let n="";if(s==="run_command")n=`执行命令:

${o.command}${o.cwd?`

工作目录: `+o.cwd:""}`;else if(s==="write_file"){const r=(o.content||"").slice(0,200);n=`写入文件:
${o.path}

内容预览:
${r}${(o.content||"").length>200?`
...(已截断)`:""}`}const l=t?`⛔ 安全围栏拦截 — 此命令被识别为极端危险操作！

`:"",a=De();a&&ee(a.id,"waiting");const i=await pt(`${l}AI 请求执行以下操作:

${n}

是否允许？`);return a&&ee(a.id,"streaming"),i}function Hs(e){return e.map(t=>({name:t.function.name,description:t.function.description||"",input_schema:t.function.parameters||{type:"object",properties:{}}}))}function Ps(e){return[{functionDeclarations:e.map(t=>({name:t.function.name,description:t.function.description||"",parameters:t.function.parameters||{type:"object",properties:{}}}))}]}async function nt(e,t,s){let o="",n=!0;const l=Oe[ge()];if(e==="run_command"&&gs(t.command)?(n=await zt(s||{function:{name:e,arguments:JSON.stringify(t)}},!0),n||(o="用户拒绝了此危险操作")):l.confirmDanger&&us.has(e)&&(n=await zt(s||{function:{name:e,arguments:JSON.stringify(t)}}),n||(o="用户拒绝了此操作")),n)try{o=await Is(e,t)}catch(i){o=`执行失败: ${typeof i=="string"?i:i.message||JSON.stringify(i)}`}return{result:o,approved:n}}async function ns(e,t,s){var m,g,p,f,v,x,T,H,J,Y,Ie;const o=X(u.apiType);if(!u.baseUrl||!u.model||Be(o)&&!u.apiKey)throw new Error("请先配置 AI 模型（点击右上角设置按钮）");const n=Ze(u.baseUrl,o),l=mt();let a=[{role:"system",content:Vt()},...e];const i=[],r=(m=u.autoRounds)!=null?m:8;let d=r;for(let K=0;;K++){if(!te||(g=M==null?void 0:M.signal)!=null&&g.aborted)throw new DOMException("Aborted","AbortError");if(r>0&&K>=d){const W=await ss({question:`AI 已连续调用工具 ${K} 轮，可能陷入循环。你希望怎么做？`,type:"single",options:[`继续执行 ${r} 轮`,"不再中断，一直执行","让 AI 换个思路","停止并总结"]});if(W.includes("停止"))return{content:"用户要求停止工具调用，以下是目前的执行情况摘要。",toolHistory:i};W.includes("换个思路")?(a.push({role:"user",content:"请换一种方法来解决这个问题，不要重复之前失败的操作。"}),d=K+r):W.includes("不再中断")?d=1/0:d=K+r}if(M=new AbortController,t(K===0?"AI 思考中...":`AI 处理工具结果 (第${K+1}轮)...`),o==="anthropic-messages"){const W=((p=a.find(U=>U.role==="system"))==null?void 0:p.content)||"",ne=a.filter(U=>U.role!=="system"),pe={model:u.model,max_tokens:8192,temperature:u.temperature||.7,messages:ne};W&&(pe.system=W),l.length>0&&(pe.tools=Hs(l));const F=await Me(n+"/messages",{method:"POST",headers:Ee(),body:JSON.stringify(pe),signal:M.signal});if(!F.ok){const U=await F.text().catch(()=>"");let ae=`API 错误 ${F.status}`;try{ae=((f=JSON.parse(U).error)==null?void 0:f.message)||ae}catch{}throw new Error(ae)}const Q=(await F.json()).content||[],Pe=Q.filter(U=>U.type==="tool_use"),ke=Q.filter(U=>U.type==="text").map(U=>U.text).join("");if(Pe.length>0){a.push({role:"assistant",content:Q});const U=[];for(const ae of Pe){const c=ae.input||{};i.push({name:ae.name,args:c,result:null,approved:!0,pending:!0}),s(i);const{result:h,approved:k}=await nt(ae.name,c),S=i[i.length-1];S.result=h,S.approved=k,S.pending=!1,s(i),U.push({type:"tool_result",tool_use_id:ae.id,content:typeof h=="string"?h:JSON.stringify(h)})}a.push({role:"user",content:U});continue}return{content:ke,toolHistory:i}}if(o==="google-gemini"){const W=((v=a.find(c=>c.role==="system"))==null?void 0:v.content)||"",F={contents:a.filter(c=>c.role!=="system").map(c=>({role:c.role==="assistant"?"model":c.role==="tool"?"function":"user",parts:c.functionResponse?[{functionResponse:c.functionResponse}]:[{text:typeof c.content=="string"?c.content:JSON.stringify(c.content)}]})),generationConfig:{temperature:u.temperature||.7}};W&&(F.systemInstruction={parts:[{text:W}]}),l.length>0&&(F.tools=Ps(l));const _e=`${n}/models/${u.model}:generateContent?key=${u.apiKey}`,Q=await Me(_e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(F),signal:M.signal});if(!Q.ok){const c=await Q.text().catch(()=>"");let h=`API 错误 ${Q.status}`;try{h=((x=JSON.parse(c).error)==null?void 0:x.message)||h}catch{}throw new Error(h)}const ke=((J=(H=(T=(await Q.json()).candidates)==null?void 0:T[0])==null?void 0:H.content)==null?void 0:J.parts)||[],U=ke.filter(c=>c.functionCall),ae=ke.filter(c=>c.text).map(c=>c.text).join("");if(U.length>0){a.push({role:"assistant",content:ae,_geminiParts:ke});for(const c of U){const h=c.functionCall.args||{};i.push({name:c.functionCall.name,args:h,result:null,approved:!0,pending:!0}),s(i);const{result:k,approved:S}=await nt(c.functionCall.name,h),y=i[i.length-1];y.result=k,y.approved=S,y.pending=!1,s(i),a.push({role:"tool",content:typeof k=="string"?k:JSON.stringify(k),functionResponse:{name:c.functionCall.name,response:{result:typeof k=="string"?k:JSON.stringify(k)}}})}continue}return{content:ae,toolHistory:i}}const j={model:u.model,messages:a,temperature:u.temperature||.7};l.length>0&&(j.tools=l);const qe=await Me(n+"/chat/completions",{method:"POST",headers:Ee(),body:JSON.stringify(j),signal:M.signal});if(!qe.ok){const W=await qe.text().catch(()=>"");let ne=`API 错误 ${qe.status}`;try{ne=((Y=JSON.parse(W).error)==null?void 0:Y.message)||ne}catch{}throw new Error(ne)}const He=(Ie=(await qe.json()).choices)==null?void 0:Ie[0],de=He==null?void 0:He.message;if(!de)throw new Error("AI 未返回有效响应");if(de.tool_calls&&de.tool_calls.length>0){a.push(de);for(const W of de.tool_calls){let ne;try{ne=JSON.parse(W.function.arguments)}catch{ne={}}const pe=W.function.name;i.push({name:pe,args:ne,result:null,approved:!0,pending:!0}),s(i);const{result:F,approved:_e}=await nt(pe,ne,W),Q=i[i.length-1];Q.result=F,Q.approved=_e,Q.pending=!1,s(i),a.push({role:"tool",tool_call_id:W.id,content:typeof F=="string"?F:JSON.stringify(F)})}continue}return{content:de.content||de.reasoning_content||"",toolHistory:i}}}function xe(){if(!Je)return;const e=[...D].reverse();Je.innerHTML=e.map(t=>{const s=Xe(t.id),o=s==="streaming"?"ast-status-dot streaming":s==="waiting"?"ast-status-dot waiting":s==="error"?"ast-status-dot error":"",n=o?`<span class="${o}"></span>`:"";return`<div class="ast-session-item ${t.id===ve?"active":""}" data-id="${t.id}">
      ${n}<span class="ast-session-title">${w(t.title)}</span>
      <button class="ast-session-delete" data-delete="${t.id}" title="删除会话">×</button>
    </div>`}).join("")||'<div class="ast-empty">暂无会话</div>'}function yt(e){return!e||e.length===0?"":e.map(t=>{var r,d,m;if(t.name==="ask_user")return"";const s={run_command:O("terminal",14),write_file:O("edit",14),read_file:O("file",14),list_directory:O("folder",14),get_system_info:O("monitor",14),list_processes:O("list",14),check_port:O("plug",14),skills_list:O("box",14),skills_info:O("box",14),skills_check:O("box",14),skills_install_dep:O("download",14),skills_clawhub_search:O("search",14),skills_clawhub_install:O("download",14)}[t.name]||O("wrench",14),o={run_command:"执行命令",read_file:"读取文件",write_file:"写入文件",list_directory:"列出目录",get_system_info:"系统信息",list_processes:"进程列表",check_port:"端口检测",skills_list:"Skills 列表",skills_info:"Skill 详情",skills_check:"Skills 检查",skills_install_dep:"安装依赖",skills_clawhub_search:"搜索 ClawHub",skills_clawhub_install:"安装 Skill"}[t.name]||t.name,n=t.name==="run_command"?w(t.args.command||""):t.name==="read_file"||t.name==="write_file"||t.name==="list_directory"?w(t.args.path||""):t.name==="get_system_info"?"":t.name==="list_processes"?w(t.args.filter||"全部"):t.name==="check_port"?w(String(t.args.port||"")):t.name==="skills_info"?w(t.args.name||""):t.name==="skills_install_dep"?w(`${t.args.kind}: ${((r=t.args.spec)==null?void 0:r.formula)||((d=t.args.spec)==null?void 0:d.package)||((m=t.args.spec)==null?void 0:m.module)||""}`):t.name==="skills_clawhub_search"?w(t.args.query||""):t.name==="skills_clawhub_install"?w(t.args.slug||""):["skills_list","skills_check"].includes(t.name)?"":w(JSON.stringify(t.args));if(t.pending)return`<div class="ast-tool-block pending">
        <div class="ast-tool-summary">${s} <strong>${o}</strong> <code>${n}</code> <span class="ast-tool-status"><span class="ast-typing">执行中...</span></span></div>
      </div>`;const l=t.approved===!1?"denied":"ok",a=t.approved===!1?"已拒绝":"已执行",i=(t.result||"").length>500?t.result.slice(0,500)+"...":t.result||"";return`<details class="ast-tool-block ${l}">
      <summary class="ast-tool-summary">${s} <strong>${o}</strong> <code>${n}</code> <span class="ast-tool-status">${a}</span></summary>
      <pre class="ast-tool-result">${w(i)}</pre>
    </details>`}).join("")}function Dt(){const e=sessionStorage.getItem("assistant-error-context");if(e)try{Te=JSON.parse(e)}catch{Te=null}}function Ut(){var e;Te=null,sessionStorage.removeItem("assistant-error-context"),(e=b==null?void 0:b.querySelector(".ast-error-banner"))==null||e.remove()}function ct(){if(!Te||!b||b.querySelector(".ast-error-banner"))return;const e=Te,t=document.createElement("div");t.className="ast-error-banner",t.innerHTML=`
    <div class="ast-error-banner-header">
      <span class="ast-error-banner-icon">${me("warn",18)}</span>
      <span class="ast-error-banner-title">${w(e.title)}</span>
      <div class="ast-error-banner-actions">
        <button class="btn-analyze">让 AI 分析</button>
        <button class="btn-dismiss">忽略</button>
      </div>
    </div>
    ${e.hint?`<div class="ast-error-banner-hint">${w(e.hint)}</div>`:""}
    ${e.error?`
      <button class="ast-error-toggle">查看详细日志 ▼</button>
      <div class="ast-error-banner-detail">
        <pre>${w(e.error)}</pre>
      </div>
    `:""}
  `;const s=t.querySelector(".ast-error-toggle"),o=t.querySelector(".ast-error-banner-detail");s&&o&&s.addEventListener("click",()=>{const n=o.classList.toggle("expanded");s.textContent=n?"收起日志 ▲":"查看详细日志 ▼"}),t.querySelector(".btn-analyze").addEventListener("click",()=>{const n=[e.scene?`**场景**: ${e.scene}`:"",e.title?`**错误**: ${e.title}`:"",e.hint?`**提示**: ${e.hint}`:"",e.error?`
\`\`\`
${e.error}
\`\`\``:"",`
请分析以上错误信息，给出原因和修复方案。`].filter(Boolean).join(`
`);ge()==="chat"&&(u.mode="execute",Ge(),re==null||re.querySelectorAll(".ast-mode-btn").forEach(l=>l.classList.toggle("active",l.dataset.mode==="execute"))),Ut(),Re(n)}),t.querySelector(".btn-dismiss").addEventListener("click",()=>{Ut()}),b.insertBefore(t,b.firstChild)}function oe(){const e=De();if(b){if(!e||e.messages.length===0){const t=ut.map(s=>`
      <button class="ast-skill-card" data-skill="${s.id}">
        <span class="ast-skill-icon">${s.icon}</span>
        <div class="ast-skill-info">
          <strong>${s.name}</strong>
          <span>${s.desc}</span>
        </div>
      </button>
    `).join("");b.innerHTML=`
      <div class="ast-welcome">
        <div class="ast-welcome-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
          </svg>
        </div>
        <h3>${(u==null?void 0:u.assistantName)||be}</h3>
        <p>我可以帮你分析日志、排查问题、配置 OpenClaw。<br>点击下方技能卡片，AI 会自动调用工具完成任务。</p>
        ${js()}
        <div class="ast-skills-grid">${t}</div>
      </div>
    `,Te&&ct();return}b.innerHTML=e.messages.map((t,s)=>{var o,n,l,a;if(t.role==="user"){const i=t._text||(typeof t.content=="string"?t.content:((l=(n=(o=t.content)==null?void 0:o.find)==null?void 0:n.call(o,d=>d.type==="text"))==null?void 0:l.text)||""),r=(a=t._images)!=null&&a.length?`<div class="ast-msg-images">${t._images.map(d=>d.dataUrl?`<img class="ast-msg-img" src="${d.dataUrl}" alt="${w(d.name)}" style="max-width:${Math.min(d.width||300,300)}px" loading="lazy"/>`:`<div class="ast-msg-img-loading" data-db-id="${d.dbId||""}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>${w(d.name||"图片")}</span></div>`).join("")}</div>`:"";return`<div class="ast-msg ast-msg-user" data-msg-idx="${s}"><div class="ast-msg-bubble ast-msg-bubble-user">${r}${i?w(i):""}</div></div>`}else if(t.role==="assistant"){const i=yt(t.toolHistory);return`<div class="ast-msg ast-msg-ai" data-msg-idx="${s}">${i}<div class="ast-msg-bubble ast-msg-bubble-ai">${ze(t.content)}</div></div>`}return""}).join(""),b.querySelectorAll(".ast-msg-img-loading[data-db-id]").forEach(async t=>{var n;const s=t.dataset.dbId;if(!s)return;const o=await cs(s);if(o){const l=document.createElement("img");l.className="ast-msg-img",l.src=o,l.alt=((n=t.querySelector("span"))==null?void 0:n.textContent)||"图片",l.loading="lazy",l.style.maxWidth="300px",t.replaceWith(l);for(const a of D)for(const i of a.messages)if(i._images){const r=i._images.find(d=>d.dbId===s);r&&(r.dataUrl=o)}}else t.classList.remove("ast-msg-img-loading"),t.classList.add("ast-msg-img-placeholder")}),requestAnimationFrame(()=>{b.scrollTop=b.scrollHeight})}}function at({success:e,elapsed:t,usedApi:s,reqUrl:o,reqBody:n,respStatus:l,respBody:a,reply:i,error:r}){let d="";if(r?d+=`<span style="color:var(--error)">✗ 请求失败: ${w(r)}</span>`:e?d+=`<span style="color:var(--success)">✓ 模型回复成功 (${t}ms, ${s} API)</span>`:d+=`<span style="color:var(--warning)">${me("warn",14)} HTTP ${l} — 请求完成但未解析到回复内容</span>`,i){const m=i.length>80?i.slice(0,80)+"...":i;d+=`<div style="margin-top:4px;padding:6px 8px;background:var(--bg-tertiary);border-radius:4px;font-size:12px;color:var(--text-secondary)">「${w(m)}」</div>`}d+='<details style="margin-top:6px;font-size:11px"><summary style="cursor:pointer;color:var(--text-tertiary);user-select:none">查看完整请求/响应参数</summary>',d+='<div style="margin-top:4px;max-height:200px;overflow:auto;background:var(--bg-tertiary);border-radius:4px;padding:8px;font-family:var(--font-mono);font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all">',d+=`<strong>POST</strong> ${w(o)}

`,d+=`<strong>Request Body:</strong>
${w(JSON.stringify(n,null,2))}

`,d+=`<strong>Response Status:</strong> ${l}

`,d+=`<strong>Response Body:</strong>
`;try{d+=w(JSON.stringify(JSON.parse(a),null,2))}catch{d+=w((a==null?void 0:a.slice(0,2e3))||"(empty)")}return d+="</div></details>",d}function Rs(){var de,tt,W,ne,pe,F,_e,Q,Pe,ke,U,ae;const e=u,t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" style="max-width:500px">
      <div class="modal-title" style="margin-bottom:0">${e.assistantName||be} — 设置</div>
      <div class="ast-settings-tabs">
        <button class="ast-tab active" data-tab="api">模型配置</button>
        <button class="ast-tab" data-tab="tools">工具权限</button>
        <button class="ast-tab" data-tab="persona">助手人设</button>
        <button class="ast-tab" data-tab="knowledge">知识库</button>
      </div>
      <div class="modal-body">
      <div class="ast-settings-form">
        <div class="ast-tab-panel active" data-panel="api">
          <div class="form-group" style="margin-bottom:8px">
            <label class="form-label">快捷选择</label>
            <div id="ast-provider-presets" style="display:flex;flex-wrap:wrap;gap:6px">
              ${Mt.filter(c=>!c.hidden).map(c=>`<button class="btn btn-sm btn-secondary ast-preset-btn" data-key="${c.key}" data-url="${w(c.baseUrl)}" data-api="${c.api}" style="font-size:12px;padding:3px 10px">${c.label}${c.badge?' <span style="font-size:9px;background:var(--accent);color:#fff;padding:1px 4px;border-radius:6px;margin-left:3px">'+c.badge+"</span>":""}</button>`).join("")}
            </div>
            <div id="ast-preset-detail" style="display:none;margin-top:6px;padding:8px 12px;background:var(--bg-tertiary);border-radius:var(--radius-md);font-size:12px"></div>
          </div>
          <div style="display:flex;gap:10px">
            <div class="form-group" style="flex:1">
              <label class="form-label">API Base URL</label>
              <input class="form-input" id="ast-baseurl" value="${w(e.baseUrl)}" placeholder="${w(It(e.apiType))}">
            </div>
            <div class="form-group" style="width:170px">
              <label class="form-label">API 类型</label>
              <select class="form-input" id="ast-apitype">
                ${ds.map(c=>`<option value="${c.value}" ${e.apiType===c.value?"selected":""}>${c.label}</option>`).join("")}
              </select>
            </div>
          </div>
          <div style="display:flex;gap:10px;align-items:flex-end">
            <div class="form-group" style="flex:1;margin-bottom:0">
              <label class="form-label">API Key</label>
              <input class="form-input" id="ast-apikey" type="password" value="${w(e.apiKey)}" placeholder="${w(Ht(e.apiType))}">
            </div>
            <div style="display:flex;gap:6px;padding-bottom:1px">
              <button class="btn btn-sm btn-secondary" id="ast-btn-test" title="测试连通性">测试</button>
              <button class="btn btn-sm btn-secondary" id="ast-btn-models" title="从 API 获取可用模型">拉取</button>
              <button class="btn btn-sm btn-secondary" id="ast-btn-import" title="从 OpenClaw 导入模型配置">${O("download",14)} 导入</button>
            </div>
          </div>
          <div id="ast-test-result" style="margin:6px 0 2px;font-size:12px;min-height:16px"></div>
          <div style="display:flex;gap:10px;align-items:flex-end">
            <div class="form-group" style="flex:1">
              <label class="form-label">模型</label>
              <div style="position:relative">
                <input class="form-input" id="ast-model" value="${w(e.model)}" placeholder="gpt-4o / deepseek-chat" autocomplete="off">
                <div id="ast-model-dropdown" class="ast-model-dropdown" style="display:none"></div>
              </div>
            </div>
            <div class="form-group" style="width:80px">
              <label class="form-label">温度</label>
              <input class="form-input" id="ast-temp" type="number" value="${e.temperature||.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          <div class="form-hint" id="ast-api-hint" style="margin-top:-4px">${Et(e.apiType)}</div>

          <div id="ast-qtcool-promo" style="margin-top:14px;border-radius:var(--radius-lg);background:var(--bg-tertiary);border:1px solid var(--border-primary);overflow:hidden">
            <div style="padding:14px 16px 10px">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                ${O("zap",16)}
                <span style="font-weight:600;font-size:var(--font-size-sm)">晴辰云快捷接入</span>
                <span style="font-size:10px;background:var(--primary);color:#fff;padding:1px 6px;border-radius:8px">推荐</span>
              </div>
              <div style="font-size:var(--font-size-xs);color:var(--text-secondary);line-height:1.5;margin-bottom:10px">
                在力所能及的范围内为用户提供不限量的模型支持。选择模型后一键接入助手。
              </div>
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <select id="ast-qtcool-model" class="form-input" style="font-size:12px;padding:5px 10px;min-width:140px;flex:1">
                  <option value="" disabled selected>加载模型列表...</option>
                </select>
                <button class="btn btn-sm btn-secondary" id="ast-qtcool-test">${O("search",12)} 测试</button>
                <button class="btn btn-sm btn-primary" id="ast-qtcool-apply">${O("zap",12)} 接入</button>
              </div>
              <div id="ast-qtcool-status" style="margin-top:8px;font-size:11px;min-height:16px;line-height:1.5"></div>
            </div>
            <div style="border-top:1px solid var(--border-primary);padding:8px 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;background:var(--bg-secondary)">
              <label style="cursor:pointer;display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-tertiary)">
                <input type="checkbox" id="ast-qtcool-customkey" style="accent-color:var(--primary);width:13px;height:13px"> 使用自定义密钥
              </label>
              <div style="display:flex;gap:12px;font-size:11px">
                <a href="${$e.site}" target="_blank" style="color:var(--primary);text-decoration:none">${O("external-link",12)} 了解更多</a>
              </div>
            </div>
            <div id="ast-qtcool-keyrow" style="display:none;border-top:1px solid var(--border-primary);padding:8px 16px;background:var(--bg-tertiary)">
              <input class="form-input" id="ast-qtcool-key" placeholder="粘贴你的密钥" style="font-size:12px;padding:6px 10px">
            </div>
          </div>
        </div>
        <div class="ast-tab-panel" data-panel="tools">
          <div class="form-hint" style="margin-bottom:10px">工具开关优先级高于模式设置。关闭的工具在任何模式下都不可用。</div>
          <label class="ast-switch-row">
            <span>终端工具 <span style="color:var(--text-tertiary);font-size:11px">— 允许执行 Shell 命令</span></span>
            <input type="checkbox" id="ast-tool-terminal" ${((de=e.tools)==null?void 0:de.terminal)!==!1?"checked":""}>
            <span class="ast-switch-track"></span>
          </label>
          <label class="ast-switch-row">
            <span>文件工具 <span style="color:var(--text-tertiary);font-size:11px">— 允许读写文件和浏览目录</span></span>
            <input type="checkbox" id="ast-tool-fileops" ${((tt=e.tools)==null?void 0:tt.fileOps)!==!1?"checked":""}>
            <span class="ast-switch-track"></span>
          </label>
          <label class="ast-switch-row">
            <span>联网搜索 <span style="color:var(--text-tertiary);font-size:11px">— 允许搜索互联网和抓取网页</span></span>
            <input type="checkbox" id="ast-tool-websearch" ${((W=e.tools)==null?void 0:W.webSearch)!==!1?"checked":""}>
            <span class="ast-switch-track"></span>
          </label>
          <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border-color)">
            <div class="form-group" style="margin-bottom:4px">
              <label class="form-label">工具连续执行轮次 <span style="color:var(--text-tertiary);font-size:11px">— 超过该轮次后暂停并询问</span></label>
              <select class="form-input" id="ast-auto-rounds" style="width:100%">
                <option value="0" ${((ne=e.autoRounds)!=null?ne:8)===0?"selected":""}>∞ 无限制（一直执行，不中断）</option>
                <option value="8" ${((pe=e.autoRounds)!=null?pe:8)===8?"selected":""}>8 轮（默认）</option>
                <option value="15" ${((F=e.autoRounds)!=null?F:8)===15?"selected":""}>15 轮</option>
                <option value="30" ${((_e=e.autoRounds)!=null?_e:8)===30?"selected":""}>30 轮</option>
                <option value="50" ${((Q=e.autoRounds)!=null?Q:8)===50?"selected":""}>50 轮</option>
              </select>
            </div>
            <div class="form-hint">设为「无限制」时 AI 将不会中断执行，适合复杂任务。随时可点停止按钮手动中止。</div>
          </div>
          <div class="form-hint" style="margin-top:10px">进程列表、端口检测、系统信息工具始终可用（非聊天模式下）。</div>
        </div>
        <div class="ast-tab-panel" data-panel="persona">
          <div class="form-group">
            <label class="form-label">身份来源</label>
            <div style="display:flex;flex-direction:column;gap:6px">
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                <input type="radio" name="ast-soul-source" value="default" ${!e.soulSource||e.soulSource==="default"?"checked":""}>
                <span>ClawStar 默认人设</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                <input type="radio" name="ast-soul-source" value="openclaw" ${(Pe=e.soulSource)!=null&&Pe.startsWith("openclaw:")?"checked":""}>
                <span>OpenClaw Agent 身份 <span style="font-size:11px;color:var(--text-tertiary)">（借尸还魂）</span></span>
              </label>
            </div>
          </div>
          <div id="ast-soul-default" style="${(ke=e.soulSource)!=null&&ke.startsWith("openclaw:")?"display:none":""}">
            <div class="form-group">
              <label class="form-label">助手名称</label>
              <input class="form-input" id="ast-name" value="${w(e.assistantName||be)}" placeholder="${be}">
            </div>
            <div class="form-group">
              <label class="form-label">助手性格</label>
              <textarea class="form-input" id="ast-personality" rows="3" placeholder="${Ne}" style="resize:vertical">${w(e.assistantPersonality||Ne)}</textarea>
              <div class="form-hint">描述助手的说话风格和行为方式，会注入到系统提示词中</div>
            </div>
          </div>
          <div id="ast-soul-openclaw" style="${(U=e.soulSource)!=null&&U.startsWith("openclaw:")?"":"display:none"}">
            <div class="form-group" style="margin-top:4px">
              <label class="form-label">选择 Agent</label>
              <div style="display:flex;gap:6px;align-items:center">
                <select class="form-input" id="ast-soul-agent" style="flex:1;font-family:var(--font-mono);font-size:13px">
                  <option value="" disabled>扫描中...</option>
                </select>
                <button class="btn btn-sm btn-primary" id="ast-btn-load-soul" style="gap:4px;white-space:nowrap">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
                  加载灵魂
                </button>
                <button class="btn btn-sm btn-ghost" id="ast-btn-refresh-soul" style="gap:4px;white-space:nowrap" title="重新扫描 Agent 列表">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </button>
              </div>
            </div>
            <div id="ast-soul-status" class="ast-soul-card" style="margin-top:8px">
              <div style="text-align:center;padding:16px 0;color:var(--text-tertiary);font-size:12px">
                选择 Agent 后点击「加载灵魂」读取身份文件
              </div>
            </div>
            <div class="form-hint" style="margin-top:8px">附身后助手将继承 Agent 的人格、记忆和用户偏好，同时保留 ClawStar 的工具能力。</div>
          </div>
        </div>
        <div class="ast-tab-panel" data-panel="knowledge">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <div class="form-hint" style="margin:0">为助手添加自定义知识，对话时会自动注入到系统提示词中。</div>
            <button class="btn btn-sm btn-primary" id="ast-kb-add" style="gap:4px;white-space:nowrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              添加
            </button>
          </div>
          <div id="ast-kb-editor" style="display:none;margin-bottom:10px">
            <div class="form-group" style="margin-bottom:6px">
              <input class="form-input" id="ast-kb-name" placeholder="知识名称，如：产品文档、API参考" style="font-size:13px">
            </div>
            <div class="form-group" style="margin-bottom:6px">
              <textarea class="form-input" id="ast-kb-content" rows="6" placeholder="粘贴知识内容（支持 Markdown 格式）..." style="resize:vertical;font-size:12px;font-family:var(--font-mono)"></textarea>
            </div>
            <div style="display:flex;gap:6px;justify-content:flex-end">
              <button class="btn btn-sm btn-secondary" id="ast-kb-cancel">取消</button>
              <button class="btn btn-sm btn-primary" id="ast-kb-save">保存知识</button>
            </div>
          </div>
          <div class="ast-soul-card" id="ast-kb-list"></div>
          <div class="form-hint" style="margin-top:8px" id="ast-kb-hint"></div>
        </div>
      </div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-secondary btn-sm" data-action="cancel">取消</button>
        <button class="btn btn-primary btn-sm" data-action="confirm">保存</button>
      </div>
    </div>
  `,document.body.appendChild(t),t.querySelectorAll(".ast-tab").forEach(c=>{c.addEventListener("click",()=>{var h;t.querySelectorAll(".ast-tab").forEach(k=>k.classList.remove("active")),t.querySelectorAll(".ast-tab-panel").forEach(k=>k.classList.remove("active")),c.classList.add("active"),(h=t.querySelector(`.ast-tab-panel[data-panel="${c.dataset.tab}"]`))==null||h.classList.add("active")})});const s=t.querySelector("#ast-apitype"),o=t.querySelector("#ast-api-hint"),n=t.querySelector("#ast-baseurl"),l=t.querySelector("#ast-apikey");t.querySelectorAll(".ast-preset-btn").forEach(c=>{c.onclick=()=>{n.value=c.dataset.url,s.value=c.dataset.api,s.dispatchEvent(new Event("change"));const h=t.querySelector("#ast-model"),k=t.querySelector("#ast-model-dropdown");h&&(h.value=""),k&&(k.innerHTML="",k.style.display="none"),t.querySelectorAll(".ast-preset-btn").forEach(_=>_.style.opacity="0.5"),c.style.opacity="1";const S=Mt.find(_=>_.key===c.dataset.key),y=t.querySelector("#ast-preset-detail");if(y&&S&&(S.desc||S.site)){let _=S.desc?`<div style="color:var(--text-secondary);line-height:1.5">${S.desc}</div>`:"";S.site&&(_+=`<a href="${S.site}" target="_blank" style="color:var(--accent);text-decoration:none;font-size:11px;margin-top:3px;display:inline-block">→ 访问 ${S.label}官网</a>`),y.innerHTML=_,y.style.display="block"}else y&&(y.style.display="none")}}),s.addEventListener("change",()=>{const c=X(s.value);o.textContent=Et(c),n.placeholder=It(c),l.placeholder=Ht(c)});const a=t.querySelector("#ast-soul-agent");t.querySelectorAll('input[name="ast-soul-source"]').forEach(c=>{c.addEventListener("change",()=>{const h=c.value==="openclaw"&&c.checked;t.querySelector("#ast-soul-default").style.display=h?"none":"",t.querySelector("#ast-soul-openclaw").style.display=h?"":"none",h&&i()})});const i=async()=>{var k;a.innerHTML='<option value="" disabled selected>扫描中...</option>',a.disabled=!0;const c=await ys();if(a.innerHTML="",c.length===0){a.innerHTML='<option value="" disabled selected>未发现 Agent</option>',a.disabled=!0;return}let h=((k=u.soulSource)==null?void 0:k.replace("openclaw:",""))||"default";h==="main"&&(h="default");for(const S of c){const y=document.createElement("option");y.value=S.id,y.textContent=S.label+(S.hasWorkspace?"":" (无 workspace)"),S.hasWorkspace||(y.disabled=!0),S.id===h&&(y.selected=!0),a.appendChild(y)}a.disabled=!1},r=async c=>{const h=a.value;if(!h){Z("请先选择一个 Agent","warning");return}const k=t.querySelector("#ast-soul-status"),S=c.innerHTML;c.disabled=!0,c.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ast-spin"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"/></svg> 加载中...',k.innerHTML=`<div style="text-align:center;padding:16px 0;color:var(--text-tertiary);font-size:12px">正在读取 Agent「${h}」的 workspace...</div>`;const y=await hs(h);if(c.disabled=!1,c.innerHTML=S,!y){k.innerHTML=`<div style="text-align:center;padding:16px 0"><div style="color:var(--error);font-size:12px;font-weight:500">加载失败</div><div style="color:var(--text-tertiary);font-size:11px;margin-top:4px">Agent「${h}」的 workspace 不存在或无法访问</div></div>`;return}k.innerHTML=Bt(y)};t.querySelector("#ast-btn-load-soul").onclick=c=>r(c.target.closest("button")),t.querySelector("#ast-btn-refresh-soul").onclick=c=>{i(),t.querySelector("#ast-soul-status").innerHTML='<div style="text-align:center;padding:16px 0;color:var(--text-tertiary);font-size:12px">选择 Agent 后点击「加载灵魂」读取身份文件</div>'},(ae=u==null?void 0:u.soulSource)!=null&&ae.startsWith("openclaw:")&&i().then(()=>{q&&(t.querySelector("#ast-soul-status").innerHTML=Bt(q))});const d=t.querySelector("#ast-kb-list"),m=t.querySelector("#ast-kb-editor"),g=t.querySelector("#ast-kb-hint");let p=JSON.parse(JSON.stringify(u.knowledgeFiles||[]));const f=()=>{if(p.length===0){d.innerHTML=`<div style="text-align:center;padding:20px 0;color:var(--text-tertiary);font-size:12px">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:6px;opacity:0.4"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <div>点击「添加」按钮添加知识文件</div></div>`,g.textContent="";return}const c=p.reduce((y,_)=>{var z;return y+(((z=_.content)==null?void 0:z.length)||0)},0),h=c>1024?(c/1024).toFixed(1)+" KB":c+" B",k=p.filter(y=>y.enabled!==!1).length;g.textContent=`共 ${p.length} 个知识文件（${k} 个启用，${h}），保存后生效。`;let S='<div class="ast-soul-files">';p.forEach((y,_)=>{var G,P,R;const z=((G=y.content)==null?void 0:G.length)>1024?(y.content.length/1024).toFixed(1)+" KB":(((P=y.content)==null?void 0:P.length)||0)+" B",B=y.enabled!==!1;S+=`<div class="ast-soul-file ${B?"loaded":"missing"}" data-kb-idx="${_}" style="cursor:pointer" title="点击编辑">
        <button style="padding:2px;background:none;border:none;cursor:pointer;flex-shrink:0" data-kb-toggle="${_}" title="${B?"点击禁用":"点击启用"}">
          <div class="ast-soul-file-icon">${B?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>'}</div>
        </button>
        <div class="ast-soul-file-info">
          <span class="ast-soul-file-name">${w(y.name)}</span>
          <span class="ast-soul-file-desc">${((R=y.content)==null?void 0:R.split(`
`).length)||0} 行 · 点击编辑</span>
        </div>
        <span class="ast-soul-file-size">${z}</span>
        <button class="btn btn-sm" style="padding:2px 6px;font-size:11px;color:var(--error);background:none;border:none;cursor:pointer" data-kb-del="${_}" title="删除">✕</button>
      </div>`}),S+="</div>",d.innerHTML=S};f();let v=-1;const x=c=>{v=c,m.style.display="",c>=0?(t.querySelector("#ast-kb-name").value=p[c].name,t.querySelector("#ast-kb-content").value=p[c].content,t.querySelector("#ast-kb-save").textContent="更新"):(t.querySelector("#ast-kb-name").value="",t.querySelector("#ast-kb-content").value="",t.querySelector("#ast-kb-save").textContent="保存知识"),t.querySelector("#ast-kb-name").focus()};t.querySelector("#ast-kb-add").onclick=()=>x(-1),t.querySelector("#ast-kb-cancel").onclick=()=>{m.style.display="none"},t.querySelector("#ast-kb-save").onclick=()=>{const c=t.querySelector("#ast-kb-name").value.trim(),h=t.querySelector("#ast-kb-content").value.trim();if(!c){Z("请输入知识名称","warning");return}if(!h){Z("请输入知识内容","warning");return}v>=0?(p[v].name=c,p[v].content=h):p.push({name:c,content:h,enabled:!0}),m.style.display="none",f()},d.addEventListener("click",c=>{const h=c.target.closest("[data-kb-del]");if(h){c.stopPropagation();const y=parseInt(h.dataset.kbDel);p.splice(y,1),v===y&&(m.style.display="none"),f();return}const k=c.target.closest("[data-kb-toggle]");if(k){c.stopPropagation();const y=parseInt(k.dataset.kbToggle);p[y].enabled=p[y].enabled===!1,f();return}const S=c.target.closest("[data-kb-idx]");S&&x(parseInt(S.dataset.kbIdx))});const T=t.querySelector("#ast-qtcool-model"),H=t.querySelector("#ast-qtcool-customkey"),J=t.querySelector("#ast-qtcool-keyrow"),Y=t.querySelector("#ast-qtcool-key"),Ie=t.querySelector("#ast-qtcool-usage");(async()=>{const c=await is();T.innerHTML=c.map((h,k)=>`<option value="${h.id}" style="color:#333"${k===0?" selected":""}>${h.name||h.id}${k===0?" ★":""}</option>`).join("")})(),H.onchange=()=>{J.style.display=H.checked?"":"none",H.checked&&Y.focus()},Y.oninput=()=>{const c=Y.value.trim();Ie.href=$e.usageUrl+(c||$e.defaultKey)};const K=t.querySelector("#ast-qtcool-status");t.querySelector("#ast-qtcool-test").onclick=async c=>{var z,B,G;const h=c.target,k=T.value;if(!k){K.innerHTML=`<span style="color:#fbbf24">${me("warn",14)} 请先选择模型</span>`;return}const y=(H.checked?Y.value.trim():"")||$e.defaultKey;h.disabled=!0,h.textContent="测试中...",K.innerHTML='<span style="color:rgba(255,255,255,0.5)">正在连接 GPT-AI 网关...</span>';const _=Date.now();try{const P=await fetch($e.baseUrl+"/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+y},body:JSON.stringify({model:k,messages:[{role:"user",content:"Hi"}],max_tokens:10}),signal:AbortSignal.timeout(15e3)}),R=Date.now()-_;if(P.ok){const I=((G=(B=(z=(await P.json()).choices)==null?void 0:z[0])==null?void 0:B.message)==null?void 0:G.content)||"";K.innerHTML=`<span style="color:#34d399">${me("ok",14)} 测试通过（${(R/1e3).toFixed(1)}s）</span><span style="color:rgba(255,255,255,0.4);margin-left:6px">${k} 响应正常</span>`}else{const $=await P.text().catch(()=>"");K.innerHTML=`<span style="color:#f87171">${me("err",14)} 测试失败（HTTP ${P.status}）</span><span style="color:rgba(255,255,255,0.4);margin-left:6px">${$.slice(0,80)}</span>`}}catch(P){K.innerHTML=`<span style="color:#f87171">${me("err",14)} 连接失败：${P.message}</span>`}h.disabled=!1,h.innerHTML=`${O("search",12)} 测试`},t.querySelector("#ast-qtcool-apply").onclick=async()=>{const c=T.value;if(!c){K.innerHTML=`<span style="color:#fbbf24">${me("warn",14)} 请先选择模型</span>`;return}const k=(H.checked?Y.value.trim():"")||$e.defaultKey;if(t.querySelector("#ast-baseurl").value=$e.baseUrl,t.querySelector("#ast-apikey").value=k,t.querySelector("#ast-model").value=c,t.querySelector("#ast-apitype").value="openai-completions",K.innerHTML=`<span style="color:#34d399">${me("ok",14)} 助手已配置为 ${c}</span>`,Z("助手已配置为 "+c,"success"),await pt("同步到 OpenClaw？"))try{let y={};try{y=await C.readOpenclawConfig()}catch{}y.models||(y.models={}),y.models.providers||(y.models.providers={}),y.models.providers.qtcool?y.models.providers.qtcool.apiKey=k:y.models.providers.qtcool={baseUrl:$e.baseUrl,apiKey:k,api:"openai-completions",models:[{id:c,name:c,contextWindow:128e3,reasoning:c.includes("codex")}]},y.agents||(y.agents={}),y.agents.defaults||(y.agents.defaults={}),y.agents.defaults.model||(y.agents.defaults.model={}),y.agents.defaults.model.primary="qtcool/"+c,await C.writeOpenclawConfig(y),K.innerHTML=`<span style="color:#34d399">${me("ok",14)} 已设为主模型 qtcool/${c}，正在重启 Gateway...</span>`;try{await C.restartGateway(),Z("OpenClaw 主模型已切换为 qtcool/"+c,"success"),K.innerHTML=`<span style="color:#34d399">${me("ok",14)} 全部完成！主模型：qtcool/${c}</span>`}catch(_){Z("配置已保存，Gateway 重启失败: "+_.message,"warning")}}catch(y){Z("写入 OpenClaw 配置失败: "+y,"error")}};const j=t.querySelector("#ast-test-result"),qe=t.querySelector("#ast-model"),fe=t.querySelector("#ast-model-dropdown");t.querySelector("#ast-btn-test").onclick=async c=>{var ye,Ke,Se,Ue,vt,xt,kt,St,$t,Tt,Lt,qt,_t,At,Ct;const h=c.target,k=t.querySelector("#ast-baseurl").value.trim(),S=t.querySelector("#ast-apikey").value.trim(),y=t.querySelector("#ast-model").value.trim(),_=X(t.querySelector("#ast-apitype").value||"openai-completions");if(!k||Be(_)&&!S){j.innerHTML='<span style="color:var(--warning)">'+w(Be(_)?"请先填写 Base URL 和 API Key":"请先填写 Base URL")+"</span>";return}if(!y){j.innerHTML='<span style="color:var(--warning)">请先填写或选择模型</span>';return}h.disabled=!0,h.textContent="测试中...",j.innerHTML='<span style="color:var(--text-tertiary)">正在发送测试消息...</span>';const z=Ze(k,_),B=Ee(_,S),G=Date.now();let P=0,R="",$="",I="",L="",A={};try{if(_==="anthropic-messages"){I="Anthropic Messages",L=z+"/messages",A={model:y,messages:[{role:"user",content:"你好，请用一句话回复"}],max_tokens:200};const ue=await fetch(L,{method:"POST",headers:B,body:JSON.stringify(A),signal:AbortSignal.timeout(3e4)});P=ue.status,R=await ue.text();try{$=((ye=JSON.parse(R).content)==null?void 0:ye.filter(ie=>ie.type==="text").map(ie=>ie.text).join(""))||""}catch{}}else if(_==="google-gemini"){I="Gemini",L=`${z}/models/${y}:generateContent?key=***`,A={contents:[{role:"user",parts:[{text:"你好，请用一句话回复"}]}]};const ue=`${z}/models/${y}:generateContent?key=${S}`,Ae=await fetch(ue,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A),signal:AbortSignal.timeout(3e4)});P=Ae.status,R=await Ae.text();try{$=((xt=(vt=(Ue=(Se=(Ke=JSON.parse(R).candidates)==null?void 0:Ke[0])==null?void 0:Se.content)==null?void 0:Ue.parts)==null?void 0:vt[0])==null?void 0:xt.text)||""}catch{}}else{I="Chat Completions",L=z+"/chat/completions",A={model:y,messages:[{role:"user",content:"你好，请用一句话回复"}],max_tokens:200};const ue=await fetch(L,{method:"POST",headers:B,body:JSON.stringify(A),signal:AbortSignal.timeout(3e4)});P=ue.status,R=await ue.text();let Ae=!1;if(!ue.ok&&(R.includes("legacy protocol")||R.includes("/v1/responses")||R.includes("not supported"))&&(Ae=!0),!Ae)try{const ie=JSON.parse(R),V=(St=(kt=ie.choices)==null?void 0:kt[0])==null?void 0:St.message;$=(V==null?void 0:V.content)||(V==null?void 0:V.reasoning_content)||((Tt=($t=ie.choices)==null?void 0:$t[0])==null?void 0:Tt.text)||((Lt=ie.output)==null?void 0:Lt.text)||"",!(V!=null&&V.content)&&(V!=null&&V.reasoning_content)&&($="[推理内容] "+$)}catch{}if(Ae){I="Responses",L=z+"/responses",A={model:y,input:[{role:"user",content:"你好，请用一句话回复"}],max_output_tokens:200};try{const ie=await fetch(L,{method:"POST",headers:B,body:JSON.stringify(A),signal:AbortSignal.timeout(3e4)});P=ie.status,R=await ie.text();try{const V=JSON.parse(R);$=V.output_text||((Ct=(At=(_t=(qt=V.output)==null?void 0:qt[0])==null?void 0:_t.content)==null?void 0:At[0])==null?void 0:Ct.text)||""}catch{}}catch(ie){j.innerHTML=at({success:!1,elapsed:Date.now()-G,usedApi:I,reqUrl:L,reqBody:A,respStatus:0,respBody:"",error:ie.message}),h.disabled=!1,h.textContent="测试";return}}}}catch(ue){j.innerHTML=at({success:!1,elapsed:Date.now()-G,usedApi:I,reqUrl:L,reqBody:A,respStatus:0,respBody:"",error:ue.message}),h.disabled=!1,h.textContent="测试";return}j.innerHTML=at({success:!!$,elapsed:Date.now()-G,usedApi:I,reqUrl:L,reqBody:A,respStatus:P,respBody:R,reply:$}),h.disabled=!1,h.textContent="测试"},t.querySelector("#ast-btn-models").onclick=async c=>{var _,z,B;const h=c.target,k=t.querySelector("#ast-baseurl").value.trim(),S=t.querySelector("#ast-apikey").value.trim(),y=X(t.querySelector("#ast-apitype").value||"openai-completions");if(!k||Be(y)&&!S){j.innerHTML='<span style="color:var(--warning)">'+w(Be(y)?"请先填写 Base URL 和 API Key":"请先填写 Base URL")+"</span>";return}h.disabled=!0,h.textContent="获取中...",j.innerHTML='<span style="color:var(--text-tertiary)">正在获取模型列表...</span>';try{const G=Ze(k,y),P=Ee(y,S);let R=[];if(y==="anthropic-messages"){const $=await fetch(G+"/models",{headers:P,signal:AbortSignal.timeout(1e4)});if(!$.ok){const L=await $.text().catch(()=>"");let A="HTTP "+$.status;try{A=((_=JSON.parse(L).error)==null?void 0:_.message)||A}catch{}j.innerHTML='<span style="color:var(--error)">✗ '+w(A)+"</span>";return}R=((await $.json()).data||[]).map(L=>L.id).filter(Boolean).sort()}else if(y==="google-gemini"){const $=await fetch(G+"/models?key="+S,{signal:AbortSignal.timeout(1e4)});if(!$.ok){const L=await $.text().catch(()=>"");let A="HTTP "+$.status;try{A=((z=JSON.parse(L).error)==null?void 0:z.message)||A}catch{}j.innerHTML='<span style="color:var(--error)">✗ '+w(A)+"</span>";return}R=((await $.json()).models||[]).map(L=>{var A;return((A=L.name)==null?void 0:A.replace("models/",""))||L.name}).filter(Boolean).sort()}else{const $=await fetch(G+"/models",{headers:P,signal:AbortSignal.timeout(1e4)});if(!$.ok){const L=await $.text().catch(()=>"");let A="HTTP "+$.status;try{A=((B=JSON.parse(L).error)==null?void 0:B.message)||A}catch{}j.innerHTML='<span style="color:var(--error)">✗ '+w(A)+"</span>";return}R=((await $.json()).data||[]).map(L=>L.id).filter(Boolean).sort()}if(R.length===0){j.innerHTML='<span style="color:var(--warning)">未发现可用模型</span>';return}j.innerHTML='<span style="color:var(--success)">✓ 发现 '+R.length+" 个模型，点击下方列表选择</span>",fe.innerHTML=R.map($=>'<div class="ast-model-option" data-model="'+w($)+'">'+w($)+"</div>").join(""),fe.style.display="block"}catch(G){j.innerHTML='<span style="color:var(--error)">✗ '+w(G.message)+"</span>"}finally{h.disabled=!1,h.textContent="拉取"}},t.querySelector("#ast-btn-import").onclick=async c=>{var k,S,y,_,z;const h=c.target;h.disabled=!0,h.textContent="扫描中...",j.innerHTML='<span style="color:var(--text-tertiary)">正在扫描 OpenClaw 模型配置...</span>';try{const B=await C.assistantSystemInfo(),G=((S=(k=B.match(/主目录[:：]\s*(.+)/))==null?void 0:k[1])==null?void 0:S.trim())||((_=(y=B.match(/Home[:：]\s*(.+)/))==null?void 0:y[1])==null?void 0:_.trim())||"";if(!G)throw new Error("无法获取主目录路径");const P=[];try{const I=(await C.assistantListDir(G+"/.openclaw/agents")).split(`
`).map(L=>L.replace(/\/$/,"").trim()).filter(Boolean);for(const L of I)try{const A=await C.assistantReadFile(G+"/.openclaw/agents/"+L+"/agent/models.json"),ye=JSON.parse(A);for(const[Ke,Se]of Object.entries(ye.providers||{}))Se.baseUrl&&P.push({source:"Agent: "+L,name:Ke,baseUrl:Se.baseUrl,apiKey:Se.apiKey||"",apiType:X(Se.api),models:(Se.models||[]).map(Ue=>Ue.id||Ue.name).filter(Boolean)})}catch{}}catch{}try{const $=await C.assistantReadFile(G+"/.openclaw/openclaw.json"),I=JSON.parse($);for(const[L,A]of Object.entries(((z=I.models)==null?void 0:z.providers)||{}))A.baseUrl&&!P.find(ye=>ye.name===L)&&P.push({source:"全局配置",name:L,baseUrl:A.baseUrl,apiKey:A.apiKey||"",apiType:X(A.api),models:(A.models||[]).map(ye=>ye.id||ye.name).filter(Boolean)})}catch{}if(P.length===0){j.innerHTML='<span style="color:var(--warning)">未发现 OpenClaw 模型配置。请先安装并配置 OpenClaw。</span>';return}const R=P.map(($,I)=>{const L=$.models.length?$.models.join(", "):"(无模型列表)";return`<div class="ast-import-option" data-idx="${I}" style="padding:8px 10px;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;cursor:pointer;transition:background 0.15s">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong>${w($.name)}</strong>
            <span style="font-size:11px;color:var(--text-tertiary)">${w($.source)}</span>
          </div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${w($.baseUrl)}</div>
          <div style="font-size:11px;color:var(--text-tertiary);margin-top:1px">模型: ${w(L)}</div>
        </div>`}).join("");j.innerHTML=`<div style="margin-top:4px">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px">检测到 ${P.length} 个服务商，点击选择：</div>
        ${R}
      </div>`,j.querySelectorAll(".ast-import-option").forEach($=>{$.addEventListener("mouseenter",()=>$.style.background="var(--bg-secondary)"),$.addEventListener("mouseleave",()=>$.style.background=""),$.addEventListener("click",()=>{const I=P[parseInt($.dataset.idx)];t.querySelector("#ast-baseurl").value=I.baseUrl,t.querySelector("#ast-apikey").value=I.apiKey,t.querySelector("#ast-apitype").value=I.apiType,I.models.length>0&&(t.querySelector("#ast-model").value=I.models[0],fe.innerHTML=I.models.map(L=>'<div class="ast-model-option" data-model="'+w(L)+'">'+w(L)+"</div>").join("")),j.innerHTML='<span style="color:var(--success)">✓ 已导入「'+w(I.name)+"」的配置"+(I.models.length?"（"+I.models.length+" 个模型）":"")+"</span>"})})}catch(B){j.innerHTML='<span style="color:var(--error)">导入失败: '+w(B.message||String(B))+"</span>"}finally{h.disabled=!1,h.innerHTML=`${O("download",14)} 导入`}},fe.addEventListener("click",c=>{const h=c.target.closest(".ast-model-option");h&&(qe.value=h.dataset.model,fe.style.display="none")}),qe.addEventListener("focus",()=>{fe.children.length>0&&(fe.style.display="block")}),t.addEventListener("click",c=>{if(c.target===t){t.remove();return}!c.target.closest("#ast-model")&&!c.target.closest("#ast-model-dropdown")&&!c.target.closest("#ast-btn-models")&&(fe.style.display="none")}),t.querySelector('[data-action="cancel"]').onclick=()=>t.remove(),t.querySelector('[data-action="confirm"]').onclick=()=>{var k,S,y;u.assistantName=t.querySelector("#ast-name").value.trim()||be,u.assistantPersonality=t.querySelector("#ast-personality").value.trim()||Ne,u.baseUrl=t.querySelector("#ast-baseurl").value.trim(),u.apiKey=t.querySelector("#ast-apikey").value.trim(),u.model=t.querySelector("#ast-model").value.trim(),u.temperature=parseFloat(t.querySelector("#ast-temp").value)||.7,u.apiType=X(t.querySelector("#ast-apitype").value||"openai-completions"),u.tools.terminal=t.querySelector("#ast-tool-terminal").checked,u.tools.fileOps=t.querySelector("#ast-tool-fileops").checked,u.tools.webSearch=t.querySelector("#ast-tool-websearch").checked,u.autoRounds=parseInt(t.querySelector("#ast-auto-rounds").value,10)||0;const c=t.querySelector('input[name="ast-soul-source"]:checked');if((c==null?void 0:c.value)==="openclaw"){const _=((k=t.querySelector("#ast-soul-agent"))==null?void 0:k.value)||"main";u.soulSource="openclaw:"+_}else u.soulSource="default",q=null;u.knowledgeFiles=p,Ge(),t.remove();const h=re.querySelector(".ast-title");if(h){let _=u.assistantName;if((S=u.soulSource)!=null&&S.startsWith("openclaw:")&&(q!=null&&q.identity)){const z=q.identity.match(/\*\*Name:\*\*\s*(.+)/i)||q.identity.match(/名[字称][:：]\s*(.+)/i),B=(y=z==null?void 0:z[1])==null?void 0:y.trim();B&&!B.startsWith("_")&&!B.startsWith("（")&&B.length<30&&(_=B)}h.textContent=_}oe(),Z("设置已保存","info"),Bs()},t.addEventListener("keydown",c=>{c.key==="Escape"&&t.remove()});const He=t.querySelector("input");He&&He.focus()}function Bs(){const e=re==null?void 0:re.querySelector("#ast-model-badge");e&&(u.model?(e.textContent=u.model,e.className="ast-model-badge configured"):(e.textContent="未配置",e.className="ast-model-badge unconfigured"))}function Re(e){if(e.trim()||se.length>0){if(te){if(se.length>0){Z("AI 正在回复中，图片消息请等待完成后再发送","info");return}Zt(e.trim());return}ht(e)}}async function ht(e){if(!(e.trim()||se.length>0))return;if(te){if(se.length>0){Z("请等待 AI 回复完成","info");return}Zt(e.trim());return}let s=De();s||(s=es(),xe());const o=[...se];Ss();const n=e.trim(),a={role:"user",content:$s(n,o),ts:Date.now()};o.length>0&&(a._images=o.map(p=>{const f="img_"+p.id;return ls(f,p.dataUrl),{dbId:f,dataUrl:p.dataUrl,name:p.name,width:p.width,height:p.height}})),n&&(a._text=n),s.messages.push(a),_s(s),s.updatedAt=Date.now(),Le(),oe(),xe();const i=s.messages.filter(p=>p.role==="user"?!0:p.role==="assistant"?p.content&&p.content.length>0:!1).slice(-30).map(p=>({role:p.role,content:p.content})),r={role:"assistant",content:"",ts:Date.now()};s.messages.push(r),te=!0,ce.innerHTML=bt(),ee(s.id,"streaming"),oe();const d=b==null?void 0:b.querySelectorAll(".ast-msg-bubble-ai"),m=d==null?void 0:d[d.length-1];m&&(m.innerHTML='<span class="ast-typing">思考中...</span>');const g=mt().length>0;try{if(g){const p=b==null?void 0:b.querySelectorAll(".ast-msg-ai"),f=p==null?void 0:p[p.length-1],v=await ns(i,x=>{m&&(m.innerHTML=`<span class="ast-typing">${w(x)}</span>`)},x=>{if(r.toolHistory=x,Ve(),!f)return;const T=yt(x),H=f.querySelector(".ast-msg-bubble-ai");f.innerHTML=T+(H?H.outerHTML:""),b&&(b.scrollTop=b.scrollHeight)});r.content=v.content,v.toolHistory.length>0&&(r.toolHistory=v.toolHistory),oe()}else await ts(i,p=>{if(r.content+=p,Ve(),m){const f=Date.now();f-Qe>50&&(m.innerHTML=ze(r.content)+'<span class="ast-cursor">▊</span>',b&&(b.scrollTop=b.scrollHeight),Qe=f)}}),m&&(m.innerHTML=ze(r.content));E&&(r._debug=E,E=null)}catch(p){if(p.name==="AbortError")r.content+=r.content?`

*[已停止]*`:"*[已停止]*";else{ee(s.id,"error");const f=r.content?`

---
**请求中断**: ${p.message}`:p.message;r.content+=f,r._canRetry=!0}if(oe(),r._canRetry&&b){const f=document.createElement("div");f.className="ast-retry-bar";const v='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',x='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';f.innerHTML=`
        <button class="btn btn-sm btn-primary ast-btn-retry">${v} 重试</button>
        <button class="btn btn-sm btn-secondary ast-btn-continue">${x} 输入继续</button>
        <span class="ast-retry-hint">请求失败（已自动重试 3 次）</span>
      `,b.appendChild(f),b.scrollTop=b.scrollHeight,f.querySelector(".ast-btn-retry").addEventListener("click",()=>{f.remove(),s.messages.pop(),Le(),ee(s.id,"idle"),as(s)}),f.querySelector(".ast-btn-continue").addEventListener("click",()=>{f.remove(),ee(s.id,"idle"),xe(),N==null||N.focus()})}}finally{te=!1,M=null,We(),ce&&(ce.innerHTML=wt()),N&&N.focus(),s.updatedAt=Date.now(),gt(),Xe(s.id)!=="error"&&ee(s.id,"idle"),b&&(oe(),b.scrollTop=b.scrollHeight),setTimeout(()=>Xt(),100)}}async function as(e){if(te)return;const t=e.messages.filter(a=>a.role==="user"||a.role==="assistant").slice(-30),s={role:"assistant",content:"",ts:Date.now()};e.messages.push(s),te=!0,ce&&(ce.innerHTML=bt()),ee(e.id,"streaming"),oe();const o=b==null?void 0:b.querySelectorAll(".ast-msg-bubble-ai"),n=o==null?void 0:o[o.length-1];n&&(n.innerHTML='<span class="ast-typing">重试中...</span>');const l=mt().length>0;try{if(l){const a=b==null?void 0:b.querySelectorAll(".ast-msg-ai"),i=a==null?void 0:a[a.length-1],r=await ns(t,d=>{n&&(n.innerHTML=`<span class="ast-typing">${w(d)}</span>`)},d=>{if(s.toolHistory=d,Ve(),!i)return;const m=yt(d),g=i.querySelector(".ast-msg-bubble-ai");i.innerHTML=m+(g?g.outerHTML:""),b&&(b.scrollTop=b.scrollHeight)});s.content=r.content,r.toolHistory.length>0&&(s.toolHistory=r.toolHistory),oe()}else await ts(t,a=>{if(s.content+=a,Ve(),n){const i=Date.now();i-Qe>50&&(n.innerHTML=ze(s.content)+'<span class="ast-cursor">▊</span>',b&&(b.scrollTop=b.scrollHeight),Qe=i)}}),n&&(n.innerHTML=ze(s.content))}catch(a){if(a.name==="AbortError"?s.content+=s.content?`

*[已停止]*`:"*[已停止]*":(ee(e.id,"error"),s.content+=s.content?`

---
**请求中断**: ${a.message}`:a.message,s._canRetry=!0),oe(),s._canRetry&&b){const i=document.createElement("div");i.className="ast-retry-bar";const r='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',d='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';i.innerHTML=`
        <button class="btn btn-sm btn-primary ast-btn-retry">${r} 重试</button>
        <button class="btn btn-sm btn-secondary ast-btn-continue">${d} 输入继续</button>
        <span class="ast-retry-hint">请求失败（已自动重试 3 次）</span>
      `,b.appendChild(i),b.scrollTop=b.scrollHeight,i.querySelector(".ast-btn-retry").addEventListener("click",()=>{i.remove(),e.messages.pop(),Le(),ee(e.id,"idle"),as(e)}),i.querySelector(".ast-btn-continue").addEventListener("click",()=>{i.remove(),ee(e.id,"idle"),xe(),N==null||N.focus()})}}finally{te=!1,M=null,We(),ce&&(ce.innerHTML=wt()),N&&N.focus(),e.updatedAt=Date.now(),gt(),Xe(e.id)!=="error"&&ee(e.id,"idle"),b&&(oe(),b.scrollTop=b.scrollHeight),setTimeout(()=>Xt(),100)}}function dt(){te=!1,M&&(M.abort(),M=null)}let Ye=null;function Ns(e,t){e.preventDefault(),ot();const s=De();if(!s)return;const o=s.messages[t];if(!o)return;const n=document.createElement("div");n.className="ast-ctx-menu",n.innerHTML=`
    <button data-action="copy-text">复制文本</button>
    <button data-action="copy-md">复制 Markdown</button>
    <hr/>
    <button data-action="view-raw">查看原始数据</button>
    ${o._debug?'<button data-action="view-debug">查看请求/响应</button>':""}
  `,n.style.left=Math.min(e.clientX,window.innerWidth-200)+"px",n.style.top=Math.min(e.clientY,window.innerHeight-200)+"px",document.body.appendChild(n),Ye=n,n.addEventListener("click",l=>{var r,d,m,g;const a=(r=l.target.dataset)==null?void 0:r.action;if(!a)return;ot();const i=typeof o.content=="string"?o.content:o._text||((g=(m=(d=o.content)==null?void 0:d.find)==null?void 0:m.call(d,p=>p.type==="text"))==null?void 0:g.text)||"";if(a==="copy-text")navigator.clipboard.writeText(i).then(()=>Z("已复制文本"));else if(a==="copy-md")navigator.clipboard.writeText(o.content||i).then(()=>Z("已复制 Markdown"));else if(a==="view-raw"){const p={role:o.role,content:o.content,ts:o.ts};o._images&&(p._images=o._images.map(f=>({dbId:f.dbId,name:f.name,width:f.width,height:f.height}))),o.toolHistory&&(p.toolHistory=o.toolHistory),Gt("消息原始数据",JSON.stringify(p,null,2))}else a==="view-debug"&&o._debug&&Gt("请求/响应调试",JSON.stringify(o._debug,null,2))}),setTimeout(()=>document.addEventListener("click",ot,{once:!0}),10)}function ot(){Ye&&(Ye.remove(),Ye=null)}function Gt(e,t){const s=document.createElement("div");s.className="ast-debug-overlay",s.innerHTML=`
    <div class="ast-debug-modal">
      <div class="ast-debug-header">
        <span>${w(e)}</span>
        <button class="ast-debug-close">&times;</button>
      </div>
      <pre class="ast-debug-content">${w(t)}</pre>
      <div class="ast-debug-actions">
        <button class="btn btn-sm btn-primary ast-debug-copy">复制</button>
      </div>
    </div>
  `,document.body.appendChild(s),s.querySelector(".ast-debug-close").onclick=()=>s.remove(),s.querySelector(".ast-debug-copy").onclick=()=>{navigator.clipboard.writeText(t).then(()=>Z("已复制"))},s.addEventListener("click",o=>{o.target===s&&s.remove()})}const Jt="clawpanel-guide-assistant-dismissed";function js(){return localStorage.getItem(Jt)?"":`
    <div class="ast-page-guide" id="ast-page-guide">
      <div class="ast-guide-badge">内置 AI</div>
      <div class="ast-guide-text">
        <b>这是 ClawStar 内置的 Girl Star</b>，独立于 OpenClaw，使用你在右上角「设置」中配置的 API。
        <span style="opacity:0.6">如需与 OpenClaw Agent 对话，请前往「实时聊天」页面。</span>
      </div>
      <button class="ast-guide-close" onclick="localStorage.setItem('${Jt}','1');this.closest('.ast-page-guide').remove()">&times;</button>
    </div>
  `}function w(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}function wt(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'}function bt(){return'<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>'}async function Js(){Ts(),Ls(),C.ensureDataDir().catch(n=>console.warn("数据目录初始化失败:",n)),D.length>0&&!ve&&(ve=D[D.length-1].id);const e=document.createElement("div");e.className="page ast-page",re=e,e.innerHTML=`
    <div class="ast-sidebar" id="ast-sidebar">
      <div class="ast-sidebar-header">
        <span>会话列表</span>
        <button class="ast-sidebar-btn" id="ast-btn-new" title="新建会话">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      <div class="ast-session-list" id="ast-session-list"></div>
    </div>
    <div class="ast-main">
      <div class="ast-header">
        <div class="ast-header-left">
          <button class="ast-toggle-sidebar" id="ast-btn-toggle" title="会话列表">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <span class="ast-title">${(u==null?void 0:u.assistantName)||be}</span>
          <span class="ast-model-badge ${u.model?"configured":"unconfigured"}" id="ast-model-badge">${u.model||"未配置"}</span>
        </div>
        <div class="ast-header-actions">
          <div class="ast-mode-selector" id="ast-mode-selector">
            <div class="ast-mode-slider" id="ast-mode-slider"></div>
            ${Object.entries(Oe).map(([n,l])=>`<button class="ast-mode-btn ${ge()===n?"active":""}" data-mode="${n}" title="${l.desc}">${Ft[n]} ${l.label}</button>`).join("")}
          </div>
          <button class="btn btn-sm btn-ghost" id="ast-btn-settings" title="模型设置">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
            设置
          </button>
        </div>
      </div>
      <div class="ast-messages" id="ast-messages"></div>
      <div class="ast-queue" id="ast-queue"></div>
      <div class="ast-input-area">
        <div class="ast-image-preview" id="ast-image-preview"></div>
        <div class="ast-input-wrap">
          <button class="ast-attach-btn" id="ast-btn-attach" title="上传图片">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </button>
          <input type="file" id="ast-file-input" accept="image/*" multiple style="display:none"/>
          <textarea class="ast-textarea" id="ast-textarea" placeholder="描述你的问题，粘贴日志、截图或错误信息..." rows="1"></textarea>
          <button class="ast-send-btn" id="ast-send-btn" title="发送">${wt()}</button>
        </div>
        <div class="ast-input-hint">Enter 发送 · Shift+Enter 换行 · 支持粘贴/拖拽图片 · Girl Star 独立于 OpenClaw</div>
      </div>
    </div>
  `,b=e.querySelector("#ast-messages"),we=e.querySelector("#ast-queue"),N=e.querySelector("#ast-textarea"),ce=e.querySelector("#ast-send-btn"),Je=e.querySelector("#ast-session-list"),xe(),oe(),Ce(),Pt(e,ge()),requestAnimationFrame(()=>Qt(e,ge())),te&&(ce.innerHTML=bt(),Nt());const t=sessionStorage.getItem("assistant-auto-prompt");t&&(sessionStorage.removeItem("assistant-auto-prompt"),ge()==="chat"&&(u.mode="execute",Ge(),e.querySelectorAll(".ast-mode-btn").forEach(n=>n.classList.toggle("active",n.dataset.mode==="execute"))),setTimeout(()=>Re(t),300)),Dt(),Te&&setTimeout(()=>ct(),100),window.addEventListener("assistant-error-injected",()=>{Dt(),Te&&ct()}),b.addEventListener("contextmenu",n=>{const l=n.target.closest("[data-msg-idx]");l&&Ns(n,parseInt(l.dataset.msgIdx))}),ce.addEventListener("click",()=>{if(te&&!N.value.trim()&&se.length===0){dt();return}(N.value.trim()||se.length>0)&&(Re(N.value),N.value="",it(N))}),N.addEventListener("keydown",n=>{if(n.key==="Enter"&&!n.shiftKey){if(n.preventDefault(),!N.value.trim()&&se.length===0)return;Re(N.value),N.value="",it(N)}}),N.addEventListener("input",()=>it(N));const s=e.querySelector("#ast-file-input");e.querySelector("#ast-btn-attach").addEventListener("click",()=>s.click()),s.addEventListener("change",()=>{for(const n of s.files)lt(n);s.value=""}),N.addEventListener("paste",n=>{var i;const l=(i=n.clipboardData)==null?void 0:i.items;if(!l)return;let a=!1;for(const r of l)r.type.startsWith("image/")&&(xs(r),a=!0);a&&n.preventDefault()});const o=e.querySelector(".ast-main");return o.addEventListener("dragover",n=>{n.preventDefault(),o.classList.add("ast-drag-over")}),o.addEventListener("dragleave",n=>{o.contains(n.relatedTarget)||o.classList.remove("ast-drag-over")}),o.addEventListener("drop",n=>{n.preventDefault(),o.classList.remove("ast-drag-over");for(const l of n.dataTransfer.files)lt(l)}),e.querySelector("#ast-image-preview").addEventListener("click",n=>{const l=n.target.closest("[data-img-del]");l&&ks(l.dataset.imgDel)}),we.addEventListener("click",n=>{const l=n.target.closest("[data-queue-send]");if(l){const r=l.dataset.queueSend,d=le.findIndex(g=>g.id===r);if(d===-1)return;const m=le.splice(d,1)[0];Ce(),te&&dt(),setTimeout(()=>ht(m.text),150);return}const a=n.target.closest("[data-queue-del]");if(a){const r=a.dataset.queueDel;le=le.filter(d=>d.id!==r),Ce();return}const i=n.target.closest("[data-queue-edit]")||n.target.closest("[data-queue-edit-btn]");if(i){const r=i.dataset.queueEdit||i.dataset.queueEditBtn,d=le.find(v=>v.id===r);if(!d)return;const m=we.querySelector(`[data-queue-id="${r}"]`);if(!m||m.classList.contains("editing"))return;m.classList.add("editing");const g=m.querySelector(".ast-queue-text"),p=document.createElement("textarea");p.className="ast-queue-edit-input",p.value=d.text,p.rows=1,g.replaceWith(p),p.focus(),p.style.height=Math.min(p.scrollHeight,100)+"px";const f=()=>{const v=p.value.trim();v&&(d.text=v),Ce()};p.addEventListener("blur",f),p.addEventListener("keydown",v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),f()),v.key==="Escape"&&Ce()}),p.addEventListener("input",()=>{p.style.height="auto",p.style.height=Math.min(p.scrollHeight,100)+"px"})}}),e.querySelector("#ast-btn-toggle").addEventListener("click",()=>{e.querySelector("#ast-sidebar").classList.toggle("open")}),e.querySelector("#ast-btn-new").addEventListener("click",()=>{es(),xe(),oe()}),e.querySelector("#ast-mode-selector").addEventListener("click",n=>{const l=n.target.closest(".ast-mode-btn");if(!l)return;const a=l.dataset.mode;!Oe[a]||a===ge()||(u.mode=a,Ge(),e.querySelectorAll(".ast-mode-btn").forEach(i=>i.classList.toggle("active",i.dataset.mode===a)),Pt(e,a),fs(e,a))}),e.querySelector("#ast-btn-settings").addEventListener("click",Rs),Je.addEventListener("click",n=>{const l=n.target.closest("[data-delete]");if(l){n.stopPropagation();const i=l.dataset.delete;pt("确定删除这个会话吗？").then(r=>{r&&(qs(i),xe(),oe())});return}const a=n.target.closest(".ast-session-item");a&&(ve=a.dataset.id,xe(),oe(),te&&Xe(ve)==="streaming"?Nt():We())}),b.addEventListener("click",n=>{const l=n.target.closest(".ast-skill-card");if(l){const i=ut.find(r=>r.id===l.dataset.skill);if(!i)return;i.tools.length>0&&ge()==="chat"&&(u.mode="execute",Ge(),e.querySelectorAll(".ast-mode-btn").forEach(r=>r.classList.toggle("active",r.dataset.mode==="execute")),Z("已自动切换到执行模式","info")),Re(i.prompt);return}const a=n.target.closest(".ast-quick-btn");if(a){const i=a.dataset.prompt;i&&Re(i)}}),e}function it(e){e.style.height="auto",e.style.height=Math.min(e.scrollHeight,200)+"px"}function Ws(){gt(),dt(),We(),se=[],re=null,b=null,we=null,N=null,ce=null,Je=null}export{Ws as cleanup,Js as render};

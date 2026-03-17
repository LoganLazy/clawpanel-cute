const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-DjZVAIBO.js","assets/core-DhEqZVGG.js"])))=>i.map(i=>d[i]);
import{i as j,a as o,j as N,b as G,t as m,_ as A,s as k,k as q}from"./index-CB-svjh-.js";import{showUpgradeModal as P}from"./modal-DK6Az47R.js";import{d as O}from"./error-diagnosis-BawKPn5g.js";async function J(){const t=document.createElement("div");return t.className="page",t.innerHTML=`
    <div class="setup-center" style="text-align:center">
      <div style="display:flex;justify-content:center;margin-bottom:var(--space-lg)">
        <img src="/images/clawstar-logo.svg" alt="ClawStar" style="max-width:160px;width:100%;height:auto">
      </div>
      <h1 style="font-size:var(--font-size-xl);margin-bottom:var(--space-xs)">欢迎使用 ClawStar</h1>
      <p style="color:var(--text-secondary);margin-bottom:var(--space-xl);line-height:1.6">
        OpenClaw AI Agent 框架的桌面管理面板
      </p>

      <div id="setup-steps"></div>

      <div style="margin-top:var(--space-lg)">
        <button class="btn btn-secondary btn-sm" id="btn-recheck" style="min-width:120px">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="margin-right:4px"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
          重新检测
        </button>
      </div>
    </div>
  `,t.querySelector("#btn-recheck").addEventListener("click",()=>S(t)),S(t),t}async function S(t){var z,$;const c=t.querySelector("#setup-steps");c.innerHTML=`
    <div class="stat-card loading-placeholder" style="height:48px"></div>
    <div class="stat-card loading-placeholder" style="height:48px;margin-top:8px"></div>
    <div class="stat-card loading-placeholder" style="height:48px;margin-top:8px"></div>
    <div class="stat-card loading-placeholder" style="height:48px;margin-top:8px"></div>
  `,j("get_version_info","check_node","check_git","get_services_status","check_installation");const[p,r,n,l,v]=await Promise.allSettled([o.checkNode(),o.checkGit(),o.getServicesStatus(),o.checkInstallation(),o.getVersionInfo()]),g=p.status==="fulfilled"?p.value:{installed:!1},f=r.status==="fulfilled"?r.value:{installed:!1},b=n.status==="fulfilled"&&((z=n.value)==null?void 0:z.length)>0&&(($=n.value[0])==null?void 0:$.cli_installed)!==!1;let y=l.status==="fulfilled"?l.value:{installed:!1};const C=v.status==="fulfilled"?v.value:null;if(b&&!y.installed)try{const s=await o.initOpenclawConfig();s!=null&&s.created&&(y=await o.checkInstallation())}catch(s){console.warn("[setup] 自动初始化配置失败:",s)}f.installed&&o.configureGitHttps().catch(()=>{}),R(t,{node:g,git:f,cliOk:b,config:y,version:C})}function E(t){return`<span style="color:${t?"var(--success)":"var(--text-tertiary)"};font-weight:700;width:18px;display:inline-block">${t?"✓":"✗"}</span>`}function R(t,{node:c,git:p,cliOk:r,config:n,version:l}){const v=t.querySelector("#setup-steps"),g=c.installed,f=(p==null?void 0:p.installed)||!1,b=g&&r&&n.installed;let y="";y+=`
    <div class="config-section" style="text-align:left;max-width:720px;margin-left:auto;margin-right:auto">
      <div class="config-section-title" style="display:flex;align-items:center;gap:4px">
        ${E(g)} Node.js 环境
      </div>
      ${g?`<p style="color:var(--success);font-size:var(--font-size-sm)">已安装 ${c.version||""}</p>`:`<p style="color:var(--text-secondary);font-size:var(--font-size-sm);margin-bottom:var(--space-sm)">
            OpenClaw 基于 Node.js 运行，请先安装。
          </p>
          <a class="btn btn-primary btn-sm" href="https://nodejs.org/" target="_blank" rel="noopener">下载 Node.js</a>
          <span class="form-hint" style="margin-left:8px">安装后点击「重新检测」</span>
          <div style="margin-top:var(--space-sm);padding:8px 12px;background:var(--bg-tertiary);border-radius:var(--radius-sm);font-size:var(--font-size-xs);color:var(--text-secondary);line-height:1.6">
            <strong>已经装了但检测不到？</strong>
            ${N()?`macOS 上从 Finder 启动可能找不到 Node.js。试试关掉 ClawStar 后从终端启动：<br>
                 <code style="background:var(--bg-secondary);padding:2px 6px;border-radius:3px;user-select:all">open /Applications/ClawStar.app</code>`:"安装 Node.js 后点击「重新检测」或使用下方「自动扫描」，无需重启。"}
            <div style="margin-top:8px;display:flex;gap:6px;align-items:center;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" id="btn-scan-node" style="font-size:11px;padding:3px 10px">${G("search",12)} 自动扫描</button>
              <span style="color:var(--text-tertiary)">或手动指定路径：</span>
            </div>
            <div style="margin-top:6px;display:flex;gap:6px">
              <input id="input-node-path" type="text" placeholder="${N()?"/usr/local/bin":"F:\\\\AI\\\\Node"}"
                style="flex:1;padding:4px 8px;border:1px solid var(--border-primary);border-radius:var(--radius-sm);background:var(--bg-secondary);color:var(--text-primary);font-size:11px;font-family:monospace">
              <button class="btn btn-primary btn-sm" id="btn-check-path" style="font-size:11px;padding:3px 10px">检测</button>
            </div>
            <div id="scan-result" style="margin-top:6px;display:none"></div>
          </div>`}
    </div>
  `,y+=`
    <div class="config-section" style="text-align:left;max-width:720px;margin-left:auto;margin-right:auto;${g?"":"opacity:0.4;pointer-events:none"}">
      <div class="config-section-title" style="display:flex;align-items:center;gap:4px">
        ${E(f)} Git 版本管理
      </div>
      ${f?`<p style="color:var(--success);font-size:var(--font-size-sm)">已安装 ${p.version||""}</p>
           <p style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-top:4px">✅ 已自动配置 Git 使用 HTTPS（避免 SSH 连接问题）</p>`:`<p style="color:var(--text-secondary);font-size:var(--font-size-sm);margin-bottom:var(--space-sm);line-height:1.5">
            部分依赖需要 Git 下载源码。点击下方按钮自动安装，如果失败请手动安装。
          </p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" id="btn-auto-install-git">一键安装 Git</button>
            <a class="btn btn-secondary btn-sm" href="https://git-scm.com/downloads" target="_blank" rel="noopener">手动下载</a>
          </div>
          <div id="git-install-result" style="margin-top:var(--space-sm);display:none"></div>
          <div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary);line-height:1.5">
            <strong>没有 Git 也能安装？</strong> 大部分情况下可以，但个别依赖可能需要 Git。建议安装以避免问题。
          </div>`}
    </div>
  `,y+=`
    <div class="config-section" style="text-align:left;max-width:720px;margin-left:auto;margin-right:auto;${g?"":"opacity:0.4;pointer-events:none"}">
      <div class="config-section-title" style="display:flex;align-items:center;gap:4px">
        ${E(r)} OpenClaw CLI
      </div>
      ${r?`<p style="color:var(--success);font-size:var(--font-size-sm)">CLI 可用</p>
           ${l!=null&&l.ahead_of_recommended&&(l!=null&&l.recommended)?`<div style="margin-top:8px;padding:8px 12px;background:var(--bg-tertiary);border-radius:var(--radius-sm);font-size:var(--font-size-xs);color:var(--warning,#f59e0b);line-height:1.6">
                  检测到当前本地 OpenClaw ${l.current||""} 高于当前面板推荐稳定版 ${l.recommended}，可能存在兼容或稳定性风险。建议稍后到「关于」页回退到推荐版。
                </div>`:""}`:D()}
    </div>
  `,y+=`
    <div class="config-section" style="text-align:left;max-width:720px;margin-left:auto;margin-right:auto;${r?"":"opacity:0.4;pointer-events:none"}">
      <div class="config-section-title" style="display:flex;align-items:center;gap:4px">
        ${E(n.installed)} 配置文件
      </div>
      ${n.installed?`<p style="color:var(--success);font-size:var(--font-size-sm)">配置文件位于 ${n.path||""}</p>`:`<p style="color:var(--text-secondary);font-size:var(--font-size-sm);margin-bottom:var(--space-sm)">
            配置文件不存在，点击下方按钮自动创建默认配置。
          </p>
          <button class="btn btn-primary btn-sm" id="btn-init-config">一键初始化配置</button>`}
    </div>
  `,y+=`
    <div class="config-section" style="text-align:left;margin-top:var(--space-md);max-width:720px;margin-left:auto;margin-right:auto">
      <div class="config-section-title" style="display:flex;align-items:center;gap:6px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
        Girl Star
      </div>
      <p style="color:var(--text-secondary);font-size:var(--font-size-sm);margin-bottom:var(--space-sm);line-height:1.5">
        遇到安装问题？Girl Star 可以帮你诊断和解决。配置好模型后，点击下方按钮${b?"":"，当前问题会自动发送给 AI 分析"}。
      </p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" id="btn-goto-assistant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="margin-right:4px"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
          打开 Girl Star
        </button>
        ${b?"":`<button class="btn btn-primary btn-sm" id="btn-ask-ai-help">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="margin-right:4px"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          让 AI 帮我解决
        </button>`}
      </div>
    </div>
  `,b&&(y+=`
      <div class="config-section" style="text-align:left;margin-top:var(--space-md);max-width:720px;margin-left:auto;margin-right:auto">
        <div class="config-section-title">下一步建议</div>
        <div style="color:var(--text-secondary);font-size:var(--font-size-sm);line-height:1.7">
          当前仅表示运行环境已经就绪，并不代表已经可以直接聊天。通常还需要继续完成以下步骤：
          <ol style="margin:8px 0 0 18px;padding:0">
            <li>前往「模型配置」添加至少一个可用模型，并确认主模型已设置</li>
            <li>前往「Gateway」确认服务已启动</li>
            <li>如需飞书、钉钉、QQ 等消息渠道，请到「消息渠道」完成接入与配对</li>
          </ol>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
          <button class="btn btn-secondary btn-sm" id="btn-goto-models">配置模型</button>
          <button class="btn btn-secondary btn-sm" id="btn-goto-gateway">Gateway 设置</button>
          <button class="btn btn-secondary btn-sm" id="btn-goto-channels">消息渠道</button>
        </div>
      </div>
      <div style="margin-top:var(--space-lg)">
        <button class="btn btn-primary" id="btn-enter" style="min-width:200px">进入面板</button>
      </div>
    `),v.innerHTML=y,U(t,g,{node:c,git:p,cliOk:r,config:n})}function D(){var n,l,v,g;const t=((n=navigator.platform)==null?void 0:n.startsWith("Win"))||((l=navigator.userAgent)==null?void 0:l.includes("Windows")),c=((v=navigator.platform)==null?void 0:v.startsWith("Mac"))||((g=navigator.userAgent)==null?void 0:g.includes("Macintosh")),p=!!window.__TAURI_INTERNALS__;let r="";return p&&(r=`
      <div style="margin-top:var(--space-sm);padding:10px 12px;background:var(--bg-tertiary);border-radius:var(--radius-sm);border-left:3px solid var(--warning);font-size:var(--font-size-xs);color:var(--text-secondary);line-height:1.7">
        <strong style="color:var(--text-primary)">找不到已安装的 OpenClaw？</strong>
        <p style="margin:6px 0 2px">ClawStar 桌面版只能管理<strong>本机</strong>安装的 OpenClaw。以下环境中的安装无法被检测到：</p>
        <ul style="margin:4px 0 8px 16px;padding:0">
          ${t?`
            <li><strong>WSL (Windows 子系统)</strong> — OpenClaw 装在 WSL 里，Windows 侧无法访问</li>
            <li><strong>Docker 容器</strong> — 容器内的安装与宿主机隔离</li>
          `:""}
          ${c?`
            <li><strong>Docker 容器</strong> — 容器内的安装与宿主机隔离</li>
            <li><strong>远程服务器</strong> — 安装在其他机器上</li>
          `:""}
          ${!t&&!c?`
            <li><strong>Docker 容器</strong> — 容器内的安装与宿主机隔离</li>
          `:""}
        </ul>
        <details style="cursor:pointer">
          <summary style="font-weight:600;color:var(--primary);margin-bottom:6px">
            在对应环境中安装管理面板
          </summary>
          <div style="margin-top:8px">
            ${t?`
              <div style="margin-bottom:10px">
                <div style="font-weight:600;margin-bottom:4px">WSL 中使用 Web 版：</div>
                <div style="margin-bottom:2px;opacity:0.8">打开 WSL 终端，一键部署 ClawStar Web 版：</div>
                <code style="display:block;background:var(--bg-secondary);padding:6px 10px;border-radius:4px;user-select:all;word-break:break-all">curl -fsSL https://raw.githubusercontent.com/LoganLazy/clawpanel-cute/main/scripts/linux-deploy.sh | bash</code>
                <div style="margin-top:4px;opacity:0.7">国内用户如无法访问 GitHub：<code style="background:var(--bg-secondary);padding:2px 4px;border-radius:3px;user-select:all">curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/LoganLazy/clawpanel-cute/main/scripts/linux-deploy.sh | bash</code></div>
                <div style="margin-top:4px;opacity:0.7">部署后在浏览器访问 WSL 的 IP 即可管理。</div>
              </div>
            `:""}
            <div style="margin-bottom:10px">
              <div style="font-weight:600;margin-bottom:4px">Docker 容器中使用：</div>
              <div style="margin-bottom:2px;opacity:0.8">在容器内安装 ClawStar Web 版：</div>
              <code style="display:block;background:var(--bg-secondary);padding:6px 10px;border-radius:4px;user-select:all;word-break:break-all">curl -fsSL https://raw.githubusercontent.com/LoganLazy/clawpanel-cute/main/scripts/linux-deploy.sh | bash</code>
              <div style="margin-top:4px;opacity:0.7">国内镜像：<code style="background:var(--bg-secondary);padding:2px 4px;border-radius:3px;user-select:all">curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/LoganLazy/clawpanel-cute/main/scripts/linux-deploy.sh | bash</code></div>
            </div>
            <div>
              <div style="font-weight:600;margin-bottom:4px">远程服务器：</div>
              <div style="margin-bottom:2px;opacity:0.8">SSH 登录服务器后执行：</div>
              <code style="display:block;background:var(--bg-secondary);padding:6px 10px;border-radius:4px;user-select:all;word-break:break-all">curl -fsSL https://raw.githubusercontent.com/LoganLazy/clawpanel-cute/main/scripts/linux-deploy.sh | bash</code>
              <div style="margin-top:4px;opacity:0.7">国内镜像：<code style="background:var(--bg-secondary);padding:2px 4px;border-radius:3px;user-select:all">curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/LoganLazy/clawpanel-cute/main/scripts/linux-deploy.sh | bash</code></div>
            </div>
          </div>
        </details>
        <div style="margin-top:6px;opacity:0.7">
          或者，你也可以在本机重新安装 OpenClaw（使用下方的「一键安装」）。
        </div>
      </div>`),`
    <p style="color:var(--text-secondary);font-size:var(--font-size-sm);margin-bottom:var(--space-sm)">
      点击安装后，将默认安装当前 ClawStar 版本绑定的推荐稳定版；如需升降级，可稍后到「关于」页面切换版本。
    </p>
    <p style="color:var(--text-tertiary);font-size:var(--font-size-xs);line-height:1.6;margin:-4px 0 var(--space-sm)">
      如果你是为了体验最新版功能，建议先安装推荐稳定版再手动切换；若希望面板优先适配最新版，欢迎提交 issue。
    </p>
    <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-sm)">
      <label class="setup-source-option" style="flex:1;cursor:pointer">
        <input type="radio" name="install-source" value="official" checked style="margin-right:6px">
        <div>
          <div style="font-weight:600;font-size:var(--font-size-sm)">官方原版（推荐）</div>
          <div style="font-size:var(--font-size-xs);color:var(--text-tertiary)">openclaw</div>
        </div>
      </label>
      <label class="setup-source-option" style="flex:1;cursor:pointer">
        <input type="radio" name="install-source" value="chinese" style="margin-right:6px">
        <div>
          <div style="font-weight:600;font-size:var(--font-size-sm)">中文优化版</div>
          <div style="font-size:var(--font-size-xs);color:var(--text-tertiary)">openclaw-cn</div>
        </div>
      </label>
    </div>
    <div style="margin-bottom:var(--space-sm)">
      <label style="font-size:var(--font-size-xs);color:var(--text-tertiary);display:block;margin-bottom:4px">npm 镜像源</label>
      <select id="registry-select" style="width:100%;padding:6px 8px;border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--bg-secondary);color:var(--text-primary);font-size:var(--font-size-sm)">
        <option value="https://registry.npmjs.org">npm 官方源（默认）</option>
        <option value="https://registry.npmmirror.com">淘宝镜像（可选）</option>
      </select>
    </div>
    <button class="btn btn-primary btn-sm" id="btn-install">一键安装</button>
    <div class="form-hint" style="margin-top:8px">推荐稳定版安装通常需要 2-5 分钟，受网络与 npm 镜像影响。</div>
    ${r}
  `}function B({node:t,git:c,cliOk:p,config:r}){const n=[];return t.installed?n.push(`- Node.js 已安装: ${t.version||"版本未知"}`):n.push("- Node.js 未安装或未检测到"),c!=null&&c.installed?n.push(`- Git 已安装: ${c.version||"版本未知"}`):n.push("- Git 未安装"),p?n.push("- OpenClaw CLI 已安装"):n.push("- OpenClaw CLI 未安装"),r.installed?n.push(`- 配置文件正常: ${r.path||""}`):n.push("- 配置文件不存在"),`我在安装 OpenClaw 时遇到问题，以下是当前检测状态：

${n.join(`
`)}

请帮我分析问题并给出解决步骤。如果需要，请使用工具帮我检查系统环境。`}function U(t,c,p){var n,l,v,g,f,b,y,C,z,$;(n=t.querySelector("#btn-goto-assistant"))==null||n.addEventListener("click",()=>{window.location.hash="/assistant"}),(l=t.querySelector("#btn-ask-ai-help"))==null||l.addEventListener("click",()=>{if(p){const s=B(p);sessionStorage.setItem("assistant-auto-prompt",s)}window.location.hash="/assistant"}),(v=t.querySelector("#btn-enter"))==null||v.addEventListener("click",()=>{window.location.hash="/dashboard"}),(g=t.querySelector("#btn-goto-models"))==null||g.addEventListener("click",()=>{window.location.hash="/models"}),(f=t.querySelector("#btn-goto-gateway"))==null||f.addEventListener("click",()=>{window.location.hash="/gateway"}),(b=t.querySelector("#btn-goto-channels"))==null||b.addEventListener("click",()=>{window.location.hash="/channels"}),(y=t.querySelector("#btn-auto-install-git"))==null||y.addEventListener("click",async()=>{const s=t.querySelector("#btn-auto-install-git"),a=t.querySelector("#git-install-result");s.disabled=!0,s.textContent="安装中...",a&&(a.style.display="block",a.innerHTML='<span style="color:var(--text-tertiary)">正在安装 Git，请稍候...</span>');try{const e=await o.autoInstallGit();a&&(a.innerHTML=`<span style="color:var(--success)">✓ ${e}</span>`),m("Git 安装成功","success"),o.configureGitHttps().catch(()=>{}),setTimeout(()=>S(t),1e3)}catch(e){const d=String(e.message||e);a&&(a.innerHTML=`<div>
          <span style="color:var(--danger)">自动安装失败: ${d}</span>
          <p style="margin-top:6px;font-size:var(--font-size-xs);color:var(--text-secondary);line-height:1.5">
            请手动安装 Git：<br>
            <strong>Windows:</strong> 下载 <a href="https://git-scm.com/downloads" target="_blank" style="color:var(--accent)">git-scm.com</a> 安装包<br>
            <strong>macOS:</strong> 在终端执行 <code style="background:var(--bg-secondary);padding:2px 4px;border-radius:3px">xcode-select --install</code> 或 <code style="background:var(--bg-secondary);padding:2px 4px;border-radius:3px">brew install git</code><br>
            <strong>Linux:</strong> <code style="background:var(--bg-secondary);padding:2px 4px;border-radius:3px">sudo apt install git</code> 或 <code style="background:var(--bg-secondary);padding:2px 4px;border-radius:3px">sudo yum install git</code>
          </p>
        </div>`),m("Git 自动安装失败，请手动安装","warning")}finally{s.disabled=!1,s.textContent="一键安装 Git"}}),(C=t.querySelector("#btn-init-config"))==null||C.addEventListener("click",async()=>{const s=t.querySelector("#btn-init-config");s.disabled=!0,s.textContent="初始化中...";try{const a=await o.initOpenclawConfig();a!=null&&a.created?m("配置文件已创建","success"):m((a==null?void 0:a.message)||"配置文件已存在","info"),setTimeout(()=>S(t),500)}catch(a){m("初始化失败: "+a,"error"),s.disabled=!1,s.textContent="一键初始化配置"}}),(z=t.querySelector("#btn-scan-node"))==null||z.addEventListener("click",async()=>{const s=t.querySelector("#btn-scan-node"),a=t.querySelector("#scan-result");s.disabled=!0,s.textContent="扫描中...",a.style.display="block",a.innerHTML='<span style="color:var(--text-tertiary)">正在扫描常见安装路径...</span>';try{const e=await o.scanNodePaths();e.length===0?a.innerHTML='<span style="color:var(--warning)">未找到 Node.js 安装，请手动指定路径或下载安装。</span>':(a.innerHTML=e.map(d=>`<div style="display:flex;align-items:center;gap:6px;margin-top:4px">
            <span style="color:var(--success)">✓</span>
            <code style="flex:1;background:var(--bg-secondary);padding:2px 6px;border-radius:3px;font-size:11px">${d.path}</code>
            <span style="font-size:11px;color:var(--text-tertiary)">${d.version}</span>
            <button class="btn btn-primary btn-sm btn-use-path" data-path="${d.path}" style="font-size:10px;padding:2px 8px">使用</button>
          </div>`).join(""),a.querySelectorAll(".btn-use-path").forEach(d=>{d.addEventListener("click",async()=>{await o.saveCustomNodePath(d.dataset.path),m("Node.js 路径已保存，正在重新检测...","success"),setTimeout(()=>S(t),300)})}))}catch(e){a.innerHTML=`<span style="color:var(--danger)">扫描失败: ${e}</span>`}finally{s.disabled=!1,s.innerHTML=`${G("search",12)} 自动扫描`}}),($=t.querySelector("#btn-check-path"))==null||$.addEventListener("click",async()=>{var d;const s=t.querySelector("#input-node-path"),a=t.querySelector("#scan-result"),e=(d=s==null?void 0:s.value)==null?void 0:d.trim();if(!e){m("请输入 Node.js 安装目录","warning");return}a.style.display="block",a.innerHTML='<span style="color:var(--text-tertiary)">检测中...</span>';try{const x=await o.checkNodeAtPath(e);x.installed?(await o.saveCustomNodePath(e),a.innerHTML=`<span style="color:var(--success)">✓ 找到 Node.js ${x.version}，路径已保存</span>`,m("Node.js 路径已保存，正在重新检测...","success"),setTimeout(()=>S(t),300)):a.innerHTML='<span style="color:var(--warning)">该目录下未找到 node 可执行文件，请确认路径正确。</span>'}catch(x){a.innerHTML=`<span style="color:var(--danger)">检测失败: ${x}</span>`}});const r=t.querySelector("#btn-install");!r||!c||r.addEventListener("click",async()=>{var I,M;const s=((I=t.querySelector('input[name="install-source"]:checked'))==null?void 0:I.value)||"official",a=(M=t.querySelector("#registry-select"))==null?void 0:M.value,e=P("安装 OpenClaw");let d,x;q(!0);const _=()=>{q(!1),d==null||d(),x==null||x(),T==null||T(),H==null||H()};let T,H;try{if(window.__TAURI_INTERNALS__){const{listen:h}=await A(async()=>{const{listen:u}=await import("./event-DjZVAIBO.js");return{listen:u}},__vite__mapDeps([0,1]));if(d=await h("upgrade-log",u=>e.appendLog(u.payload)),x=await h("upgrade-progress",u=>e.setProgress(u.payload)),T=await h("upgrade-done",async u=>{_(),e.setDone(typeof u.payload=="string"?u.payload:"安装完成"),e.appendLog("正在安装 Gateway 服务...");try{await o.installGateway(),e.appendHtmlLog(`${k("ok",14)} Gateway 服务已安装`)}catch(i){e.appendHtmlLog(`${k("warn",14)} Gateway 安装失败: ${i}`)}try{const i=await o.readOpenclawConfig();if(i){let w=!1;i.gateway||(i.gateway={}),i.gateway.mode||(i.gateway.mode="local",w=!0,e.appendHtmlLog(`${k("ok",14)} 已设置 Gateway 运行模式为 local`)),(!i.tools||i.tools.profile!=="full")&&(i.tools={profile:"full",sessions:{visibility:"all"},...i.tools||{}},i.tools.profile="full",i.tools.sessions||(i.tools.sessions={}),i.tools.sessions.visibility="all",w=!0,e.appendHtmlLog(`${k("ok",14)} 已开启 Agent 工具全部权限`)),w&&await o.writeOpenclawConfig(i)}}catch(i){e.appendHtmlLog(`${k("warn",14)} 自动配置失败: ${i}`)}m("OpenClaw 安装成功","success"),setTimeout(()=>window.location.reload(),1500)}),H=await h("upgrade-error",async u=>{_();const i=String(u.payload||"未知错误");e.appendLog(i),await new Promise(W=>setTimeout(W,150));const w=e.getLogText()+`
`+i,L=O(w);e.setError(L.title),L.hint&&e.appendLog(""),L.hint&&e.appendHtmlLog(`${k("info",14)} ${L.hint}`),L.command&&e.appendHtmlLog(`${G("clipboard",14)} ${L.command}`),window.__openAIDrawerWithError&&window.__openAIDrawerWithError({title:L.title,error:w,scene:"初始安装 OpenClaw",hint:L.hint})}),a){e.appendLog(`设置 npm 镜像源: ${a}`);try{await o.setNpmRegistry(a)}catch{}}await o.installOpenclaw(s),e.appendLog("后台安装任务已启动，请等待完成...")}else{if(e.appendLog("Web 模式：安装日志不可用，请等待完成..."),a){e.appendLog(`设置 npm 镜像源: ${a}`);try{await o.setNpmRegistry(a)}catch{}}const h=await o.installOpenclaw(s);e.setDone(h),m("OpenClaw 安装成功","success"),setTimeout(()=>window.location.reload(),1500),_()}}catch(h){_();const u=String(h);e.appendLog(u);const i=e.getLogText()+`
`+u,w=O(i);e.setError(w.title)}})}export{J as render};

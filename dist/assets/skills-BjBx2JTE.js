import{a as v,t as h}from"./index-CqyYAB0C.js";let f=0;function a(s){return s?String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}async function _(){const s=document.createElement("div");return s.className="page",s.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Skills</h1>
      <p class="page-desc">管理已安装的 Skills，或从社区搜索安装新技能</p>
    </div>
    <div class="tab-bar" id="skills-main-tabs">
      <div class="tab active" data-main-tab="installed">已安装</div>
      <div class="tab" data-main-tab="store">搜索安装</div>
    </div>
    <div id="skills-tab-installed" class="config-section">
      <div class="stat-card loading-placeholder" style="height:96px"></div>
    </div>
    <div id="skills-tab-store" class="config-section" style="display:none">
      <div class="clawhub-toolbar" style="margin-bottom:var(--space-sm)">
        <select class="form-input" id="install-source-select" style="width:auto;min-width:160px">
          <option value="skillhub">SkillHub（国内加速）</option>
          <option value="clawhub">ClawHub（原版海外）</option>
        </select>
        <input class="input clawhub-search-input" id="skill-install-search" placeholder="搜索技能，如 weather / github / tavily" type="text" style="flex:1">
        <button class="btn btn-primary btn-sm" data-action="install-source-search">搜索</button>
        <button class="btn btn-secondary btn-sm" data-action="skillhub-setup" id="btn-skillhub-setup" style="display:none">安装 CLI</button>
        <a class="btn btn-secondary btn-sm" id="btn-browse-source" href="https://skillhub.tencent.com" target="_blank" rel="noopener">浏览</a>
      </div>
      <div class="form-hint" id="store-hint" style="margin-bottom:var(--space-sm);display:flex;align-items:center;gap:var(--space-xs)">
        <span id="skillhub-status"></span>
      </div>
      <div id="install-source-results" class="clawhub-list" style="max-height:calc(100vh - 320px);overflow-y:auto">
        <div class="clawhub-empty" style="padding:var(--space-xl);text-align:center">输入关键词搜索社区 Skills，然后一键安装</div>
      </div>
    </div>
  `,B(s),y(s),s}async function y(s){const l=s.querySelector("#skills-tab-installed");if(!l)return;const t=++f;l.innerHTML=`<div class="skills-loading-panel">
    <div class="stat-card loading-placeholder" style="height:96px"></div>
    <div class="form-hint" style="margin-top:8px">正在加载 Skills...</div>
  </div>`;try{const e=await v.skillsList();if(t!==f)return;q(l,e)}catch(e){if(t!==f)return;l.innerHTML=`<div class="skills-load-error">
      <div style="color:var(--error);margin-bottom:8px">加载失败: ${a((e==null?void 0:e.message)||e)}</div>
      <div class="form-hint" style="margin-bottom:10px">请确认 OpenClaw 已安装并可用</div>
      <button class="btn btn-secondary btn-sm" data-action="skill-retry">重试</button>
    </div>`}}function q(s,l){const t=(l==null?void 0:l.skills)||[],e=(l==null?void 0:l.cliAvailable)!==!1,n=t.filter(i=>i.eligible&&!i.disabled),r=t.filter(i=>!i.eligible&&!i.disabled&&!i.blockedByAllowlist),c=t.filter(i=>i.disabled),o=t.filter(i=>i.blockedByAllowlist&&!i.disabled),m=`${n.length} 可用 / ${r.length} 缺依赖 / ${c.length} 已禁用`;s.innerHTML=`
    <div class="clawhub-toolbar">
      <input class="input clawhub-search-input" id="skill-filter-input" placeholder="过滤 Skills..." type="text">
      <button class="btn btn-secondary btn-sm" data-action="skill-retry">刷新</button>
      <a class="btn btn-secondary btn-sm" href="https://clawhub.ai/skills" target="_blank" rel="noopener">ClawHub</a>
      ${e?"":'<span class="form-hint" style="margin-left:auto;color:var(--warning)">CLI 不可用，仅显示本地扫描结果</span>'}
    </div>

    <div class="skills-summary" style="margin-bottom:var(--space-lg);color:var(--text-secondary);font-size:var(--font-size-sm)">
      共 ${t.length} 个 Skills: ${m}
    </div>

    ${n.length?`
    <div class="clawhub-panel" style="margin-bottom:var(--space-lg)">
      <div class="clawhub-panel-title" style="color:var(--success)">✓ 可用 (${n.length})</div>
      <div class="clawhub-list skills-scroll-area skills-trending-scroll" id="skills-eligible">
        ${n.map(i=>k(i,"eligible")).join("")}
      </div>
    </div>`:""}

    ${r.length?`
    <div class="clawhub-panel" style="margin-bottom:var(--space-lg)">
      <div class="clawhub-panel-title" style="color:var(--warning);display:flex;align-items:center;gap:var(--space-sm)">
        <span>✗ 缺少依赖 (${r.length})</span>
        <button class="btn btn-secondary btn-sm" data-action="skill-ai-fix" style="font-size:var(--font-size-xs);padding:2px 8px">让 Girl Star帮我安装</button>
      </div>
      <div class="clawhub-list skills-scroll-area skills-installed-scroll" id="skills-missing">
        ${r.map(i=>k(i,"missing")).join("")}
      </div>
    </div>`:""}

    ${c.length?`
    <div class="clawhub-panel" style="margin-bottom:var(--space-lg)">
      <div class="clawhub-panel-title" style="color:var(--text-tertiary)">⏸ 已禁用 (${c.length})</div>
      <div class="clawhub-list skills-scroll-area skills-search-scroll" id="skills-disabled">
        ${c.map(i=>k(i,"disabled")).join("")}
      </div>
    </div>`:""}

    ${o.length?`
    <div class="clawhub-panel" style="margin-bottom:var(--space-lg)">
      <div class="clawhub-panel-title" style="color:var(--text-tertiary)">🚫 白名单阻止 (${o.length})</div>
      <div class="clawhub-list">
        ${o.map(i=>k(i,"blocked")).join("")}
      </div>
    </div>`:""}

    ${t.length?"":`
    <div class="clawhub-panel">
      <div class="clawhub-empty" style="text-align:center;padding:var(--space-xl)">
        <div style="margin-bottom:var(--space-sm)">未检测到任何 Skills</div>
        <div class="form-hint">请确认 OpenClaw 已正确安装。Skills 随 OpenClaw 捆绑提供，也可自定义放置在 <code>~/.openclaw/skills/</code> 目录下。</div>
      </div>
    </div>`}

    <div id="skill-detail-area"></div>
  `;const b=s.querySelector("#skill-filter-input");b&&b.addEventListener("input",()=>{const i=b.value.trim().toLowerCase();s.querySelectorAll(".skill-card-item").forEach(d=>{const p=(d.dataset.name||"").toLowerCase(),g=(d.dataset.desc||"").toLowerCase();d.style.display=!i||p.includes(i)||g.includes(i)?"":"none"})})}function k(s,l){var g,$,S;const t=s.emoji||"📦",e=s.name||"",n=s.description||"",r=s.bundled?"捆绑":s.source||"自定义",c=((g=s.missing)==null?void 0:g.bins)||[],o=(($=s.missing)==null?void 0:$.env)||[],m=((S=s.missing)==null?void 0:S.config)||[],b=s.install||[];let i="";l==="eligible"?i='<span class="clawhub-badge installed">可用</span>':l==="missing"?i='<span class="clawhub-badge" style="background:rgba(245,158,11,0.14);color:#d97706">缺依赖</span>':l==="disabled"?i='<span class="clawhub-badge" style="background:rgba(107,114,128,0.14);color:#6b7280">已禁用</span>':l==="blocked"&&(i='<span class="clawhub-badge" style="background:rgba(239,68,68,0.14);color:#ef4444">已阻止</span>');let d="";c.length&&(d+=`<div class="form-hint" style="margin-top:4px">缺少命令: ${c.map(u=>`<code>${a(u)}</code>`).join(", ")}</div>`),o.length&&(d+=`<div class="form-hint" style="margin-top:4px">缺少环境变量: ${o.map(u=>`<code>${a(u)}</code>`).join(", ")} <span style="color:var(--text-tertiary);font-size:var(--font-size-xs)">— 需在系统环境变量中配置</span></div>`),m.length&&(d+=`<div class="form-hint" style="margin-top:4px">缺少配置: ${m.map(u=>`<code>${a(u)}</code>`).join(", ")} <span style="color:var(--text-tertiary);font-size:var(--font-size-xs)">— 需在 openclaw.json 中配置</span></div>`);let p="";return l==="missing"&&(b.length?p=`<div style="margin-top:6px">${b.map(u=>`<button class="btn btn-primary btn-sm" style="margin-right:6px;margin-top:4px" data-action="skill-install-dep" data-kind="${a(u.kind)}" data-install='${a(JSON.stringify(u))}' data-skill-name="${a(e)}">${a(u.label)}</button>`).join("")}</div>`:c.length&&!o.length&&!m.length&&(p=`<div class="form-hint" style="margin-top:6px;color:var(--text-tertiary);font-size:var(--font-size-xs)">无自动安装选项，请手动安装: ${c.map(u=>`<code>brew install ${a(u)}</code> 或 <code>npm i -g ${a(u)}</code>`).join(" / ")}</div>`)),`
    <div class="clawhub-item skill-card-item" data-name="${a(e)}" data-desc="${a(n)}">
      <div class="clawhub-item-main">
        <div class="clawhub-item-title">${t} ${a(e)}</div>
        <div class="clawhub-item-meta">${a(r)}${s.homepage?` · <a href="${a(s.homepage)}" target="_blank" rel="noopener" style="color:var(--accent)">${a(s.homepage)}</a>`:""}</div>
        <div class="clawhub-item-desc">${a(n)}</div>
        ${d}
        ${p}
      </div>
      <div class="clawhub-item-actions">
        <button class="btn btn-secondary btn-sm" data-action="skill-info" data-name="${a(e)}">详情</button>
        ${s.bundled?"":`<button class="btn btn-sm" style="color:var(--error);border:1px solid var(--error);background:transparent;font-size:var(--font-size-xs)" data-action="skill-uninstall" data-name="${a(e)}">卸载</button>`}
        ${i}
      </div>
    </div>
  `}async function I(s,l){var e,n;const t=s.querySelector("#skill-detail-area");if(t){t.innerHTML='<div class="form-hint" style="margin-top:var(--space-md)">正在加载详情...</div>',t.scrollIntoView({behavior:"smooth",block:"nearest"});try{const c=await v.skillsInfo(l)||{},o=c.requirements||{},m=c.missing||{};let b="";(e=o.bins)!=null&&e.length&&(b+=`<div style="margin-top:8px"><strong>需要命令:</strong> ${o.bins.map(i=>{const d=!(m.bins||[]).includes(i);return`<code style="color:var(--${d?"success":"error"})">${d?"✓":"✗"} ${a(i)}</code>`}).join(" ")}</div>`),(n=o.env)!=null&&n.length&&(b+=`<div style="margin-top:4px"><strong>环境变量:</strong> ${o.env.map(i=>{const d=!(m.env||[]).includes(i);return`<code style="color:var(--${d?"success":"error"})">${d?"✓":"✗"} ${a(i)}</code>`}).join(" ")}</div>`),t.innerHTML=`
      <div class="clawhub-detail-card">
        <div class="clawhub-detail-title">${a(c.emoji||"📦")} ${a(c.name||l)}</div>
        <div class="clawhub-detail-meta">
          来源: ${a(c.source||"")} · 路径: <code>${a(c.filePath||"")}</code>
          ${c.homepage?` · <a href="${a(c.homepage)}" target="_blank" rel="noopener">${a(c.homepage)}</a>`:""}
        </div>
        <div class="clawhub-detail-desc" style="margin-top:8px">${a(c.description||"")}</div>
        ${b}
        ${(c.install||[]).length&&!c.eligible?`<div style="margin-top:8px"><strong>安装选项:</strong> ${c.install.map(i=>`<span class="form-hint">→ ${a(i.label)}</span>`).join(" ")}</div>`:""}
      </div>
    `}catch(r){t.innerHTML=`<div style="color:var(--error);margin-top:var(--space-md)">加载详情失败: ${a((r==null?void 0:r.message)||r)}</div>`}}}async function T(s,l){const t=l.dataset.kind;let e;try{e=JSON.parse(l.dataset.install)}catch{e={}}const n=l.dataset.skillName||"";l.disabled=!0,l.textContent="安装中...";try{await v.skillsInstallDep(t,e),h(`${n} 依赖安装成功`,"success"),await y(s)}catch(r){h(`安装失败: ${(r==null?void 0:r.message)||r}`,"error"),l.disabled=!1,l.textContent=e.label||"重试"}}let w="skillhub",L=!1;function M(){return w}async function x(s){const l=s.querySelector("#skill-install-search"),t=s.querySelector("#install-source-results");if(!l||!t)return;const e=l.value.trim();if(!e){t.innerHTML='<div class="clawhub-empty">输入关键词搜索社区 Skills</div>';return}const n=M();if(n==="skillhub"&&!L){t.innerHTML=`<div style="padding:var(--space-lg);text-align:center">
      <div style="color:var(--warning);margin-bottom:8px">⚠️ 请先安装 SkillHub CLI</div>
      <div class="form-hint" style="margin-bottom:12px">点击上方「安装 CLI」按钮，或切换到 ClawHub 源搜索</div>
      <button class="btn btn-primary btn-sm" data-action="skillhub-setup">一键安装 SkillHub CLI</button>
    </div>`;return}t.innerHTML='<div class="form-hint">正在搜索...</div>';try{const r=n==="skillhub"?await v.skillsSkillHubSearch(e):await v.skillsClawHubSearch(e);if(!(r!=null&&r.length)){t.innerHTML='<div class="clawhub-empty">没有找到匹配的 Skill</div>';return}const c=n==="skillhub"?"source-install-skillhub":"source-install-clawhub";t.innerHTML=r.map(o=>`
      <div class="clawhub-item">
        <div class="clawhub-item-main">
          <div class="clawhub-item-title">${a(o.slug||o.name||"")}</div>
          <div class="clawhub-item-desc">${a(o.description||o.summary||"")}</div>
        </div>
        <div class="clawhub-item-actions">
          <button class="btn btn-primary btn-sm" data-action="${c}" data-slug="${a(o.slug||o.name||"")}">安装</button>
        </div>
      </div>
    `).join("")}catch(r){const c=String((r==null?void 0:r.message)||r);/rate.?limit|429|too many/i.test(c)?t.innerHTML=`<div style="padding:var(--space-lg);text-align:center">
        <div style="color:var(--warning);margin-bottom:8px">⚠️ 请求频率超限</div>
        <div class="form-hint">${n==="clawhub"?"ClawHub 海外源限流，建议切换到 SkillHub（国内加速）":"请稍后再试"}</div>
      </div>`:t.innerHTML=`<div style="color:var(--error);padding:var(--space-sm)">搜索失败: ${a(c)}</div>`}}async function H(s,l,t){const e=l.dataset.slug;l.disabled=!0,l.textContent="安装中...";try{t==="skillhub"?await v.skillsSkillHubInstall(e):await v.skillsClawHubInstall(e),h(`Skill ${e} 安装成功`,"success"),l.textContent="已安装",l.classList.remove("btn-primary"),l.classList.add("btn-secondary"),y(s).catch(()=>{})}catch(n){h(`安装失败: ${(n==null?void 0:n.message)||n}`,"error"),l.disabled=!1,l.textContent="安装"}}async function j(s,l){const t=l.dataset.name;if(t&&confirm(`确定卸载 Skill「${t}」？`)){l.disabled=!0,l.textContent="卸载中...";try{await v.skillsUninstall(t),h(`已卸载 ${t}`,"success"),await y(s)}catch(e){h(`卸载失败: ${(e==null?void 0:e.message)||e}`,"error"),l.disabled=!1,l.textContent="卸载"}}}async function z(s){const l=s.querySelector("#skillhub-status");l&&(l.textContent="正在安装 SkillHub CLI...");try{await v.skillsSkillHubSetup(!0),h("SkillHub CLI 安装成功","success"),l&&(l.textContent="✅ 已安装");const t=s.querySelector("#btn-skillhub-setup");t&&(t.style.display="none")}catch(t){h(`SkillHub CLI 安装失败: ${(t==null?void 0:t.message)||t}`,"error"),l&&(l.textContent="❌ 安装失败")}}async function C(s){const l=s.querySelector("#skillhub-status"),t=s.querySelector("#btn-skillhub-setup");if(l)try{const e=await v.skillsSkillHubCheck();L=!!e.installed,e.installed?(l.innerHTML=`<span style="color:var(--success)">✅ v${e.version}</span>`,t&&(t.style.display="none")):(l.innerHTML='<span style="color:var(--warning)">⚠️ 未安装 CLI</span>',t&&w==="skillhub"&&(t.style.display=""))}catch{l.textContent=""}}function E(s,l){w=l;const t=s.querySelector("#install-source-results"),e=s.querySelector("#btn-skillhub-setup"),n=s.querySelector("#btn-browse-source");t&&(t.innerHTML='<div class="clawhub-empty">输入关键词搜索社区 Skills</div>'),l==="skillhub"?(n&&(n.href="https://skillhub.tencent.com"),C(s)):(e&&(e.style.display="none"),n&&(n.href="https://clawhub.ai/skills"))}function B(s){s.querySelectorAll("#skills-main-tabs .tab").forEach(t=>{t.onclick=()=>{s.querySelectorAll("#skills-main-tabs .tab").forEach(n=>n.classList.remove("active")),t.classList.add("active");const e=t.dataset.mainTab;s.querySelector("#skills-tab-installed").style.display=e==="installed"?"":"none",s.querySelector("#skills-tab-store").style.display=e==="store"?"":"none",e==="store"&&C(s)}});const l=s.querySelector("#install-source-select");l&&(l.onchange=()=>E(s,l.value)),s.addEventListener("click",async t=>{const e=t.target.closest("[data-action]");if(e)switch(e.dataset.action){case"skill-retry":await y(s);break;case"skill-info":await I(s,e.dataset.name);break;case"skill-install-dep":await T(s,e);break;case"install-source-search":await x(s);break;case"source-install-skillhub":await H(s,e,"skillhub");break;case"source-install-clawhub":await H(s,e,"clawhub");break;case"skillhub-setup":await z(s);break;case"skill-uninstall":await j(s,e);break;case"skill-ai-fix":window.location.hash="#/assistant",setTimeout(()=>{const n=document.querySelector('.ast-skill-card[data-skill="skills-manager"]');n&&n.click()},500);break}}),s.addEventListener("keydown",async t=>{var e;t.key==="Enter"&&((e=t.target)==null?void 0:e.id)==="skill-install-search"&&(t.preventDefault(),await x(s))})}export{_ as render};

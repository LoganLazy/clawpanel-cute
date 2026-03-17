import{t as i,a as n}from"./index-ejK_hknt.js";function c(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}const u=[{label:"npm 官方源（默认）",value:"https://registry.npmjs.org"},{label:"淘宝镜像（可选）",value:"https://registry.npmmirror.com"}];async function S(){const e=document.createElement("div");return e.className="page",e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">面板设置</h1>
      <p class="page-desc">管理 ClawStar 的网络、代理和下载源配置</p>
    </div>

    <div class="config-section" id="proxy-section">
      <div class="config-section-title">网络代理</div>
      <div id="proxy-bar"><div class="stat-card loading-placeholder" style="height:48px"></div></div>
    </div>

    <div class="config-section" id="model-proxy-section">
      <div class="config-section-title">模型请求代理</div>
      <div id="model-proxy-bar"><div class="stat-card loading-placeholder" style="height:48px"></div></div>
    </div>

    <div class="config-section" id="registry-section">
      <div class="config-section-title">npm 源设置</div>
      <div id="registry-bar"><div class="stat-card loading-placeholder" style="height:48px"></div></div>
    </div>
  `,x(e),m(e),e}async function m(e){const t=[d(e),y(e)];t.push(v(e)),await Promise.all(t)}async function d(e){var a;const t=e.querySelector("#proxy-bar");if(t)try{const r=await n.readPanelConfig(),s=((a=r==null?void 0:r.networkProxy)==null?void 0:a.url)||"";t.innerHTML=`
      <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap">
        <input class="form-input" data-name="proxy-url" placeholder="http://127.0.0.1:7897" value="${c(s)}" style="max-width:360px">
        <button class="btn btn-primary btn-sm" data-action="save-proxy">保存</button>
        <button class="btn btn-secondary btn-sm" data-action="test-proxy" ${s?"":"disabled"}>测试连通</button>
        <button class="btn btn-secondary btn-sm" data-action="clear-proxy" ${s?"":"disabled"}>关闭代理</button>
      </div>
      <div id="proxy-test-result" style="margin-top:var(--space-xs);font-size:var(--font-size-xs);min-height:20px"></div>
      <div class="form-hint" style="margin-top:var(--space-xs)">
        设置后，npm 安装/升级、版本检测、GitHub/Gitee 更新检查、ClawHub Skills 等下载类操作会走此代理。自动绕过 localhost 和内网地址。保存后新请求立即生效；如 Gateway 正在运行，建议重启一次服务。
      </div>
    `}catch(r){t.innerHTML=`<div style="color:var(--error)">加载失败: ${c(String(r))}</div>`}}async function y(e){var a,r;const t=e.querySelector("#model-proxy-bar");if(t)try{const s=await n.readPanelConfig(),l=((a=s==null?void 0:s.networkProxy)==null?void 0:a.url)||"",o=!!((r=s==null?void 0:s.networkProxy)!=null&&r.proxyModelRequests),p=!!l;t.innerHTML=`
      <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap">
        <label style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-sm);cursor:pointer">
          <input type="checkbox" data-name="model-proxy-toggle" ${o?"checked":""} ${p?"":"disabled"}>
          模型测试和模型列表请求也走代理
        </label>
        <button class="btn btn-primary btn-sm" data-action="save-model-proxy">保存</button>
      </div>
      <div class="form-hint" style="margin-top:var(--space-xs)">
        ${p?"默认关闭。部分用户的模型 API 地址本身就是国内中转或内网地址，走代理反而会连接失败。只有当你的模型服务商需要翻墙访问时才建议开启。":"请先在上方设置网络代理地址后，才能启用此选项。"}
      </div>
    `}catch(s){t.innerHTML=`<div style="color:var(--error)">加载失败: ${c(String(s))}</div>`}}async function v(e){const t=e.querySelector("#registry-bar");try{let a=await n.getNpmRegistry();(!a||a==="https://registry.npmmirror.com")&&(a="https://registry.npmjs.org");const r=u.some(o=>o.value===a);t.innerHTML=`
      <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap">
        <select class="form-input" data-name="registry" style="max-width:320px">
          ${u.map(o=>`<option value="${o.value}" ${o.value===a?"selected":""}>${o.label}</option>`).join("")}
          <option value="custom" ${r?"":"selected"}>自定义</option>
        </select>
        <input class="form-input" data-name="custom-registry" placeholder="https://..." value="${r?"":c(a)}" style="max-width:320px;${r?"display:none":""}">
        <button class="btn btn-primary btn-sm" data-action="save-registry">保存</button>
      </div>
      <div class="form-hint" style="margin-top:var(--space-xs)">升级和版本检测使用此源下载 npm 包</div>
    `;const s=t.querySelector('[data-name="registry"]'),l=t.querySelector('[data-name="custom-registry"]');s.onchange=()=>{l.style.display=s.value==="custom"?"":"none"}}catch(a){t.innerHTML=`<div style="color:var(--error)">加载失败: ${c(String(a))}</div>`}}function x(e){e.addEventListener("click",async t=>{const a=t.target.closest("[data-action]");if(!a)return;const r=a.dataset.action;a.disabled=!0;try{switch(r){case"save-proxy":await b(e);break;case"test-proxy":await f(e);break;case"clear-proxy":await w(e);break;case"save-model-proxy":await h(e);break;case"save-registry":await P(e);break}}catch(s){i(s.toString(),"error")}finally{a.disabled=!1}})}function g(e){const t=String(e||"").trim();if(!t)return"";if(!/^https?:\/\//i.test(t))throw new Error("代理地址必须以 http:// 或 https:// 开头");return t}async function f(e){const t=e.querySelector("#proxy-test-result");t&&(t.innerHTML='<span style="color:var(--text-tertiary)">正在测试代理连通性...</span>');try{const a=await n.testProxy();t&&(t.innerHTML=a.ok?`<span style="color:var(--success)">✓ 代理连通（HTTP ${a.status}，耗时 ${a.elapsed_ms}ms）→ ${c(a.target)}</span>`:`<span style="color:var(--warning)">⚠ 代理可达但返回异常（HTTP ${a.status}，${a.elapsed_ms}ms）</span>`)}catch(a){t&&(t.innerHTML=`<span style="color:var(--error)">✗ ${c(String(a))}</span>`)}}async function b(e){const t=e.querySelector('[data-name="proxy-url"]'),a=g((t==null?void 0:t.value)||"");if(!a){i('请输入代理地址，或点击"关闭代理"',"error");return}const r=await n.readPanelConfig();(!r.networkProxy||typeof r.networkProxy!="object")&&(r.networkProxy={}),r.networkProxy.url=a,await n.writePanelConfig(r),i("网络代理已保存；如 Gateway 正在运行，建议重启服务","success"),await d(e),await y(e)}async function w(e){const t=await n.readPanelConfig();delete t.networkProxy,await n.writePanelConfig(t),i("网络代理已关闭","success"),await d(e),await y(e)}async function h(e){const t=e.querySelector('[data-name="model-proxy-toggle"]'),a=(t==null?void 0:t.checked)||!1,r=await n.readPanelConfig();(!r.networkProxy||typeof r.networkProxy!="object")&&(r.networkProxy={}),r.networkProxy.proxyModelRequests=a,await n.writePanelConfig(r),i(a?"模型请求将走代理":"模型请求已关闭代理","success")}async function P(e){const t=e.querySelector('[data-name="registry"]'),a=e.querySelector('[data-name="custom-registry"]'),r=t.value==="custom"?a.value.trim():t.value;if(!r){i("请输入源地址","error");return}await n.setNpmRegistry(r),i("npm 源已保存","success")}export{S as render};

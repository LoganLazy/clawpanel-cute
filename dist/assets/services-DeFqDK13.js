const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-DjZVAIBO.js","assets/core-DhEqZVGG.js"])))=>i.map(i=>d[i]);
import{t as v,a as l,f as B,r as N,h as A,j as M,_ as D,s as E,b as P,k as H}from"./index-DGbIDRMZ.js";import{showConfirm as h,showUpgradeModal as R}from"./modal-DK6Az47R.js";import{d as C}from"./error-diagnosis-BawKPn5g.js";function I(a){return a?String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}async function rt(){const a=document.createElement("div");return a.className="page",a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">服务管理</h1>
      <p class="page-desc">管理 OpenClaw 服务、检查更新、配置备份</p>
    </div>
    <div id="version-bar"><div class="stat-card loading-placeholder" style="height:80px;margin-bottom:var(--space-lg)"></div></div>
    <div id="services-list"><div class="stat-card loading-placeholder" style="height:64px"></div></div>
    <div class="config-section" id="config-editor-section" style="display:none">
      <div class="config-section-title">配置文件编辑</div>
      <div class="form-hint" style="margin-bottom:var(--space-sm)">直接编辑 <code>openclaw.json</code> 主配置文件。保存前会自动创建备份，修改后可能需要重启 Gateway 生效。</div>
      <div style="display:flex;gap:8px;margin-bottom:var(--space-sm)">
        <button class="btn btn-primary btn-sm" data-action="save-config" disabled>保存并重启</button>
        <button class="btn btn-secondary btn-sm" data-action="save-config-only" disabled>仅保存</button>
        <button class="btn btn-secondary btn-sm" data-action="reload-config">重新加载</button>
      </div>
      <div id="config-editor-status" style="font-size:var(--font-size-xs);margin-bottom:6px;min-height:18px"></div>
      <textarea id="config-editor-area" class="form-input" style="font-family:var(--font-mono);font-size:12px;min-height:320px;resize:vertical;tab-size:2;white-space:pre;overflow-x:auto" spellcheck="false" disabled></textarea>
    </div>
    <div class="config-section" id="backup-section">
      <div class="config-section-title">配置备份</div>
      <div class="form-hint" style="margin-bottom:var(--space-sm)">备份范围：openclaw.json 主配置文件（含模型、Provider、Gateway 设置）。Agent 数据和记忆文件不在此备份范围内。</div>
      <div id="backup-actions" style="margin-bottom:var(--space-md)">
        <button class="btn btn-primary btn-sm" data-action="create-backup">创建备份</button>
      </div>
      <div id="backup-list"><div class="stat-card loading-placeholder" style="height:48px"></div></div>
    </div>
  `,W(a),U(a),a}async function U(a){const s=[S(a),w(a),$(a),q(a)];await Promise.all(s)}let x="chinese",u=null;async function S(a){const s=a.querySelector("#version-bar");try{const t=await l.getVersionInfo();u=t,x=t.source||"chinese";const e=t.current||"未知",n=!!t.recommended,c=!!t.current&&n&&!!t.ahead_of_recommended,d=!!t.current&&n&&!t.is_recommended&&!c,i=x==="chinese",p=i?"汉化优化版":"官方原版",o=i?"切换到官方版":"切换到汉化版",r=i?"official":"chinese",f=c?`检测到当前本地版本 ${e} 高于面板推荐稳定版 ${t.recommended}，继续使用可能存在兼容或稳定性风险，建议尽快回退到推荐版。`:"默认只建议当前面板已验证的推荐稳定版。如需尝试其它版本或最新特性，请到「关于」页手动切换版本并自行验证兼容性；若希望面板优先适配最新版，欢迎提交 issue。";A()?s.innerHTML=`
        <div class="stat-cards" style="margin-bottom:var(--space-lg)">
          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-card-label">当前版本 · <span style="color:var(--accent)">Docker 部署</span></span>
            </div>
            <div class="stat-card-value">${e}</div>
            <div class="stat-card-meta">${t.latest_update_available?"最新上游: "+t.latest+"（请拉取新镜像更新）":"已是当前镜像版本"}</div>
            ${t.latest_update_available?`<div style="margin-top:var(--space-sm)">
              <code style="font-size:var(--font-size-xs);background:var(--bg-tertiary);padding:4px 8px;border-radius:4px;user-select:all">docker pull ghcr.io/qingchencloud/openclaw:latest</code>
            </div>`:""}
          </div>
        </div>
      `:s.innerHTML=`
        <div class="stat-cards" style="margin-bottom:var(--space-lg)">
          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-card-label">当前版本 · <span style="color:var(--accent)">${p}</span></span>
            </div>
            <div class="stat-card-value">${e}</div>
            <div class="stat-card-meta">
              ${n?c?`当前版本高于推荐稳定版: ${t.recommended}`:d?`推荐稳定版: ${t.recommended}`:`已对齐推荐稳定版: ${t.recommended}`:"未获取到推荐稳定版"}
              ${t.latest_update_available&&t.latest?` · 最新上游: ${t.latest}`:""}
            </div>
            <div style="display:flex;gap:var(--space-sm);margin-top:var(--space-sm);flex-wrap:wrap">
              ${c?'<button class="btn btn-primary btn-sm" data-action="upgrade">回退到推荐版</button>':d?'<button class="btn btn-primary btn-sm" data-action="upgrade">切换到推荐版</button>':""}
              <button class="btn btn-secondary btn-sm" data-action="switch-source" data-source="${r}">${o}</button>
            </div>
            <div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary);line-height:1.6">
              ${f}
            </div>
          </div>
        </div>
      `}catch{s.innerHTML='<div class="stat-card" style="margin-bottom:var(--space-lg)"><div class="stat-card-label">版本信息加载失败</div></div>'}}async function w(a){const s=a.querySelector("#services-list");try{const t=await l.getServicesStatus();j(s,t)}catch(t){s.innerHTML=`<div style="color:var(--error)">加载服务列表失败: ${I(String(t))}</div>`}}function j(a,s){const t=s.find(n=>n.label==="ai.openclaw.gateway");let e="";if(t){const n=t.cli_installed===!1;e+=`
    <div class="service-card" data-label="${t.label}">
      <div class="service-info">
        <span class="status-dot ${n?"stopped":t.running?"running":"stopped"}"></span>
        <div>
          <div class="service-name">${t.label}</div>
          <div class="service-desc">${n?"OpenClaw CLI 未安装":(t.description||"")+(t.pid?" (PID: "+t.pid+")":"")}</div>
        </div>
      </div>
      <div class="service-actions">
        ${n?`<div style="display:flex;flex-direction:column;gap:var(--space-xs);align-items:flex-end">
               <div style="color:var(--text-tertiary);font-size:var(--font-size-xs)">请先安装 OpenClaw CLI:</div>
               <code style="font-size:var(--font-size-xs);background:var(--bg-tertiary);padding:2px 8px;border-radius:4px;user-select:all">npm install -g @qingchencloud/openclaw-zh</code>
               <button class="btn btn-secondary btn-sm" data-action="refresh-services" style="margin-top:4px">刷新状态</button>
             </div>`:t.running?`<button class="btn btn-secondary btn-sm" data-action="restart" data-label="${t.label}">重启</button>
               <button class="btn btn-danger btn-sm" data-action="stop" data-label="${t.label}">停止</button>
               ${M()?'<button class="btn btn-danger btn-sm" data-action="uninstall-gateway">卸载</button>':""}`:`<button class="btn btn-primary btn-sm" data-action="start" data-label="${t.label}">启动</button>
               ${M()?'<button class="btn btn-primary btn-sm" data-action="install-gateway">安装</button><button class="btn btn-danger btn-sm" data-action="uninstall-gateway">卸载</button>':""}`}
      </div>
    </div>`}else e+=`
    <div class="service-card">
      <div class="service-info">
        <span class="status-dot stopped"></span>
        <div>
          <div class="service-name">ai.openclaw.gateway</div>
          <div class="service-desc">Gateway 服务未安装</div>
        </div>
      </div>
      <div class="service-actions">
        <button class="btn btn-primary btn-sm" data-action="install-gateway">安装</button>
      </div>
    </div>`;a.innerHTML=e}async function $(a){const s=a.querySelector("#backup-list");try{const t=await l.listBackups();J(s,t)}catch(t){s.innerHTML=`<div style="color:var(--error)">加载备份列表失败: ${t}</div>`}}function J(a,s){if(!s||!s.length){a.innerHTML='<div style="color:var(--text-tertiary);padding:var(--space-md) 0">暂无备份</div>';return}a.innerHTML=s.map(t=>{const e=t.created_at?new Date(t.created_at*1e3).toLocaleString("zh-CN"):"未知",n=t.size?(t.size/1024).toFixed(1)+" KB":"";return`
      <div class="service-card" data-backup="${t.name}">
        <div class="service-info">
          <div>
            <div class="service-name">${t.name}</div>
            <div class="service-desc">${e}${n?" · "+n:""}</div>
          </div>
        </div>
        <div class="service-actions">
          <button class="btn btn-primary btn-sm" data-action="restore-backup" data-name="${t.name}">恢复</button>
          <button class="btn btn-danger btn-sm" data-action="delete-backup" data-name="${t.name}">删除</button>
        </div>
      </div>`}).join("")}function W(a){a.addEventListener("click",async s=>{const t=s.target.closest("[data-action]");if(!t)return;const e=t.dataset.action;t.disabled=!0;try{switch(e){case"start":case"stop":case"restart":await X(e,t.dataset.label,a);break;case"save-config":await O(a,!0);break;case"save-config-only":await O(a,!1);break;case"reload-config":await q(a);break;case"create-backup":await Y(a);break;case"restore-backup":await Z(t.dataset.name,a);break;case"delete-backup":await V(t.dataset.name,a);break;case"upgrade":await tt(t,a);break;case"switch-source":await at(t.dataset.source,a);break;case"install-gateway":await et(t,a);break;case"uninstall-gateway":await st(t,a);break;case"refresh-services":await w(a);break}}catch(n){v(n.toString(),"error")}finally{t.disabled=!1}})}const F={start:"启动",stop:"停止",restart:"重启"},K=1500,Q=3e4;async function X(a,s,t){var _;const e={start:l.startService,stop:l.stopService,restart:l.restartService}[a],n=F[a],c=a!=="stop";a==="stop"&&B(),a==="start"&&N();const d=t.querySelector(`.service-card[data-label="${s}"]`),i=d==null?void 0:d.querySelector(".service-actions"),p=(i==null?void 0:i.innerHTML)||"";let o=!1;if(i){i.innerHTML=`
      <div class="service-loading">
        <div class="service-spinner"></div>
        <span class="service-loading-text">正在${n}...</span>
        <button class="btn btn-sm btn-ghost service-cancel-btn" style="display:none">取消等待</button>
      </div>`;const m=i.querySelector(".service-cancel-btn");m&&m.addEventListener("click",()=>{o=!0})}const r=d==null?void 0:d.querySelector(".status-dot");r&&(r.className="status-dot loading");try{await e(s)}catch(m){v(`${n}命令失败: ${m.message||m}`,"error"),i&&(i.innerHTML=p),r&&(r.className="status-dot stopped");return}const f=Date.now();let g=!1;const b=i==null?void 0:i.querySelector(".service-loading-text"),T=i==null?void 0:i.querySelector(".service-cancel-btn");for(;!o;){const m=Date.now()-f;if(!g&&m>5e3&&T&&(T.style.display="",g=!0),b){const y=Math.floor(m/1e3);b.textContent=`正在${n}... ${y}s`}if(m>Q){v(`${n}超时，Gateway 可能仍在启动中`,"warning");break}try{const y=await l.getServicesStatus(),L=((_=y==null?void 0:y.find)==null?void 0:_.call(y,G=>G.label===s))||(y==null?void 0:y[0]);if(L&&L.running===c){v(`${s} 已${n}${L.pid?" (PID: "+L.pid+")":""}`,"success"),await w(t);return}}catch{}await new Promise(y=>setTimeout(y,K))}o&&v("已取消等待，可稍后刷新查看状态","info"),await w(t)}async function Y(a){const s=await l.createBackup();v(`备份已创建: ${s.name}`,"success"),await $(a)}async function Z(a,s){await h(`确定要恢复备份 "${a}" 吗？
当前配置将自动备份后再恢复。`)&&(await l.restoreBackup(a),v("配置已恢复","success"),await $(s))}async function V(a,s){await h(`确定要删除备份 "${a}" 吗？此操作不可撤销。`)&&(await l.deleteBackup(a),v("备份已删除","success"),await $(s))}let k="";async function q(a){const s=a.querySelector("#config-editor-section"),t=a.querySelector("#config-editor-area"),e=a.querySelector("#config-editor-status"),n=a.querySelector('[data-action="save-config"]'),c=a.querySelector('[data-action="save-config-only"]');try{const d=await l.readOpenclawConfig(),i=JSON.stringify(d,null,2);k=i,t.value=i,t.disabled=!1,n.disabled=!1,c.disabled=!1,s.style.display="",e.innerHTML=`<span style="color:var(--text-tertiary)">已加载 · ${(i.length/1024).toFixed(1)} KB</span>`,t.oninput=()=>{try{JSON.parse(t.value);const p=t.value!==k;e.innerHTML=p?'<span style="color:var(--warning)">● 有未保存的修改</span>':'<span style="color:var(--text-tertiary)">无修改</span>',n.disabled=!p,c.disabled=!p}catch(p){e.innerHTML=`<span style="color:var(--error)">JSON 语法错误: ${p.message.split(" at ")[0]}</span>`,n.disabled=!0,c.disabled=!0}}}catch{s.style.display="none"}}async function O(a,s){const t=a.querySelector("#config-editor-area"),e=a.querySelector("#config-editor-status");let n;try{n=JSON.parse(t.value)}catch{v("JSON 格式错误，无法保存","error");return}e.innerHTML='<span style="color:var(--text-tertiary)">自动备份中...</span>';try{await l.createBackup()}catch(c){if(!await h("自动备份失败: "+c+`

是否仍然继续保存？`))return}e.innerHTML='<span style="color:var(--text-tertiary)">保存中...</span>';try{if(await l.writeOpenclawConfig(n),k=t.value,v("配置已保存"+(s?"，正在重启 Gateway...":""),"success"),e.innerHTML='<span style="color:var(--success)">已保存</span>',a.querySelector('[data-action="save-config"]').disabled=!0,a.querySelector('[data-action="save-config-only"]').disabled=!0,s){try{await l.restartGateway(),v("Gateway 已重启","success")}catch(c){v("配置已保存，但 Gateway 重启失败: "+c,"warning")}await w(a)}await $(a)}catch(c){v("保存失败: "+c,"error"),e.innerHTML=`<span style="color:var(--error)">保存失败: ${c}</span>`}}async function z(a,s,t=null){const e=R("升级 / 切换版本");let n,c,d,i;H(!0);const p=()=>{H(!1),n==null||n(),c==null||c(),d==null||d(),i==null||i()};try{if(window.__TAURI_INTERNALS__){const{listen:o}=await D(async()=>{const{listen:r}=await import("./event-DjZVAIBO.js");return{listen:r}},__vite__mapDeps([0,1]));n=await o("upgrade-log",r=>e.appendLog(r.payload)),c=await o("upgrade-progress",r=>e.setProgress(r.payload)),d=await o("upgrade-done",r=>{p(),e.setDone(typeof r.payload=="string"?r.payload:"操作完成"),S(s)}),i=await o("upgrade-error",r=>{p();const f=String(r.payload||"未知错误");e.appendLog(f);const g=e.getLogText()+`
`+f,b=C(g);e.setError(b.title),b.hint&&e.appendLog(""),b.hint&&e.appendHtmlLog(`${E("info",14)} ${b.hint}`),b.command&&e.appendHtmlLog(`${P("clipboard",14)} ${b.command}`),window.__openAIDrawerWithError&&window.__openAIDrawerWithError({title:b.title,error:g,scene:"升级 OpenClaw",hint:b.hint})}),await l.upgradeOpenclaw(a,t),e.appendLog("后台任务已启动，请等待完成...")}else{e.appendLog("Web 模式：升级过程日志不可用，请等待完成...");const o=await l.upgradeOpenclaw(a,t);e.setDone(typeof o=="string"?o:(o==null?void 0:o.message)||"升级完成"),await S(s),p()}}catch(o){p();const r=String(o);e.appendLog(r);const f=e.getLogText()+`
`+r,g=C(f);e.setError(g.title)}}async function tt(a,s){const t=x==="official"?"官方原版":"汉化优化版",e=u==null?void 0:u.recommended;await h(`确定要将 OpenClaw 切换到当前面板推荐的稳定${t}${e?`（${e}）`:""}吗？
切换过程中 Gateway 会短暂中断。
如果你想尝试最新版，请到「关于」页手动切换版本并自测兼容性。`)&&await z(x,s,e||null)}async function at(a,s){const t=a==="official"?"官方原版":"汉化优化版",e=a==="official"?(u==null?void 0:u.source)==="official"?u==null?void 0:u.recommended:null:(u==null?void 0:u.source)==="chinese"?u==null?void 0:u.recommended:null;await h(`确定要切换到${t}${e?`（推荐稳定版 ${e}）`:"（将自动选择该来源的推荐稳定版）"}吗？
这会安装对应的 npm 包，配置数据不受影响。
如需尝试最新版，请到「关于」页手动切换版本。`)&&await z(a,s,null)}async function et(a,s){a.classList.add("btn-loading"),a.textContent="安装中...";try{await l.installGateway(),v("Gateway 服务已安装","success"),await w(s)}catch(t){v("安装失败: "+t,"error"),a.classList.remove("btn-loading"),a.textContent="安装"}}async function st(a,s){if(await h(`确定要卸载 Gateway 服务吗？
这会停止服务并移除 LaunchAgent。`)){a.classList.add("btn-loading"),a.textContent="卸载中...";try{await l.uninstallGateway(),v("Gateway 服务已卸载","success"),await w(s)}catch(e){v("卸载失败: "+e,"error"),a.classList.remove("btn-loading"),a.textContent="卸载"}}}export{rt as render};

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CRKb_1Il.js","assets/core-DhEqZVGG.js"])))=>i.map(i=>d[i]);
import{o as O,a as w,_ as R,t as v,n as A}from"./index-ZS5CnNlZ.js";let _=null;async function N(){const a=document.createElement("div");return a.className="page",a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">仪表盘</h1>
      <p class="page-desc">OpenClaw 运行状态概览</p>
    </div>
    <div class="stat-cards" id="stat-cards">
      <div class="stat-card loading-placeholder"></div>
      <div class="stat-card loading-placeholder"></div>
      <div class="stat-card loading-placeholder"></div>
      <div class="stat-card loading-placeholder"></div>
      <div class="stat-card loading-placeholder"></div>
      <div class="stat-card loading-placeholder"></div>
    </div>
    <div id="dashboard-overview-container"></div>
    <div class="quick-actions">
      <button class="btn btn-secondary" id="btn-restart-gw">重启 Gateway</button>
      <button class="btn btn-secondary" id="btn-check-update">检查更新</button>
      <button class="btn btn-secondary" id="btn-create-backup">创建备份</button>
    </div>
    <div class="config-section">
      <div class="config-section-title">最近日志</div>
      <div class="log-viewer" id="recent-logs" style="max-height:300px"></div>
    </div>
  `,V(a),$(a),_&&_(),_=O(()=>{$(a)}),a}function F(){_&&(_(),_=null)}let L=!1;async function $(a,n=!1){const s=Promise.allSettled([w.getServicesStatus(),w.readOpenclawConfig(),!L||n?w.getVersionInfo():Promise.resolve(null)]),o=Promise.allSettled([w.listAgents(),w.readMcpConfig(),w.listBackups(),!L||n?w.getStatusSummary():Promise.resolve(null)]),t=w.readLogTail("gateway",20).catch(()=>""),[l,e,i]=await s,r=l.status==="fulfilled"?l.value:[],c=e.status==="fulfilled"?e.value:{},d=i.status==="fulfilled"?i.value:null;if(l.status==="rejected"&&v("服务状态加载失败","error"),e.status==="rejected"&&v("版本信息加载失败","error"),d){let x=!1;d.gateway||(d.gateway={}),d.gateway.mode||(d.gateway.mode="local",x=!0),d.mode&&(delete d.mode,x=!0),(!d.tools||d.tools.profile!=="full")&&(d.tools={profile:"full",sessions:{visibility:"all"},...d.tools||{}},d.tools.profile="full",d.tools.sessions||(d.tools.sessions={}),d.tools.sessions.visibility="all",x=!0),x&&w.writeOpenclawConfig(d).catch(()=>{})}G(a,r,c,[],d);const[f,m,p,h]=await o,u=f.status==="fulfilled"?f.value:[],b=m.status==="fulfilled"?m.value:null,k=p.status==="fulfilled"?p.value:[],T=h.status==="fulfilled"?h.value:null;G(a,r,c,u,d),B(a,r,b,k,d,u,T);const M=await t;q(a,M),L=!0}function G(a,n,s,o,t){var m,p,h;const l=a.querySelector("#stat-cards"),e=n.find(u=>u.label==="ai.openclaw.gateway"),i=n.filter(u=>u.running).length,r=s.recommended?`${s.ahead_of_recommended?`当前版本高于推荐稳定版 ${s.recommended}，可能不稳定`:s.is_recommended?"稳定版 "+s.recommended:"推荐稳定版 "+s.recommended}${s.latest_update_available&&s.latest?" · 最新上游 "+s.latest:""}`:s.latest_update_available&&s.latest?"最新上游: "+s.latest:"版本信息未获取",c=((m=o.find(u=>u.id==="main"))==null?void 0:m.name)||"main",d=(p=t==null?void 0:t.models)!=null&&p.providers?Object.values(t.models.providers).reduce((u,b)=>{var k;return u+(((k=b.models)==null?void 0:k.length)||0)},0):0,f=(h=t==null?void 0:t.models)!=null&&h.providers?Object.keys(t.models.providers).length:0;l.innerHTML=`
    <div class="stat-card">
      <div class="stat-card-header">
        <span class="stat-card-label">Gateway</span>
        <span class="status-dot ${e!=null&&e.running?"running":"stopped"}"></span>
      </div>
      <div class="stat-card-value">${e!=null&&e.running?"运行中":"已停止"}</div>
      <div class="stat-card-meta">${e!=null&&e.pid?"PID: "+e.pid:e!=null&&e.running?"端口检测":"未启动"}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-header">
        <span class="stat-card-label">版本 · ${s.source==="official"?"官方":"汉化"}</span>
      </div>
      <div class="stat-card-value">${s.current||"未知"}</div>
      <div class="stat-card-meta">${r}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-header">
        <span class="stat-card-label">Agent 舰队</span>
      </div>
      <div class="stat-card-value">${o.length} 个</div>
      <div class="stat-card-meta">默认: ${c}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-header">
        <span class="stat-card-label">模型池</span>
      </div>
      <div class="stat-card-value">${d} 个</div>
      <div class="stat-card-meta">基于 ${f} 个渠道商</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-header">
        <span class="stat-card-label">基础服务</span>
      </div>
      <div class="stat-card-value">${i}/${n.length}</div>
      <div class="stat-card-meta">存活率 ${n.length?Math.round(i/n.length*100):0}%</div>
    </div>
    <div class="stat-card stat-card-clickable" id="card-control-ui" title="打开 OpenClaw 原生控制面板">
      <div class="stat-card-header">
        <span class="stat-card-label">Control UI</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="opacity:0.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
      <div class="stat-card-value" style="font-size:var(--font-size-sm)">OpenClaw 原生面板</div>
      <div class="stat-card-meta">${e!=null&&e.running?"点击打开浏览器":"Gateway 未运行"}</div>
    </div>
  `}function B(a,n,s,o,t,l,e){var k,T,M,x,S,E,P;const i=a.querySelector("#dashboard-overview-container"),r=n.find(y=>y.label==="ai.openclaw.gateway"),c=s!=null&&s.mcpServers?Object.keys(s.mcpServers).length:0,d=y=>{if(!y)return"——";const g=new Date(y*1e3),I=g.getMonth()+1,z=g.getDate(),H=g.getHours().toString().padStart(2,"0"),D=g.getMinutes().toString().padStart(2,"0");return I+"-"+z+" "+H+":"+D},f=o.length>0?o.sort((y,g)=>g.created_at-y.created_at)[0]:null,m=((k=t==null?void 0:t.meta)==null?void 0:k.lastTouchedVersion)||"未知",p=(e==null?void 0:e.runtimeVersion)||null,h=(e==null?void 0:e.sessions)||null,u=((T=t==null?void 0:t.gateway)==null?void 0:T.port)||18789,b=((S=(x=(M=t==null?void 0:t.agents)==null?void 0:M.defaults)==null?void 0:x.model)==null?void 0:S.primary)||"未设置";i.innerHTML=`
    <div class="dashboard-overview">
      <div class="overview-grid">
        <div class="overview-card" data-nav="/gateway">
          <div class="overview-card-icon" style="color:${r!=null&&r.running?"var(--success)":"var(--error)"}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="overview-card-body">
            <div class="overview-card-title">Gateway</div>
            <div class="overview-card-value" style="color:${r!=null&&r.running?"var(--success)":"var(--error)"}">${r!=null&&r.running?"运行中":"已停止"}</div>
            <div class="overview-card-meta">端口 ${u} ${r!=null&&r.pid?"· PID "+r.pid:""}</div>
          </div>
          <div class="overview-card-actions">
            ${r!=null&&r.running?'<button class="btn btn-danger btn-xs" data-action="stop-gw">停止</button><button class="btn btn-secondary btn-xs" data-action="restart-gw">重启</button>':'<button class="btn btn-primary btn-xs" data-action="start-gw">启动</button>'}
          </div>
        </div>

        <div class="overview-card" data-nav="/models">
          <div class="overview-card-icon" style="color:var(--accent)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
          </div>
          <div class="overview-card-body">
            <div class="overview-card-title">主模型</div>
            <div class="overview-card-value" style="font-size:var(--font-size-sm)">${b}</div>
            <div class="overview-card-meta">并发上限 ${((P=(E=t==null?void 0:t.agents)==null?void 0:E.defaults)==null?void 0:P.maxConcurrent)||4}</div>
          </div>
        </div>

        <div class="overview-card" data-nav="/skills">
          <div class="overview-card-icon" style="color:var(--warning)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div class="overview-card-body">
            <div class="overview-card-title">MCP 工具</div>
            <div class="overview-card-value">${c} 个</div>
            <div class="overview-card-meta">已挂载扩展</div>
          </div>
        </div>

        <div class="overview-card" data-nav="/services">
          <div class="overview-card-icon" style="color:var(--text-tertiary)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <div class="overview-card-body">
            <div class="overview-card-title">最近备份</div>
            <div class="overview-card-value" style="font-size:var(--font-size-sm)">${f?d(f.created_at):"从无备份"}</div>
            <div class="overview-card-meta">${o.length} 个备份文件</div>
          </div>
        </div>

        <div class="overview-card" data-nav="/agents">
          <div class="overview-card-icon" style="color:var(--success)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          </div>
          <div class="overview-card-body">
            <div class="overview-card-title">Agent 舰队</div>
            <div class="overview-card-value">${l.length} 个</div>
            <div class="overview-card-meta">${l.filter(y=>y.workspace).length} 个独立工作区</div>
          </div>
        </div>

        <div class="overview-card">
          <div class="overview-card-icon" style="color:var(--text-tertiary)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
          <div class="overview-card-body">
            <div class="overview-card-title">运行时版本</div>
            <div class="overview-card-value" style="font-size:var(--font-size-sm)">${p||m}</div>
            <div class="overview-card-meta">${p?"OpenClaw Runtime":"openclaw.json"}</div>
          </div>
        </div>
      </div>
      ${j(h)}
    </div>
  `,i.querySelectorAll("[data-nav]").forEach(y=>{y.style.cursor="pointer",y.addEventListener("click",g=>{g.target.closest("button")||A(y.dataset.nav)})})}function j(a){var t,l;if(!a||!a.recent||a.recent.length===0)return"";const n=a.recent.slice(0,5).map(e=>{var u;const i=(u=e.percentUsed)!=null?u:0,r=i>80?"var(--error)":i>50?"var(--warning)":"var(--success)",c=(e.flags||[]).map(b=>`<span class="session-flag">${C(b)}</span>`).join(""),d=e.model?`<span class="session-model">${C(e.model)}</span>`:"",f=e.totalTokens!=null&&e.totalTokens>0?`${Math.round(e.totalTokens/1e3)}k`:"0",m=e.contextTokens!=null?`${Math.round(e.contextTokens/1e3)}k`:"—",p=e.remainingTokens!=null?`${Math.round(e.remainingTokens/1e3)}k`:m,h=C(e.key||"").replace(/^agent:main:/,"");return`<div class="session-row">
      <div class="session-row-header">
        <span class="session-key" title="${C(e.key||"")}">${h||"—"}</span>
        ${d}${c}
      </div>
      <div class="session-bar-wrap">
        <div class="session-bar" style="width:${Math.min(i,100)}%;background:${r}"></div>
      </div>
      <div class="session-row-meta">${f} / ${m} · 剩余 ${p} · ${i}%</div>
    </div>`}),s=((t=a.defaults)==null?void 0:t.model)||"—",o=(l=a.defaults)!=null&&l.contextTokens?`${Math.round(a.defaults.contextTokens/1e3)}k`:"—";return`
    <div class="config-section" style="margin-top:16px">
      <div class="config-section-title">活跃会话 <span style="font-weight:normal;color:var(--text-tertiary);font-size:var(--font-size-xs)">${a.count||0} 个 · 默认模型 ${C(s)} · 上下文 ${o}</span></div>
      <div class="session-list">${n.join("")}</div>
    </div>`}function q(a,n){const s=a.querySelector("#recent-logs");if(!n){s.innerHTML='<div style="color:var(--text-tertiary);padding:12px">暂无日志</div>';return}const o=n.trim().split(`
`);s.innerHTML=o.map(t=>`<div class="log-line">${C(t)}</div>`).join(""),s.scrollTop=s.scrollHeight}function V(a){const n=a.querySelector("#btn-restart-gw"),s=a.querySelector("#btn-check-update"),o=a.querySelector("#btn-create-backup");a.addEventListener("click",async t=>{var e,i,r;if(t.target.closest("#card-control-ui")&&!t.target.closest("button"))try{const c=await w.readOpenclawConfig(),d=((e=c==null?void 0:c.gateway)==null?void 0:e.port)||18789,f=window.__TAURI_INTERNALS__?"127.0.0.1":location.hostname||"127.0.0.1";let p=`${location.protocol==="https:"?"https":"http"}://${f}:${d}`;const h=(r=(i=c==null?void 0:c.gateway)==null?void 0:i.auth)==null?void 0:r.token;if(h&&(p+=`?token=${encodeURIComponent(h)}`),window.__TAURI_INTERNALS__)try{const{open:u}=await R(async()=>{const{open:b}=await import("./index-CRKb_1Il.js");return{open:b}},__vite__mapDeps([0,1]));await u(p)}catch{window.open(p,"_blank")}else window.open(p,"_blank")}catch(c){v("打开 Control UI 失败: "+(c.message||c),"error")}}),a.addEventListener("click",async t=>{const l=t.target.closest("[data-action]");if(!l)return;const e=l.dataset.action;if(e==="start-gw"){l.disabled=!0,l.textContent="启动中...";try{await w.startService("ai.openclaw.gateway"),v("Gateway 启动指令已发送","success"),setTimeout(()=>$(a),2e3)}catch(i){v("启动失败: "+i,"error")}finally{l.disabled=!1,l.textContent="启动"}}if(e==="stop-gw"){l.disabled=!0,l.textContent="停止中...";try{await w.stopService("ai.openclaw.gateway"),v("Gateway 已停止","success"),setTimeout(()=>$(a),1500)}catch(i){v("停止失败: "+i,"error")}finally{l.disabled=!1,l.textContent="停止"}}if(e==="restart-gw"){l.disabled=!0,l.textContent="重启中...";try{await w.restartService("ai.openclaw.gateway"),v("Gateway 重启指令已发送","success"),setTimeout(()=>$(a),3e3)}catch(i){v("重启失败: "+i,"error")}finally{l.disabled=!1,l.textContent="重启"}}}),n==null||n.addEventListener("click",async()=>{var l;n.disabled=!0,n.classList.add("btn-loading"),n.textContent="重启中...";try{await w.restartService("ai.openclaw.gateway")}catch(e){v("重启失败: "+e,"error"),n.disabled=!1,n.classList.remove("btn-loading"),n.textContent="重启 Gateway";return}const t=Date.now();for(;Date.now()-t<3e4;){try{const i=await w.getServicesStatus(),r=((l=i==null?void 0:i.find)==null?void 0:l.call(i,c=>c.label==="ai.openclaw.gateway"))||(i==null?void 0:i[0]);if(r!=null&&r.running){v(`Gateway 已重启 (PID: ${r.pid})`,"success"),n.disabled=!1,n.classList.remove("btn-loading"),n.textContent="重启 Gateway",$(a);return}}catch{}const e=Math.floor((Date.now()-t)/1e3);n.textContent=`重启中... ${e}s`,await new Promise(i=>setTimeout(i,1500))}v("重启超时，Gateway 可能仍在启动中","warning"),n.disabled=!1,n.classList.remove("btn-loading"),n.textContent="重启 Gateway",$(a)}),s==null||s.addEventListener("click",async()=>{s.disabled=!0,s.textContent="检查中...";try{const t=await w.getVersionInfo();t.ahead_of_recommended&&t.recommended?v(`当前本地版本 ${t.current||""} 高于推荐稳定版 ${t.recommended}，可能存在兼容风险`,"warning"):t.update_available&&t.recommended?v(`发现推荐稳定版: ${t.recommended}`,"info"):t.latest_update_available&&t.latest?v(`已对齐推荐稳定版，最新上游为 ${t.latest}`,"info"):v("已对齐推荐稳定版","success")}catch(t){v("检查更新失败: "+t,"error")}finally{s.disabled=!1,s.textContent="检查更新"}}),o==null||o.addEventListener("click",async()=>{o.disabled=!0,o.innerHTML="备份中...";try{const t=await w.createBackup();v(`已备份: ${t.name}`,"success"),setTimeout(()=>$(a),500)}catch(t){v("备份失败: "+t,"error")}finally{o.disabled=!1,o.textContent="创建备份"}})}function C(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}export{F as cleanup,N as render};

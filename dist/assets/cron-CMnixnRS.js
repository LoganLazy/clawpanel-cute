import{b as p,o as _,t as d,a as M,w as h,i as N}from"./index-CHo86jxB.js";import{showContentModal as U,showConfirm as B}from"./modal-DK6Az47R.js";let q=null;const O=[{expr:"*/5 * * * *",text:"每 5 分钟"},{expr:"*/15 * * * *",text:"每 15 分钟"},{expr:"0 * * * *",text:"每小时整点"},{expr:"0 9 * * *",text:"每天 9:00"},{expr:"0 18 * * *",text:"每天 18:00"},{expr:"0 9 * * 1",text:"每周一 9:00"},{expr:"0 9 1 * *",text:"每月 1 号 9:00"}];async function P(){const e=document.createElement("div");e.className="page",e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">定时任务</h1>
      <p class="page-desc">创建计划任务，让 AI 按设定时间自动执行指令</p>
    </div>
    <div id="cron-gw-hint" style="display:none;margin-bottom:var(--space-md)">
      <div class="config-section" style="border-left:3px solid var(--warning);padding:12px 16px">
        <div style="display:flex;align-items:center;gap:8px;color:var(--text-secondary);font-size:var(--font-size-sm)">
          ${p("alert-circle",16)}
          <span>定时任务通过 Gateway 管理。请先启动 Gateway 后使用此功能。</span>
          <a href="#/services" class="btn btn-sm btn-secondary" style="margin-left:auto;font-size:11px">服务管理</a>
        </div>
      </div>
    </div>
    <div id="cron-stats" class="stat-cards" style="margin-bottom:var(--space-lg)"></div>
    <div class="config-actions" style="margin-bottom:var(--space-md)">
      <button class="btn btn-primary btn-sm" id="btn-new-task">+ 创建任务</button>
      <button class="btn btn-secondary btn-sm" id="btn-refresh-tasks">刷新</button>
    </div>
    <div id="cron-list"></div>
  `;const t={jobs:[],loading:!1};return e.querySelector("#btn-new-task").onclick=()=>G(null,e,t),e.querySelector("#btn-refresh-tasks").onclick=()=>S(e,t),F(),q&&q(),q=_(()=>{R(e),S(e,t)}),R(e),await S(e,t),e}function Q(){q&&(q(),q=null)}async function F(){var e;try{N("read_openclaw_config");const t=await M.readOpenclawConfig();(e=t==null?void 0:t.cron)!=null&&e.jobs&&(delete t.cron.jobs,Object.keys(t.cron).length===0&&delete t.cron,await M.writeOpenclawConfig(t),d("已自动修复配置（移除无效的 cron.jobs）","info"))}catch{}}function T(){return h&&h.gatewayReady}function R(e){const t=e.querySelector("#cron-gw-hint");t&&(t.style.display=T()?"none":"")}async function S(e,t){if(!T()){t.jobs=[],t.loading=!1,E(e,t),A(e,t);return}t.loading=!0,A(e,t);try{const i=await h.request("cron.list",{includeDisabled:!0});let n=(i==null?void 0:i.jobs)||i;Array.isArray(n)||(n=[]),t.jobs=n.map(a=>{var o,l,c,f,s,k,r;return{id:a.id,name:a.name||a.id||"未命名",description:a.description||"",message:((o=a.payload)==null?void 0:o.message)||((l=a.payload)==null?void 0:l.text)||"",payloadKind:((c=a.payload)==null?void 0:c.kind)||"agentTurn",schedule:a.schedule||{},enabled:a.enabled!==!1,agentId:a.agentId||null,lastRunStatus:((f=a.state)==null?void 0:f.lastRunStatus)||((s=a.state)==null?void 0:s.lastStatus)||null,lastRunAtMs:((k=a.state)==null?void 0:k.lastRunAtMs)||null,lastError:((r=a.state)==null?void 0:r.lastError)||null}})}catch(i){d("获取任务列表失败: "+i,"error"),t.jobs=[]}t.loading=!1,E(e,t),A(e,t)}function E(e,t){const i=e.querySelector("#cron-stats"),n=t.jobs.length,a=t.jobs.filter(c=>c.enabled).length,o=n-a,l=t.jobs.filter(c=>c.lastRunStatus==="error").length;i.innerHTML=`
    <div class="stat-card">
      <div class="stat-card-header"><span class="stat-card-label">总任务</span></div>
      <div class="stat-card-value">${n}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-header"><span class="stat-card-label">运行中</span></div>
      <div class="stat-card-value" style="color:var(--success)">${a}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-header"><span class="stat-card-label">已暂停</span></div>
      <div class="stat-card-value" style="color:var(--text-tertiary)">${o}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-header"><span class="stat-card-label">近期失败</span></div>
      <div class="stat-card-value" style="color:${l?"var(--error)":"var(--text-tertiary)"}">${l}</div>
    </div>
  `}function A(e,t){const i=e.querySelector("#cron-list");if(t.loading){i.innerHTML=`
      <div class="config-section"><div class="stat-card loading-placeholder" style="height:80px"></div></div>
      <div class="config-section"><div class="stat-card loading-placeholder" style="height:80px"></div></div>
    `;return}if(!t.jobs.length){i.innerHTML=`
      <div style="text-align:center;padding:40px 0;color:var(--text-tertiary)">
        <div style="margin-bottom:12px;color:var(--text-tertiary)">${p("clock",48)}</div>
        <div style="font-size:var(--font-size-md);margin-bottom:6px">暂无定时任务</div>
        <div style="font-size:var(--font-size-sm)">点击「+ 创建任务」添加你的第一个计划任务</div>
      </div>
    `;return}i.innerHTML=t.jobs.map(n=>{const a=J(n.schedule),o=n.lastRunStatus==="ok"||n.lastRunStatus==="skipped",l=n.lastRunAtMs?`
      <span style="font-size:var(--font-size-xs);color:${o?"var(--success)":"var(--error)"}">
        ${o?p("check",12):p("x",12)} ${K(n.lastRunAtMs)}
      </span>
    `:"";return`
      <div class="config-section cron-job-card ${n.enabled?"":"disabled"}" data-jid="${n.id}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span style="font-weight:600">${b(n.name)}</span>
              <span class="cron-badge ${n.enabled?"active":"paused"}">${n.enabled?"运行中":"已暂停"}</span>
              ${l}
            </div>
            <div style="font-size:var(--font-size-sm);color:var(--text-tertiary);margin-bottom:6px">
              ${p("clock",12)} ${a}${n.agentId?` &middot; Agent: ${b(n.agentId)}`:""}
            </div>
            <div style="font-size:var(--font-size-sm);color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:500px">
              ${b(n.message)}
            </div>
            ${n.lastRunStatus==="error"&&n.lastError?`
              <div style="margin-top:6px;font-size:var(--font-size-xs);color:var(--error);background:var(--error-muted, #fee2e2);padding:4px 8px;border-radius:var(--radius-sm)">
                ${b(n.lastError)}
              </div>
            `:""}
          </div>
          <div style="display:flex;gap:6px;flex-shrink:0">
            <button class="btn btn-sm btn-secondary" data-action="trigger" title="立即执行">${p("play",14)}</button>
            <button class="btn btn-sm btn-secondary" data-action="toggle">${n.enabled?p("pause",14):p("play",14)}</button>
            <button class="btn btn-sm btn-secondary" data-action="edit">${p("edit",14)}</button>
            <button class="btn btn-sm btn-danger" data-action="delete">${p("trash",14)}</button>
          </div>
        </div>
      </div>
    `}).join(""),i.querySelectorAll(".cron-job-card").forEach(n=>{const a=n.dataset.jid,o=t.jobs.find(l=>l.id===a);o&&(n.querySelector('[data-action="trigger"]').onclick=async l=>{const c=l.currentTarget;c.disabled=!0;try{await h.request("cron.run",{jobId:a}),d("任务已触发执行","success"),setTimeout(()=>S(e,t),2e3)}catch(f){d("触发失败: "+f,"error")}finally{c.disabled=!1}},n.querySelector('[data-action="toggle"]').onclick=async l=>{const c=l.currentTarget;c.disabled=!0,c.innerHTML=p("refresh-cw",14);try{await h.request("cron.update",{jobId:a,patch:{enabled:!o.enabled}}),d(o.enabled?"已暂停":"已启用","info"),await S(e,t)}catch(f){d("操作失败: "+f,"error"),c.disabled=!1,c.innerHTML=o.enabled?p("pause",14):p("play",14)}},n.querySelector('[data-action="edit"]').onclick=()=>G(o,e,t),n.querySelector('[data-action="delete"]').onclick=async function(){const l=this;if(await B(`确定删除任务「${o.name}」？`)){l&&(l.disabled=!0);try{await h.request("cron.remove",{jobId:a}),d("已删除","info"),await S(e,t)}catch(f){d("删除失败: "+f,"error"),l&&(l.disabled=!1)}}})})}async function G(e,t,i){if(!T()){d("Gateway 未连接，无法管理定时任务。请先启动 Gateway","warning");return}const n=!!e,a=D(e==null?void 0:e.schedule)||"0 9 * * *",o="cron-form-"+Date.now(),l=O.map(r=>`<button type="button" class="btn btn-sm ${(r.expr===a?"selected":"")?"btn-primary":"btn-secondary"} cron-shortcut" data-expr="${r.expr}">${r.text}</button>`).join(""),c=`<option value="" ${e!=null&&e.agentId?"":"selected"}>默认 Agent</option>${e!=null&&e.agentId?`<option value="${C(e.agentId)}" selected>${b(e.agentId)}</option>`:""}`,f=`
    <form id="${o}" style="display:flex;flex-direction:column;gap:var(--space-md)">
      <div class="form-group">
        <label class="form-label">任务名称 *</label>
        <input class="form-input" name="name" value="${C((e==null?void 0:e.name)||"")}" placeholder="如：每日摘要推送" autofocus>
      </div>
      <div class="form-group">
        <label class="form-label">执行指令 *</label>
        <textarea class="form-input" name="message" rows="3" placeholder="AI 将在触发时执行这段指令">${b((e==null?void 0:e.message)||"")}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">指定 Agent</label>
        <select class="form-input" name="agentId">${c}</select>
        <div class="form-hint">不选则使用默认 Agent 执行</div>
      </div>
      <div class="form-group">
        <label class="form-label">投递渠道</label>
        <select class="form-input" name="deliveryChannel"><option value="">无（主会话）</option></select>
        <div class="form-hint">配置了多个消息渠道时必须指定，否则任务会报错</div>
      </div>
      <div class="form-group">
        <label class="form-label">执行周期</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">${l}</div>
        <input class="form-input" name="schedule" value="${C(a)}" placeholder="Cron 表达式，如 0 9 * * *">
        <div class="form-hint" id="cron-preview">${I(a)}</div>
      </div>
      <div class="form-group" style="display:flex;align-items:center;justify-content:space-between">
        <label class="form-label" style="margin:0">创建后立即启用</label>
        <label class="toggle-switch">
          <input type="checkbox" name="enabled" ${(e==null?void 0:e.enabled)!==!1?"checked":""}>
          <span class="toggle-slider"></span>
        </label>
      </div>
    </form>
  `,s=U({title:n?"编辑任务":"创建定时任务",content:f,buttons:[{label:n?"保存修改":"创建",className:"btn btn-primary",id:"btn-cron-save"}],width:500});M.readOpenclawConfig().then(r=>{var $;const v=(r==null?void 0:r.channels)||{},u=Object.keys(v).filter(x=>x!=="defaults");if(u.length<=1)return;const m=s.querySelector('select[name="deliveryChannel"]');if(!m)return;const g=(($=e==null?void 0:e.delivery)==null?void 0:$.channel)||"";m.innerHTML='<option value="">无（主会话）</option>'+u.map(x=>`<option value="${C(x)}" ${x===g?"selected":""}>${b(x)}</option>`).join("")}).catch(()=>{}),M.listAgents().then(r=>{const v=Array.isArray(r)?r:(r==null?void 0:r.agents)||[];if(!v.length)return;const u=s.querySelector('select[name="agentId"]');if(!u)return;const m=u.value;u.innerHTML='<option value="">默认 Agent</option>'+v.map(g=>`<option value="${C(g.id)}" ${g.id===((e==null?void 0:e.agentId)||m)?"selected":""}>${b(g.name||g.id)}</option>`).join("")}).catch(()=>{}),s.querySelectorAll(".cron-shortcut").forEach(r=>{r.onclick=()=>{s.querySelectorAll(".cron-shortcut").forEach(u=>{u.classList.remove("btn-primary"),u.classList.add("btn-secondary")}),r.classList.remove("btn-secondary"),r.classList.add("btn-primary");const v=s.querySelector('input[name="schedule"]');v.value=r.dataset.expr,s.querySelector("#cron-preview").textContent=I(r.dataset.expr)}});const k=s.querySelector('input[name="schedule"]');k.oninput=()=>{s.querySelector("#cron-preview").textContent=I(k.value.trim()),s.querySelectorAll(".cron-shortcut").forEach(r=>{r.classList.remove("btn-primary"),r.classList.add("btn-secondary"),r.dataset.expr===k.value.trim()&&(r.classList.remove("btn-secondary"),r.classList.add("btn-primary"))})},s.querySelector("#btn-cron-save").onclick=async()=>{var x,L,z,H;const r=s.querySelector('input[name="name"]').value.trim(),v=s.querySelector('textarea[name="message"]').value.trim(),u=s.querySelector('input[name="schedule"]').value.trim(),m=s.querySelector('select[name="agentId"]').value||void 0,g=s.querySelector('input[name="enabled"]').checked;if(!r){d("请输入任务名称","warning");return}if(!v){d("请输入执行指令","warning");return}if(!u){d("请设置执行周期","warning");return}const $=s.querySelector("#btn-cron-save");$.disabled=!0,$.textContent="保存中...";try{if(n){const y={name:r,enabled:g};y.schedule={kind:"cron",expr:u},y.payload={kind:"agentTurn",message:v},m&&(y.agentId=m);const w=(x=s.querySelector('select[name="deliveryChannel"]'))==null?void 0:x.value;w&&(y.delivery={mode:"push",to:w,channel:w}),await h.request("cron.update",{jobId:e.id,patch:y}),d("任务已更新","success")}else{const y={name:r,enabled:g,schedule:{kind:"cron",expr:u},payload:{kind:"agentTurn",message:v}};m&&(y.agentId=m);const w=(L=s.querySelector('select[name="deliveryChannel"]'))==null?void 0:L.value;w&&(y.delivery={mode:"push",to:w,channel:w}),await h.request("cron.add",y),d("任务已创建","success")}(z=s.close)!=null&&z.call(s)||((H=s.remove)==null||H.call(s)),await S(t,i)}catch(y){d("保存失败: "+y,"error"),$.disabled=!1,$.textContent=n?"保存修改":"创建"}}}function D(e){return e?typeof e=="string"?e:typeof e=="object"&&e.expr||typeof e=="object"&&e.kind==="cron"&&e.expr?e.expr:null:null}function I(e){const t=typeof e=="string"?e:D(e);if(!t)return"未知周期";const i=O.find(f=>f.expr===t);if(i)return i.text;const n=t.split(" ");if(n.length!==5)return t;const[a,o,l,,c]=n;return a==="*"&&o==="*"?"每分钟":a.startsWith("*/")?`每 ${a.slice(2)} 分钟`:o==="*"&&a==="0"?"每小时整点":c!=="*"&&l==="*"?`每周 ${c} 的 ${o}:${a.padStart(2,"0")}`:l!=="*"?`每月 ${l} 号 ${o}:${a.padStart(2,"0")}`:o!=="*"?`每天 ${o}:${a.padStart(2,"0")}`:t}function J(e){if(!e)return"未知";if(typeof e=="string")return I(e);if(typeof e=="object"){if(e.kind==="every"&&e.everyMs){const t=e.everyMs;return t<6e4?`每 ${Math.round(t/1e3)} 秒`:t<36e5?`每 ${Math.round(t/6e4)} 分钟`:`每 ${Math.round(t/36e5)} 小时`}if(e.kind==="at"&&e.at)try{return"一次性: "+new Date(e.at).toLocaleString()}catch{return e.at}if(e.kind==="cron"&&e.expr)return I(e.expr)}return String(e)}function K(e){if(!e)return"";const t=typeof e=="number"?e:new Date(e).getTime(),i=Date.now()-t;return i<6e4?"刚刚":i<36e5?Math.floor(i/6e4)+" 分钟前":i<864e5?Math.floor(i/36e5)+" 小时前":Math.floor(i/864e5)+" 天前"}function b(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function C(e){return(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}export{Q as cleanup,P as render};

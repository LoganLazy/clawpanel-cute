import{a as n,t as o}from"./index-CqyYAB0C.js";const v=[{key:"gateway",label:"Gateway 日志"},{key:"gateway-err",label:"Gateway 错误"},{key:"guardian",label:"守护进程"},{key:"guardian-backup",label:"备份日志"},{key:"config-audit",label:"审计日志"}];let s=null;async function m(){const e=document.createElement("div");e.className="page",e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">日志查看</h1>
      <p class="page-desc">查看 OpenClaw 各服务日志</p>
    </div>
    <div class="tab-bar">
      ${v.map((a,t)=>`<div class="tab${t===0?" active":""}" data-tab="${a.key}">${a.label}</div>`).join("")}
    </div>
    <div class="log-toolbar">
      <input type="text" class="form-input" id="log-search" placeholder="搜索日志..." style="max-width:300px">
      <button class="btn btn-secondary btn-sm" id="btn-refresh">刷新</button>
      <label style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-sm);color:var(--text-secondary)">
        <input type="checkbox" id="log-autoscroll" checked> 自动滚动
      </label>
    </div>
    <div class="log-viewer" id="log-content" style="height:calc(100vh - 280px)"><div class="stat-card loading-placeholder" style="height:16px;margin:8px 0"></div><div class="stat-card loading-placeholder" style="height:16px;margin:8px 0"></div><div class="stat-card loading-placeholder" style="height:16px;margin:8px 0"></div><div class="stat-card loading-placeholder" style="height:16px;margin:8px 0"></div></div>
  `;let l="gateway";return e.querySelectorAll(".tab").forEach(a=>{a.onclick=()=>{e.querySelectorAll(".tab").forEach(t=>t.classList.remove("active")),a.classList.add("active"),l=a.dataset.tab,e.querySelector("#log-search").value="",c(e,l)}}),e.querySelector("#log-search").addEventListener("input",a=>{clearTimeout(s),s=setTimeout(()=>{a.target.value.trim()?y(e,l,a.target.value.trim()):c(e,l)},300)}),e.querySelector("#btn-refresh").onclick=()=>c(e,l),c(e,l),e}function b(){clearTimeout(s),s=null}async function c(e,l){var r;const a=e.querySelector("#log-content"),t=e.querySelector("#btn-refresh");a.innerHTML='<div class="log-loading"><div class="service-spinner"></div><span style="color:var(--text-tertiary);margin-left:8px">加载日志中...</span></div>',t&&(t.classList.add("btn-loading"),t.disabled=!0);try{const i=await n.readLogTail(l,200);if(!i||!i.trim()){a.innerHTML='<div style="color:var(--text-tertiary)">暂无日志</div>';return}const g=i.trim().split(`
`);a.innerHTML=g.map(p=>`<div class="log-line">${d(p)}</div>`).join(""),(r=e.querySelector("#log-autoscroll"))!=null&&r.checked&&(a.scrollTop=a.scrollHeight)}catch(i){a.innerHTML='<div style="color:var(--error);padding:12px">加载日志失败: '+i+"</div>",o("加载日志失败: "+i,"error")}finally{t&&(t.classList.remove("btn-loading"),t.disabled=!1)}}async function y(e,l,a){const t=e.querySelector("#log-content");try{const r=await n.searchLog(l,a);if(!r||!r.length){t.innerHTML='<div style="color:var(--text-tertiary)">未找到匹配结果</div>';return}t.innerHTML=r.map(i=>`<div class="log-line">${u(d(i),a)}</div>`).join("")}catch(r){t.innerHTML='<div style="color:var(--error);padding:12px">搜索失败: '+r+"</div>",o("搜索失败: "+r,"error")}}function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function u(e,l){const a=l.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return e.replace(new RegExp(a,"gi"),t=>`<mark>${t}</mark>`)}export{b as cleanup,m as render};

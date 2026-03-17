import{b as C,a as w,t as f}from"./index-DJk5EKdb.js";import{showConfirm as L,showModal as O}from"./modal-DK6Az47R.js";import{Q as q,f as _,P as j,A as B,M as F}from"./model-presets-C_GYMLJU.js";async function ve(){const t=document.createElement("div");t.className="page",t.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">模型配置</h1>
      <p class="page-desc">添加 AI 模型服务商，配置可用模型</p>
    </div>
    <div class="config-actions">
      <button class="btn btn-primary btn-sm" id="btn-add-provider">+ 添加服务商</button>
      <button class="btn btn-secondary btn-sm" id="btn-undo" disabled>↩ 撤销</button>
    </div>
    <div class="form-hint" style="margin-bottom:var(--space-md)">
      服务商是模型的来源（如 OpenAI、DeepSeek 等）。每个服务商下可添加多个模型。
      标记为「主模型」的将优先使用，其余作为备选自动切换。配置修改后自动保存。
    </div>
    <div id="qtcool-promo" style="margin-bottom:var(--space-md);border-radius:var(--radius-lg);background:var(--bg-secondary);border:1px solid var(--border-primary);padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div style="flex:1;min-width:200px">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          ${C("zap",16)}
          <span style="font-weight:600;font-size:var(--font-size-sm)">晴辰云</span>
          <span style="font-size:10px;background:var(--primary);color:#fff;padding:1px 6px;border-radius:8px">推荐</span>
        </div>
        <div style="font-size:var(--font-size-xs);color:var(--text-secondary);line-height:1.5">
          在力所能及的范围内为用户提供不限量的模型支持，动态获取最新可用模型列表
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-shrink:0">
        <button class="btn btn-primary btn-sm" id="btn-qtcool-oneclick">${C("plus",14)} 获取模型列表</button>
        <a href="${q.site}" target="_blank" class="btn btn-secondary btn-sm">${C("external-link",12)} 了解更多</a>
      </div>
    </div>
    <div id="default-model-bar"></div>
    <div style="margin-bottom:var(--space-md)">
      <input class="form-input" id="model-search" placeholder="搜索模型（按 ID 或名称过滤）" style="max-width:360px">
    </div>
    <div id="providers-list">
      <div class="config-section"><div class="stat-card loading-placeholder" style="height:120px"></div></div>
      <div class="config-section"><div class="stat-card loading-placeholder" style="height:120px"></div></div>
    </div>
  `;const e={config:null,search:"",undoStack:[]};return Q(t,e),ne(t,e),t.querySelector("#model-search").oninput=i=>{e.search=i.target.value.trim().toLowerCase(),v(t,e)},t}async function Q(t,e){var o,n,s,r;const i=t.querySelector("#providers-list");try{e.config=await w.readOpenclawConfig();const a=JSON.stringify(((n=(o=e.config)==null?void 0:o.models)==null?void 0:n.providers)||{});P(e.config);const l=JSON.stringify(((r=(s=e.config)==null?void 0:s.models)==null?void 0:r.providers)||{});a!==l&&(console.log("[models] 自动修复了服务商 baseUrl，正在保存..."),await w.writeOpenclawConfig(e.config),f("已自动修复模型接口地址（如 Ollama /v1）","info")),h(t,e),v(t,e)}catch(a){i.innerHTML='<div style="color:var(--error);padding:20px">加载配置失败: '+a+"</div>",f("加载配置失败: "+a,"error")}}function A(t){var e,i,o;return((o=(i=(e=t==null?void 0:t.agents)==null?void 0:e.defaults)==null?void 0:i.model)==null?void 0:o.primary)||""}function D(t){var o;const e=[],i=((o=t==null?void 0:t.models)==null?void 0:o.providers)||{};for(const[n,s]of Object.entries(i))for(const r of s.models||[]){const a=typeof r=="string"?r:r.id;a&&e.push({provider:n,modelId:a,full:`${n}/${a}`})}return e}function J(t){var e;return((e=B.find(i=>i.value===t))==null?void 0:e.label)||t||"未知"}function h(t,e){const i=t.querySelector("#default-model-bar"),o=A(e.config),s=D(e.config).filter(r=>r.full!==o).map(r=>r.full);i.innerHTML=`
    <div class="config-section" style="margin-bottom:var(--space-lg)">
      <div class="config-section-title">当前生效配置</div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div>
          <span style="font-size:var(--font-size-sm);color:var(--text-tertiary)">主模型：</span>
          <span style="font-family:var(--font-mono);font-size:var(--font-size-sm);color:${o?"var(--success)":"var(--error)"}">${o||"未配置"}</span>
        </div>
        <div>
          <span style="font-size:var(--font-size-sm);color:var(--text-tertiary)">备选模型：</span>
          <span style="font-size:var(--font-size-sm);color:var(--text-secondary)">${s.length?s.join(", "):"无"}</span>
        </div>
      </div>
      <div class="form-hint" style="margin-top:6px">主模型不可用时，系统会自动切换到备选模型</div>
    </div>
  `}function H(t,e){if(!e||e==="default")return t;const i=[...t];switch(e){case"name-asc":i.sort((o,n)=>{const s=(o.name||o.id||"").toLowerCase(),r=(n.name||n.id||"").toLowerCase();return s.localeCompare(r)});break;case"name-desc":i.sort((o,n)=>{const s=(o.name||o.id||"").toLowerCase();return(n.name||n.id||"").toLowerCase().localeCompare(s)});break;case"latency-asc":i.sort((o,n)=>{var a,l;const s=(a=o.latency)!=null?a:1/0,r=(l=n.latency)!=null?l:1/0;return s-r});break;case"latency-desc":i.sort((o,n)=>{var a,l;const s=(a=o.latency)!=null?a:-1;return((l=n.latency)!=null?l:-1)-s});break;case"context-asc":i.sort((o,n)=>{var a,l;const s=(a=o.contextWindow)!=null?a:0,r=(l=n.contextWindow)!=null?l:0;return s-r});break;case"context-desc":i.sort((o,n)=>{var a,l;const s=(a=o.contextWindow)!=null?a:0;return((l=n.contextWindow)!=null?l:0)-s});break}return i}function v(t,e){var l,c;const i=t.querySelector("#providers-list"),o=((c=(l=e.config)==null?void 0:l.models)==null?void 0:c.providers)||{},n=Object.keys(o),s=A(e.config),r=e.search||"",a=e.sortBy||"default";if(!n.length){i.innerHTML=`
      <div style="color:var(--text-tertiary);padding:20px;text-align:center">
        暂无服务商，点击「+ 添加服务商」开始配置
      </div>`;return}i.innerHTML=n.map(d=>{const y=o[d],b=y.models||[],u=r?b.filter(k=>{const M=(typeof k=="string"?k:k.id).toLowerCase(),T=(k.name||"").toLowerCase();return M.includes(r)||T.includes(r)}):b,m=H(u,a),p=b.length-m.length;return`
      <div class="config-section" data-provider="${d}">
        <div class="config-section-title" style="display:flex;justify-content:space-between;align-items:center">
          <span>${d} <span style="font-size:var(--font-size-xs);color:var(--text-tertiary);font-weight:400">${J(y.api)} · ${b.length} 个模型</span></span>
          <div style="display:flex;gap:8px">
            <button class="btn btn-sm btn-secondary" data-action="edit-provider">编辑</button>
            <button class="btn btn-sm btn-secondary" data-action="add-model">+ 模型</button>
            <button class="btn btn-sm btn-secondary" data-action="fetch-models">获取列表</button>
            <button class="btn btn-sm btn-danger" data-action="delete-provider">删除</button>
          </div>
        </div>
        ${b.length>=2?`
        <div style="display:flex;gap:6px;margin-bottom:var(--space-sm);align-items:center">
          <button class="btn btn-sm btn-secondary" data-action="batch-test">批量测试</button>
          <button class="btn btn-sm btn-secondary" data-action="select-all">全选</button>
          <button class="btn btn-sm btn-danger" data-action="batch-delete">批量删除</button>
          <div style="margin-left:auto;display:flex;gap:6px;align-items:center">
            <span style="font-size:var(--font-size-xs);color:var(--text-tertiary)">排序:</span>
            <select class="form-input" data-action="sort-models" style="padding:4px 8px;font-size:var(--font-size-xs);width:auto">
              <option value="default">默认顺序 (拖拽调整)</option>
              <option value="name-asc">名称 A-Z (固化到底层)</option>
              <option value="name-desc">名称 Z-A (固化到底层)</option>
              <option value="latency-asc">延迟 低→高 (固化到底层)</option>
              <option value="latency-desc">延迟 高→低 (固化到底层)</option>
              <option value="context-asc">上下文 小→大 (固化到底层)</option>
              <option value="context-desc">上下文 大→小 (固化到底层)</option>
            </select>
            <button class="btn btn-sm btn-secondary" data-action="apply-sort" style="display:none">保存当前排序</button>
          </div>
        </div>`:""}
        <div class="provider-models">
          ${K(d,m,s)}
          ${p>0?`<div style="font-size:var(--font-size-xs);color:var(--text-tertiary);padding:4px 0">已隐藏 ${p} 个不匹配的模型</div>`:""}
        </div>
      </div>
    `}).join(""),ee(i,t,e)}function K(t,e,i,o){return e.length?e.map(n=>{const s=typeof n=="string"?n:n.id,r=n.name||s,a=`${t}/${s}`,l=a===i,c=l?"var(--success)":"var(--border-primary)",d=l?"var(--success-muted)":"var(--bg-tertiary)",y=[];r!==s&&y.push(r),n.contextWindow&&y.push(n.contextWindow/1e3+"K 上下文");let b="";if(n.testStatus==="fail")b=`<span style="font-size:var(--font-size-xs);padding:1px 6px;border-radius:var(--radius-sm);background:var(--error-muted, #fee2e2);color:var(--error)" title="${(n.testError||"").replace(/"/g,"&quot;")}">不可用</span>`;else if(n.latency!=null){const m=n.latency<3e3?"success":n.latency<8e3?"warning":"error";b=`<span style="font-size:var(--font-size-xs);padding:1px 6px;border-radius:var(--radius-sm);background:${m==="success"?"var(--success-muted)":m==="warning"?"var(--warning-muted, #fef3c7)":"var(--error-muted, #fee2e2)"};color:${m==="success"?"var(--success)":m==="warning"?"var(--warning, #d97706)":"var(--error)"}">${(n.latency/1e3).toFixed(1)}s</span>`}const u=n.lastTestAt?V(n.lastTestAt):"";return u&&y.push(u),`
      <div class="model-card" data-model-id="${s}" data-full="${a}"
           style="background:${d};border:1px solid ${c};padding:10px 14px;border-radius:var(--radius-md);margin-bottom:8px;display:flex;align-items:center;gap:10px">
        <span class="drag-handle" style="color:var(--text-tertiary);cursor:grab;user-select:none;font-size:16px;padding:4px;touch-action:none">⋮⋮</span>
        <input type="checkbox" class="model-checkbox" data-model-id="${s}" style="flex-shrink:0;cursor:pointer">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-family:var(--font-mono);font-size:var(--font-size-sm)">${s}</span>
            ${l?'<span style="font-size:var(--font-size-xs);background:var(--success);color:var(--text-inverse);padding:1px 6px;border-radius:var(--radius-sm)">主模型</span>':""}
            ${n.reasoning?'<span style="font-size:var(--font-size-xs);background:var(--accent-muted);color:var(--accent);padding:1px 6px;border-radius:var(--radius-sm)">推理</span>':""}
            ${b}
          </div>
          <div style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-top:2px">${y.join(" · ")||""}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button class="btn btn-sm btn-secondary" data-action="test-model">测试</button>
          ${l?"":'<button class="btn btn-sm btn-secondary" data-action="set-primary">设为主模型</button>'}
          <button class="btn btn-sm btn-secondary" data-action="edit-model">编辑</button>
          <button class="btn btn-sm btn-danger" data-action="delete-model">删除</button>
        </div>
      </div>
    `}).join(""):'<div style="color:var(--text-tertiary);font-size:var(--font-size-sm);padding:8px 0">暂无模型，点击「+ 模型」添加</div>'}function V(t){const e=Date.now()-t;return e<6e4?"刚刚测试":e<36e5?`${Math.floor(e/6e4)} 分钟前测试`:e<864e5?`${Math.floor(e/36e5)} 小时前测试`:`${Math.floor(e/864e5)} 天前测试`}function I(t,e){return(t.models||[]).findIndex(i=>(typeof i=="string"?i:i.id)===e)}function x(t){t.undoStack.push(JSON.parse(JSON.stringify(t.config))),t.undoStack.length>20&&t.undoStack.shift()}async function Z(t,e){e.undoStack.length&&(e.config=e.undoStack.pop(),v(t,e),h(t,e),$(t,e),await N(e),f("已撤销","info"))}let E=null,z=null;function ge(){clearTimeout(E),E=null,z&&(z.abort=!0,z=null)}function g(t){clearTimeout(E),E=setTimeout(()=>N(t),300)}function P(t){var i;const e=(i=t==null?void 0:t.models)==null?void 0:i.providers;if(e)for(const[,o]of Object.entries(e)){if(!o.baseUrl)continue;let n=o.baseUrl.replace(/\/+$/,"");for(const r of["/api/chat","/api/generate","/api/tags","/api","/chat/completions","/completions","/responses","/messages","/models"])if(n.endsWith(r)){n=n.slice(0,-r.length);break}n=n.replace(/\/+$/,"");const s=(o.api||"openai-completions").toLowerCase();s==="anthropic-messages"?n.endsWith("/v1")||(n+="/v1"):s!=="google-gemini"&&/:11434$/.test(n)&&!n.endsWith("/v1")&&(n+="/v1"),o.baseUrl=n}}async function X(t){try{A(t.config)&&G(t),P(t.config),await w.writeOpenclawConfig(t.config)}catch(e){f("保存失败: "+e,"error")}}async function N(t){try{A(t.config)&&G(t),P(t.config),await w.writeOpenclawConfig(t.config),f("配置已保存，正在重启 Gateway...","info");try{await w.restartGateway(),f("配置已生效，Gateway 已重启","success")}catch(i){const o=document.createElement("button");o.className="btn btn-sm btn-primary",o.textContent="重试",o.style.marginLeft="8px",o.onclick=async()=>{try{f("正在重启 Gateway...","info"),await w.restartGateway(),f("Gateway 重启成功","success")}catch(n){f("重启失败: "+n.message,"error")}},f("配置已保存，但 Gateway 重启失败: "+i.message,"warning",{action:o})}}catch(e){f("自动保存失败: "+e,"error")}}function $(t,e){const i=t.querySelector("#btn-undo");if(!i)return;const o=e.undoStack.length;i.disabled=!o,i.textContent=o?`↩ 撤销 (${o})`:"↩ 撤销"}function ee(t,e,i){t.querySelectorAll('select[data-action="sort-models"]').forEach(o=>{o.onchange=n=>{const s=n.target.value,r=o.closest("[data-provider]");if(!r)return;const a=r.dataset.provider,l=i.config.models.providers[a];s==="default"?(i.sortBy="default",v(e,i)):(x(i),l.models=H(l.models,s),i.sortBy="default",v(e,i),g(i),f("排序已保存","success"))}}),t.querySelectorAll(".provider-models").forEach(o=>{let n=null,s=null,r=0;o.addEventListener("pointerdown",a=>{const l=a.target.closest(".drag-handle");if(!l)return;const c=l.closest(".model-card");if(!c)return;a.preventDefault(),n=c,r=a.clientY,s=document.createElement("div"),s.style.cssText=`height:${c.offsetHeight}px;border:2px dashed var(--border);border-radius:var(--radius-md);margin-bottom:8px;background:var(--bg-secondary)`,c.after(s);const d=c.getBoundingClientRect();c.style.position="fixed",c.style.left=d.left+"px",c.style.top=d.top+"px",c.style.width=d.width+"px",c.style.zIndex="9999",c.style.opacity="0.85",c.style.boxShadow="0 8px 24px rgba(0,0,0,0.2)",c.style.pointerEvents="none",c.setPointerCapture(a.pointerId)}),o.addEventListener("pointermove",a=>{if(!n||!s)return;a.preventDefault();const l=a.clientY-r,c=parseFloat(n.style.top);n.style.top=c+l+"px",r=a.clientY;const d=[...o.querySelectorAll('.model-card:not([style*="position: fixed"])')].filter(y=>y!==n);for(const y of d){const b=y.getBoundingClientRect(),u=b.top+b.height/2;if(a.clientY<u){y.before(s);return}}d.length&&d[d.length-1].after(s)}),o.addEventListener("pointerup",a=>{if(!n||!s)return;n.style.position="",n.style.left="",n.style.top="",n.style.width="",n.style.zIndex="",n.style.opacity="",n.style.boxShadow="",n.style.pointerEvents="",s.before(n),s.remove();const l=o.closest("[data-provider]");if(l){const c=l.dataset.provider,d=i.config.models.providers[c];if(d){const y=[...o.querySelectorAll(".model-card")].map(u=>u.dataset.modelId);x(i);const b=[...d.models];d.models=y.map(u=>b.find(m=>(typeof m=="string"?m:m.id)===u)),g(i)}}n=null,s=null})}),t.querySelectorAll("button[data-action], input[data-action]").forEach(o=>{const n=o.dataset.action,s=o.closest("[data-provider]");if(!s)return;const r=s.dataset.provider,a=i.config.models.providers[r];if(!a)return;const l=o.closest(".model-card");o.type==="checkbox"?o.onchange=c=>{U(n,o,l,s,r,a,e,i)}:o.onclick=c=>{c.stopPropagation(),U(n,o,l,s,r,a,e,i)}})}async function U(t,e,i,o,n,s,r,a){switch(t){case"edit-provider":se(r,a,n);break;case"add-model":ie(r,a,n);break;case"fetch-models":pe(e,r,a,n);break;case"delete-provider":{if(!await L(`确定删除「${n}」及其所有模型？`))return;x(a),delete a.config.models.providers[n],v(r,a),h(r,a),$(r,a),g(a),f(`已删除 ${n}`,"info");break}case"select-all":ce(o);break;case"batch-delete":de(o,r,a,n);break;case"batch-test":fe(o,a,n);break;case"delete-model":{if(!i)return;const l=i.dataset.modelId;if(!await L(`确定删除模型「${l}」？`))return;x(a);const d=I(s,l);d>=0&&s.models.splice(d,1),v(r,a),h(r,a),$(r,a),g(a),f(`已删除 ${l}`,"info");break}case"edit-model":{if(!i)return;const l=I(s,i.dataset.modelId);l>=0&&le(r,a,n,l);break}case"set-primary":{if(!i)return;x(a),R(a,i.dataset.full),v(r,a),h(r,a),$(r,a),g(a),f("已设为主模型","success");break}case"test-model":{if(!i)return;const l=I(s,i.dataset.modelId);l>=0&&ue(e,a,n,l);break}}}function R(t,e){t.config.agents||(t.config.agents={}),t.config.agents.defaults||(t.config.agents.defaults={}),t.config.agents.defaults.model||(t.config.agents.defaults.model={}),t.config.agents.defaults.model.primary=e}function te(t){var n,s;const e=A(t.config),i=D(t.config);if(i.length===0){(s=(n=t.config.agents)==null?void 0:n.defaults)!=null&&s.model&&(t.config.agents.defaults.model.primary="");return}if(!i.some(r=>r.full===e)){const r=i[0].full;R(t,r),f(`主模型已自动切换为 ${r}`,"info")}}function G(t){var a;te(t);const e=A(t.config),o=D(t.config).filter(l=>l.full!==e).map(l=>l.full),n=t.config.agents.defaults;n.model.primary=e,n.model.fallbacks=o;const s={};s[e]={};for(const l of o)s[l]={};n.models=s;const r=(a=t.config.agents)==null?void 0:a.list;if(Array.isArray(r))for(const l of r)l.model&&typeof l.model=="object"&&l.model.primary&&(l.model.primary=e)}function ne(t,e){t.querySelector("#btn-add-provider").onclick=()=>oe(t,e),t.querySelector("#btn-undo").onclick=()=>Z(t,e),t.querySelector("#btn-qtcool-oneclick").onclick=async()=>{var a;if(!e.config){f("配置未加载完成，请稍候","warning");return}const i=t.querySelector("#btn-qtcool-oneclick");i.textContent="获取中...",i.disabled=!0;const o=await _();if(i.innerHTML=`${C("plus",14)} 获取模型列表`,i.disabled=!1,!o.length){f("无法获取模型列表，请检查网络或稍后重试","error");return}const n=(((a=e.config.models)==null?void 0:a.providers)||{})[q.providerKey],s=new Set(((n==null?void 0:n.models)||[]).map(l=>typeof l=="string"?l:l.id)),r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
      <div class="modal" style="max-height:80vh;overflow-y:auto">
        <div class="modal-title">选择要添加的模型</div>
        <div class="form-hint" style="margin-bottom:12px">从晴辰云获取到 ${o.length} 个可用模型，勾选需要的模型后点击添加。</div>
        <div style="margin-bottom:12px;display:flex;gap:8px">
          <button class="btn btn-sm btn-secondary" id="qtsel-all">全选</button>
          <button class="btn btn-sm btn-secondary" id="qtsel-none">全不选</button>
        </div>
        <div id="qtmodel-list" style="display:flex;flex-direction:column;gap:6px;max-height:40vh;overflow-y:auto;padding-right:4px">
          ${o.map(l=>{const c=s.has(l.id);return`<label style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:var(--radius-md);cursor:pointer;background:var(--bg-tertiary);opacity:${c?"0.5":"1"}">
              <input type="checkbox" value="${l.id}" ${c?'disabled title="已添加"':"checked"} style="accent-color:var(--primary)">
              <span style="font-size:var(--font-size-sm);flex:1">${l.id}</span>
              ${c?'<span style="font-size:10px;color:var(--text-tertiary)">已有</span>':""}
            </label>`}).join("")}
        </div>
        <div class="modal-actions" style="margin-top:16px">
          <button class="btn btn-primary" id="qtsel-confirm">${C("plus",14)} 添加选中模型</button>
          <button class="btn btn-secondary" id="qtsel-cancel">取消</button>
        </div>
      </div>
    `,document.body.appendChild(r),r.querySelector("#qtsel-cancel").onclick=()=>r.remove(),r.querySelector("#qtsel-all").onclick=()=>{r.querySelectorAll("#qtmodel-list input:not(:disabled)").forEach(l=>l.checked=!0)},r.querySelector("#qtsel-none").onclick=()=>{r.querySelectorAll("#qtmodel-list input:not(:disabled)").forEach(l=>l.checked=!1)},r.querySelector("#qtsel-confirm").onclick=()=>{const l=[...r.querySelectorAll("#qtmodel-list input:checked:not(:disabled)")].map(d=>d.value);if(r.remove(),!l.length){f("未选择任何模型","info");return}x(e),e.config.models||(e.config.models={}),e.config.models.providers||(e.config.models.providers={});const c=o.filter(d=>l.includes(d.id));if(n){let d=0;for(const y of c)s.has(y.id)||(n.models.push({...y}),d++);f(d?`已添加 ${d} 个模型`:"所选模型均已存在",d?"success":"info")}else e.config.models.providers[q.providerKey]={baseUrl:q.baseUrl,apiKey:q.defaultKey,api:q.api,models:c.map(d=>({...d}))},!A(e.config)&&c.length&&(e.config.agents||(e.config.agents={}),e.config.agents.defaults||(e.config.agents.defaults={}),e.config.agents.defaults.model||(e.config.agents.defaults.model={}),e.config.agents.defaults.model.primary=q.providerKey+"/"+c[0].id),f(`已添加晴辰云（${c.length} 个模型）`,"success");v(t,e),h(t,e),$(t,e),g(e)}}}function oe(t,e){var n;const i=j.filter(s=>!s.hidden).map(s=>`<button class="btn btn-sm btn-secondary preset-btn" data-preset="${s.key}" style="margin:0 6px 6px 0">${s.label}${s.badge?' <span style="font-size:9px;background:var(--accent);color:#fff;padding:1px 5px;border-radius:8px;margin-left:4px">'+s.badge+"</span>":""}</button>`).join(""),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
    <div class="modal" style="max-height:85vh;overflow-y:auto">
      <div class="modal-title">添加服务商</div>
      <div class="form-group">
        <label class="form-label">快捷选择</label>
        <div style="display:flex;flex-wrap:wrap">${i}</div>
        <div class="form-hint">选择常用服务商自动填充，或手动填写下方信息</div>
        <div id="preset-detail" style="display:none;margin-top:8px;padding:10px 14px;background:var(--bg-tertiary);border-radius:var(--radius-md);font-size:var(--font-size-sm)"></div>
      </div>
      <div class="form-group">
        <label class="form-label">服务商名称</label>
        <input class="form-input" data-name="key" placeholder="如 openai, newapi">
        <div class="form-hint">自定义标识名，用于区分不同来源</div>
      </div>
      <div class="form-group">
        <label class="form-label">接口地址</label>
        <input class="form-input" data-name="baseUrl" placeholder="https://api.openai.com/v1">
        <div class="form-hint">模型服务的 API 地址，通常以 /v1 结尾；Ollama 可直接填 http://127.0.0.1:11434</div>
      </div>
      <div class="form-group">
        <label class="form-label">密钥 (API Key)</label>
        <input class="form-input" data-name="apiKey" placeholder="sk-...">
        <div class="form-hint">访问服务所需的密钥，留空表示无需认证</div>
      </div>
      <div class="form-group">
        <label class="form-label">接口类型</label>
        <select class="form-input" data-name="api">
          ${B.map(s=>`<option value="${s.value}">${s.label}</option>`).join("")}
        </select>
        <div class="form-hint">大多数中转站和 Ollama 选「OpenAI 兼容」即可</div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-secondary btn-sm" data-action="cancel">取消</button>
        <button class="btn btn-primary btn-sm" data-action="confirm">确定</button>
      </div>
    </div>
  `,document.body.appendChild(o),o.querySelectorAll(".preset-btn").forEach(s=>{s.onclick=()=>{const r=j.find(l=>l.key===s.dataset.preset);if(!r)return;o.querySelector('[data-name="key"]').value=r.key,o.querySelector('[data-name="baseUrl"]').value=r.baseUrl,o.querySelector('[data-name="api"]').value=r.api,o.querySelectorAll(".preset-btn").forEach(l=>l.style.opacity="0.5"),s.style.opacity="1";const a=o.querySelector("#preset-detail");if(a)if(r.desc||r.site){let l=r.desc?`<div style="color:var(--text-secondary);line-height:1.6">${r.desc}</div>`:"";r.site&&(l+=`<a href="${r.site}" target="_blank" style="color:var(--accent);text-decoration:none;font-size:12px;margin-top:4px;display:inline-block">→ 访问 ${r.label}官网</a>`),a.innerHTML=l,a.style.display="block"}else a.style.display="none"}}),o.addEventListener("click",s=>{s.target===o&&o.remove()}),o.querySelector('[data-action="cancel"]').onclick=()=>o.remove(),o.querySelector('[data-action="confirm"]').onclick=()=>{const s=o.querySelector('[data-name="key"]').value.trim(),r=o.querySelector('[data-name="baseUrl"]').value.trim(),a=o.querySelector('[data-name="apiKey"]').value.trim(),l=o.querySelector('[data-name="api"]').value;if(!s){f("请填写服务商名称","warning");return}x(e),e.config.models||(e.config.models={mode:"replace",providers:{}}),e.config.models.providers||(e.config.models.providers={}),e.config.models.providers[s]={baseUrl:r||"",apiKey:a||"",api:l,models:[]},o.remove(),v(t,e),$(t,e),g(e),f(`已添加服务商: ${s}`,"success")},(n=o.querySelector('[data-name="key"]'))==null||n.focus()}function se(t,e,i){const o=e.config.models.providers[i];O({title:`编辑服务商: ${i}`,fields:[{name:"baseUrl",label:"接口地址",value:o.baseUrl||"",hint:"模型服务的 API 地址，通常以 /v1 结尾；Ollama 可直接填 http://127.0.0.1:11434"},{name:"apiKey",label:"密钥 (API Key)",value:o.apiKey||"",hint:"修改后自动保存生效"},{name:"api",label:"接口类型",type:"select",value:o.api||"openai-completions",options:B,hint:"大多数中转站和 Ollama 选「OpenAI 兼容」即可"}],onConfirm:({baseUrl:n,apiKey:s,api:r})=>{x(e),o.baseUrl=n,o.apiKey=s,o.api=r,v(t,e),$(t,e),g(e),f("服务商已更新","success")}})}function ie(t,e,i){const o=F[i]||[],n=(e.config.models.providers[i].models||[]).map(a=>typeof a=="string"?a:a.id),s=o.filter(a=>!n.includes(a.id)),r=[{name:"id",label:"模型 ID",placeholder:"如 gpt-4o",hint:"必须与服务商支持的模型名一致"},{name:"name",label:"显示名称（选填）",placeholder:"如 GPT-4o",hint:"方便识别的友好名称"},{name:"contextWindow",label:"上下文长度（选填）",placeholder:"如 128000",hint:"模型支持的最大 Token 数"},{name:"reasoning",label:"这是推理模型（如 o3、R1、QwQ 等）",type:"checkbox",value:!1,hint:"推理模型会使用特殊的调用方式"}];if(s.length){const a=document.createElement("div");a.className="modal-overlay";const l=s.map(c=>`<button class="btn btn-sm btn-secondary preset-btn" data-mid="${c.id}" style="margin:0 6px 6px 0">${c.name}${c.reasoning?" (推理)":""}</button>`).join("");a.innerHTML=`
      <div class="modal">
        <div class="modal-title">添加模型到 ${i}</div>
        <div class="form-group">
          <label class="form-label">快捷添加</label>
          <div style="display:flex;flex-wrap:wrap">${l}</div>
          <div class="form-hint">点击直接添加常用模型，或手动填写下方信息</div>
        </div>
        <hr style="border:none;border-top:1px solid var(--border-primary);margin:var(--space-sm) 0">
        <div class="form-group">
          <label class="form-label">手动添加</label>
        </div>
        ${ae(r)}
        <div class="modal-actions">
          <button class="btn btn-secondary btn-sm" data-action="cancel">取消</button>
          <button class="btn btn-primary btn-sm" data-action="confirm">确定</button>
        </div>
      </div>
    `,document.body.appendChild(a),re(a,r,c=>{x(e),W(e,i,c),v(t,e),h(t,e),$(t,e),g(e)}),a.querySelectorAll(".preset-btn").forEach(c=>{c.onclick=()=>{const d=s.find(b=>b.id===c.dataset.mid);if(!d)return;x(e);const y={...d,input:["text","image"]};e.config.models.providers[i].models.push(y),a.remove(),v(t,e),h(t,e),$(t,e),g(e),f(`已添加模型: ${d.name}`,"success")}})}else O({title:`添加模型到 ${i}`,fields:r,onConfirm:a=>{x(e),W(e,i,a),v(t,e),h(t,e),$(t,e),g(e)}})}function ae(t){return t.map(e=>e.type==="checkbox"?`
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" data-name="${e.name}" ${e.value?"checked":""}>
            <span class="form-label" style="margin:0">${e.label}</span>
          </label>
          ${e.hint?`<div class="form-hint">${e.hint}</div>`:""}
        </div>`:`
      <div class="form-group">
        <label class="form-label">${e.label}</label>
        <input class="form-input" data-name="${e.name}" value="${e.value||""}" placeholder="${e.placeholder||""}">
        ${e.hint?`<div class="form-hint">${e.hint}</div>`:""}
      </div>`).join("")}function re(t,e,i){t.addEventListener("click",o=>{o.target===t&&t.remove()}),t.querySelector('[data-action="cancel"]').onclick=()=>t.remove(),t.querySelector('[data-action="confirm"]').onclick=()=>{const o={};t.querySelectorAll("[data-name]").forEach(n=>{o[n.dataset.name]=n.type==="checkbox"?n.checked:n.value}),t.remove(),i(o)}}function W(t,e,i){var n;if(!i.id){f("请填写模型 ID","warning");return}const o={id:i.id.trim(),name:((n=i.name)==null?void 0:n.trim())||i.id.trim(),reasoning:!!i.reasoning,input:["text","image"]};i.contextWindow&&(o.contextWindow=parseInt(i.contextWindow)||0),t.config.models.providers[e].models.push(o),f(`已添加模型: ${o.name}`,"success")}function le(t,e,i,o){const n=e.config.models.providers[i].models[o];O({title:`编辑模型: ${n.id}`,fields:[{name:"id",label:"模型 ID",value:n.id||"",hint:"必须与服务商支持的模型名一致"},{name:"name",label:"显示名称",value:n.name||"",hint:"方便识别的友好名称"},{name:"contextWindow",label:"上下文长度",value:String(n.contextWindow||""),hint:"模型支持的最大 Token 数"},{name:"reasoning",label:"这是推理模型",type:"checkbox",value:!!n.reasoning,hint:"推理模型会使用特殊的调用方式"}],onConfirm:s=>{var r;s.id&&(x(e),n.id=s.id.trim(),n.name=((r=s.name)==null?void 0:r.trim())||s.id.trim(),n.reasoning=!!s.reasoning,s.contextWindow&&(n.contextWindow=parseInt(s.contextWindow)||0),v(t,e),h(t,e),$(t,e),g(e),f("模型已更新","success"))}})}function ce(t){const e=t.querySelectorAll(".model-checkbox"),i=[...e].every(n=>n.checked);e.forEach(n=>{n.checked=!i});const o=t.querySelector('[data-action="batch-delete"]');o&&(o.disabled=i)}async function de(t,e,i,o){const n=[...t.querySelectorAll(".model-checkbox:checked")];if(!n.length){f("请先勾选要删除的模型","warning");return}const s=n.map(l=>l.dataset.modelId);if(!await L(`确定删除选中的 ${s.length} 个模型？
${s.join(", ")}`))return;x(i);const a=i.config.models.providers[o];a.models=(a.models||[]).filter(l=>{const c=typeof l=="string"?l:l.id;return!s.includes(c)}),v(e,i),h(e,i),$(e,i),g(i),f(`已删除 ${s.length} 个模型`,"info")}async function fe(t,e,i){if(z){z.abort=!0,f("正在终止批量测试...","warning");return}const o=e.config.models.providers[i],n=[...t.querySelectorAll(".model-checkbox:checked")],s=n.length?n.map(m=>m.dataset.modelId):(o.models||[]).map(m=>typeof m=="string"?m:m.id);if(!s.length){f("没有可测试的模型","warning");return}const r=t.querySelector('[data-action="batch-test"]'),a={abort:!1};z=a,r&&(r.textContent="终止测试",r.classList.remove("btn-secondary"),r.classList.add("btn-danger"));const l=t.closest(".page");let c=0,d=0;for(const m of s){if(a.abort)break;const p=(o.models||[]).find(S=>(typeof S=="string"?S:S.id)===m),k=t.querySelector(`.model-card[data-model-id="${m}"]`);k&&(k.style.outline="2px solid var(--accent)");const M=Date.now();try{await w.testModel(o.baseUrl,o.apiKey||"",m,o.api||"openai-completions");const S=Date.now()-M;p&&typeof p=="object"&&(p.latency=S,p.lastTestAt=Date.now(),p.testStatus="ok",delete p.testError),c++}catch(S){p&&typeof p=="object"&&(p.latency=null,p.lastTestAt=Date.now(),p.testStatus="fail",p.testError=String(S).slice(0,100)),d++}l&&(v(l,e),h(l,e));const T=(p==null?void 0:p.testStatus)==="ok"?"✓":"✗",Y=(p==null?void 0:p.latency)!=null?` ${(p.latency/1e3).toFixed(1)}s`:"";f(`${T} ${m}${Y} (${c+d}/${s.length})`,(p==null?void 0:p.testStatus)==="ok"?"success":"error")}z=null;const y=l==null?void 0:l.querySelector(`[data-provider="${i}"]`),b=y==null?void 0:y.querySelector('[data-action="batch-test"]');b&&(b.textContent="批量测试",b.classList.remove("btn-danger"),b.classList.add("btn-secondary"));const u=a.abort;g(e),u?f(`批量测试已终止：${c} 成功，${d} 失败，${s.length-c-d} 跳过`,"warning"):f(`批量测试完成：${c} 成功，${d} 失败`,c===s.length?"success":"warning")}async function pe(t,e,i,o){const n=i.config.models.providers[o];t.disabled=!0,t.textContent="获取中...";try{let y=function(u){const m=u?s.filter(p=>p.toLowerCase().includes(u.toLowerCase())):s;l.innerHTML=m.map(p=>{const k=r.includes(p);return`
          <label style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:var(--radius-sm);cursor:pointer;${k?"opacity:0.5":""}">
            <input type="checkbox" class="remote-cb" data-id="${p}" ${k?"disabled":""}>
            <span style="font-family:var(--font-mono);font-size:var(--font-size-sm)">${p}</span>
            ${k?'<span style="font-size:var(--font-size-xs);color:var(--text-tertiary)">(已添加)</span>':""}
          </label>`}).join(""),b()},b=function(){const u=l.querySelectorAll(".remote-cb:checked").length;d.textContent=`已选 ${u} 个`};const s=await w.listRemoteModels(n.baseUrl,n.apiKey||"",n.api||"openai-completions");t.disabled=!1,t.textContent="获取列表";const r=(n.models||[]).map(u=>typeof u=="string"?u:u.id),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" style="max-height:80vh;display:flex;flex-direction:column">
        <div class="modal-title">远程模型列表 — ${o} (${s.length} 个)</div>
        <div style="margin-bottom:var(--space-sm);display:flex;gap:8px;align-items:center">
          <input class="form-input" id="remote-filter" placeholder="搜索模型..." style="flex:1">
          <button class="btn btn-sm btn-secondary" id="remote-toggle-all">全选</button>
        </div>
        <div id="remote-model-list" style="flex:1;overflow-y:auto;max-height:50vh"></div>
        <div class="modal-actions" style="margin-top:var(--space-sm)">
          <span id="remote-selected-count" style="font-size:var(--font-size-xs);color:var(--text-tertiary);flex:1">已选 0 个</span>
          <button class="btn btn-secondary btn-sm" data-action="cancel">取消</button>
          <button class="btn btn-primary btn-sm" data-action="confirm">添加选中</button>
        </div>
      </div>
    `,document.body.appendChild(a);const l=a.querySelector("#remote-model-list"),c=a.querySelector("#remote-filter"),d=a.querySelector("#remote-selected-count");y(""),c.oninput=()=>y(c.value.trim()),l.addEventListener("change",b),a.querySelector("#remote-toggle-all").onclick=()=>{const u=l.querySelectorAll(".remote-cb:not(:disabled)"),m=[...u].every(p=>p.checked);u.forEach(p=>{p.checked=!m}),b()},a.addEventListener("click",u=>{u.target===a&&a.remove()}),a.querySelector('[data-action="cancel"]').onclick=()=>a.remove(),a.querySelector('[data-action="confirm"]').onclick=()=>{const u=[...l.querySelectorAll(".remote-cb:checked")].map(m=>m.dataset.id);if(!u.length){f("请至少选择一个模型","warning");return}x(i);for(const m of u)n.models.push({id:m,input:["text","image"]});a.remove(),v(e,i),h(e,i),$(e,i),g(i),f(`已添加 ${u.length} 个模型`,"success")},c.focus()}catch(s){t.disabled=!1,t.textContent="获取列表",f(`获取模型列表失败: ${s}`,"error")}}async function ue(t,e,i,o){const n=e.config.models.providers[i],s=n.models[o],r=typeof s=="string"?s:s.id;t.disabled=!0;const a=t.textContent;t.textContent="测试中...";const l=Date.now();try{const c=await w.testModel(n.baseUrl,n.apiKey||"",r,n.api||"openai-completions"),d=Date.now()-l;typeof s=="object"&&(s.latency=d,s.lastTestAt=Date.now(),s.testStatus="ok",delete s.testError),f(`${r} 连通正常 (${(d/1e3).toFixed(1)}s): "${c.slice(0,50)}"`,"success")}catch(c){const d=Date.now()-l;typeof s=="object"&&(s.latency=null,s.lastTestAt=Date.now(),s.testStatus="fail",s.testError=String(c).slice(0,100)),f(`${r} 不可用 (${(d/1e3).toFixed(1)}s): ${c}`,"error")}finally{t.disabled=!1,t.textContent=a;const c=t.closest(".page");c&&(v(c,e),h(c,e)),X(e)}}export{ge as cleanup,ve as render};

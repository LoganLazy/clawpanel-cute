const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CRKb_1Il.js","assets/core-DhEqZVGG.js"])))=>i.map(i=>d[i]);
import{a as m,t as d,_ as w,i as A}from"./index-BeJpi4vN.js";import{showModal as b,showConfirm as $}from"./modal-DK6Az47R.js";async function O(){const n=document.createElement("div");n.className="page",n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Agent 管理</h1>
        <p class="page-desc">创建和管理 OpenClaw Agent，配置身份、模型和工作区</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" id="btn-add-agent">+ 新建 Agent</button>
      </div>
    </div>
    <div class="page-content">
      <div id="agents-list"></div>
    </div>
  `;const t={agents:[]};return y(n,t),n.querySelector("#btn-add-agent").addEventListener("click",()=>j(n,t)),n}function k(n){const t=()=>`
    <div class="agent-card" style="pointer-events:none">
      <div class="agent-card-header">
        <div class="skeleton" style="width:40px;height:40px;border-radius:50%"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6px">
          <div class="skeleton" style="width:45%;height:16px;border-radius:4px"></div>
          <div class="skeleton" style="width:60%;height:12px;border-radius:4px"></div>
        </div>
      </div>
    </div>`;n.innerHTML=[t(),t(),t()].join("")}async function y(n,t){const a=n.querySelector("#agents-list");k(a);try{t.agents=await m.listAgents(),h(n,t),t.eventsAttached||(x(n,t),t.eventsAttached=!0)}catch(e){a.innerHTML='<div style="color:var(--error);padding:20px">加载失败: '+e+"</div>",d("加载 Agent 列表失败: "+e,"error")}}function h(n,t){const a=n.querySelector("#agents-list");if(!t.agents.length){a.innerHTML='<div style="color:var(--text-tertiary);padding:20px;text-align:center">暂无 Agent</div>';return}a.innerHTML=t.agents.map(e=>{var o,r;const l=e.isDefault||e.id==="main",i=e.identityName?e.identityName.split(",")[0].trim():"无描述";return`
      <div class="agent-card" data-id="${e.id}">
        <div class="agent-card-header">
          <div class="agent-card-title">
            <span class="agent-id">${e.id}</span>
            ${l?'<span class="badge badge-success">默认</span>':""}
          </div>
          <div class="agent-card-actions">
            <button class="btn btn-sm btn-secondary" data-action="backup" data-id="${e.id}">备份</button>
            <button class="btn btn-sm btn-secondary" data-action="edit" data-id="${e.id}">编辑</button>
            ${l?"":`<button class="btn btn-sm btn-danger" data-action="delete" data-id="${e.id}">删除</button>`}
          </div>
        </div>
        <div class="agent-card-body">
          <div class="agent-info-row">
            <span class="agent-info-label">名称:</span>
            <span class="agent-info-value">${i}</span>
          </div>
          <div class="agent-info-row">
            <span class="agent-info-label">模型:</span>
            <span class="agent-info-value">${typeof e.model=="object"?((o=e.model)==null?void 0:o.primary)||((r=e.model)==null?void 0:r.id)||JSON.stringify(e.model):e.model||"未设置"}</span>
          </div>
          <div class="agent-info-row">
            <span class="agent-info-label">工作区:</span>
            <span class="agent-info-value" style="font-family:var(--font-mono);font-size:var(--font-size-xs)">${e.workspace||"未设置"}</span>
          </div>
        </div>
      </div>
    `}).join("")}function x(n,t){n.querySelector("#agents-list").addEventListener("click",async e=>{const l=e.target.closest("[data-action]");if(!l)return;const i=l.dataset.action,o=l.dataset.id;i==="edit"?E(n,t,o):i==="delete"?await _(n,t,o):i==="backup"&&await D(o)})}async function j(n,t){var e,l;let a=[];try{const i=await m.readOpenclawConfig(),o=((e=i==null?void 0:i.models)==null?void 0:e.providers)||{};for(const[r,v]of Object.entries(o))for(const s of v.models||[]){const c=typeof s=="string"?s:s.id;c&&a.push({value:`${r}/${c}`,label:`${r}/${c}`})}}catch{a=[{value:"newapi/claude-opus-4-6",label:"newapi/claude-opus-4-6"}]}if(!a.length){d("请先在模型配置页面添加模型","warning");return}b({title:"新建 Agent",fields:[{name:"id",label:"Agent ID",value:"",placeholder:"例如：translator（小写字母、数字、下划线、连字符）"},{name:"name",label:"名称",value:"",placeholder:"例如：翻译助手"},{name:"emoji",label:"Emoji",value:"",placeholder:"例如：🌐（可选）"},{name:"model",label:"模型",type:"select",value:((l=a[0])==null?void 0:l.value)||"",options:a},{name:"workspace",label:"工作区路径",value:"",placeholder:"留空则自动创建（可选，绝对路径）"}],onConfirm:async i=>{var g;const o=(i.id||"").trim();if(!o){d("请输入 Agent ID","warning");return}if(!/^[a-z0-9_-]+$/.test(o)){d("Agent ID 只能包含小写字母、数字、下划线和连字符","warning");return}const r=(i.name||"").trim(),v=(i.emoji||"").trim(),s=i.model||((g=a[0])==null?void 0:g.value)||"",c=(i.workspace||"").trim();try{await m.addAgent(o,s,c||null),(r||v)&&await m.updateAgentIdentity(o,r||null,v||null),d("Agent 已创建","success"),A("list_agents"),await y(n,t)}catch(p){d("创建失败: "+p,"error")}}})}async function E(n,t,a){var r,v;const e=t.agents.find(s=>s.id===a);if(!e)return;const l=e.identityName?e.identityName.split(",")[0].trim():"";let i=[];try{const s=await m.readOpenclawConfig(),c=((r=s==null?void 0:s.models)==null?void 0:r.providers)||{};for(const[g,p]of Object.entries(c))for(const u of p.models||[]){const f=typeof u=="string"?u:u.id;f&&i.push({value:`${g}/${f}`,label:`${g}/${f}`})}console.log("[Agent编辑] 获取到模型列表:",i.length,"个")}catch(s){console.error("[Agent编辑] 获取模型列表失败:",s)}const o=[{name:"name",label:"名称",value:l,placeholder:"例如：翻译助手"},{name:"emoji",label:"Emoji",value:e.identityEmoji||"",placeholder:"例如：🌐"}];if(i.length){const s={name:"model",label:"模型",type:"select",value:e.model||((v=i[0])==null?void 0:v.value)||"",options:i};o.push(s),console.log("[Agent编辑] 当前模型:",e.model),console.log("[Agent编辑] 模型选项:",i)}else console.warn("[Agent编辑] 模型列表为空，不显示模型选择器");o.push({name:"workspace",label:"工作区",value:e.workspace||"未设置",placeholder:"创建时指定，不可修改",readonly:!0}),b({title:`编辑 Agent — ${a}`,fields:o,onConfirm:async s=>{console.log("[Agent编辑] 保存数据:",s);const c=(s.name||"").trim(),g=(s.emoji||"").trim(),p=(s.model||"").trim();try{(c||g)&&(console.log("[Agent编辑] 更新身份信息..."),await m.updateAgentIdentity(a,c||null,g||null)),p&&p!==e.model&&(console.log("[Agent编辑] 更新模型:",e.model,"->",p),await m.updateAgentModel(a,p)),c&&(e.identityName=c),g&&(e.identityEmoji=g),p&&(e.model=p),h(n,t),d("已更新","success")}catch(u){console.error("[Agent编辑] 保存失败:",u),d("更新失败: "+u,"error")}}})}async function _(n,t,a){if(await $(`确定删除 Agent「${a}」？

此操作将删除该 Agent 的所有数据和会话。`))try{await m.deleteAgent(a),d("已删除","success"),await y(n,t)}catch(l){d("删除失败: "+l,"error")}}async function D(n){d(`正在备份 Agent「${n}」...`,"info");try{const t=await m.backupAgent(n);try{const{open:a}=await w(async()=>{const{open:l}=await import("./index-CRKb_1Il.js");return{open:l}},__vite__mapDeps([0,1])),e=t.substring(0,t.lastIndexOf("/"))||t;await a(e)}catch{}d(`备份完成: ${t.split("/").pop()}`,"success")}catch(t){d("备份失败: "+t,"error")}}export{O as render};

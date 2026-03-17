const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BeJpi4vN.js","assets/index-DYkTg3sv.css"])))=>i.map(i=>d[i]);
import{s as k,_ as S,t as v}from"./index-BeJpi4vN.js";const w=!!window.__TAURI_INTERNALS__;let f=null;async function $(){return f||(f=(await S(async()=>{const{api:e}=await import("./index-BeJpi4vN.js").then(t=>t.m);return{api:e}},__vite__mapDeps([0,1]))).api),f}async function y(e,t={}){if(w){const o=await $(),r=await o.readPanelConfig();if(e==="auth_status"){const i=r.accessPassword==="claw520",c={hasPassword:!!r.accessPassword,mustChangePassword:i,ignoreRisk:!!r.ignoreRisk};return i&&(c.defaultPassword="claw520"),c}if(e==="auth_change_password"){if(r.accessPassword&&t.oldPassword!==r.accessPassword)throw new Error("当前密码错误");const i=C(t.newPassword);if(i)throw new Error(i);if(t.newPassword===r.accessPassword)throw new Error("新密码不能与旧密码相同");return r.accessPassword=t.newPassword,delete r.mustChangePassword,delete r.ignoreRisk,await o.writePanelConfig(r),sessionStorage.setItem("clawpanel_authed","1"),{success:!0}}if(e==="auth_ignore_risk")return t.enable?(delete r.accessPassword,delete r.mustChangePassword,r.ignoreRisk=!0,sessionStorage.removeItem("clawpanel_authed")):delete r.ignoreRisk,await o.writePanelConfig(r),{success:!0};throw new Error("未知命令: "+e)}const s=await fetch(`/__api/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await s.json();if(!s.ok)throw new Error(n.error||`HTTP ${s.status}`);return n}function C(e){return!e||e.length<6?"密码至少 6 位":e.length>64?"密码不能超过 64 位":/^\d+$/.test(e)?"密码不能是纯数字":["claw520","123456","654321","password","admin","qwerty","abc123","111111","000000","letmein","welcome","clawpanel","openclaw"].includes(e.toLowerCase())?"密码太常见，请换一个更安全的密码":null}function E(e){if(!e)return{level:0,text:"",color:""};if(e.length<6)return{level:1,text:"太短",color:"var(--error)"};if(/^\d+$/.test(e))return{level:1,text:"纯数字太弱",color:"var(--error)"};let t=0;return e.length>=8&&t++,e.length>=12&&t++,/[a-z]/.test(e)&&/[A-Z]/.test(e)&&t++,/\d/.test(e)&&t++,/[^a-zA-Z0-9]/.test(e)&&t++,t<=1?{level:2,text:"一般",color:"var(--warning)"}:t<=3?{level:3,text:"良好",color:"var(--primary)"}:{level:4,text:"强",color:"var(--success)"}}async function I(){const e=document.createElement("div");return e.className="page",e.innerHTML=`
    <div class="page-header"><h1>安全设置</h1></div>
    <div id="security-content">
      <div class="config-section loading-placeholder" style="height:120px"></div>
    </div>
  `,m(e),e}async function m(e){const t=e.querySelector("#security-content");try{const s=await y("auth_status");L(t,s)}catch(s){t.innerHTML=`<div class="config-section"><p style="color:var(--error)">加载失败: ${s.message}</p></div>`}}function L(e,t){let s="";const n=t.hasPassword?k("ok",20):k("warn",20),o=t.hasPassword?t.mustChangePassword?"使用默认密码（需修改）":"已设置自定义密码":t.ignoreRisk?"无视风险模式（无密码）":"未设置密码",r=t.hasPassword&&!t.mustChangePassword?"var(--success)":"var(--warning)";s+=`
    <div class="config-section">
      <div class="config-section-title">访问密码状态</div>
      <div style="display:flex;align-items:center;gap:8px;padding:12px 16px;background:var(--bg-tertiary);border-radius:var(--radius-sm);border-left:3px solid ${r}">
        <span style="font-size:20px">${n}</span>
        <div>
          <div style="font-weight:600;color:var(--text-primary)">${o}</div>
          <div style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-top:2px">
            ${t.hasPassword?w?"每次打开应用需输入密码":"远程访问需输入密码才能进入面板":w?"任何人打开应用即可使用":"任何人都可以直接访问面板"}
          </div>
        </div>
      </div>
    </div>
  `,s+=`
    <div class="config-section">
      <div class="config-section-title">${t.hasPassword?"修改密码":"设置密码"}</div>
      <form id="form-change-pw" style="max-width:400px">
        ${t.hasPassword?`
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:var(--font-size-xs);color:var(--text-tertiary);margin-bottom:4px">当前密码</label>
            <input type="password" id="sec-old-pw" class="form-input" placeholder="输入当前密码" autocomplete="current-password" style="width:100%"
              ${t.defaultPassword?`value="${t.defaultPassword}"`:""}>
            ${t.defaultPassword?'<div style="font-size:11px;color:var(--text-tertiary);margin-top:4px">已自动填充默认密码，直接设置新密码即可</div>':""}
          </div>
        `:""}
        <div style="margin-bottom:12px">
          <label style="display:block;font-size:var(--font-size-xs);color:var(--text-tertiary);margin-bottom:4px">新密码</label>
          <input type="password" id="sec-new-pw" class="form-input" placeholder="至少 6 位，不能纯数字" autocomplete="new-password" style="width:100%">
          <div id="pw-strength" style="margin-top:6px;display:flex;align-items:center;gap:8px;min-height:20px"></div>
        </div>
        <div style="margin-bottom:16px">
          <label style="display:block;font-size:var(--font-size-xs);color:var(--text-tertiary);margin-bottom:4px">确认新密码</label>
          <input type="password" id="sec-confirm-pw" class="form-input" placeholder="再次输入新密码" autocomplete="new-password" style="width:100%">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">${t.hasPassword?"确认修改":"设置密码"}</button>
        <span id="change-pw-msg" style="margin-left:12px;font-size:var(--font-size-xs)"></span>
      </form>
    </div>
  `,s+=`
    <div class="config-section">
      <div class="config-section-title" style="display:flex;align-items:center;gap:6px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        无视风险模式
      </div>
      <div style="padding:12px 16px;background:${t.ignoreRisk?"rgba(239,68,68,0.08)":"var(--bg-tertiary)"};border-radius:var(--radius-sm);border:1px solid ${t.ignoreRisk?"rgba(239,68,68,0.2)":"var(--border-primary)"}">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div>
            <div style="font-weight:500;color:var(--text-primary)">关闭密码保护</div>
            <div style="font-size:var(--font-size-xs);color:var(--text-secondary);margin-top:4px;line-height:1.5">
              开启后任何人都可以直接访问面板，无需输入密码。<br>
              <strong style="color:var(--error)">仅建议在受信任的内网环境中使用。</strong>
            </div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="toggle-ignore-risk" ${t.ignoreRisk?"checked":""}>
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
      <div id="ignore-risk-confirm" style="display:none;margin-top:12px;padding:12px 16px;background:rgba(239,68,68,0.06);border-radius:var(--radius-sm);border:1px solid rgba(239,68,68,0.15)">
        <p style="font-size:var(--font-size-sm);color:var(--error);font-weight:600;margin-bottom:8px">确认关闭密码保护？</p>
        <p style="font-size:var(--font-size-xs);color:var(--text-secondary);margin-bottom:12px;line-height:1.5">
          关闭后，<strong>任何能访问此服务器 IP 和端口的人</strong>都可以直接进入管理面板，查看和修改你的 AI 配置。
        </p>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm" id="btn-confirm-ignore" style="background:var(--error);color:#fff;border:none">我了解风险，确认关闭</button>
          <button class="btn btn-secondary btn-sm" id="btn-cancel-ignore">取消</button>
        </div>
      </div>
    </div>
  `,e.innerHTML=s,T(e,t)}function T(e,t){var c,h;const s=e.querySelector("#sec-new-pw"),n=e.querySelector("#pw-strength");s&&n&&s.addEventListener("input",()=>{const l=E(s.value);if(!s.value){n.innerHTML="";return}const u=[1,2,3,4].map(d=>`<div style="width:32px;height:4px;border-radius:2px;background:${d<=l.level?l.color:"var(--border-primary)"}"></div>`).join("");n.innerHTML=`${u}<span style="font-size:11px;color:${l.color};font-weight:500">${l.text}</span>`});const o=e.querySelector("#form-change-pw");o&&o.addEventListener("submit",async l=>{var x,b,P;l.preventDefault();const u=((x=e.querySelector("#sec-old-pw"))==null?void 0:x.value)||"",d=((b=e.querySelector("#sec-new-pw"))==null?void 0:b.value)||"",z=((P=e.querySelector("#sec-confirm-pw"))==null?void 0:P.value)||"",a=e.querySelector("#change-pw-msg"),p=o.querySelector('button[type="submit"]');if(d!==z){a.textContent="两次输入的密码不一致",a.style.color="var(--error)";return}p.disabled=!0,p.textContent="提交中...",a.textContent="";try{await y("auth_change_password",{oldPassword:u,newPassword:d}),a.textContent="密码修改成功",a.style.color="var(--success)",v("密码已更新","success"),sessionStorage.removeItem("clawpanel_must_change_pw");const g=document.getElementById("pw-change-banner");g&&g.remove(),setTimeout(()=>m(e.closest(".page")),1e3)}catch(g){a.textContent=g.message,a.style.color="var(--error)",p.disabled=!1,p.textContent=t.hasPassword?"确认修改":"设置密码"}});const r=e.querySelector("#toggle-ignore-risk"),i=e.querySelector("#ignore-risk-confirm");r&&i&&(r.addEventListener("change",()=>{r.checked?(i.style.display="block",r.checked=!1):_(e,!1)}),(c=e.querySelector("#btn-confirm-ignore"))==null||c.addEventListener("click",()=>{_(e,!0)}),(h=e.querySelector("#btn-cancel-ignore"))==null||h.addEventListener("click",()=>{i.style.display="none"}))}async function _(e,t){try{await y("auth_ignore_risk",{enable:t}),t?v("已开启无视风险模式，密码保护已关闭","warning"):v("无视风险模式已关闭，请设置新密码","info"),setTimeout(()=>m(e.closest(".page")),500)}catch(s){v("操作失败: "+s.message,"error")}}export{I as render};

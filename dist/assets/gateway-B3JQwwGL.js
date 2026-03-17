import{a as S,t as b,l as A}from"./index-rhHLY_38.js";function G(e){return e?typeof e=="string"?e:typeof e=="object"?e.$env?`$env:${e.$env}`:e.$ref?`$ref:${e.$ref}`:JSON.stringify(e):String(e):""}function M(e){return e&&typeof e=="object"&&("$env"in e||"$ref"in e)}async function O(){const e=document.createElement("div");e.className="page",e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Gateway 配置</h1>
      <p class="page-desc">Gateway 是 AI 模型的统一入口，所有应用通过它来调用模型服务</p>
    </div>
    <div id="gateway-config">
      <div class="config-section"><div class="stat-card loading-placeholder" style="height:80px"></div></div>
      <div class="config-section"><div class="stat-card loading-placeholder" style="height:80px"></div></div>
      <div class="config-section"><div class="stat-card loading-placeholder" style="height:80px"></div></div>
    </div>
    <div class="gw-save-bar">
      <button class="btn btn-primary" id="btn-save-gw">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>
        保存并生效
      </button>
      <span class="gw-save-hint">修改后点击保存，Gateway 会自动重载</span>
    </div>
  `;const t={config:null,_origToken:null};return E(e,t),e.querySelector("#btn-save-gw").onclick=async()=>{const i=e.querySelector("#btn-save-gw");i.disabled=!0,i.classList.add("btn-loading"),i.textContent="保存中...";try{await V(e,t)}finally{i.disabled=!1,i.classList.remove("btn-loading"),i.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg> 保存并生效'}},e}async function E(e,t){var o,l,s,a;const i=e.querySelector("#gateway-config");try{t.config=await S.readOpenclawConfig(),t._origToken=(a=(s=(l=(o=t.config)==null?void 0:o.gateway)==null?void 0:l.auth)==null?void 0:s.token)!=null?a:null,H(e,t)}catch(n){i.innerHTML='<div style="color:var(--error);padding:20px">加载配置失败: '+n+"</div>",b("加载配置失败: "+n,"error")}}function H(e,t){var l,s,a,n,r,m,v,d,x,k,$,g,p,w,u,h,f,y,c,C,q,T,L,B;const i=e.querySelector("#gateway-config"),o=((l=t.config)==null?void 0:l.gateway)||{};i.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
        服务端口
      </div>
      <div class="form-group">
        <label class="form-label">端口号</label>
        <input class="form-input" id="gw-port" type="number" value="${o.port||18789}" min="1024" max="65535" style="max-width:200px">
        <div class="form-hint">应用通过这个端口连接 Gateway，默认 18789，一般不需要改</div>
      </div>
    </div>

    <div class="config-section">
      <div class="config-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
        谁能访问
      </div>
      <div class="gw-option-cards">
        <label class="gw-option-card ${o.bind==="lan"||o.bind==="all"?"":"selected"}" data-bind="loopback">
          <input type="radio" name="gw-bind" value="loopback" ${o.bind==="lan"||o.bind==="all"?"":"checked"} hidden>
          <div class="gw-option-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="gw-option-text">
            <div class="gw-option-title">仅本机使用</div>
            <div class="gw-option-desc">只有这台电脑上的应用能访问，最安全</div>
          </div>
        </label>
        <label class="gw-option-card ${o.bind==="lan"||o.bind==="all"?"selected":""}" data-bind="lan">
          <input type="radio" name="gw-bind" value="lan" ${o.bind==="lan"||o.bind==="all"?"checked":""} hidden>
          <div class="gw-option-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="7" height="10" rx="1"/><rect x="9" y="3" width="6" height="14" rx="1"/><rect x="16" y="6" width="7" height="10" rx="1"/><line x1="8" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="16" y2="12"/></svg>
          </div>
          <div class="gw-option-text">
            <div class="gw-option-title">局域网共享</div>
            <div class="gw-option-desc">同一网络下的手机、平板等设备也能用</div>
          </div>
        </label>
      </div>
    </div>

    <div class="config-section">
      <div class="config-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        安全认证
      </div>
      <div class="form-group" style="margin-bottom:var(--space-md)">
        <label class="form-label">认证方式</label>
        <div class="gw-option-cards">
          <label class="gw-option-card ${((s=o.auth)==null?void 0:s.mode)==="password"?"":"selected"}" data-auth="token">
            <input type="radio" name="gw-auth-mode" value="token" ${((a=o.auth)==null?void 0:a.mode)==="password"?"":"checked"} hidden>
            <div class="gw-option-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            </div>
            <div class="gw-option-text">
              <div class="gw-option-title">Token 密钥</div>
              <div class="gw-option-desc">标准认证方式，适合本地和局域网使用</div>
            </div>
          </label>
          <label class="gw-option-card ${((n=o.auth)==null?void 0:n.mode)==="password"?"selected":""}" data-auth="password">
            <input type="radio" name="gw-auth-mode" value="password" ${((r=o.auth)==null?void 0:r.mode)==="password"?"checked":""} hidden>
            <div class="gw-option-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <div class="gw-option-text">
              <div class="gw-option-title">密码认证</div>
              <div class="gw-option-desc">Tailscale Funnel 等外网暴露场景必须使用此模式</div>
            </div>
          </label>
        </div>
      </div>
      <div class="form-group" id="gw-auth-token-group" style="${((m=o.auth)==null?void 0:m.mode)==="password"?"display:none":""}">
        <label class="form-label">访问密钥（Token）</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" id="gw-token" type="password" value="${G(((v=o.auth)==null?void 0:v.token)||o.authToken)}" placeholder="不设置则任何人都能调用" style="flex:1" ${M((d=o.auth)==null?void 0:d.token)?"readonly":""}>
          <button class="btn btn-sm btn-secondary" id="btn-toggle-token">显示</button>
        </div>
        <div class="form-hint">${M((x=o.auth)==null?void 0:x.token)?"当前 Token 通过环境变量/引用配置，如需改为明文请清空后输入":"设置后，应用调用时需要带上这个密钥才能通过。如果选了「局域网共享」，强烈建议设置"}</div>
      </div>
      <div class="form-group" id="gw-auth-password-group" style="${((k=o.auth)==null?void 0:k.mode)==="password"?"":"display:none"}">
        <label class="form-label">密码</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" id="gw-password" type="password" value="${(($=o.auth)==null?void 0:$.password)||""}" placeholder="设置 Gateway 访问密码" style="flex:1">
          <button class="btn btn-sm btn-secondary" id="btn-toggle-password">显示</button>
        </div>
        <div class="form-hint">通过 Tailscale Funnel 暴露 Gateway 时，必须使用密码认证模式</div>
      </div>
    </div>

    <div class="config-section">
      <div class="config-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
        Agent 工具权限
      </div>
      <div class="form-group" style="margin-bottom:var(--space-md)">
        <label class="form-label">工具调用权限</label>
        <div class="gw-option-cards">
          <label class="gw-option-card ${(((g=o.tools)==null?void 0:g.profile)||"full")==="full"?"selected":""}" data-tools-profile="full">
            <input type="radio" name="gw-tools-profile" value="full" ${(((p=o.tools)==null?void 0:p.profile)||"full")==="full"?"checked":""} hidden>
            <div class="gw-option-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="gw-option-text">
              <div class="gw-option-title">完整权限</div>
              <div class="gw-option-desc">Agent 可使用所有工具（推荐）</div>
            </div>
          </label>
          <label class="gw-option-card ${((w=o.tools)==null?void 0:w.profile)==="limited"?"selected":""}" data-tools-profile="limited">
            <input type="radio" name="gw-tools-profile" value="limited" ${((u=o.tools)==null?void 0:u.profile)==="limited"?"checked":""} hidden>
            <div class="gw-option-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <div class="gw-option-text">
              <div class="gw-option-title">受限模式</div>
              <div class="gw-option-desc">仅允许安全工具，禁用文件/命令操作</div>
            </div>
          </label>
          <label class="gw-option-card ${((h=o.tools)==null?void 0:h.profile)==="none"?"selected":""}" data-tools-profile="none">
            <input type="radio" name="gw-tools-profile" value="none" ${((f=o.tools)==null?void 0:f.profile)==="none"?"checked":""} hidden>
            <div class="gw-option-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <div class="gw-option-text">
              <div class="gw-option-title">禁用工具</div>
              <div class="gw-option-desc">Agent 只能对话，不能调用任何工具</div>
            </div>
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">会话可见性</label>
        <select class="form-input" id="gw-sessions-visibility" style="width:auto;min-width:180px">
          <option value="all" ${(((c=(y=o.tools)==null?void 0:y.sessions)==null?void 0:c.visibility)||"all")==="all"?"selected":""}>所有会话可见</option>
          <option value="own" ${((q=(C=o.tools)==null?void 0:C.sessions)==null?void 0:q.visibility)==="own"?"selected":""}>仅自己的会话</option>
          <option value="none" ${((L=(T=o.tools)==null?void 0:T.sessions)==null?void 0:L.visibility)==="none"?"selected":""}>不可见</option>
        </select>
        <div class="form-hint">控制 Agent 是否能查看其他会话的上下文</div>
      </div>
    </div>

    <div class="gw-advanced-toggle" id="gw-advanced-toggle">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>
      高级选项
    </div>
    <div class="gw-advanced-panel" id="gw-advanced-panel" style="display:none">
      <div class="config-section">
        <div class="config-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
          Tailscale 组网
        </div>
        <div class="form-group">
          <label class="form-label">Tailscale 地址</label>
          <input class="form-input" id="gw-tailscale" value="${((B=o.tailscale)==null?void 0:B.address)||""}" placeholder="例如 100.x.x.x:18789">
          <div class="form-hint">如果你用 Tailscale 虚拟局域网，填上地址后远程设备就能通过它访问 Gateway。不用可以留空</div>
        </div>
      </div>
    </div>
  `,_(i)}function _(e){function t(i,o){const l=e.querySelector("#"+i);l&&(l.onclick=()=>{const s=e.querySelector("#"+o);s.type==="password"?(s.type="text",l.textContent="隐藏"):(s.type="password",l.textContent="显示")})}t("btn-toggle-token","gw-token"),t("btn-toggle-password","gw-password"),e.querySelectorAll(".gw-option-cards").forEach(i=>{i.querySelectorAll(".gw-option-card").forEach(o=>{o.addEventListener("click",()=>{i.querySelectorAll(".gw-option-card").forEach(l=>l.classList.remove("selected")),o.classList.add("selected")})})}),e.querySelectorAll('input[name="gw-auth-mode"]').forEach(i=>{i.addEventListener("change",()=>{const o=i.value,l=e.querySelector("#gw-auth-token-group"),s=e.querySelector("#gw-auth-password-group");l&&(l.style.display=o==="token"?"":"none"),s&&(s.style.display=o==="password"?"":"none")})}),e.querySelector("#gw-advanced-toggle").onclick=()=>{const i=e.querySelector("#gw-advanced-panel"),o=e.querySelector("#gw-advanced-toggle"),l=i.style.display!=="none";i.style.display=l?"none":"block",o.classList.toggle("open",!l)}}async function V(e,t){var g,p,w,u,h,f,y;const i=parseInt((g=e.querySelector("#gw-port"))==null?void 0:g.value)||18789,o=e.querySelector('input[name="gw-bind"]:checked'),l=(o==null?void 0:o.value)||"loopback",s="local",a=e.querySelector('input[name="gw-auth-mode"]:checked'),n=(a==null?void 0:a.value)||"token",r=((p=e.querySelector("#gw-token"))==null?void 0:p.value)||"",m=((w=e.querySelector("#gw-password"))==null?void 0:w.value)||"",v=((u=e.querySelector("#gw-tailscale"))==null?void 0:u.value)||"";let d=r;M(t._origToken)&&r===G(t._origToken)&&(d=t._origToken);const x=n==="password"?{mode:"password",password:m}:d?{mode:"token",token:d}:{},k=((h=e.querySelector('input[name="gw-tools-profile"]:checked'))==null?void 0:h.value)||"full",$=((f=e.querySelector("#gw-sessions-visibility"))==null?void 0:f.value)||"all";t.config.tools={...t.config.tools||{},profile:k,sessions:{...((y=t.config.tools)==null?void 0:y.sessions)||{},visibility:$}},t.config.gateway={...t.config.gateway,port:i,bind:l,mode:s,auth:x,tailscale:v.trim()?{address:v.trim()}:void 0};try{await S.writeOpenclawConfig(t.config),b("配置已保存，正在重载 Gateway...","info");try{await S.reloadGateway(),b("Gateway 已重载，新配置已生效","success"),setTimeout(A,3e3)}catch(c){b("配置已保存，但重载失败: "+c,"warning")}}catch(c){b("保存失败: "+c,"error")}}export{O as render};

import{b as y,a as h,t as g}from"./index-rhHLY_38.js";let a=null,t=null,b=!1;async function j(){const s=document.createElement("div");return s.className="page",a=s,s.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">通信与自动化</h1>
      <p class="page-desc">管理 AI 在各消息渠道中的行为方式：如何回复消息、支持哪些命令、如何接收外部通知等</p>
    </div>
    <div class="comm-toolbar" style="display:flex;gap:8px;margin-bottom:var(--space-lg);flex-wrap:wrap">
      <button class="btn btn-sm btn-primary comm-tab active" data-tab="messages">消息</button>
      <button class="btn btn-sm btn-secondary comm-tab" data-tab="broadcast">广播</button>
      <button class="btn btn-sm btn-secondary comm-tab" data-tab="commands">命令</button>
      <button class="btn btn-sm btn-secondary comm-tab" data-tab="hooks">Webhook</button>
      <button class="btn btn-sm btn-secondary comm-tab" data-tab="approvals">执行审批</button>
      <div style="flex:1"></div>
      <button class="btn btn-sm btn-primary" id="btn-comm-save" disabled>${y("save",14)} 保存</button>
    </div>
    <div id="comm-content">
      <div class="stat-card loading-placeholder" style="height:200px"></div>
    </div>
  `,s.querySelectorAll(".comm-tab").forEach(e=>{e.onclick=()=>{s.querySelectorAll(".comm-tab").forEach(o=>{o.classList.remove("active","btn-primary"),o.classList.add("btn-secondary")}),e.classList.remove("btn-secondary"),e.classList.add("active","btn-primary"),k(s,e.dataset.tab)}}),s.querySelector("#btn-comm-save").onclick=$,await x(s),s}function I(){a=null,t=null,b=!1}async function x(s){try{t=await h.readOpenclawConfig(),t||(t={}),k(s,"messages")}catch(e){s.querySelector("#comm-content").innerHTML=`<div style="color:var(--error)">加载配置失败: ${p((e==null?void 0:e.message)||e)}</div>`}}function m(){b=!0;const s=a==null?void 0:a.querySelector("#btn-comm-save");s&&(s.disabled=!1)}async function $(){if(!t||!b)return;const s=a==null?void 0:a.querySelector("#btn-comm-save");s&&(s.disabled=!0,s.textContent="保存中...");try{S(),await h.writeOpenclawConfig(t),b=!1,g("配置已保存，正在重载 Gateway...","info");try{await h.reloadGateway(),g("Gateway 已重载","success")}catch{}}catch(e){g("保存失败: "+e,"error")}finally{s&&(s.disabled=!b,s.innerHTML=`${y("save",14)} 保存`)}}function S(){var e;if(!a)return;const s=(e=a.querySelector(".comm-tab.active"))==null?void 0:e.dataset.tab;s==="messages"?q():s==="broadcast"?L():s==="commands"?R():s==="hooks"?M():s==="approvals"&&C()}function k(s,e){const o=s.querySelector("#comm-content");e==="messages"?w(o):e==="broadcast"?A(o):e==="commands"?E(o):e==="hooks"?T(o):e==="approvals"&&H(o)}function w(s){var i,l,n,c;const e=(t==null?void 0:t.messages)||{},o=e.statusReactions||{};s.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">回复设置</div>
      <div class="form-group">
        <label class="form-label">回复前缀</label>
        <input class="form-input" id="msg-responsePrefix" value="${p(e.responsePrefix||"")}" placeholder="如 [{model}] 或 auto">
        <div class="form-hint">每条 AI 回复开头自动加的前缀。支持 {model}、{provider}、{thinkingLevel} 等变量。设为 auto 则显示 Agent 名称</div>
      </div>
      <div class="form-group">
        <label class="form-label">确认反应 Emoji</label>
        <input class="form-input" id="msg-ackReaction" value="${p(e.ackReaction||"")}" placeholder="如 👀 或留空禁用" style="max-width:200px">
        <div class="form-hint">收到消息时自动添加的 emoji 反应（确认已收到）</div>
      </div>
      <div class="form-group">
        <label class="form-label">确认反应范围</label>
        <select class="form-input" id="msg-ackReactionScope" style="max-width:300px">
          <option value="group-mentions" ${(e.ackReactionScope||"group-mentions")==="group-mentions"?"selected":""}>群聊 @提及时</option>
          <option value="group-all" ${e.ackReactionScope==="group-all"?"selected":""}>群聊所有消息</option>
          <option value="direct" ${e.ackReactionScope==="direct"?"selected":""}>仅私聊</option>
          <option value="all" ${e.ackReactionScope==="all"?"selected":""}>所有消息</option>
          <option value="off" ${e.ackReactionScope==="off"?"selected":""}>关闭</option>
        </select>
      </div>
      <div class="form-group" style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <label class="form-label" style="margin:0">回复后移除确认反应</label>
          <div class="form-hint" style="margin:0">回复发送成功后自动删除之前的确认 emoji</div>
        </div>
        <label class="toggle-switch"><input type="checkbox" id="msg-removeAckAfterReply" ${e.removeAckAfterReply?"checked":""}><span class="toggle-slider"></span></label>
      </div>
      <div class="form-group" style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <label class="form-label" style="margin:0">隐藏工具错误</label>
          <div class="form-hint" style="margin:0">不向用户显示 ⚠️ 工具执行错误</div>
        </div>
        <label class="toggle-switch"><input type="checkbox" id="msg-suppressToolErrors" ${e.suppressToolErrors?"checked":""}><span class="toggle-slider"></span></label>
      </div>
    </div>

    <div class="config-section">
      <div class="config-section-title">状态反应 Emoji</div>
      <div class="form-group" style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <label class="form-label" style="margin:0">启用状态反应</label>
          <div class="form-hint" style="margin:0">在消息渠道中用 emoji 表示 AI 当前状态（思考中、执行工具、完成等）</div>
        </div>
        <label class="toggle-switch"><input type="checkbox" id="msg-sr-enabled" ${o.enabled?"checked":""}><span class="toggle-slider"></span></label>
      </div>
    </div>

    <div class="config-section">
      <div class="config-section-title">消息队列</div>
      <div class="form-group">
        <label class="form-label">防抖延迟（毫秒）</label>
        <input class="form-input" id="msg-debounceMs" type="number" value="${((i=e.inbound)==null?void 0:i.debounceMs)||((l=e.queue)==null?void 0:l.debounceMs)||""}" placeholder="默认无延迟" style="max-width:200px">
        <div class="form-hint">合并快速连续消息的等待时间（毫秒），避免 AI 对每条消息逐一回复</div>
      </div>
      <div class="form-group">
        <label class="form-label">队列上限</label>
        <input class="form-input" id="msg-queueCap" type="number" value="${((n=e.queue)==null?void 0:n.cap)||""}" placeholder="默认无限制" style="max-width:200px">
        <div class="form-hint">等待处理的消息队列最大长度</div>
      </div>
    </div>

    <div class="config-section">
      <div class="config-section-title">群聊设置</div>
      <div class="form-group">
        <label class="form-label">群聊历史条数</label>
        <input class="form-input" id="msg-groupHistoryLimit" type="number" value="${((c=e.groupChat)==null?void 0:c.historyLimit)||""}" placeholder="默认自动" style="max-width:200px">
        <div class="form-hint">群聊中回溯多少条历史消息作为上下文</div>
      </div>
    </div>
  `,s.querySelectorAll("input, select").forEach(v=>{v.addEventListener("change",m),v.addEventListener("input",m)})}function q(){if(!t)return;const s=u=>a==null?void 0:a.querySelector("#"+u),e=u=>{var r,f;return((f=(r=s(u))==null?void 0:r.value)==null?void 0:f.trim())||void 0},o=u=>{var f;const r=parseInt((f=s(u))==null?void 0:f.value);return isNaN(r)?void 0:r},i=u=>{var r;return((r=s(u))==null?void 0:r.checked)||!1};t.messages||(t.messages={});const l=t.messages;l.responsePrefix=e("msg-responsePrefix"),l.ackReaction=e("msg-ackReaction"),l.ackReactionScope=e("msg-ackReactionScope")||void 0,l.removeAckAfterReply=i("msg-removeAckAfterReply")||void 0,l.suppressToolErrors=i("msg-suppressToolErrors")||void 0,l.statusReactions||(l.statusReactions={}),l.statusReactions.enabled=i("msg-sr-enabled")||void 0;const n=o("msg-debounceMs");n!=null&&(l.inbound||(l.inbound={}),l.inbound.debounceMs=n);const c=o("msg-queueCap");c!=null&&(l.queue||(l.queue={}),l.queue.cap=c);const v=o("msg-groupHistoryLimit");v!=null&&(l.groupChat||(l.groupChat={}),l.groupChat.historyLimit=v)}function A(s){const e=(t==null?void 0:t.broadcast)||{};s.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">广播策略</div>
      <div class="form-group">
        <label class="form-label">广播处理方式</label>
        <select class="form-input" id="bc-strategy" style="max-width:300px">
          <option value="parallel" ${(e.strategy||"parallel")==="parallel"?"selected":""}>并行（parallel）— 同时发送给所有目标</option>
          <option value="sequential" ${e.strategy==="sequential"?"selected":""}>顺序（sequential）— 逐个发送，严格有序</option>
        </select>
        <div class="form-hint">当消息需要广播给多个 Agent 时的处理策略。并行更快，顺序更可控</div>
      </div>
    </div>
  `,s.querySelectorAll("input, select").forEach(o=>{o.addEventListener("change",m)})}function L(){var e;if(!t)return;const s=(e=a==null?void 0:a.querySelector("#bc-strategy"))==null?void 0:e.value;s&&(t.broadcast||(t.broadcast={}),t.broadcast.strategy=s)}function E(s){const e=(t==null?void 0:t.commands)||{};s.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">斜杠命令</div>
      ${d("cmd-text","文本命令解析","允许通过 / 前缀在聊天中执行命令",e.text!==!1)}
      ${d("cmd-bash","Bash 命令","允许用 ! 前缀或 /bash 在聊天中执行 Shell 命令（危险）",!!e.bash)}
      ${d("cmd-config","/config 命令","允许在聊天中查看/修改配置",!!e.config)}
      ${d("cmd-debug","/debug 命令","允许在聊天中查看调试信息",!!e.debug)}
      ${d("cmd-restart","重启命令","允许通过命令重启 Gateway",e.restart!==!1)}
    </div>
    <div class="config-section">
      <div class="config-section-title">原生命令注册</div>
      <div class="form-group">
        <label class="form-label">原生命令</label>
        <select class="form-input" id="cmd-native" style="max-width:200px">
          <option value="auto" ${e.native==="auto"||e.native===void 0?"selected":""}>自动</option>
          <option value="true" ${e.native===!0?"selected":""}>启用</option>
          <option value="false" ${e.native===!1?"selected":""}>禁用</option>
        </select>
        <div class="form-hint">在支持的渠道（Telegram、Discord）自动注册原生命令菜单</div>
      </div>
    </div>
  `,s.querySelectorAll("input, select").forEach(o=>{o.addEventListener("change",m)})}function R(){var i;if(!t)return;const s=l=>{var n;return(n=a==null?void 0:a.querySelector("#"+l))==null?void 0:n.checked};t.commands||(t.commands={});const e=t.commands;e.text=s("cmd-text")===!1?!1:void 0,e.bash=s("cmd-bash")||void 0,e.config=s("cmd-config")||void 0,e.debug=s("cmd-debug")||void 0,e.restart=s("cmd-restart")===!1?!1:void 0;const o=(i=a==null?void 0:a.querySelector("#cmd-native"))==null?void 0:i.value;e.native=o==="true"?!0:o==="false"?!1:"auto"}function T(s){const e=(t==null?void 0:t.hooks)||{};s.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">Webhook 设置</div>
      ${d("hooks-enabled","启用 Webhook","允许外部服务通过 HTTP 触发 AI 执行",!!e.enabled)}
      <div class="form-group">
        <label class="form-label">Webhook 路径</label>
        <input class="form-input" id="hooks-path" value="${p(e.path||"")}" placeholder="/hooks（默认）" style="max-width:300px">
        <div class="form-hint">Gateway 上暴露的 Webhook 接收路径</div>
      </div>
      <div class="form-group">
        <label class="form-label">认证 Token</label>
        <input class="form-input" id="hooks-token" type="password" value="${p(e.token||"")}" placeholder="可选，用于验证 Webhook 请求">
        <div class="form-hint">外部请求需在 Header 中携带此 Token 才能触发 Webhook</div>
      </div>
      <div class="form-group">
        <label class="form-label">默认 Session Key</label>
        <input class="form-input" id="hooks-defaultSessionKey" value="${p(e.defaultSessionKey||"")}" placeholder="自动生成 hook:<uuid>">
        <div class="form-hint">Webhook 触发的 Agent 会话标识。留空则每次自动生成</div>
      </div>
      <div class="form-group">
        <label class="form-label">请求体大小限制（字节）</label>
        <input class="form-input" id="hooks-maxBodyBytes" type="number" value="${e.maxBodyBytes||""}" placeholder="默认无限制" style="max-width:200px">
      </div>
    </div>
  `,s.querySelectorAll("input, select").forEach(o=>{o.addEventListener("change",m),o.addEventListener("input",m)})}function M(){if(!t)return;const s=l=>{var n,c;return((c=(n=a==null?void 0:a.querySelector("#"+l))==null?void 0:n.value)==null?void 0:c.trim())||void 0},e=l=>{var c;const n=parseInt((c=a==null?void 0:a.querySelector("#"+l))==null?void 0:c.value);return isNaN(n)?void 0:n},o=l=>{var n;return(n=a==null?void 0:a.querySelector("#"+l))==null?void 0:n.checked};t.hooks||(t.hooks={});const i=t.hooks;i.enabled=o("hooks-enabled")||void 0,i.path=s("hooks-path"),i.token=s("hooks-token"),i.defaultSessionKey=s("hooks-defaultSessionKey"),i.maxBodyBytes=e("hooks-maxBodyBytes")}function H(s){var o;const e=((o=t==null?void 0:t.approvals)==null?void 0:o.exec)||{};s.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">执行审批转发</div>
      <div class="form-hint" style="margin-bottom:var(--space-md)">当 AI 请求执行命令时，将审批请求转发到消息渠道，方便在手机上审批</div>
      ${d("approvals-enabled","启用审批转发","将执行审批请求转发到配置的消息渠道",!!e.enabled)}
      <div class="form-group">
        <label class="form-label">转发模式</label>
        <select class="form-input" id="approvals-mode" style="max-width:300px">
          <option value="session" ${(e.mode||"session")==="session"?"selected":""}>原会话（session）— 发到发起请求的会话</option>
          <option value="targets" ${e.mode==="targets"?"selected":""}>指定目标（targets）— 发到配置的目标渠道</option>
          <option value="both" ${e.mode==="both"?"selected":""}>两者都发（both）</option>
        </select>
      </div>
      ${d("approvals-forwardExec","转发执行请求","将 exec 审批请求转发到渠道（默认关闭，低风险场景可开启）",!!e.enabled)}
    </div>
  `,s.querySelectorAll("input, select").forEach(i=>{i.addEventListener("change",m)})}function C(){if(!t)return;const s=i=>{var l;return(l=a==null?void 0:a.querySelector("#"+i))==null?void 0:l.checked},e=i=>{var l;return(l=a==null?void 0:a.querySelector("#"+i))==null?void 0:l.value};t.approvals||(t.approvals={}),t.approvals.exec||(t.approvals.exec={});const o=t.approvals.exec;o.enabled=s("approvals-enabled")||void 0,o.mode=e("approvals-mode")||void 0}function d(s,e,o,i){return`
    <div class="form-group" style="display:flex;align-items:center;justify-content:space-between">
      <div>
        <label class="form-label" style="margin:0">${e}</label>
        <div class="form-hint" style="margin:0">${o}</div>
      </div>
      <label class="toggle-switch"><input type="checkbox" id="${s}" ${i?"checked":""}><span class="toggle-slider"></span></label>
    </div>
  `}function p(s){return(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}export{I as cleanup,j as render};

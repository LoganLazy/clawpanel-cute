const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CRKb_1Il.js","assets/core-DhEqZVGG.js","assets/event-DjZVAIBO.js"])))=>i.map(i=>d[i]);
import{a as b,t as m,b as h,_ as Y}from"./index-BeJpi4vN.js";import{showConfirm as ne,showContentModal as Z}from"./modal-DK6Az47R.js";const B={qqbot:{label:"QQ 机器人",iconName:"message-square",desc:"内置 QQ 机器人接入能力，通过 QQ 开放平台快速启用",guide:['使用手机 QQ 扫描二维码，<a href="https://q.qq.com/qqbot/openclaw/login.html" target="_blank" style="color:var(--accent);text-decoration:underline">打开 QQ 机器人开放平台</a> 完成注册登录',"点击「创建机器人」，设置机器人名称和头像","创建完成后，在机器人详情页复制 <b>AppID</b> 和 <b>AppSecret</b>（AppSecret 仅显示一次，请妥善保存）","将 AppID 和 AppSecret 填入下方表单，点击「校验凭证」验证后保存","ClawStar 会自动安装 QQBot 社区插件并写入配置，保存后 Gateway 自动重载生效"],guideFooter:'<div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary)">详细教程：<a href="https://cloud.tencent.com/developer/article/2626045" target="_blank" style="color:var(--accent);text-decoration:underline">腾讯云 - 快速搭建 AI 私人 QQ 助理</a></div>',fields:[{key:"appId",label:"AppID",placeholder:"如 1903224859",required:!0},{key:"appSecret",label:"AppSecret",placeholder:"如 cisldqspngYlyPdc",secret:!0,required:!0}],pluginRequired:"@sliverp/qqbot@latest"},telegram:{label:"Telegram",iconName:"send",desc:"通过 BotFather 创建机器人，用 Bot Token 接入",guide:['在 Telegram 中搜索 <a href="https://t.me/BotFather" target="_blank" style="color:var(--accent);text-decoration:underline">@BotFather</a>，发送 <b>/newbot</b> 创建机器人',"按提示设置机器人名称和用户名，成功后 BotFather 会返回 <b>Bot Token</b>",'获取你的 Telegram 用户 ID：发送消息给 <a href="https://t.me/userinfobot" target="_blank" style="color:var(--accent);text-decoration:underline">@userinfobot</a> 即可查看',"将 Bot Token 和用户 ID 填入下方表单，点击「校验凭证」验证后保存"],fields:[{key:"botToken",label:"Bot Token",placeholder:"123456:ABC-DEF...",secret:!0,required:!0},{key:"allowedUsers",label:"允许的用户 ID",placeholder:"多个用逗号分隔，如 12345, 67890",required:!0}]},feishu:{label:"飞书",iconName:"message-square",desc:"飞书/Lark 企业消息集成，支持文档、多维表格、日历等飞书生态能力",guide:['<b>选择插件版本</b>：<br>• <b>内置插件</b>（默认）— OpenClaw 自带，主要做聊天入口，安装简单<br>• <b>飞书官方插件</b> — 飞书团队开发，能以你的身份操作飞书（写文档、建表、约日程）<br><span style="color:var(--text-tertiary)">两者互斥，只能启用一个</span>','前往 <a href="https://open.feishu.cn/app" target="_blank" style="color:var(--accent);text-decoration:underline">飞书开放平台</a>，创建企业自建应用，在「应用能力」中添加<b>机器人</b>能力',"在<b>凭证与基础信息</b>页面获取 <b>App ID</b> 和 <b>App Secret</b>",'进入<b>权限管理</b>，参照 <a href="https://open.larkoffice.com/document/server-docs/application-scope/scope-list" target="_blank" style="color:var(--accent);text-decoration:underline">权限列表</a> 开通所需权限（<code>im:message</code> 等）',"进入<b>事件订阅</b>，选择<b>使用长连接（WebSocket）</b>模式，订阅<b>接收消息</b>和<b>卡片回调</b>事件。如有 user access token 开关请打开","将 App ID 和 App Secret 填入下方表单，校验后保存",'保存后在飞书中向机器人发消息，获取配对码；你可以直接在下方"配对审批"区域粘贴配对码完成绑定，也可以在终端执行 <code>openclaw pairing approve feishu &lt;配对码&gt; --notify</code>'],guideFooter:'<div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary)">国际版 Lark 用户请将域名切换为 <b>lark</b>。详细教程：<a href="https://www.feishu.cn/content/article/7613711414611463386" target="_blank" style="color:var(--accent);text-decoration:underline">OpenClaw 飞书官方插件使用指南</a> · <a href="https://github.com/AlexAnys/openclaw-feishu" target="_blank" style="color:var(--accent);text-decoration:underline">两个插件怎么选</a></div>',fields:[{key:"appId",label:"App ID",placeholder:"cli_xxxxxxxxxx",required:!0},{key:"appSecret",label:"App Secret",placeholder:"应用密钥",secret:!0,required:!0},{key:"domain",label:"域名",placeholder:"feishu（国际版选 lark）",required:!1},{key:"pluginVersion",label:"插件版本",type:"select",required:!1,options:[{value:"builtin",label:"内置插件（默认，聊天入口）"},{value:"official",label:"飞书官方插件（操作文档/日历/任务）"}]}],pluginRequired:"@openclaw/feishu@latest",pluginId:"feishu",pairingChannel:"feishu",pairingNotify:!0},dingtalk:{label:"钉钉",iconName:"message-square",desc:"钉钉企业内部应用 + 机器人 Stream 模式接入",guide:['前往 <a href="https://open-dev.dingtalk.com/" target="_blank" style="color:var(--accent);text-decoration:underline">钉钉开放平台</a> 创建企业内部应用，并添加<b>机器人</b>能力',"消息接收模式必须选择 <b>Stream 模式</b>，不要选 Webhook","在<b>凭证与基础信息</b>页面复制 <b>Client ID</b> 和 <b>Client Secret</b>；如 Gateway 开启了鉴权，请按 <code>gateway.auth.mode</code> 填写 <b>Gateway Token</b> 或 <b>Gateway Password</b>","在<b>权限管理</b>中至少确认已开通 <code>Card.Streaming.Write</code>、<code>Card.Instance.Write</code>、<code>qyapi_robot_sendmsg</code>，如需文档能力再补文档相关权限","先在钉钉侧<b>发布应用版本</b>，并确认<b>应用可见范围</b>包含你自己和测试成员；否则私聊或加群时可能搜不到机器人","回到 ClawStar 保存。首次保存会自动安装插件，后续保存只更新配置；如果本机已配置 Gateway 鉴权，系统会自动带出对应的 Token 或 Password","私聊测试时，可在钉钉客户端搜索应用/机器人名称，或从工作台进入应用后发起对话；若找不到，优先检查“已发布”和“可见范围”","如果机器人首次私聊返回的是<b>配对码</b>，你可以直接在下方“配对审批”区域粘贴配对码完成授权，也可以在终端执行 <code>openclaw pairing approve dingtalk-connector &lt;配对码&gt;</code>","群聊测试时，先进入目标群 → <b>群设置</b> → <b>智能群助手 / 机器人</b> → <b>添加机器人</b>，搜索并添加该机器人；回群后建议用 <code>@机器人</code> 再发消息，如仍不响应再检查连接器的 <code>groupPolicy</code> 是否被设为 <code>disabled</code>"],guideFooter:'<div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary)">参考资料：<a href="https://open.dingtalk.com/document/dingstart/install-openclaw-locally" target="_blank" style="color:var(--accent);text-decoration:underline">本地安装 OpenClaw</a>、<a href="https://open.dingtalk.com/document/orgapp/use-group-robots" target="_blank" style="color:var(--accent);text-decoration:underline">添加机器人到钉钉群</a>。排障重点：405 通常是 <code>chatCompletions</code> 未启用，401 通常是 Gateway 鉴权字段不匹配。</div>',fields:[{key:"clientId",label:"Client ID",placeholder:"dingxxxxxxxxxx",required:!0},{key:"clientSecret",label:"Client Secret",placeholder:"应用密钥",secret:!0,required:!0},{key:"gatewayToken",label:"Gateway Token",placeholder:"如已开启 Gateway token 鉴权则填写",required:!1},{key:"gatewayPassword",label:"Gateway Password",placeholder:"与 token 二选一，可选",secret:!0,required:!1}],pluginRequired:"@dingtalk-real-ai/dingtalk-connector",pluginId:"dingtalk-connector",pairingChannel:"dingtalk-connector"},discord:{label:"Discord",iconName:"message-circle",desc:"通过 Discord Developer Portal 创建 Bot 应用接入",guide:['前往 <a href="https://discord.com/developers/applications" target="_blank" style="color:var(--accent);text-decoration:underline">Discord Developer Portal</a>，点击 New Application 创建应用',"进入应用 → 左侧 <b>Bot</b> 页面 → 点击 Reset Token 生成 Bot Token，并开启 <b>Message Content Intent</b>","左侧 <b>OAuth2</b> → URL Generator，勾选 bot 权限，复制链接将 Bot 邀请到你的服务器","将 Bot Token 和服务器 ID 填入下方表单，点击「校验凭证」验证后保存"],fields:[{key:"token",label:"Bot Token",placeholder:"MTIz...",secret:!0,required:!0},{key:"guildId",label:"服务器 ID",placeholder:"右键服务器 → 复制服务器 ID",required:!1},{key:"channelId",label:"频道 ID（可选）",placeholder:"不填则监听所有频道",required:!1}]}};async function ce(){const n=document.createElement("div");return n.className="page",n.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">消息渠道</h1>
      <p class="page-desc">支持 QQ、Telegram、Discord、飞书、钉钉等消息渠道接入</p>
    </div>
    <div id="platforms-configured" style="margin-bottom:var(--space-lg)"></div>
    <div class="config-section">
      <div class="config-section-title">可接入平台</div>
      <div id="platforms-available" class="platforms-grid"></div>
    </div>
  `,await H(n,{configured:[]}),n}function de(){}async function H(n,i){try{const s=await b.listConfiguredPlatforms();i.configured=Array.isArray(s)?s:[]}catch(s){m("加载平台列表失败: "+s,"error"),i.configured=[]}try{const s=await b.readOpenclawConfig();i.bindings=Array.isArray(s==null?void 0:s.bindings)?s.bindings:[]}catch{i.bindings=[]}re(n,i),ie(n,i)}function re(n,i){const s=n.querySelector("#platforms-configured");if(!i.configured.length){s.innerHTML="";return}s.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">已接入</div>
      <div class="platforms-grid">
        ${i.configured.map(a=>{const t=B[a.id],o=(t==null?void 0:t.label)||a.id,c=h((t==null?void 0:t.iconName)||"radio",22),f=G(a.id),p=(i.bindings||[]).filter(g=>{var S;return((S=g.match)==null?void 0:S.channel)===f}).map(g=>g.agentId||"main"),d=p.length>1||p.length===1&&p[0]!=="main"?p.map(g=>`<span style="font-size:var(--font-size-xs);color:var(--accent);background:var(--accent-muted);padding:1px 6px;border-radius:10px;white-space:nowrap">→ ${A(g)}</span>`).join(" "):"";return`
            <div class="platform-card ${a.enabled?"active":"inactive"}" data-pid="${a.id}">
              <div class="platform-card-header">
                <span class="platform-emoji">${c}</span>
                <span class="platform-name">${o}</span>
                ${d}
                <span class="platform-status-dot ${a.enabled?"on":"off"}"></span>
              </div>
              <div class="platform-card-actions">
                <button class="btn btn-sm btn-secondary" data-action="edit">${h("edit",14)} 编辑</button>
                <button class="btn btn-sm btn-secondary" data-action="toggle">${a.enabled?h("pause",14)+" 禁用":h("play",14)+" 启用"}</button>
                <button class="btn btn-sm btn-danger" data-action="remove">${h("trash",14)}</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,s.querySelectorAll(".platform-card").forEach(a=>{const t=a.dataset.pid;a.querySelector('[data-action="edit"]').onclick=()=>J(t,n,i),a.querySelector('[data-action="toggle"]').onclick=async()=>{var c;const o=i.configured.find(f=>f.id===t);if(o)try{await b.toggleMessagingPlatform(t,!o.enabled),m(`${((c=B[t])==null?void 0:c.label)||t} 已${o.enabled?"禁用":"启用"}`,"success"),await H(n,i)}catch(f){m("操作失败: "+f,"error")}},a.querySelector('[data-action="remove"]').onclick=async()=>{var c;if(await ne(`确定移除 ${((c=B[t])==null?void 0:c.label)||t}？配置将被删除。`))try{await b.removeMessagingPlatform(t),m("已移除","info"),await H(n,i)}catch(f){m("移除失败: "+f,"error")}}})}function ie(n,i){const s=n.querySelector("#platforms-available"),a=new Set(i.configured.map(t=>t.id));s.innerHTML=Object.entries(B).map(([t,o])=>{const c=a.has(t);return`
      <button class="platform-pick" data-pid="${t}">
        <span class="platform-emoji">${h(o.iconName,28)}</span>
        <span class="platform-pick-name">${o.label}</span>
        <span class="platform-pick-desc">${o.desc}</span>
        ${c?'<span class="platform-pick-badge" style="color:var(--success)">已接入 · 点击绑定新 Agent</span>':""}
      </button>
    `}).join(""),s.querySelectorAll(".platform-pick").forEach(t=>{const o=t.dataset.pid,c=a.has(o);t.onclick=()=>c?oe(o,n,i):J(o,n,i)})}async function oe(n,i,s){const a=B[n];if(!a)return;let t=[];try{t=await b.listAgents()}catch{}Array.isArray(t)||(t=[]);const o=G(n),c=(s.bindings||[]).filter(d=>{var g;return((g=d.match)==null?void 0:g.channel)===o}),f=new Set(c.map(d=>d.agentId||"main")),C=t.filter(d=>!f.has(d.id));if(!C.length){m("所有 Agent 都已绑定到该渠道","info");return}const p=C.map(d=>{const g=d.identityName?d.identityName.split(",")[0].trim():d.id;return`<option value="${A(d.id)}">${d.id}${d.id!==g?" — "+g:""}</option>`}).join(""),v=Z({title:`为 ${a.label} 绑定新 Agent`,content:`
      <div style="margin-bottom:var(--space-md)">
        <div class="form-hint" style="margin-bottom:var(--space-sm)">已绑定: ${[...f].join(", ")||"无"}</div>
        <label class="form-label">选择要绑定的 Agent</label>
        <select class="form-input" id="bind-agent-select">${p}</select>
        <div class="form-hint" style="margin-top:4px">该渠道的消息将路由到选中的 Agent 处理</div>
      </div>
    `,buttons:[{label:"绑定",className:"btn btn-primary",id:"btn-bind-agent"}],width:400});v.querySelector("#btn-bind-agent").onclick=async()=>{var g,S,N;const d=(g=v.querySelector("#bind-agent-select"))==null?void 0:g.value;if(!d){m("请选择 Agent","warning");return}try{await X(n,d),m(`已将 ${a.label} 绑定到 Agent「${d}」`,"success"),(S=v.close)!=null&&S.call(v)||((N=v.remove)==null||N.call(v)),await H(i,s)}catch(F){m("绑定失败: "+F,"error")}}}async function J(n,i,s){var K;const a=B[n];if(!a){m("未知平台","error");return}let t={},o=!1,c=[],f="";try{const e=await b.readPlatformConfig(n);e!=null&&e.values&&(t=e.values),e!=null&&e.exists&&(o=!0)}catch{}try{c=await b.listAgents()}catch{}try{const e=await b.readOpenclawConfig(),r=(e==null?void 0:e.bindings)||[],l=G(n),y=r.find(j=>{var P;return((P=j.match)==null?void 0:P.channel)===l});y&&(f=y.agentId||"")}catch{}const C="platform-form-"+Date.now(),p=c.map(e=>{const r=e.identityName?e.identityName.split(",")[0].trim():e.id;return`<option value="${A(e.id)}" ${e.id===f?"selected":""}>${e.id}${e.id!==r?" — "+r:""}</option>`}).join(""),g=`
    ${["feishu","dingtalk","dingtalk-connector"].includes(n)?`
    <div class="form-group">
      <label class="form-label">账号标识（多账号模式）</label>
      <input class="form-input" name="__accountId" placeholder="如 sales、support（留空则为默认账号）" value="">
      <div class="form-hint">为同一平台接入多个应用时，每个应用需要一个唯一的账号标识。不同账号可绑定不同 Agent</div>
    </div>
  `:""}
    <div class="form-group">
      <label class="form-label">绑定 Agent</label>
      <select class="form-input" name="__agentBinding">
        <option value="" ${f?"":"selected"}>默认（main）</option>
        ${p}
      </select>
      <div class="form-hint">选择该渠道消息路由到哪个 Agent 处理。留空则使用默认 Agent（main）</div>
    </div>
  `;if(n==="feishu"&&!t.pluginVersion)try{const e=await b.getChannelPluginStatus("feishu-openclaw-plugin");e!=null&&e.installed?t.pluginVersion="official":t.pluginVersion=localStorage.getItem("clawpanel-feishu-plugin-version")||"builtin"}catch{t.pluginVersion="builtin"}const S=a.fields.map((e,r)=>{const l=t[e.key]||"";return e.type==="select"&&e.options?`
        <div class="form-group">
          <label class="form-label">${e.label}${e.required?" *":""}</label>
          <select class="form-input" name="${e.key}" data-name="${e.key}">
            ${e.options.map(y=>`<option value="${y.value}" ${l===y.value?"selected":""}>${y.label}</option>`).join("")}
          </select>
        </div>
      `:`
      <div class="form-group">
        <label class="form-label">${e.label}${e.required?" *":""}</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" name="${e.key}" type="${e.secret?"password":"text"}"
                 value="${A(l)}" placeholder="${e.placeholder||""}"
                 ${r===0?"autofocus":""} style="flex:1">
          ${e.secret?`<button type="button" class="btn btn-sm btn-secondary toggle-vis" data-field="${e.key}">显示</button>`:""}
        </div>
      </div>
    `}).join(""),N=(K=a.guide)!=null&&K.length?`
    <details style="background:var(--bg-tertiary);padding:12px 16px;border-radius:var(--radius-md);margin-bottom:var(--space-md)">
      <summary style="font-weight:600;font-size:var(--font-size-sm);cursor:pointer;user-select:none">接入步骤 <span style="color:var(--text-tertiary);font-weight:400">（点击展开）</span></summary>
      <ol style="margin:8px 0 0;padding-left:20px;font-size:var(--font-size-sm);color:var(--text-secondary);line-height:1.8">
        ${a.guide.map(e=>`<li>${e}</li>`).join("")}
      </ol>
      ${a.guideFooter||""}
    </details>
  `:"",F=a.pairingChannel?`
    <div style="margin-top:var(--space-md);padding:12px 14px;background:var(--bg-tertiary);border-radius:var(--radius-md)">
      <div style="font-weight:600;font-size:var(--font-size-sm);margin-bottom:6px">配对审批</div>
      <div style="font-size:var(--font-size-xs);color:var(--text-secondary);line-height:1.7;margin-bottom:8px">当机器人提示 <code>access not configured</code>、<code>Pairing code</code> 或要求执行 <code>openclaw pairing approve</code> 时，可直接在这里完成批准。</div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input class="form-input" name="pairingCode" placeholder="例如 R3ZFPWZP" style="flex:1;min-width:180px">
        <button type="button" class="btn btn-sm btn-secondary" id="btn-pairing-list">查看待审批</button>
        <button type="button" class="btn btn-sm btn-primary" id="btn-pairing-approve">批准配对码</button>
      </div>
      <div id="pairing-result" style="margin-top:8px"></div>
    </div>
  `:"",ee=`
    ${N}
    ${!o&&(t.gatewayToken||t.gatewayPassword)?`<div style="background:var(--bg-tertiary);color:var(--text-secondary);padding:8px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm);margin-bottom:var(--space-md)">已从当前 Gateway 鉴权配置中自动带出 ${t.gatewayToken?"Token":"Password"}，通常无需手填</div>`:""}
    ${o?'<div style="background:var(--accent-muted);color:var(--accent);padding:8px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm);margin-bottom:var(--space-md)">当前已有配置，修改后点击保存即可覆盖</div>':""}
    <form id="${C}">
      ${S}
      ${g}
    </form>
    ${F}
    <div id="verify-result" style="margin-top:var(--space-sm)"></div>
  `,u=Z({title:`${o?"编辑":"接入"} ${a.label}`,content:ee,buttons:[{label:"校验凭证",className:"btn btn-secondary",id:"btn-verify"},{label:o?"保存":"接入并保存",className:"btn btn-primary",id:"btn-save"}],width:520});u.addEventListener("click",e=>{const r=e.target.closest("a[href]");if(!r)return;const l=r.getAttribute("href");l&&(l.startsWith("http://")||l.startsWith("https://"))&&(e.preventDefault(),Y(async()=>{const{open:y}=await import("./index-CRKb_1Il.js");return{open:y}},__vite__mapDeps([0,1])).then(({open:y})=>y(l)).catch(()=>window.open(l,"_blank")))}),u.querySelectorAll(".toggle-vis").forEach(e=>{e.onclick=()=>{const r=u.querySelector(`input[name="${e.dataset.field}"]`);if(!r)return;const l=r.type==="password";r.type=l?"text":"password",e.textContent=l?"隐藏":"显示"}});const W=()=>{const e={};return a.fields.forEach(r=>{const l=u.querySelector(`input[name="${r.key}"]`)||u.querySelector(`select[name="${r.key}"]`);l&&(e[r.key]=l.value.trim())}),e},k=u.querySelector("#btn-verify"),x=u.querySelector("#btn-save"),w=u.querySelector("#verify-result"),Q=u.querySelector('input[name="pairingCode"]'),$=u.querySelector("#pairing-result"),z=u.querySelector("#btn-pairing-list"),T=u.querySelector("#btn-pairing-approve");z&&$&&(z.onclick=async()=>{z.disabled=!0,z.textContent="读取中...",$.innerHTML="";try{const e=await b.pairingListChannel(a.pairingChannel);$.innerHTML=`
          <div style="background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:var(--radius-md);padding:10px 12px">
            <div style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-bottom:6px">待审批请求</div>
            <pre style="margin:0;white-space:pre-wrap;word-break:break-word;font-size:12px;color:var(--text-secondary);font-family:var(--font-mono)">${A(e||"暂无待审批请求")}</pre>
          </div>`}catch(e){$.innerHTML=`<div style="color:var(--error);font-size:var(--font-size-sm)">读取失败: ${A(String(e))}</div>`}finally{z.disabled=!1,z.textContent="查看待审批"}}),T&&Q&&$&&(T.onclick=async()=>{const e=Q.value.trim().toUpperCase();if(!e){m("请输入配对码","warning"),Q.focus();return}T.disabled=!0,T.textContent="批准中...",$.innerHTML="";try{const r=await b.pairingApproveChannel(a.pairingChannel,e,!!a.pairingNotify);$.innerHTML=`
          <div style="background:var(--success-muted);color:var(--success);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
            ${h("check",14)} 配对已批准
            <div style="margin-top:6px;font-size:12px;white-space:pre-wrap;word-break:break-word;color:var(--text-secondary)">${A(r||"操作完成")}</div>
          </div>`,Q.value="",m("配对已批准","success")}catch(r){$.innerHTML=`<div style="background:var(--error-muted, #fee2e2);color:var(--error);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">批准失败: ${A(String(r))}</div>`}finally{T.disabled=!1,T.textContent="批准配对码"}}),k.onclick=async()=>{const e=W();for(const r of a.fields)if(r.required&&!e[r.key]){m(`请填写「${r.label}」`,"warning");return}k.disabled=!0,k.textContent="校验中...",w.innerHTML="";try{const r=await b.verifyBotToken(n,e);if(r.valid){const l=(r.details||[]).join(" · ");w.innerHTML=`
          <div style="background:var(--success-muted);color:var(--success);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
            ${h("check",14)} 凭证有效${l?" — "+l:""}
          </div>`}else{const l=(r.errors||["校验失败"]).join("<br>");w.innerHTML=`
          <div style="background:var(--error-muted, #fee2e2);color:var(--error);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
            ${h("x",14)} ${l}
          </div>`}}catch(r){w.innerHTML=`<div style="color:var(--error);font-size:var(--font-size-sm)">校验请求失败: ${r}</div>`}finally{k.disabled=!1,k.textContent="校验凭证"}},x.onclick=async()=>{var r,l,y,j,P;const e=W();for(const q of a.fields)if(q.required&&!e[q.key]){m(`请填写「${q.label}」`,"warning");return}x.disabled=!0,k.disabled=!0,x.textContent="保存中...";try{if(a.pluginRequired){let E=a.pluginRequired,V=a.pluginId||n;if(n==="feishu"){const I=u.querySelector('[data-name="pluginVersion"]'),O=(I==null?void 0:I.value)||"builtin";localStorage.setItem("clawpanel-feishu-plugin-version",O),O==="official"&&(E="@larksuiteoapi/feishu-openclaw-plugin",V="feishu-openclaw-plugin")}const _=await b.getChannelPluginStatus(V);if(!(_!=null&&_.installed)&&!(_!=null&&_.builtin)){x.textContent="安装插件中...",w.innerHTML=`
            <div style="background:var(--bg-tertiary);border-radius:var(--radius-md);padding:12px;margin-top:var(--space-sm)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                ${h("download",14)}
                <span style="font-size:var(--font-size-sm);font-weight:600">安装插件</span>
                <span id="plugin-progress-text" style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-left:auto">0%</span>
              </div>
              <div style="height:4px;background:var(--bg-secondary);border-radius:2px;overflow:hidden;margin-bottom:8px">
                <div id="plugin-progress-bar" style="height:100%;background:var(--accent);width:0%;transition:width 0.3s"></div>
              </div>
              <div id="plugin-log-box" style="font-family:var(--font-mono);font-size:11px;color:var(--text-secondary);max-height:120px;overflow-y:auto;line-height:1.6;white-space:pre-wrap;word-break:break-all"></div>
            </div>
          `;const I=w.querySelector("#plugin-log-box"),O=w.querySelector("#plugin-progress-bar"),ae=w.querySelector("#plugin-progress-text");let D,L;try{const{listen:R}=await Y(async()=>{const{listen:M}=await import("./event-DjZVAIBO.js");return{listen:M}},__vite__mapDeps([2,1]));D=await R("plugin-log",M=>{I.textContent+=M.payload+`
`,I.scrollTop=I.scrollHeight}),L=await R("plugin-progress",M=>{const U=M.payload;O.style.width=U+"%",ae.textContent=U+"%"})}catch{}try{n==="qqbot"?await b.installQqbotPlugin():await b.installChannelPlugin(E,V)}catch(R){m("插件安装失败: "+R,"error"),x.disabled=!1,k.disabled=!1,x.textContent=o?"保存":"接入并保存",D&&D(),L&&L();return}D&&D(),L&&L()}else w.innerHTML=`
            <div style="background:var(--accent-muted);color:var(--accent);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
              ${h("check",14)} 已检测到插件，无需重复安装，本次仅更新配置
            </div>`}x.textContent="写入配置...";const q=((l=(r=u.querySelector('input[name="__accountId"]'))==null?void 0:r.value)==null?void 0:l.trim())||null;await b.saveMessagingPlatform(n,e,q);const te=((y=u.querySelector('select[name="__agentBinding"]'))==null?void 0:y.value)||"";try{await X(n,te,null,q)}catch(E){console.warn("[channels] 保存 Agent 绑定失败:",E)}m(`${a.label} 配置已保存，Gateway 正在重载`,"success"),(j=u.close)!=null&&j.call(u)||((P=u.remove)==null||P.call(u)),await H(i,s)}catch(q){m("保存失败: "+q,"error")}finally{x.disabled=!1,k.disabled=!1,x.textContent=o?"保存":"接入并保存"}}}function G(n){return{qqbot:"qqbot",telegram:"telegram",discord:"discord",feishu:"feishu",dingtalk:"dingtalk-connector"}[n]||n}async function X(n,i,s,a){const t=await b.readOpenclawConfig();if(!t)return;const o=G(n);let c=Array.isArray(t.bindings)?[...t.bindings]:[];const f=p=>{var v,d,g;return((v=p.match)==null?void 0:v.channel)!==o?!1:a?(((d=p.match)==null?void 0:d.accountId)||"")===a:!((g=p.match)!=null&&g.accountId)};s&&(c=c.filter(p=>!(f(p)&&(p.agentId||"main")===s)));const C=i||"main";if(c=c.filter(p=>!(f(p)&&(p.agentId||"main")===C)),i){const p={channel:o};a&&(p.accountId=a),c.push({agentId:i,match:p})}t.bindings=c,await b.writeOpenclawConfig(t)}function A(n){return(n||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}export{de as cleanup,ce as render};

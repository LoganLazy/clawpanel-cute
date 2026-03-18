const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CRKb_1Il.js","assets/core-DhEqZVGG.js","assets/event-DjZVAIBO.js"])))=>i.map(i=>d[i]);
import{a as g,t as v,b as x,_ as te}from"./index-ZS5CnNlZ.js";import{showConfirm as se,showContentModal as ae}from"./modal-DK6Az47R.js";const H={qqbot:{label:"QQ 机器人",iconName:"message-square",desc:"内置 QQ 机器人接入能力，通过 QQ 开放平台快速启用",guide:['使用手机 QQ 扫描二维码，<a href="https://q.qq.com/qqbot/openclaw/login.html" target="_blank" style="color:var(--accent);text-decoration:underline">打开 QQ 机器人开放平台</a> 完成注册登录',"点击「创建机器人」，设置机器人名称和头像","创建完成后，在机器人详情页复制 <b>AppID</b> 和 <b>AppSecret</b>（AppSecret 仅显示一次，请妥善保存）","将 AppID 和 AppSecret 填入下方表单，点击「校验凭证」验证后保存","ClawStar 会自动安装 QQBot 社区插件并写入配置，保存后 Gateway 自动重载生效"],guideFooter:'<div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary)">详细教程：<a href="https://cloud.tencent.com/developer/article/2626045" target="_blank" style="color:var(--accent);text-decoration:underline">腾讯云 - 快速搭建 AI 私人 QQ 助理</a></div>',fields:[{key:"appId",label:"AppID",placeholder:"如 1903224859",required:!0},{key:"appSecret",label:"AppSecret",placeholder:"如 cisldqspngYlyPdc",secret:!0,required:!0}],pluginRequired:"@sliverp/qqbot@latest"},telegram:{label:"Telegram",iconName:"send",desc:"通过 BotFather 创建机器人，用 Bot Token 接入",guide:['在 Telegram 中搜索 <a href="https://t.me/BotFather" target="_blank" style="color:var(--accent);text-decoration:underline">@BotFather</a>，发送 <b>/newbot</b> 创建机器人',"按提示设置机器人名称和用户名，成功后 BotFather 会返回 <b>Bot Token</b>",'获取你的 Telegram 用户 ID：发送消息给 <a href="https://t.me/userinfobot" target="_blank" style="color:var(--accent);text-decoration:underline">@userinfobot</a> 即可查看',"将 Bot Token 和用户 ID 填入下方表单，点击「校验凭证」验证后保存"],fields:[{key:"botToken",label:"Bot Token",placeholder:"123456:ABC-DEF...",secret:!0,required:!0},{key:"allowedUsers",label:"允许的用户 ID",placeholder:"多个用逗号分隔，如 12345, 67890",required:!0}]},feishu:{label:"飞书",iconName:"message-square",desc:"飞书/Lark 企业消息集成，支持文档、多维表格、日历等飞书生态能力",guide:['<b>选择插件版本</b>：<br>• <b>内置插件</b>（默认）— OpenClaw 自带，主要做聊天入口，安装简单<br>• <b>飞书官方插件</b> — 飞书团队开发，能以你的身份操作飞书（写文档、建表、约日程）<br><span style="color:var(--text-tertiary)">两者互斥，只能启用一个</span>','前往 <a href="https://open.feishu.cn/app" target="_blank" style="color:var(--accent);text-decoration:underline">飞书开放平台</a>，创建企业自建应用，在「应用能力」中添加<b>机器人</b>能力',"在<b>凭证与基础信息</b>页面获取 <b>App ID</b> 和 <b>App Secret</b>",'进入<b>权限管理</b>，参照 <a href="https://open.larkoffice.com/document/server-docs/application-scope/scope-list" target="_blank" style="color:var(--accent);text-decoration:underline">权限列表</a> 开通所需权限（<code>im:message</code> 等）',"进入<b>事件订阅</b>，选择<b>使用长连接（WebSocket）</b>模式，订阅<b>接收消息</b>和<b>卡片回调</b>事件。如有 user access token 开关请打开","将 App ID 和 App Secret 填入下方表单，校验后保存",'保存后在飞书中向机器人发消息，获取配对码；你可以直接在下方"配对审批"区域粘贴配对码完成绑定，也可以在终端执行 <code>openclaw pairing approve feishu &lt;配对码&gt; --notify</code>'],guideFooter:'<div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary)">国际版 Lark 用户请将域名切换为 <b>lark</b>。详细教程：<a href="https://www.feishu.cn/content/article/7613711414611463386" target="_blank" style="color:var(--accent);text-decoration:underline">OpenClaw 飞书官方插件使用指南</a> · <a href="https://github.com/AlexAnys/openclaw-feishu" target="_blank" style="color:var(--accent);text-decoration:underline">两个插件怎么选</a></div>',fields:[{key:"appId",label:"App ID",placeholder:"cli_xxxxxxxxxx",required:!0},{key:"appSecret",label:"App Secret",placeholder:"应用密钥",secret:!0,required:!0},{key:"domain",label:"域名",placeholder:"feishu（国际版选 lark）",required:!1},{key:"pluginVersion",label:"插件版本",type:"select",required:!1,options:[{value:"builtin",label:"内置插件（默认，聊天入口）"},{value:"official",label:"飞书官方插件（操作文档/日历/任务）"}]}],pluginRequired:"@openclaw/feishu@latest",pluginId:"feishu",pairingChannel:"feishu",pairingNotify:!0},dingtalk:{label:"钉钉",iconName:"message-square",desc:"钉钉企业内部应用 + 机器人 Stream 模式接入",guide:['前往 <a href="https://open-dev.dingtalk.com/" target="_blank" style="color:var(--accent);text-decoration:underline">钉钉开放平台</a> 创建企业内部应用，并添加<b>机器人</b>能力',"消息接收模式必须选择 <b>Stream 模式</b>，不要选 Webhook","在<b>凭证与基础信息</b>页面复制 <b>Client ID</b> 和 <b>Client Secret</b>；如 Gateway 开启了鉴权，请按 <code>gateway.auth.mode</code> 填写 <b>Gateway Token</b> 或 <b>Gateway Password</b>","在<b>权限管理</b>中至少确认已开通 <code>Card.Streaming.Write</code>、<code>Card.Instance.Write</code>、<code>qyapi_robot_sendmsg</code>，如需文档能力再补文档相关权限","先在钉钉侧<b>发布应用版本</b>，并确认<b>应用可见范围</b>包含你自己和测试成员；否则私聊或加群时可能搜不到机器人","回到 ClawStar 保存。首次保存会自动安装插件，后续保存只更新配置；如果本机已配置 Gateway 鉴权，系统会自动带出对应的 Token 或 Password","私聊测试时，可在钉钉客户端搜索应用/机器人名称，或从工作台进入应用后发起对话；若找不到，优先检查“已发布”和“可见范围”","如果机器人首次私聊返回的是<b>配对码</b>，你可以直接在下方“配对审批”区域粘贴配对码完成授权，也可以在终端执行 <code>openclaw pairing approve dingtalk-connector &lt;配对码&gt;</code>","群聊测试时，先进入目标群 → <b>群设置</b> → <b>智能群助手 / 机器人</b> → <b>添加机器人</b>，搜索并添加该机器人；回群后建议用 <code>@机器人</code> 再发消息，如仍不响应再检查连接器的 <code>groupPolicy</code> 是否被设为 <code>disabled</code>"],guideFooter:'<div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary)">参考资料：<a href="https://open.dingtalk.com/document/dingstart/install-openclaw-locally" target="_blank" style="color:var(--accent);text-decoration:underline">本地安装 OpenClaw</a>、<a href="https://open.dingtalk.com/document/orgapp/use-group-robots" target="_blank" style="color:var(--accent);text-decoration:underline">添加机器人到钉钉群</a>。排障重点：405 通常是 <code>chatCompletions</code> 未启用，401 通常是 Gateway 鉴权字段不匹配。</div>',fields:[{key:"clientId",label:"Client ID",placeholder:"dingxxxxxxxxxx",required:!0},{key:"clientSecret",label:"Client Secret",placeholder:"应用密钥",secret:!0,required:!0},{key:"gatewayToken",label:"Gateway Token",placeholder:"如已开启 Gateway token 鉴权则填写",required:!1},{key:"gatewayPassword",label:"Gateway Password",placeholder:"与 token 二选一，可选",secret:!0,required:!1}],pluginRequired:"@dingtalk-real-ai/dingtalk-connector",pluginId:"dingtalk-connector",pairingChannel:"dingtalk-connector"},discord:{label:"Discord",iconName:"message-circle",desc:"通过 Discord Developer Portal 创建 Bot 应用接入",guide:['前往 <a href="https://discord.com/developers/applications" target="_blank" style="color:var(--accent);text-decoration:underline">Discord Developer Portal</a>，点击 New Application 创建应用',"进入应用 → 左侧 <b>Bot</b> 页面 → 点击 Reset Token 生成 Bot Token，并开启 <b>Message Content Intent</b>","左侧 <b>OAuth2</b> → URL Generator，勾选 bot 权限，复制链接将 Bot 邀请到你的服务器","将 Bot Token 和服务器 ID 填入下方表单，点击「校验凭证」验证后保存"],fields:[{key:"token",label:"Bot Token",placeholder:"MTIz...",secret:!0,required:!0},{key:"guildId",label:"服务器 ID",placeholder:"右键服务器 → 复制服务器 ID",required:!1},{key:"channelId",label:"频道 ID（可选）",placeholder:"不填则监听所有频道",required:!1}]}};async function ge(){const a=document.createElement("div");return a.className="page",a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">消息渠道</h1>
      <p class="page-desc">支持 QQ、Telegram、Discord、飞书、钉钉等消息渠道接入</p>
    </div>
    <div id="platforms-configured" style="margin-bottom:var(--space-lg)"></div>
    <div class="config-section">
      <div class="config-section-title">可接入平台</div>
      <div id="platforms-available" class="platforms-grid"></div>
    </div>
  `,await E(a,{configured:[]}),a}function be(){}async function E(a,r){try{const c=await g.listConfiguredPlatforms();r.configured=Array.isArray(c)?c:[]}catch(c){v("加载平台列表失败: "+c,"error"),r.configured=[]}try{const c=await g.readOpenclawConfig();r.bindings=Array.isArray(c==null?void 0:c.bindings)?c.bindings:[]}catch{r.bindings=[]}le(a,r),ce(a,r)}function le(a,r){const c=a.querySelector("#platforms-configured");if(!r.configured.length){c.innerHTML="";return}c.innerHTML=`
    <div class="config-section">
      <div class="config-section-title">已接入</div>
      <div class="platforms-grid">
        ${r.configured.flatMap(n=>{const t=H[n.id],i=(t==null?void 0:t.label)||n.id,o=x((t==null?void 0:t.iconName)||"radio",22),b=n.accounts||[];if(b.length)return b.map(m=>{const S=O(n.id,m.id),P=(r.bindings||[]).filter(z=>{var $;return(($=z.match)==null?void 0:$.channel)===S}).map(z=>z.agentId||"main"),s=P.length>1||P.length===1&&P[0]!=="main"?P.map(z=>`<span style="font-size:var(--font-size-xs);color:var(--accent);background:var(--accent-muted);padding:1px 6px;border-radius:10px;white-space:nowrap">→ ${A(z)}</span>`).join(" "):"";return`
                <div class="platform-card ${m.enabled?"active":"inactive"}" data-pid="${n.id}" data-account="${m.id}">
                  <div class="platform-card-header">
                    <span class="platform-emoji">${o}</span>
                    <span class="platform-name">${i}</span>
                    <span class="badge badge-secondary" style="margin-left:6px">${A(m.id)}</span>
                    ${s}
                    <span class="platform-status-dot ${m.enabled?"on":"off"}"></span>
                  </div>
                  <div class="platform-card-actions">
                    <button class="btn btn-sm btn-secondary" data-action="edit">${x("edit",14)} 编辑</button>
                    <button class="btn btn-sm btn-secondary" data-action="toggle">${m.enabled?x("pause",14)+" 禁用":x("play",14)+" 启用"}</button>
                    <button class="btn btn-sm btn-danger" data-action="remove">${x("trash",14)}</button>
                  </div>
                </div>
              `});const y=O(n.id),u=(r.bindings||[]).filter(m=>{var S;return((S=m.match)==null?void 0:S.channel)===y}).map(m=>m.agentId||"main"),w=u.length>1||u.length===1&&u[0]!=="main"?u.map(m=>`<span style="font-size:var(--font-size-xs);color:var(--accent);background:var(--accent-muted);padding:1px 6px;border-radius:10px;white-space:nowrap">→ ${A(m)}</span>`).join(" "):"";return[`
            <div class="platform-card ${n.enabled?"active":"inactive"}" data-pid="${n.id}">
              <div class="platform-card-header">
                <span class="platform-emoji">${o}</span>
                <span class="platform-name">${i}</span>
                ${w}
                <span class="platform-status-dot ${n.enabled?"on":"off"}"></span>
              </div>
              <div class="platform-card-actions">
                <button class="btn btn-sm btn-secondary" data-action="edit">${x("edit",14)} 编辑</button>
                <button class="btn btn-sm btn-secondary" data-action="toggle">${n.enabled?x("pause",14)+" 禁用":x("play",14)+" 启用"}</button>
                <button class="btn btn-sm btn-danger" data-action="remove">${x("trash",14)}</button>
              </div>
            </div>
          `]}).join("")}
      </div>
    </div>
  `,c.querySelectorAll(".platform-card").forEach(n=>{const t=n.dataset.pid,i=n.dataset.account||null;n.querySelector('[data-action="edit"]').onclick=()=>ne(t,a,r,i),n.querySelector('[data-action="toggle"]').onclick=async()=>{var b;const o=r.configured.find(y=>y.id===t);if(o)try{await g.toggleMessagingPlatform(t,!o.enabled,i),v(`${((b=H[t])==null?void 0:b.label)||t} 已${o.enabled?"禁用":"启用"}`,"success"),await E(a,r)}catch(y){v("操作失败: "+y,"error")}},n.querySelector('[data-action="remove"]').onclick=async()=>{var b;if(await se(`确定移除 ${((b=H[t])==null?void 0:b.label)||t}？配置将被删除。`))try{await g.removeMessagingPlatform(t,i),v("已移除","info"),await E(a,r)}catch(y){v("移除失败: "+y,"error")}}})}function ce(a,r){const c=a.querySelector("#platforms-available"),n=new Set(r.configured.map(t=>t.id));c.innerHTML=Object.entries(H).map(([t,i])=>{const o=n.has(t);return`
      <button class="platform-pick" data-pid="${t}">
        <span class="platform-emoji">${x(i.iconName,28)}</span>
        <span class="platform-pick-name">${i.label}</span>
        <span class="platform-pick-desc">${i.desc}</span>
        ${o?'<span class="platform-pick-badge" style="color:var(--success)">已接入 · 点击绑定新 Agent</span>':""}
      </button>
    `}).join(""),c.querySelectorAll(".platform-pick").forEach(t=>{const i=t.dataset.pid,o=n.has(i);t.onclick=()=>o?de(i,a,r):ne(i,a,r)})}async function de(a,r,c){const n=H[a];if(!n)return;let t=[];try{t=await g.listAgents()}catch{}Array.isArray(t)||(t=[]);const i=O(a,accountId),o=(c.bindings||[]).filter(p=>{var w;return((w=p.match)==null?void 0:w.channel)===i}),b=new Set(o.map(p=>p.agentId||"main")),y=t.filter(p=>!b.has(p.id));if(!y.length){v("所有 Agent 都已绑定到该渠道","info");return}const f=y.map(p=>{const w=p.identityName?p.identityName.split(",")[0].trim():p.id;return`<option value="${A(p.id)}">${p.id}${p.id!==w?" — "+w:""}</option>`}).join(""),u=ae({title:`为 ${n.label} 绑定新 Agent`,content:`
      <div style="margin-bottom:var(--space-md)">
        <div class="form-hint" style="margin-bottom:var(--space-sm)">已绑定: ${[...b].join(", ")||"无"}</div>
        <label class="form-label">选择要绑定的 Agent</label>
        <select class="form-input" id="bind-agent-select">${f}</select>
        <div class="form-hint" style="margin-top:4px">该渠道的消息将路由到选中的 Agent 处理</div>
      </div>
    `,buttons:[{label:"绑定",className:"btn btn-primary",id:"btn-bind-agent"}],width:400});u.querySelector("#btn-bind-agent").onclick=async()=>{var w,m,S;const p=(w=u.querySelector("#bind-agent-select"))==null?void 0:w.value;if(!p){v("请选择 Agent","warning");return}try{await re(a,p),v(`已将 ${n.label} 绑定到 Agent「${p}」`,"success"),(m=u.close)!=null&&m.call(u)||((S=u.remove)==null||S.call(u)),await E(r,c)}catch(R){v("绑定失败: "+R,"error")}}}async function ne(a,r,c,n=null){var Y;const t=H[a];if(!t){v("未知平台","error");return}let i={},o=!1,b=[],y="";try{const e=await g.readPlatformConfig(a,n);e!=null&&e.values&&(i=e.values),e!=null&&e.exists&&(o=!0)}catch{}try{b=await g.listAgents()}catch{}try{const e=await g.readOpenclawConfig(),l=(e==null?void 0:e.bindings)||[],d=O(a,n),h=l.find(k=>{var q;return((q=k.match)==null?void 0:q.channel)===d});h&&(y=h.agentId||"")}catch{}const f="platform-form-"+Date.now(),u=b.map(e=>{const l=e.identityName?e.identityName.split(",")[0].trim():e.id;return`<option value="${A(e.id)}" ${e.id===y?"selected":""}>${e.id}${e.id!==l?" — "+l:""}</option>`}).join(""),m=`
    ${["feishu","dingtalk","dingtalk-connector","qqbot"].includes(a)?`
    <div class="form-group">
      <label class="form-label">账号标识（多账号模式）</label>
      <input class="form-input" name="__accountId" placeholder="如 sales、support（留空则为默认账号）" value="">
      <div class="form-hint">为同一平台接入多个应用时，每个应用需要一个唯一的账号标识。不同账号可绑定不同 Agent</div>
    </div>
  `:""}
    <div class="form-group">
      <label class="form-label">绑定 Agent</label>
      <select class="form-input" name="__agentBinding">
        <option value="" ${y?"":"selected"}>默认（main）</option>
        ${u}
      </select>
      <div class="form-hint">选择该渠道消息路由到哪个 Agent 处理。留空则使用默认 Agent（main）</div>
    </div>
  `;if(a==="feishu"&&!i.pluginVersion)try{const e=await g.getChannelPluginStatus("feishu-openclaw-plugin");e!=null&&e.installed?i.pluginVersion="official":i.pluginVersion=localStorage.getItem("clawpanel-feishu-plugin-version")||"builtin"}catch{i.pluginVersion="builtin"}const S=t.fields.map((e,l)=>{const d=i[e.key]||"";return e.type==="select"&&e.options?`
        <div class="form-group">
          <label class="form-label">${e.label}${e.required?" *":""}</label>
          <select class="form-input" name="${e.key}" data-name="${e.key}">
            ${e.options.map(h=>`<option value="${h.value}" ${d===h.value?"selected":""}>${h.label}</option>`).join("")}
          </select>
        </div>
      `:`
      <div class="form-group">
        <label class="form-label">${e.label}${e.required?" *":""}</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" name="${e.key}" type="${e.secret?"password":"text"}"
                 value="${A(d)}" placeholder="${e.placeholder||""}"
                 ${l===0?"autofocus":""} style="flex:1">
          ${e.secret?`<button type="button" class="btn btn-sm btn-secondary toggle-vis" data-field="${e.key}">显示</button>`:""}
        </div>
      </div>
    `}).join(""),R=(Y=t.guide)!=null&&Y.length?`
    <details style="background:var(--bg-tertiary);padding:12px 16px;border-radius:var(--radius-md);margin-bottom:var(--space-md)">
      <summary style="font-weight:600;font-size:var(--font-size-sm);cursor:pointer;user-select:none">接入步骤 <span style="color:var(--text-tertiary);font-weight:400">（点击展开）</span></summary>
      <ol style="margin:8px 0 0;padding-left:20px;font-size:var(--font-size-sm);color:var(--text-secondary);line-height:1.8">
        ${t.guide.map(e=>`<li>${e}</li>`).join("")}
      </ol>
      ${t.guideFooter||""}
    </details>
  `:"",P=t.pairingChannel?`
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
  `:"",U=`
    ${R}
    ${!o&&(i.gatewayToken||i.gatewayPassword)?`<div style="background:var(--bg-tertiary);color:var(--text-secondary);padding:8px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm);margin-bottom:var(--space-md)">已从当前 Gateway 鉴权配置中自动带出 ${i.gatewayToken?"Token":"Password"}，通常无需手填</div>`:""}
    ${o?'<div style="background:var(--accent-muted);color:var(--accent);padding:8px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm);margin-bottom:var(--space-md)">当前已有配置，修改后点击保存即可覆盖</div>':""}
    <form id="${f}">
      ${S}
      ${m}
    </form>
    ${P}
    <div id="verify-result" style="margin-top:var(--space-sm)"></div>
  `,s=ae({title:`${o?"编辑":"接入"} ${t.label}`,content:U,buttons:[{label:"校验凭证",className:"btn btn-secondary",id:"btn-verify"},{label:o?"保存":"接入并保存",className:"btn btn-primary",id:"btn-save"}],width:520});s.addEventListener("click",e=>{const l=e.target.closest("a[href]");if(!l)return;const d=l.getAttribute("href");d&&(d.startsWith("http://")||d.startsWith("https://"))&&(e.preventDefault(),te(async()=>{const{open:h}=await import("./index-CRKb_1Il.js");return{open:h}},__vite__mapDeps([0,1])).then(({open:h})=>h(d)).catch(()=>window.open(d,"_blank")))}),s.querySelectorAll(".toggle-vis").forEach(e=>{e.onclick=()=>{const l=s.querySelector(`input[name="${e.dataset.field}"]`);if(!l)return;const d=l.type==="password";l.type=d?"text":"password",e.textContent=d?"隐藏":"显示"}});const z=()=>{const e={};return t.fields.forEach(l=>{const d=s.querySelector(`input[name="${l.key}"]`)||s.querySelector(`select[name="${l.key}"]`);d&&(e[l.key]=d.value.trim())}),e},$=s.querySelector("#btn-verify"),C=s.querySelector("#btn-save"),I=s.querySelector("#verify-result"),G=s.querySelector('input[name="pairingCode"]'),_=s.querySelector("#pairing-result"),D=s.querySelector("#btn-pairing-list"),L=s.querySelector("#btn-pairing-approve");D&&_&&(D.onclick=async()=>{D.disabled=!0,D.textContent="读取中...",_.innerHTML="";try{const e=await g.pairingListChannel(t.pairingChannel);_.innerHTML=`
          <div style="background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:var(--radius-md);padding:10px 12px">
            <div style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-bottom:6px">待审批请求</div>
            <pre style="margin:0;white-space:pre-wrap;word-break:break-word;font-size:12px;color:var(--text-secondary);font-family:var(--font-mono)">${A(e||"暂无待审批请求")}</pre>
          </div>`}catch(e){_.innerHTML=`<div style="color:var(--error);font-size:var(--font-size-sm)">读取失败: ${A(String(e))}</div>`}finally{D.disabled=!1,D.textContent="查看待审批"}}),L&&G&&_&&(L.onclick=async()=>{const e=G.value.trim().toUpperCase();if(!e){v("请输入配对码","warning"),G.focus();return}L.disabled=!0,L.textContent="批准中...",_.innerHTML="";try{const l=await g.pairingApproveChannel(t.pairingChannel,e,!!t.pairingNotify);_.innerHTML=`
          <div style="background:var(--success-muted);color:var(--success);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
            ${x("check",14)} 配对已批准
            <div style="margin-top:6px;font-size:12px;white-space:pre-wrap;word-break:break-word;color:var(--text-secondary)">${A(l||"操作完成")}</div>
          </div>`,G.value="",v("配对已批准","success")}catch(l){_.innerHTML=`<div style="background:var(--error-muted, #fee2e2);color:var(--error);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">批准失败: ${A(String(l))}</div>`}finally{L.disabled=!1,L.textContent="批准配对码"}}),$.onclick=async()=>{var l,d,h;const e=z();(d=(l=s.querySelector('input[name="__accountId"]'))==null?void 0:l.value)!=null&&d.trim(),(h=s.querySelector('select[name="__agentBinding"]'))!=null&&h.value;for(const k of t.fields)if(k.required&&!e[k.key]){v(`请填写「${k.label}」`,"warning");return}$.disabled=!0,$.textContent="校验中...",I.innerHTML="";try{const k=await g.verifyBotToken(a,e);if(k.valid){const q=(k.details||[]).join(" · ");I.innerHTML=`
          <div style="background:var(--success-muted);color:var(--success);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
            ${x("check",14)} 凭证有效${q?" — "+q:""}
          </div>`}else{const q=(k.errors||["校验失败"]).join("<br>");I.innerHTML=`
          <div style="background:var(--error-muted, #fee2e2);color:var(--error);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
            ${x("x",14)} ${q}
          </div>`}}catch(k){I.innerHTML=`<div style="color:var(--error);font-size:var(--font-size-sm)">校验请求失败: ${k}</div>`}finally{$.disabled=!1,$.textContent="校验凭证"}},C.onclick=async()=>{var l,d,h,k,q,Z,J,X;const e=z();(d=(l=s.querySelector('input[name="__accountId"]'))==null?void 0:l.value)!=null&&d.trim(),(h=s.querySelector('select[name="__agentBinding"]'))!=null&&h.value;for(const T of t.fields)if(T.required&&!e[T.key]){v(`请填写「${T.label}」`,"warning");return}C.disabled=!0,$.disabled=!0,C.textContent="保存中...";try{if(t.pluginRequired){let F=t.pluginRequired,K=t.pluginId||a;if(a==="feishu"){const B=s.querySelector('[data-name="pluginVersion"]'),V=(B==null?void 0:B.value)||"builtin";localStorage.setItem("clawpanel-feishu-plugin-version",V),V==="official"&&(F="@larksuiteoapi/feishu-openclaw-plugin",K="feishu-openclaw-plugin")}const M=await g.getChannelPluginStatus(K);if(!(M!=null&&M.installed)&&!(M!=null&&M.builtin)){C.textContent="安装插件中...",I.innerHTML=`
            <div style="background:var(--bg-tertiary);border-radius:var(--radius-md);padding:12px;margin-top:var(--space-sm)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                ${x("download",14)}
                <span style="font-size:var(--font-size-sm);font-weight:600">安装插件</span>
                <span id="plugin-progress-text" style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-left:auto">0%</span>
              </div>
              <div style="height:4px;background:var(--bg-secondary);border-radius:2px;overflow:hidden;margin-bottom:8px">
                <div id="plugin-progress-bar" style="height:100%;background:var(--accent);width:0%;transition:width 0.3s"></div>
              </div>
              <div id="plugin-log-box" style="font-family:var(--font-mono);font-size:11px;color:var(--text-secondary);max-height:120px;overflow-y:auto;line-height:1.6;white-space:pre-wrap;word-break:break-all"></div>
            </div>
          `;const B=I.querySelector("#plugin-log-box"),V=I.querySelector("#plugin-progress-bar"),oe=I.querySelector("#plugin-progress-text");let N,j;try{const{listen:W}=await te(async()=>{const{listen:Q}=await import("./event-DjZVAIBO.js");return{listen:Q}},__vite__mapDeps([2,1]));N=await W("plugin-log",Q=>{B.textContent+=Q.payload+`
`,B.scrollTop=B.scrollHeight}),j=await W("plugin-progress",Q=>{const ee=Q.payload;V.style.width=ee+"%",oe.textContent=ee+"%"})}catch{}try{a==="qqbot"?await g.installQqbotPlugin():await g.installChannelPlugin(F,K)}catch(W){v("插件安装失败: "+W,"error"),C.disabled=!1,$.disabled=!1,C.textContent=o?"保存":"接入并保存",N&&N(),j&&j();return}N&&N(),j&&j()}else I.innerHTML=`
            <div style="background:var(--accent-muted);color:var(--accent);padding:10px 14px;border-radius:var(--radius-md);font-size:var(--font-size-sm)">
              ${x("check",14)} 已检测到插件，无需重复安装，本次仅更新配置
            </div>`}C.textContent="写入配置...";const T=((q=(k=s.querySelector('input[name="__accountId"]'))==null?void 0:k.value)==null?void 0:q.trim())||null;await g.saveMessagingPlatform(a,e,T);const ie=((Z=s.querySelector('select[name="__agentBinding"]'))==null?void 0:Z.value)||"";try{await re(a,ie,null,T)}catch(F){console.warn("[channels] 保存 Agent 绑定失败:",F)}v(`${t.label} 配置已保存，Gateway 正在重载`,"success"),(J=s.close)!=null&&J.call(s)||((X=s.remove)==null||X.call(s)),await E(r,c)}catch(T){v("保存失败: "+T,"error")}finally{C.disabled=!1,$.disabled=!1,C.textContent=o?"保存":"接入并保存"}}}function O(a,r=null){const n={qqbot:"qqbot",telegram:"telegram",discord:"discord",feishu:"feishu",dingtalk:"dingtalk-connector"}[a]||a;return r?`${n}:${r}`:n}async function re(a,r,c,n){const t=await g.readOpenclawConfig();if(!t)return;const i=O(a,n);let o=Array.isArray(t.bindings)?[...t.bindings]:[];const b=f=>{var u,p,w;return((u=f.match)==null?void 0:u.channel)!==i?!1:n?(((p=f.match)==null?void 0:p.accountId)||"")===n:!((w=f.match)!=null&&w.accountId)};c&&(o=o.filter(f=>!(b(f)&&(f.agentId||"main")===c)));const y=r||"main";if(o=o.filter(f=>!(b(f)&&(f.agentId||"main")===y)),r){const f={channel:i};n&&(f.accountId=n),o.push({agentId:r,match:f})}t.bindings=o,await g.writeOpenclawConfig(t)}function A(a){return(a||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}export{be as cleanup,ge as render};

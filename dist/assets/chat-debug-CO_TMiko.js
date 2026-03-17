import{w as z,a as $,b as s,s as e,c as q,d as O,e as F,g as H}from"./index-BeJpi4vN.js";async function P(){const a=document.createElement("div");return a.className="page",a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">系统诊断</h1>
      <p class="page-desc">全面检测系统状态，快速定位问题</p>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary btn-sm" id="btn-refresh">刷新状态</button>
        <button class="btn btn-secondary btn-sm" id="btn-test-ws">测试 WebSocket</button>
        <button class="btn btn-secondary btn-sm" id="btn-network-log">网络日志</button>
        <button class="btn btn-warning btn-sm" id="btn-fix-pairing">一键修复配对</button>
      </div>
    </div>
    <div id="debug-content"></div>
    <div id="ws-test-log" style="display:none;margin-top:16px;background:var(--bg-secondary);border-radius:6px;padding:12px">
      <div style="font-weight:600;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
        <span>WebSocket 连接测试</span>
        <button class="btn btn-sm" id="btn-clear-log" style="padding:4px 8px;font-size:11px">清空</button>
      </div>
      <pre id="ws-log-content" style="font-size:11px;line-height:1.5;max-height:400px;overflow:auto;margin:0;color:var(--text-primary)"></pre>
    </div>
    <div id="network-log" style="display:none;margin-top:16px;background:var(--bg-secondary);border-radius:6px;padding:12px">
      <div style="font-weight:600;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
        <span>网络请求日志（最近 100 条）</span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm" id="btn-refresh-network" style="padding:4px 8px;font-size:11px">刷新</button>
          <button class="btn btn-sm" id="btn-clear-network" style="padding:4px 8px;font-size:11px">清空</button>
        </div>
      </div>
      <div id="network-log-content" style="font-size:11px;line-height:1.5;max-height:400px;overflow:auto"></div>
    </div>
  `,a.querySelector("#btn-refresh").addEventListener("click",()=>W(a)),a.querySelector("#btn-test-ws").addEventListener("click",()=>j(a)),a.querySelector("#btn-network-log").addEventListener("click",()=>J(a)),a.querySelector("#btn-fix-pairing").addEventListener("click",()=>K(a)),W(a),a}async function W(a){var d,n,c;const t=a.querySelector("#debug-content"),r={timestamp:new Date().toLocaleString("zh-CN"),appState:{openclawReady:F(),gatewayRunning:O()},wsClient:{connected:z.connected,gatewayReady:z.gatewayReady,sessionKey:z.sessionKey},config:null,configError:null,services:null,servicesError:null,version:null,versionError:null,node:null,nodeError:null,connectFrame:null,connectFrameError:null};await Promise.allSettled([$.readOpenclawConfig().then(o=>{r.config=o}).catch(o=>{r.configError=String(o)}),$.getServicesStatus().then(o=>{r.services=o}).catch(o=>{r.servicesError=String(o)}),$.getVersionInfo().then(o=>{r.version=o}).catch(o=>{r.versionError=String(o)}),$.checkNode().then(o=>{r.node=o}).catch(o=>{r.nodeError=String(o)})]);try{const o=(c=(n=(d=r.config)==null?void 0:d.gateway)==null?void 0:n.auth)==null?void 0:c.token,i=typeof o=="string"?o:"";r.connectFrame=await $.createConnectFrame("test-nonce",i)}catch(o){r.connectFrameError=String(o)}D(t,r)}function D(a,t){var n,c,o,i,y,h,x,f,u,C,g,S,G,R,m,b;let r='<div style="font-family:monospace;font-size:12px;line-height:1.6">';const d=t.appState.openclawReady&&t.appState.gatewayRunning&&t.wsClient.gatewayReady;if(r+=`<div class="config-section" style="background:${d?"var(--success-bg)":"var(--warning-bg)"};border-left:3px solid ${d?"var(--success)":"var(--warning)"}">
    <div style="font-size:16px;font-weight:600;margin-bottom:8px">${d?`${e("ok")} 系统正常`:`${e("warn")} 发现问题`}</div>
    <div style="color:var(--text-secondary);font-size:13px">${d?"所有核心功能运行正常":"部分功能异常，请查看下方详情"}</div>
  </div>`,r+=`<div class="config-section">
    <div class="config-section-title">应用状态</div>
    <table class="debug-table">
      <tr><td>OpenClaw 就绪</td><td>${t.appState.openclawReady?e("ok"):e("err")}</td></tr>
      <tr><td>Gateway 运行中</td><td>${t.appState.gatewayRunning?e("ok"):e("err")}</td></tr>
    </table>
  </div>`,r+=`<div class="config-section">
    <div class="config-section-title">WebSocket 连接</div>
    <table class="debug-table">
      <tr><td>连接状态</td><td>${t.wsClient.connected?`${e("ok")} 已连接`:`${e("err")} 未连接`}</td></tr>
      <tr><td>握手状态</td><td>${t.wsClient.gatewayReady?`${e("ok")} 已完成`:`${e("err")} 未完成`}</td></tr>
      <tr><td>会话密钥</td><td>${t.wsClient.sessionKey||"(空)"}</td></tr>
    </table>
  </div>`,r+=`<div class="config-section">
    <div class="config-section-title">Node.js 环境</div>`,t.nodeError?r+=`<div style="color:var(--error)">${e("err")} ${v(t.nodeError)}</div>`:t.node&&(r+=`<table class="debug-table">
      <tr><td>安装状态</td><td>${t.node.installed?`${e("ok")} 已安装`:`${e("err")} 未安装`}</td></tr>
      <tr><td>版本</td><td>${t.node.version||"(未知)"}</td></tr>
    </table>`),r+="</div>",r+=`<div class="config-section">
    <div class="config-section-title">版本信息</div>`,t.versionError?r+=`<div style="color:var(--error)">${e("err")} ${v(t.versionError)}</div>`:t.version&&(r+=`<table class="debug-table">
      <tr><td>当前版本</td><td>${t.version.current||"(未知)"}</td></tr>
      <tr><td>推荐稳定版</td><td>${t.version.recommended||"(未检测)"}</td></tr>
      <tr><td>面板版本</td><td>${t.version.panel_version||"(未知)"}</td></tr>
      <tr><td>最新上游</td><td>${t.version.latest||"(未检测)"}</td></tr>
      <tr><td>偏离推荐版</td><td>${t.version.ahead_of_recommended?`${e("warn")} 当前版本过高，建议回退`:t.version.is_recommended?`${e("ok")} 已对齐`:`${e("warn")} 需要切换`}</td></tr>
      <tr><td>最新上游可用</td><td>${t.version.latest_update_available?`${e("warn")} 有更新`:`${e("ok")} 无更新`}</td></tr>
    </table>`),r+="</div>",r+=`<div class="config-section">
    <div class="config-section-title">配置文件</div>`,t.configError)r+=`<div style="color:var(--error)">${e("err")} ${v(t.configError)}</div>`;else if(t.config){const l=t.config.gateway||{};r+=`<table class="debug-table">
      <tr><td>gateway.port</td><td>${l.port||"(未设置)"}</td></tr>
      <tr><td>gateway.auth.token</td><td>${(n=l.auth)!=null&&n.token?`${e("ok")} 已设置${typeof l.auth.token=="object"?" (SecretRef)":""}`:`${e("warn")} 未设置`}</td></tr>
      <tr><td>gateway.enabled</td><td>${l.enabled!==!1?e("ok"):e("err")}</td></tr>
      <tr><td>gateway.mode</td><td>${l.mode||"local"}</td></tr>
    </table>`}if(r+="</div>",r+=`<div class="config-section">
    <div class="config-section-title">服务状态</div>`,t.servicesError)r+=`<div style="color:var(--error)">${e("err")} ${v(t.servicesError)}</div>`;else if(((c=t.services)==null?void 0:c.length)>0){const l=t.services[0];r+=`<table class="debug-table">
      <tr><td>CLI 安装</td><td>${l.cli_installed!==!1?`${e("ok")} 已安装`:`${e("err")} 未安装`}</td></tr>
      <tr><td>运行状态</td><td>${l.running?`${e("ok")} 运行中`:`${e("err")} 已停止`}</td></tr>
      <tr><td>进程 PID</td><td>${l.pid||"(无)"}</td></tr>
      <tr><td>服务标签</td><td>${l.label||"(未知)"}</td></tr>
    </table>`}if(r+="</div>",r+=`<div class="config-section">
    <div class="config-section-title">设备密钥 & 握手签名</div>`,t.connectFrameError)r+=`<div style="color:var(--error)">${e("err")} ${v(t.connectFrameError)}</div>`;else if(t.connectFrame){const l=(o=t.connectFrame.params)==null?void 0:o.device;r+=`<div style="color:var(--success);margin-bottom:8px">${e("ok")} 设备密钥生成成功</div>
    <table class="debug-table">
      <tr><td>设备 ID</td><td style="font-size:10px;word-break:break-all">${(l==null?void 0:l.id)||"(无)"}</td></tr>
      <tr><td>公钥</td><td style="font-size:10px;word-break:break-all">${l!=null&&l.publicKey?l.publicKey.substring(0,32)+"...":"(无)"}</td></tr>
      <tr><td>签名时间</td><td>${(l==null?void 0:l.signedAt)||"(无)"}</td></tr>
    </table>
    <details style="margin-top:8px">
      <summary style="cursor:pointer;color:var(--text-secondary);font-size:12px">查看完整 Connect Frame</summary>
      <pre style="background:var(--bg-secondary);padding:8px;border-radius:4px;overflow:auto;max-height:300px;font-size:11px">${v(JSON.stringify(t.connectFrame,null,2))}</pre>
    </details>`}r+="</div>",r+=`<div class="config-section">
    <div class="config-section-title">诊断建议</div>
    <ul style="margin:0;padding-left:20px;color:var(--text-secondary);font-size:13px">`,(i=t.node)!=null&&i.installed||(r+=`<li style="color:var(--error);margin-bottom:6px">${e("err")} Node.js 未安装，请先安装 Node.js（<a href="https://nodejs.org/" target="_blank" rel="noopener">下载地址</a>）</li>`),t.configError&&(r+=`<li style="color:var(--error);margin-bottom:6px">${e("err")} 配置文件不存在或损坏，请前往"初始设置"页面完成配置</li>`),(t.servicesError||!((y=t.services)!=null&&y.length)||((h=t.services[0])==null?void 0:h.cli_installed)===!1)&&(r+=`<li style="color:var(--error);margin-bottom:6px">${e("err")} OpenClaw CLI 未安装，请前往"初始设置"页面安装</li>`),((x=t.services)==null?void 0:x.length)>0&&!((f=t.services[0])!=null&&f.running)&&(r+=`<li style="color:var(--warning);margin-bottom:6px">${e("warn")} Gateway 未启动，请前往"服务管理"页面启动服务</li>`),t.config&&!((C=(u=t.config.gateway)==null?void 0:u.auth)!=null&&C.token)?r+=`<li style="color:var(--warning);margin-bottom:6px">${e("warn")} Gateway token 未设置（本地开发可选，生产环境建议设置）</li>`:t.config&&typeof((S=(g=t.config.gateway)==null?void 0:g.auth)==null?void 0:S.token)=="object"&&(r+=`<li style="margin-bottom:6px">${e("ok")} Gateway token 通过环境变量/引用配置（SecretRef）</li>`),t.connectFrameError&&(r+=`<li style="color:var(--error);margin-bottom:6px">${e("err")} 设备密钥生成失败，请检查 Rust 后端日志</li>`),!t.wsClient.connected&&((G=t.services)==null?void 0:G.length)>0&&((R=t.services[0])!=null&&R.running)&&(r+=`<li style="color:var(--warning);margin-bottom:6px">${e("warn")} Gateway 运行中但 WebSocket 未连接，常见原因：<strong>origin not allowed</strong>（Tauri origin 未在白名单）或端口 ${((b=(m=t.config)==null?void 0:m.gateway)==null?void 0:b.port)||18789} 被占用。点击“一键修复配对”可自动修复 origin 问题</li>`),t.wsClient.connected&&!t.wsClient.gatewayReady&&(r+=`<li style="color:var(--warning);margin-bottom:6px">${e("warn")} WebSocket 已连接但握手未完成，请检查 token 是否正确</li>`),d&&(r+=`<li style="color:var(--success);margin-bottom:6px">${e("ok")} 所有检测项正常，系统运行良好</li>`),r+="</ul></div>",r+=`<div style="margin-top:16px;padding:8px;background:var(--bg-secondary);border-radius:4px;font-size:11px;color:var(--text-tertiary)">检测时间: ${t.timestamp}</div>`,r+="</div>",a.innerHTML=r}function v(a){return a?String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}let k=null,L=[];function j(a){const t=a.querySelector("#ws-test-log"),r=a.querySelector("#ws-log-content"),d=a.querySelector("#btn-clear-log");t.style.display="block",L=[],d.onclick=()=>{L=[],r.innerHTML=""},n(`${s("search",14)} 开始 WebSocket 连接测试...`),k&&(k.close(),k=null),$.readOpenclawConfig().then(c=>{var f,u,C;const o=((f=c==null?void 0:c.gateway)==null?void 0:f.port)||18789,i=(C=(u=c==null?void 0:c.gateway)==null?void 0:u.auth)==null?void 0:C.token,y=typeof i=="string"?i:"",x=`ws://${window.__TAURI_INTERNALS__?`127.0.0.1:${o}`:location.host}/ws?token=${encodeURIComponent(y)}`;n(`${s("radio",14)} 连接地址: ${x}`),n(`${s("key",14)} Token: ${y?y.substring(0,20)+"...":"(空)"}`),n(`${s("clock",14)} 正在连接...`);try{k=new WebSocket(x),k.onopen=()=>{n(`${e("ok",14)} WebSocket 连接成功`),n(`${s("clock",14)} 等待 Gateway 发送 connect.challenge...`)},k.onmessage=g=>{var S,G,R,m,b,l,N;try{const p=JSON.parse(g.data);if(n(`${s("inbox",14)} 收到消息: ${v(JSON.stringify(p,null,2))}`),p.type==="event"&&p.event==="connect.challenge"){const E=((S=p.payload)==null?void 0:S.nonce)||"";n(`${s("lock",14)} 收到 challenge, nonce: ${E}`),n(`${s("clock",14)} 生成 connect frame...`),$.createConnectFrame(E,y).then(w=>{n(`${e("ok",14)} Connect frame 生成成功`),n(`${s("send",14)} 发送 connect frame: ${v(JSON.stringify(w,null,2))}`),k.send(JSON.stringify(w))}).catch(w=>{n(`${e("err",14)} 生成 connect frame 失败: ${w}`)})}if(p.type==="res"&&((G=p.id)!=null&&G.startsWith("connect-")))if(p.ok){n(`${e("ok",14)} 握手成功！`),n(`${s("bar-chart",14)} Snapshot: ${v(JSON.stringify(p.payload,null,2))}`);const E=(b=(m=(R=p.payload)==null?void 0:R.snapshot)==null?void 0:m.sessionDefaults)==null?void 0:b.mainSessionKey;E&&n(`${s("key",14)} Session Key: ${E}`)}else n(`${e("err",14)} 握手失败: ${((l=p.error)==null?void 0:l.message)||((N=p.error)==null?void 0:N.code)||"未知错误"}`)}catch(p){n(`${e("warn",14)} 解析消息失败: ${p}`),n(`${s("inbox",14)} 原始数据: ${v(g.data)}`)}},k.onerror=g=>{n(`${e("err",14)} WebSocket 错误: ${g.type}`)},k.onclose=g=>{n(`${s("plug",14)} 连接关闭 - Code: ${g.code}, Reason: ${g.reason||"(空)"}`),g.code===1008?(n(`${e("err",14)} origin not allowed (1008) - Gateway 拒绝了当前应用的 origin`),n(`${s("lightbulb",14)} 解决方法：点击“一键修复配对”，将自动将 tauri://localhost 加入白名单并重启 Gateway`)):g.code===4001?n(`${e("err",14)} 认证失败 (4001) - Token 可能不正确`):g.code===1006&&n(`${e("warn",14)} 异常关闭 (1006) - 可能是网络问题或 Gateway 主动断开`),k=null}}catch(g){n(`${e("err",14)} 创建 WebSocket 失败: ${g}`)}}).catch(c=>{n(`${e("err",14)} 读取配置失败: ${c}`)});function n(c){const o=new Date().toLocaleTimeString("zh-CN",{hour12:!1}),i=document.createElement("div");i.style.cssText="display:flex;gap:4px;align-items:flex-start;padding:1px 0;white-space:pre-wrap;word-break:break-all",i.innerHTML=`<span style="color:var(--text-tertiary);flex-shrink:0">[${o}]</span> ${c}`,L.push(i.textContent),r.appendChild(i),r.scrollTop=r.scrollHeight}}function J(a){const t=a.querySelector("#network-log"),r=a.querySelector("#network-log-content"),d=a.querySelector("#btn-refresh-network"),n=a.querySelector("#btn-clear-network");t.style.display==="none"?(t.style.display="block",I(r)):t.style.display="none",d.onclick=()=>I(r),n.onclick=()=>{q(),I(r)}}function I(a){const t=H();if(t.length===0){a.innerHTML='<div style="color:var(--text-secondary);padding:8px">暂无请求记录</div>';return}const r=t.length,d=t.filter(o=>o.cached).length,n=t.filter(o=>!o.cached).reduce((o,i)=>{const y=parseInt(i.duration);return o+(isNaN(y)?0:y)},0)/(r-d||1);let c=`
    <div style="padding:8px;background:var(--bg-primary);border-radius:4px;margin-bottom:8px;font-size:12px">
      <div style="display:flex;gap:16px">
        <span>总请求: <strong>${r}</strong></span>
        <span>缓存命中: <strong>${d}</strong></span>
        <span>平均耗时: <strong>${n.toFixed(0)}ms</strong></span>
      </div>
    </div>
    <table class="debug-table" style="width:100%;font-size:11px">
      <thead>
        <tr style="background:var(--bg-primary)">
          <th style="padding:6px;text-align:left;width:80px">时间</th>
          <th style="padding:6px;text-align:left">命令</th>
          <th style="padding:6px;text-align:left;max-width:200px">参数</th>
          <th style="padding:6px;text-align:right;width:80px">耗时</th>
          <th style="padding:6px;text-align:center;width:60px">缓存</th>
        </tr>
      </thead>
      <tbody>
  `;for(let o=t.length-1;o>=0;o--){const i=t[o],y=i.cached?e("ok",12):"-",h=i.cached?"var(--text-tertiary)":parseInt(i.duration)>1e3?"var(--error)":parseInt(i.duration)>500?"var(--warning)":"var(--text-primary)";c+=`
      <tr>
        <td style="padding:4px;color:var(--text-tertiary)">${i.time}</td>
        <td style="padding:4px;font-family:monospace">${v(i.cmd)}</td>
        <td style="padding:4px;font-family:monospace;font-size:10px;color:var(--text-secondary);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${v(i.args)}">${v(i.args)}</td>
        <td style="padding:4px;text-align:right;color:${h}">${i.duration}</td>
        <td style="padding:4px;text-align:center">${y}</td>
      </tr>
    `}c+="</tbody></table>",a.innerHTML=c}async function K(a){var c,o,i,y;const t=a.querySelector("#ws-test-log"),r=a.querySelector("#ws-log-content"),d=a.querySelector("#btn-fix-pairing");d&&(d.disabled=!0,d.textContent="修复中..."),t.style.display="block",L=[],t.scrollIntoView({behavior:"smooth",block:"start"});function n(h){const f=`[${new Date().toLocaleTimeString("zh-CN",{hour12:!1})}] ${h}`;L.push(f),r.textContent=L.join(`
`),r.scrollTop=r.scrollHeight}try{n(`${s("wrench",14)} 开始修复配对问题...`),n(`${s("edit",14)} 正在写入设备配对信息 + Gateway origin 白名单...`);const h=await $.autoPairDevice();n(`${e("ok",14)} ${h}`),n(`${e("ok",14)} 已将 tauri://localhost 加入 gateway.controlUi.allowedOrigins`),n(`${s("zap",14)} 停止 Gateway 服务...`);try{await $.stopService("ai.openclaw.gateway")}catch{}n(`${s("clock",14)} 等待进程退出（3秒）...`),await new Promise(b=>setTimeout(b,3e3)),n(`${s("zap",14)} 启动 Gateway 服务...`),await $.startService("ai.openclaw.gateway"),n(`${e("ok",14)} Gateway 启动命令已发送`),n(`${s("clock",14)} 等待 Gateway 就绪（5秒）...`),await new Promise(b=>setTimeout(b,5e3)),n(`${s("search",14)} 检查 Gateway 状态...`);const x=await $.getServicesStatus(),f=(c=x==null?void 0:x[0])==null?void 0:c.running;n(f?`${e("ok",14)} Gateway 已启动`:`${e("warn",14)} Gateway 可能还在启动中，请稍后手动测试`),n(`${s("plug",14)} 测试 WebSocket 连接...`);const u=await $.readOpenclawConfig(),C=((o=u==null?void 0:u.gateway)==null?void 0:o.port)||18789,g=(y=(i=u==null?void 0:u.gateway)==null?void 0:i.auth)==null?void 0:y.token,S=typeof g=="string"?g:"",R=`ws://${window.__TAURI_INTERNALS__?`127.0.0.1:${C}`:location.host}/ws?token=${encodeURIComponent(S)}`,m=new WebSocket(R);m.onopen=()=>{n(`${e("ok",14)} WebSocket 连接成功`)},m.onmessage=b=>{var l,N,p,E;try{const w=JSON.parse(b.data);if(w.type==="event"&&w.event==="connect.challenge"){n(`${e("ok",14)} 收到 connect.challenge`);const T=((l=w.payload)==null?void 0:l.nonce)||"";$.createConnectFrame(T,S).then(_=>{m.send(JSON.stringify(_)),n(`${s("send",14)} 已发送 connect frame`)})}if(w.type==="res"&&((N=w.id)!=null&&N.startsWith("connect-")))if(w.ok)n(`${e("ok",14)} 握手成功！配对问题已修复！`),n(`${s("lightbulb",14)} 正在重新建立主应用 WebSocket 连接...`),m.close(1e3),z.reconnect(),setTimeout(()=>W(a),2e3);else{const T=((p=w.error)==null?void 0:p.message)||((E=w.error)==null?void 0:E.code)||"未知错误";n(`${e("err",14)} 握手失败: ${T}`),T.includes("origin not allowed")?n(`${s("lightbulb",14)} 原因：Gateway 拒绝了当前应用的 origin，需要重启 Gateway 再试`):n(`${s("lightbulb",14)} 建议：请手动前往“服务管理”页面重启 Gateway`)}}catch(w){n(`${e("warn",14)} 解析消息失败: ${w}`)}},m.onerror=()=>{n(`${e("err",14)} WebSocket 连接失败，请确认 Gateway 已在运行`)},m.onclose=b=>{b.code===1008?(n(`${e("warn",14)} 连接被拒绝 (1008) - Gateway 拒绝了当前 origin`),n(`${s("lightbulb",14)} 该问题应已被本次修复流程处理，请再次点击“一键修复配对”`)):b.code!==1e3&&n(`${e("warn",14)} 连接关闭 - Code: ${b.code}`)}}catch(h){n(`${e("err",14)} 修复失败: ${h}`),n(`${s("lightbulb",14)} 建议：请手动前往"服务管理"页面重启 Gateway`)}finally{d&&(d.disabled=!1,d.textContent="一键修复配对")}}export{P as render};

import{b as O,w}from"./index-ZS5CnNlZ.js";let f=null,l=null;async function B(){var n;const i=document.createElement("div");return i.className="page",f=i,i.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">使用情况</h1>
      <p class="page-desc">查看 Token 消耗、API 费用和模型使用统计</p>
    </div>
    <div class="usage-toolbar" style="display:flex;gap:8px;align-items:center;margin-bottom:var(--space-lg);flex-wrap:wrap">
      <button class="btn btn-sm ${b===1?"btn-primary":"btn-secondary"}" data-days="1">今天</button>
      <button class="btn btn-sm ${b===7?"btn-primary":"btn-secondary"}" data-days="7">7天</button>
      <button class="btn btn-sm ${b===30?"btn-primary":"btn-secondary"}" data-days="30">30天</button>
      <button class="btn btn-sm btn-secondary" id="btn-usage-refresh">${O("refresh-cw",14)} 刷新</button>
    </div>
    <div id="usage-content">
      <div class="stat-card loading-placeholder" style="height:120px"></div>
    </div>
  `,i.querySelectorAll("[data-days]").forEach(a=>{a.onclick=()=>{b=parseInt(a.dataset.days),i.querySelectorAll("[data-days]").forEach(o=>{o.classList.remove("btn-primary"),o.classList.add("btn-secondary")}),a.classList.remove("btn-secondary"),a.classList.add("btn-primary"),$(i)}}),(n=i.querySelector("#btn-usage-refresh"))==null||n.addEventListener("click",()=>$(i)),$(i),i}function N(){f=null,l&&(l(),l=null)}let b=7;async function $(i){const n=i.querySelector("#usage-content");if(n.innerHTML=`<div class="stat-card loading-placeholder" style="height:120px"></div>
    <div class="stat-card loading-placeholder" style="height:200px;margin-top:var(--space-md)"></div>`,!w.connected){n.innerHTML=`<div class="usage-empty">
      <div style="color:var(--text-tertiary);margin-bottom:8px">Gateway 连接中...</div>
      <div class="form-hint">等待 Gateway 连接就绪后自动加载</div>
    </div>`,l&&l(),l=w.onReady(()=>{l&&(l(),l=null),f&&$(f)});return}try{const a=new Date,o=a.toISOString().slice(0,10),d=new Date(a.getTime()-(b-1)*864e5).toISOString().slice(0,10),p=await w.request("sessions.usage",{startDate:d,endDate:o,limit:20});_(n,p)}catch(a){n.innerHTML=`<div class="usage-empty">
      <div style="color:var(--error);margin-bottom:8px">加载失败: ${v((a==null?void 0:a.message)||a)}</div>
      <div class="form-hint">可能需要更新 OpenClaw 到 2026.3.11+ 以支持 Usage API</div>
      <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="this.closest('.page').querySelector('#btn-usage-refresh').click()">重试</button>
    </div>`}}function _(i,n){if(!n){i.innerHTML='<div class="usage-empty">暂无数据</div>';return}const a=n.totals||{},o=n.aggregates||{},d=o.messages||{},p=o.tools||{},r=s=>s==null||s===0?"0":s>=1e6?(s/1e6).toFixed(1)+"M":s>=1e3?(s/1e3).toFixed(1)+"k":String(s),c=s=>s!=null&&s>0?"$"+s.toFixed(4):"$0",A=(s,t)=>t?(s/t*100).toFixed(1)+"%":"—",z=`
    <div class="stat-cards" style="margin-bottom:var(--space-lg)">
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-card-label">消息</span></div>
        <div class="stat-card-value">${d.total||0}</div>
        <div class="stat-card-meta">${d.user||0} 用户 · ${d.assistant||0} 助手</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-card-label">工具调用</span></div>
        <div class="stat-card-value">${p.totalCalls||0}</div>
        <div class="stat-card-meta">${p.uniqueTools||0} 种工具</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-card-label">错误</span></div>
        <div class="stat-card-value">${d.errors||0}</div>
        <div class="stat-card-meta">错误率 ${A(d.errors,d.total)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-card-label">Token 总量</span></div>
        <div class="stat-card-value">${r(a.totalTokens)}</div>
        <div class="stat-card-meta">${r(a.input)} 输入 · ${r(a.output)} 输出</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-card-label">费用</span></div>
        <div class="stat-card-value">${c(a.totalCost)}</div>
        <div class="stat-card-meta">${c(a.inputCost)} 输入 · ${c(a.outputCost)} 输出</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-card-label">会话</span></div>
        <div class="stat-card-value">${(n.sessions||[]).length}</div>
        <div class="stat-card-meta">${n.startDate||""} ~ ${n.endDate||""}</div>
      </div>
    </div>
  `,g=(s,t,e,u,m)=>{if(!t||!t.length)return"";const h=t.slice(0,5).map(y=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border-primary)">
        <span style="font-size:var(--font-size-sm);color:var(--text-primary);font-weight:500">${v(e(y))}</span>
        <span style="font-size:var(--font-size-sm);color:var(--text-secondary);font-family:var(--font-mono)">${u(y)}</span>
      </div>
    `).join("");return`
      <div class="usage-top-card">
        <div class="usage-top-title">${s}</div>
        ${h}
      </div>
    `},D=g("热门模型",o.byModel,s=>s.model||"未知",s=>{var t,e;return c((t=s.totals)==null?void 0:t.totalCost)+" · "+r((e=s.totals)==null?void 0:e.totalTokens)}),F=g("热门服务商",o.byProvider,s=>s.provider||"未知",s=>{var t;return c((t=s.totals)==null?void 0:t.totalCost)+" · "+s.count+" 次"}),P=g("热门工具",p.tools||[],s=>s.name,s=>s.count+" 次调用"),U=g("热门 Agent",o.byAgent,s=>s.agentId||"main",s=>{var t;return c((t=s.totals)==null?void 0:t.totalCost)}),j=g("热门渠道",o.byChannel,s=>s.channel||"webchat",s=>{var t;return c((t=s.totals)==null?void 0:t.totalCost)}),E=`<div class="usage-tops-grid">${D}${F}${P}${U}${j}</div>`,R=`
    <div class="config-section" style="margin-top:var(--space-lg)">
      <div class="config-section-title">Token 分类</div>
      <div style="display:flex;gap:var(--space-lg);flex-wrap:wrap;padding:var(--space-md)">
        <div><span style="display:inline-block;width:10px;height:10px;background:var(--error);border-radius:2px;margin-right:6px"></span>输出 ${r(a.output)}</div>
        <div><span style="display:inline-block;width:10px;height:10px;background:var(--accent);border-radius:2px;margin-right:6px"></span>输入 ${r(a.input)}</div>
        <div><span style="display:inline-block;width:10px;height:10px;background:var(--success);border-radius:2px;margin-right:6px"></span>缓存读取 ${r(a.cacheRead)}</div>
        <div><span style="display:inline-block;width:10px;height:10px;background:var(--warning);border-radius:2px;margin-right:6px"></span>缓存写入 ${r(a.cacheWrite)}</div>
      </div>
    </div>
  `,x=o.daily||[];let T="";if(x.length>0){const s=Math.max(...x.map(e=>e.tokens||0),1);T=`
      <div class="config-section" style="margin-top:var(--space-lg)">
        <div class="config-section-title">每日用量</div>
        <div class="usage-daily-chart">${x.map(e=>{const u=Math.max(1,Math.round((e.tokens||0)/s*100)),m=(e.date||"").slice(5);return`<div class="usage-daily-bar-wrap" title="${e.date}: ${r(e.tokens)} tokens · ${e.messages||0} msgs">
        <div class="usage-daily-bar" style="height:${u}%"></div>
        <div class="usage-daily-label">${m}</div>
      </div>`}).join("")}</div>
      </div>
    `}const k=(n.sessions||[]).slice(0,10);let C="";if(k.length>0){const s=k.map(t=>{var y,M,H,L,S,I,q;const e=t.usage||{},u=v(t.key||"").replace(/^agent:main:/,""),m=t.model||((M=(y=e.modelUsage)==null?void 0:y[0])==null?void 0:M.model)||"",h=((L=(H=e.modelUsage)==null?void 0:H[0])==null?void 0:L.provider)||t.modelProvider||"";return`<div class="session-row">
        <div class="session-row-header">
          <span class="session-key" title="${v(t.key||"")}">${u||((S=t.sessionId)==null?void 0:S.slice(0,12))||"—"}</span>
          ${t.agentId?`<span class="session-flag">${v(t.agentId)}</span>`:""}
          ${m?`<span class="session-model">${v(m)}</span>`:""}
          ${h?`<span class="session-flag">${v(h)}</span>`:""}
        </div>
        <div class="session-row-meta">${r(e.totalTokens)} tokens · ${c(e.totalCost)} · ${((I=e.messageCounts)==null?void 0:I.total)||0} msgs${(q=e.messageCounts)!=null&&q.errors?" · "+e.messageCounts.errors+" err":""}</div>
      </div>`}).join("");C=`
      <div class="config-section" style="margin-top:var(--space-lg)">
        <div class="config-section-title">会话明细 <span style="font-weight:normal;color:var(--text-tertiary);font-size:var(--font-size-xs)">最近 ${k.length} 个</span></div>
        <div class="session-list">${s}</div>
      </div>
    `}i.innerHTML=z+E+R+T+C}function v(i){return(i||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}export{N as cleanup,B as render};

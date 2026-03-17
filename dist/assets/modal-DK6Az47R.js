function m(i){return i?String(i).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function f(i){return new Promise(r=>{const l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
      <div class="modal" style="max-width:400px">
        <div class="modal-title">确认操作</div>
        <div style="font-size:var(--font-size-sm);color:var(--text-secondary);white-space:pre-wrap;line-height:1.6">${m(i)}</div>
        <div class="modal-actions">
          <button class="btn btn-secondary btn-sm" data-action="cancel">取消</button>
          <button class="btn btn-danger btn-sm" data-action="confirm">确定</button>
        </div>
      </div>
    `,document.body.appendChild(l);const n=t=>{l.remove(),r(t)};l.addEventListener("click",t=>{t.target===l&&n(!1)}),l.querySelector('[data-action="cancel"]').onclick=()=>n(!1),l.querySelector('[data-action="confirm"]').onclick=()=>n(!0),l.addEventListener("keydown",t=>{t.key==="Enter"?(t.preventDefault(),n(!0)):t.key==="Escape"&&n(!1)}),l.querySelector('[data-action="confirm"]').focus()})}function g({title:i,fields:r,onConfirm:l}){const n=document.createElement("div");n.className="modal-overlay";const t=r.map(e=>e.type==="checkbox"?`
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" data-name="${e.name}" ${e.value?"checked":""}>
            <span class="form-label" style="margin:0">${e.label}</span>
          </label>
          ${e.hint?`<div class="form-hint">${e.hint}</div>`:""}
        </div>`:e.type==="select"?`
        <div class="form-group">
          <label class="form-label">${e.label}</label>
          <select class="form-input" data-name="${e.name}">
            ${e.options.map(c=>`<option value="${c.value}" ${c.value===e.value?"selected":""}>${c.label}</option>`).join("")}
          </select>
          ${e.hint?`<div class="form-hint">${e.hint}</div>`:""}
        </div>`:`
      <div class="form-group">
        <label class="form-label">${e.label}</label>
        <input class="form-input" data-name="${e.name}" value="${m(e.value)}" placeholder="${m(e.placeholder)}"${e.readonly?' readonly style="opacity:0.6;cursor:not-allowed"':""}>
        ${e.hint?`<div class="form-hint">${e.hint}</div>`:""}
      </div>`).join("");n.innerHTML=`
    <div class="modal">
      <div class="modal-title">${i}</div>
      ${t}
      <div class="modal-actions">
        <button class="btn btn-secondary btn-sm" data-action="cancel">取消</button>
        <button class="btn btn-primary btn-sm" data-action="confirm">确定</button>
      </div>
    </div>
  `,document.body.appendChild(n),n.addEventListener("click",e=>{e.target===n&&n.remove()}),n.querySelector('[data-action="cancel"]').onclick=()=>n.remove(),n.querySelector('[data-action="confirm"]').onclick=()=>{const e={};n.querySelectorAll("[data-name]").forEach(a=>{a.type==="checkbox"?e[a.dataset.name]=a.checked:e[a.dataset.name]=a.value});const c=l;setTimeout(()=>n.remove(),0),c(e)};const u=e=>{var c;e.key==="Enter"?(e.preventDefault(),(c=n.querySelector('[data-action="confirm"]'))==null||c.click()):e.key==="Escape"&&n.remove()};n.addEventListener("keydown",u);const d=n.querySelector("input, select");d&&d.focus()}function h({title:i,content:r,buttons:l=[],width:n=480}){const t=document.createElement("div");t.className="modal-overlay";const u=l.map(e=>`<button class="${e.className||"btn btn-primary btn-sm"}" id="${e.id||""}">${e.label}</button>`).join("");t.innerHTML=`
    <div class="modal" style="max-width:${n}px">
      <div class="modal-title">${i}</div>
      <div class="modal-content-body">${r}</div>
      <div class="modal-actions">
        <button class="btn btn-secondary btn-sm" data-action="cancel">取消</button>
        ${u}
      </div>
    </div>
  `,document.body.appendChild(t),t.close=()=>t.remove(),t.addEventListener("click",e=>{e.target===t&&t.remove()}),t.querySelector('[data-action="cancel"]').onclick=()=>t.remove(),t.addEventListener("keydown",e=>{e.key==="Escape"&&t.remove()});const d=t.querySelector("input, textarea, select");return d&&d.focus(),t}function k(i){const r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
    <div class="modal" style="max-width:520px">
      <div class="modal-title">${i||"升级 OpenClaw"}</div>
      <div class="upgrade-progress-wrap">
        <div class="upgrade-progress-bar"><div class="upgrade-progress-fill" style="width:0%"></div></div>
        <div class="upgrade-progress-text">准备中...</div>
      </div>
      <div class="upgrade-log-box"></div>
      <div class="modal-actions">
        <button class="btn btn-secondary btn-sm" data-action="close">关闭</button>
      </div>
    </div>
  `,document.body.appendChild(r);const l=r.querySelector(".upgrade-progress-fill"),n=r.querySelector(".upgrade-progress-text"),t=r.querySelector(".upgrade-log-box"),u=r.querySelector('[data-action="close"]'),d=[];let e=null,c=!1,a=null;function v(){a&&(a.remove(),a=null),document.body.appendChild(r)}function p(){r.remove(),c?(a&&(a.remove(),a=null),e==null||e()):b()}function b(){a||(a=document.createElement("div"),a.className="upgrade-task-bar",a.innerHTML=`
      <span class="upgrade-task-bar-text">${n.textContent}</span>
      <button class="btn btn-sm upgrade-task-bar-open">查看详情</button>
      <button class="btn btn-sm btn-ghost upgrade-task-bar-dismiss">×</button>
    `,a.querySelector(".upgrade-task-bar-open").onclick=v,a.querySelector(".upgrade-task-bar-dismiss").onclick=()=>{a.remove(),a=null},document.body.appendChild(a))}function y(o){if(a){const s=a.querySelector(".upgrade-task-bar-text");s&&(s.textContent=o)}}return u.onclick=p,r.addEventListener("keydown",o=>{o.key==="Escape"&&p()}),{appendLog(o){d.push(o);const s=document.createElement("div");s.textContent=o,t.appendChild(s),t.scrollTop=t.scrollHeight},appendHtmlLog(o){d.push(o);const s=document.createElement("div");s.innerHTML=o,t.appendChild(s),t.scrollTop=t.scrollHeight},getLogText(){return d.join(`
`)},setProgress(o){l.style.width=o+"%";let s;o>=100?s="完成":o>=75?s="正在安装...":o>=30?s="正在下载依赖...":s="准备中...",n.textContent=s,y(s)},setDone(o){c=!0,n.textContent=o||"升级完成",l.style.width="100%",l.classList.add("done"),a&&(a.remove(),a=null),u.focus()},setError(o){if(c=!0,n.textContent=o||"升级失败",l.classList.add("error"),a){const s=a.querySelector(".upgrade-task-bar-text");s&&(s.textContent=o||"升级失败",s.style.color="var(--error)")}u.focus()},onClose(o){e=o},destroy(){r.remove(),a&&(a.remove(),a=null),e==null||e()}}}export{f as showConfirm,h as showContentModal,g as showModal,k as showUpgradeModal};

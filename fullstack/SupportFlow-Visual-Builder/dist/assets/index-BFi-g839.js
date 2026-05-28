(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();class q{constructor(t){this._nodes=t.nodes.map(e=>({...e,position:{...e.position},options:e.options.map(s=>({...s}))})),this._meta={...t.meta},this._mode="editor",this._selectedNodeId=null,this._previewNodeId=null,this._previewHistory=[],this._listeners=[],this._dragging=null,this._pan={x:0,y:0},this._zoom=1,this._highlightPath=new Set}subscribe(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(e=>e!==t)}}_emit(){this._listeners.forEach(t=>t(this.getSnapshot()))}getSnapshot(){return{nodes:this._nodes,meta:this._meta,mode:this._mode,selectedNodeId:this._selectedNodeId,previewNodeId:this._previewNodeId,previewHistory:[...this._previewHistory],pan:{...this._pan},zoom:this._zoom,highlightPath:new Set(this._highlightPath)}}getNode(t){return this._nodes.find(e=>e.id===t)}getStartNode(){return this._nodes.find(t=>t.type==="start")}setMode(t){if(this._mode=t,t==="preview"){const e=this.getStartNode();this._previewNodeId=e?e.id:null,this._previewHistory=e?[e.id]:[],this._highlightPath=new Set(this._previewHistory),this._selectedNodeId=null}else this._previewNodeId=null,this._previewHistory=[],this._highlightPath=new Set;this._emit()}selectNode(t){this._selectedNodeId=t,this._emit()}updateNodeText(t,e){const s=this._nodes.find(o=>o.id===t);s&&(s.text=e,this._emit())}updateOptionLabel(t,e,s){const o=this._nodes.find(r=>r.id===t);o&&o.options[e]&&(o.options[e].label=s,this._emit())}addNode(t="question"){const e=String(Date.now());this._nodes.push({id:e,type:t,text:"New node — click to edit",position:{x:300+Math.random()*200,y:200+Math.random()*200},options:t!=="end"?[{label:"Option 1",nextId:null}]:[]}),this._selectedNodeId=e,this._emit()}deleteNode(t){this._nodes=this._nodes.filter(e=>e.id!==t),this._nodes.forEach(e=>{e.options=e.options.filter(s=>s.nextId!==t)}),this._selectedNodeId===t&&(this._selectedNodeId=null),this._emit()}addOption(t){const e=this._nodes.find(s=>s.id===t);e&&(e.options.push({label:"New Option",nextId:null}),this._emit())}removeOption(t,e){const s=this._nodes.find(o=>o.id===t);s&&(s.options.splice(e,1),this._emit())}setOptionTarget(t,e,s){const o=this._nodes.find(r=>r.id===t);o&&o.options[e]!==void 0&&(o.options[e].nextId=s||null,this._emit())}setNodePosition(t,e,s){const o=this._nodes.find(r=>r.id===t);o&&(o.position.x=e,o.position.y=s,this._emit())}previewChoose(t){this._nodes.find(s=>s.id===t)&&(this._previewNodeId=t,this._previewHistory.push(t),this._highlightPath=new Set(this._previewHistory),this._emit())}previewRestart(){const t=this.getStartNode();this._previewNodeId=t?t.id:null,this._previewHistory=t?[t.id]:[],this._highlightPath=new Set(this._previewHistory),this._emit()}setPan(t,e){this._pan={x:t,y:e},this._emit()}setZoom(t){this._zoom=Math.max(.3,Math.min(2,t)),this._emit()}exportJSON(){return JSON.stringify({meta:this._meta,nodes:this._nodes},null,2)}importJSON(t){try{const e=JSON.parse(t);if(e.nodes&&Array.isArray(e.nodes))return this._nodes=e.nodes,this._meta=e.meta||this._meta,this._selectedNodeId=null,this._emit(),!0}catch{}return!1}}const k=220,P=100;function H(i){return{x:i.position.x+k/2,y:i.position.y+P}}function Y(i){return{x:i.position.x+k/2,y:i.position.y}}function D(i,t,e,s){const o=Math.abs(s-t),r=Math.max(60,o*.5);return`M ${i} ${t} C ${i} ${t+r}, ${e} ${s-r}, ${e} ${s}`}function j(i,t,e,s){const o="http://www.w3.org/2000/svg",r=document.createElementNS(o,"svg");r.setAttribute("class","connector-svg"),r.style.cssText=`
    position:absolute; top:0; left:0; width:100%; height:100%;
    pointer-events:none; overflow:visible; z-index:1;
  `;const a=document.createElementNS(o,"defs"),d=$(o,"arrow","#4ade80"),n=$(o,"arrow-dim","#334155"),c=$(o,"arrow-active","#f59e0b");return a.appendChild(d),a.appendChild(n),a.appendChild(c),r.appendChild(a),i.forEach(p=>{p.options.forEach((b,w)=>{if(!b.nextId)return;const v=i.find(g=>g.id===b.nextId);if(!v)return;const l=H(p),f=Y(v),m=D(l.x,l.y,f.x,f.y),h=t.has(p.id)&&t.has(v.id);if(h){const g=document.createElementNS(o,"path");g.setAttribute("d",m),g.setAttribute("stroke","#f59e0b"),g.setAttribute("stroke-width","6"),g.setAttribute("fill","none"),g.setAttribute("opacity","0.2"),r.appendChild(g)}const u=document.createElementNS(o,"path");if(u.setAttribute("d",m),u.setAttribute("stroke",h?"#f59e0b":"#334155"),u.setAttribute("stroke-width",h?"2.5":"1.5"),u.setAttribute("fill","none"),u.setAttribute("stroke-dasharray",(p.type==="start","none")),u.setAttribute("marker-end",h?"url(#arrow-active)":"url(#arrow-dim)"),u.setAttribute("class","connector-line"),r.appendChild(u),b.label){const g=(l.x+f.x)/2,S=(l.y+f.y)/2,y=document.createElementNS(o,"rect"),N=Math.min(b.label.length*7+16,140);y.setAttribute("x",g-N/2),y.setAttribute("y",S-12),y.setAttribute("width",N),y.setAttribute("height",22),y.setAttribute("rx","4"),y.setAttribute("fill",h?"#422006":"#0f172a"),y.setAttribute("stroke",h?"#f59e0b":"#1e293b"),y.setAttribute("stroke-width","1"),r.appendChild(y);const x=document.createElementNS(o,"text");x.setAttribute("x",g),x.setAttribute("y",S+4),x.setAttribute("text-anchor","middle"),x.setAttribute("fill",h?"#fbbf24":"#64748b"),x.setAttribute("font-size","10"),x.setAttribute("font-family","Space Mono, monospace"),x.textContent=b.label.length>16?b.label.slice(0,14)+"…":b.label,r.appendChild(x)}})}),r}function $(i,t,e){const s=document.createElementNS(i,"marker");s.setAttribute("id",t),s.setAttribute("markerWidth","8"),s.setAttribute("markerHeight","8"),s.setAttribute("refX","6"),s.setAttribute("refY","3"),s.setAttribute("orient","auto");const o=document.createElementNS(i,"polygon");return o.setAttribute("points","0 0, 6 3, 0 6"),o.setAttribute("fill",e),s.appendChild(o),s}const M={start:{label:"START",accent:"#4ade80",bg:"#052e16",border:"#166534"},question:{label:"QUESTION",accent:"#38bdf8",bg:"#0c1a2e",border:"#1e3a5f"},end:{label:"END",accent:"#f87171",bg:"#2d0a0a",border:"#7f1d1d"}};function R({node:i,isSelected:t,isPreviewActive:e,onSelect:s,onDragStart:o,state:r}){const a=M[i.type]||M.question,d=document.createElement("div");d.className=`node-card node-${i.type}${t?" selected":""}${e?" preview-active":""}`,d.dataset.nodeId=i.id,d.style.cssText=`
    position: absolute;
    left: ${i.position.x}px;
    top: ${i.position.y}px;
    width: ${k}px;
    background: ${a.bg};
    border: 1.5px solid ${t?a.accent:e?"#f59e0b":a.border};
    border-radius: 10px;
    box-shadow: ${t?`0 0 0 2px ${a.accent}44, 0 8px 32px #00000080`:e?"0 0 0 2px #f59e0b44, 0 8px 32px #00000080":"0 4px 16px #00000060"};
    cursor: pointer;
    user-select: none;
    z-index: ${t?10:2};
    transition: box-shadow 0.2s, border-color 0.2s;
    font-family: 'Space Mono', monospace;
    overflow: hidden;
  `;const n=document.createElement("div");n.style.cssText=`
    background: ${a.accent}22;
    border-bottom: 1px solid ${a.border};
    padding: 5px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,n.innerHTML=`
    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${a.accent};box-shadow:0 0 6px ${a.accent}"></span>
    <span style="font-size:9px;font-weight:700;letter-spacing:2px;color:${a.accent};font-family:'Space Mono',monospace">${a.label}</span>
    <span style="margin-left:auto;font-size:9px;color:#475569;font-family:'Space Mono',monospace">#${i.id}</span>
  `,d.appendChild(n);const c=document.createElement("div");if(c.style.cssText="padding: 12px; font-size: 12px; color: #e2e8f0; line-height: 1.5; min-height: 44px;",c.textContent=i.text,d.appendChild(c),i.options.length>0){const p=document.createElement("div");p.style.cssText="padding: 0 12px 10px; display:flex; flex-direction:column; gap:4px;",i.options.forEach((b,w)=>{const v=document.createElement("div");v.style.cssText=`
        font-size:10px; color:#94a3b8; padding:3px 8px;
        border:1px solid #1e293b; border-radius:4px;
        background:#0f172a; white-space:nowrap; overflow:hidden;
        text-overflow:ellipsis; font-family:'Space Mono',monospace;
      `,v.textContent=`→ ${b.label||"(unlabeled)"}`,p.appendChild(v)}),d.appendChild(p)}else{const p=document.createElement("div");p.style.cssText="padding:4px 12px 10px; font-size:10px; color:#475569; font-family:'Space Mono',monospace;",p.textContent="⊘ leaf node",d.appendChild(p)}return n.addEventListener("mousedown",p=>{p.stopPropagation(),o(p,i.id)}),d.addEventListener("mousedown",p=>{o(p,i.id)}),d.addEventListener("click",p=>{p.stopPropagation(),s(i.id)}),d}class X{constructor(t,e){this.container=t,this.state=e,this._drag=null,this._isPanning=!1,this._panStart=null,this._initContainer()}_initContainer(){this.container.style.cssText=`
      position:relative; width:100%; height:100%;
      overflow:hidden; cursor:default;
    `,this.worldEl=document.createElement("div"),this.worldEl.className="canvas-world",this.worldEl.style.cssText=`
      position:absolute; top:0; left:0;
      transform-origin: 0 0;
      width: 1600px; height: 1200px;
    `,this.container.appendChild(this.worldEl),this.container.addEventListener("mousedown",t=>{if(t.target===this.container||t.target===this.worldEl){this._isPanning=!0;const e=this.state.getSnapshot();this._panStart={mx:t.clientX,my:t.clientY,px:e.pan.x,py:e.pan.y},t.preventDefault()}}),window.addEventListener("mousemove",t=>this._onMouseMove(t)),window.addEventListener("mouseup",t=>this._onMouseUp(t)),this.container.addEventListener("wheel",t=>{t.preventDefault();const e=this.state.getSnapshot(),s=t.deltaY>0?-.08:.08;this.state.setZoom(e.zoom+s)},{passive:!1}),this.container.addEventListener("click",t=>{(t.target===this.container||t.target===this.worldEl)&&this.state.selectNode(null)})}_onMouseMove(t){const e=this.state.getSnapshot();if(this._isPanning&&this._panStart){const s=t.clientX-this._panStart.mx,o=t.clientY-this._panStart.my;this.state.setPan(this._panStart.px+s,this._panStart.py+o);return}if(this._drag){const s=(t.clientX-this._drag.startX)/e.zoom,o=(t.clientY-this._drag.startY)/e.zoom,r=this._drag.origX+s,a=this._drag.origY+o;this.state.setNodePosition(this._drag.nodeId,Math.max(0,r),Math.max(0,a))}}_onMouseUp(){this._drag=null,this._isPanning=!1,this._panStart=null}_startDrag(t,e){const o=this.state.getSnapshot().nodes.find(r=>r.id===e);o&&(this._drag={nodeId:e,startX:t.clientX,startY:t.clientY,origX:o.position.x,origY:o.position.y},t.preventDefault())}render(t){this.worldEl.innerHTML="",this.worldEl.style.transform=`translate(${t.pan.x}px, ${t.pan.y}px) scale(${t.zoom})`;const e=j(t.nodes,t.highlightPath,t.pan,t.zoom);this.worldEl.appendChild(e),t.nodes.forEach(s=>{const o=t.selectedNodeId===s.id,r=t.highlightPath.has(s.id),a=R({node:s,isSelected:o,isPreviewActive:r,state:this.state,onSelect:d=>this.state.selectNode(d),onDragStart:(d,n)=>this._startDrag(d,n)});this.worldEl.appendChild(a)})}}function B(i,t,e){if(e.innerHTML="",!i){e.innerHTML=`
      <div style="padding:32px 20px;text-align:center;color:#334155">
        <div style="font-size:28px;margin-bottom:12px">✦</div>
        <div style="font-size:11px;letter-spacing:2px;font-family:'Space Mono',monospace;color:#475569">SELECT A NODE<br>TO EDIT</div>
      </div>`;return}const o={start:"#4ade80",question:"#38bdf8",end:"#f87171"}[i.type]||"#38bdf8",r=t.getSnapshot().nodes;e.innerHTML=`
    <div class="edit-panel-inner">
      <div class="ep-header">
        <span class="ep-type-badge" style="color:${o};border-color:${o}22;background:${o}11">${i.type.toUpperCase()}</span>
        <span class="ep-node-id">#${i.id}</span>
        <button class="ep-delete-btn" data-id="${i.id}" title="Delete node">✕</button>
      </div>

      <div class="ep-section">
        <label class="ep-label">NODE TEXT</label>
        <textarea class="ep-textarea" id="ep-text" rows="4">${i.text}</textarea>
      </div>

      <div class="ep-section">
        <label class="ep-label">NODE TYPE</label>
        <select class="ep-select" id="ep-type">
          <option value="start" ${i.type==="start"?"selected":""}>Start</option>
          <option value="question" ${i.type==="question"?"selected":""}>Question</option>
          <option value="end" ${i.type==="end"?"selected":""}>End</option>
        </select>
      </div>

      <div class="ep-section">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <label class="ep-label" style="margin:0">OPTIONS</label>
          ${i.type!=="end"?`<button class="ep-add-option" data-id="${i.id}">+ Add</button>`:""}
        </div>
        <div id="ep-options-list">
          ${i.options.map((n,c)=>`
            <div class="ep-option-row" data-index="${c}">
              <div style="display:flex;gap:6px;margin-bottom:4px">
                <input class="ep-input ep-opt-label" data-index="${c}" placeholder="Option label" value="${W(n.label)}" />
                <button class="ep-rm-option" data-index="${c}" title="Remove">✕</button>
              </div>
              <select class="ep-select ep-opt-target" data-index="${c}" style="font-size:10px">
                <option value="">— no target —</option>
                ${r.filter(p=>p.id!==i.id).map(p=>`<option value="${p.id}" ${n.nextId===p.id?"selected":""}>${p.id}: ${J(p.text,28)}</option>`).join("")}
              </select>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;const a=e.querySelector("#ep-text");a.addEventListener("input",()=>{t.updateNodeText(i.id,a.value)}),e.querySelector("#ep-type").addEventListener("change",n=>{const c=t.getNode(i.id);c&&(c.type=n.target.value,t._emit())}),e.querySelectorAll(".ep-opt-label").forEach(n=>{n.addEventListener("input",()=>{t.updateOptionLabel(i.id,parseInt(n.dataset.index),n.value)})}),e.querySelectorAll(".ep-opt-target").forEach(n=>{n.addEventListener("change",()=>{t.setOptionTarget(i.id,parseInt(n.dataset.index),n.value)})}),e.querySelectorAll(".ep-rm-option").forEach(n=>{n.addEventListener("click",()=>{t.removeOption(i.id,parseInt(n.dataset.index))})});const d=e.querySelector(".ep-add-option");d&&d.addEventListener("click",()=>t.addOption(i.id)),e.querySelector(".ep-delete-btn").addEventListener("click",()=>{confirm("Delete this node?")&&t.deleteNode(i.id)})}function J(i,t){return i.length>t?i.slice(0,t)+"…":i}function W(i){return(i||"").replace(/"/g,"&quot;")}function U(i,t){const e=i.getSnapshot(),s=i.getNode(e.previewNodeId),o=s&&(s.type==="end"||s.options.length===0);t.innerHTML=`
    <div class="preview-container">
      <div class="preview-header">
        <div class="preview-brand">
          <span class="preview-dot"></span>
          <span>SupportFlow Bot</span>
        </div>
        <div class="preview-status">${o?"✓ Resolved":"● Live"}</div>
      </div>

      <div class="preview-messages" id="preview-messages">
        ${e.previewHistory.map((d,n)=>{const c=i.getNode(d);if(!c)return"";const p=n===e.previewHistory.length-1;e.previewNodeId;let b="";if(n>0){const w=i.getNode(e.previewHistory[n-1]);if(w){const v=w.options.find(l=>l.nextId===d);v&&(b=v.label)}}return`
            ${b?`<div class="preview-user-msg"><span class="preview-user-bubble">${b}</span></div>`:""}
            <div class="preview-bot-msg ${p?"preview-bot-msg--latest":""}">
              <div class="preview-avatar">🤖</div>
              <div class="preview-bubble">${c.text}</div>
            </div>
          `}).join("")}
      </div>

      <div class="preview-actions">
        ${!o&&s?`
          <div class="preview-choices">
            ${s.options.map((d,n)=>`
              <button class="preview-choice-btn" data-next="${d.nextId||""}" data-index="${n}">
                ${d.label}
              </button>
            `).join("")}
          </div>
        `:o?`
          <div class="preview-end-state">
            <div class="preview-end-icon">✓</div>
            <div class="preview-end-text">Conversation complete</div>
            <button class="preview-restart-btn" id="preview-restart">↺ Restart</button>
          </div>
        `:""}
      </div>
    </div>
  `;const r=t.querySelector("#preview-messages");r&&(r.scrollTop=r.scrollHeight),t.querySelectorAll(".preview-choice-btn").forEach(d=>{d.addEventListener("click",()=>{const n=d.dataset.next;n&&i.previewChoose(n)})});const a=t.querySelector("#preview-restart");a&&a.addEventListener("click",()=>i.previewRestart())}function Z(i,t){var o,r,a,d,n,c,p,b,w;const e=i.getSnapshot(),s=e.mode==="preview";if(t.innerHTML=`
    <div class="toolbar">
      <div class="toolbar-brand">
        <span class="toolbar-logo">◈</span>
        <span class="toolbar-title">SupportFlow</span>
        <span class="toolbar-subtitle">Visual Builder</span>
      </div>

      <div class="toolbar-center">
        ${s?"":`
          <button class="tb-btn tb-btn--ghost" id="tb-add-start" title="Add Start node">
            <span class="tb-icon">⊕</span> Start
          </button>
          <button class="tb-btn tb-btn--ghost" id="tb-add-q" title="Add Question node">
            <span class="tb-icon">⊕</span> Question
          </button>
          <button class="tb-btn tb-btn--ghost" id="tb-add-end" title="Add End node">
            <span class="tb-icon">⊕</span> End
          </button>
          <div class="tb-divider"></div>
          <button class="tb-btn tb-btn--ghost" id="tb-zoom-in" title="Zoom in">⊕</button>
          <button class="tb-btn tb-btn--ghost" id="tb-zoom-out" title="Zoom out">⊖</button>
          <button class="tb-btn tb-btn--ghost" id="tb-zoom-reset" title="Reset view">⊡</button>
          <div class="tb-divider"></div>
          <button class="tb-btn tb-btn--ghost" id="tb-export" title="Export JSON">↓ Export</button>
          <button class="tb-btn tb-btn--ghost" id="tb-import" title="Import JSON">↑ Import</button>
          <input type="file" id="tb-import-file" accept=".json" style="display:none">
        `}
      </div>

      <div class="toolbar-right">
        <div class="tb-mode-switch">
          <button class="tb-mode-btn ${s?"":"active"}" id="tb-editor-mode">
            ✦ Editor
          </button>
          <button class="tb-mode-btn tb-mode-btn--preview ${s?"active":""}" id="tb-preview-mode">
            ▶ Preview
          </button>
        </div>
      </div>
    </div>
  `,(o=t.querySelector("#tb-editor-mode"))==null||o.addEventListener("click",()=>i.setMode("editor")),(r=t.querySelector("#tb-preview-mode"))==null||r.addEventListener("click",()=>i.setMode("preview")),!s){(a=t.querySelector("#tb-add-start"))==null||a.addEventListener("click",()=>i.addNode("start")),(d=t.querySelector("#tb-add-q"))==null||d.addEventListener("click",()=>i.addNode("question")),(n=t.querySelector("#tb-add-end"))==null||n.addEventListener("click",()=>i.addNode("end")),(c=t.querySelector("#tb-zoom-in"))==null||c.addEventListener("click",()=>i.setZoom(e.zoom+.15)),(p=t.querySelector("#tb-zoom-out"))==null||p.addEventListener("click",()=>i.setZoom(e.zoom-.15)),(b=t.querySelector("#tb-zoom-reset"))==null||b.addEventListener("click",()=>{i.setZoom(1),i.setPan(0,0)}),(w=t.querySelector("#tb-export"))==null||w.addEventListener("click",()=>{const f=i.exportJSON(),m=new Blob([f],{type:"application/json"}),h=URL.createObjectURL(m),u=document.createElement("a");u.href=h,u.download="flow_data.json",u.click(),URL.revokeObjectURL(h)});const v=t.querySelector("#tb-import"),l=t.querySelector("#tb-import-file");v==null||v.addEventListener("click",()=>l==null?void 0:l.click()),l==null||l.addEventListener("change",f=>{const m=f.target.files[0];if(!m)return;const h=new FileReader;h.onload=u=>{i.importJSON(u.target.result)||alert("Invalid JSON file."),l.value=""},h.readAsText(m)})}}const z=160,L=100,A=20;function Q(i,t,e,s){if(s.innerHTML="",!i.length)return;const o=i.map(E=>E.position.x),r=i.map(E=>E.position.y),a=Math.min(...o)-A,d=Math.min(...r)-A,n=Math.max(...o)+k+A,c=Math.max(...r)+120+A,p=n-a,b=c-d,w=z/p,v=L/b,l=Math.min(w,v),f="http://www.w3.org/2000/svg",m=document.createElementNS(f,"svg");m.setAttribute("width",z),m.setAttribute("height",L),m.style.cssText="display:block;";const h=document.createElementNS(f,"rect");h.setAttribute("width",z),h.setAttribute("height",L),h.setAttribute("fill","#020c18"),m.appendChild(h);const u={start:"#4ade80",question:"#38bdf8",end:"#f87171"};i.forEach(E=>{const I=(E.position.x-a)*l,C=(E.position.y-d)*l,O=k*l,T=70*l,_=document.createElementNS(f,"rect");_.setAttribute("x",I),_.setAttribute("y",C),_.setAttribute("width",Math.max(O,4)),_.setAttribute("height",Math.max(T,3)),_.setAttribute("rx",2),_.setAttribute("fill",(u[E.type]||"#38bdf8")+"33"),_.setAttribute("stroke",u[E.type]||"#38bdf8"),_.setAttribute("stroke-width","0.5"),m.appendChild(_)});const g=(-t.x/e-a)*l,S=(-t.y/e-d)*l,y=400/e*l,N=300/e*l,x=document.createElementNS(f,"rect");x.setAttribute("x",g),x.setAttribute("y",S),x.setAttribute("width",Math.max(y,10)),x.setAttribute("height",Math.max(N,10)),x.setAttribute("fill","none"),x.setAttribute("stroke","#f59e0b"),x.setAttribute("stroke-width","1"),x.setAttribute("stroke-dasharray","3,2"),m.appendChild(x),s.appendChild(m)}const G=`
/* base reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-base: #020c18;
  --bg-surface: #0a1628;
  --bg-elevated: #0f1f35;
  --border: #1e2d42;
  --border-bright: #2d4263;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
  --accent-green: #4ade80;
  --accent-blue: #38bdf8;
  --accent-red: #f87171;
  --accent-amber: #f59e0b;
  --font-mono: 'Space Mono', monospace;
  --font-display: 'Syne', sans-serif;
}

html, body, #root {
  width: 100%; height: 100%; overflow: hidden;
  background: var(--bg-base);
  color: var(--text-primary);
}

/* app shell */
.app-shell {
  display: flex; flex-direction: column;
  width: 100vw; height: 100vh;
  background: var(--bg-base);
  font-family: var(--font-mono);
}

.app-toolbar {
  flex-shrink: 0;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  z-index: 100;
}

.app-body {
  flex: 1; display: flex; overflow: hidden;
}

.app-canvas {
  flex: 1; position: relative; overflow: hidden;
  background:
    radial-gradient(ellipse at 20% 20%, #0a1e3a 0%, transparent 60%),
    radial-gradient(ellipse at 80% 80%, #0d1f10 0%, transparent 60%),
    var(--bg-base);
  background-size: 100% 100%;
}

/* grid texture */
.app-canvas::before {
  content: '';
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image: radial-gradient(circle, #1e2d42 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.5;
}

.app-sidebar {
  width: 280px; flex-shrink: 0;
  background: var(--bg-surface);
  border-left: 1px solid var(--border);
  display: flex; flex-direction: column;
  overflow-y: auto; overflow-x: hidden;
  z-index: 10;
}

.app-minimap {
  position: fixed;
  bottom: 40px; left: 12px;
  width: 164px; height: 104px;
  background: #020c18ee;
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 4px 20px #000a;
}

.app-statusbar {
  flex-shrink: 0; height: 28px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  display: flex; align-items: center;
  padding: 0 16px; gap: 8px;
  font-size: 10px; color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
  z-index: 100;
}
.sb-sep { color: var(--border-bright); }

/* toolbar */
.toolbar {
  display: flex; align-items: center;
  height: 52px; padding: 0 16px; gap: 12px;
}

.toolbar-brand {
  display: flex; align-items: center; gap: 8px;
  margin-right: 12px;
}
.toolbar-logo {
  font-size: 20px; color: var(--accent-amber);
  text-shadow: 0 0 12px var(--accent-amber);
}
.toolbar-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800; color: var(--text-primary);
  letter-spacing: -0.5px;
}
.toolbar-subtitle {
  font-size: 9px; color: var(--text-muted);
  letter-spacing: 2px; font-family: var(--font-mono);
  margin-top: 2px;
}

.toolbar-center {
  flex: 1; display: flex; align-items: center; gap: 4px;
}
.toolbar-right {
  display: flex; align-items: center; gap: 8px;
}

.tb-btn {
  height: 30px; padding: 0 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text-secondary);
  font-size: 11px; font-family: var(--font-mono);
  cursor: pointer; display: flex; align-items: center; gap: 5px;
  transition: all 0.15s;
  white-space: nowrap;
}
.tb-btn:hover {
  background: var(--bg-elevated);
  border-color: var(--border-bright);
  color: var(--text-primary);
}
.tb-icon { font-size: 13px; }
.tb-divider {
  width: 1px; height: 20px;
  background: var(--border); margin: 0 4px;
}

.tb-mode-switch {
  display: flex; background: var(--bg-base);
  border: 1px solid var(--border); border-radius: 6px;
  overflow: hidden;
}
.tb-mode-btn {
  padding: 0 16px; height: 32px;
  background: transparent; border: none;
  color: var(--text-muted);
  font-size: 11px; font-family: var(--font-mono);
  cursor: pointer; letter-spacing: 1px;
  transition: all 0.15s;
}
.tb-mode-btn.active {
  background: var(--bg-elevated);
  color: var(--accent-amber);
}
.tb-mode-btn--preview.active { color: var(--accent-green); }
.tb-mode-btn:hover:not(.active) { color: var(--text-secondary); }

/* edit panel */
.edit-panel-inner {
  display: flex; flex-direction: column; gap: 0; padding-bottom: 20px;
}

.ep-header {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--border);
}
.ep-type-badge {
  font-size: 9px; font-weight: 700; letter-spacing: 2px;
  padding: 2px 8px; border-radius: 4px; border: 1px solid;
  font-family: var(--font-mono);
}
.ep-node-id {
  font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);
  margin-right: auto;
}
.ep-delete-btn {
  background: transparent; border: 1px solid var(--border);
  border-radius: 4px; color: var(--accent-red);
  width: 26px; height: 26px; cursor: pointer;
  font-size: 11px; line-height: 1;
  transition: all 0.15s;
}
.ep-delete-btn:hover { background: #2d0a0a; border-color: var(--accent-red); }

.ep-section {
  padding: 14px 16px 0;
}
.ep-label {
  display: block;
  font-size: 9px; font-weight: 700; letter-spacing: 2px;
  color: var(--text-muted); margin-bottom: 8px;
  font-family: var(--font-mono);
}
.ep-textarea, .ep-input, .ep-select {
  width: 100%;
  background: var(--bg-base); border: 1px solid var(--border);
  border-radius: 5px; color: var(--text-primary);
  font-family: var(--font-mono); font-size: 11px;
  padding: 8px 10px; resize: vertical;
  transition: border-color 0.15s;
  outline: none;
}
.ep-textarea:focus, .ep-input:focus, .ep-select:focus {
  border-color: var(--accent-blue);
}
.ep-select { appearance: none; padding-right: 8px; cursor: pointer; }

.ep-option-row {
  margin-bottom: 10px; padding: 10px;
  background: var(--bg-base); border: 1px solid var(--border);
  border-radius: 6px;
}
.ep-rm-option {
  background: transparent; border: 1px solid var(--border);
  border-radius: 4px; color: var(--accent-red);
  width: 28px; height: 28px; flex-shrink: 0;
  cursor: pointer; font-size: 10px; transition: all 0.15s;
}
.ep-rm-option:hover { background: #2d0a0a; }

.ep-add-option {
  background: transparent; border: 1px solid var(--border);
  border-radius: 4px; color: var(--accent-green);
  padding: 3px 10px; font-size: 10px;
  font-family: var(--font-mono); cursor: pointer;
  transition: all 0.15s;
}
.ep-add-option:hover { background: #052e16; border-color: var(--accent-green); }

/* canvas */
.canvas-world {
  position: absolute; top: 0; left: 0;
}

/* node cards */
.node-card { transition: box-shadow 0.2s, border-color 0.2s, transform 0.1s; }
.node-card:hover { z-index: 5 !important; transform: translateY(-1px); }

/* preview mode */
.preview-container {
  width: 100%; max-width: 540px;
  height: calc(100vh - 80px);
  display: flex; flex-direction: column;
  border: 1px solid var(--border-bright);
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: 0 24px 80px #000c;
  margin: 0 auto;
}

.preview-header {
  padding: 14px 20px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.preview-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
}
.preview-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--accent-green);
  box-shadow: 0 0 8px var(--accent-green);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
}
.preview-status { font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }

.preview-messages {
  flex: 1; overflow-y: auto; padding: 20px 16px;
  display: flex; flex-direction: column; gap: 14px;
  scroll-behavior: smooth;
}
.preview-messages::-webkit-scrollbar { width: 4px; }
.preview-messages::-webkit-scrollbar-track { background: transparent; }
.preview-messages::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 2px; }

.preview-bot-msg {
  display: flex; gap: 10px; align-items: flex-start;
}
.preview-bot-msg--latest .preview-bubble {
  animation: bubble-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes bubble-in {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to { opacity: 1; transform: none; }
}
.preview-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--bg-elevated); border: 1px solid var(--border-bright);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
}
.preview-bubble {
  background: var(--bg-elevated);
  border: 1px solid var(--border-bright);
  border-radius: 4px 14px 14px 14px;
  padding: 12px 16px;
  font-size: 13px; line-height: 1.6; color: var(--text-primary);
  font-family: var(--font-mono);
  max-width: 400px;
}

.preview-user-msg {
  display: flex; justify-content: flex-end;
}
.preview-user-bubble {
  background: #0c2340;
  border: 1px solid #1e3a5f;
  border-radius: 14px 4px 14px 14px;
  padding: 10px 16px;
  font-size: 12px; color: var(--accent-blue);
  font-family: var(--font-mono);
  animation: bubble-in 0.25s ease both;
}

.preview-actions {
  padding: 16px 20px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
}

.preview-choices {
  display: flex; flex-direction: column; gap: 8px;
}
.preview-choice-btn {
  width: 100%; padding: 12px 16px;
  background: var(--bg-base); border: 1px solid var(--border-bright);
  border-radius: 8px; color: var(--text-primary);
  font-size: 12px; font-family: var(--font-mono);
  cursor: pointer; text-align: left;
  transition: all 0.15s;
}
.preview-choice-btn:hover {
  background: #0c2340; border-color: var(--accent-blue);
  color: var(--accent-blue); transform: translateX(4px);
}

.preview-end-state {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 8px 0;
}
.preview-end-icon {
  width: 40px; height: 40px; border-radius: 50%;
  background: #052e16; border: 1px solid var(--accent-green);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent-green); font-size: 18px;
}
.preview-end-text { font-size: 11px; color: var(--text-muted); letter-spacing: 1px; }
.preview-restart-btn {
  padding: 10px 28px;
  background: transparent; border: 1px solid var(--border-bright);
  border-radius: 6px; color: var(--text-secondary);
  font-size: 11px; font-family: var(--font-mono);
  cursor: pointer; letter-spacing: 1px;
  transition: all 0.15s;
}
.preview-restart-btn:hover {
  background: var(--bg-elevated);
  color: var(--accent-amber); border-color: var(--accent-amber);
}

/* sidebar scrollbar */
.app-sidebar::-webkit-scrollbar { width: 4px; }
.app-sidebar::-webkit-scrollbar-track { background: transparent; }
.app-sidebar::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 2px; }

/* responsive tweaks */
@media (max-width: 1280px) {
  .app-sidebar {
    width: 250px;
  }

  .toolbar {
    gap: 8px;
    padding: 0 12px;
  }

  .tb-btn {
    padding: 0 10px;
  }

  .preview-container {
    max-width: 500px;
  }
}

@media (max-width: 1024px) {
  html, body, #root {
    overflow: auto;
  }

  .app-shell {
    min-height: 100vh;
    height: auto;
  }

  .app-body {
    flex-direction: column;
    min-height: calc(100vh - 80px);
  }

  .app-canvas {
    min-height: 56vh;
  }

  .app-sidebar {
    width: 100%;
    max-height: 40vh;
    border-left: none;
    border-top: 1px solid var(--border);
  }

  .app-minimap {
    width: 144px;
    height: 92px;
    bottom: 36px;
    left: 10px;
  }

  .toolbar {
    height: auto;
    min-height: 52px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-wrap: wrap;
  }

  .toolbar-center {
    order: 3;
    width: 100%;
    flex-wrap: wrap;
  }

  .app-statusbar {
    flex-wrap: wrap;
    height: auto;
    min-height: 28px;
    padding-top: 4px;
    padding-bottom: 4px;
    row-gap: 2px;
  }
}

@media (max-width: 640px) {
  .toolbar {
    padding-left: 10px;
    padding-right: 10px;
    gap: 6px;
  }

  .toolbar-brand {
    margin-right: 4px;
  }

  .toolbar-title {
    font-size: 14px;
  }

  .toolbar-subtitle {
    font-size: 8px;
    letter-spacing: 1.4px;
  }

  .tb-btn {
    height: 28px;
    padding: 0 8px;
    font-size: 10px;
  }

  .tb-mode-btn {
    padding: 0 12px;
    height: 30px;
    font-size: 10px;
  }

  .preview-container {
    max-width: 100%;
    height: calc(100vh - 110px);
    border-radius: 10px;
  }

  .preview-header,
  .preview-actions {
    padding-left: 12px;
    padding-right: 12px;
  }

  .preview-messages {
    padding: 14px 12px;
  }

  .preview-bubble {
    max-width: calc(100vw - 110px);
    font-size: 12px;
  }

  .app-minimap {
    display: none;
  }
}
`;class F{constructor(t,e){this.root=t,this.state=new q(e)}mount(){const t=document.createElement("style");t.textContent=G,document.head.appendChild(t),this._buildLayout(),this.state.subscribe(e=>this._render(e)),this._render(this.state.getSnapshot())}_buildLayout(){this.root.innerHTML=`
      <div class="app-shell">
        <div class="app-toolbar" id="app-toolbar"></div>
        <div class="app-body">
          <div class="app-canvas" id="app-canvas"></div>
          <div class="app-sidebar" id="app-sidebar"></div>
        </div>
        <div class="app-minimap" id="app-minimap"></div>
        <div class="app-statusbar" id="app-statusbar"></div>
      </div>
    `,this.toolbarEl=this.root.querySelector("#app-toolbar"),this.canvasEl=this.root.querySelector("#app-canvas"),this.sidebarEl=this.root.querySelector("#app-sidebar"),this.minimapEl=this.root.querySelector("#app-minimap"),this.statusEl=this.root.querySelector("#app-statusbar"),this.canvas=new X(this.canvasEl,this.state)}_render(t){if(Z(this.state,this.toolbarEl),t.mode==="editor"){this.canvasEl.style.display="block",this.sidebarEl.style.display="flex",this.minimapEl.style.display="block",this.canvas.render(t);const e=t.selectedNodeId?t.nodes.find(s=>s.id===t.selectedNodeId):null;B(e,this.state,this.sidebarEl),Q(t.nodes,t.pan,t.zoom,this.minimapEl),this.statusEl.innerHTML=`
        <span>${t.nodes.length} nodes</span>
        <span class="sb-sep">·</span>
        <span>Zoom ${Math.round(t.zoom*100)}%</span>
        <span class="sb-sep">·</span>
        <span>${t.selectedNodeId?`Selected #${t.selectedNodeId}`:"No selection"}</span>
        <span class="sb-sep">·</span>
        <span style="color:#475569">Drag to move nodes · Scroll to zoom · Space-drag to pan</span>
      `}else this.canvasEl.style.display="none",this.sidebarEl.style.display="none",this.minimapEl.style.display="none",this.canvasEl.style.display="flex",this.canvasEl.style.alignItems="center",this.canvasEl.style.justifyContent="center",U(this.state,this.canvasEl),this.statusEl.innerHTML=`
        <span style="color:#f59e0b">▶ Preview Mode</span>
        <span class="sb-sep">·</span>
        <span>Step ${t.previewHistory.length} of conversation</span>
      `}}const K={theme:"dark",canvas_size:{w:1200,h:800}},V=[{id:"1",type:"start",text:"Welcome to Support. What is your issue?",position:{x:500,y:50},options:[{label:"Internet is down",nextId:"2"},{label:"Billing Question",nextId:"3"}]},{id:"2",type:"question",text:"Have you tried restarting your router?",position:{x:250,y:250},options:[{label:"Yes, didn't work",nextId:"4"},{label:"No, let me try",nextId:"5"}]},{id:"3",type:"question",text:"Is this for a Personal or Business account?",position:{x:750,y:250},options:[{label:"Personal",nextId:"6"},{label:"Business",nextId:"6"}]},{id:"4",type:"end",text:"Please call 555-0199 for a technician visit.",position:{x:100,y:500},options:[]},{id:"5",type:"end",text:"Restarting usually fixes it! Come back if it fails.",position:{x:400,y:500},options:[]},{id:"6",type:"end",text:"Connecting you to a Billing Agent...",position:{x:750,y:500},options:[]}],tt={meta:K,nodes:V},et=document.getElementById("root"),it=new F(et,tt);it.mount();

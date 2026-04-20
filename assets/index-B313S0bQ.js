(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={raycast:`안녕하세요 ChatGPT. 저는 현재 건축 관련 석사 재학 중이며, 코딩에 대한 경험이 전혀 없는 초보자입니다. 
Unity 3D 환경에서 '인지 에이전트(Cognitive Agent)' 시뮬레이션을 구현하려고 합니다.

[작업 목표]
현재 에이전트가 벽 너머를 보지 못하도록 'Raycast 기반의 가시성(Visibility) 계산 시스템'을 C# 스크립트로 작성해야 합니다.

[요청 사항]
1. 에이전트의 시야각(예: 120도)과 시야 거리(예: 10m)를 인스펙터에서 수정 가능하도록 Public 변수로 선언해 주세요.
2. Raycast를 에이전트 앞쪽으로 부채꼴 모양으로 쏘아서, 벽(Wall 태그)에 닿으면 멈추고, 목표물(Target 태그)에 닿으면 "목표 발견"을 반환하는 코드를 작성해 주세요.
3. 제가 너무 쌩초보이므로, 이 스크립트를 유니티에서 어떻게 에이전트에게 넣어야 하는지(컴포넌트 추가 방법 등) 1, 2, 3 단계로 아주 쉽게 설명해 주세요.`,navigation:`안녕하세요 ChatGPT. 저는 코딩 경험이 없는 건축학 대학원생입니다.
Unity에서 '인지 에이전트'가 움직이는 내비게이션 로직을 C#으로 짜고 싶습니다.

[작업 목표]
에이전트가 A* 같은 최단경로가 아니라, 인간처럼 다음 4가지 상태(전략)를 상황에 따라 바꿔가며 이동하는 FSM(유한상태기계) 구조를 원합니다.

[요청 사항]
1. 상태: 1) 최단경로 이동, 2) 방향만 보고 이동, 3) 층간 이동 탐색, 4) 중앙 빈공간 탐색 (랜덤 배회) 로 나누어 설계해 주세요.
2. 각 상태가 언제 다른 상태로 넘어가는지 조건문(if-else) 뼈대 코드를 아주 직관적으로 작성해 주세요.
3. 유니티의 NavMesh 플러그인을 기본으로 사용할 예정입니다.
4. 제가 이 스크립트의 뼈대를 어떻게 채워나가야 하는지, 주석을 통해서 "이 부분에는 OOO을 쓰세요"라고 한글로 친절히 달아주세요.`,logging:`안녕하세요 ChatGPT. 저는 코딩 경험이 없는 초보 연구자입니다.
Unity 시뮬레이션 결과를 나중에 논문에 쓰기 위해 에이전트의 이동 경로를 엑셀(CSV)로 자동 저장하고 싶습니다.

[작업 목표]
에이전트의 실시간 X, Y, Z 좌표와 현재 시간을 매 0.5초마다 .csv 파일로 로컬 PC에 저장하는 C# 스크립트를 작성해 주세요.

[요청 사항]
1. 유니티 플레이 버튼을 누르면 "Log_날짜_시간.csv" 파일이 새로 생성되게 해주세요.
2. 첫 번째 줄(헤더)에는 Time, X, Y, Z 가 들어가게 해주세요.
3. Update 함수에서 시간을 재서 0.5초(혹은 인스펙터에서 설정한 시간 간격)마다 에이전트의 transform.position을 파일 맨 밑줄에 이어쓰기(Append) 하는 방식으로 구현해 주세요.
4. 파일 입출력을 위해 System.IO를 쓰는 방법을 가장 간단하게 구현해 주세요.`};document.getElementById(`generate-prompt-btn`).addEventListener(`click`,()=>{let t=document.getElementById(`prompt-type`).value,n=document.getElementById(`prompt-result-container`),r=document.getElementById(`prompt-output`);r.textContent=e[t],n.classList.remove(`hidden`)}),document.getElementById(`copy-prompt-btn`).addEventListener(`click`,()=>{let e=document.getElementById(`prompt-output`).textContent;navigator.clipboard.writeText(e).then(()=>{let e=document.getElementById(`copy-prompt-btn`);e.textContent=`복사 완료!`,e.classList.add(`btn-primary`),e.classList.remove(`btn-secondary`),setTimeout(()=>{e.textContent=`복사하기`,e.classList.remove(`btn-primary`),e.classList.add(`btn-secondary`)},2e3)})});var t=(e,t)=>{document.getElementById(e).addEventListener(`input`,e=>{document.getElementById(t).textContent=e.target.value})};t(`input-speed`,`val-speed`),t(`input-fov`,`val-fov`),t(`input-memory`,`val-memory`),document.getElementById(`download-config-btn`).addEventListener(`click`,()=>{let e={agentSpeed:parseFloat(document.getElementById(`input-speed`).value),fieldOfView:parseInt(document.getElementById(`input-fov`).value),memoryLimit:parseInt(document.getElementById(`input-memory`).value)},t=`data:text/json;charset=utf-8,`+encodeURIComponent(JSON.stringify(e,null,2)),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`AgentConfig.json`),document.body.appendChild(n),n.click(),n.remove()});var n=document.getElementById(`drop-zone`),r=document.getElementById(`csv-file-input`),i=document.getElementById(`viz-container`),a=document.getElementById(`trajectory-canvas`),o=a.getContext(`2d`);n.addEventListener(`click`,()=>r.click()),n.addEventListener(`dragover`,e=>{e.preventDefault(),n.classList.add(`dragover`)}),n.addEventListener(`dragleave`,()=>{n.classList.remove(`dragover`)}),n.addEventListener(`drop`,e=>{e.preventDefault(),n.classList.remove(`dragover`),e.dataTransfer.files.length&&s(e.dataTransfer.files[0])}),r.addEventListener(`change`,e=>{e.target.files.length&&s(e.target.files[0])});function s(e){if(!e.name.endsWith(`.csv`)){alert(`CSV 파일만 업로드 가능합니다.`);return}let t=new FileReader;t.onload=e=>{let t=e.target.result;c(t)},t.readAsText(e)}function c(e){let t=e.split(`
`).filter(e=>e.trim()!==``);if(t.length<2)return;let n=t[0].toLowerCase().split(`,`),r=n.findIndex(e=>e.includes(`x`)),i=n.findIndex(e=>e.includes(`z`)||e.includes(`y`));l(r===-1||i===-1?t.slice(1).map(e=>{let t=e.split(`,`);return{x:parseFloat(t[1]||0),z:parseFloat(t[2]||0)}}):t.slice(1).map(e=>{let t=e.split(`,`);return{x:parseFloat(t[r]||0),z:parseFloat(t[i]||0)}}))}function l(e){if(i.classList.remove(`hidden`),o.clearRect(0,0,a.width,a.height),e.length===0)return;let t=1/0,n=-1/0,r=1/0,s=-1/0;e.forEach(e=>{e.x<t&&(t=e.x),e.x>n&&(n=e.x),e.z<r&&(r=e.z),e.z>s&&(s=e.z)});let c=n-t||1,l=s-r||1,u=e=>40+(e-t)/c*(a.width-80),d=e=>a.height-(40+(e-r)/l*(a.height-80));o.beginPath(),o.moveTo(u(e[0].x),d(e[0].z));for(let t=1;t<e.length;t++)o.lineTo(u(e[t].x),d(e[t].z));o.strokeStyle=`#2D63E2`,o.lineWidth=2,o.lineJoin=`round`,o.lineCap=`round`,o.stroke(),o.beginPath(),o.arc(u(e[0].x),d(e[0].z),6,0,Math.PI*2),o.fillStyle=`#4CAF50`,o.fill();let f=e[e.length-1];o.beginPath(),o.arc(u(f.x),d(f.z),6,0,Math.PI*2),o.fillStyle=`#F44336`,o.fill()}document.getElementById(`reset-viz-btn`).addEventListener(`click`,()=>{i.classList.add(`hidden`),r.value=``});
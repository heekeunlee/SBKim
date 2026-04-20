// ===== Tab Navigation Logic =====
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and target content
    button.classList.add('active');
    const targetId = button.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

// ===== Module 1: AI Prompt Master =====
const prompts = {
  raycast: `안녕하세요 ChatGPT. 저는 현재 건축 관련 석사 재학 중이며, 코딩에 대한 경험이 전혀 없는 초보자입니다. 
Unity 3D 환경에서 '인지 에이전트(Cognitive Agent)' 시뮬레이션을 구현하려고 합니다.

[작업 목표]
현재 에이전트가 벽 너머를 보지 못하도록 'Raycast 기반의 가시성(Visibility) 계산 시스템'을 C# 스크립트로 작성해야 합니다.

[요청 사항]
1. 에이전트의 시야각(예: 120도)과 시야 거리(예: 10m)를 인스펙터에서 수정 가능하도록 Public 변수로 선언해 주세요.
2. Raycast를 에이전트 앞쪽으로 부채꼴 모양으로 쏘아서, 벽(Wall 태그)에 닿으면 멈추고, 목표물(Target 태그)에 닿으면 "목표 발견"을 반환하는 코드를 작성해 주세요.
3. 제가 너무 쌩초보이므로, 이 스크립트를 유니티에서 어떻게 에이전트에게 넣어야 하는지(컴포넌트 추가 방법 등) 1, 2, 3 단계로 아주 쉽게 설명해 주세요.`,
  
  navigation: `안녕하세요 ChatGPT. 저는 코딩 경험이 없는 건축학 대학원생입니다.
Unity에서 '인지 에이전트'가 움직이는 내비게이션 로직을 C#으로 짜고 싶습니다.

[작업 목표]
에이전트가 A* 같은 최단경로가 아니라, 인간처럼 다음 4가지 상태(전략)를 상황에 따라 바꿔가며 이동하는 FSM(유한상태기계) 구조를 원합니다.

[요청 사항]
1. 상태: 1) 최단경로 이동, 2) 방향만 보고 이동, 3) 층간 이동 탐색, 4) 중앙 빈공간 탐색 (랜덤 배회) 로 나누어 설계해 주세요.
2. 각 상태가 언제 다른 상태로 넘어가는지 조건문(if-else) 뼈대 코드를 아주 직관적으로 작성해 주세요.
3. 유니티의 NavMesh 플러그인을 기본으로 사용할 예정입니다.
4. 제가 이 스크립트의 뼈대를 어떻게 채워나가야 하는지, 주석을 통해서 "이 부분에는 OOO을 쓰세요"라고 한글로 친절히 달아주세요.`,
  
  logging: `안녕하세요 ChatGPT. 저는 코딩 경험이 없는 초보 연구자입니다.
Unity 시뮬레이션 결과를 나중에 논문에 쓰기 위해 에이전트의 이동 경로를 엑셀(CSV)로 자동 저장하고 싶습니다.

[작업 목표]
에이전트의 실시간 X, Y, Z 좌표와 현재 시간을 매 0.5초마다 .csv 파일로 로컬 PC에 저장하는 C# 스크립트를 작성해 주세요.

[요청 사항]
1. 유니티 플레이 버튼을 누르면 "Log_날짜_시간.csv" 파일이 새로 생성되게 해주세요.
2. 첫 번째 줄(헤더)에는 Time, X, Y, Z 가 들어가게 해주세요.
3. Update 함수에서 시간을 재서 0.5초(혹은 인스펙터에서 설정한 시간 간격)마다 에이전트의 transform.position을 파일 맨 밑줄에 이어쓰기(Append) 하는 방식으로 구현해 주세요.
4. 파일 입출력을 위해 System.IO를 쓰는 방법을 가장 간단하게 구현해 주세요.`
};

document.getElementById('generate-prompt-btn').addEventListener('click', () => {
  const type = document.getElementById('prompt-type').value;
  const container = document.getElementById('prompt-result-container');
  const output = document.getElementById('prompt-output');
  
  output.textContent = prompts[type];
  container.classList.remove('hidden');
});

document.getElementById('copy-prompt-btn').addEventListener('click', () => {
  const output = document.getElementById('prompt-output').textContent;
  navigator.clipboard.writeText(output).then(() => {
    const btn = document.getElementById('copy-prompt-btn');
    btn.textContent = "복사 완료!";
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-secondary');
    setTimeout(() => {
      btn.textContent = "복사하기";
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    }, 2000);
  });
});

// ===== Module 2: Parameter Configurator =====
const updateVal = (id, valId) => {
  document.getElementById(id).addEventListener('input', (e) => {
    document.getElementById(valId).textContent = e.target.value;
  });
};

updateVal('input-speed', 'val-speed');
updateVal('input-fov', 'val-fov');
updateVal('input-memory', 'val-memory');

document.getElementById('download-config-btn').addEventListener('click', () => {
  const config = {
    agentSpeed: parseFloat(document.getElementById('input-speed').value),
    fieldOfView: parseInt(document.getElementById('input-fov').value),
    memoryLimit: parseInt(document.getElementById('input-memory').value)
  };
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "AgentConfig.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});

// ===== Module 3: CSV Visualizer =====
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('csv-file-input');
const vizContainer = document.getElementById('viz-container');
const canvas = document.getElementById('trajectory-canvas');
const ctx = canvas.getContext('2d');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer.files.length) {
    handleFile(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length) {
    handleFile(e.target.files[0]);
  }
});

function handleFile(file) {
  if (!file.name.endsWith('.csv')) {
    alert('CSV 파일만 업로드 가능합니다.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    parseAndDraw(text);
  };
  reader.readAsText(file);
}

function parseAndDraw(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return;
  
  // Try to find X, Y, Z columns
  const header = lines[0].toLowerCase().split(',');
  const xIdx = header.findIndex(h => h.includes('x'));
  // In Unity, Z is forward/backward map coordinate, Y is up (height)
  const zIdx = header.findIndex(h => h.includes('z') || h.includes('y')); 
  
  if (xIdx === -1 || zIdx === -1) {
    // Fallback: assume column 1 is X and 2 is Z
    drawTrajectory(lines.slice(1).map(l => {
      const p = l.split(',');
      return {x: parseFloat(p[1]||0), z: parseFloat(p[2]||0)};
    }));
  } else {
    drawTrajectory(lines.slice(1).map(l => {
      const p = l.split(',');
      return {x: parseFloat(p[xIdx]||0), z: parseFloat(p[zIdx]||0)};
    }));
  }
}

function drawTrajectory(points) {
  vizContainer.classList.remove('hidden');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if(points.length === 0) return;
  
  // Find min/max for normalization
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  points.forEach(p => {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.z < minZ) minZ = p.z;
    if (p.z > maxZ) maxZ = p.z;
  });
  
  // Add padding
  const padding = 40;
  const rangeX = (maxX - minX) || 1;
  const rangeZ = (maxZ - minZ) || 1;
  
  // Scale function
  const scaleX = x => padding + ((x - minX) / rangeX) * (canvas.width - padding * 2);
  const scaleZ = z => canvas.height - (padding + ((z - minZ) / rangeZ) * (canvas.height - padding * 2)); // Invert Z for screen coords
  
  // Draw path
  ctx.beginPath();
  ctx.moveTo(scaleX(points[0].x), scaleZ(points[0].z));
  
  for(let i=1; i<points.length; i++) {
    ctx.lineTo(scaleX(points[i].x), scaleZ(points[i].z));
  }
  
  ctx.strokeStyle = '#2D63E2';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Draw start/end markers
  ctx.beginPath();
  ctx.arc(scaleX(points[0].x), scaleZ(points[0].z), 6, 0, Math.PI*2);
  ctx.fillStyle = '#4CAF50'; // Start = Green
  ctx.fill();
  
  const last = points[points.length-1];
  ctx.beginPath();
  ctx.arc(scaleX(last.x), scaleZ(last.z), 6, 0, Math.PI*2);
  ctx.fillStyle = '#F44336'; // End = Red
  ctx.fill();
}

document.getElementById('reset-viz-btn').addEventListener('click', () => {
  vizContainer.classList.add('hidden');
  fileInput.value = '';
});

// ===== Module 4: Live Interactive Simulator (JS) =====
const simCanvas = document.getElementById('live-sim-canvas');
const simCtx = simCanvas.getContext('2d');
const simStateBadge = document.getElementById('sim-state-badge');

let simRunning = false;
let simAgent = { x: 50, y: 150, history: [] };
let simGoal = { x: 550, y: 150 };
let simWalls = [
  { x: 250, y: 0, w: 20, h: 200 },
  { x: 400, y: 150, w: 20, h: 150 }
];

function drawSim() {
  simCtx.clearRect(0, 0, simCanvas.width, simCanvas.height);
  
  // Draw Goal
  simCtx.beginPath();
  simCtx.arc(simGoal.x, simGoal.y, 10, 0, Math.PI*2);
  simCtx.fillStyle = '#F44336';
  simCtx.fill();
  
  // Draw Walls
  simCtx.fillStyle = '#8B95A1';
  simWalls.forEach(w => simCtx.fillRect(w.x, w.y, w.w, w.h));
  
  // Draw Hist
  if (simAgent.history.length > 1) {
    simCtx.beginPath();
    simCtx.moveTo(simAgent.history[0].x, simAgent.history[0].y);
    simAgent.history.forEach(p => simCtx.lineTo(p.x, p.y));
    simCtx.strokeStyle = '#E5E8EB';
    simCtx.stroke();
  }
  
  // Draw Agent
  simCtx.beginPath();
  simCtx.arc(simAgent.x, simAgent.y, 8, 0, Math.PI*2);
  simCtx.fillStyle = '#2D63E2';
  simCtx.fill();
}

function updateSim() {
  if (!simRunning) return;
  
  const speed = parseFloat(document.getElementById('input-speed').value) / 2;
  const dx = simGoal.x - simAgent.x;
  const dy = simGoal.y - simAgent.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  
  if (dist < 10) {
    simRunning = false;
    simStateBadge.textContent = "상태: 목적지 도착";
    simStateBadge.style.background = "#4CAF50";
    return;
  }
  
  // Cognitive Logic Mockup
  let vx = (dx / dist) * speed;
  let vy = (dy / dist) * speed;
  
  // Simple Wall Collision
  simWalls.forEach(w => {
    if (simAgent.x + vx > w.x && simAgent.x + vx < w.x + w.w &&
        simAgent.y + vy > w.y && simAgent.y + vy < w.y + w.h) {
      vx = 0; // Blocked
      vy = speed; // Try to slide/find way (Direction Strategy)
      simStateBadge.textContent = "상태: 장애물 회피 중 (방향 전략)";
    }
  });

  simAgent.x += vx;
  simAgent.y += vy;
  simAgent.history.push({x: simAgent.x, y: simAgent.y});
  
  drawSim();
  requestAnimationFrame(updateSim);
}

document.getElementById('start-sim-btn').addEventListener('click', () => {
  simRunning = !simRunning;
  if (simRunning) {
    simStateBadge.textContent = "상태: 목적지 탐색 중";
    simStateBadge.style.background = "#2D63E2";
    updateSim();
  }
});

document.getElementById('reset-sim-btn').addEventListener('click', () => {
  simRunning = false;
  simAgent = { x: 50, y: 150, history: [] };
  simStateBadge.textContent = "상태: 대기 중";
  simStateBadge.style.background = "#8B95A1";
  drawSim();
});

document.getElementById('save-sim-csv-btn').addEventListener('click', () => {
    if (simAgent.history.length === 0) {
        alert("저장할 데이터가 없습니다. 시뮬레이션을 먼저 실행해주세요.");
        return;
    }

    let csvContent = "Time,X,Y\n";
    simAgent.history.forEach((p, index) => {
        csvContent += `${(index * 0.1).toFixed(1)},${p.x.toFixed(2)},${p.y.toFixed(2)}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `live_sim_log_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("CSV 파일이 저장되었습니다. 이제 '4. 노코드 도구' 탭의 분석기에서 이 파일을 확인해보세요!");
});

drawSim();

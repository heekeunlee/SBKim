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

// ===== Inner Tab Logic (Nested Tabs) =====
function initInnerTabs() {
  document.querySelectorAll('.inner-tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.closest('.inner-tabs');
      parent.querySelectorAll('.inner-tab-btn').forEach(btn => btn.classList.remove('active'));
      parent.querySelectorAll('.inner-tab-content').forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      const targetId = button.getAttribute('data-inner-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}
initInnerTabs();

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
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', (e) => {
      document.getElementById(valId).textContent = e.target.value;
    });
  }
};

updateVal('input-speed', 'val-speed');
updateVal('input-fov', 'val-fov');
updateVal('input-memory', 'val-memory');
updateVal('input-rot-sim', 'val-rot-sim');
updateVal('input-obs-sim', 'val-obs-sim');
updateVal('input-attract-sim', 'val-attract-sim');

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
  
  const header = lines[0].toLowerCase().split(',');
  const xIdx = header.findIndex(h => h.includes('x'));
  const zIdx = header.findIndex(h => h.includes('z') || h.includes('y')); 
  
  if (xIdx === -1 || zIdx === -1) {
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(points.length === 0) return;
  
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  points.forEach(p => {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.z < minZ) minZ = p.z;
    if (p.z > maxZ) maxZ = p.z;
  });
  
  const padding = 40;
  const rangeX = (maxX - minX) || 1;
  const rangeZ = (maxZ - minZ) || 1;
  const scaleX = x => padding + ((x - minX) / rangeX) * (canvas.width - padding * 2);
  const scaleZ = z => canvas.height - (padding + ((z - minZ) / rangeZ) * (canvas.height - padding * 2));
  
  ctx.beginPath();
  ctx.moveTo(scaleX(points[0].x), scaleZ(points[0].z));
  for(let i=1; i<points.length; i++) {
    ctx.lineTo(scaleX(points[i].x), scaleZ(points[i].z));
  }
  ctx.strokeStyle = '#2D63E2';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath(); ctx.arc(scaleX(points[0].x), scaleZ(points[0].z), 6, 0, Math.PI*2); ctx.fillStyle = '#4CAF50'; ctx.fill();
  const last = points[points.length-1];
  ctx.beginPath(); ctx.arc(scaleX(last.x), scaleZ(last.z), 6, 0, Math.PI*2); ctx.fillStyle = '#F44336'; ctx.fill();
}

document.getElementById('reset-viz-btn').addEventListener('click', () => {
  vizContainer.classList.add('hidden');
  fileInput.value = '';
});

// ===== Module 4: Live Interactive Simulator (JS) =====
const simCanvas = document.getElementById('live-sim-canvas');
const simCtx = simCanvas.getContext('2d');
const simStateBadge = document.getElementById('sim-state-badge');

const syncSliders = (id1, id2, val1, val2) => {
    const s1 = document.getElementById(id1);
    const s2 = document.getElementById(id2);
    const v1 = document.getElementById(val1);
    const v2 = document.getElementById(val2);

    const update = (val) => {
        s1.value = val;
        s2.value = val;
        v1.textContent = val;
        v2.textContent = val;
    };

    s1.addEventListener('input', (e) => update(e.target.value));
    s2.addEventListener('input', (e) => update(e.target.value));
};

syncSliders('input-speed', 'input-speed-sim', 'val-speed', 'val-speed-sim');
syncSliders('input-fov', 'input-fov-sim', 'val-fov', 'val-fov-sim');
syncSliders('input-memory', 'input-memory-sim', 'val-memory', 'val-memory-sim');

let simRunning = false;
let simAgent = { x: 50, y: 150, history: [] };
let simGoal = { x: 550, y: 150 };
let simWalls = [
  { x: 250, y: 0, w: 20, h: 200 },
  { x: 400, y: 150, w: 20, h: 150 }
];

let allSimRuns = [];
const colorPalette = ['#6200EE', '#03DAC6', '#FF0266', '#FFDE03', '#03A9F4', '#4CAF50', '#FF9800'];

function drawSim() {
  simCtx.clearRect(0, 0, simCanvas.width, simCanvas.height);
  simCtx.beginPath(); simCtx.arc(simGoal.x, simGoal.y, 10, 0, Math.PI*2); simCtx.fillStyle = '#F44336'; simCtx.fill();
  simCtx.fillStyle = '#8B95A1'; simWalls.forEach(w => simCtx.fillRect(w.x, w.y, w.w, w.h));
  if (simAgent.history.length > 1) {
    simCtx.beginPath();
    simCtx.moveTo(simAgent.history[0].x, simAgent.history[0].y);
    simAgent.history.forEach(p => simCtx.lineTo(p.x, p.y));
    simCtx.strokeStyle = '#E5E8EB';
    simCtx.lineWidth = 1.5;
    simCtx.stroke();
  }
  simCtx.beginPath(); simCtx.arc(simAgent.x, simAgent.y, 8, 0, Math.PI*2); simCtx.fillStyle = '#2D63E2'; simCtx.fill();
}

function updateSim() {
  if (!simRunning) return;
  const speed = parseFloat(document.getElementById('input-speed-sim').value) / 2;
  const dx = simGoal.x - simAgent.x;
  const dy = simGoal.y - simAgent.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < 10) {
    simRunning = false;
    simStateBadge.textContent = "상태: 목적지 도착";
    simStateBadge.style.background = "#4CAF50";
    return;
  }
  let vx = (dx / dist) * speed;
  let vy = (dy / dist) * speed;
  simWalls.forEach(w => {
    if (simAgent.x + vx > w.x && simAgent.x + vx < w.x + w.w &&
        simAgent.y + vy > w.y && simAgent.y + vy < w.y + w.h) {
      vx = 0; vy = speed; simStateBadge.textContent = "상태: 장애물 회피 중 (방향 전략)";
    }
  });
  simAgent.x += vx; simAgent.y += vy;
  simAgent.history.push({x: simAgent.x, y: simAgent.y, dist: dist});
  drawSim();
  requestAnimationFrame(updateSim);
}

function drawCharts() {
    const chartArea = document.getElementById('sim-analysis-area');
    chartArea.classList.remove('hidden');
    if (simAgent.history.length > 1) {
        const currentParams = {
            speed: document.getElementById('input-speed-sim').value,
            fov: document.getElementById('input-fov-sim').value,
            memory: document.getElementById('input-memory-sim').value,
            timestamp: new Date().toLocaleTimeString()
        };
        if (allSimRuns.length === 0 || allSimRuns[allSimRuns.length-1].data !== simAgent.history) {
            allSimRuns.push({
                data: JSON.parse(JSON.stringify(simAgent.history)),
                params: currentParams,
                color: colorPalette[allSimRuns.length % colorPalette.length]
            });
        }
    }
    if (allSimRuns.length === 0) return;
    updateLegend();
    const perfCanvas = document.getElementById('performance-chart');
    const pc = perfCanvas.getContext('2d');
    pc.clearRect(0, 0, perfCanvas.width, perfCanvas.height);
    const padding = 30;
    const pw = perfCanvas.width - padding * 2;
    const ph = perfCanvas.height - padding * 2;
    pc.beginPath(); pc.moveTo(padding, padding); pc.lineTo(padding, ph + padding); pc.lineTo(pw + padding, ph + padding); pc.strokeStyle = '#ADB5BD'; pc.stroke();
    let maxLen = Math.max(...allSimRuns.map(r => r.data.length));
    let overallMaxDist = Math.max(...allSimRuns.map(r => Math.max(...r.data.map(d => d.dist || 0)))) || 1;
    allSimRuns.forEach(run => {
        const stepX = pw / (maxLen - 1);
        pc.beginPath();
        run.data.forEach((p, i) => {
            const x = padding + i * stepX;
            const y = padding + (ph - (p.dist / overallMaxDist) * ph);
            if (i === 0) pc.moveTo(x, y); else pc.lineTo(x, y);
        });
        pc.strokeStyle = run.color; pc.lineWidth = 2; pc.stroke();
    });
    const trajCanvas = document.getElementById('trajectory-chart');
    const tc = trajCanvas.getContext('2d');
    tc.clearRect(0, 0, trajCanvas.width, trajCanvas.height);
    const tw = trajCanvas.width - padding * 2; const th = trajCanvas.height - padding * 2;
    const sX = x => padding + (x / 600) * tw; const sY = y => padding + (y / 300) * th;
    allSimRuns.forEach(run => {
        tc.beginPath(); tc.moveTo(sX(run.data[0].x), sY(run.data[0].y));
        run.data.forEach(p => tc.lineTo(sX(p.x), sY(p.y)));
        tc.strokeStyle = run.color; tc.lineWidth = 1.5; tc.globalAlpha = 0.8; tc.stroke(); tc.globalAlpha = 1.0;
    });
}

function updateLegend() {
    const legendItems = document.getElementById('legend-items');
    legendItems.innerHTML = '';
    allSimRuns.forEach((run, index) => {
        const item = document.createElement('div');
        item.style.display = 'flex'; item.style.alignItems = 'center'; item.style.gap = '10px'; item.style.fontSize = '12px';
        const dot = document.createElement('span'); dot.style.width = '10px'; dot.style.height = '10px'; dot.style.borderRadius = '50%'; dot.style.background = run.color;
        const text = document.createElement('span');
        text.innerHTML = `<strong>실험 ${index + 1}</strong> (${run.params.timestamp}) - 속도: ${run.params.speed}, 기억: ${run.params.memory}, 시야: ${run.params.fov}°`;
        item.appendChild(dot); item.appendChild(text); legendItems.appendChild(item);
    });
}

document.getElementById('clear-analysis-btn').addEventListener('click', () => {
    allSimRuns = [];
    document.getElementById('sim-analysis-area').classList.add('hidden');
    document.getElementById('legend-items').innerHTML = '';
});

document.getElementById('start-sim-btn').addEventListener('click', () => {
  simRunning = !simRunning;
  if (simRunning) {
    simStateBadge.textContent = "상태: 목적지 탐색 중";
    simStateBadge.style.background = "#2D63E2";
    updateSim();
  } else {
    simStateBadge.textContent = "상태: 일시정지";
    simStateBadge.style.background = "#FF9800";
  }
});

document.getElementById('reset-sim-btn').addEventListener('click', () => {
  simRunning = false;
  simAgent = { x: 50, y: 150, history: [] };
  simStateBadge.textContent = "상태: 대기 중";
  simStateBadge.style.background = "#8B95A1";
  drawSim();
});

document.getElementById('analyze-sim-btn').addEventListener('click', () => {
    drawCharts();
});

document.getElementById('load-sim-csv-btn').addEventListener('click', () => {
    document.getElementById('sim-csv-input').click();
});

document.getElementById('sim-csv-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target.result;
        const lines = text.split('\n').filter(l => l.trim() !== '');
        const header = lines[0].toLowerCase().split(',');
        const xIdx = header.findIndex(h => h.includes('x'));
        const yIdx = header.findIndex(h => h.includes('y'));
        const dIdx = header.findIndex(h => h.includes('dist'));
        const importedData = lines.slice(1).map(l => {
            const p = l.split(',');
            return { x: parseFloat(p[xIdx] || 0), y: parseFloat(p[yIdx] || 0), dist: parseFloat(p[dIdx] || 0) };
        });
        if (importedData.length > 0) {
            allSimRuns.push({
                data: importedData,
                params: { speed: 'CSV', fov: 'CSV', memory: 'CSV', timestamp: file.name },
                color: colorPalette[allSimRuns.length % colorPalette.length]
            });
            drawCharts();
        }
    };
    reader.readAsText(file);
});

document.getElementById('save-sim-csv-btn').addEventListener('click', () => {
    if (simAgent.history.length === 0) {
        alert("저장할 데이터가 없습니다.");
        return;
    }
    let csvContent = "Time,X,Y,Distance\n" + simAgent.history.map((p, i) => `${(i*0.1).toFixed(1)},${p.x.toFixed(2)},${p.y.toFixed(2)},${p.dist.toFixed(2)}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sim_result_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

drawSim();

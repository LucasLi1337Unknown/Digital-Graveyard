let files=[],last=-1,log=[];
const $=id=>document.getElementById(id);
fetch("files.json").then(r=>r.json()).then(x=>{files=x;write("archive index loaded: "+files.length+" artifacts found.");}).catch(()=>write("ERROR: could not load files.json"));
function write(t){const p=document.createElement("p");p.textContent="> "+t;$("screen").appendChild(p);$("screen").scrollTop=$("screen").scrollHeight}
function dig(){
 if(!files.length)return;
 let i;do{i=Math.floor(Math.random()*files.length)}while(files.length>1&&i===last);last=i;
 const f=files[i];
 write("scanning abandoned sectors...");
 setTimeout(()=>write("artifact signature detected: "+f.type),250);
 setTimeout(()=>{
  write("recovery complete.");
  $("name").textContent=f.name;$("type").textContent=f.type;$("year").textContent=f.year;$("category").textContent=f.category;
  $("creepy").textContent="█".repeat(f.creepiness)+"░".repeat(10-f.creepiness)+" "+f.creepiness+"/10";
  $("description").textContent=f.description;$("download").href=f.download;$("source").href=f.source;
  $("artifact").classList.remove("hidden");
  log.unshift(f);renderLog();$("artifact").scrollIntoView({behavior:"smooth",block:"start"});
 },650);
}
function renderLog(){$("historyList").innerHTML=log.length?log.map((f,i)=>`<div class="history-item">${String(log.length-i).padStart(2,"0")} // ${f.name} // ${f.year} // ${f.type}</div>`).join(""):"<div class='history-item'>No recoveries yet.</div>"}
$("dig").onclick=dig;
$("historyBtn").onclick=()=>{$("history").classList.toggle("hidden");renderLog()};
setInterval(()=>$("clock").textContent=new Date().toLocaleTimeString(),1000);

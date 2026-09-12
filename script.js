let files=[];
let last=-1;
let busy=false;

const $=id=>document.getElementById(id);
const logBox=$("log");

function line(text){
    const p=document.createElement("p");
    p.textContent="> "+text;
    logBox.appendChild(p);
    logBox.scrollTop=logBox.scrollHeight;
}

function sleep(ms){
    return new Promise(r=>setTimeout(r,ms));
}

fetch("files.json")
.then(r=>r.json())
.then(data=>{
    files=data;
    line("index loaded: "+files.length+" recoverable artifacts.");
})
.catch(()=>line("ERROR: failed to load artifact index."));

async function recover(){
    if(busy||!files.length)return;
    busy=true;
    $("dig").disabled=true;
    $("reveal").classList.add("hidden");

    let i;
    do{
        i=Math.floor(Math.random()*files.length);
    }while(files.length>1&&i===last);
    last=i;

    const f=files[i];

    line("searching local grave sectors...");
    await sleep(360);
    line("artifact signature detected.");
    await sleep(420);
    line("recovering "+f.filename+"...");
    await sleep(420);

    const a=document.createElement("a");
    a.href="files/"+encodeURIComponent(f.filename);
    a.download=f.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    line("download dispatched.");
    $("name").textContent=f.name;
    $("filename").textContent=f.filename;
    $("year").textContent=f.year;
    $("creepy").textContent="█".repeat(f.creepiness)+"░".repeat(10-f.creepiness)+" "+f.creepiness+"/10";
    $("description").textContent=f.description;
    $("source").href=f.source;
    $("reveal").classList.remove("hidden");

    busy=false;
    $("dig").disabled=false;
    $("reveal").scrollIntoView({behavior:"smooth",block:"start"});
}

$("dig").onclick=recover;
$("again").onclick=recover;
setInterval(()=>$("clock").textContent=new Date().toLocaleTimeString(),1000);

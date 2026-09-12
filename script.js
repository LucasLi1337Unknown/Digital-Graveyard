let artifacts=[];
let last=-1;
let busy=false;

const $=id=>document.getElementById(id);
const terminal=$("terminalText");
const dig=$("dig");

fetch("files.json")
.then(r=>r.json())
.then(data=>{
    artifacts=data;
    log("artifact index loaded: "+artifacts.length+" recoverable records.");
})
.catch(()=>{
    log("ERROR: files.json could not be loaded.");
});

function log(text){
    const p=document.createElement("p");
    p.textContent="> "+text;
    terminal.appendChild(p);
    terminal.scrollTop=terminal.scrollHeight;
}

function chooseArtifact(){
    let i=0;
    do{
        i=Math.floor(Math.random()*artifacts.length);
    }while(artifacts.length>1&&i===last);
    last=i;
    return artifacts[i];
}

async function forceDownload(artifact){
    try{
        const response=await fetch(artifact.url,{mode:"cors"});
        if(!response.ok) throw new Error("HTTP "+response.status);
        const blob=await response.blob();
        const objectUrl=URL.createObjectURL(blob);
        const a=document.createElement("a");
        a.href=objectUrl;
        a.download=artifact.downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(()=>URL.revokeObjectURL(objectUrl),5000);
        return true;
    }catch(err){
        console.warn("Automatic blob download failed:",err);
        const a=document.createElement("a");
        a.href=artifact.url;
        a.download=artifact.downloadName;
        a.target="_blank";
        a.rel="noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        return false;
    }
}

async function digUp(){
    if(busy||!artifacts.length)return;
    busy=true;
    dig.disabled=true;
    $("reveal").classList.add("hidden");

    const artifact=chooseArtifact();

    log("scanning dead links...");
    await wait(350);
    log("signal recovered from "+artifact.year+".");
    await wait(400);
    log("extracting "+artifact.type+" artifact...");
    await wait(350);
    log("initiating download.");

    const forced=await forceDownload(artifact);

    $("name").textContent=artifact.name;
    $("year").textContent=artifact.year;
    $("type").textContent=artifact.type;
    $("category").textContent=artifact.category;
    $("creepy").textContent="█".repeat(artifact.creepiness)+"░".repeat(10-artifact.creepiness)+" "+artifact.creepiness+"/10";
    $("description").textContent=artifact.description;
    $("source").href=artifact.source;
    $("downloadStatus").textContent=forced
        ? "✓ Download requested: "+artifact.downloadName
        : "⚠ The archive blocked forced download, so the original file was opened instead.";

    $("reveal").classList.remove("hidden");
    log("recovery complete: "+artifact.downloadName);

    busy=false;
    dig.disabled=false;
    $("reveal").scrollIntoView({behavior:"smooth",block:"start"});
}

function wait(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

dig.addEventListener("click",digUp);
$("again").addEventListener("click",digUp);
setInterval(()=>$("clock").textContent=new Date().toLocaleTimeString(),1000);

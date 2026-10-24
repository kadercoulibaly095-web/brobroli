var WA_NUMBER="2250584151920";
var items=[
{id:1,n:"Robe",p:15000,e:"👗",c:"#f6d98a"},
{id:2,n:"Sac en cuir",p:22000,e:"👜",c:"#f1c4a3"},
{id:3,n:"Jus ",p:1500,e:"🥤",c:"#e9a9b3"},
{id:4,n:"Savon",p:2500,e:"🧼",c:"#cfe3c0"}
];
var cart={};
function fmt(n){return n.toLocaleString("fr-FR").replace(/\u202f/g," ")+" F"}
var box=document.getElementById("items");
items.forEach(function(it){
 var d=document.createElement("div");d.className="item";
 d.innerHTML='<div class="ph" style="background:'+it.c+'">'+it.e+'</div><h3>'+it.n+'</h3><div class="price">'+fmt(it.p)+'</div><button class="add" type="button">Ajouter</button>';
 d.querySelector("button").onclick=function(){cart[it.id]=(cart[it.id]||0)+1;draw()};
 box.appendChild(d);
});
function draw(){
 var lines=document.getElementById("lines"),t=0,txt=[],h="";
 items.forEach(function(it){var q=cart[it.id];if(!q)return;t+=q*it.p;txt.push(q+" x "+it.n);
  h+='<div class="row"><span>'+it.n+'</span><span class="qty"><button type="button" aria-label="Retirer" data-d="-1" data-i="'+it.id+'">−</button>'+q+'<button type="button" aria-label="Ajouter" data-d="1" data-i="'+it.id+'">+</button></span></div>'});
 lines.innerHTML=h||'<p class="empty">Ton panier est vide. Ajoute un article.</p>';
 lines.querySelectorAll("button").forEach(function(b){b.onclick=function(){
  var i=b.dataset.i;cart[i]=(cart[i]||0)+Number(b.dataset.d);if(cart[i]<=0)delete cart[i];draw()}});
 document.getElementById("total").textContent=fmt(t);
 var o=document.getElementById("order");
 if(t){o.removeAttribute("aria-disabled");
  o.href="https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent("Bonjour, je veux commander :\n"+txt.join("\n")+"\nTotal : "+fmt(t))}
 else{o.setAttribute("aria-disabled","true");o.href="#"}
}
draw();
var slug=document.getElementById("slug");
slug.addEventListener("input",function(){slug.value=slug.value.toLowerCase().replace(/[^a-z0-9-]/g,"-")});
document.getElementById("go").onclick=function(){
 var m=document.getElementById("msg"),s=slug.value.replace(/^-+|-+$/g,"");
 if(s.length<3){m.textContent="Choisis un nom d’au moins 3 caractères.";return}location.href="create.html?nom="+encodeURIComponent(s);
};


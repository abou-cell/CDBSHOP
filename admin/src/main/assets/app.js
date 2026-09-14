const orders=[
{id:'#1025',customer:'M. Karim',mode:'Livraison',amount:48.70,status:'new',items:'Amnesia Haze CBD, Grinder Aluminium',slot:'Aujourd’hui 14:30'},
{id:'#1024',customer:'Mme Salma',mode:'Retrait',amount:27.90,status:'prep',items:'Huile CBD 10%',slot:'Aujourd’hui 13:00'},
{id:'#1023',customer:'M. Julien',mode:'Livraison',amount:66.40,status:'ready',items:'White Widow, Gummies Zen, Cônes pré-roulés',slot:'Aujourd’hui 12:30'},
{id:'#1022',customer:'Mme Inès',mode:'Retrait',amount:18.90,status:'done',items:'Infusion Nuit Calme',slot:'Aujourd’hui 11:30'}
];
const inventory=[
{c:'Fleurs',n:'Amnesia Haze CBD',price:8.90,stock:18,icon:'🌿',state:'Actif'},
{c:'Fleurs',n:'White Widow CBD',price:9.50,stock:6,icon:'🍃',state:'Actif'},
{c:'Fleurs',n:'Gelato CBD',price:10.90,stock:4,icon:'🌱',state:'Actif'},
{c:'Fleurs',n:'OG Kush CBD',price:11.20,stock:0,icon:'🌾',state:'Rupture'},
{c:'Résines',n:'Hash Afghan CBD',price:7.90,stock:20,icon:'🟫',state:'Actif'},
{c:'Résines',n:'Pollen Gold CBD',price:8.40,stock:7,icon:'🧱',state:'Actif'},
{c:'Huiles',n:'Huile CBD 10%',price:34.90,stock:16,icon:'🧴',state:'Actif'},
{c:'Huiles',n:'Huile CBD 20%',price:54.90,stock:7,icon:'💧',state:'Actif'},
{c:'Infusions',n:'Infusion Nuit Calme',price:12.90,stock:23,icon:'🍵',state:'Actif'},
{c:'Infusions',n:'Infusion Focus Day',price:11.90,stock:11,icon:'☕',state:'Actif'},
{c:'Gummies',n:'Gummies Zen',price:18.90,stock:25,icon:'🍬',state:'Actif'},
{c:'Cosmétiques',n:'Baume Relaxant CBD',price:24.90,stock:8,icon:'🫙',state:'Actif'},
{c:'Cosmétiques',n:'Crème Recovery CBD',price:27.90,stock:5,icon:'🧼',state:'Actif'},
{c:'Accessoires',n:'Grinder Aluminium',price:14.90,stock:30,icon:'⚙️',state:'Actif'},
{c:'Accessoires',n:'Tips carton premium',price:2.50,stock:40,icon:'📄',state:'Actif'},
{c:'Accessoires',n:'Cônes pré-roulés',price:4.90,stock:28,icon:'📦',state:'Actif'},
{c:'Accessoires',n:'Boîte hermétique',price:9.90,stock:3,icon:'🧰',state:'Actif'},
{c:'Accessoires',n:'Plateau CBD OM',price:12.90,stock:13,icon:'🛒',state:'Actif'}
];
const invCats=['Tous',...new Set(inventory.map(x=>x.c))];let currentInv='Tous';let currentOrder='Tous';let stripeConnected=true;
function money(x){return x.toFixed(2).replace('.',',')+' €'}
function showView(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));document.getElementById(v).classList.add('active');document.querySelectorAll('.navBtn').forEach(x=>x.classList.toggle('active',x.dataset.v===v));window.scrollTo({top:0,behavior:'smooth'})}
function statusPill(s){const map={new:['Nouvelle','s-new'],prep:['En préparation','s-prep'],ready:['Prête','s-ready'],done:['Terminée','s-done']};const m=map[s];return `<span class="status ${m[1]}">${m[0]}</span>`}
function renderRecent(){recentOrders.innerHTML=orders.slice(0,3).map(o=>`<div class="order"><div><div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><b>${o.id}</b>${statusPill(o.status)}</div><div class="tiny muted">${o.customer} • ${o.mode} • ${o.slot}</div><div class="tiny" style="margin-top:4px">${o.items}</div></div><div style="text-align:right"><b>${money(o.amount)}</b><div><button class="btn light" style="margin-top:6px;padding:8px 10px" onclick="showView('orders')">Ouvrir</button></div></div></div>`).join('')}
function renderOrderTabs(){const tabs=['Tous','Nouvelles','Préparation','Prêtes','Terminées'];orderTabs.innerHTML=tabs.map(t=>`<button class="tab ${currentOrder===t?'active':''}" onclick="currentOrder='${t}';renderOrderTabs();renderOrders()">${t}</button>`).join('')}
function renderOrders(){let arr=orders.slice();if(currentOrder==='Nouvelles')arr=arr.filter(o=>o.status==='new');if(currentOrder==='Préparation')arr=arr.filter(o=>o.status==='prep');if(currentOrder==='Prêtes')arr=arr.filter(o=>o.status==='ready');if(currentOrder==='Terminées')arr=arr.filter(o=>o.status==='done');orderList.innerHTML=arr.map((o,i)=>`<div class="order"><div><div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><b>${o.id}</b>${statusPill(o.status)}</div><div class="tiny muted">${o.customer} • ${o.mode} • ${o.slot}</div><div class="tiny" style="margin-top:4px">${o.items}</div></div><div style="text-align:right"><b>${money(o.amount)}</b><div style="margin-top:8px"><select onchange="orders[${i}].status=this.value;renderRecent();renderOrders()"><option value="new" ${o.status==='new'?'selected':''}>Nouvelle</option><option value="prep" ${o.status==='prep'?'selected':''}>Préparation</option><option value="ready" ${o.status==='ready'?'selected':''}>Prête</option><option value="done" ${o.status==='done'?'selected':''}>Terminée</option></select></div></div></div>`).join('')||'<div class="muted">Aucune commande dans ce filtre.</div>'}
function renderCatTabs(){catTabs.innerHTML=invCats.map(c=>`<button class="tab ${currentInv===c?'active':''}" onclick="currentInv='${c}';renderCatTabs();renderCatalog()">${c}</button>`).join('')}
function renderCatalog(){let arr=inventory.filter(x=>currentInv==='Tous'||x.c===currentInv);catalogList.innerHTML=arr.map((p,idx)=>`<div class="tableRow"><div class="thumb">${p.icon}</div><div><b>${p.n}</b><div class="tiny muted">${p.c} • ${money(p.price)} • ${p.state}</div><div style="margin-top:6px"><span class="pill ${p.stock<6?'low':''}">${p.stock<1?'Rupture':p.stock<6?'Stock faible':'En stock'} • ${p.stock}</span></div></div><div style="text-align:right"><button class="btn light" style="padding:8px 10px" onclick="editStock(${idx},1)">+1</button><button class="btn light" style="padding:8px 10px;margin-left:6px" onclick="editStock(${idx},-1)">-1</button></div></div>`).join('')}
function editStock(idx,delta){const arr=inventory.filter(x=>currentInv==='Tous'||x.c===currentInv);const ref=arr[idx];const real=inventory.indexOf(ref);inventory[real].stock=Math.max(0,inventory[real].stock+delta);renderCatalog()}
function toggleStripeState(){stripeConnected=!stripeConnected;stripeBtn.textContent=stripeConnected?'Déconnecter':'Connecter';alert('Démo hors ligne : état Stripe mis à jour visuellement.')}
renderRecent();renderOrderTabs();renderOrders();renderCatTabs();renderCatalog();
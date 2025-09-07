// app.js - Feature-rich educational store app (Vanilla JS)
// Save this file as app.js and open index.html locally.
// NOTE: This uses only vanilla JS, no external libraries, and stores cart in localStorage.

(() => {
  /* ---------------------------
     Sample data (fake/original)
     --------------------------- */
  const GAMES = [
    // Long list (sample of 24 items). These are original/fake names and descriptions.
    { id: "g001", title: "Pixel Odyssey", price: 0, category: "Indie", tags: ["pixel","platformer"], dev: "Studio Ember", desc: "A charming pixel platformer with handcrafted levels.", thumb: "assets/pixel-odyssey.jpg", freeThisWeek: true },
    { id: "g002", title: "Skybound - Hero Edition", price: 499, category: "Action", tags: ["action","singleplayer"], dev: "Aster Labs", desc: "High-speed aerial combat with cinematic set pieces.", thumb: "assets/skybound.jpg" },
    { id: "g003", title: "Nightfall Runners", price: 999, category: "Multiplayer", tags: ["battle","multiplayer"], dev: "NeonWorks", desc: "Competitive parkour in neon-lit cityscapes.", thumb: "assets/nightfall.jpg" },
    { id: "g004", title: "Mystic Garden", price: 249, category: "Casual", tags: ["puzzle","relaxing"], dev: "GreenLeaf", desc: "A calming garden-builder and puzzle experience.", thumb: "assets/mystic.jpg" },
    { id: "g005", title: "Rust & Rivets", price: 799, category: "Strategy", tags: ["strategy","basebuilding"], dev: "IronCrow", desc: "Real-time strategy with deep resource systems.", thumb: "assets/rust.jpg" },
    { id: "g006", title: "HoloRacer", price: 349, category: "Racing", tags: ["racing","arcade"], dev: "VelocityX", desc: "Arcade racing at blistering speeds.", thumb: "assets/holoracer.jpg" },
    { id: "g007", title: "Echoes of Dawn", price: 1299, category: "RPG", tags: ["rpg","story"], dev: "MythicForge", desc: "An epic story-driven RPG with branching choices.", thumb: "assets/echoes.jpg" },
    { id: "g008", title: "Arcane Atelier", price: 199, category: "Simulation", tags: ["sim","crafting"], dev: "Cobalt Studio", desc: "Craft spells, manage your atelier, and trade goods.", thumb: "assets/arcane.jpg" },
    { id: "g009", title: "CyberKnights", price: 599, category: "Shooter", tags: ["fps","sci-fi"], dev: "BinaryOps", desc: "Fast-paced shooter with cyberpunk aesthetics.", thumb: "assets/cyber.jpg" },
    { id: "g010", title: "Farmstead Stories", price: 0, category: "Simulation", tags: ["farm","casual"], dev: "Homestead", desc: "Relaxing farming sim for all ages.", thumb: "assets/farm.jpg" },
    { id: "g011", title: "Voidbreaker", price: 449, category: "Action", tags: ["action","space"], dev: "Starfall", desc: "Space action with customizable ships.", thumb: "assets/void.jpg" },
    { id: "g012", title: "Tile Tactician", price: 149, category: "Puzzle", tags: ["puzzle","strategy"], dev: "BrainSpark", desc: "Tile-based puzzles that demand planning.", thumb: "assets/tile.jpg" },
    { id: "g013", title: "Legends of Aeria", price: 1599, category: "RPG", tags: ["rpg","mmorpg"], dev: "Skyforge", desc: "Massive multiplayer RPG with a living world.", thumb: "assets/aeria.jpg" },
    { id: "g014", title: "Neon Chef", price: 99, category: "Casual", tags: ["cooking","time"], dev: "ByteBistro", desc: "Fast-paced kitchen chaos.", thumb: "assets/neonchef.jpg" },
    { id: "g015", title: "Puzzle Trails", price: 79, category: "Puzzle", tags: ["puzzle","adventure"], dev: "Trailhead", desc: "Brainy puzzles across beautiful scenes.", thumb: "assets/puzzletrails.jpg" },
    { id: "g016", title: "Sky Architect", price: 349, category: "Simulation", tags: ["building","creative"], dev: "Blueprint", desc: "Design floating islands and cities.", thumb: "assets/skyarch.jpg" },
    { id: "g017", title: "Wasteland Courier", price: 199, category: "Indie", tags: ["indie","adventure"], dev: "Dustline", desc: "Courier missions across a haunting wasteland.", thumb: "assets/wasteland.jpg" },
    { id: "g018", title: "Shadow Ballet", price: 299, category: "Action", tags: ["stealth","action"], dev: "SilentStep", desc: "Stealth-action with cinematic movement.", thumb: "assets/shadow.jpg" },
    { id: "g019", title: "Orbit Puzzle", price: 49, category: "Puzzle", tags: ["puzzle","physics"], dev: "GravLabs", desc: "Physics puzzles set in orbit.", thumb: "assets/orbit.jpg" },
    { id: "g020", title: "Retro Brawler", price: 149, category: "Fighting", tags: ["fighting","retro"], dev: "OldSchool", desc: "Arcade-style brawler with pixel visuals.", thumb: "assets/retrob.jpg" },
    { id: "g021", title: "Seafolk Adventures", price: 399, category: "Adventure", tags: ["adventure","boat"], dev: "BlueHarbor", desc: "Sail, trade, and discover islands.", thumb: "assets/seafolk.jpg" },
    { id: "g022", title: "Quantum Chess", price: 249, category: "Strategy", tags: ["strategy","board"], dev: "LogicWorks", desc: "A quantum twist on chess-like strategy.", thumb: "assets/quantum.jpg" },
    { id: "g023", title: "Bloom City", price: 0, category: "Casual", tags: ["city","casual"], dev: "Urban Garden", desc: "Grow your own micro-city garden.", thumb: "assets/bloom.jpg" },
    { id: "g024", title: "Phantom Track", price: 549, category: "Racing", tags: ["racing","sim"], dev: "PulseDrive", desc: "Realistic racing with advanced physics.", thumb: "assets/phantom.jpg" }
  ];

  /* ---------------------------
     Translations (UI strings)
     Expand these for homework to show multilingual skills.
     --------------------------- */
  const I18N = {
    en: {
      "features.free":"Weekly Free Games",
      "features.freeDesc":"We add a free title every week for users to download and try.",
      "features.engine":"Creator Engine",
      "features.engineDesc":"Powerful engine and assets for developers and students to learn and create.",
      "features.backed":"Secure Checkout",
      "features.backedDesc":"Mock checkout and local cart to simulate shopping experience.",
      "store.title":"Store",
      "news.title":"News & Updates"
    },
    kn: { // Kannada (simple translations - extend as needed)
      "features.free":"ವಾರದ ಉಚಿತ ಆಟಗಳು",
      "features.freeDesc":"ನಾವು ಪ್ರತಿದಿನ ಉಚಿತ ಶೀರ್ಷಿಕೆಗಳನ್ನು ಸೇರಿಸುತ್ತೇವೆ.",
      "features.engine":"ಕ್ರಿಯೇಟರ್ ಎಂಜಿನ್",
      "features.engineDesc":"ವಿಕಾಸಕರಿಗಾಗಿ ಶಕ್ತಿ ಸಾಧನಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು.",
      "features.backed":" ಸುರಕ್ಷಿತ ಚೆಕ್ಔಟ್",
      "features.backedDesc":"ರಸ್ತೆ-ಆಧಾರಿತ ಕಾರ್ಟ್ ಮತ್ತು mock checkout.",
      "store.title":"ಸ್ಟೋರ್",
      "news.title":" ಸುದ್ದಿಗಳು ಮತ್ತು ನವೀಕರಣಗಳು"
    },
    de: {
      "features.free":"Wöchentliche Gratis-Spiele",
      "features.freeDesc":"Jede Woche ein kostenloser Titel zum Ausprobieren.",
      "features.engine":"Creator Engine",
      "features.engineDesc":"Leistungsstarke Werkzeuge für Entwickler und Studierende.",
      "features.backed":"Sicherer Checkout",
      "features.backedDesc":"Mock-Checkout und lokaler Warenkorb zur Simulation.",
      "store.title":"Shop",
      "news.title":"Neuigkeiten & Updates"
    }
  };

  /* ---------------------------
     App state
     --------------------------- */
  let state = {
    lang: localStorage.getItem('lang') || 'en',
    cart: JSON.parse(localStorage.getItem('cart') || '{}'),
    filter: { category: 'all', freeOnly: false },
    sort: 'featured',
    query: '',
    page: 1,
    perPage: 8
  };

  /* ---------------------------
     Util helpers
     --------------------------- */
  const qs = (sel,root=document)=>root.querySelector(sel);
  const qsa = (sel,root=document)=>Array.from(root.querySelectorAll(sel));

  function saveCart(){ localStorage.setItem('cart', JSON.stringify(state.cart)); updateCartUI(); }
  function setLang(lang){ state.lang=lang; localStorage.setItem('lang', lang); applyTranslations(); }
  function currency(n){ return n===0 ? 'Free' : `₹${n}`; }

  /* ---------------------------
     Render functions
     --------------------------- */
  function applyTranslations(){
    // populate elements with data-i18n attribute
    const map = I18N[state.lang] || I18N.en;
    qsa('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(map[key]) el.textContent = map[key];
    });
  }

  function buildCategoryOptions(){
    const categories = Array.from(new Set(GAMES.map(g=>g.category))).sort();
    const sel = qs('#filterCategory');
    sel.innerHTML = '<option value="all">All categories</option>';
    categories.forEach(cat=>{
      const opt = document.createElement('option'); opt.value=cat; opt.textContent=cat; sel.appendChild(opt);
    });
  }

  function renderStore(){
    const grid = qs('#storeGrid');
    // filter & sort
    let list = GAMES.slice();
    if(state.filter.category !== 'all'){
      list = list.filter(g => g.category === state.filter.category);
    }
    if(state.filter.freeOnly){
      list = list.filter(g => g.price === 0);
    }
    if(state.query && state.query.trim()){
      const q = state.query.trim().toLowerCase();
      list = list.filter(g => (g.title+g.desc+g.tags.join(' ')+g.dev).toLowerCase().includes(q));
    }
    // sort
    if(state.sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
    else if(state.sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
    else if(state.sort === 'alpha') list.sort((a,b)=>a.title.localeCompare(b.title));
    else { // featured default - keep original order, but bring freeThisWeek to front
      list.sort((a,b)=> (b.freeThisWeek?1:0) - (a.freeThisWeek?1:0));
    }

    // pagination
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total/state.perPage));
    if(state.page > pages) state.page = pages;
    const start = (state.page-1)*state.perPage;
    const pageItems = list.slice(start, start+state.perPage);

    // render
    grid.innerHTML = '';
    pageItems.forEach(g=>{
      const card = document.createElement('article'); card.className = 'card';
      card.innerHTML = `
        <div class="card-thumb" data-src="${g.thumb}">
          <img alt="${g.title} thumbnail" src="${g.thumb || 'assets/placeholder.jpg'}" loading="lazy" onerror="this.src='assets/placeholder.jpg'">
        </div>
        <div class="card-body">
          <h4 class="card-title">${escapeHtml(g.title)}</h4>
          <div class="card-meta">${escapeHtml(g.category)} • ${escapeHtml(g.dev)}</div>
          <div class="card-desc">${escapeHtml(truncate(g.desc,120))}</div>
          <div class="card-footer">
            <div class="price">${currency(g.price)}</div>
            <div>
              <button class="btn tiny addCart" data-id="${g.id}">${g.price === 0 ? 'Get' : 'Buy'}</button>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    qs('#pageInfo').textContent = `${state.page} / ${pages}`;
    qs('#prevPage').disabled = state.page <= 1;
    qs('#nextPage').disabled = state.page >= pages;
  }

  function renderCarousel(){
    const track = qs('#carouselTrack');
    const slides = [
      {title:'Arcadia launches demo update', desc:'Major gameplay improvements and seasonal events are now live.'},
      {title:'Creator Tools Extended', desc:'New assets and improved editor performance for creators.'},
      {title:'Student Bundle', desc:'Special discounts for students in this demo store.'}
    ];
    track.innerHTML = '';
    slides.forEach(s=>{
      const slide = document.createElement('div'); slide.className='slide';
      slide.innerHTML = `<h4>${escapeHtml(s.title)}</h4><p>${escapeHtml(s.desc)}</p>`;
      track.appendChild(slide);
    });
    // simple sliding logic
    let offset=0;
    const width = 340;
    qs('#prevSlide').addEventListener('click', ()=>{ offset = Math.max(0, offset - 1); track.style.transform = `translateX(${-offset*width}px)`});
    qs('#nextSlide').addEventListener('click', ()=>{ offset = Math.min(slides.length-1, offset + 1); track.style.transform = `translateX(${-offset*width}px)`});
  }

  /* ---------------------------
     Cart
     --------------------------- */
  function updateCartUI(){
    const count = Object.values(state.cart).reduce((s,item)=>s+item.qty,0);
    qs('#cartCount').textContent = count;
    const itemsEl = qs('#cartItems');
    itemsEl.innerHTML = '';
    let total = 0;
    Object.values(state.cart).forEach(c=>{
      const game = GAMES.find(g=>g.id===c.id) || {};
      const row = document.createElement('div'); row.className='cart-item';
      row.innerHTML = `
        <div class="thumb"><img src="${game.thumb || 'assets/placeholder.jpg'}" alt="${escapeHtml(game.title||'item')}" style="width:100%;height:100%;object-fit:cover" onerror="this.src='assets/placeholder.jpg'"></div>
        <div style="flex:1">
          <div style="font-weight:700">${escapeHtml(game.title || 'Unknown')}</div>
          <div style="color:var(--muted);font-size:0.9rem">${currency(game.price)}</div>
          <div style="margin-top:6px">
            <button class="btn tiny minus" data-id="${c.id}">-</button>
            <span style="padding:0 8px">${c.qty}</span>
            <button class="btn tiny plus" data-id="${c.id}">+</button>
            <button class="btn ghost tiny remove" data-id="${c.id}" style="margin-left:10px">Remove</button>
          </div>
        </div>
      `;
      itemsEl.appendChild(row);
      total += (game.price || 0) * c.qty;
    });
    qs('#cartTotal').textContent = `₹${total}`;
    saveCart(); // persist
  }

  function addToCart(id, qty=1){
    if(!state.cart[id]) state.cart[id] = { id, qty };
    else state.cart[id].qty += qty;
    saveCart();
    openCart();
  }

  function openCart(){ qs('#cartDrawer').setAttribute('aria-hidden','false'); updateCartUI(); }
  function closeCart(){ qs('#cartDrawer').setAttribute('aria-hidden','true'); }

  /* ---------------------------
     Utilities
     --------------------------- */
  function escapeHtml(str=''){ return String(str).replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s])); }
  function truncate(s, n){ return s.length>n ? s.slice(0,n-1)+'…' : s; }

  /* ---------------------------
     Event wiring & initialization
     --------------------------- */
  function init(){
    // set year
    qs('#year').textContent = new Date().getFullYear();

    // language
    const langSel = qs('#langSelect');
    langSel.value = state.lang;
    langSel.addEventListener('change', (e)=>{ setLang(e.target.value); });

    // translations
    applyTranslations();

    // build categories
    buildCategoryOptions();

    // search UI
    qs('#searchToggle').addEventListener('click', ()=> qs('#searchRow').hidden = !qs('#searchRow').hidden);
    qs('#searchRun').addEventListener('click', ()=>{
      state.query = qs('#searchInput').value || '';
      state.page = 1;
      renderStore();
    });
    qs('#searchInput').addEventListener('keydown', (e)=> { if(e.key==='Enter'){ state.query = e.target.value; state.page=1; renderStore(); }});

    // store filters
    qs('#filterCategory').addEventListener('change', (e)=>{ state.filter.category = e.target.value; state.page=1; renderStore(); });
    qs('#sortBy').addEventListener('change', (e)=>{ state.sort = e.target.value; renderStore(); });
    qs('#showFree').addEventListener('change', (e)=>{ state.filter.freeOnly = e.target.checked; renderStore(); });

    // pager
    qs('#prevPage').addEventListener('click', ()=> { state.page = Math.max(1, state.page - 1); renderStore(); });
    qs('#nextPage').addEventListener('click', ()=> { state.page = state.page + 1; renderStore(); });

    // cart open/close
    qs('#cartBtn').addEventListener('click', ()=> openCart());
    qs('#closeCart').addEventListener('click', ()=> closeCart());

    // sign-in modal
    qs('#signBtn').addEventListener('click', ()=> qs('#authModal').setAttribute('aria-hidden','false'));
    qs('#authCancel').addEventListener('click', ()=> qs('#authModal').setAttribute('aria-hidden','true'));
    qs('#closeAuth').addEventListener('click', ()=> qs('#authModal').setAttribute('aria-hidden','true'));
    qs('#authForm').addEventListener('submit', (e)=>{
      e.preventDefault(); alert('Mock sign-in successful — use this to integrate real auth later.'); qs('#authModal').setAttribute('aria-hidden','true');
    });

    // claim free mock
    qs('#claimFree').addEventListener('click', ()=> {
      const free = GAMES.find(g=>g.freeThisWeek) || GAMES[0];
      addToCart(free.id,1);
      alert(`Claimed "${free.title}" (mock). Check your cart.`);
    });

    // store click handler for add to cart
    document.addEventListener('click', (e)=>{
      if(e.target.matches('.addCart')) {
        const id = e.target.getAttribute('data-id');
        addToCart(id,1);
      } else if(e.target.matches('.minus')){
        const id = e.target.getAttribute('data-id');
        if(state.cart[id]) {
          state.cart[id].qty = Math.max(0, state.cart[id].qty - 1);
          if(state.cart[id].qty === 0) delete state.cart[id];
          saveCart();
        }
      } else if(e.target.matches('.plus')){
        const id = e.target.getAttribute('data-id');
        if(state.cart[id]) { state.cart[id].qty += 1; saveCart(); }
      } else if(e.target.matches('.remove')){
        const id = e.target.getAttribute('data-id');
        delete state.cart[id];
        saveCart();
      }
    });

    // close drawer when clicking outside
    document.addEventListener('click', (e)=>{
      if(e.target.id === 'cartDrawer') closeCart();
    });

    // toggle mobile menu
    qs('#menuToggle').addEventListener('click', ()=>{
      const nav = qs('#mainNav');
      nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
    });

    // render UI
    renderStore();
    renderCarousel();
    updateCartUI();

    // show sample data in longform
    qs('#sampleData').textContent = JSON.stringify(GAMES, null, 2);

    // apply translations on load
    applyTranslations();

    // lazy load images: (basic, since using <img loading="lazy"> already)
    // You can implement IntersectionObserver for progressive loading.

    // accessibility: close modals with Escape
    document.addEventListener('keydown', (e)=> {
      if(e.key==='Escape'){ qs('#authModal').setAttribute('aria-hidden','true'); closeCart(); }
    });
  }

  // small helpers
  init();
})();

const apiBase = '';
const el = id => document.getElementById(id);

const state = {
  token: localStorage.getItem('token') || '',
  user: (() => { try { return JSON.parse(localStorage.getItem('user')||'null') } catch(e){ return null } })(),
  books: [],
  mode: 'view', // view | create | edit
  editId: null
};

function showMsg(text, type='success'){
  const container = el('messages');
  const d = document.createElement('div'); d.className = `msg ${type}`; d.textContent = text;
  container.appendChild(d);
  setTimeout(()=> d.remove(), 3500);
}

function saveState(){
  localStorage.setItem('token', state.token || '');
  localStorage.setItem('user', state.user ? JSON.stringify(state.user) : '');
  el('token').value = state.token || '';
}

function api(path, options={}){
  options.headers = options.headers || {};
  if(state.token) options.headers['Authorization'] = 'Bearer ' + state.token;
  return fetch(apiBase + path, options).then(async res => {
    const data = await res.json().catch(()=> ({}));
    if(!res.ok) throw new Error(data.message || JSON.stringify(data));
    return data;
  });
}

async function loadBooks(){
  try{
    state.books = await api('/api/books', { method:'GET' });
    renderBooks();
  }catch(err){ showMsg('Failed to load books','error'); }
}

function renderBooks(){
  const list = el('books'); list.innerHTML = '';
  const q = el('search').value.toLowerCase();
  const mine = document.querySelector('input[name="filter"]:checked').value === 'mine';
  const userId = state.user && (state.user.id || state.user._id);
  (state.books || []).filter(b => b.title.toLowerCase().includes(q)).forEach(b => {
    if(mine && userId){
      const creatorId = b.createdBy && (b.createdBy._id || b.createdBy.id || b.createdBy);
      if(String(creatorId) !== String(userId)) return;
    }
    const row = document.createElement('div'); row.className = 'bk';
    row.innerHTML = `<div><strong>${escapeHtml(b.title)}</strong> <span class="small">— ${escapeHtml(b.author || '')}</span></div>
      <div class="small">ISBN: ${escapeHtml(b.isbn||'')}</div>
      <div class="small">${escapeHtml(b.description||'')}</div>
      <div class="small">Created by: ${b.createdBy && (b.createdBy.name ? escapeHtml(b.createdBy.name+' ('+b.createdBy.email+')') : escapeHtml(b.createdBy))}</div>`;
    const actions = document.createElement('div'); actions.className = 'actions';
    const view = mk('button','[View]'); view.onclick = ()=> { setForm('view', b); };
    actions.appendChild(view);
    const creatorId = b.createdBy && (b.createdBy._id || b.createdBy.id || b.createdBy);
    if(userId && String(creatorId) === String(userId)){
      const edit = mk('button','[Edit]'); edit.onclick = ()=> setForm('edit', b);
      const del = mk('button','[Delete]'); del.onclick = ()=> doDelete(b._id);
      actions.appendChild(edit); actions.appendChild(del);
    }
    row.appendChild(actions);
    list.appendChild(row);
  });
}

function mk(tag, text){ const n = document.createElement(tag); n.textContent = text; return n }

function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }

function setForm(mode, book){
  state.mode = mode;
  state.editId = book ? book._id : null;
  el('form-title').textContent = mode === 'create' ? 'Create Book' : mode === 'edit' ? 'Edit Book' : 'Book Details';
  if(book){
    el('book-title').value = book.title || '';
    el('book-author').value = book.author || '';
    el('book-isbn').value = book.isbn || '';
    el('book-desc').value = book.description || '';
    el('book-published').value = book.publishedDate ? book.publishedDate.split('T')[0] : '';
  } else {
    el('book-title').value = '';
    el('book-author').value = '';
    el('book-isbn').value = '';
    el('book-desc').value = '';
    el('book-published').value = '';
  }
  const readonly = mode === 'view';
  ['book-title','book-author','book-isbn','book-desc','book-published'].forEach(id=> el(id).disabled = readonly);
}

async function doSave(e){
  e && e.preventDefault();
  try{
    const body = {
      title: el('book-title').value,
      author: el('book-author').value,
      isbn: el('book-isbn').value,
      description: el('book-desc').value,
      publishedDate: el('book-published').value || undefined
    };
    if(state.mode === 'create'){
      await api('/api/books', { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
      showMsg('Book created');
    } else if(state.mode === 'edit' && state.editId){
      await api('/api/books/'+state.editId, { method:'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
      showMsg('Book updated');
    }
    setForm('view', null);
    loadBooks();
  }catch(err){ showMsg(err.message||'Save failed','error'); }
}

async function doDelete(id){ if(!confirm('Delete this book?')) return; try{ await api('/api/books/'+id, { method:'DELETE' }); showMsg('Book deleted'); loadBooks(); }catch(err){ showMsg(err.message||'Delete failed','error'); } }

async function doRegister(){
  const name = el('reg-name').value.trim(); const email = el('reg-email').value.trim(); const password = el('reg-password').value;
  if(!name || !email || !password){ showMsg('Fill name, email, password','error'); return; }
  try{
    const data = await api('/api/auth/register', { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) });
    state.token = data.token; state.user = data.user; saveState(); showMsg('Registered and logged in'); loadBooks();
  }catch(err){ showMsg(err.message||'Register failed','error'); }
}

async function doLogin(){
  const email = el('login-email').value.trim(); const password = el('login-password').value;
  if(!email || !password){ showMsg('Provide email and password','error'); return; }
  try{
    const data = await api('/api/auth/login', { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    state.token = data.token; state.user = data.user; saveState(); showMsg('Logged in'); loadBooks();
  }catch(err){ showMsg(err.message||'Login failed','error'); }
}

function wire(){
  el('btn-register').addEventListener('click', doRegister);
  el('btn-login').addEventListener('click', doLogin);
  el('btn-save').addEventListener('click', doSave);
  el('btn-cancel').addEventListener('click', ()=> setForm('view', null));
  el('link-create').addEventListener('click', (e)=>{ e.preventDefault(); setForm('create', null); });
  el('link-login').addEventListener('click', (e)=>{ e.preventDefault(); el('login-box').scrollIntoView(); });
  el('link-register').addEventListener('click', (e)=>{ e.preventDefault(); el('auth-box').scrollIntoView(); });
  el('search').addEventListener('input', renderBooks);
  document.querySelectorAll('input[name="filter"]').forEach(r=> r.addEventListener('change', renderBooks));
}

// initialize
saveState(); wire(); loadBooks();

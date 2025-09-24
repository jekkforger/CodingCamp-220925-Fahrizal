// ----------------------
// Welcome name + Ganti Nama
// ----------------------
function setWelcome(name){
    const el = document.getElementById('welcome-title');
    if (el && name) el.textContent = `Hi ${name}, Welcome To Website`;
  }
  
  function askName(force = false){
    let name = localStorage.getItem('visitor_name');
    if (!name || force){
      const input = prompt('Hi! What is your name?');
      if (input && input.trim()){
        name = input.trim();
        localStorage.setItem('visitor_name', name);
      }
    }
    if (name) setWelcome(name);
  }
  
  // jalankan saat halaman load
  askName();
  
  // tombol untuk mengubah nama kapan saja
  const changeBtn = document.getElementById('changeName');
  if (changeBtn){
    changeBtn.addEventListener('click', () => {
      localStorage.removeItem('visitor_name'); // bersihkan agar prompt muncul lagi
      askName(true);                           // paksa minta nama baru
    });
  }
  
  // ----------------------
  // Form validation + render result
  // ----------------------
  const $ = (id) => document.getElementById(id);
  const form = $('contactForm');
  
  const clearErrors = () => {
    ['err-name','err-dob','err-gender','err-message'].forEach(id => $(id).textContent = '');
  };
  
  const formatDate = (value) => {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-GB'); // dd/mm/yyyy
  };
  
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
  
      const name = $('name').value.trim();
      const dob = $('dob').value;
      const gender = (new FormData(form)).get('gender');
      const message = $('message').value.trim();
  
      let valid = true;
      if (name.length < 2){ $('err-name').textContent='Nama minimal 2 karakter.'; valid=false; }
      if (!dob){ $('err-dob').textContent='Tanggal lahir wajib diisi.'; valid=false; }
      if (!gender){ $('err-gender').textContent='Pilih jenis kelamin.'; valid=false; }
      if (message.length < 5){ $('err-message').textContent='Pesan minimal 5 karakter.'; valid=false; }
      if (!valid) return;
  
      $('now').textContent = new Date().toString();
      $('r-name').textContent = name;
      $('r-dob').textContent = formatDate(dob);
      $('r-gender').textContent = gender;
      $('r-message').textContent = message;
  
      document.querySelector('.result-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('message').value = '';
    });
  }
  
  // ----------------------
  // Navbar mobile toggle (opsional)
  // ----------------------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const shown = getComputedStyle(nav).display !== 'none';
      nav.style.display = shown ? 'none' : 'flex';
    });
  }
  
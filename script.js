const root=document.documentElement;
const validThemes=['glow','dark','light'];
const storedTheme=localStorage.getItem('pno-theme');
if(validThemes.includes(storedTheme))root.dataset.theme=storedTheme;
function syncThemes(){document.querySelectorAll('[data-set-theme]').forEach(button=>button.classList.toggle('active',button.dataset.setTheme===root.dataset.theme))}
document.querySelectorAll('[data-set-theme]').forEach(button=>button.addEventListener('click',()=>{root.dataset.theme=button.dataset.setTheme;localStorage.setItem('pno-theme',root.dataset.theme);syncThemes()}));
syncThemes();
document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());

const sidebar=document.getElementById('sidebar');
const sidebarToggle=document.getElementById('sidebarToggle');
sidebarToggle?.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');sidebarToggle.setAttribute('aria-expanded',String(open));sidebarToggle.textContent=open?'×':'☰'});
document.querySelectorAll('.side-nav a').forEach(link=>link.addEventListener('click',()=>{sidebar.classList.remove('open');sidebarToggle?.setAttribute('aria-expanded','false');if(sidebarToggle)sidebarToggle.textContent='☰'}));

const sectionLinks=[...document.querySelectorAll('.side-nav a')];
const sections=sectionLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){sectionLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-28% 0px -60% 0px'});sections.forEach(section=>sectionObserver.observe(section))}

const overlay=document.getElementById('welcomeOverlay');
if(overlay&&!sessionStorage.getItem('pno-welcomed'))setTimeout(()=>overlay.classList.add('show'),500);
function closeWelcome(){overlay?.classList.remove('show');sessionStorage.setItem('pno-welcomed','yes')}
document.getElementById('welcomeClose')?.addEventListener('click',closeWelcome);
document.getElementById('welcomeExplore')?.addEventListener('click',closeWelcome);
overlay?.addEventListener('click',event=>{if(event.target===overlay)closeWelcome()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeWelcome()});

const moreButton=document.getElementById('projectMore');
moreButton?.addEventListener('click',()=>{const expanded=moreButton.getAttribute('aria-expanded')!=='true';moreButton.setAttribute('aria-expanded',String(expanded));document.querySelectorAll('.extra-project').forEach(card=>card.hidden=!expanded);moreButton.innerHTML=expanded?'Hide project templates <span>−</span>':'View more projects <span>＋</span>'});

document.getElementById('contactForm')?.addEventListener('submit',event=>{event.preventDefault();const values=new FormData(event.currentTarget);const subject=encodeURIComponent(values.get('subject'));const body=encodeURIComponent(`Name: ${values.get('name')}\nEmail: ${values.get('email')}\n\nMessage:\n${values.get('message')}`);location.href=`mailto:septemphyo10@gmail.com?subject=${subject}&body=${body}`});

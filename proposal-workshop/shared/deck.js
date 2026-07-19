document.addEventListener('DOMContentLoaded',()=>{
  const cards=[...document.querySelectorAll('.card[data-nav]')];
  cards.forEach((card,index)=>{
    const page=card.querySelector('.page-no');
    if(page) page.textContent=`P.${String(index+1).padStart(2,'0')}`;
  });
  const nav=document.getElementById('side-nav');
  if(nav){
    const groups=[];
    cards.forEach(card=>{
      const code=card.dataset.section||'SECTION';
      let group=groups.find(item=>item.code===code);
      if(!group){group={code,title:card.dataset.sectionTitle||code,cards:[]};groups.push(group)}
      group.cards.push(card);
    });
    nav.innerHTML=groups.map(group=>`<section class="nav-group"><h3>${group.code}｜${group.title}</h3>${group.cards.map(card=>`<a href="#${card.id}"><b>${card.dataset.nav}</b><span>${card.querySelector('.page-no')?.textContent||''}</span></a>`).join('')}</section>`).join('');
  }
  const links=[...document.querySelectorAll('#side-nav a')];
  const progress=document.querySelector('.progress i');
  const update=()=>{
    const marker=window.scrollY+window.innerHeight*.28;
    let active=cards[0];
    cards.forEach(card=>{if(card.offsetTop<=marker) active=card});
    links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${active?.id}`));
    const max=document.documentElement.scrollHeight-window.innerHeight;
    if(progress) progress.style.width=`${max>0?Math.min(100,window.scrollY/max*100):100}%`;
  };
  window.addEventListener('scroll',update,{passive:true});update();
});

new Siema
function mostrarInfo(id) {
    const bloco = document.getElementById(id);
  
    
    if (bloco.classList.contains('ativo')) {
      bloco.classList.remove('ativo');
    } else {
     
      document.querySelectorAll('.info').forEach(el => el.classList.remove('ativo'));
  

      bloco.classList.add('ativo');
    }
}




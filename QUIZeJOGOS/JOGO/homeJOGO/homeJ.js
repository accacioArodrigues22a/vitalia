let selectedPlayer 

    function selectCharacter(character) {
      if (selectedPlayer) {
        selectedPlayer.classList.remove('image-selected')
      }
      localStorage.setItem('selectedCharacter', character);

      const [player, _] = character.split('.');
      selectedPlayer = document.querySelector(`.${player}`);
      selectedPlayer.classList.add('image-selected');
    }
    function startGame() {
      window.location.href = '../jogo.html';
    }
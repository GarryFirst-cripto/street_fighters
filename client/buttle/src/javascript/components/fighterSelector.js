import { createElement } from '../helpers/domHelper';
import { renderArena } from './arena';
import versusImg from '../../../resources/versus.png';
import { fighterService } from '../services/fightersService';

export function createFightersSelector() {
  let selectedFighters = [];

  return async (event, fighterId) => {
    const fighter = await getFighterInfo(fighterId);
    const [playerOne, playerTwo] = selectedFighters;
    const firstFighter = playerOne ?? fighter;
    const secondFighter = Boolean(playerOne) ? playerTwo ?? fighter : playerTwo;
    selectedFighters = [firstFighter, secondFighter];
    renderSelectedFighters(selectedFighters);
  };
}

const fighterDetailsMap = new Map();

export async function getFighterInfo(fighterId) {
  return await fighterService.getFighterDetails(fighterId);
}

function renderSelectedFighters(selectedFighters) {
  const fightersPreview = document.querySelector('.preview-container___root');
  const versusBlock = createVersusBlock(selectedFighters);
  fightersPreview.innerHTML = '';
  fightersPreview.append(versusBlock);
}

function createVersusBlock(selectedFighters) {
  const canStartFight = selectedFighters.filter(Boolean).length === 2;
  const onClick = () => startFight(selectedFighters);
  const container = createElement({ tagName: 'div', className: 'preview-container___versus-block' });
  const image = createElement({
    tagName: 'img',
    className: 'preview-container___versus-img',
    attributes: { src: versusImg },
  });
  const disabledBtn = canStartFight ? '' : 'disabled';
  const fightBtn = createElement({
    tagName: 'button',
    className: `preview-container___fight-btn ${disabledBtn}`
  });
  fightBtn.addEventListener('click', onClick, false);
  fightBtn.innerText = 'Fight';
  container.append(image, fightBtn);
  return container;
}

function startFight(selectedFighters) {
  fighterService.getSelectedFighters().then(renderArena);
}

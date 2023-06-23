import { onMounted, onUnmounted ,ref} from 'vue';
import anime from 'animejs';
const useAnimatedCubes = (elementRef,startIndex) => {
  let isComplite = ref(false)
  let columns = 0;
  let rows = 0;
  const createTile = (index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    return tile;
  };

  const createTiles = (quantity) => {
    Array.from(Array(quantity)).map((tile, index) => {
      elementRef.value.appendChild(createTile(index));
      
    });
  };
  const createGrid = () => {
    columns = Math.floor(elementRef.value.clientWidth / 40)
    rows = Math.floor(elementRef.value.clientHeight / 40)
    elementRef.value.innerHTML = '';
    elementRef.value.style.setProperty('--columns', columns);
    elementRef.value.style.setProperty('--rows', rows);
    createTiles(columns * rows);
  }
  const startAnim = () => {
    if(!startIndex){
      startIndex = elementRef.value.children.length
    }
   
    anime({
      targets: '.tile',
      scale: [
        {value: 1, easing: 'easeOutSine', duration: 300},
        {value: 0, easing: 'easeInOutQuad', duration: 100}
      ],
      begin: function(anim) {
        isComplite.value =  false
      },
      complete: function(anim) {
        isComplite.value = true
      },
      delay: anime.stagger(100, {grid: [columns,rows], from:startIndex },),
    });
  };


  onMounted(() => {
    createGrid()
    window.addEventListener('resize', createGrid)
    startAnim()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', createGrid)
  })
  return {
    isComplite,
  }
};


export default useAnimatedCubes;
import { onMounted, onUnmounted ,ref} from 'vue';
import anime from 'animejs';
const useAnimatedCubes = (elementRef) => {
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
   
    anime({
      targets: '.tile',
      loop: true,
      endDelay: 2000,
      boxShadow: [
        {value: '0px 0px 0px 0px rgba(0, 0, 0, 0)', easing: 'easeOutSine', duration: 100},
        {value: '0px 0px 10px 2px rgba(170, 153, 3, 0.631)', easing: 'easeInOutQuad', duration: 300},
        {value: '0px 0px 0px 0px rgba(0, 0, 0, 0)', easing: 'easeOutSine', duration: 100},
      ],
      begin: function(anim) {
        isComplite.value =  false
      },
      complete: function(anim) {
        isComplite.value = true
      },
      delay: anime.stagger(100, {grid: [columns,rows], from:'center' },),
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

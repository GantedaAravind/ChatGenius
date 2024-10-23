import clickSound from '../assets/sucess.mp3'; // Adjust the path



const playSound = (): void => {
  const audio = new Audio(clickSound);
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
};
export default playSound; 

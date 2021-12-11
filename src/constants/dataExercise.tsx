import { icons } from "."
import images from "./images";
import doce from '../assets/images/recipes/bolinho.jpg';
import salgado from '../assets/images/recipes/bruschetta.jfif';
import cafe from '../assets/images/recipes/panqueca.jpg';
import almoco from '../assets/images/recipes/almoco.jpg';
import frutos from '../assets/images/recipes/frutos.jpg';
import lactose from '../assets/images/recipes/lactose.jpg';
import amendoim from '../assets/images/recipes/amendoim.jpg';

const trendingExercise = [
    {
        id: 1,
        name: "Doce",
        image: doce    
    },
    {
        id: 2,
        name: "Salgado",
        image: salgado
    },
    {
        id: 3,
        name: "Café da manhã",
        image: cafe
    },
    {
        id: 4,
        name: "Almoço",
        image: almoco
    },
    {
        id: 5,
        name: "Frutos do mar",
        image: frutos
    },
    {
        id: 6,
        name: "Sem lactose",
        image: lactose
    },
    {
        id: 7,
        name: "Amendoim",
        image: amendoim
    }

]

const categories = trendingExercise

export default {
    trendingExercise,
    categories
}
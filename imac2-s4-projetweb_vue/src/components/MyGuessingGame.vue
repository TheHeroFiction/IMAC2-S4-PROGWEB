<template>
  <button id="my-button" v-on:click="handleClick()">Start Game !</button>
  <p>
    The following box will indicate each of the following categories from left to right:
    Type of weapon, Rarity, Raw Attack, Damage Type and Elderseal (none, low , average, high).
  </p>
  <p>
    Green means it's a match and Red not and if you ever feel stuck, go under weapon gallery, you can load all the weapons and look for the one you are looking for.
  </p>
  <div id="info_container">
    <div id="info_line">
      <div v-for="item in items" :key="item" className="square" :id="item">
        <p v-if="answer_data && item === 'Type'" > {{ answer_data.type}} </p>
        <p v-else-if="answer_data && item === 'Rarity'" > {{ answer_data.rarity}} </p>
        <p v-else-if="answer_data && item === 'Raw attack'" > {{ answer_data.attack.raw}} </p>
        <p v-else-if="answer_data && item === 'Damage Type'" > {{ answer_data.damageType}} </p>
        <p v-else-if="answer_data && item === 'Elderseal'" > {{ answer_data.elderseal}} </p>
      </div>
    </div>
  </div>

  <div v-if="all_data">
    <label v-if="all_data" for="label1" >Your guess is : </label>
    <input v-if="all_data" id="label1" type="text" v-model="search" placeholder="Enter a guess" />
    <div  v-for="weapon in filteredGuessData" :key="weapon.id" class="box_possibility">
          <p v-if="filteredGuessData" >{{weapon.name}}</p>
          <button @click="submittedAnswerName(weapon)" > Answer this </button>
    </div>
  </div>

  <div v-if="submitted_answer">
    <div id="info_container">
      <div id="info_line">
        <div v-for="item in items" :key="item" className="square" :id="item">
          <p v-if=" item === 'Type' && answer_data.type === submitted_answer.type" class="correct" > {{ submitted_answer.type}} </p>
          <p v-else-if=" item === 'Type'&& answer_data.type !== submitted_answer.type" class="wrong" > {{ submitted_answer.type}} </p>

          <p v-else-if=" item === 'Rarity'&& answer_data.rarity === submitted_answer.rarity" class="correct" > {{ submitted_answer.rarity}} </p>
          <p v-else-if=" item === 'Rarity'&& answer_data.rarity !== submitted_answer.rarity" class="wrong" > {{ submitted_answer.rarity}} </p>

          <p v-else-if=" item === 'Raw attack'&& answer_data.attack.raw === submitted_answer.attack.raw" class="correct" > {{ submitted_answer.attack.raw}} </p>
          <p v-else-if=" item === 'Raw attack'&& answer_data.attack.raw !== submitted_answer.attack.raw" class="wrong" > {{ submitted_answer.attack.raw}} </p>

          <p v-else-if=" item === 'Damage Type'&& answer_data.damageType === submitted_answer.damageType" class="correct" > {{ submitted_answer.damageType}} </p>
          <p v-else-if=" item === 'Damage Type'&& answer_data.damageType !== submitted_answer.damageType" class="wrong" > {{ submitted_answer.damageType}} </p>

          <p v-else-if=" item === 'Elderseal'&& answer_data.elderseal === submitted_answer.elderseal" class="correct" > {{ submitted_answer.elderseal}} </p>
          <p v-else-if=" item === 'Elderseal'&& answer_data.elderseal !== submitted_answer.elderseal" class="wrong" > {{ submitted_answer.elderseal}} </p>
        </div>
      </div>
    </div>
    <div>
      <button v-if="right_answer_found" @click="playAgain()" > Play Again ? </button>
      <button v-else @click="guessAgain()" > Guess Again ? </button>
    </div>
  </div>
</template>

<script setup>
let items = ["Type","Rarity","Raw attack","Damage Type", "Elderseal"];

import { computed , ref } from 'vue';
import { getAWeaponData, getWeaponsData } from '@/services/api/mhw_api_caller';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const answer_data = ref(null);
const all_data = ref(null);

const backup_data  = ref(null); //will keep a copy of all weapon data so there's no need to make the request everytime

const right_answer_found = ref(false);
const search = ref('')
const submitted_answer = ref(null);

const handleClick = async() => {
  let id = getRandomIntInclusive(1,1306); // SOME ID ARE MISSING
  answer_data.value = await getAWeaponData(id);
  all_data.value = await getWeaponsData();
  backup_data.value = await getWeaponsData();
};

const filteredGuessData = computed( () => {
  let result =  all_data.value.filter(
    (weapon) => weapon.name.toLowerCase().includes(search.value.toLowerCase())
  )
  result = result.toSorted((a,b) => {return a.name.localeCompare(b.name)});
  return result;
})

const submittedAnswerName = (weapon) => {
  submitted_answer.value = weapon;
  all_data.value = null;
  if (submitted_answer.value.id === answer_data.value.id)
  {
    right_answer_found.value = true;
  }
}

const playAgain = async() => {
  submitted_answer.value = null;
  all_data.value = backup_data.value;
  right_answer_found.value = false;
  let id = getRandomIntInclusive(1,1306); // SOME ID ARE MISSING
  answer_data.value = await getAWeaponData(id);
}

const guessAgain = () => {
  submitted_answer.value = null;
  all_data.value = backup_data.value;
}


</script>

<style scoped>
#info_container
{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
}

#info_line
{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.square
{
  border : 2px solid rgb(60,60,60);
  width: 16vw;
  min-height: 80px;
  font-size: 2rem;
  font-weight: bold;

}

.correct
{
  background-color: green;
}

.wrong
{
  background-color: red;
}

.box_possibility
{
  border: 2px solid black;
  border-radius: 5px;
  max-width: 15vw;
}


</style>

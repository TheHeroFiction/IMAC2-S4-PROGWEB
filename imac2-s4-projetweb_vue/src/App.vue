<template>
  <MyHeader></MyHeader>
  <div>
    <h1>Guess the Monster Hunter Worlds Weapon</h1>
  </div>
  <MyGuessingGame />
  <div class="galleries">
    <h2>Weapon Gallery</h2>
    <div class="cards">
    <MyWeaponCard />
    </div>
  </div>
  <MyFooter></MyFooter>
</template>

<script setup>
import MyWeaponCard from './components/MyWeaponCard.vue';
import MyHeader from './components/MyHeader.vue';
import MyFooter from './components/MyFooter.vue';
import MyGuessingGame from './components/MyGuessingGame.vue';

</script>

<style scoped>
.square
{
  border : 2px solid rgb(60,60,60);
  min-width: 100%;
  min-height: 100%;
  font-size: 2rem;
  font-weight: bold;
}

:global(body)
{
  background-color: white;
}

h1
{
  display: flex;
  justify-content: center;
  align-self: center;

}

</style>

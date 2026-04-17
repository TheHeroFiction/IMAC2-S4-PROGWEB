<template>
  <button id="my-button" v-on:click="handleClick">Load weapons</button>
    <div id="gallery-options" >
      <input v-if="m_data" type="text" v-model="search" placeholder="Search weapon piece" />
      <label v-if="m_data" for="weapon-sort">Sort by : </label>
      <select v-if="m_data" v-model="weaponsSortBy" id="weapon-sort">
        <option v-if="m_data" value="type">Type</option>
        <option v-if="m_data" value="rarity">Rarity</option>
        <option v-if="m_data" value="name">Name</option>
      </select>
    </div>
    <div id="weapon-gallery" v-if="m_data">
    <div  v-for="weapon in filteredWeaponData" :key="weapon.id">
      <div id="weapon-card">
        <div id="weapon-description">
          <h3 v-if="filteredWeaponData" >{{weapon.name}}</h3>
          <p className="weapon-description-line" v-if="filteredWeaponData">Type: {{weapon.type}}</p>
          <p className="weapon-description-line" v-if="filteredWeaponData">Rarity: {{weapon.rarity}}</p>
          <p className="weapon-description-line" v-if="filteredWeaponData">Raw attack: {{weapon.attack.raw}}</p>
          <p className="weapon-description-line" v-if="filteredWeaponData">Display attack: {{weapon.attack.display}}</p>
          <p className="weapon-description-line" v-if="filteredWeaponData">Damage type: {{weapon.damageType}}</p>
          <p className="weapon-description-line" v-if="filteredWeaponData">Assets: {{weapon.assets}}</p>
          <img v-if="weapon.assets" :src = weapon.assets.image1>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>

import {computed, ref} from 'vue'
import {getWeaponsData} from '@/services/api/mhw_api_caller'

const m_data = ref(null)
const handleClick = async() => {
  m_data.value = await getWeaponsData()
};

const search = ref('')
const weaponsSortBy = ref('name')

const filteredWeaponData = computed( () => {
  let result =  m_data.value.filter(
    (weapon) => weapon.name.toLowerCase().includes(search.value.toLowerCase())
  )
  console.log(result);
  result = result.toSorted((a,b) => {
    if (weaponsSortBy.value === 'name')
  {
    return a.name.localeCompare(b.name)
  }
  else if (weaponsSortBy.value === 'type')
  {
    return a.type.localeCompare(b.type)
  }
  else
  {
    return a.rarity.localeCompare(b.rarity)
  }
  })
  return result
})


</script>

<style scoped>

#weapon-gallery {
  display: flex;
  flex-wrap :wrap ;
  align-content: space-around;
  flex-direction: row;
  justify-content: space-between;
}

#weapon-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
}

#weapon-picture {
  width: 100%;
  height: 105px;
  object-fit: cover;
}

#weapon-description {
  padding: 10px;
  color: #000000;
}

#weapon-description h3 {
  font-size: 18px;
  margin: 0;
}

.weapon-description-line {
  color: #353535;
  font-size: 12px;
  margin: 5px 0;
}
</style>

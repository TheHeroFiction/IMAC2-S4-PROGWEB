const getWeaponsData = async function () {
  const response = await fetch('https://mhw-db.com/weapons')
  if (response.status == 200)
  {
    const data = await response.json()
    return data
  } else {
    throw new Error(response.statusText())
  }
}

const getAWeaponData = async function (id) {
  const response = await fetch('https://mhw-db.com/weapons/'+ id)
  if (response.status == 200)
  {
    const data = await response.json()
    return data
  } else {
    const response = await fetch('https://mhw-db.com/weapons/1') //Some ID are missing so we grab one we know exist
    const data = await response.json()
    return data
  }
}



export { getWeaponsData, getAWeaponData}

const guests =
[ 'babushka'
, 'zombie'
];

const assets = [];

guests.forEach((guest) =>
{ assets.push({key: guest, URL: `./assets/guests/${guest}.png`});
});

for(let i = 1; i < 13; ++i)
{ const name = i < 10 ? '0' + i : i;
  assets.push({key: `drink-${name}`, URL: `./assets/drinks-on-bar/${name}.png`});
}

export default assets;
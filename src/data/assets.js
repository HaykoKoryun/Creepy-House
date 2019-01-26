const guests =
[ 'babushka'
, 'mummy'
, 'vlad'
];

const states =
[ 'normal'
, 'happy'
, 'angry'
];

const assets = [];

guests.forEach((guest) =>
{ states.forEach((state) =>
  { assets.push({key: `${guest}-${state}`, URL: `./assets/guests/${guest}-${state}.png`});
  });
});

for(let i = 1; i < 13; ++i)
{ const name = i < 10 ? '0' + i : i;
  assets.push({key: `drink-${name}`, URL: `./assets/drinks-on-bar/${name}.png`});
}

export default assets;
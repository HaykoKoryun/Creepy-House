const guests =
[ 'babushka'
, 'mummy'
, 'vlad'
, 'wolf'
, 'moose'
, 'devil'
, 'fishy'
, 'monkey'
, 'frankenstein'
];

const states =
[ 'normal'
, 'happy'
, 'angry'
];

const assets = [];

guests.forEach((guest) =>
{ states.forEach((state) =>
  { assets.push({key: `${guest}-${state}`, URL: `assets/guests/${guest}-${state}.svg`});
  });
});

export default assets;
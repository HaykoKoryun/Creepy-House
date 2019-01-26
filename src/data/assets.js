const guests =
[ 'babushka'
, 'zombie'
];

const assets = [];

guests.forEach((guest) =>
{ assets.push({key: guest, URL: `/assets/guests/${guest}.png`});
});

assets.push({key: 'bg', URL: '/assets/images/bg.png'});

export default assets;
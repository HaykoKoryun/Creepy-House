const guests =
[ 'babushka'
, 'zombie'
];

const assets = [];

guests.forEach((guest) =>
{ assets.push({key: guest, URL: `/assets/guests/${guest}.png`});
});

export default assets;
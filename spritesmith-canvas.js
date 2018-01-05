var glob = new require('glob');
var spritesmithTexturepacker = new require('spritesmith-texturepacker');
module.exports = [];

// cards
var cardPath = 'flip-card';
var stages = [
    'bg',
    'cards',
];
stages.forEach(function(stage) {
    module.exports.push({
        src: glob.sync('./' + cardPath + '/' + stage + '/*.png'),
        destImage: './public/' + cardPath + '/' + stage + '.png',
        destCSS: './public/' + cardPath + '/' + stage + '.json',
        cssTemplate: spritesmithTexturepacker,
        padding: 2,
    });
});
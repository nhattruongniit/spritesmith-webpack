const config = [{
    from: './src/sprites',
    to: './static',
    name: 'sprites',
    out: 'json'
}];
const jsonOut = require('spritesmith-texturepacker');


const { lstatSync, readdirSync, writeFile, existsSync, mkdirSync } = require('fs');
const { join, extname } = require('path');

function Dir(source){
    const files = [], dirs = [], jpgs = [], pngs = [];
    try{
        const nodes = readdirSync(source);
        nodes.forEach(node => {
            if(lstatSync(join(source, node)).isDirectory()){
                dirs.push(node);
            }else{
                switch(extname(node).toLowerCase()){
                    case '.png':
                        pngs.push(node);
                        break;
                    case '.jpg':
                        jpgs.push(node);
                        break;
                    default:
                }
                files.push(node);
            }
        });
    }catch(e){
        console.log(e);
    }
    Object.assign(this,{
        dirs: dirs,
        files: files,
        jpgs: jpgs,
        pngs: pngs
    });
}

function syncSprite(name, from, to){
    const dir = new Dir(from);
    var sprites = [];
    if(dir.jpgs.length){
        const jpg = {
            src: dir.jpgs.map(name => join(from, name)),
            destImage: join(to,name) + '.jpg',
            destCSS: join(to,name) + '.jpg',
            padding: 2,
        };
        sprites.push(jpg);
    } 
    if(dir.pngs.length){
        const png = {
            src: dir.pngs.map(name => join(from, name)),
            destImage: join(to,name) + '.png',
            destCSS: join(to,name)+ '.png',
            padding: 2,
        };
        sprites.push(png);
    }

    if(dir.dirs.length > 0){
        if(sprites.length == 0){
            to = join(to,name);
            name = '';
        }else{
            name += '.';
        }
        return sprites.concat.apply(sprites, dir.dirs.map(dir => {
            return syncSprite(name + dir,join(from, dir), to);
        }));
    }
    return sprites;
}

function makeImport(sprites, to, out, name){
    const files = sprites.map(sprite => {
        return sprite.destCSS.replace(to + '/','');
    });
    const content = makeImport[out || 'scss'](files);
    if(!existsSync(to)) mkdirSync(to);
    writeFile(join(to, name) + '.' + out, content, err => {if(err) throw err; });
}
Object.assign(makeImport,{
    scss(files){
        return files.map(file => "@import '"+ file +"'").join(';\n');
    },
    json(files){
        return JSON.stringify(files, null, 2);
    }
});

module.exports = config.map(config => {    
    var from = config.from, to = config.to || from, out = config.out, cssTemplate;
    from = join(__dirname,from);
    to = join(__dirname,to);
    switch(out){
        case 'json': 
            cssTemplate = jsonOut;
            break;
        case 'scss':
            break;
            default:
    }
    const sprites = syncSprite(config.name, from, to).map(sprite => {
        sprite.destCSS += '.' + out;
        sprite.cssTemplate = cssTemplate;
        return sprite;
    });
    makeImport(sprites, to, out, config.name, err => {
        throw err;
    });
    return sprites;
}).reduce((a,b) => a.concat(b));
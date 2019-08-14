const arg = require('arg');
const fs = require('fs');
var stdinBuffer = fs.readFileSync(0); 
console.log(stdinBuffer.toString());
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '--javascript': Boolean,
            '--typescript': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install',
            '-j': '--javascript',
            '-t': '--typescript',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        js: args['--javascript'] || false,
        ts: args['--typescript'] || false,
        runInstall: args['--install'] || false,
    };
}


function createDir(directory) {
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory, 0766, function(err){
            if(err){
                console.log(err);
                response.send("ERROR! Can't make the directory! \n");
            }
        });
    }
}

function cli(args) {
 let options = parseArgumentsIntoOptions(args);
 console.log(options);
}

cli(process.argv)

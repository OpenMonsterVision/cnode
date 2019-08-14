const arg = require('arg');
const fs = require('fs');
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

function checkDash(str) {

    if (str.includes("-")) {
        console.log("Last Arguement is not a folder name")
    }else
    {
        createDir(str)
    }
}

function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    checkDash(args[args.length - 1])
    console.log(options);
}
if (Boolean(process.stdin.isTTY)) {
    //var stdinBuffer = fs.readFileSync(0); 
    const chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write(`data: ${chunk}`);
    }  
    process.stdin.on('end', () => {
        process.stdout.write('end');
    });
}

cli(process.argv)

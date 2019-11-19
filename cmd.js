#!/usr/bin/env node
const program = require('commander');

program
    //.command('mkdir [dir]')
    .description('create a new project')
    .option('-t --template [template]', 'specify tempalste application')
    .option('-r --router', 'add router in template')
    .action(function (options) {
        require('./creat.js')(options, program.args[0]);
    })

program.parse(process.argv);



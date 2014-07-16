/*
 * grunt-roundhouse
 * https://github.com/rharik/grunt_roundhouse
 *
 * Copyright (c) 2014 Raif Harik
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var spawn = require('child_process').spawn;
    var path = require("path");

    grunt.registerMultiTask('roundhouse', 'Grunt plugin that configures runs RoundhousE db migration app', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            stdout: true,
            stderr: true,
            RH:'../lib/Roundhouse/',
            database:'',
            connstring:'',
            sqlfilesdirectory:'',
            servername:'',
            connectionstringadministration:'',
            databasetype:'',
            environment:'',
            output:'',
            createdatabasescript:'',
            repositorypath:'',
            versionfile:'',
            versionxpath:'',
            upfoldername:'',
            runfirstfoldername:'',
            functionfoldername:'',
            viewsfoldername:'',
            sprocsfoldername:'',
            runafteranytimescriptsfoldername:'',
            permissionsfoldername:'',
            schemaname:'',
            versiontablename:'',
            scriptsruntablename:'',
            scriptsrunerrorstablename:'',
            restore:'',
            restorefrom:'',
            restorecustomoptions:'',
            restoretimeout:'',
            drop:'',
            donotcreatedb:'true',
            warnononetimescriptchanges:'',
            silent:'',
            withtransaction:'',
            recoverymodesimple:'',
            debug:'',
            runallanytimescripts:''
        });
        var done = this.async();

        grunt.verbose.writeln('Using Options: ' + JSON.stringify(options, null, 4).cyan);
        build(options);
    });

    function build(options) {
        var cmdArgs = buildCmdLine(options);
        grunt.log.writeln('Using Command Args:' + cmdArgs);
        var cp = spawn( path.resolve(options.RH),cmdArgs);

        cp.stdout.on('data', function (data) {
            grunt.log.writeln(data.toString());
        });

        cp.stderr.on('data', function (data) {
            grunt.log.writeln('stderr: ' + data.toString());
        });

        setTimeout(function() {
            cp.stdin.write('echo \n');
            cp.stdin.end();
        }, 1000);
    }

    function buildCmdLine(options) {
        var arg = [];

        if(options.database!=='') {arg.push('/d="'+options.database+'"')};
        if(options.connstring!=='') {arg.push('/c='+options.connstring)};
        if(options.sqlfilesdirectory!=='') {arg.push('/f='+options.sqlfilesdirectory)};
        if(options.servername!=='') {arg.push('/s="'+options.servername+'"')};
        if(options.connectionstringadministration!=='') {arg.push('/csa="'+options.connectionstringadministration+'"')};
        if(options.databasetype!=='') {arg.push('/dt="'+options.databasetype+'"')};
        if(options.environment!=='') {arg.push('/env="'+options.environment+'"')};
        if(options.output!=='') {arg.push('/o='+options.output)};
        if(options.createdatabasescript!=='') {arg.push('/cds="'+options.createdatabasescript+'"')};
        if(options.repositorypath!=='') {arg.push('/r="'+options.repositorypath+'"')};
        if(options.versionfile!=='') {arg.push('/vf='+options.versionfile)};
        if(options.versionxpath!=='') {arg.push('/vx="'+options.versionxpath+'"')};
        if(options.upfoldername!=='') {arg.push('/u="'+options.upfoldername+'"')};
        if(options.runfirstfoldername!=='') {arg.push('/rf="'+options.runfirstfoldername+'"')};
        if(options.functionfoldername!=='') {arg.push('/fu="'+options.functionfoldername+'"')};
        if(options.viewsfoldername!=='') {arg.push('/vw="'+options.viewsfoldername+'"')};
        if(options.sprocsfoldername!=='') {arg.push('/sp="'+options.sprocsfoldername+'"')};
        if(options.runafteranytimescriptsfoldername!=='') {arg.push('/ra="'+options.runafteranytimescriptsfoldername+'"')};
        if(options.permissionsfoldername!=='') {arg.push('/p="'+options.permissionsfoldername+'"')};
        if(options.schemaname!=='') {arg.push('/sc="'+options.schemaname+'"')};
        if(options.versiontablename!=='') {arg.push('/vt="'+options.versiontablename+'"')};
        if(options.scriptsruntablename!=='') {arg.push('/srp="'+options.scriptsruntablename+'"')};
        if(options.scriptsrunerrorstablename!=='') {arg.push('/sret="'+options.scriptsrunerrorstablename+'"')};
        if(options.restore!=='') {arg.push('/restore="'+options.restore+'"')};
        if(options.restorefrom!=='') {arg.push('/rfp="'+options.restorefrom+'"')};
        if(options.restorecustomoptions!=='') {arg.push('/rco="'+options.restorecustomoptions+'"')};
        if(options.restoretimeout!=='') {arg.push('/rt="'+options.restoretimeout+'"')};
        if(options.drop!=='') {arg.push('/drop="'+options.drop+'"')};
        if(options.donotcreatedb!=='') {arg.push('/dnc='+options.donotcreatedb)};
        if(options.warnononetimescriptchanges!=='') {arg.push('/w="'+options.warnononetimescriptchanges+'"')};
        if(options.silent!=='') {arg.push('/silent="'+options.silent+'"')};
        if(options.withtransaction!=='') {arg.push('/t="'+options.withtransaction+'"')};
        if(options.recoverymodesimple!=='') {arg.push('/simple="'+options.recoverymodesimple+'"')};
        if(options.debug!=='') {arg.push('/debug="'+options.debug+'"')};
        if(options.runallanytimescripts!=='') {arg.push('/runnallanytimescripts="'+options.runallanytimescripts+'"')};

        return arg;
    }
};

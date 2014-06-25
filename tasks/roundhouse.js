/*
 * grunt-roundhouse
 * https://github.com/rharik/grunt_roundhouse
 *
 * Copyright (c) 2014 Raif Harik
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var exec = require('child_process').exec;
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('roundhouse', 'Grunt plugin that configures runs RoundhousE db migration app', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        stdout: true,
        stderr: true,
        RH:'',
        rhOptions:{
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
            runafterfoldername:'',
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
            donotcreatedb:'',
            warnononetimescriptchanges:'',
            silent:'',
            withtransaction:'',
            recoverymodesimple:'',
            debug:'',
            runallanytimescripts:''
        }
    });

    grunt.verbose.writeln('Using Options: ' + JSON.stringify(options, null, 4).cyan);

    build(options);
  });

  function build(options) {
    var cmd = buildCmdLine(options);
    grunt.verbose.writeln('Using Command:' + cmd.cyan);

    var cp = exec(cmd, {cwd:options.workingDir}, function(code, stdout, stderr) {
        if (code === 0) {
            done(null, stdout, code);
        } else {
            done(code, stderr, code);
        }
    });
    cp.stdout.on('data', function (chunk) {
        data.push(chunk);
    });
    cp.stdout.on('end',function(){
        processFinalLine(data, output);
        grunt.log.writeln(src.cyan);
    });

    if (options.stdout || grunt.option('verbose')) {
        cp.stdout.pipe(process.stdout);
    }
    if (options.stderr || grunt.option('verbose')) {
        cp.stderr.pipe(process.stderr);
    }
  }
  function buildCmdLine(options) {
    var arg = options.rhOptions.database==='' ? '': '-d=options.rhOptions.database';
      arg += options.rhOptions.connstring==='' ? '' : '-c=options.rhOptions.connstring';
      arg += options.rhOptions.sqlfilesdirectory==='' ? '' : '-f=options.rhOptions.sqlfilesdirectory';
      arg += options.rhOptions.servername==='' ? '' : '-s=options.rhOptions.servername';
      arg += options.rhOptions.connectionstringadministration==='' ? '' : '--csa=options.rhOptions.connectionstringadministration';
      arg += options.rhOptions.databasetype==='' ? '' : '--dt=options.rhOptions.databasetype';
      arg += options.rhOptions.environment==='' ? '' : '--env=options.rhOptions.environment';
      arg += options.rhOptions.output==='' ? '' : '-o=options.rhOptions.output';
      arg += options.rhOptions.createdatabasescript==='' ? '' : '--cds=options.rhOptions.createdatabasescript';
      arg += options.rhOptions.repositorypath==='' ? '' : '-r=options.rhOptions.repositorypath';
      arg += options.rhOptions.versionfile==='' ? '' : '--vf=options.rhOptions.versionfile';
      arg += options.rhOptions.versionxpath==='' ? '' : '--vx=options.rhOptions.versionxpath';
      arg += options.rhOptions.upfoldername==='' ? '' : '-u=options.rhOptions.upfoldername';
      arg += options.rhOptions.runfirstfoldername==='' ? '' : '--rf=options.rhOptions.runfirstfoldername';
      arg += options.rhOptions.functionfoldername==='' ? '' : '--fu=options.rhOptions.functionfoldername';
      arg += options.rhOptions.viewsfoldername==='' ? '' : '--vw=options.rhOptions.viewsfoldername';
      arg += options.rhOptions.sprocsfoldername==='' ? '' : '--sp=options.rhOptions.sprocsfoldername';
      arg += options.rhOptions.runafterfoldername==='' ? '' : '--ra=options.rhOptions.runafterfoldername';
      arg += options.rhOptions.permissionsfoldername==='' ? '' : '-p=options.rhOptions.permissionsfoldername';
      arg += options.rhOptions.schemaname==='' ? '' : '--sc=options.rhOptions.schemaname';
      arg += options.rhOptions.versiontablename==='' ? '' : '--vt=options.rhOptions.versiontablename';
      arg += options.rhOptions.scriptsruntablename==='' ? '' : '--srp=options.rhOptions.scriptsruntablename';
      arg += options.rhOptions.scriptsrunerrorstablename==='' ? '' : '--sret=options.rhOptions.scriptsrunerrorstablename';
      arg += options.rhOptions.restore==='' ? '' : '--restore=options.rhOptions.restore';
      arg += options.rhOptions.restorefrom==='' ? '' : '--rfp=options.rhOptions.restorefrom';
      arg += options.rhOptions.restorecustomoptions==='' ? '' : '--rco=options.rhOptions.restorecustomoptions';
      arg += options.rhOptions.restoretimeout==='' ? '' : '--rt=options.rhOptions.restoretimeout';
      arg += options.rhOptions.drop==='' ? '' : '--drop=options.rhOptions.drop';
      arg += options.rhOptions.donotcreatedb==='' ? '' : '--dnc=options.rhOptions.donotcreatedb';
      arg += options.rhOptions.warnononetimescriptchanges==='' ? '' : '-w=options.rhOptions.warnononetimescriptchanges';
      arg += options.rhOptions.silent==='' ? '' : '--silent=options.rhOptions.silent';
      arg += options.rhOptions.withtransaction==='' ? '' : '-t=options.rhOptions.withtransaction';
      arg += options.rhOptions.recoverymodesimple==='' ? '' : '--simple=options.rhOptions.recoverymodesimple';
      arg += options.rhOptions.debug==='' ? '' : '--debug=options.rhOptions.debug';
      arg += options.rhOptions.runallanytimescripts==='' ? '' : '--runallanytimescripts=options.rhOptions.runallanytimescripts';

    return util.format("%s %s ", options.RH, arg);
  }
};

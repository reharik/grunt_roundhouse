# grunt-roundhouse

> Grunt plugin that configures and runs RoundhousE db migration app.
Provided you have the RH.exe you can point to it and apply whatever cmd line params you normally would.
I have not used the vast majority of these Params.  If you do not set them they will not be passed (Except
for RH and donotcreatedb)

also I modified my version of RH.exe to point to my package.json for the version number.  So in the param versionfile
I just say 'package.json' and it works.  You'll probably want to implement some kind of bump task too.
I have submitted a pull request
if you would like that feature harass RH to accept it, ask me for a patch or figure out how to pull it out of github.

I ripped the param info directly from https://github.com/chucknorris/roundhouse/wiki/ConfigurationOptions.  Also I may have missed
a few params, if anyone cares let me know and I'll add em.



## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-roundhouse --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-roundhouse');
```

## The "roundhouse" task

### Overview
In your project's Gruntfile, add a section named `roundhouse` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  roundhouse: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.RH
Type: `String`
Default value: '../lib/Roundhouse/'

Path to the RH.exe file

#### options.database
Type: `String`

The database you want to create/migrate.

#### options.connstring
Type: `String`

As an alternative to ServerName and Database - You can provide an entire connection string instead.

#### options.sqlfilesdirectory
Type: `String`

The directory where your SQL scripts are. Defaults to .\

#### options.servername
Type: `String`

The server and instance you would like to run on. (local) and (local)\SQL2008 are both valid values. Defaults to (local).

#### options.connectionstringadministration
Type: `String`

This is used for connecting to master when you may have a different uid and password than normal.

#### options.databasetype
Type: `String`

Tells RH what type of database it is running on. This is a plugin model. This is the fully qualified name of a class that implements the interface roundhouse.sql.Database, roundhouse. If you have your own assembly, just set it next to rh.exe and set this value appropriately. Defaults to sqlserver which is a synonym for roundhouse.databases.sqlserver.SqlServerDatabase, roundhouse.databases.sqlserver.

#### options.environment
Type: `String`

This allows RH to be environment aware and only run scripts that are in a particular environment based on the namingof the script. LOCAL.something**.ENV.**sql would only be run in the LOCAL environment. Defaults to LOCAL.

#### options.output
Type: `String`

This is where everything related to the migration is stored. This includes any backups, all items that ran, permission dumps, logs, etc. Defaults to a special folder, common application data with roundhouse as subdirectory, i.e. C:\ProgramData\ChuckNorris\RoundhousE.

#### options.createdatabasescript
Type: `String`

This instructs RH to use this script for creating a database instead of the default based on the SQLType.

#### options.repositorypath
Type: `String`

The repository. A string that can be anything. Used to track versioning along with the version. Defaults to null.

#### options.versionfile
Type: `String`

Either a .XML file, a .DLL or a .TXT file that a version can be resolved from. Defaults to _BuildInfo.xml. (if you have my pull request for RH then you can point it to package.json

#### options.versionxpath
Type: `String`

Works in conjunction with an XML version file. Defaults to //buildInfo/version.

#### options.upfoldername
Type: `String`

The name of the folder where you keep your update scripts. Will recurse through subfolders. Defaults to up.

#### options.runfirstfoldername
Type: `String`

The name of the folder where you keep any functions, views, or sprocs that are order dependent. If you have a function that depends on a view, you definitely need the view in this folder. Will recurse through subfolders. Defaults to runFirstAfterUp.

#### options.functionfoldername
Type: `String`

The name of the folder where you keep your functions. Will recurse through subfolders. Defaults to functions.

#### options.viewsfoldername
Type: `String`

The name of the folder where you keep your views. Will recurse through subfolders. Defaults to views.

#### options.sprocsfoldername
Type: `String`

The name of the folder where you keep your stored procedures. Will recurse through subfolders. Defaults to sprocs.

#### options.runafteranytimescriptsfoldername
Type: `String`

The name of the folder where you keep scripts that will be run after all of the other any time scripts complete. Will recurse through subfolders. Defaults to runAfterOtherAnyTimeScripts.

#### options.permissionsfoldername
Type: `String`

 The name of the folder where you keep your permissions scripts. Will recurse through subfolders. Defaults to permissions.

#### options.schemaname
Type: `String`

This is the schema where RH stores it's tables. Once you set this a certain way, do not change this. This is definitely running with scissors and very sharp. I am allowing you to have flexibility, but because this is a knife you can still get cut if you use it wrong. I'm just saying. You've been warned. Defaults to RoundhousE.

#### options.versiontablename
Type: `String`

This is the table where RH stores versioning information. Once you set this, do not change this. This is definitely running with scissors and very sharp. Defaults to Version.

#### options.scriptsruntablename
Type: `String`

This is the table where RH stores information about scripts that have been run. Once you set this a certain way, do not change this. This is definitely running with scissors and very sharp. Defaults to ScriptsRun.

#### options.scriptsrunerrorstablename
Type: `String`

This is the table where RH stores information about scripts that have been run with errors. Once you set this a certain way, do not change this. This is definitelly running with scissors and very sharp. Defaults to ScriptsRunErrors.

#### options.restore
Type: `String`

This instructs RH to do a restore (with the restorefrompath parameter) of a database before running migration scripts. Defaults to false.

#### options.restorefrom
Type: `String`

This tells the restore where to get to the backed up database. Defaults to null. Required if /restore has been set. NOTE: will try to use Litespeed for the restore if the last two characters of the name are LS (as in DudeLS.bak).

#### options.restorecustomoptions
Type: `String`

This provides the restoreany custom options as in MOVE='Somewhere or another'. Take a look at Token Replacement to help out with naming.

#### options.restoretimeout
Type: `String`

Allows you to specify a restore timeout in seconds. The default is 900 seconds.

#### options.drop
Type: `String`

This instructs RH to remove a database and not run migration scripts. Defaults to false.

#### options.donotcreatedb
Type: `String` -> bool
Default value: 'true'

This instructs RH to not create a database if it does not exists. Defaults to false.

#### options.warnononetimescriptchanges
Type: `String`

Instructs RH to execute changed one time scripts (DDL/DML in Up folder) that have previously been run against the database instead of failing. A warning is logged for each one time scripts that is rerun. Defaults to false.

#### options.silent
Type: `String`

 Disable output of backups, items ran, permissions dumps, etc. Log files are kept. Useful for example in CI environment. Defaults to False.

#### options.withtransaction
Type: `String`

This instructs RH to run inside of a transaction. Defaults to false.

#### options.recoverymodesimple
Type: `String`

This instructs RH to set the database recovery mode to simple recovery. Only works with SqlServer. Defaults to false.

#### options.debug
Type: `String`

This instructs RH to write out all messages. Defaults to false.

#### options.runallanytimescripts
Type: `String`

This instructs RH to run any time scripts every time it is run. Defaults to false.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  roundhouse: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  roundhouse: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.2.0 -- Had typeo in github repo. couldn't figure out how to republish with out full point update
0.2.1 -- Fixed -sqlfilesdirectory option

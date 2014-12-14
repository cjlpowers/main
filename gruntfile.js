/// <binding BeforeBuild='default' />
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        exec: {
            CPBuild: {
                cmd: "grunt",
                cwd: "CP"
            },
            SandboxBuild: {
                cmd: "grunt",
                cwd: "Sandbox"
            }
        },
        copy: {
            SandboxDependencies: {
                files: [
                    { src: ['CP/js/*.js'], dest: '/Sandbox/js' },
                    { src: ['CP/js/*.d.ts'], dest: '/Sandbox/ts/typings' }
                ]
            }
        }
    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Definitions
    grunt.registerTask('CPBuild', ['exec:CPBuild']);
    grunt.registerTask('SandboxBuild', ['copy:SandboxDependencies', 'exec:SandboxBuild']);
    grunt.registerTask('build', ['CPBuild', 'SandboxBuild']);
    grunt.registerTask('default', ['build']);
    
};
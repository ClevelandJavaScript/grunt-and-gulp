module.exports = function(grunt) {
    require("time-grunt")(grunt);
    
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-compress');

    /** TODO: insert registered tasks here **/

    grunt.initConfig({
        
        clean: ["build"]
        
        /** TODO: insert additional tasks here **/

    });
    
};
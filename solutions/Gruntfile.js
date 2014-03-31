module.exports = function(grunt) {
	require("time-grunt")(grunt);
	
    grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask("default", ["copy", "cssmin", "uglify"]);
    grunt.registerTask("server", ["connect", "watch"]);
	grunt.registerTask("zip", ["copy", "cssmin", "uglify", "compress"]);

    grunt.initConfig({

        clean: ["build"],

        copy: {
			main: {
				files: [{
					expand: true,
					src: ["images/**/*"],
					dest: "build/grunt",
					cwd: "src"
				}, {
					expand: true,
					src: "index.html",
					dest: "build/grunt",
					cwd: "src"
				}]
			}
        },
		
		cssmin: {
			main: {
				files: {
					"build/grunt/css/application.min.css": [
						"src/vendor/bootstrap/css/bootstrap.css", 
						"src/css/custom.css"
					]
				}				
			}
		},

		uglify: {
			main: {
				files: {
					"build/grunt/js/application.min.js": [
						"src/vendor/jquery-2.1.0/jquery-2.1.0.js",
						"src/vendor/bootstrap/js/bootstrap.js",
						"src/js/custom.js"						
					]
				}				
			}
		},
						
        connect: {
			main: {
				options: {
					base: "build/grunt",
					hostname: "localhost",
					port: 3000
	            }				
			}
        },
		
		watch: {
			styles: {
				files: [
					"src/**/*.css"
				],
				tasks: ["cssmin"]
		    },
		    scripts: {
				files: [
					"src/**/*.js",
				],
				tasks: ["uglify"]
		    },
			statics: {
				files: [
					"src/images/**/*",
					"src/index.html"
				],
				tasks: ["copy"]
			}			
		},
		
		compress: {
			main: {
				options: {
					"mode": "zip",
					"archive": "build/grunt-app.zip",
					"level": 9
				},
				files: [{ 
					expand: true, 
					src : "**/*", 
					cwd : "build/grunt/" 
				}]
			}
		}				

    });
};
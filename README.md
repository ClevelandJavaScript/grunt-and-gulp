# Grunt and Gulp
This repository was prepared for the Cleveland JavaScript and Node.js meetups on March 31, 2014.  During the meetup, we take a look at Grunt and Gulp, which are two build systems for JavaScript applications.  These two build systems have competing philosophies.  Grunt is a configuration-driven approach whereas Gulp is a stream-oriented, code-driven approach.

Both are very good and have tradeoffs.  With Grunt 0.5 on the horizon and promising to feature more asynchronous stream-like mechanics, these two approaches will likely converge.  For the moment, they're great to use and interesting to experiment with.

This repository contains exercises for setting up a build with some lightweight optimizations in both Grunt and Gulp.  The exercises walk the user through performing similar optimizations with each for the purposes for encouraging comparison and contrast between the two build environments.  Finally, the user is encouraged to tweak and adjust their builds even futher to see if they can squeeze out a) faster build times or b) small build footprints.  Either Gulp or Grunt can be used for these purposes and it is left as an exercise to the group to see what best solutions can be procured.

## Prerequisites
You can run these exercises on your own laptop no matter whether it is of the Windows, Mac or Linux persuasion.  The only requirements are that you have an installation of Node.js on your machine.  

### Install Node.js

Go to http://www.nodejs.org to download and install Node.js on your machine.  The default installation options are perfectly fine.

### Grab a copy of this GitHub repository

You can either use Git and clone the repository master branch or you can download the source as a zip from the repository home page.  If you download a zip, make sure to uncompress it.

### Open a command prompt (or terminal window)

Most of what you're going to do in terms of working with Grunt or Gulp will be from the command line.  On Windows, you will use a Command Prompt (Start > Run... > "cmd").  On a Mac, you'll use a Terminal Window (Applications > Terminal).
	
## Getting Started
The project contains the following files:
```
gulpfile.js
Gruntfile.js
package.json
src/
	css/
		custom.css
	js/
		custom.js
	images/
		hendrix.png
		gilmour.png
		clapton.png
		vanhalen.png
	vendor/
		bootstrap/
		jquery-2.1.0/
	index.html
````

These files provide a contrived but fun example of a simple web application with JavaScript, CSS, images and HTML.  In addition to the custom.css and custom.js files, it also pulls in several CSS and JS files from the vendor directories.  To optimize things, our index.html would like to pull in a single CSS file and a single JS file, each of which will be concatenated, minified and compressed during the build process to have as small a footprint as possible.

Open up a command prompt into the project files directory:

Now install the Grunt Client:

	npm install grunt-cli -g
	
And install the Gulp Client:

	npm install gulp -g
	
And finally, install all project dependencies.  This will look at your package.json and download all of the project's Node.js module dependencies.  It might take a little while to run.  But once it's done, you'll be all set to start!

	npm install

## Grunt Exercises
In these exercises, we'll tell Grunt to build our web site and place the build resources into the <code>build/grunt</code> directory.  To do so, we'll edit the <code>Gruntfile.js</code> file.  We'll add Grunt configuration to the <code>grunt.initConfig()</code> configuration block.  We'll also register new tasks.

### Grunt: Cleaning things up
Open up the Gruntfile.js file in a text editor. You'll find placeholders there for where config and registered tasks can be inserted.

Notice that we already have a "clean" task defined.  The "clean" task invokes the grunt "clean" plugin.  The "clean" configuration tells Grunt to remove the "build" directory if it is found.
  
This gives us a way to clean stuff up and get back to a nice starting place.

Try this out by running <code>grunt clean</code> from the command line.  You should see something like:
```
Running "clean:0" (clean) task
Cleaning build...OK

Done, without errors.

Execution Time (2014-03-30 22:32:41 UTC)
loading tasks  335ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 98%
clean:0          6ms  ▇ 2%
Total 343ms
````

To learn more about the Grunt "clean" plugin, see https://github.com/gruntjs/grunt-contrib-clean.

### Grunt: Copy "index.html" and images to the build directory
We want to have Grunt copy some assets (things like index.html and any images) to our build directory.  That's because these are static assets and we don't have to do much else with them.

We can use the "copy" plugin to have Grunt do the copy for us.

Add in the following to the Grunt.initConfig block:

```
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
}
````

*Be sure to make sure you've added commas to any previous blocks so that the JSON is valid.*

Run <code>grunt copy</code> from the command line.  You should see the <code>build/grunt</code> directory appear.  It should have the static assets copied into it.

To learn more about the Grunt "copy" plugin, see https://github.com/gruntjs/grunt-contrib-copy.

### Grunt: Concatenate and Minify CSS
We have a couple of CSS files including Bootstrap's CSS and our own custom CSS.  We'd like to minify the CSS and concatenate it together into a single file so that it is as small as possible going over the wire.

Grunt provides a "cssmin" plugin that can be used to do this.

Add in the following to the Grunt.initConfig block:

```
cssmin: {
	main: {
		files: {
			"build/grunt/css/application.min.css": [
				"src/vendor/bootstrap/css/bootstrap.css", 
				"src/css/custom.css"
			]
		}				
	}
}
````

This tells grunt to minify and concatenate the two files into a single <code>application.min.css</code> file.

Run <code>grunt cssmin</code> from the command line.  You should see the minified CSS file appear in your build directory.

To learn more about the Grunt "cssmin" plugin, see https://github.com/gruntjs/grunt-contrib-cssmin.

### Grunt: Concatenate and Minify JS
We now want to do the same thing with our JavaScript.  We'd like to minify the JavaScript files and concatenate them together into a single file that is as small as it can be.

Grunt provides as an "uglify" plugin that can be used to do this.

Add the following to the Grunt.initConfig blocK:

```
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
}
````

This tells grunt to minify and concatenate the three files into a single <code>application.min.js</code> file.

Run <code>grunt uglify</code> from the command line.  You should see the minified JS file appear in your build.

To learn more about the Grunt "uglify" plugin, see https://github.com/gruntjs/grunt-contrib-uglify.

### Grunt: Wire things up into "default" task
We can now wire all of these build steps together into a single "default" task.  That way, we don't have to run them individually.  To do so, we'll register a new task that depends on our three individual tasks.  When this new task is run, the three tasks on which we dependent will be run.

Add the following to the "Registered Tasks" section at the top of your file:

```
grunt.registerTask("default", ["copy", "cssmin", "uglify"]);
````

Run <code>grunt</code> from the command line.  You should see all three of your tasks ("copy", "cssmin" and "uglify") run back to back.

### Grunt: Running a Web Server with a Watch
We can have Grunt run a web server for us using the "connect" plugin.  In addition, we can have Grunt keep the web server online while it watches files on disk.  If any of these files change, Grunt will automatically run our build and update our web server's resources.

To do so, we'll define a new task called "server" that runs the "connect" and "watch" tasks.  

Add the following to the "Registered Tasks" section at the top of your file:
```
grunt.registerTask("server", ["connect", "watch"]);
````

We'll use the "connect" plugin to start a web server on port 3000 that serves files from our build directory.
Add the following to your Grunt configuration:
```
connect: {
	main: {
		options: {
			base: "build/grunt",
			hostname: "localhost",
			port: 3000
		}				
	}
}
````

We'll use the "watch" plugin to watch for file changes to our source.  When CSS files change, we'll automatically run "cssmin".  When JS files change, we'll automatically run "uglify".  And when static files change, we'll run "copy".

Add the following to your Grunt configuration:
```	
watch: {
	styles: {
		files: ["src/**/*.css"],
		tasks: ["cssmin"]
	},
	scripts: {
		files: ["src/**/*.js"],
		tasks: ["uglify"]
	},
	statics: {
		files: ["src/images/**/*", "src/index.html"],
		tasks: ["copy"]
	}			
}
````

Run <code>grunt server</code> to start the web server.  It'll start and Grunt will start watching for file changes.  

You should be able to view your web page at <code>http://localhost:3000</code>.
You should also be able to make changes to files under the <code>/src</code> directory and see Grunt automatically rebuild when you save.

To learn more about the Grunt "watch" plugin, see https://github.com/gruntjs/grunt-contrib-watch.
To learn more about the Grunt "connect" plugin, see https://github.com/gruntjs/grunt-contrib-connect.

### Grunt: Zip things up
Let's add a task that will zip up our built web site.  We'll use this to see how small of a footprint Grunt can produce for us.

Add the following to the "Registered Tasks" section of Gruntfile.js:

```
grunt.registerTask("zip", ["copy", "cssmin", "uglify", "compress"]);
````

And add the following to the Grunt configuration:

```
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
````

Run <code>grunt zip</code> to package up a zip of our build.  

Note the resulting file size and how long it took.  Can gulp do better?

To learn more about the Grunt "compress" plugin, see https://github.com/gruntjs/grunt-contrib-compress.

## Gulp Exercises
Let's now take a look at Gulp.

Gulp is similar to Grunt in that it accomplishes the same thing.  We'll use Gulp to minify and package up our build to very much the same effect.  However, Gulp uses a streaming and code-oriented approach to things.  The result is less configuration, less code and a faster runtime due to the pipe() mechanics.

In these exercises, we'll tell Gulp to build our web site and place the results in the <code>build/gulp</code> directory.  To do so, we'll edit the <code>gulpfile.js</code> file.  We'll add any new code right to the file.  Unlike Grunt, there is no implicit JSON configuration.  Everything is just JavaScript.

### Gulp: Cleaning things up
Open up <code>gulpfile.js</code> in a text eidtor.  You'll find a placeholder there where additional code should be inserted.

Notice that a "clean" task is already defined.  The "clean" task registers a function that implements the task.  

This function uses the default <code>gulp.src()</code> method to grab at source files on disk (in this case, our <code>build</code> directory).  You can use wildcards to grab at as many matches as you'd like.  Anything it finds is piped to a handler.  In this case, we use the <code>clean()</code> handler which is provided by the "clean" plugin.  This handler simply deletes anything that is handed to it.
  
This gives us a way to clean stuff up and get back to a nice starting place.

Try this out by running <code>gulp clean</code> from the command line.  You should see something like:
```
[gulp] Using gulpfile gulpfile.js
[gulp] Starting 'clean'...
[gulp] Finished 'clean' after 3.36 ms
````

To learn more about the Gulp "clean" plugin, see https://github.com/peter-vilja/gulp-clean.

###  Gulp: Copy "index.html" and images to the build directory
Let's have Gulp copy some assets (things like index.html and any images) to our build directory.  That's because these are static assets and we don't have to do much else with them.

Add in the following to your gulp file:
```
gulp.task("copy", function() {
	return gulp.src(["src/images/**/*", "src/index.html"], { base: 'src' })
		.pipe(gulp.dest("build/gulp"));
});
````

This pipes out static resources (images and html) to a <code>gulp.dest()</code> handler.  This handler is provided out of the box and simply writes the piped file resources to a target directory.

Run <code>gulp copy</code> from the command line.  You should see the <code>build/grunt</code> directory appear.  It should have the static assets copied into it.

### Gulp: Concatenate and Minify CSS
We have a couple of CSS files including Bootstrap's CSS and our own custom CSS.  We'd like to minify the CSS and concatenate it together into a single file so that it is as small as possible going over the wire.

We'll use the Gulp "minify-css" and "concat" plugins to help us here.

Add in the following to your gulp file:
```
gulp.task("styles", function() {
	return gulp.src([
		"src/lib/bootstrap/css/bootstrap.css", 
		"src/css/custom.css"
	])
        .pipe(minifyCss())
        .pipe(concat('application.min.css'))
        .pipe(gulp.dest('build/gulp/css'));

});
````

This declares a task called "styles" that grab the source files and pipes them through a minifier (using the function variable <code>minifyCss</code>).  The minified results are concatenated together after being piped and joined together via the <code>concat</code> handler.  The resulting joined file is named <code>application.min.css</code> which is then written to the <code>build/gulp/css</code> directory.

Run <code>gulp styles</code> from the command line.  You should see the minified CSS file appear in your build directory.

To learn more about the Gulp "minify-css" plugin, see https://github.com/jonathanepollack/gulp-minify-css.
To learn more about the Gulp "concat" plugin, see https://github.com/wearefractal/gulp-concat.

### Gulp: Concatenate and Minify JS
We now want to do the same thing with our JavaScript.  We'd like to minify the JavaScript files and concatenate them together into a single file that is as small as it can be.

Gulp provides an "uglify" plugin that we can link into our piping chain to perform JS minification.

Add in the following to your gulp file:
```
gulp.task("scripts", function() {
    return gulp.src([
		"src/lib/jquery-2.1.0/jquery-2.1.0.js", 
		"src/lib/bootstrap/js/bootstrap.js",
		"src/js/custom.js"		
	])
        .pipe(uglify())
        .pipe(concat('application.min.js'))
        .pipe(gulp.dest('build/gulp/js'));	
});
````

The <code>uglify</code> handler minifies the JS prior to it being concatenated together, renamed and dropped into the build directory.

Run <code>gulp scripts</code> from the command line.  You should see the minified JS file appear in your build.

To learn more about the Gulp "uglify" plugin, see https://github.com/terinjokes/gulp-uglify.

### Gulp: Wire things up into "default" task
We can now wire all of these build steps together into a single "default" task.  That way, we don't have to run them individually.  To do so, we'll register a new task that depends on our three individual tasks.  When this new task is run, the three tasks on which we dependent will be run.

Add the following to your gulp file:

```
gulp.task("default", ["copy", "styles", "scripts"]);
````

Run <code>gulp</code> from the command line.  You should see all three of your tasks ("copy", "styles" and "scripts") run back to back.

### Gulp: Running a Web Server with a Watch
We can have Gulp run a web server and watch for file changes.

In terms of running a web server, there are a ton of options.  Since Gulp is just a Node.js process, you can use Express or any of a large multitude of plugins to achieve this.  Here we use the "serve" plugin.  We then set up a watch so that when files change, they're automatically rebuilt and deployed for us.

Let's start with the watch.

Add the following to your gulp file:
```
gulp.task("watch", function() {
	gulp.src(["src/**/*.css"])
		.pipe(watch(function() {
			gulp.start("styles");
		}));
	gulp.src(["src/**/*.js"])
		.pipe(watch(function() {
			gulp.start("scripts");
		}));		
	gulp.src(["src/images/**/*", "src/index.html"])
		.pipe(watch(function() {
			gulp.start("copy");
		}));		
});
```

The <code>watch</code> handler waits for changes to the source files.  When CSS files change, the "styles" task is fired.  When JS files change, the "scripts" task is fired.  And when static assets change, the "copy" task is fired.

Now let's define the web server:
```
gulp.task("server", ["watch"], function() {
	serve("build/gulp");
});
````

This task first runs the "watch" task to set up listeners.  And then it starts out web server to serve assets from the <code>build/gulp</code> directory.

Run <code>gulp server</code> to start the web server.  It'll start and Gulp will start watching for file changes.  

You should be able to view your web page at <code>http://localhost:3000</code>.
You should also be able to make changes to files under the <code>/src</code> directory and see Gulp automatically rebuild when you save.

To learn more about the Gulp "watch" plugin, see https://github.com/floatdrop/gulp-watch.
To learn more about the Gulp "serve" plugin, see https://github.com/nkt/gulp-serve.


### Gulp: Zip things up
Let's add a task that will zip up our built web site.  We'll use this to see how small of a footprint Gulp can produce for us.

Add the following to your gulp file:
```
gulp.task("zip", ["copy", "styles", "scripts"], function() {
	return gulp.start("compress");
});
gulp.task("compress", function() {
	gulp.src("build/gulp/**/*")
		.pipe(zip("gulp-app.zip"))
		.pipe(gulp.dest("build"));
});
````

The "zip" task runs our build ("copy", "styles" and "scripts").  Once that finishes, it runs the "compress" task.  Note that the "copy", "styles" and "scripts" tasks are run in parallel as opposed to back-to-back.  Gulp is highly asynchronous and so our "compress" task doesn't run until ALL three tasks complete, in any order.

The "compress" task grabs our build directory's contents and pipes them to a <code>zip</code> plugin handler that compresses them to a zip file named <code>gulp-app.zip</code>.  This zip file is written to the <code>build</code> directory.

Note the resulting file size and how long it took.  How does Gulp compare to Grunt?

To learn more about the Gulp "zip" plugin, see https://github.com/sindresorhus/gulp-zip.


## Grunt or Gulp
With these exercises, we've put in place a mechanism to evaluate Grunt and Gulp based on execution times and resulting file size.

*Comparing Execution Time*
1. Run <code>grunt server</code> and then make a change to the <code>custom.js</code> and <code>custom.css</code> files.
2. How long does Grunt take to rebuild the JS and CSS?
3. Run <code>gulp server</code> and then make a change to the <code>custom.js</code> and <code>custom.css</code> files.
4. How long does Gulp take to rebuild the JS and CSS?

*Comparing File Size*
1. Run <code>grunt zip</code> to produce the build zip using grunt.
2. Run <code>gulp zip</code> to produce the build zip using gulp.
3. Look at <code>build/grunt</code> and <code>build/gulp</code> to compare output directories of the build.
4. Look at gulp-app.zip and grunt-app.zip to compare zipped results.


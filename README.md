SproutCore Demos
================

These are apps that showcase (or will showcase) SproutCore at its finest.

### Setup

Make sure to run the following command to fill the `frameworks/sproutcore`
directory with the latest code from the master branch of sproutcore.

```bash
$ git submodule update --init
```

### Deployment

To deploy _(make sure to replace `{app_name}` and `{build_number}` appropriately)_:

1. Build the demo app into the working copy of the deployed page repo:

	```bash
	$ sproutcore build {app_name} --buildroot=../path_to_working_copy_of_sproutcore-demos.github.com_repo
	```
1. cd to that directory and move index.html to the top of the directory:

	```bash
	$ cd ../path_to_working_copy_of_sproutcore-demos.github.com_repo
	$ mv static/{app_name}/en/{build_number}/index.html {app_name}_demo.html
	```
1. Push to `git@github.com:sproutcore-demos/sproutcore-demos.github.com.git`

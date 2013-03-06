SproutCore Demos
================

These are apps that showcase (or will showcase) SproutCore at its finest.

To deploy:

• build the demo app into the working copy of the deployed page repo
  $ sproutcore build _app_name_ --buildroot=../path_to_working_copy_of_sproutcore-demos.github.com_repo_

• cd to that directory and move index.html to the top of the directory
  $ cd ../path_to_working_copy_of_sproutcore-demos.github.com_repo_
  $ mv static/_app_name_/en/_build_number_/index.html _app_name_demo.html

• push to git@github.com:sproutcore-demos/sproutcore-demos.github.com.git

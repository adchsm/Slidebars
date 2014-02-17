Slidebars
=========

Slidebars is a jQuery plugin for quickly and easily implementing app-style revealing menus and sidebars into your website.

See the [Slidebars website](http://plugins.adchsm.me/slidebars) for more information, usage documentation and compatibility tables.

Whats New
---------

Version 0.8 - February 17, 2014

* Added Slidebars Theme! An optional theme which you are free to use and abuse. It features a top navigation bar, list menus in Slidebars with unlimited level of drop downs, widgets and other useful CSS snippets. You can find the [theme usage here] (http://plugins.adchsm.me/slidebars/theme.php).
* Mobile and tablet only support. Pass a width to [option disableOver] (http://plugins.adchsm.me/slidebars/usage.php#options) to disable Slidebars over a certain width screen.
* Show/Hide the Slidebar control classes over the disabled width with [option hideControlClasses] (http://plugins.adchsm.me/slidebars/usage.php#options).
* You can now easily set [custom widths for your Slidebars] (http://plugins.adchsm.me/slidebars/usage.php#custom-widths). Add modifier class .sb-width-custom to your Slidebar, and pass a pixel or percentage width as a data attribute data-sb-width.
* New modifier class [.sb-static] (http://plugins.adchsm.me/slidebars/usage.php#modifier-classes). Add this class to your Slidebar to unfix it and scroll naturally with the site.
* Removed touchend events from links in Slidebars for better scrolling support.
* Reworked Control Class events to prevent tap and click events travelling down to elements in Slidebars.
* Added another Slidebar width for screens between 480px and 768px.
* Better Slidebar closing from clicking on the site.
* Cleaned up code.
* Further code comments.

Version History
---------------

0.7.1 - January 22, 2014

* Added Slidebars options.
* Added helper class html.sb-android for Android Browser version 2.*. Can be used to unfix your elements with position fixed.
* Added helper class .sb-disable-close. Apply to a link in a Slidebar to prevent it from closing on click.
* Smoother jQuery .animate() animations on window resize events.
* Cleaned up code.

0.7 - January 13, 2014 - First public release.

Sensor Management System
==========================================

# Table of contents
- [Sensor Management System](#sensor-management-system)
- [Introduction](#introduction)
- [File structure](#file-structure)
  - [docs](#docs)
  - [server](#server)
  	- [client](#client)
  	- [communication](#communication)
  	- [config](#config)
  	- [node_modules](#node-modules)
  	- [tests](#tests)
  		- [test_data](#test-data)


# Introduction

This document describes the file structure of SMS (Sensor Management System) and provides file desciptions.

Sensor Management System web application is structured into two parts: client and server side.

# File structure


## docs
This folder contains various files containing data about VIDEK file structure, installation guide and API.


## server
This folder contains folders and files currently used by the web application. Besides the server-side, as the folder name suggests, it contains the client-side of the web application. Subfolders and files are structured as follows:

- ### client
This is the client-side of SMS. Different file types are placed into separate folders:
	- #### <i class="icon-folder-open"></i> css
	   - <i class="icon-file"></i> **carvic.css**
	   *Bootstrap tweaks*
	   - <i class="icon-file"></i> **jquery-clockpicker.min.css**
	   *clockpicker for Bootstrap*
	   	
	- #### <i class="icon-folder-open"></i> font
	*Font Awesome 3.2.0 - the iconic font designed for Bootstrap. Font Awesome gives you scalable vector icons that can instantly be customized*
	    - <i class="icon-file"></i> **fontawesome-webfont.eot**
	    - <i class="icon-file"></i> **fontawesome-webfont.svg**
	    - <i class="icon-file"></i> **fontawesome-webfont.ttf**
	    - <i class="icon-file"></i> **fontawesome-webfont.woff**
	    - <i class="icon-file"></i> **FontAwesome.otf**
	    	
	- #### <i class="icon-folder-open"></i> img
	    - <i class="icon-file"></i> **favicon_32.png**
	    *32x32 SensorLab favicon*
	    - <i class="icon-file"></i> **favicon_orig.png**
	    *98x98 SensorLab favicon*
	    - <i class="icon-file"></i> **favicon.ico**
	    *128x128 SensorLab favicon*
	    - <i class="icon-file"></i> **favicon.png**
	    *SensorLab favicon in .png format*
	    - <i class="icon-file"></i> **glyphicons-halflings-white.png**
	    *Includes 200 glyphs in font format from the Glyphicon Halflings set, in white color.*
        *http://glyphicons.com/*
	    - <i class="icon-file"></i> **glyphicons-halflings.png**
	    *Includes 200 glyphs in font format from the Glyphicon Halflings set, in black color*
	    - <i class="icon-file"></i> **icons-big.png**
	    *Includes 200 glyphs in font format from the Glyphicon Halflings set*
	
	- #### <i class="icon-folder-open"></i> js
	    - <i class="icon-file"></i> **bootstrap3-typeahead.js**
	    *Bootstrap is a free collection of tools for creating websites and web applications. It contains HTML and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions.*
        *http://getbootstrap.com*
	    - <i class="icon-file"></i> **carvic.js**
        *JavaScript file supporting different subpages (such as admin.html, clusters.html, etc.). It contains models for: user list, user details, node search and details, single node search and details, component search and details, cluster search and details, cluster history, personal settings, refresh model. These models function by using Carvic.Utils utilities also contained in this file and knockout.js library.*
	    - <i class="icon-file"></i> **carvic.min.js**
	    *Minified version of carvic.js*
	    - <i class="icon-file"></i> **compress.bat**
	    *Batch file for creating minified versions of .js files*
	    - <i class="icon-file"></i> **jquery-clockpicker.min.js**
	    *jquery clockpicker*
	    - <i class="icon-file"></i> **jquerybootpag.js**
	    *jQuery plugin for dynamic pagination*
	    - <i class="icon-file"></i> **pagination.js**
       	
	
    - <i class="icon-file"></i> **admin.html**
    *This page is the SensorLab Dashboard. It gives users with administrator rights an overview on the number and activity of: nodes, their attached sensors, node clusters and users. It is also the page every user with administrator rights is redirected to after login.*
    - <i class="icon-file"></i> **cluster.html**
*This page gives you an overview of a single cluster by stating the following information about it: name, id, tag, type, scan option, time of last scan performed and its URL. You can edit or scan the cluster, get an insight on what nodes are a part of it (together with the nodes' names, IDs, statuses and location) and look into the cluster's history.*
    - <i class="icon-file"></i> **clusters.html**
*This page provides an overview of all clusters in the database. They are listed together with their types, IDs, tags, names and URLs. There is an option to search for a cluster by its tag, ID, name or type and an option to add a new cluster.*
    - <i class="icon-file"></i> **component.html**
*This page provides information about a single component, by listing the component's type, product number, production, series, serial number, status, project, comment and history.*
    - <i class="icon-file"></i> **components.html**
*This page lists all the components in the database by listing their type, product number, production, series, serial number, project and status. You have an option to add a new component or search the database for existing components.*
    - <i class="icon-file"></i> **help.html**
*This is the help section. It gives general information about the SMS and descriptions of concepts: component, node, sensor, cluster.*
    - <i class="icon-file"></i> **history.html**
*This page provides an insight on all the changes made to SMS. Every entry contains the following: time, title, description, node, component and cluster that the change affected. There is also an option to search these entries using the listed attributes.*
    - <i class="icon-file"></i> **index.html**
*The default page, automatically redirects to login.html.*
    - <i class="icon-file"></i> **login.html**
*This is the login page where users perform authorization.*
*Cookie usage notifications is implemented using:*
*http://www.amitywebsolutions.co.uk/tech-blog/javascript-notification-box-using-cookies-to-remember-close*
    - <i class="icon-file"></i> **map.html**
*This page shows the location of a chosen node on a map.*
    - <i class="icon-file"></i> **new_node.html**
*This is the page the "hardware guy" opens upon installation of a new node and enters its characteristics. There is also an option to use the last entered node's data and then edit it.*
    - <i class="icon-file"></i> **node.html**
*This page gives an insight on the single selected node by listing its information, basic data, system data and installed components. There are also options to show the node's location on map, look into node's data, its history, installed sensors and an option to edit the node.*
    - <i class="icon-file"></i> **nodes.html**
*This page lists all nodes in the database by listing their ID, name, status, cluster and attached sensors. You have an option to add a new node or search the database for existing nodes using node attributes.*
    - <i class="icon-file"></i> **stats.html**
*This page is the limited version of SensorLab Dashboard (or admin.html). It gives users an insight on nodes and sensors - number of installed and number of active ones and an insight on users - number of users, number of active ones and number of users with administrator rights.*
    - <i class="icon-file"></i> **user.html**
*This page provides information about a single chosen user by listing their username, full name, type, status, time of last login, list of all past logins and changes this user made to the SMS. An administrator can edit user's data, change user's password and delete a user.*
    - <i class="icon-file"></i> **users.html**
*This page lists all users by listing each user's: username, full name, status, type and time of last login. There is also an option to add a new user.*
    
- ### communication
*Folder containing communication protocols: coap, lcsp, http.*
	- <i class="icon-file"></i> **coap.js**
*This code communicates with HTTP/COAP proxy.*
	- <i class="icon-file"></i> **http_client.js**
*Functions for HTTP communication.*
	- <i class="icon-file"></i> **lcsp.js**
*This file contains code that allows us to communicate with Zigbee cluster.*

- ### config
*Folder containing files for aai authorization.*
	- <i class="icon-file"></i> **passport.js**
*AAI authorization*

- ### node modules
*Folder containing Node.js files.*

- ### tests
*Folder containing tests and development files.*
	- <i class="icon-file"></i> **db_dummy_data.js**
*dummy data,used for testing/development, inserted into database at start-up*
*DEVELOPMENT ONLY*
	- <i class="icon-file"></i> **db_mocks.js**
*DEVELOPMENT ONLY*
*Mock database inside memory, probably not operational anymore*
	- <i class="icon-file"></i> **import_excell_data.js**
*Utility functions for importing data from existing Excel files.*
	- <i class="icon-file"></i> **scanner_mock.js**
*DEVELOPMENT/DEBUGGING ONLY*
	- <i class="icon-file"></i> **test.js**
*DEVELOPMENT ONLY. Used for testing small chunks of code.*
*The code in this file is used to skip real scan and just provide the data from the file.*
	- #### <i class="icon-folder-open"></i> test_data
	*Folder containing test data.*

- <i class="icon-file"></i> **.gitignote**
*Git uses this file to determine which files and directories to ignore, before you make a commit.*
- <i class="icon-file"></i> **agenda_server.js**
*agenda server for scan scheduling.*
- <i class="icon-file"></i> **bl.js**
*"Business logic" - all smart stuff is happening here, except scanning.*
- <i class="icon-file"></i> **db_syncer.js**
*This code updates database data after scan produced new data*
- <i class="icon-file"></i> **db.js**
*This is DAL module for this system*
*Database access in hidden inside this file, only functions are exposed (mocking is possible)*
- <i class="icon-file"></i> **notifier.js**
*Progressive notifications - when enabled, they notify external systems about events inside SMS via REST call.*
- <i class="icon-file"></i> **parser.js**
*Parser for Zigbee responses.*
- <i class="icon-file"></i> **scan_coordinator.js**
 *Top level code for scanning, loops over all scanable clusters.*
- <i class="icon-file"></i> **scanner.js**
*Top-level code for scanning single cluster.*
- <i class="icon-file"></i> **server.js**
*Main file for Node.js server.*
- <i class="icon-file"></i> **settings.json**
Configuration for node.js server.
- <i class="icon-file"></i> **top.js**
*The top level code for SMS*
- <i class="icon-file"></i> **utils_hash.js**
*Hashing utilities.*
- <i class="icon-file"></i> **xutil.js**

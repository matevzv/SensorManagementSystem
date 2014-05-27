Sensor Management System
==========================================

Introduction
-------------

This document describes the file structure of SMS (Sensor Management System) and provides file desciptions.

Sensor Management System web application is structured into two parts: client and server side.

File structure
---------------

## <i class="icon-folder-open"></i> arhiv_ijs
This is where archive (.zip) files of previous versions are located. Functions as a backup.

## <i class="icon-folder-open"></i> docs
This folder contains various documents ranging from .xsl(x) and .doc(x) files containing data about CREW boxes and VESNA nodes (otherwise saved in database) to images and timeline from planning and developing the SMS system. This is also the location of the file "frs.md", which describes the Sensorlab project, project goals, user groups and user scenarios.

## <i class="icon-folder-open"></i> proto
This folder contains a prototype version of the client-side.

## <i class="icon-folder-open"></i> server
This folder contains folders and files currently used by web application. Besides the server-side, as the folder name suggests, it contains the client-side of web application. Subfolders and files are structured as follows:

- ### <i class="icon-folder-open"></i> client
This is the client-side of SMS. Different file types are placed into separate folders:
	- #### <i class="icon-folder-open"></i> css
	   - <i class="icon-file"></i> **bootstrap-responsive.css**
	   *A part of Bootstrap 2.1.1*
   	   - <i class="icon-file"></i> **bootstrap-responsive.min.css**
   	   *Minified version of the above file*
	   - <i class="icon-file"></i> **bootstrap.css**
	   *A part of Bootstrap 2.1.1*
	   - <i class="icon-file"></i> **bootstrap.min.css**
	   *Minified version of the above file*
	   - <i class="icon-file"></i> **carvic.css**
	   *Bootstrap tweaks*
	   - <i class="icon-file"></i> **datepicker.css**
	   *Datepicker for Bootstrap by Stefan Petre*
	   - <i class="icon-file"></i> **font-awesome.css**
	   *Font Awesome 3.2.0 - the iconic font designed for Bootstrap. Font         Awesome gives you scalable vector icons that can instantly be            customized*
	   	
	- #### <i class="icon-folder-open"></i> font
	*Font Awesome 3.2.0 - the iconic font designed for Bootstrap. Font       Awesome gives you scalable vector icons that can instantly be            customized*
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
	    *Includes 200 glyphs in font format from the Glyphicon Halflings         set, in white color, http://glyphicons.com/*
	    - <i class="icon-file"></i> **glyphicons-halflings.png**
	    *Includes 200 glyphs in font format from the Glyphicon Halflings         set, in black color, http://glyphicons.com/*
	    - <i class="icon-file"></i> **icons-big.png**
	    *Includes 200 glyphs in font format from the Glyphicon Halflings         set, http://glyphicons.com/*
	
	- #### <i class="icon-folder-open"></i> js
	    - <i class="icon-file"></i> **bootstrap-datepicker.js**
	    *Datepicker for Bootstrap by Stefan Petre. *
	    - <i class="icon-file"></i> **bootstrap.js**
	    *v2.1.1*
	    *Bootstrap is a free collection of tools for creating websites           and web applications. It contains HTML and CSS-based design              templates for typography, forms, buttons, navigation and other           interface components, as well as optional JavaScript extensions,         http://getbootstrap.com*
	    - <i class="icon-file"></i> **bootstrap.min.js**
	    *Minified version of bootstrap.js*
	    - <i class="icon-file"></i> **carvic.js**
	    
	    - <i class="icon-file"></i> **carvic.min.js**
	    *Minified version of carvic.js*
	    - <i class="icon-file"></i> **compress.bat**
	    *Batch file for creating minified versions of .js files*
	    - <i class="icon-file"></i> **google.jsapi.js**
	    
	    - <i class="icon-file"></i> **handlebars.js**
	    *1.0.rc.1*
	    *Handlebars provides the power necessary to let you build                semantic templates effectively with no frustration,                      http://handlebarsjs.com*
        - <i class="icon-file"></i> **jquery.js**
	    *v1.8.2*
        *jQuery is a fast, small, and feature-rich JavaScript library. It         makes things like HTML document traversal and manipulation, event         handling, animation, and Ajax much simpler with an easy-to-use           API that works across a multitude of browsers,                           http://jquery.com/*
	    - <i class="icon-file"></i> **knockout.js**
	    *v2.2.1*
	
    - <i class="icon-file"></i> admin.html
        This is ...

    - <i class="icon-file"></i> cluster.html
        This is ...
        
    - <i class="icon-file"></i> clusters.html
        This is ...
        
    - <i class="icon-file"></i> component.html
        This is ...
        
    - <i class="icon-file"></i> components.html
        This is ...
        
    - <i class="icon-file"></i> help.html
        This is ...
        
    - <i class="icon-file"></i> history.html
        This is ...
        
    - <i class="icon-file"></i> index.html
        This is ...
        
    - <i class="icon-file"></i> login.html
        This is ...
        
    - <i class="icon-file"></i> map.html
        This is ...
        
    - <i class="icon-file"></i> new_node.html
        This is ...
    
    - <i class="icon-file"></i> node.html
        This is ...
        
    - <i class="icon-file"></i> nodes.html
        This is ...
        
    - <i class="icon-file"></i> settings.html
        This is ...
        
    - <i class="icon-file"></i> stats.html
        This is ...
        
    - <i class="icon-file"></i> user.html
        This is ...
        
    - <i class="icon-file"></i> users.html
        This is ...
        
- ### <i class="icon-folder-open"></i> docs

    - <i class="icon-file"></i> docs_admin.md
    - <i class="icon-file"></i> docs.md
    
- ### <i class="icon-folder-open"></i> node_modules

- ### <i class="icon-folder-open"></i> test

- ### <i class="icon-folder-open"></i> test_data

- <i class="icon-file"></i> .gitignote

- <i class="icon-file"></i> bl.js

- <i class="icon-file"></i> coap.js

- <i class="icon-file"></i> db_dummy_data.js

- <i class="icon-file"></i> db_mocks.js

- <i class="icon-file"></i> db_syncer.js

- <i class="icon-file"></i> db.js

- <i class="icon-file"></i> enums.js

- <i class="icon-file"></i> http_client.js

- <i class="icon-file"></i> import_excell_data.js

- <i class="icon-file"></i> notifier.js

- <i class="icon-file"></i> parser.js

- <i class="icon-file"></i> scan_coordinator.js

- <i class="icon-file"></i> scanner_mock.js

- <i class="icon-file"></i> scanner.js

- <i class="icon-file"></i> server.js

- <i class="icon-file"></i> settings.json

- <i class="icon-file"></i> test.js

- <i class="icon-file"></i> top.js

- <i class="icon-file"></i> utils_hash.js

- <i class="icon-file"></i> xutil.js

- <i class="icon-file"></i> zigbee.js

glu task list (Last Updated: 2011/07/21)
========================================
This document contains the list of tasks (without any sense of prioritization!) for glu.

I. Lowering barrier of entry
----------------------------
The main idea is to allow new users to feel more confident in adopting glu

1. Ability to write 'glu scripts' in 'other' languages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
glu scripts need to be written in groovy (or java since groovy is java) which may be an issue for non java users.

a. Bundle a glu script as a tarball of 'executables'
"""""""""""""""""""""""""""""""""""""""""""""""""""""
Captured in ticket https://github.com/linkedin/glu/issues/41 => under the cover a (built-in) glu script will download the tarbal and each phase will simply fork to execute an external program (which may be written in any language the user wants: shell, ruby, etc...)

b. Write glu scripts in various 'script' languages
""""""""""""""""""""""""""""""""""""""""""""""""""
Difference with a. is that the scripts would actually execute directly within the agent VM. Under the cover it would use the javax.script.ScriptEngine infrastructure, so whatever is supported by this infrastructure could be supported by glu. This would allow for tighter integration than a. (for example, accessing some of the convenience calls offered by glu and potentially exporting fields to ZooKeeper)

2. Make production setup easier
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

a. Implement a wizard/script to handle setup
""""""""""""""""""""""""""""""""""""""""""""
This is currently captured with ticket https://github.com/linkedin/glu/issues/58

b. Allow database configuration
"""""""""""""""""""""""""""""""
This is currently captured with ticket https://github.com/linkedin/glu/issues/76

3. Ability to execute ad-hoc commands
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
glu already has the capability to talk to remote nodes to execute any kind of glu scripts. The idea here would be to offer a very simplified/easy way to run any kind of command on a targeted set of nodes (a little bit like what RunDeck allows you to do), without necessarily have to deal with glu scripts, json model, etc... Example of command (syntax and naming TBD of course):

// run the "uptime" command on all nodes that have been tagged "osx"
glu-ad-hoc -t osx -c "uptime"

4. Allow for easier development of glu scripts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Currently to develop/debug a glu script, you need at least an agent to be up and then use the agent-cli to talk to this agent. It would be easier to have 1 cli that would simply instantiate the agent, runs the command and stop the agent (or we could imagine to start it in interactive mode with a prompt to enter commands directly). This would include the possibility of easily writing unit tests for glu scripts (captured with ticket: https://github.com/linkedin/glu/issues/80)


II. Improvements to the orchestration engine/console
----------------------------------------------------

1. SystemModel enhancements
^^^^^^^^^^^^^^^^^^^^^^^^^^^

a. Add support for dependencies
"""""""""""""""""""""""""""""""
This has been submitted as an RFC on the forum: see thread http://glu.977617.n3.nabble.com/RFC-Modeling-dependencies-using-priority-td3179627.html

b. Add support for actionArgs
"""""""""""""""""""""""""""""
This is currently captured with ticket https://github.com/linkedin/glu/issues/23
The main idea behind this one is to allow for faster deployments, potentially less resource intensive as changing an actionArgs would trigger only the proper set of actions to be re-executed as opposed to a full undeploy/deploy cycle.

2. Usability features
^^^^^^^^^^^^^^^^^^^^^

a. Handle customization of the dashboard
""""""""""""""""""""""""""""""""""""""""
This is somewhat captured in the following tickets:

* make console views navigation friendly (bookmarkable) (https://github.com/linkedin/glu/issues/17)
* Add dates to the table at /console (https://github.com/linkedin/glu/issues/28)

This is also stemming from some conversation at the LinkedIn focus group (http://glu.977617.n3.nabble.com/Notes-from-LinkedIn-User-Focus-Group-2011-07-18-td3183639.html)

I have been doing some thinking about how to customize the dashboard and I think something like this would work:

* ability for a user to have more than 1 (named) dashboard view, each with its set of columns to show/hide, as well as the columns order. It should be easy for the user to switch from one dashboard to another. The console should remember which dashboard was being shown as the user navigates away and come back (this could be bookmarkable as well /dashboard/<name>)
* ability for a user to create (named) "filters" (using the DSL defined @  http://linkedin.github.com/glu/docs/latest/html/filtering.html#goe-filter-syntax). Currently on the top right section, there is Fabric | product, I was thinking adding Fabric | product | filter. Filter would be selectable amongst all the filters that the user has created and would be sticky (like fabric and product). The "product" section is in fact a filter already but defined for all users (it is configurable and described here http://linkedin.github.com/glu/docs/latest/html/console.html#header). This feature would allow a user to add its own set of (arbitrary) filters

One way to look at the 2 previous features is:

* first feature allows you to configure the columns of the dashboard
* second feature allows you to configure the rows of the dashboard (which ones get displayed)

b. GC Tuning
""""""""""""
Also following discussion with LinkedIn, there are a host of features to tune the GC so that the application is more responsive

* keeping completed plans in unarchived state causes memory pressure (https://github.com/linkedin/glu/issues/79)
* Do not fetch full json model on System page (https://github.com/linkedin/glu/issues/77)
* Allow database configuration for the console (https://github.com/linkedin/glu/issues/76) (in order not to use in-memory database!)

c. Complete REST API
""""""""""""""""""""
There is one ticket for one feature (implement rest call GET /plans (https://github.com/linkedin/glu/issues/66)) but in general all available functionality from the browser should be available from the REST api as well

III. High priority issues
-------------------------
This section contains the issues that are non critical but considered high priority

1. Agent auto upgrade process relies on timing
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This is captured with ticket https://github.com/linkedin/glu/issues/69 . This timing issue could cause problems in the future and need to be removed.

IV. Miscellaneous
-----------------
All other tickets currently open on github and not mentioned anywhere else in this document (https://github.com/linkedin/glu/issues)
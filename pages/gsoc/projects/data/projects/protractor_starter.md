Protractor starting kit for writing end-to-end tests for angular.js applications. 
Using TypeScript for strong typing and rich code completion suppor mixed with 
useful plugins built-in to the starterkit to help you get started writing 
protractor tests in no time.

There are key milestones we have planned for this project. In this summer we 
would like to see most of this list to be completed.

#### Build up the project with more helpers, useful custom locators and base page objects that can be extended in any project

There should be more tests written against the sample application and these tests
should be refactored further to make the reusable framework. To this useful 
custom locators and other helpers should be added. These parts should be added in
a way, where any user of the framework is able to add them directly in to their 
scripts and work with them.

#### Setup automatic screen capturing tool for the project.

Proper screen capturing tool should be setup with the project to capture 
screenshots when tests fail. These screenshots can then be uploaded to the 
real-time dashboard along with the output from the tests.

#### Research on a way to plugin to Protractor and retrieve more information about the tests and tests results running in protractor to generate reports.

Currently protractor is able to provide some information about the executed tests
in a json format. But that information is very minimal. There needs to be more 
information about the tests such as running time, start time, end time, stack 
trace, tests descriptions/name etc. (depending on the capability of protractor 
to get them out). Some research must be done to find a way to get these data out 
of protractor and in a format, that can be imported directly in to the real-time 
dashboard and show these data in an informative manner.

#### Create a Real-Time Dashboard to display test results and other information about the test execution

Ideally, history about tests that ran, currently running tests, test execution 
time/history of each test that was run. Success/Failure percentage, 
Success/Failure history over time. Most common issues etc. should be listed in 
the dashboard. 

Nice to have features include, ability to trigger individual tests or tests 
suites from within the dashboard itself.

#### Setup a proper test application to run the tests against.

A proper sample application is needed to run the tests against. The sample 
project should have enough functionality to fully use the capabilities of 
protractor as well as new capabilities put in by the Protractor-TypeScript 
starter project, such as new locators, helpers etc. An already existing sample 
project can be used for this or a new sample project can be written for this 
purpose (in-progress)

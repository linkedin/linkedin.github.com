### Gsoc cordova package.json
Apache Cordova is an opensource mobile development framework that allows to use standard web technologies. However, the standard boilerplate code currently in use have several different configurations to code, build, ship, and run cross-platform applications loosing single source of truth principle from the architectural overview.
* config.xml - contains dev-ops configurations, dependencies, platform configurations, and app configurations.
* package.json - contains dev-ops configurations, dependencies and some platform configurations, and some app configurations.
The mission is to leave the app configuration and app settings on config.xml and move the rest to package.json enabling code, build, and ship to use package.json file.

REFERENCES

https://cordova.apache.org/docs/en/latest/guide/overview/

https://cordova.apache.org/docs/en/latest/guide/overview/
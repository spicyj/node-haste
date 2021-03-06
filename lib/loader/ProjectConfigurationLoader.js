/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var inherits = require('util').inherits;

var ResourceLoader = require('./ResourceLoader');
var ProjectConfiguration = require('../resource/ProjectConfiguration');


/**
 * @class Loads and parses package.json files
 *
 * @extends {ResourceLoader}
 */
function ProjectConfigurationLoader() {
  ResourceLoader.call(this);
}
inherits(ProjectConfigurationLoader, ResourceLoader);
ProjectConfigurationLoader.prototype.path = __filename;

ProjectConfigurationLoader.prototype.isConfiguration = true;


ProjectConfigurationLoader.prototype.getResourceTypes = function() {
  return [ProjectConfiguration];
};

ProjectConfigurationLoader.prototype.getExtensions = function() {
  return ['.json'];
};


/**
 * Initialize a resource with the source code and configuration
 * Loader can parse, gzip, minify the source code to build the resulting
 * Resource value object
 *
 * @protected
 * @param {String}               path      resource being built
 * @param {ProjectConfiguration} configuration configuration for the path
 * @param {String}               sourceCode
 * @param {Function}             callback
 */
ProjectConfigurationLoader.prototype.loadFromSource =
  function(path, configuration, sourceCode, messages, callback) {
    var config = new ProjectConfiguration(path);
    config.id = path;
    config.data = JSON.parse(sourceCode);
    callback(messages, config);
};

/**
 * Only match package.json files
 * @static
 * @param  {String} filePath
 * @return {Bollean}
 */
ProjectConfigurationLoader.prototype.matchPath = function(filePath) {
  return filePath.length >= 12 &&
    filePath.lastIndexOf('package.json') === filePath.length - 12;
};


module.exports = ProjectConfigurationLoader;

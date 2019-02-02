/**
 * browserify test 
 */
import pkg from "../../src/js/index.js";

QUnit.module("browserify require");
QUnit.test("videojs-thumbnails should be requireable via browserify", (assert) => {
  assert.ok(pkg, "videojs-thumbnails is required properly");
});
/**
 * webpack test 
 */
import pkg from "../../src/js/index.js";

QUnit.module("webpack require");
QUnit.test("videojs-thumbnails should be requireable via webpack", (assert) => {
  assert.ok(pkg, "videojs-thumbnails is required properly");
});
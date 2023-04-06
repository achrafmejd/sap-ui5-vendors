/*global QUnit*/

sap.ui.define([
	"vendors/controller/VendorsMain.controller"
], function (Controller) {
	"use strict";

	QUnit.module("VendorsMain Controller");

	QUnit.test("I should test the VendorsMain controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

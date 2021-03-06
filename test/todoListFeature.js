var TestOperations = require('./support/TestOperations');
var Page = require('./support/Page');

describe('TODO app', function() {
  var page = new Page(casper);
  var testOps = new TestOperations(page);

  var TODO_ITEM_ONE = 'buy some cheese';
  var TODO_ITEM_TWO = 'feed the cat';
  var TODO_ITEM_THREE = 'book a doctors appointment';

  before(function() {
    casper.on("page.error", function(msg, trace) {
      this.echo("Error:    " + msg, "ERROR");
      this.echo("file:     " + trace[0].file, "WARNING");
      this.echo("line:     " + trace[0].line, "WARNING");
      this.echo("function: " + trace[0]["function"], "WARNING");
      errors.push(msg);
    });

    casper.start('http://127.0.0.1:8080/');
  });

  describe('When page is initially opened', function () {
    it('should focus on the todo input field', function () {
      testOps.assertFocussedElementId('new-todo');
    });
  });

  describe('No Todos', function () {
    it('should hide #main and #footer', function () {
      testOps.assertItemCount(0);
      testOps.assertMainSectionIsHidden();
      testOps.assertFooterIsHidden();
    });
  });

  describe('New Todo', function () {
    it('should allow me to add todo items', function () {
      page.enterItem(TODO_ITEM_ONE);
      testOps.assertItems([TODO_ITEM_ONE]);
    });

    xit('should clear text input field when an item is added', function () {
      page.enterItem(TODO_ITEM_ONE);
      testOps.assertItemInputFieldText('');
    });

    xit('should append new items to the bottom of the list', function () {
      createStandardItems();
      testOps.assertItemCount(3);
      testOps.assertItemText(0, TODO_ITEM_ONE);
      testOps.assertItemText(1, TODO_ITEM_TWO);
      testOps.assertItemText(2, TODO_ITEM_THREE);
    });

    xit('should trim text input', function () {
      page.enterItem('   ' + TODO_ITEM_ONE + '  ');
      testOps.assertItemText(0, TODO_ITEM_ONE);
    });

    xit('should show #main and #footer when items added', function () {
      page.enterItem(TODO_ITEM_ONE);
      testOps.assertMainSectionIsVisible();
      testOps.assertFooterIsVisible();
    });
  });
});

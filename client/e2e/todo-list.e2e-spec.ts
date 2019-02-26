import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its' thing.
    //If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Todo page title attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todos');
    });

    it('should type something in category filter box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeACategory("software");
        expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.");
    });

    it('should type something in body filter box and check that it returned correct element', () => {
      page.navigateTo();
      page.typeABody("In sunt ex non tempor");
      expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.");
    });

    it('should type something in status filter box and check that it returned correct element', () => {
      page.navigateTo();
      page.typeAStatus("f");
      expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.");
    });

    it('should type something in owner filter box and check that it returned correct element', () => {
      page.navigateTo();
      page.typeAnOwner("Bla");
      expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.");
    });

});

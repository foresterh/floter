/**
 The MIT License

 Copyright (c) 2015, Sebastian Sdorra

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/


'use strict';

describe('Drag and drop tests', function(){

  beforeEach(function(){
    browser.get('http://localhost:9003/site/index.html#/home');
    browser.executeScript('window.localStorage.clear();');
  });

  it('widgets should be moveable', function(){
    // enter edit mode
    element(by.css('h1 a')).click();

    // move first widget to second column
    var mover = element.all(by.css('a > i.glyphicon-move')).first();

    // check source col
    var sourceCol = element.all(by.css('.column')).first();
    expect(sourceCol.all(by.css('.widget')).count()).toEqual(1);

    // check target col
    var targetCol = element.all(by.css('.column')).get(1);
    expect(targetCol.all(by.css('.widget')).count()).toEqual(1);

    // dnd
    browser.actions()
      .dragAndDrop(mover, targetCol)
      .perform();

    // verifiy dnd result
    expect(sourceCol.all(by.css('.widget')).count()).toBe(0);
    expect(targetCol.all(by.css('.widget')).count()).toBe(2);
  });

});

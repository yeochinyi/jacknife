'use strict';

describe('Util Tests ', function() {

    var inv = [{
        apples: 0,
        oranges: 144,
        eggs: 36
    }, {
        apples: 240,
        oranges: 54,
        eggs: 12
    }, {
        apples: 24,
        oranges: 12,
        eggs: 42
    }];

    var a = {
        id: 1
    };

    var b = {
        id: 2
    };

    var c = {
        id: 3
    };

    var aObj = { obj: a };
    var bObj = { obj: b };
    var cObj = { obj: c };

    var objs = [aObj, bObj, cObj];

    describe('jacknife', function() {
        // it('mapWith', function() {
        //     var safeSquareAll = jk.mapWith(jk.maybe(function(n) {
        //         return n * n
        //     }));
        //     //var safeSquareAll = jk.mapWith(function (n) { return n * n }); 			
        //     expect(safeSquareAll([1, null, 3, 5])).toEqual([1, null, 9, 25]);
        //     //expect(safeSquareAll([1, 2, 3])).toEqual([1, 4, 9]);


        //     expect(jk.mapWith(jk.getWith('oranges'))(inventories)).toEqual([144, 54, 12]);

        // });

        it('once', function() {

            var i = 0;
            var doit = jk.once(function() {
                i++
            });
            doit();
            doit();

            expect(i).toEqual(1);
        });

        it('callLeft', function() {
            var mapper = jk.variadic(function(fn, elements) {
                return elements.map(fn);
            });
            var squarer = jk.callLeft(mapper, function(x) {
                return x * x
            });
            expect(squarer(1, 2, 3)).toEqual([1, 4, 9]);
        });

        it('tap', function() {
            var counter = 0;
            var tapper = jk.tap('Hello', function(it) {
                counter++;
            });
            expect(tapper).toEqual('Hello');
            expect(counter).toEqual(1);
        });

        it('maybe', function() {
            var v = 'yeah';
            var mb = jk.maybe(function(c) {
                v = c;
            });
            mb(null);
            expect(v).toEqual('yeah');
        });

        it('deepPredicate', function() {
            //        	var find = function(col, key, value) {
            //        		var x;
            //        		for(x in col){
            //        			var obj = col[x];
            //        			if(obj[key] === value){
            //        				return obj;
            //        			}
            //        		}            	
            //            }        	
            //        	var f = find([a,b,c], 'id', 2);        	
            //        	expect(f).toEqual(b);

            var find = function(col, fn) {
                var x;
                for (x in col) {
                    var obj = col[x];
                    if (fn(obj)) {
                        return obj;
                    }
                }
            }
            var f = find([a, b, c], function(o) {
                return o.id === 2;
            });
            expect(f).toEqual(b);
            var dp = jk.deepPredicate(find)(objs, 'obj.id', 2);
            expect(dp).toEqual(bObj);

            var dp = jk.deepPredicate(_.find)(objs, 'obj.id', 2);
            expect(dp).toEqual(bObj);
        });

        it('deepProp', function() {

            var pluck = function(col, fn) {
                var array = [];
                var x;
                for (x in col) {
                    var obj = col[x];
                    array.push(fn(obj));
                }
                return array;
            }

            var p = pluck(objs, function(o) {
                return o.obj.id;
            });
            expect(p).toEqual([1, 2, 3]);

            var dp = jk.deepProp(pluck)(objs, 'obj.id');
            expect(dp).toEqual([1, 2, 3]);

            dp = jk.deepProp(_.map)(objs, 'obj.id');
            expect(dp).toEqual([1, 2, 3]);

            dp = jk.deepProp(_.indexBy)(objs, 'obj.id');
            expect(dp).toEqual({ 1: aObj, 2: bObj, 3: cObj });

            dp = jk.deepProp(_.groupBy)([aObj, aObj, bObj, cObj, cObj, cObj], 'obj.id');
            expect(dp).toEqual({ 1: [aObj, aObj], 2: [bObj], 3: [cObj, cObj, cObj] });

        });



    });
});
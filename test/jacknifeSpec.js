'use strict';

describe('Util Tests ', function() {

    describe('jacknife', function() {
        // it('mapWith', function() {
        //     var safeSquareAll = jk.mapWith(jk.maybe(function(n) {
        //         return n * n
        //     }));
        //     //var safeSquareAll = jk.mapWith(function (n) { return n * n }); 			
        //     expect(safeSquareAll([1, null, 3, 5])).toEqual([1, null, 9, 25]);
        //     //expect(safeSquareAll([1, 2, 3])).toEqual([1, 4, 9]);
        //     var inventories = [{
        //         apples: 0,
        //         oranges: 144,
        //         eggs: 36
        //     }, {
        //         apples: 240,
        //         oranges: 54,
        //         eggs: 12
        //     }, {
        //         apples: 24,
        //         oranges: 12,
        //         eggs: 42
        //     }];

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
            var counter =0;
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


    });
});

'use strict';

const test = require('ava');
const expect = require('chai').expect;
const resolve = require('../../../../lib').resolve;

const macro = require('../../../../lib/utils').depsMacro;
const findIndex = require('../../../../lib/utils').findIndex;
const findLastIndex = require('../../../../lib/utils').findLastIndex;

test('should resolve entity depending on another entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' }, 'css')
            [linkMethod]({ block: 'B' }, 'css');

        return graph;
    },
    test: (t, graph) => {
        const decl = Array.from(graph.dependenciesOf({ block: 'A' }, 'css');

        expect(decl).to.contain({ entity: { block: 'B' });
    }
});

test('should resolve entity depending by multiple techs on another entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' }, 'css')
            [linkMethod]({ block: 'B' }, 'css')
            [linkMethod]({ block: 'B' }, 'js');

        return graph;
    },
    test: (t, graph) => {
        const decl = Array.from(graph.dependenciesOf({ block: 'A' }, 'css');

        expect(decl).to.contain({ entity: { block: 'B' });
    }
});

test('should resolve entity depending on multiple entities', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' }, 'css')
            [linkMethod]({ block: 'B' }, 'css')
            [linkMethod]({ block: 'C' }, 'css');

        return graph;
    },
    test: (t, graph) => {
        const decl = Array.from(graph.dependenciesOf({ block: 'A' }, 'css');

        expect(decl).to.contain({ entity: { block: 'B' })
            .and.to.contain({ entity: { block: 'C' });
    }
});

test('should include entity to result once if multiple entities depend on this entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' }, 'css')
            [linkMethod]({ block: 'C' }, 'css');

        graph
            .vertex({ block: 'B' }, 'css')
            [linkMethod]({ block: 'C' }, 'css');

        return graph;
    },
    test: (t, graph) => {
        const decl = Array.from(graph.dependenciesOf([{ block: 'A' }, { block: 'B' }], 'css');

        const firstIndex = findIndex(decl, { entity: { block: 'C' } });
        const lastIndex = findLastIndex(decl, { entity: { block: 'C' } });

        expect(decl).to.contain({ entity: { block: 'C' } });
        expect(firstIndex).to.be.equal(lastIndex);
    }
});

const Optional = require('../src/optional');

const expect = require('chai').expect;

describe('testing empty optional class', () => {
    let emptyUndefined = Optional.empty();
    let emptyNull = Optional.ofNullable(null);    

    it('should return false', () => {
        expect(emptyUndefined.isDefined()).to.equal(false);
    });

    it('should return true', () => {
        expect(emptyUndefined.isNotNull()).to.equal(true);
    });

    it('should return false', () => {
        expect(emptyUndefined.isPresent()).to.equal(false);
    });

    it('should return empty optional', () => {
        expect(emptyUndefined.map(val => val + 1 ).isPresent()).to.equal(false);
    });

    it('should return undefined', () => {
        expect(emptyUndefined.get()).to.equal(undefined);
    });

    it('should return 1', () => {
        expect(emptyUndefined.getOr(1)).to.equal(1);
    });

    it('should return 2', () => {
        expect(emptyUndefined.getOr(() => 2)).to.equal(2);
    });

    it('should return true for null optional', () => {
        expect(emptyNull.isDefined()).to.equal(true);
    });

    it('should return false for null optional', () => {
        expect(emptyNull.isNotNull()).to.equal(false);
    });

    it('should return false for null optional', () => {
        expect(emptyNull.isPresent()).to.equal(false);
    });
});

describe('testing not empty optionals', () => {
    let optional = Optional.ofNullable(0);

    it('should return true', () => {
        expect(optional.isDefined()).to.equal(true);
    });

    it('should return true', () => {
        expect(optional.isNotNull()).to.equal(true);
    });

    it('should return true', () => {
        expect(optional.isPresent()).to.equal(true);
    });

    it('should return optional with value 1', () => {
        expect(optional.map(val => val + 1 ).get()).to.equal(1);
    });

    it('should return 0 for get', () => {
        expect(optional.get()).to.equal(0);
    });

    it('should return 0 for getOr', () => {
        expect(optional.getOr(1)).to.equal(0);
    });

    it('should return 0 for getOr function', () => {
        expect(optional.getOr(() => 2)).to.equal(0);
    });
});

const Optional = require('../src/optional');

const { expect, should } = require('chai');

should();

describe('testing empty optional class', () => {
    let emptyUndefined = Optional.empty();
    let emptyNull = Optional.ofNullable(null);    

    it('should return false', () => {
        expect(emptyUndefined.isDefined()).to.be.false;
    });

    it('should return true', () => {
        expect(emptyUndefined.isNotNull()).to.be.true;
    });

    it('should return false', () => {
        expect(emptyUndefined.isPresent()).to.be.false;
    });

    it('should return empty optional', () => {
        expect(emptyUndefined.map(val => val + 1 ).isPresent()).to.be.false;
    });

    it('should return undefined', () => {
        expect(emptyUndefined.get()).to.be.undefined;
    });

    it('should return 1', () => {
        expect(emptyUndefined.getOr(1)).to.equal(1);
    });

    it('should return 2', () => {
        expect(emptyUndefined.getOr(() => 2)).to.equal(2);
    });

    it('should return true for null optional', () => {
        expect(emptyNull.isDefined()).to.be.true;
    });

    it('should return false for null optional', () => {
        expect(emptyNull.isNotNull()).to.be.false;
    });

    it('should return false for null optional', () => {
        expect(emptyNull.isPresent()).to.be.false;
    });

    it('should not do anything (ifPresent)', () => {
        const fn = val => expect.fail();

        emptyNull.ifPresent(fn);
    });

    it('should call elseFn (ifPresentOrElse)', () => {
        const fn = val => expect.fail();        
        const elseFn = val => expect(val).to.be.undefined;

        emptyNull.ifPresentOrElse(fn, elseFn);        
    });

    it('should return undefined (flatMap)', () => {
        expect(emptyUndefined.flatMap(val => 'something')).to.be.undefined;
    });

    it('should return empty optional (filter)', () => {
        expect(emptyUndefined.filter(val => val === undefined).isPresent()).to.be.false;
        expect(emptyUndefined.filter(undefined).isPresent()).to.be.false;        
    });
});

describe('testing not empty optionals', () => {
    let optional = Optional.ofNullable(0);

    it('should return true', () => {
        expect(optional.isDefined()).to.be.true;
    });

    it('should return true', () => {
        expect(optional.isNotNull()).to.be.true;
    });

    it('should return true', () => {
        expect(optional.isPresent()).to.be.true;
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

    it('should call fn (ifPresent)', () => {
        const fn = val => expect(val).to.equal(0);

        optional.ifPresent(fn);
    });

    it('should call fn (ifPresentOrElse)', () => {
        const fn = val => expect(val).to.equal(0);        
        const elseFn = val => expect.fail();

        optional.ifPresentOrElse(fn, elseFn);        
    });

    it('should return 2 (flatMap)', () => {
        expect(optional.flatMap(val => 2)).to.equal(2);
    });

    it('should return optional with value 0 (filter)', () => {
        expect(optional.filter(val => val === 0).getOr(1)).to.equal(0);
        expect(optional.filter(0).getOr(1)).to.equal(0);        
    });

    it('should return empty optional (filter)', () => {
        expect(optional.filter(val => val === 1).getOr(1)).to.equal(1);
        expect(optional.filter(1).getOr(1)).to.equal(1);        
    });
});

const Optional = require('../src/optionull');

const { expect } = require('chai');

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
        expect(emptyUndefined.getOrElse(1)).to.equal(1);
    });

    it('should return 2', () => {
        expect(emptyUndefined.getOrElse(() => 2)).to.equal(2);
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

    it('should return null (flatMap)', () => {
        expect(emptyUndefined.flatMap(val => 'something').isPresent()).to.be.false;
    });

    it('should return empty optional (filter)', () => {
        expect(emptyNull.filter(val => val === null).isPresent()).to.be.false;
        expect(emptyNull.filter(null).isPresent()).to.be.false;        
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

    it('should return 0 for getOrElse', () => {
        expect(optional.getOrElse(1)).to.equal(0);
    });

    it('should return 0 for getOrElse function', () => {
        expect(optional.getOrElse(() => 2)).to.equal(0);
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
        expect(optional.flatMap(val => 2).get()).to.equal(2);
        expect(optional.flatMap(val => Optional.ofNullable(1)).get()).to.equal(1);
    });

    it('should return optional with value 0 (filter)', () => {
        expect(optional.filter(val => val === 0).getOrElse(1)).to.equal(0);
        expect(optional.filter(0).getOrElse(1)).to.equal(0);        
    });

    it('should return empty optional (filter)', () => {
        expect(optional.filter(val => val === 1).getOrElse(1)).to.equal(1);
        expect(optional.filter(1).getOrElse(1)).to.equal(1);        
    });
});

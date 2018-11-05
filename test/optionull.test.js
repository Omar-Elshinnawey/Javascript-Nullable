/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const Optional = require('../src/optionull');

describe('test undefined optionals', () => {
  let emptyUndefined;
  let emptyUndefinedNullable;

  beforeEach(() => {
    emptyUndefined = Optional.empty();
    emptyUndefinedNullable = Optional.ofNullable(undefined);
  });

  it('should be undefined', () => {
    expect(emptyUndefined.get()).to.be.undefined;
    expect(emptyUndefinedNullable.get()).to.be.undefined;
  });

  it('should return the alternative value', () => {
    expect(emptyUndefined.getOrElse(1)).to.equal(1);
    expect(emptyUndefined.getOrElse(() => 1)).to.equal(1);

    expect(emptyUndefinedNullable.getOrElse(1)).to.equal(1);
    expect(emptyUndefinedNullable.getOrElse(() => 1)).to.equal(1);
  });

  it('should return false', () => {
    expect(emptyUndefined.isDefined()).to.be.false;
    expect(emptyUndefinedNullable.isDefined()).to.be.false;
  });

  it('should return true', () => {
    expect(emptyUndefined.isNotNull()).to.be.true;
    expect(emptyUndefinedNullable.isNotNull()).to.be.true;
  });

  it('should return false', () => {
    expect(emptyUndefined.isPresent()).to.be.false;
    expect(emptyUndefinedNullable.isPresent()).to.be.false;
  });

  it('should not call the function', () => {
    const fn = () => expect.fail();
    emptyUndefined.ifPresent(fn);
    emptyUndefinedNullable.ifPresent(fn);
  });

  it('should call the else function', () => {
    const fn = () => expect.fail();
    const elseFn = () => 1;

    emptyUndefined.ifPresentOrElse(fn, elseFn);
    emptyUndefinedNullable.ifPresentOrElse(fn, elseFn);
  });

  it('should return an empty optional (map)', () => {
    expect(emptyUndefined.map(() => 1).isPresent()).to.be.false;
    expect(emptyUndefinedNullable.map(() => 1).isPresent()).to.be.false;
  });

  it('should return an empty optional (flatmap)', () => {
    expect(emptyUndefined.flatMap(() => 1).isPresent()).to.be.false;
    expect(emptyUndefinedNullable.flatMap(() => 1).isPresent()).to.be.false;
  });

  it('should return an empty optional (filter)', () => {
    expect(emptyUndefined.filter(() => true).isPresent()).to.be.false;
    expect(emptyUndefinedNullable.filter(() => true).isPresent()).to.be.false;
  });
});

describe('test null optionals', () => {
  let emptyNullable;

  beforeEach(() => {
    emptyNullable = Optional.ofNullable(null);
  });

  it('should be null', () => {
    expect(emptyNullable.get()).to.be.null;
  });

  it('should return the alternative value', () => {
    expect(emptyNullable.getOrElse(1)).to.equal(1);
    expect(emptyNullable.getOrElse(() => 1)).to.equal(1);
  });

  it('should return true', () => {
    expect(emptyNullable.isDefined()).to.be.true;
  });

  it('should return false', () => {
    expect(emptyNullable.isNotNull()).to.be.false;
  });

  it('should return false', () => {
    expect(emptyNullable.isPresent()).to.be.false;
  });

  it('should not call the function', () => {
    const fn = () => expect.fail();
    emptyNullable.ifPresent(fn);
  });

  it('should call the else function', () => {
    const fn = () => expect.fail();
    const elseFn = () => 1;

    emptyNullable.ifPresentOrElse(fn, elseFn);
  });

  it('should return an empty optional (map)', () => {
    expect(emptyNullable.map(() => 1).isPresent()).to.be.false;
  });

  it('should return an empty optional (flatmap)', () => {
    expect(emptyNullable.flatMap(() => 1).isPresent()).to.be.false;
  });

  it('should return an empty optional (filter)', () => {
    expect(emptyNullable.filter(() => true).isPresent()).to.be.false;
  });
});

describe('test optionals with values', () => {
  let optional;

  beforeEach(() => {
    optional = Optional.ofNullable(1);
  });

  it('should equal 1', () => {
    expect(optional.get()).to.equal(1);
  });

  it('should return the original value', () => {
    expect(optional.getOrElse(2)).to.equal(1);
    expect(optional.getOrElse(() => 2)).to.equal(1);
  });

  it('should return true', () => {
    expect(optional.isDefined()).to.be.true;
  });

  it('should return true', () => {
    expect(optional.isNotNull()).to.be.true;
  });

  it('should return true', () => {
    expect(optional.isPresent()).to.be.true;
  });

  it('should call the function', () => {
    const fn = val => expect(val).to.equal(1);
    optional.ifPresent(fn);
  });

  it('should call the function', () => {
    const fn = val => expect(val).to.equal(1);
    const elseFn = () => expect.fail();

    optional.ifPresentOrElse(fn, elseFn);
  });

  it('should return an optional (map)', () => {
    expect(optional.map(val => val + 1).isPresent()).to.be.true;
    expect(optional.map(val => Optional.ofNullable(val + 1)).get() instanceof Optional).to.be.true;
  });

  it('should return an optional (flatmap)', () => {
    expect(optional.flatMap(val => val + 1).isPresent()).to.be.true;
    expect(optional.flatMap(val => Optional.ofNullable(val + 1)).get()).to.equal(2);
  });

  it('should return an optional (filter)', () => {
    expect(optional.filter(val => val === 1).isPresent()).to.be.true;
    expect(optional.filter(1).isPresent()).to.be.true;
    expect(optional.filter(2).isPresent()).to.be.false;
  });
});

module.exports = class Optional {
  constructor(value) {
    this.value = value;
  }

  /**
   * Creates and returns an empty Optional
   * @return {Optional}
   */
  static empty() {
    return new Optional();
  }

  /**
   * Wraps the value in a new Optional and returns it
   * @return {Optional}
   */
  static ofNullable(value) {
    return new Optional(value);
  }

  /**
   * Returns the value (could be null or undefined).
   * @return {any}
   */
  get() {
    return this.value;
  }

  /**
   * Returns the value if it is present otherwise returns the supplied defaultValue.
   * @param {any} defaultValue
   * @return {any}
   */
  getOrElse(defaultValue) {
    if (this.isPresent()) return this.value;

    if (typeof defaultValue === 'function') return defaultValue();

    return defaultValue;
  }

  /**
   * Returns true if the value is defined, false otherwise. (nulls return true).
   * @return {boolean}
   */
  isDefined() {
    if (typeof this.value === 'undefined') return false;

    return true;
  }

  /**
   * Returns true if the value is not null, false otherwise.
   * @return {boolean}
   */
  isNotNull() {
    if (this.value === null) return false;

    return true;
  }

  /**
   * Returns true if the value is not null and is defined.
   * @return {boolean}
   */
  isPresent() {
    if (this.isDefined() && this.isNotNull()) return true;

    return false;
  }

  /**
   * Calls the function fn if the value is present.
   * @param {(val: any) => any} fn
   * @return {void}
   */
  ifPresent(fn) {
    if (this.isPresent()) fn(this.value);
  }

  /**
   * Calls the function fn if the value is present. otherwise calls elseFn.
   * @param {(val: any) => any} fn
   * @param {() => any} elseFn
   * @return {void}
   */
  ifPresentOrElse(fn, elseFn) {
    if (this.isPresent()) fn(this.value);
    else elseFn();
  }

  /**
   * Maps the value to another optional if the value exists.
   * @param {(val: any) => any} fn
   * @return {Optional}
   */
  map(fn) {
    if (this.isPresent()) return Optional.ofNullable(fn(this.value));

    return Optional.empty();
  }

  /**
   * Maps the value to another if the value exists. returns the new value or null.
   * @param {(val: any) => any} fn
   * @return {Optional}
   */
  flatMap(fn) {
    if (this.isPresent()) {
      const result = fn(this.value);

      if (result instanceof Optional) return result;
      return Optional.ofNullable(result);
    }

    return Optional.empty();
  }

  /**
   * Returns the value wrapped in a new optional if
   * the predicate fn is true or fn is a value equal to the optional value
   * Returns empty optional otherwise.
   * @param {(val: any) => any | any} fn
   * @return {Optional}
   */
  filter(fn) {
    if (this.isPresent()) {
      const matches = typeof fn === 'function' ? fn(this.value) : fn === this.value;

      if (matches) return Optional.ofNullable(this.value);
    }

    return Optional.empty();
  }
};

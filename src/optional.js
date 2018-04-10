/**
 * @class
 */
class Optional {
	constructor(value) {
		this.value = value;
	}

	/**
	 * returns the value (could be null or undefined)
	 * @returns {any}
	 */
	get() {
		return this.value;
	}

	/**
	 * returns the value if it is present otherwise returns the supplied defaultValue
	 * @param {any} defaultValue 
	 * @returns {any}
	 */
	getOr(defaultValue) {
		if (this.isPresent())
			return this.value;

		if (typeof defaultValue === 'function')
			return defaultValue();

		return defaultValue;
	}

	/**
	 * returns true if the value is defined. False otherwise. (nulls return true)
	 * @returns {boolean}
	 */
	isDefined() {
		if (typeof this.value === 'undefined')
			return false;

		return true;
	}

	/**
	 * returns true if the value is not null. False otherwise
	 * @returns {boolean}
	 */
	isNotNull() {
		if (this.value === null)
			return false;

		return true;
	}

	/**
	 * returns true if the value is not null and defined.
	 * @returns {boolean}
	 */
	isPresent() {
		if (this.isDefined() && this.isNotNull())
			return true;

		return false;
	}

	/**
	 * maps the value to another optional if the value exists
	 * @param {Function} fn 
	 * @returns {Optional}
	 */
	map(fn) {
		if (this.isPresent())
			return Optional.ofNullable(fn(this.value));

		return Optional.empty();
	}

	/**
	 * returns an optional with empty value
	 * @returns {Optional}
	 */
	static empty() {
		return new Optional();
	}

	/**
	 * returns an optional with the provided value
	 * @param {any} value 
	 * @returns {Optional}
	 */
	static ofNullable(value) {
		return new Optional(value);
	}
}

module.exports = Optional;
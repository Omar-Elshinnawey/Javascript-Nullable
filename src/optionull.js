function Optional(value) {
	this.value = value;
}

Optional.empty = function () {
	return new Optional();
};

Optional.ofNullable = function(value) {
	return new Optional(value);
};

Optional.prototype = {
	/**
	 * Returns the value (could be null or undefined).
	 * @returns {any}
	 */
	get() {
		return this.value;
	},

	/**
	 * Returns the value if it is present otherwise returns the supplied defaultValue.
	 * @param {any} defaultValue 
	 * @returns {any}
	 */
	getOrElse(defaultValue) {
		if (this.isPresent())
			return this.value;
		
		if (typeof defaultValue === 'function')
			return defaultValue();

		return defaultValue;
	},

	/**
	 * Returns true if the value is defined, false otherwise. (nulls return true).
	 * @returns {boolean}
	 */
	isDefined() {
		if (typeof this.value === 'undefined')
			return false;

		return true;
	},

	/**
	 * Returns true if the value is not null, false otherwise.
	 * @returns {boolean}
	 */
	isNotNull() {
		if (this.value === null)
			return false;
		
		return true;
	},

	/**
	 * Returns true if the value is not null and defined.
	 * @returns {boolean}
	 */
	isPresent() {
		if(this.isDefined() && this.isNotNull())
			return true;

		return false;
	},

	/**
	 * Calls the function fn if the value is present.
	 * @param {Function} fn 
	 * @returns {void}
	 */
	ifPresent(fn) {
		if(this.isPresent())
			fn(this.value);
	},

	/**
	 * Calls the function fn if the value is present. otherwise calls elseFn.
	 * @param {Function} fn 
	 * @param {Function} elseFn 
	 */
	ifPresentOrElse(fn, elseFn) {
		if(this.isPresent())
			fn(this.value);
		else
			elseFn();
	},

	/**
	 * Maps the value to another optional if the value exists.
	 * @param {Function} fn 
	 * @returns {Optional}
	 */
	map(fn) {
		if(this.isPresent())
			return Optional.ofNullable(fn(this.value));
		
		return Optional.empty();
	},

	/**
	 * Maps the value to another if the value exists. returns the new value or null.
	 * @param {Function} fn 
	 * @returns {any}
	 */
	flatMap(fn) {
		if(this.isPresent()) {
			const result = fn(this.value);

			if (result instanceof Optional)
				return result;
			else
				return Optional.ofNullable(result);
		}

		return Optional.empty();
	},

	/**
	 * If the value is present and the result of predicate fn is true or fn is a value that is equal to the optional value a new optional is returned. 
	 * Returns empty optional otherwise.
	 * @param {Function|any} fn 
	 * @returns {Optional}
	 */
	filter(fn) {
		if(this.isPresent()){

			const matches = typeof fn === 'function'? fn(this.value): fn === this.value;

			if(matches)
				return Optional.ofNullable(this.value);

		}

		return Optional.empty();
	}
};

module.exports = Optional;
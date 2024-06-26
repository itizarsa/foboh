const promiseWrapper = promise => {
	return new Promise(resolve => {
		promise.then(result => resolve({ result })).catch(error => resolve({ error }))
	})
}

const round = num => parseFloat(num.toFixed(2))

const capitilize = string =>
	string.substring(0, 1).toUpperCase() + string.substring(1, string.length)

export { promiseWrapper, round, capitilize }

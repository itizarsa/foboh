const promiseWrapper = promise => {
	return new Promise(resolve => {
		promise.then(result => resolve({ result })).catch(error => resolve({ error }))
	})
}

const round = num => parseFloat(num.toFixed(2))

export { promiseWrapper, round }

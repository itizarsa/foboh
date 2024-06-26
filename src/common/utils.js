const promiseWrapper = promise => {
	return new Promise(resolve => {
		promise.then(result => resolve({ result })).catch(error => resolve({ error }))
	})
}

export { promiseWrapper }

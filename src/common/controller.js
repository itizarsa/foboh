export const wrapper = fn => async (req, res) => {
	const { params, query, body } = req

	const { status, data, error } = await fn({ params, query, body })

	if (error) return res.status(status).json({ error })

	return res.status(status).json({ data })
}

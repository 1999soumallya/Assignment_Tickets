const Pagination = (page = 1, size = 5, count = 0) => {
    const limit = +size;
    const offset = --page * limit;
    const totalPage = Math.ceil(count / limit)
    return { limit, offset, totalPage };
}

module.exports = { Pagination }